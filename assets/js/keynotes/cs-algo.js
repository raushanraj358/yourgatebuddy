// Offline key notes: CS · Algorithms. Keys are chapter ids from data.js.
export const CONTENT = {
  asymptotic: {
    overview: 'Asymptotic analysis is the foundation of the Algorithms paper: comparing growth rates, counting loop iterations and solving recurrences.',
    sections: [
      ['Notation', [
        'f = O(g): f grows no faster than g (upper bound). f = Ω(g): lower bound. f = Θ(g): both.',
        'o and ω are strict versions: f = o(g) means f/g → 0.',
        'Growth order: 1 < log log n < log n < √n < n < n log n < n² < n³ < 2ⁿ < n! < nⁿ.',
        'log(n!) = Θ(n log n). Any polynomial in log n is o(nᵋ) for every ε > 0. Bases of logs do not matter inside O, but bases of exponents do (2ⁿ vs 3ⁿ).',
      ]],
      ['Recurrences and the Master theorem', [
        'T(n) = aT(n/b) + f(n). Compare f(n) with n^(log_b a):',
        'Case 1: f smaller by a polynomial factor ⇒ T = Θ(n^(log_b a)).',
        'Case 2: f = Θ(n^(log_b a) logᵏ n) ⇒ T = Θ(n^(log_b a) logᵏ⁺¹ n).',
        'Case 3: f larger by a polynomial factor (and regular) ⇒ T = Θ(f(n)).',
        'Not covered: T(n) = T(n − 1) + n gives Θ(n²); T(n) = 2T(n − 1) + 1 gives Θ(2ⁿ); T(n) = T(√n) + 1 gives Θ(log log n).',
      ]],
      ['Loop counting', [
        'Nested loops with i doubling: for (i = 1; i < n; i ∗= 2) runs log n times.',
        'for i in 1..n, for j in 1..i: n(n + 1)/2 iterations. Inner loop j = j × 2 up to i: Σ log i = Θ(n log n).',
        'Harmonic series: Σ n/i = Θ(n log n).',
      ]],
    ],
    exam: ['Order a list of functions by growth rate.', 'Solve a recurrence or count how many times a statement runs.'],
    traps: ['Applying the Master theorem when f(n) is n/log n relative to n^(log_b a) (the gap is not polynomial).', 'Treating 2^(2n) as O(2ⁿ); it is 4ⁿ.'],
  },

  sorting: {
    overview: 'Searching and sorting questions compare algorithms by time, space, stability and behaviour on special inputs, and ask how many comparisons or swaps happen.',
    sections: [
      ['Comparison sorts', [
        '**Quick sort:** average Θ(n log n), worst Θ(n²) (already sorted input with first/last pivot); in place; not stable.',
        '**Merge sort:** Θ(n log n) always; O(n) extra space for arrays; stable.',
        '**Heap sort:** Θ(n log n); in place; not stable.',
        '**Insertion sort:** best Θ(n) on sorted input, worst Θ(n²); stable; number of shifts = number of inversions.',
        '**Selection sort:** Θ(n²) comparisons always, but only n − 1 swaps; not stable.',
        '**Bubble sort:** Θ(n²); with an early-exit flag Θ(n) best case; stable.',
      ]],
      ['Lower bound', [
        'Any comparison sort needs Ω(n log n) comparisons in the worst case: a decision tree with n! leaves has height ≥ log₂(n!).',
        'Finding min and max together needs about 3n/2 comparisons; the second largest needs n + ⌈log n⌉ − 2.',
      ]],
      ['Linear-time sorts', [
        '**Counting sort:** Θ(n + k) for keys in 0..k; stable.',
        '**Radix sort:** d passes of a stable sort, Θ(d(n + b)).',
        '**Bucket sort:** expected Θ(n) for uniformly distributed input.',
      ]],
      ['Binary search', [
        'Θ(log n) on a sorted array; at most ⌊log₂n⌋ + 1 comparisons.',
        'Also finds the first or last occurrence, insertion position, or the root of a monotone function.',
      ]],
    ],
    exam: ['Which algorithm gives the best worst case on a nearly sorted array?', 'Number of swaps or passes for a given input.', 'Quick sort recurrence when the pivot splits in a fixed ratio (still Θ(n log n)).'],
    traps: ['Thinking quick sort is worst on random input; it is worst on sorted or reverse-sorted input with naïve pivots.', 'A 1:99 split still gives Θ(n log n) for quick sort.'],
  },

  greedy: {
    overview: 'Greedy algorithms make the locally best choice. GATE asks you to run them: activity selection, Huffman codes, fractional knapsack and job sequencing.',
    sections: [
      ['Activity selection', [
        'Sort by finish time; repeatedly pick the next activity that starts after the last chosen one finishes. O(n log n).',
      ]],
      ['Huffman coding', [
        'Repeatedly merge the two least frequent nodes. Frequent symbols get short codes; the code is prefix-free.',
        'Average code length = Σ fᵢ × depthᵢ / Σ fᵢ. Built with a min-heap in O(n log n).',
      ]],
      ['Fractional knapsack', [
        'Sort by value/weight ratio and take items greedily, taking a fraction of the last. Optimal for the fractional version only.',
        'Greedy fails for 0/1 knapsack; that needs dynamic programming.',
      ]],
      ['Job sequencing with deadlines', [
        'Sort jobs by profit (descending); place each in the latest free slot on or before its deadline.',
      ]],
      ['Why greedy works', [
        'Needs the greedy-choice property and optimal substructure. Minimum spanning trees (Prim, Kruskal) and Dijkstra are greedy too.',
      ]],
    ],
    exam: ['Average bits per symbol of a Huffman code (NAT).', 'Maximum profit from job sequencing or fractional knapsack.'],
    traps: ['Ties in Huffman merging can give different trees, but the average length is the same.'],
  },

  dp: {
    overview: 'Dynamic programming is high-weightage: define subproblems, write the recurrence, and fill a table. GATE often gives a recurrence or table and asks for a value.',
    sections: [
      ['Method', [
        'Optimal substructure + overlapping subproblems. Top-down with memoisation or bottom-up tabulation.',
        'Time = number of subproblems × time per subproblem.',
      ]],
      ['Classic problems', [
        '**0/1 knapsack:** K[i][w] = max(K[i − 1][w], vᵢ + K[i − 1][w − wᵢ]); O(nW), pseudo-polynomial.',
        '**LCS:** L[i][j] = L[i − 1][j − 1] + 1 if xᵢ = yⱼ, else max(L[i − 1][j], L[i][j − 1]); O(mn).',
        '**Matrix chain:** m[i][j] = min over k of m[i][k] + m[k + 1][j] + pᵢ₋₁pₖpⱼ; O(n³).',
        '**Edit distance:** D[i][j] = min(D[i − 1][j] + 1, D[i][j − 1] + 1, D[i − 1][j − 1] + [xᵢ ≠ yⱼ]).',
        '**Optimal BST:** cost[i][j] = min over roots r of cost[i][r − 1] + cost[r + 1][j] + Σ freq(i..j); O(n³).',
        '**Floyd–Warshall:** d[i][j] = min(d[i][j], d[i][k] + d[k][j]) for k = 1..n; Θ(V³); handles negative edges but not negative cycles.',
        '**Bellman–Ford** and **subset sum** are DP as well.',
      ]],
    ],
    formulas: ['Number of ways to parenthesise a chain of n matrices = Cₙ₋₁ (Catalan).'],
    exam: ['Fill a small LCS or matrix-chain table and report the answer (NAT).', 'Identify the recurrence that a given DP computes.'],
    traps: ['Matrix chain uses pᵢ₋₁pₖpⱼ; off-by-one in the dimension array is the most common slip.', 'Calling 0/1 knapsack polynomial; O(nW) is pseudo-polynomial.'],
  },

  'divide-conquer': {
    overview: 'Divide and conquer splits a problem, solves the parts recursively and combines them. Questions are about recurrences and running times.',
    sections: [
      ['Standard algorithms', [
        'Merge sort: T(n) = 2T(n/2) + Θ(n) = Θ(n log n).',
        'Quick sort: best/average Θ(n log n), worst Θ(n²).',
        'Binary search: T(n) = T(n/2) + 1 = Θ(log n).',
        "Strassen's matrix multiplication: 7 multiplications of n/2 matrices, T(n) = 7T(n/2) + Θ(n²) = Θ(n^(log₂7)) ≈ Θ(n^2.81).",
        'Karatsuba integer multiplication: 3 sub-multiplications, Θ(n^(log₂3)) ≈ Θ(n^1.58).',
      ]],
      ['Selection and closest pair', [
        'Median of medians finds the k-th smallest in Θ(n) worst case; randomised quickselect is Θ(n) expected.',
        'Closest pair of points: Θ(n log n) by splitting on x and checking a strip.',
        'Maximum subarray: Θ(n log n) by divide and conquer, Θ(n) by Kadane’s algorithm.',
      ]],
    ],
    exam: ['Recurrence and complexity of a given divide-and-conquer procedure.', 'Number of multiplications in Strassen’s method for a given size.'],
    traps: ['Forgetting the combine cost when writing the recurrence.'],
  },

  'graph-algorithms': {
    overview: 'Graph algorithms are high-weightage: BFS/DFS properties, minimum spanning trees, shortest paths, topological sort and components.',
    sections: [
      ['BFS and DFS', [
        'Both O(V + E). BFS gives shortest paths (fewest edges) in unweighted graphs.',
        'DFS edge types: tree, back, forward, cross. A directed graph has a cycle iff DFS finds a back edge.',
        'In an undirected DFS there are no cross or forward edges.',
      ]],
      ['Minimum spanning trees', [
        '**Kruskal:** sort edges, add if no cycle (union–find); O(E log E).',
        '**Prim:** grow from a vertex using a priority queue; O(E log V) with a binary heap, O(V²) with an array.',
        'Cut property: the lightest edge across any cut is in some MST. With distinct weights the MST is unique.',
        'The heaviest edge of a cycle (strictly heaviest) is in no MST.',
      ]],
      ['Shortest paths', [
        '**Dijkstra:** non-negative weights; O((V + E) log V) with a binary heap.',
        '**Bellman–Ford:** negative edges allowed; V − 1 rounds of relaxation; O(VE); a V-th round that still relaxes means a negative cycle.',
        'DAG: relax in topological order, O(V + E), even with negative edges.',
        '**Floyd–Warshall:** all pairs, Θ(V³).',
      ]],
      ['Topological sort and components', [
        'Topological order exists iff the graph is a DAG; by DFS finishing times (reverse) or Kahn’s algorithm (in-degree 0 queue).',
        'Strongly connected components: Kosaraju or Tarjan, O(V + E).',
      ]],
    ],
    exam: ['Run Dijkstra or Prim and give the order vertices are finalised.', 'MST weight (NAT) or which edges must be in every MST.', 'Number of topological orders of a small DAG.'],
    traps: ['Using Dijkstra with negative edges.', 'Assuming an MST gives shortest paths between vertices; it does not.'],
  },
};
