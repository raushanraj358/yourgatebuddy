// Offline key notes: CS · Compiler Design. Keys are chapter ids from data.js.
export const CONTENT = {
  lexical: {
    overview: 'Lexical analysis turns characters into tokens. Questions count tokens in a C fragment or relate regular expressions to the scanner’s DFA.',
    sections: [
      ['Tokens, lexemes and patterns', [
        '**Token:** category (identifier, keyword, number, operator). **Lexeme:** the actual characters. **Pattern:** the rule (regular expression).',
        'Comments and whitespace are stripped and produce no tokens; a string literal is one token.',
        'Longest match (maximal munch): “>=” is one token, “a+++b” is a ++ + b.',
      ]],
      ['From regular expressions to a DFA', [
        'Each token’s regular expression → NFA (Thompson) → combined DFA (subset construction) → minimised DFA.',
        'Ties between patterns are broken by the order of rules (keywords before identifiers).',
      ]],
      ['Lexical errors', [
        'Illegal characters, unterminated strings or comments. Recovery: panic mode (delete characters until a valid token starts).',
      ]],
    ],
    exam: ['Number of tokens in a given line of C code (NAT).'],
    traps: ['Counting the characters inside a string literal as separate tokens.'],
  },

  parsing: {
    overview: 'Parsing is the most asked compiler topic: FIRST and FOLLOW sets, LL(1) tables, and the LR family with their conflicts.',
    sections: [
      ['FIRST and FOLLOW', [
        'FIRST(α): terminals that can begin strings derived from α (plus ε if α ⇒ ε).',
        'FOLLOW(A): terminals that can appear right after A; $ is in FOLLOW(start).',
        'For B → αAβ, add FIRST(β) − {ε} to FOLLOW(A); if β ⇒ ε, add FOLLOW(B).',
      ]],
      ['LL(1) parsing', [
        'Top-down, leftmost derivation. Table entry M[A, a] = A → α for each a in FIRST(α); if ε ∈ FIRST(α), also for each a in FOLLOW(A).',
        'A grammar is LL(1) iff no table cell has two entries. Left-recursive or ambiguous grammars are never LL(1); left-factor and remove left recursion first.',
      ]],
      ['LR parsing', [
        'Bottom-up, rightmost derivation in reverse; shift–reduce with a stack.',
        'Power: LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1) (canonical LR). Every LL(1) grammar is LR(1).',
        'SLR reduces on FOLLOW(A); CLR uses exact lookaheads per item; LALR merges CLR states with the same core.',
        'Number of states: LR(0) = SLR = LALR ≤ CLR.',
      ]],
      ['Conflicts and operator precedence', [
        'Shift–reduce and reduce–reduce conflicts. Merging states in LALR can create reduce–reduce conflicts but never new shift–reduce conflicts.',
        'Operator-precedence parsers handle grammars with no ε-productions and no two adjacent non-terminals.',
        'YACC resolves shift–reduce conflicts by shifting by default.',
      ]],
    ],
    exam: ['FIRST/FOLLOW sets of a grammar.', 'Is the grammar LL(1) / SLR(1) / LALR(1)? Count conflicts or states.'],
    traps: ['Adding ε to FOLLOW sets; FOLLOW never contains ε.', 'Assuming LALR is as powerful as CLR.'],
  },

  sdt: {
    overview: 'Syntax-directed translation attaches attributes and actions to grammar rules. Questions evaluate an SDT on a string or classify attributes.',
    sections: [
      ['Attributes', [
        '**Synthesised:** computed from children (bottom-up). **Inherited:** from parent or left siblings.',
        '**S-attributed:** only synthesised attributes; evaluated during LR parsing.',
        '**L-attributed:** inherited attributes depend only on the parent and left siblings; evaluated in a left-to-right depth-first pass (suits LL parsing). Every S-attributed SDD is L-attributed.',
      ]],
      ['Evaluating translations', [
        'Draw the parse tree, then evaluate actions in the order the parser would execute them (post-order for bottom-up).',
        'Actions embedded mid-rule run when the parser reaches that point.',
      ]],
      ['Syntax trees and type checking', [
        'Abstract syntax trees drop punctuation and chain productions; DAGs share common subexpressions.',
        'Type checking: static (compile time) vs dynamic; type expressions, coercions, overloading.',
      ]],
    ],
    exam: ['Output printed by an SDT for a given input string.', 'Is a given SDD S-attributed or L-attributed?'],
    traps: ['Evaluating actions top-down when the parser is bottom-up.'],
  },

  optimisation: {
    overview: 'Intermediate code and optimisation: three-address code, basic blocks, DAG-based optimisations, liveness analysis and runtime environments.',
    sections: [
      ['Three-address code', [
        'At most one operator on the right: x = y op z. Forms: quadruples, triples, indirect triples.',
        'SSA form: each variable is assigned exactly once; φ-functions merge values at joins.',
      ]],
      ['Basic blocks and flow graphs', [
        'Leaders: the first statement, any branch target, and any statement right after a branch. A block runs from one leader to the next.',
        'Edges of the control-flow graph follow jumps and fall-through.',
      ]],
      ['Local optimisations', [
        'Constant folding and propagation, common subexpression elimination (via a DAG), copy propagation, dead-code elimination, strength reduction, loop-invariant code motion.',
        'The DAG of a block: number of nodes = distinct values computed.',
      ]],
      ['Data-flow analysis', [
        '**Liveness (backward):** IN[B] = USE[B] ∪ (OUT[B] − DEF[B]); OUT[B] = ∪ IN[successors].',
        '**Reaching definitions (forward):** OUT = GEN ∪ (IN − KILL).',
        'Register allocation uses an interference graph of simultaneously live variables (graph colouring).',
      ]],
      ['Runtime environments', [
        'Activation records hold parameters, return address, saved registers, locals and links (control link, access link).',
        'Stack allocation for recursion; heap for dynamic data; static for globals.',
      ]],
    ],
    exam: ['Number of basic blocks or edges in the CFG (NAT).', 'Minimum registers needed for a block, or live variables at a point.'],
    traps: ['Liveness flows backwards; computing it forwards gives wrong sets.'],
  },
};
