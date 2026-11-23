// Offline key notes: CS · Theory of Computation. Keys are chapter ids from data.js.
export const CONTENT = {
  regular: {
    overview: 'Regular languages and finite automata are high-weightage: build or minimise DFAs, convert regular expressions, decide whether a language is regular, and use closure properties.',
    sections: [
      ['DFA and NFA', [
        'DFA: exactly one transition per symbol from each state. NFA: zero, one or many, plus ε-moves. They accept the same class of languages.',
        'Subset construction: an n-state NFA may need up to 2ⁿ DFA states.',
        'Minimum DFA for “length divisible by k” has k states. For “binary numbers divisible by k” it has k states when k is odd, but fewer for powers of two (divisible by 2ᵐ needs m + 1).',
        'A DFA accepting strings with the n-th symbol from the end equal to 1 needs 2ⁿ states.',
      ]],
      ['Regular expressions', [
        'Kleene’s theorem: regular expressions, DFAs and NFAs are equivalent.',
        'Identities: (a + b)∗ = (a∗b∗)∗; (ab)∗a = a(ba)∗; ∅∗ = ε; r + ∅ = r; rε = r.',
      ]],
      ['DFA minimisation', [
        'Remove unreachable states; then partition into accepting / non-accepting and split groups until stable (Myhill–Nerode).',
        'The number of Myhill–Nerode classes equals the number of states in the minimum DFA.',
      ]],
      ['Pumping lemma and closure', [
        'Pumping lemma is used to prove a language is not regular (e.g. aⁿbⁿ, ww, palindromes, aᵖ for primes p).',
        'Regular languages are closed under union, intersection, complement, concatenation, star, reversal, difference, homomorphism and inverse homomorphism.',
        'A finite language is always regular. Any subset of a regular language need not be regular.',
      ]],
    ],
    exam: ['Number of states in the minimal DFA for a described language (NAT).', 'Which of the given languages are regular?', 'Language of a given regular expression or automaton.'],
    traps: ['aⁿbᵐ (independent n, m) is regular; aⁿbⁿ is not.', 'Forgetting the dead (trap) state when counting minimal DFA states.'],
  },

  cfl: {
    overview: 'Context-free languages and pushdown automata: designing grammars, ambiguity, PDAs, the pumping lemma for CFLs, and closure properties.',
    sections: [
      ['Grammars and ambiguity', [
        'A grammar is ambiguous if some string has two different parse trees (or leftmost derivations).',
        'Some CFLs are inherently ambiguous: {aⁱbʲcᵏ | i = j or j = k}.',
        'Chomsky normal form: A → BC or A → a. A string of length n has a derivation of exactly 2n − 1 steps in CNF.',
      ]],
      ['Pushdown automata', [
        'NPDAs accept exactly the CFLs. DPDAs accept the deterministic CFLs, a proper subset (palindromes need an NPDA).',
        'Acceptance by final state and by empty stack are equivalent for NPDAs.',
      ]],
      ['Pumping lemma for CFLs', [
        'Proves a language is not context-free: aⁿbⁿcⁿ, ww, aⁿ² and a^(prime) are not CFLs.',
        'aⁿbⁿ, wwᴿ, balanced parentheses and aⁿbᵐcⁿ⁺ᵐ are CFLs.',
      ]],
      ['Closure and decision properties', [
        'CFLs are closed under union, concatenation, star, reversal, homomorphism and intersection with a regular language.',
        'CFLs are not closed under intersection or complement. DCFLs are closed under complement but not union or intersection.',
        'Decidable for CFGs: membership (CYK, O(n³)), emptiness, finiteness. Undecidable: equivalence, ambiguity, whether L = Σ∗, whether the intersection of two CFLs is empty.',
      ]],
    ],
    exam: ['Classify languages as regular, DCFL, CFL or not CFL.', 'Closure properties in true/false statements.'],
    traps: ['Assuming the complement of a CFL is a CFL.', 'Thinking two counters can be matched by one stack: aⁿbⁿcⁿ needs more than a PDA.'],
  },

  tm: {
    overview: 'Turing machines define what is computable. Questions test the hierarchy of language classes and closure properties of recursive and RE languages.',
    sections: [
      ['Turing machine basics', [
        'A TM has an infinite tape, a read/write head and a finite control. Multi-tape and non-deterministic TMs are no more powerful (only faster).',
        'Church–Turing thesis: any effectively computable function can be computed by a TM.',
      ]],
      ['Recursive and recursively enumerable languages', [
        '**Recursive (decidable):** a TM halts on every input with yes/no.',
        '**Recursively enumerable (RE):** a TM halts and accepts every string in the language; may loop on others.',
        'If L and its complement are both RE, L is recursive.',
        'Recursive languages are closed under union, intersection, complement, concatenation and star. RE languages are closed under union, intersection, concatenation and star, but not complement.',
      ]],
      ['Chomsky hierarchy', [
        'Type 3 regular (FA) ⊂ Type 2 context-free (PDA) ⊂ Type 1 context-sensitive (LBA) ⊂ recursive ⊂ Type 0 RE (TM).',
        'Context-sensitive languages are recursive; aⁿbⁿcⁿ is context-sensitive.',
      ]],
    ],
    exam: ['Which class does a language belong to, and is the class closed under an operation?'],
    traps: ['Equating Type 0 with recursive; Type 0 is RE, which strictly contains recursive.'],
  },

  undecidability: {
    overview: 'Undecidability questions ask which problems are decidable, semi-decidable or neither, usually via reductions and Rice’s theorem.',
    sections: [
      ['Halting problem and reductions', [
        'The halting problem is RE but not recursive; its complement is not RE.',
        'If A reduces to B (A ≤ B) and A is undecidable, then B is undecidable. If B is decidable, so is A.',
        'Post’s correspondence problem is undecidable (used to show CFG problems undecidable).',
      ]],
      ["Rice's theorem", [
        'Every non-trivial property of the language accepted by a TM is undecidable (e.g. “is L(M) empty?”, “is L(M) regular?”, “is L(M) finite?”).',
        'It does not apply to properties of the machine itself, e.g. “does M have 10 states?” (decidable) or “does M halt within 100 steps?”.',
      ]],
      ['Classifying problems', [
        'Decidable: membership/emptiness/finiteness for DFAs and CFGs; equivalence of DFAs.',
        'Undecidable: equivalence of CFGs, ambiguity of a CFG, emptiness of a TM’s language, whether a TM halts on all inputs.',
        'Semi-decidable but undecidable: “M accepts w”, “L(M) is non-empty”. Not even semi-decidable: “L(M) is empty”, “M halts on every input”.',
      ]],
    ],
    exam: ['Which of the statements are decidable? (one or two marks almost every year)'],
    traps: ['Applying Rice’s theorem to properties of TMs that are not properties of their languages.', 'Forgetting that a finite (or trivial) property question is decidable.'],
  },
};
