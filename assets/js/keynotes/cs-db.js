// Offline key notes: CS · Databases. Keys are chapter ids from data.js.
export const CONTENT = {
  er: {
    overview: 'ER modelling questions usually ask for the minimum number of tables when an ER diagram is converted to relations.',
    sections: [
      ['Building blocks', [
        'Entities, attributes (simple, composite, multivalued, derived), relationships, keys.',
        'Weak entity: no key of its own; identified by its owner plus a partial key (double rectangle).',
      ]],
      ['Cardinality and participation', [
        'One-to-one, one-to-many, many-to-many. Total participation (double line) means every entity takes part.',
      ]],
      ['ER to relational mapping', [
        'Each strong entity → a table. Multivalued attribute → a separate table.',
        '1:N relationship → foreign key on the N side (no extra table). 1:1 → foreign key on either side (merge if total participation on both).',
        'M:N relationship → separate table with both keys.',
        'Weak entity → table including the owner’s key.',
      ]],
    ],
    exam: ['Minimum number of tables for a given ER diagram (NAT).'],
    traps: ['Creating a separate table for every relationship, including 1:N ones.'],
  },

  sql: {
    overview: 'Relational algebra and SQL questions ask what a query returns, how many tuples a join produces, or which queries are equivalent.',
    sections: [
      ['Relational algebra', [
        'σ (select rows), π (project columns, removes duplicates), ⋈ (join), ∪, −, ×, ρ (rename), ÷ (division: “for all” queries).',
        'Natural join on no common attribute is a cross product. |R × S| = |R|·|S|.',
        'Outer joins keep unmatched tuples, padding with NULL.',
      ]],
      ['Relational calculus', [
        'Tuple relational calculus {t | P(t)}; safe expressions only. Relational algebra, safe TRC and safe DRC are equally expressive.',
      ]],
      ['SQL queries and joins', [
        'SQL keeps duplicates unless DISTINCT is used (bag semantics).',
        'WHERE filters rows before grouping; HAVING filters groups after aggregation.',
        'NULL: comparisons give UNKNOWN; WHERE keeps only TRUE rows. COUNT(∗) counts rows; COUNT(col) ignores NULLs. NOT IN with a NULL in the subquery returns no rows.',
      ]],
      ['Aggregation and nested queries', [
        'GROUP BY: every selected column must be grouped or aggregated.',
        'EXISTS / NOT EXISTS for correlated queries; “> ALL” means greater than the maximum; “> ANY” means greater than the minimum.',
      ]],
    ],
    exam: ['Number of rows returned by a query on given tables (NAT).', 'Which relational algebra expression matches an English query?'],
    traps: ['Forgetting that π removes duplicates in algebra while SELECT does not in SQL.', 'Comparing with NULL using = instead of IS NULL.'],
  },

  normalisation: {
    overview: 'Normalisation is high-weightage: attribute closure, candidate keys, the highest normal form of a relation, and decomposition properties.',
    sections: [
      ['Functional dependencies', [
        'X⁺ (closure): all attributes determined by X using Armstrong’s axioms (reflexivity, augmentation, transitivity).',
        'X is a super key if X⁺ contains all attributes; a candidate key is a minimal super key.',
        'Attributes never on a right-hand side must be in every key. Minimal cover: single attributes on the right, no extraneous left attributes, no redundant FDs.',
      ]],
      ['Normal forms', [
        '**1NF:** atomic values. **2NF:** no partial dependency of a non-prime attribute on part of a candidate key.',
        '**3NF:** for every X → A, X is a super key or A is prime.',
        '**BCNF:** for every non-trivial X → A, X is a super key.',
        'If every candidate key is a single attribute, the relation is automatically in 2NF.',
      ]],
      ['Decomposition', [
        '**Lossless:** R₁ ∩ R₂ → R₁ or R₁ ∩ R₂ → R₂ (for a binary split).',
        '**Dependency preserving:** the union of FDs on the parts implies the original FDs.',
        '3NF decomposition can always be lossless and dependency preserving; BCNF can always be lossless but not always dependency preserving.',
      ]],
    ],
    formulas: ['A relation with n attributes has at most 2ⁿ − 1 super keys.', 'If a single attribute A is a key, the number of super keys is 2ⁿ⁻¹.'],
    exam: ['Number of candidate keys or super keys (NAT).', 'Highest normal form of a relation with given FDs.', 'Is this decomposition lossless / dependency preserving?'],
    traps: ['Calling a relation BCNF because it is in 3NF; check every FD’s left side is a super key.'],
  },

  transactions: {
    overview: 'Transactions and concurrency control are high-weightage: serialisability tests, recoverability classes, and locking/timestamp protocols.',
    sections: [
      ['ACID properties', ['Atomicity (all or nothing, via undo logs), Consistency, Isolation (concurrency control), Durability (redo logs).']],
      ['Serialisability', [
        '**Conflict serialisable:** the precedence graph (edge Tᵢ → Tⱼ for conflicting operations, Tᵢ first) is acyclic. Conflicts: RW, WR, WW on the same item by different transactions.',
        '**View serialisable:** same initial reads, reads-from and final writes as some serial schedule. Every conflict-serialisable schedule is view serialisable; view-but-not-conflict cases involve blind writes.',
        'Number of serial orders consistent with an acyclic precedence graph = number of its topological orders.',
      ]],
      ['Recoverability', [
        '**Recoverable:** a transaction commits only after every transaction it read from has committed.',
        '**Cascadeless:** reads only committed data. **Strict:** no read or write of an item until the last writer commits or aborts.',
        'Strict ⊂ cascadeless ⊂ recoverable.',
      ]],
      ['Locking and timestamps', [
        '**2PL:** growing then shrinking phase; guarantees conflict serialisability but not freedom from deadlock or cascading aborts.',
        '**Strict 2PL:** hold exclusive locks until commit (cascadeless). **Rigorous 2PL:** hold all locks until commit.',
        '**Timestamp ordering:** older transactions take priority; Thomas’ write rule ignores obsolete writes (allows some view-serialisable schedules).',
        'Wait-die (older waits, younger dies) and wound-wait (older wounds younger) prevent deadlock.',
      ]],
    ],
    exam: ['Is a schedule conflict serialisable / recoverable / cascadeless?', 'Number of conflict-equivalent serial schedules (NAT).'],
    traps: ['Treating read–read as a conflict.', 'Thinking 2PL prevents deadlock.'],
  },

  indexing: {
    overview: 'Indexing questions compute B/B+ tree order from block size, the number of block accesses, or tree height bounds.',
    sections: [
      ['Index types', [
        '**Primary:** on the ordering key of a sorted file; sparse (one entry per block).',
        '**Clustering:** on a non-key ordering field. **Secondary:** on a non-ordering field; dense.',
        'A file can have at most one primary or clustering index but many secondary indexes.',
      ]],
      ['B and B+ trees', [
        'B+ tree internal node of order p: p pointers and p − 1 keys, so p·P + (p − 1)·K ≤ block size.',
        'B+ leaf: keys with record pointers plus one next-leaf pointer. All data pointers are in leaves; leaves are linked for range queries.',
        'Every node except the root is at least half full: ⌈p/2⌉ children.',
        'Accesses to find a record = height of the tree + 1 (data block).',
      ]],
      ['File organisation', [
        'Blocking factor = ⌊block size / record size⌋. Blocks = ⌈records / bfr⌉.',
        'Binary search on a sorted file of b blocks costs ⌈log₂b⌉ block accesses; with a single-level index of bᵢ blocks, ⌈log₂bᵢ⌉ + 1.',
      ]],
    ],
    exam: ['Order of a B+ tree node for given block, key and pointer sizes (NAT).', 'Minimum/maximum number of keys or levels.'],
    traps: ['Using the internal-node formula for leaves (leaves store record pointers and one sibling pointer).'],
  },
};
