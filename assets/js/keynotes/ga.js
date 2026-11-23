// Offline key notes: General Aptitude (common to every paper, 15 marks). Keys are chapter ids from data.js.
export const CONTENT = {
  verbal: {
    overview: 'Verbal ability is about 5 of the 15 aptitude marks: grammar, sentence completion, analogies, vocabulary, critical reasoning and short reading passages. It rewards careful reading more than memorised word lists.',
    sections: [
      ['Grammar essentials', [
        '**Subject–verb agreement:** “Each / every / either / neither” take a singular verb. With “either…or / neither…nor”, the verb agrees with the nearer subject.',
        '**Tenses:** keep tense consistent; “since” takes a point of time with the perfect tense (“has been working since 2019”).',
        '**Articles and prepositions:** “an” before a vowel sound (an hour, a university); fixed pairs such as “comply with”, “prior to”, “different from”.',
        '**Parallelism and modifiers:** items in a list take the same form; place a modifier next to the word it describes.',
      ]],
      ['Completion, analogies and vocabulary', [
        'For blanks, look for signal words: “although / but / however” mean contrast, “because / since / therefore” mean support.',
        'For analogies, state the relationship in a sentence (“a carpenter uses a saw”) and test each option with the same sentence.',
        'Learn words in families (benevolent / malevolent; prolific / profuse) and check for the closest meaning in context, not the dictionary sense.',
      ]],
      ['Critical reasoning and passages', [
        '**Inference:** must follow from the passage; nothing outside it.',
        '**Assumption:** an unstated premise the argument needs. Negate it: if the argument collapses, it was an assumption.',
        'Reject extreme options (“always”, “never”, “only”) unless the passage is equally strong.',
      ]],
    ],
    exam: ['One-mark questions on grammar and vocabulary; two-mark questions on passages and “which statement is inferred”.', 'Questions are often decided by a single word such as “some” versus “all”.'],
    traps: ['An option can be true in real life and still be wrong because the passage does not support it.', '“The number of” takes a singular verb; “a number of” takes a plural verb.'],
  },

  quant: {
    overview: 'Quantitative aptitude is the largest part of General Aptitude. Questions are short arithmetic: percentages, ratios, averages, data interpretation, logs, counting and basic probability. Speed comes from knowing a handful of shortcuts well.',
    sections: [
      ['Percentages, ratios and averages', [
        'Successive changes of a% and b% give a net change of a + b + ab/100 percent.',
        'If a price rises by r%, consumption must fall by r/(100 + r) × 100% to keep spending the same.',
        'Weighted average = Σ(wᵢxᵢ)/Σwᵢ. Adding a value equal to the average leaves the average unchanged.',
        'Mixtures (alligation): the ratio of quantities is (dearer − mean) : (mean − cheaper), applied crosswise.',
      ]],
      ['Powers, logs and estimation', [
        'aᵐ · aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁰ = 1.',
        'log(xy) = log x + log y, log(xⁿ) = n log x, logₐb = log b / log a.',
        'log₁₀2 ≈ 0.301, log₁₀3 ≈ 0.477; the number of digits of N is ⌊log₁₀N⌋ + 1.',
      ]],
      ['Counting, probability and series', [
        'ⁿPᵣ = n!/(n − r)!, ⁿCᵣ = n!/(r!(n − r)!). Circular arrangements of n distinct objects: (n − 1)!.',
        'P(A or B) = P(A) + P(B) − P(A and B). P(at least one) = 1 − P(none).',
        'AP: nth term a + (n − 1)d, sum n/2 [2a + (n − 1)d]. GP: sum a(rⁿ − 1)/(r − 1); infinite sum a/(1 − r) for |r| < 1.',
      ]],
      ['Data interpretation and mensuration', [
        'Read the units and the base year before calculating; approximate first, then compute only the options that are close.',
        'Circle: area πr², circumference 2πr. Cylinder: volume πr²h. Cone: volume πr²h/3. Sphere: volume 4πr³/3, surface 4πr².',
      ]],
    ],
    formulas: ['Simple interest = PRT/100; compound amount = P(1 + r/100)ⁿ.', 'Speed = distance/time; average speed for equal distances = 2xy/(x + y).', 'Work: if A takes a days and B takes b days, together they take ab/(a + b) days.'],
    exam: ['Data interpretation from a table or chart is almost always asked, often as a two-mark question.', 'Numerical answer type (NAT) questions appear here, so there are no options to work backwards from.'],
    traps: ['A percentage change followed by the same percentage change in the opposite direction is a net loss, not zero.', 'Percentage “points” and “percent” are different: 10% to 12% is 2 percentage points but a 20% increase.'],
  },

  analytical: {
    overview: 'Analytical reasoning tests deduction, induction, analogy and numerical relations: syllogisms, statements and conclusions, number and letter series, coding, blood relations, directions and arrangements.',
    sections: [
      ['Deduction and syllogisms', [
        'Draw Venn diagrams. A conclusion follows only if it is true in every possible diagram.',
        '“All A are B” does not mean “all B are A”. “Some A are B” means “some B are A”.',
        'Two particular premises (“some… some…”) give no definite conclusion.',
        'When neither of two complementary statements is definite (“some A are C” / “no A is C”), the answer is often “either… or”.',
      ]],
      ['Series and coding', [
        'Check differences, then second differences, then ratios; look for squares, cubes, primes and n(n + 1).',
        'Alternating series: split into odd and even positions.',
        'Letter positions: A = 1 … Z = 26; opposite pairs add to 27 (A–Z, B–Y).',
      ]],
      ['Arrangements, relations and directions', [
        'Fix the most definite clue first; draw every case and remove those that break a clue.',
        'Blood relations: draw a family tree with gender marked.',
        'Directions: turning right from north faces east; the shortest distance is found with Pythagoras.',
      ]],
    ],
    exam: ['Two-mark puzzles with 4–6 people and 2–3 attributes are common.', '“Which of the following can be logically inferred” questions mix verbal and analytical skills.'],
    traps: ['Using outside knowledge in a syllogism. Only the given statements count, even if they are absurd.', 'Assuming “some” excludes “all”. In logic, “some A are B” is still true when all A are B.'],
  },

  spatial: {
    overview: 'Spatial aptitude covers mental rotation, reflection, scaling, paper folding and cutting, cube and dice problems, and 2D/3D patterns. Practise by sketching rather than visualising everything in your head.',
    sections: [
      ['Transformations', [
        '**Rotation:** shape and size stay the same; orientation changes. A 90° clockwise turn sends (x, y) to (y, −x).',
        '**Reflection (mirroring):** left and right swap for a vertical mirror; a water image flips top and bottom.',
        '**Scaling:** lengths multiply by k, areas by k², volumes by k³.',
      ]],
      ['Paper folding and cutting', [
        'Unfold step by step in reverse order; each fold doubles the holes and mirrors them about the fold line.',
        'A cut through n layers produces n pieces of that cut in the unfolded sheet.',
      ]],
      ['Cubes and dice', [
        'A cube has 6 faces, 12 edges and 8 vertices.',
        'A painted cube cut into n³ small cubes: 8 have three faces painted, 12(n − 2) have two, 6(n − 2)² have one, (n − 2)³ have none.',
        'On a standard die, opposite faces add up to 7. Adjacent faces can never be opposite.',
      ]],
    ],
    formulas: ['Painted n × n × n cube: corners 8, edge cubes 12(n − 2), face cubes 6(n − 2)², hidden (n − 2)³.'],
    exam: ['One or two questions per paper, usually with figures: “which figure completes the pattern” or “how many pieces after cutting”.'],
    traps: ['Mixing up a mirror image (left–right) with a water image (top–bottom).', 'Counting the faces of a die from two views without checking which faces are shared.'],
  },
};
