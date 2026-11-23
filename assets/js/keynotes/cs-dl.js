// Offline key notes: CS · Digital Logic. Keys are chapter ids from data.js.
export const CONTENT = {
  boolean: {
    overview: 'Boolean algebra questions ask you to simplify an expression, minimise a K-map, count prime implicants or implement a function with universal gates.',
    sections: [
      ['Laws and theorems', [
        'Absorption: A + AB = A; A(A + B) = A. Also A + A′B = A + B.',
        'Consensus: AB + A′C + BC = AB + A′C.',
        'De Morgan: (A + B)′ = A′B′; (AB)′ = A′ + B′. Duality: swap + and ·, 0 and 1.',
        'XOR: A ⊕ B = A′B + AB′; A ⊕ A = 0; A ⊕ 1 = A′; XOR is associative and commutative.',
      ]],
      ['K-map minimisation', [
        'Group 1s (for SOP) in powers of two, wrapping around edges; make groups as large as possible.',
        '**Prime implicant:** a group that cannot be enlarged. **Essential PI:** covers a minterm no other PI covers.',
        "Don't-cares (X) may be included in a group if they help make it larger; never required.",
        'POS: group the 0s and write complemented literals.',
      ]],
      ['Canonical forms and universal gates', [
        'Number of Boolean functions of n variables: 2^(2ⁿ). Self-dual functions: 2^(2ⁿ⁻¹).',
        'NAND and NOR are each functionally complete. A NOT needs 1 NAND; AND needs 2; OR needs 3; XOR needs 4 NAND gates.',
        'A function is functionally complete if it is not monotone, not linear, not self-dual, and does not preserve 0 or 1 (Post’s criteria).',
      ]],
    ],
    exam: ['Number of essential prime implicants of a given function.', 'Minimal number of NAND/NOR gates for a function.', 'Simplify an expression to a given form.'],
    traps: ['Forgetting the wrap-around adjacency of K-map corners.', 'Counting a don’t-care as a minterm that must be covered.'],
  },

  combinational: {
    overview: 'Combinational circuits have outputs that depend only on current inputs. Questions focus on adders, multiplexers used as function generators, decoders and propagation delay.',
    sections: [
      ['Adders and subtractors', [
        'Half adder: S = A ⊕ B, C = AB. Full adder: S = A ⊕ B ⊕ Cᵢₙ, Cₒᵤₜ = AB + Cᵢₙ(A ⊕ B).',
        'Ripple-carry adder delay grows linearly with n; carry-lookahead uses Gᵢ = AᵢBᵢ, Pᵢ = Aᵢ ⊕ Bᵢ, Cᵢ₊₁ = Gᵢ + PᵢCᵢ for O(log n) or constant-depth carries.',
        'Subtraction A − B = A + B′ + 1 (2’s complement), using XOR gates on B with Cᵢₙ = 1.',
      ]],
      ['Multiplexers and demultiplexers', [
        'A 2ⁿ:1 MUX implements any function of n variables directly, or of n + 1 variables using the extra variable (or its complement, 0, 1) on the data lines.',
        'Larger MUXes from smaller ones: a 16:1 needs five 4:1 MUXes.',
      ]],
      ['Decoders, encoders and comparators', [
        'n:2ⁿ decoder outputs every minterm; any function = OR of the chosen decoder outputs.',
        'Priority encoder: the highest-priority active input wins; a valid bit flags “no input”.',
        'Magnitude comparator: A = B when every bit pair is equal (XNOR); A > B from the most significant differing bit.',
      ]],
    ],
    exam: ['Find the function realised by a MUX circuit with variables on the select lines.', 'Total delay of a ripple-carry adder given gate delays.'],
    traps: ['Reading the MUX select-line order backwards (which variable is the MSB).', 'Assuming a carry-lookahead adder has no delay: it still has gate levels.'],
  },

  sequential: {
    overview: 'Sequential circuits have memory. High-weightage questions: flip-flop characteristic equations, counters (states, modulus, maximum frequency) and state machines.',
    sections: [
      ['Latches and flip-flops', [
        'SR: Q⁺ = S + R′Q, with S = R = 1 forbidden. D: Q⁺ = D. T: Q⁺ = T ⊕ Q. JK: Q⁺ = JQ′ + K′Q (J = K = 1 toggles).',
        'A latch is level-triggered; a flip-flop is edge-triggered. Race-around occurs in a level-triggered JK with J = K = 1; fixed by master–slave or edge triggering.',
        'Timing: setup time, hold time, clock-to-Q delay. Max clock frequency = 1/(t_clk→Q + t_comb + t_setup).',
      ]],
      ['Flip-flop conversion', [
        'Write the excitation table of the available flip-flop against the required characteristic table, then minimise. Example: JK from D needs D = JQ′ + K′Q; T from D needs D = T ⊕ Q.',
      ]],
      ['Counters and registers', [
        'n flip-flops: up to 2ⁿ states. Ring counter with n flip-flops: n states. Johnson (twisted-ring) counter: 2n states.',
        'Asynchronous (ripple) counter delay adds up: max frequency ≈ 1/(n·t_pd). Synchronous counters clock all flip-flops together.',
        'Mod-N counters reset or load at the Nth state; unused states should lead back into the main cycle (self-starting).',
        'Shift registers: SISO, SIPO, PISO, PIPO; n-bit serial-in needs n clocks to load.',
      ]],
      ['Finite state machines', [
        '**Moore:** output depends on state only. **Mealy:** output depends on state and input (usually fewer states, reacts a clock earlier).',
        'A sequence detector for a pattern of length k needs about k states (Mealy) or k + 1 (Moore).',
      ]],
    ],
    exam: ['Trace a counter from a given initial state and list the sequence.', 'Find the modulus of a counter built from JK or T flip-flops.', 'Maximum clock frequency from gate and flip-flop delays.'],
    traps: ['Treating a ripple counter as synchronous when computing delay.', 'Missing lock-out states in a counter with unused states.'],
  },

  'number-rep': {
    overview: 'Number representation is high-weightage: base conversion, signed representations, overflow, and IEEE 754 floating point.',
    sections: [
      ['Number systems', [
        'Base r to decimal: Σ dᵢ rⁱ. Decimal to base r: repeated division for the integer part, repeated multiplication for the fraction.',
        'Binary ↔ octal groups of 3 bits; binary ↔ hex groups of 4.',
        'Unknown-base problems: write both sides as polynomials in r and solve, remembering every digit must be less than r.',
      ]],
      ['Signed numbers', [
        'n-bit ranges: sign-magnitude and 1’s complement −(2ⁿ⁻¹ − 1) to 2ⁿ⁻¹ − 1 (two zeros); 2’s complement −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1 (one zero).',
        '2’s complement of x = invert bits + 1. Sign extension copies the MSB.',
        '**Overflow** in 2’s-complement addition: both operands have the same sign and the result’s sign differs; equivalently, carry into MSB ≠ carry out of MSB.',
      ]],
      ['IEEE 754 floating point', [
        'Single precision (32-bit): 1 sign, 8 exponent (bias 127), 23 fraction bits. Double: 1, 11 (bias 1023), 52.',
        'Normalised value = (−1)ˢ × 1.f × 2^(E − bias). Denormalised (E = 0): (−1)ˢ × 0.f × 2^(1 − bias).',
        'E all 1s: f = 0 means ±∞, f ≠ 0 means NaN. E = 0, f = 0 means ±0.',
      ]],
    ],
    formulas: ['Largest single-precision normal ≈ (2 − 2⁻²³) × 2¹²⁷; smallest normal = 2⁻¹²⁶.', 'Gray code: gᵢ = bᵢ ⊕ bᵢ₊₁ (MSB unchanged).'],
    exam: ['Convert a hex IEEE 754 pattern into a decimal value (NAT).', 'Detect overflow for a given addition of two n-bit numbers.'],
    traps: ['Forgetting the hidden 1 in normalised IEEE numbers, or adding it for denormals.', 'Using bias 128 instead of 127.'],
  },
};
