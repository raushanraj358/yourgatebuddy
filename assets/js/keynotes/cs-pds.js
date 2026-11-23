// Offline key notes: CS · Programming & Data Structures. Keys are chapter ids from data.js.
export const CONTENT = {
  c: {
    overview: 'C programming questions are “what does this print?” puzzles. They test operator precedence, pointers and arrays, parameter passing, storage classes and strings. Trace carefully on paper.',
    sections: [
      ['Operators and types', [
        'Precedence (high to low): postfix ++ -- () [] -> . ; unary ++ -- ! ~ & sizeof (casts); multiplicative; additive; shifts; relational; equality; &; ^; |; &&; ||; ?:; assignment; comma.',
        '&& and || short-circuit: the right side may never run (side effects skipped).',
        'Integer division truncates towards zero; % takes the sign of the dividend in C99.',
        'Modifying a variable twice without a sequence point (i = i++ + ++i) is undefined behaviour.',
      ]],
      ['Pointers and arrays', [
        '`a[i]` ≡ `*(a + i)` ≡ `i[a]`. An array name decays to a pointer to its first element (except with sizeof and &).',
        'Pointer arithmetic scales by the size of the pointed-to type. &a + 1 skips the whole array.',
        '`int *p[10]` is an array of 10 pointers; `int (*p)[10]` is a pointer to an array of 10 ints.',
        'For `int a[3][4]`, `a + 1` moves one row (4 ints) and `*(a + 1) + 2` points to `a[1][2]`.',
      ]],
      ['Functions and parameter passing', [
        'C passes everything by value; passing a pointer lets the function change the caller’s variable.',
        'GATE also asks call by reference, value-result and name in pseudo-code: trace each variable’s binding carefully.',
        'Arrays are passed as pointers, so sizeof inside the function gives the pointer size.',
      ]],
      ['Storage classes and scope', [
        '**auto:** local, garbage initial value. **static:** keeps its value between calls; initialised once (to 0 by default).',
        '**extern:** declared here, defined elsewhere. **register:** hint; cannot take its address.',
        'Static scoping (C): a free variable refers to the nearest enclosing definition in the program text. Dynamic scoping uses the most recent active binding at run time.',
      ]],
      ['Strings and structures', [
        'A string literal ends with \'\\0\'; strlen excludes it, sizeof("abc") is 4.',
        '`char *s = "abc"` points to read-only storage; modifying it is undefined. `char s[] = "abc"` is a modifiable copy.',
        'Structure size includes padding for alignment; a union’s size is that of its largest member (plus padding).',
      ]],
    ],
    exam: ['Output of a code fragment with pointers, static variables or recursion.', 'Static vs dynamic scoping outputs for the same program.'],
    traps: ['Forgetting that static locals are initialised only once.', 'Confusing `*p++` (increments the pointer) with `(*p)++` (increments the value).'],
  },

  recursion: {
    overview: 'Recursion questions ask for the output or return value of a recursive function, or the number of calls it makes. Draw the recursion tree.',
    sections: [
      ['Tracing', [
        'Write each call on a new line with its parameters; return values flow back up the tree.',
        'Statements before the recursive call run on the way down; statements after it run on the way back (reversed order).',
        'Memoise values you have already computed (f(3) might be called many times).',
      ]],
      ['Recursion trees and counting calls', [
        'Calls for naïve Fibonacci fib(n): C(n) = C(n − 1) + C(n − 2) + 1, which is 2·Fib(n + 1) − 1.',
        'A function that calls itself twice with n − 1 makes 2ⁿ⁺¹ − 1 calls in total; with n/2, about 2n.',
        'Stack depth (not total calls) decides memory use: O(n) for linear recursion, O(log n) for halving.',
      ]],
      ['Tail recursion', [
        'The recursive call is the last action, so nothing remains to do after it returns. Compilers can turn it into a loop (constant stack).',
        'Accumulator parameters convert many recursions into tail form, e.g. fact(n, acc).',
      ]],
    ],
    exam: ['Return value of a recursive function for a small input (NAT).', 'Number of times a line executes or a function is called.'],
    traps: ['Losing track of print statements placed after the recursive call.', 'Forgetting the base case value when two base cases exist.'],
  },

  linear: {
    overview: 'Arrays, stacks and queues questions cover address calculation, expression conversion and evaluation, and queue implementations.',
    sections: [
      ['Array address calculation', [
        '1-D: addr(a[i]) = base + (i − lb) × size.',
        'Row-major 2-D a[m][n]: base + ((i − lb₁) × n + (j − lb₂)) × size. Column-major: base + ((j − lb₂) × m + (i − lb₁)) × size.',
        'Lower-triangular matrix stored row-wise: element (i, j), i ≥ j, at index i(i − 1)/2 + (j − 1) for 1-based indices.',
      ]],
      ['Stacks', [
        'Infix to postfix: operands go out; push operators after popping those with higher (or equal, for left-associative) precedence; ^ is right-associative.',
        'Evaluate postfix: push operands; on an operator, pop two (second popped is the left operand), apply, push.',
        'Other uses: function calls, recursion, balanced parentheses, undo.',
        'Number of distinct output permutations of 1..n through a stack = Catalan number Cₙ.',
      ]],
      ['Queues', [
        'Circular queue of size n (one slot left empty): full when (rear + 1) mod n = front; empty when front = rear.',
        'Queue using two stacks: amortised O(1) per operation. Stack using two queues: one operation becomes O(n).',
        '**Deque:** insert/delete at both ends. **Priority queue:** usually a binary heap.',
      ]],
    ],
    exam: ['Postfix value of an expression or the stack contents at a step.', 'Address of an element in row- or column-major order (NAT).'],
    traps: ['Popping operands in the wrong order for − and /.', 'Treating ^ as left-associative.'],
  },

  'linked-lists': {
    overview: 'Linked lists questions test pointer manipulation code (what does this function do to the list?) and the cost of operations.',
    sections: [
      ['Singly linked lists', [
        'Insert at head O(1); insert at tail O(n) without a tail pointer; search O(n); no random access.',
        'Deleting a node needs its predecessor (O(n) to find) unless you copy the next node’s data into it (fails for the last node).',
        'Reverse in place with three pointers prev, cur, next.',
        'Floyd’s cycle detection: slow moves 1, fast moves 2; they meet inside the cycle if one exists. Middle node: fast/slow pointers.',
      ]],
      ['Doubly and circular lists', [
        'Doubly linked: O(1) deletion given the node; two pointers per node.',
        'Circular: last node points to the first; with a pointer to the last node, both head and tail insertion are O(1).',
      ]],
      ['Complexities', [
        'Merging two sorted lists: O(m + n). Merge sort on a linked list: O(n log n), no extra array.',
        'Binary search is not efficient on a linked list (finding the middle is O(n)).',
      ]],
    ],
    exam: ['What does this function do (reverse, rotate, remove alternate nodes)?', 'Worst-case cost of an operation on a sorted/unsorted, singly/doubly list.'],
    traps: ['Losing the rest of the list by overwriting next before saving it.', 'Off-by-one in loops that stop at node versus node->next.'],
  },

  trees: {
    overview: 'Trees and BSTs are high-weightage: traversals, reconstructing trees, BST operations, AVL rotations and counting properties.',
    sections: [
      ['Traversals', [
        'Pre-order (root, left, right), in-order (left, root, right), post-order (left, right, root), level-order (BFS).',
        'In-order with pre-order or post-order identifies a binary tree uniquely; pre-order with post-order does not (unless the tree is full).',
        'In-order of a BST is sorted; so the pre-order alone fixes a BST.',
      ]],
      ['BST operations', [
        'Search, insert, delete: O(h); h is log n if balanced, n in the worst case (sorted insertions).',
        'Delete a node with two children: replace with in-order successor (or predecessor).',
        'Number of distinct BSTs on n keys = Catalan number Cₙ.',
      ]],
      ['AVL trees', [
        'Balance factor of every node is −1, 0 or +1. Height is O(log n).',
        'Rotations: LL → right rotate; RR → left rotate; LR → left then right; RL → right then left.',
        'Minimum nodes in an AVL tree of height h: N(h) = N(h − 1) + N(h − 2) + 1 with N(0) = 1, N(1) = 2.',
      ]],
      ['Counting and properties', [
        'Binary tree of height h (root at height 0): at most 2^(h+1) − 1 nodes.',
        'In any binary tree, leaves = nodes with two children + 1.',
        'A full (strict) binary tree with n internal nodes has n + 1 leaves; total 2n + 1 nodes.',
        'Unlabelled binary trees with n nodes = Cₙ; labelled = n! × Cₙ.',
      ]],
    ],
    exam: ['Construct the tree from two traversals and report the third.', 'Height or minimum nodes of an AVL tree (NAT).', 'Number of BSTs or binary trees with n nodes.'],
    traps: ['Mixing height conventions (root at height 0 or 1). Read the question’s definition.', 'Assuming a BST stays balanced; worst-case height is n − 1.'],
  },

  heaps: {
    overview: 'Heaps, graphs and hashing: heap operations and their costs, graph representations, and hashing with collision resolution.',
    sections: [
      ['Binary heaps', [
        'Complete binary tree in an array: children of i at 2i and 2i + 1 (1-based); parent at ⌊i/2⌋.',
        'Insert and delete-min/max: O(log n). Find min/max: O(1). Search for an arbitrary key: O(n).',
        'Build-heap by bottom-up heapify: O(n). Inserting one by one: O(n log n).',
        'In a max-heap the minimum is among the leaves (indices ⌊n/2⌋ + 1 to n).',
      ]],
      ['Graph representations', [
        'Adjacency matrix: O(V²) space, O(1) edge check. Adjacency list: O(V + E) space, better for sparse graphs.',
        'BFS/DFS: O(V + E) with lists, O(V²) with a matrix.',
      ]],
      ['Hashing', [
        'Load factor α = n/m. Chaining: expected search O(1 + α).',
        'Open addressing: linear probing (primary clustering), quadratic probing (secondary clustering), double hashing h(k, i) = (h₁(k) + i·h₂(k)) mod m.',
        'Expected probes for unsuccessful search with uniform hashing ≈ 1/(1 − α).',
        'Deleting in open addressing needs a “deleted” marker, not an empty slot.',
      ]],
    ],
    exam: ['Array contents after inserting keys into a heap or after one delete.', 'Final hash table after inserting keys with linear probing.'],
    traps: ['Using 0-based child formulas (2i + 1, 2i + 2) when the question uses 1-based indexing, or vice versa.', 'Believing build-heap takes O(n log n).'],
  },
};
