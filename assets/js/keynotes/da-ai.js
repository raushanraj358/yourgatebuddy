// Offline key notes: DA · Artificial Intelligence. Keys are chapter ids from data.js.
import { CONTENT as DM } from './cs-dm.js';

export const CONTENT = {
  search: {
    overview: 'Search: uninformed strategies (BFS, DFS, iterative deepening), informed search with A∗ and heuristics, and adversarial search with minimax and alpha–beta pruning.',
    sections: [
      ['Uninformed search', [
        'b = branching factor, d = depth of the shallowest goal, m = maximum depth.',
        '**BFS:** complete, optimal for unit step costs; time and space O(bᵈ).',
        '**Uniform-cost search:** expands the lowest path cost g(n); optimal for non-negative costs.',
        '**DFS:** space O(bm); not complete in infinite spaces; not optimal.',
        '**Iterative deepening DFS:** complete and optimal (unit costs) with O(bd) space; repeated work only adds a constant factor.',
        'Bidirectional search: O(b^(d/2)).',
      ]],
      ['Informed search: A∗ and heuristics', [
        'Greedy best-first uses h(n) only: fast but not optimal. A∗ uses f(n) = g(n) + h(n).',
        'Admissible h (never overestimates) ⇒ A∗ tree search is optimal. Consistent h (h(n) ≤ c(n, n′) + h(n′)) ⇒ optimal graph search; consistency implies admissibility.',
        'A dominant heuristic (h₂ ≥ h₁, both admissible) expands no more nodes. Max of admissible heuristics is admissible.',
        '8-puzzle heuristics: misplaced tiles and Manhattan distance (dominates).',
      ]],
      ['Adversarial search: minimax and alpha–beta', [
        'Minimax: MAX picks the highest child value, MIN the lowest; time O(bᵐ).',
        'Alpha–beta pruning gives the same result; with perfect ordering it examines O(b^(m/2)) nodes.',
        'Prune when α ≥ β: α = best value for MAX so far, β = best for MIN so far along the path.',
        'Expectiminimax adds chance nodes (weighted averages).',
      ]],
    ],
    exam: ['Order of node expansion for BFS/DFS/A∗.', 'Minimax value of a game tree and which leaves are pruned.', 'Is a given heuristic admissible or consistent?'],
    traps: ['Stopping A∗ when the goal is generated rather than when it is selected for expansion.'],
  },

  logic: {
    overview: 'Logic for AI: propositional logic, and predicate (first-order) logic with inference by resolution.',
    sections: [
      ...DM.logic.sections,
      ['Inference for AI', [
        'Knowledge base KB entails α (KB ⊨ α) iff α is true in every model of KB; check by showing KB ∧ ¬α is unsatisfiable.',
        'Convert to CNF for resolution: remove ↔ and →, push ¬ inwards, standardise variables, Skolemise ∃, drop ∀, distribute ∨ over ∧.',
        'Horn clauses allow forward chaining (data-driven) and backward chaining (goal-driven) in linear time.',
        'Unification finds substitutions making two predicates identical (most general unifier).',
      ]],
    ],
    exam: ['Is a formula valid or satisfiable?', 'English to first-order logic.', 'Result of a resolution step.'],
    traps: DM.logic.traps,
  },

  uncertainty: {
    overview: 'Reasoning under uncertainty: conditional independence, Bayesian networks and exact inference by variable elimination, and approximate inference by sampling.',
    sections: [
      ['Conditional independence', [
        'X ⊥ Y | Z iff P(X, Y | Z) = P(X | Z)P(Y | Z).',
        'Full joint table for n Boolean variables needs 2ⁿ − 1 numbers; independence assumptions cut this drastically.',
      ]],
      ['Bayesian networks', [
        'DAG with one CPT per node: P(x₁, …, xₙ) = Π P(xᵢ | parents(xᵢ)).',
        'A Boolean node with k Boolean parents needs 2ᵏ independent numbers.',
        'D-separation: chain A → B → C and fork A ← B → C are blocked by observing B. Collider A → B ← C is blocked unless B (or a descendant) is observed (explaining away).',
        'Each node is independent of its non-descendants given its parents; independent of everything given its Markov blanket (parents, children, children’s other parents).',
      ]],
      ['Variable elimination', [
        'Compute P(query | evidence) by summing out hidden variables one at a time, multiplying only the factors that involve them.',
        'Elimination order matters for cost; exact inference is NP-hard in general but linear in polytrees.',
      ]],
      ['Approximate inference by sampling', [
        '**Prior (direct) sampling** from the network in topological order. **Rejection sampling:** discard samples inconsistent with evidence (wasteful with rare evidence).',
        '**Likelihood weighting:** fix evidence variables and weight each sample by the likelihood of the evidence.',
        '**Gibbs sampling (MCMC):** resample one non-evidence variable at a time from its distribution given its Markov blanket.',
      ]],
    ],
    exam: ['Joint or conditional probability from a small Bayesian network (NAT).', 'Number of parameters of a network.', 'Which independence holds by d-separation?'],
    traps: ['Thinking observing a common effect keeps its causes independent; it makes them dependent (explaining away).'],
  },
};
