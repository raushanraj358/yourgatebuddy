/* YourGATEBuddy — AI quiz generation with Claude.
 *
 * This is a static site with no backend or build step, so it calls the Claude Messages API over
 * HTTP from the browser using the learner's own API key (saved only in their browser).
 * For a public launch, move this call behind a small server or serverless function that holds the
 * key, and point ENDPOINT at it.
 */
(function () {
  "use strict";

  const ENDPOINT = "https://api.anthropic.com/v1/messages";

  const SCHEMA = {
    type: "object",
    additionalProperties: false,
    required: ["questions"],
    properties: {
      questions: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["question", "options", "answer_index", "explanation"],
          properties: {
            question: { type: "string" },
            options: { type: "array", items: { type: "string" } },
            answer_index: { type: "integer" },
            explanation: { type: "string" },
          },
        },
      },
    },
  };

  const DIFF = { 1: "easy (concept check)", 2: "medium (typical GATE 1-mark)", 3: "hard (typical GATE 2-mark, multi-step)" };

  async function generateQuiz({ apiKey, model, branchName, subjectName, topic, count, difficulty }) {
    if (!apiKey) throw new Error("Add your Claude API key in Settings to use AI quizzes.");

    const prompt =
      `Write ${count} original multiple-choice questions for GATE ${branchName} aspirants.\n` +
      `Subject: ${subjectName}${topic ? `\nFocus topic: ${topic}` : ""}\n` +
      `Difficulty: ${DIFF[difficulty] || DIFF[2]}\n\n` +
      `Match the style and syllabus of the GATE exam conducted by the IITs. Each question has exactly 4 options ` +
      `and exactly one correct option; answer_index is 0-based. Keep numerical values simple enough to solve with ` +
      `the GATE virtual calculator. Explanations should show the key step in 1–3 sentences. ` +
      `Use plain text with Unicode symbols (², √, π, ≤) rather than LaTeX. Double-check every answer.`;

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2026-10-21",
        "anthropic-beta": "server-side-fallback-2026-07-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: model || "claude-opus-5-5",
        max_tokens: 16000,
        output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
        fallbacks: "default", // if a safety classifier declines, the API retries on a fallback model
        messages: [{ role: "user", content: prompt }],
      }),
    });

    let data;
    try { data = await res.json(); } catch (_) { data = null; }
    if (!res.ok) {
      const msg = data && data.error && data.error.message;
      if (res.status === 401) throw new Error("Your API key was rejected. Check it in Settings.");
      if (res.status === 429) throw new Error("Rate limited by the API. Wait a moment and try again.");
      throw new Error(msg || `AI request failed (HTTP ${res.status}).`);
    }
    if (data.stop_reason === "refusal") throw new Error("The AI declined this request. Try a different topic.");
    if (data.stop_reason === "max_tokens") throw new Error("The response was cut off. Try fewer questions.");

    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    let parsed;
    try { parsed = JSON.parse(text); } catch (_) { throw new Error("The AI returned an unreadable response. Please retry."); }

    const questions = (parsed.questions || [])
      .filter((x) => x && Array.isArray(x.options) && x.options.length === 4 &&
        Number.isInteger(x.answer_index) && x.answer_index >= 0 && x.answer_index < 4)
      .map((x, i) => ({ id: "ai" + Date.now() + i, q: x.question, o: x.options, a: x.answer_index, ex: x.explanation, ai: true }));
    if (!questions.length) throw new Error("No valid questions came back. Please retry.");
    return questions;
  }

  window.GB_AI = { generateQuiz };
})();
