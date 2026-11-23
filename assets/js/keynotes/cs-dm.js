// Offline key notes: CS · Discrete Mathematics. Keys are chapter ids from data.js.
export const CONTENT = {
  logic: {
    overview: 'Logic questions ask whether a formula is a tautology, which statements are equivalent, or what a quantified sentence means. Truth tables work, but the standard equivalences are faster.',
    sections: [
      ['Propositional logic', [
        'p → q ≡ ¬p ∨ q ≡ ¬q → ¬p (contrapositive). The converse q → p and inverse ¬p → ¬q are not equivalent to p → q.',
        'De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q; ¬(p ∨ q) ≡ ¬p ∧ ¬q. p ↔ q ≡ (p → q) ∧ (q → p).',
        '**Tautology:** true in every row. **Contradiction:** false in every row. **Satisfiable:** true in at least one row.',
        'To show a formula is a tautology, assume it is false and derive a contradiction (fewer cases than a full truth table).',
      ]],
      ['Predicates and quantifiers', [
        '¬∀x P(x) ≡ ∃x ¬P(x); ¬∃x P(x) ≡ ∀x ¬P(x).',
        '∀x (P ∧ Q) ≡ ∀x P ∧ ∀x Q, but ∀x (P ∨ Q) is not equivalent to ∀x P ∨ ∀x Q. ∃ distributes over ∨, not over ∧.',
        '∃x ∀y P(x, y) → ∀y ∃x P(x, y) is valid; the reverse is not.',
        '“Every student likes some course”: ∀s ∃c Likes(s, c). “All A are B”: ∀x (A(x) → B(x)). “Some A are B”: ∃x (A(x) ∧ B(x)).',
      ]],
      ['Rules of inference', [
        'Modus ponens: p, p → q ⊢ q. Modus tollens: ¬q, p → q ⊢ ¬p.',
        'Hypothetical syllogism: p → q, q → r ⊢ p → r. Disjunctive syllogism: p ∨ q, ¬p ⊢ q. Resolution: p ∨ q, ¬p ∨ r ⊢ q ∨ r.',
      ]],
    ],
    exam: ['Translating English sentences into first-order logic (two-mark favourite).', 'Which formula is valid among four quantified formulas.'],
    traps: ['Writing “some A are B” as ∃x (A(x) → B(x)); that is true whenever anything is not A.', 'Affirming the consequent (q, p → q ⊢ p) is a fallacy.'],
  },

  sets: {
    overview: 'Sets, relations and functions cover properties of relations, partial orders and lattices, counting functions, and basic group theory. Expect counting questions (“how many relations are…”) and property checks.',
    sections: [
      ['Relations', [
        'Reflexive, symmetric, antisymmetric, transitive. Equivalence = reflexive + symmetric + transitive; its classes partition the set.',
        'Partial order = reflexive + antisymmetric + transitive (Hasse diagram). Total order: every pair is comparable.',
        'On a set of n elements: relations 2^(n²); reflexive 2^(n² − n); symmetric 2^(n(n+1)/2); antisymmetric 2ⁿ · 3^(n(n−1)/2).',
        'Number of equivalence relations on n elements = Bell number Bₙ (1, 1, 2, 5, 15, 52, …).',
      ]],
      ['Functions', [
        'From A (|A| = m) to B (|B| = n): nᵐ functions; one-one functions n!/(n − m)! if m ≤ n.',
        'Onto functions (m ≥ n): Σₖ (−1)ᵏ ⁿCₖ (n − k)ᵐ. Bijections exist only if m = n (n! of them).',
        'Composition of injections is injective; of surjections is surjective. g∘f onto ⇒ g onto; g∘f one-one ⇒ f one-one.',
      ]],
      ['Lattices', [
        'A poset where every pair has a least upper bound (join) and greatest lower bound (meet).',
        '**Distributive:** meet distributes over join; the forbidden sub-lattices are the diamond M₃ and pentagon N₅.',
        '**Complemented:** every element has a complement. Boolean algebra = complemented + distributive lattice.',
        'Divisors of n under divisibility form a lattice; it is Boolean iff n is square-free.',
      ]],
      ['Monoids and groups', [
        'Semigroup: closed + associative. Monoid: + identity. Group: + inverses. Abelian: + commutative.',
        "Lagrange: the order of a subgroup divides the order of the group. Every group of prime order is cyclic.",
        'In a group, (ab)⁻¹ = b⁻¹a⁻¹; if every element is its own inverse, the group is abelian.',
      ]],
    ],
    exam: ['Counting relations with given properties (NAT).', 'Is this poset a lattice / distributive / complemented?', 'Group or monoid identification for an operation on a set.'],
    traps: ['Antisymmetric is not “not symmetric”: the empty relation and the identity relation are both symmetric and antisymmetric.', 'A lattice can be complemented without being distributive (complements may not be unique).'],
  },

  combinatorics: {
    overview: 'Combinatorics is high-weightage: counting with permutations and combinations, pigeonhole, inclusion–exclusion, recurrence relations and generating functions.',
    sections: [
      ['Counting', [
        'Arrangements of n items with repeats n!/(n₁! n₂! …). Circular arrangements (n − 1)!.',
        'Distributing r identical objects into n distinct boxes: C(n + r − 1, r); with each box non-empty: C(r − 1, n − 1).',
        'Inclusion–exclusion: |A ∪ B ∪ C| = Σ|A| − Σ|A ∩ B| + |A ∩ B ∩ C|.',
        'Derangements: Dₙ = n! Σ (−1)ᵏ/k! ≈ n!/e; D₁ = 0, D₂ = 1, D₃ = 2, D₄ = 9, D₅ = 44.',
        'Catalan numbers Cₙ = C(2n, n)/(n + 1): 1, 1, 2, 5, 14, 42 — count binary trees with n nodes, balanced parentheses, triangulations.',
      ]],
      ['Pigeonhole principle', [
        'n + 1 objects in n boxes ⇒ some box has ≥ 2. Generalised: N objects in k boxes ⇒ some box has ≥ ⌈N/k⌉.',
        'Typical use: minimum people to guarantee a shared birthday month (13), or a pair summing to a value.',
      ]],
      ['Recurrences and generating functions', [
        'Linear homogeneous: aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ → characteristic roots r₁, r₂ → aₙ = αr₁ⁿ + βr₂ⁿ (repeated root: (α + βn)rⁿ).',
        'Non-homogeneous: add a particular solution of the same form as the forcing term.',
        'Generating function of 1, 1, 1, …: 1/(1 − x). Of aⁿ: 1/(1 − ax). Coefficient of xʳ in (1 − x)^(−n) is C(n + r − 1, r).',
      ]],
    ],
    formulas: ['Number of bit strings of length n with no two consecutive 1s = Fₙ₊₂ (Fibonacci).', 'Number of subsets of an n-set = 2ⁿ; of size k = C(n, k).'],
    exam: ['NAT on counting arrangements or solutions of x₁ + x₂ + … = r.', 'Closed form of a recurrence or its value at small n.'],
    traps: ['Mixing up identical vs distinct objects and boxes.', 'Forgetting the factor for a repeated characteristic root.'],
  },

  graphs: {
    overview: 'Graph theory is high-weightage: degrees, connectivity, trees, matchings, colouring and planarity. Most questions use a small set of formulas.',
    sections: [
      ['Basics and connectivity', [
        'Handshaking: Σ deg(v) = 2|E|, so the number of odd-degree vertices is even.',
        'A simple graph with n vertices and more than (n − 1)(n − 2)/2 edges is connected.',
        'Euler circuit iff connected and every vertex has even degree; Euler path iff exactly 0 or 2 odd vertices.',
        'Cut vertex / bridge: removing it increases the number of components. Vertex connectivity ≤ edge connectivity ≤ minimum degree.',
      ]],
      ['Trees', [
        'A tree on n vertices has n − 1 edges; any two vertices are joined by exactly one path.',
        'A forest with n vertices and k components has n − k edges.',
        "Cayley: number of labelled trees on n vertices = nⁿ⁻²; spanning trees of Kₙ = nⁿ⁻².",
      ]],
      ['Matching and colouring', [
        'Perfect matching in Kₙ (n even): (n − 1)·(n − 3)·…·1. In K₍ₙ,ₙ₎: n!.',
        'Chromatic number χ: bipartite graphs (no odd cycle) have χ ≤ 2; Kₙ has χ = n; odd cycle χ = 3; planar χ ≤ 4.',
        'Edge chromatic number is Δ or Δ + 1 (Vizing).',
        'Independence number α and vertex cover β satisfy α + β = n.',
      ]],
      ['Planarity', [
        "Euler's formula for a connected planar graph: v − e + f = 2 (with k components: v − e + f = k + 1).",
        'Simple planar graph: e ≤ 3v − 6; if no triangles, e ≤ 2v − 4. So K₅ and K₃,₃ are non-planar.',
        'Kuratowski: a graph is planar iff it has no subdivision of K₅ or K₃,₃.',
      ]],
    ],
    formulas: ['Kₙ has n(n − 1)/2 edges; K₍ₘ,ₙ₎ has mn edges.', 'Number of simple labelled graphs on n vertices = 2^(n(n−1)/2).'],
    exam: ['Chromatic number of a drawn graph.', 'Counting regions with Euler’s formula, or edges from degrees.', 'Number of spanning trees or perfect matchings (NAT).'],
    traps: ['Euler’s formula counts the outer (infinite) face too.', 'e ≤ 3v − 6 is necessary, not sufficient, for planarity.'],
  },
};
