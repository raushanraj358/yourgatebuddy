// Offline key notes: DA · Programming, Data Structures & Algorithms. Builds on the CS notes. Keys are chapter ids.
import { CONTENT as PDS } from './cs-pds.js';
import { CONTENT as ALGO } from './cs-algo.js';

export const CONTENT = {
  python: {
    overview: 'Python programming: data types and mutability, functions and recursion, and tracing program output — the usual GATE DA format.',
    sections: [
      ['Python basics and data types', [
        'Immutable: int, float, str, tuple, frozenset. Mutable: list, dict, set.',
        'Assignment binds names to objects: b = a for a list makes both names refer to the same list; a.copy() or a[:] makes a shallow copy.',
        'Integer division // floors towards −∞ (−7 // 2 = −4); % takes the sign of the divisor (−7 % 2 = 1). / always gives a float.',
        'Slicing s[start:stop:step] excludes stop; s[::-1] reverses. Negative indices count from the end.',
        'range(a, b, s) excludes b. List comprehension [f(x) for x in xs if cond].',
        'Dictionaries keep insertion order (Python 3.7+); keys must be hashable.',
      ]],
      ['Functions and recursion', [
        'Arguments are passed by object reference: mutating a list inside a function affects the caller; rebinding the parameter does not.',
        'Default arguments are evaluated once: def f(x, acc=[]) shares one list across calls (a classic trap).',
        'Scope (LEGB): local, enclosing, global, built-in. Assigning inside a function makes a name local unless declared global/nonlocal.',
        'Default recursion limit is about 1000; Python has no tail-call optimisation.',
      ]],
      ['Tracing program output', [
        'Track every variable in a table for each loop iteration; watch for in-place list changes (append, sort, +=).',
        'a += [x] modifies the list in place; a = a + [x] creates a new list.',
        'Generators and iterators are consumed once.',
        'Closures capture variables, not values: lambdas created in a loop all see the final loop value.',
      ]],
    ],
    exam: ['Output of a short Python program (NAT or MCQ).', 'Return value of a recursive function.'],
    traps: ['Mutable default arguments and aliasing between list names.', 'Floor division with negative numbers.'],
  },

  ds: {
    overview: 'Data structures: stacks and queues, linked lists, trees and binary search trees, and hash tables.',
    sections: [
      PDS.linear.sections.find((s) => s[0] === 'Stacks'),
      PDS.linear.sections.find((s) => s[0] === 'Queues'),
      PDS['linked-lists'].sections[0],
      ...PDS.trees.sections.slice(0, 2),
      PDS.trees.sections.find((s) => s[0] === 'Counting and properties'),
      PDS.heaps.sections.find((s) => s[0] === 'Hashing'),
    ],
    exam: ['Contents of a stack or queue after operations.', 'Traversal of a BST built from keys.', 'Final hash table with linear probing.'],
    traps: [...PDS.trees.traps, ...PDS.heaps.traps.slice(0, 1)],
  },

  sorting: {
    overview: 'Sorting and searching: linear and binary search, elementary sorts, merge and quick sort, and complexity analysis.',
    sections: [
      ALGO.sorting.sections.find((s) => s[0] === 'Binary search'),
      ['Linear search', ['O(n); works on unsorted data and linked lists. Average comparisons for a successful search ≈ (n + 1)/2.']],
      ...ALGO.sorting.sections.filter((s) => s[0] !== 'Binary search'),
      ...ALGO.asymptotic.sections,
    ],
    exam: ['Number of comparisons or swaps for a given array.', 'Best/worst-case complexity of a sort.', 'Solve a recurrence.'],
    traps: [...ALGO.sorting.traps, ...ALGO.asymptotic.traps],
  },

  graphs: {
    overview: 'Graph algorithms: BFS and DFS, and shortest paths.',
    sections: [
      ALGO['graph-algorithms'].sections.find((s) => s[0] === 'BFS and DFS'),
      ALGO['graph-algorithms'].sections.find((s) => s[0] === 'Shortest paths'),
      ALGO['graph-algorithms'].sections.find((s) => s[0] === 'Topological sort and components'),
      PDS.heaps.sections.find((s) => s[0] === 'Graph representations'),
    ],
    exam: ['Order of nodes visited by BFS/DFS.', 'Shortest-path distance by Dijkstra (NAT).'],
    traps: ['Using Dijkstra with negative edge weights.'],
  },
};
