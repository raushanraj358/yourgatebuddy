// Offline question bank (no internet or AI needed) and helpers that turn it into quiz questions.
// Item: [paper ('*' = every paper), subject id, chapter id, question, [A, B, C, D], index of correct option, explanation, marks (1 or 2)].
// Explanations must not refer to "option A/B…" because options are shuffled.
import { BRANCH, SUBJECTS, chaptersOf, chapterById } from './data.js';

export const BANK = [
  ["*", "em", "calculus", "The derivative of x·eˣ at x = 0 is", ["0", "1", "e", "2"], 1, "d/dx(x eˣ) = eˣ + x eˣ, which is 1 at x = 0.", 1],
  ["*", "em", "calculus", "∫₀¹ x² dx equals", ["1/2", "1/3", "1/4", "1"], 1, "x³/3 evaluated from 0 to 1 = 1/3.", 1],
  ["*", "em", "calculus", "lim (x → 0) sin(3x)/x equals", ["0", "1", "3", "1/3"], 2, "sin(3x)/x = 3 · sin(3x)/(3x), which tends to 3.", 1],
  ["*", "em", "calculus", "The function f(x) = x³ − 3x has a local maximum at", ["x = −1", "x = 0", "x = 1", "x = 3"], 0, "f′(x) = 3x² − 3 = 0 gives x = ±1. f″(−1) = −6 < 0, so x = −1 is a local maximum.", 2],
  ["*", "em", "complex-variables", "The residue of f(z) = 1/(z − 2) at z = 2 is", ["0", "1", "2", "1/2"], 1, "For a simple pole with numerator 1, the residue is 1.", 1],
  ["*", "em", "complex-variables", "|3 + 4i| equals", ["5", "7", "25", "√7"], 0, "|a + bi| = √(a² + b²) = √(9 + 16) = 5.", 1],
  ["*", "em", "differential-equations", "The solution of dy/dx = y with y(0) = 1 is", ["y = x + 1", "y = eˣ", "y = e⁻ˣ", "y = ln x"], 1, "Separating variables gives y = Ceˣ, and y(0) = 1 gives C = 1.", 1],
  ["*", "em", "differential-equations", "The Laplace transform of the constant 1 is", ["1", "s", "1/s", "1/s²"], 2, "L{1} = ∫₀^∞ e^(−st) dt = 1/s for s > 0.", 1],
  ["*", "em", "differential-equations", "The general solution of y″ + y = 0 is", ["y = c₁eˣ + c₂e⁻ˣ", "y = c₁ cos x + c₂ sin x", "y = (c₁ + c₂x)eˣ", "y = c₁ + c₂x"], 1, "The auxiliary equation m² + 1 = 0 has roots m = ±i.", 1],
  ["*", "em", "linear-algebra", "The eigenvalues of the matrix [[2, 0], [0, 3]] are", ["0 and 5", "2 and 3", "1 and 6", "−2 and −3"], 1, "For a diagonal matrix the eigenvalues are the diagonal entries.", 1],
  ["*", "em", "linear-algebra", "The determinant of [[1, 2], [3, 4]] is", ["−2", "2", "10", "−10"], 0, "1·4 − 2·3 = −2.", 1],
  ["*", "em", "linear-algebra", "The rank of a 3 × 3 matrix in which every entry is 1 is", ["0", "1", "2", "3"], 1, "All rows are identical, so only one row is linearly independent.", 2],
  ["*", "em", "linear-algebra", "If A is a 3 × 3 matrix with det(A) = 4, then det(2A) is", ["8", "12", "32", "64"], 2, "det(kA) = kⁿ det(A) = 2³ × 4 = 32.", 2],
  ["*", "em", "linear-algebra", "The trace of a square matrix is equal to", ["the product of its eigenvalues", "the sum of its eigenvalues", "its determinant", "its rank"], 1, "The trace (sum of diagonal entries) equals the sum of the eigenvalues.", 1],
  ["*", "em", "linear-algebra", "A homogeneous system Ax = 0, where A is 4 × 4 with rank 3, has", ["only the trivial solution", "exactly one non-trivial solution", "infinitely many solutions", "no solution"], 2, "n − rank = 1 free variable, so there are infinitely many solutions.", 1],
  ["*", "em", "numerical-methods", "Simpson's 1/3 rule needs the number of sub-intervals to be", ["odd", "even", "prime", "a multiple of 3"], 1, "It fits a parabola over each pair of sub-intervals, so n must be even.", 1],
  ["*", "em", "numerical-methods", "Near a simple root, the Newton–Raphson method converges with order", ["1", "1.62", "2", "3"], 2, "Newton–Raphson converges quadratically near a simple root.", 1],
  ["*", "em", "probability", "A fair coin is tossed 3 times. P(at least one head) is", ["1/2", "3/4", "7/8", "1/8"], 2, "1 − P(no heads) = 1 − 1/8 = 7/8.", 1],
  ["*", "em", "probability", "A Poisson random variable has variance 4. Its mean is", ["2", "4", "8", "16"], 1, "For a Poisson distribution the mean equals the variance.", 1],
  ["*", "em", "probability", "For a standard normal variable Z, P(Z > 0) is", ["0", "0.25", "0.5", "1"], 2, "The standard normal distribution is symmetric about 0.", 1],
  ["*", "ga", "analytical", "Find the next term: 2, 6, 12, 20, 30, ?", ["36", "40", "42", "48"], 2, "Terms are n(n+1): 1·2, 2·3, 3·4, 4·5, 5·6, so next is 6·7 = 42.", 1],
  ["*", "ga", "analytical", "Statements: All roses are flowers. Some flowers fade quickly. Which conclusion definitely follows?", ["Some roses fade quickly", "All roses fade quickly", "No rose fades quickly", "None of these follows"], 3, "The flowers that fade quickly may or may not include roses, so no conclusion about roses follows.", 2],
  ["*", "ga", "analytical", "In a code, CAT is written as DBU. How is DOG written?", ["EPH", "EOH", "DPH", "FQI"], 0, "Each letter moves one place forward: D→E, O→P, G→H.", 1],
  ["*", "ga", "analytical", "Find the next number: 3, 9, 27, 81, ?", ["162", "216", "243", "324"], 2, "Each term is three times the previous one: 81 × 3 = 243.", 1],
  ["*", "ga", "quant", "If 3x + 2 = 17, what is x²?", ["9", "16", "25", "36"], 2, "3x = 15, so x = 5 and x² = 25.", 1],
  ["*", "ga", "quant", "A 150 m long train passes a pole in 15 s. Its speed in km/h is", ["30", "36", "40", "54"], 1, "Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/h.", 1],
  ["*", "ga", "quant", "Pipe A fills a tank in 10 h and pipe B in 15 h. Together they fill it in", ["5 h", "6 h", "7.5 h", "12.5 h"], 1, "Combined rate = 1/10 + 1/15 = 1/6 per hour, so 6 hours.", 2],
  ["*", "ga", "quant", "The average of 5 numbers is 20. If one number is removed, the average becomes 18. The removed number is", ["22", "26", "28", "30"], 2, "Sum = 100; remaining sum = 4 × 18 = 72; removed = 28.", 2],
  ["*", "ga", "quant", "Two fair dice are rolled. The probability that the sum is 7 is", ["1/12", "1/9", "1/6", "5/36"], 2, "Favourable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 of 36 = 1/6.", 1],
  ["*", "ga", "quant", "A shopkeeper marks goods 25% above cost and gives a 10% discount. The profit is", ["10%", "12.5%", "15%", "11.5%"], 1, "Selling price = 1.25 × 0.9 = 1.125 × cost, a 12.5% profit.", 2],
  ["*", "ga", "quant", "If log₁₀ 2 = 0.301, then log₁₀ 8 is", ["0.602", "0.903", "1.204", "2.408"], 1, "log 8 = 3 log 2 = 3 × 0.301 = 0.903.", 1],
  ["*", "ga", "quant", "In how many ways can the letters of the word GATE be arranged?", ["12", "16", "24", "48"], 2, "Four distinct letters can be arranged in 4! = 24 ways.", 1],
  ["*", "ga", "quant", "A sum of money doubles in 5 years at simple interest. The annual rate of interest is", ["10%", "15%", "20%", "25%"], 2, "The interest equals the principal in 5 years, so R = 100/5 = 20% a year.", 2],
  ["*", "ga", "quant", "A can finish a job in 12 days and B in 18 days. Working together, they finish it in", ["6 days", "7.2 days", "8 days", "15 days"], 1, "Combined rate = 1/12 + 1/18 = 5/36 of the job a day, so 36/5 = 7.2 days.", 2],
  ["*", "ga", "quant", "The salaries of A and B are in the ratio 3 : 5. After each gets a raise of ₹2,000 the ratio becomes 2 : 3. A's original salary is", ["₹4,000", "₹6,000", "₹8,000", "₹10,000"], 1, "(3x + 2000)/(5x + 2000) = 2/3 gives 9x + 6000 = 10x + 4000, so x = 2000 and A = 3x = ₹6,000.", 2],
  ["*", "ga", "spatial", "A square sheet is folded once along a diagonal, then folded again so that the two acute corners meet. The folded shape is a", ["square", "rectangle", "right isosceles triangle", "trapezium"], 2, "The first fold gives a right isosceles triangle; folding it along its line of symmetry gives a smaller right isosceles triangle.", 2],
  ["*", "ga", "spatial", "What is the angle between the hour and minute hands of a clock at 3:00?", ["45°", "60°", "90°", "120°"], 2, "Adjacent hour marks are 30° apart, so at 3:00 the hands are 3 × 30° = 90° apart.", 1],
  ["*", "ga", "spatial", "How many faces of a cube share an edge with any one given face?", ["2", "3", "4", "5"], 2, "A face has four edges and each is shared with one neighbouring face.", 1],
  ["*", "ga", "verbal", "Choose the word closest in meaning to 'ephemeral'.", ["Lasting", "Transient", "Eternal", "Robust"], 1, "Ephemeral means lasting a very short time, so 'transient' is the synonym.", 1],
  ["*", "ga", "verbal", "He is senior ___ me by two years.", ["than", "to", "from", "over"], 1, "'Senior', 'junior', 'superior' and 'inferior' take 'to', not 'than'.", 1],
  ["*", "ga", "verbal", "Choose the word opposite in meaning to 'frugal'.", ["Thrifty", "Extravagant", "Careful", "Modest"], 1, "Frugal means economical; extravagant is its opposite.", 1],
  ["*", "ga", "verbal", "Select the grammatically correct sentence.", ["Neither of the boys have finished.", "Neither of the boys has finished.", "Neither of the boy has finished.", "Neither of the boys are finished."], 1, "'Neither' is singular, so it takes the singular verb 'has'.", 1],
  ["*", "ga", "verbal", "Pen : Writer :: Scalpel : ?", ["Painter", "Surgeon", "Chef", "Tailor"], 1, "A writer works with a pen; a surgeon works with a scalpel.", 1],
  ["CS", "algo", "asymptotic", "The solution of T(n) = 2T(n/2) + n is", ["Θ(n)", "Θ(n log n)", "Θ(n²)", "Θ(log n)"], 1, "Master theorem case 2: a = 2, b = 2 and f(n) = n = n^(log₂ 2), so Θ(n log n).", 2],
  ["CS", "algo", "dp", "The standard dynamic-programming solution for the longest common subsequence of strings of lengths m and n takes", ["O(m + n)", "O(mn)", "O(m²n)", "O(2ⁿ)"], 1, "The table has m × n cells, each filled in constant time.", 1],
  ["CS", "algo", "graph-algorithms", "Dijkstra's algorithm may give wrong results when the graph has", ["cycles", "negative edge weights", "several shortest paths", "unreachable vertices"], 1, "Dijkstra assumes non-negative weights; use Bellman–Ford when edges can be negative.", 1],
  ["CS", "algo", "sorting", "The worst-case time complexity of binary search on a sorted array of n elements is", ["O(1)", "O(log n)", "O(n)", "O(n log n)"], 1, "Each comparison halves the search space.", 1],
  ["CS", "cd", "parsing", "Which of these parsers accepts the largest class of grammars?", ["LL(1)", "SLR(1)", "LALR(1)", "Canonical LR(1)"], 3, "Canonical LR(1) handles every SLR(1) and LALR(1) grammar, and every LL(1) grammar is also LR(1).", 1],
  ["CS", "cn", "datalink", "With a 3-bit sequence number, the maximum sender window in Go-Back-N is", ["3", "7", "8", "4"], 1, "For Go-Back-N the window must be at most 2ᵏ − 1 = 7.", 2],
  ["CS", "cn", "ip", "How many usable host addresses does a /26 subnet have?", ["30", "62", "64", "126"], 1, "6 host bits give 2⁶ = 64 addresses, minus network and broadcast = 62.", 1],
  ["CS", "cn", "transport", "Which protocol is connection-oriented?", ["UDP", "IP", "TCP", "ICMP"], 2, "TCP sets up a connection with a three-way handshake before sending data.", 1],
  ["CS", "coa", "cache", "A cache has a hit time of 1 ns, a miss penalty of 20 ns and a hit ratio of 0.9. The average memory access time is", ["2 ns", "3 ns", "10 ns", "19 ns"], 1, "AMAT = hit time + miss rate × miss penalty = 1 + 0.1 × 20 = 3 ns.", 2],
  ["CS", "coa", "pipelining", "A 4-stage pipeline with no hazards executes 100 instructions in how many cycles?", ["100", "103", "104", "400"], 1, "k + n − 1 = 4 + 100 − 1 = 103 cycles.", 2],
  ["CS", "db", "normalisation", "Which normal form removes transitive functional dependencies on the key?", ["1NF", "2NF", "3NF", "4NF"], 2, "3NF requires no non-prime attribute to depend transitively on a candidate key.", 1],
  ["CS", "db", "transactions", "Which property ensures that either all operations of a transaction happen or none do?", ["Atomicity", "Consistency", "Isolation", "Durability"], 0, "Atomicity means all-or-nothing execution.", 1],
  ["CS", "dl", "boolean", "The Boolean expression A + AB simplifies to", ["A", "B", "AB", "A + B"], 0, "Absorption law: A + AB = A(1 + B) = A.", 1],
  ["CS", "dl", "number-rep", "The 8-bit two's complement representation of −5 is", ["10000101", "11111010", "11111011", "11111101"], 2, "+5 = 00000101; invert to 11111010, add 1 → 11111011.", 2],
  ["CS", "dl", "sequential", "A mod-10 counter needs at least how many flip-flops?", ["3", "4", "5", "10"], 1, "2³ = 8 < 10 ≤ 2⁴ = 16, so four flip-flops.", 1],
  ["CS", "dm", "combinatorics", "How many subsets does a set with 5 elements have?", ["10", "25", "32", "120"], 2, "Each element is either in or out: 2⁵ = 32 subsets.", 1],
  ["CS", "dm", "graphs", "The number of edges in a complete undirected graph Kₙ is", ["n", "n − 1", "n(n − 1)/2", "n²"], 2, "Every pair of vertices is joined: C(n, 2) = n(n − 1)/2.", 1],
  ["CS", "dm", "graphs", "A tree with n vertices has how many edges?", ["n", "n − 1", "n + 1", "2n"], 1, "Every tree on n vertices has exactly n − 1 edges.", 1],
  ["CS", "dm", "logic", "Which of these is a tautology?", ["p ∧ ¬p", "p ∨ ¬p", "p → ¬p", "¬p"], 1, "p ∨ ¬p is true whatever the value of p.", 1],
  ["CS", "dm", "sets", "A relation that is reflexive, symmetric and transitive is", ["a partial order", "an equivalence relation", "a function", "a lattice"], 1, "These three properties define an equivalence relation.", 1],
  ["CS", "os", "deadlock", "Which of these is NOT a necessary condition for deadlock?", ["Mutual exclusion", "Hold and wait", "Circular wait", "Preemption"], 3, "The condition is 'no preemption'. Allowing preemption prevents deadlock.", 1],
  ["CS", "os", "memory", "Belady's anomaly can occur with which page replacement algorithm?", ["LRU", "Optimal", "FIFO", "LFU"], 2, "With FIFO, adding frames can increase page faults. Stack algorithms like LRU and Optimal do not show the anomaly.", 1],
  ["CS", "os", "scheduling", "With all processes arriving at time 0, which algorithm minimises the average waiting time?", ["FCFS", "SJF", "Round robin", "Priority"], 1, "Shortest Job First is provably optimal for average waiting time.", 1],
  ["CS", "pds", "c", "In C, sizeof(char) is", ["0", "1", "2", "compiler dependent"], 1, "The C standard defines sizeof(char) as 1.", 1],
  ["CS", "pds", "linear", "The postfix form of A + B * C is", ["AB+C*", "ABC*+", "A+BC*", "ABC+*"], 1, "* binds tighter, so B C * comes first, then the addition with A: A B C * +.", 1],
  ["CS", "pds", "trees", "The maximum number of nodes in a binary tree of height h (root at height 0) is", ["2ʰ", "2ʰ − 1", "2ʰ⁺¹ − 1", "2ʰ⁺¹"], 2, "Level i holds up to 2ⁱ nodes; summing i = 0..h gives 2ʰ⁺¹ − 1.", 2],
  ["CS", "toc", "cfl", "Which language is NOT context-free?", ["{aⁿbⁿ | n ≥ 0}", "{wwᴿ}", "{aⁿbⁿcⁿ | n ≥ 0}", "Balanced parentheses"], 2, "aⁿbⁿcⁿ needs two simultaneous count comparisons; the pumping lemma for CFLs shows it is not context-free.", 2],
  ["CS", "toc", "regular", "The minimal DFA accepting binary strings that end in '01' has how many states?", ["2", "3", "4", "5"], 1, "States track the suffix seen: none, '0', '01' — three states.", 2],
  ["CS", "toc", "undecidability", "Which of these problems is undecidable?", ["Emptiness of a DFA", "Membership in a CFL", "Halting of a Turing machine", "Equivalence of two DFAs"], 2, "The halting problem is undecidable; the other three are decidable.", 1],
  ["EE", "ade", "opamps", "An ideal non-inverting amplifier with Rf = 9 kΩ and R1 = 1 kΩ has a gain of", ["9", "10", "−9", "−10"], 1, "Gain = 1 + Rf/R1 = 1 + 9 = 10.", 1],
  ["EE", "ckt", "ac", "The power factor of a purely inductive circuit is", ["1", "0.707 lagging", "0 lagging", "0 leading"], 2, "Current lags voltage by 90°, so cos 90° = 0 (lagging).", 1],
  ["EE", "ckt", "theorems", "Two 4 Ω resistors in parallel, in series with a 2 Ω resistor, give an equivalent resistance of", ["2 Ω", "4 Ω", "6 Ω", "10 Ω"], 1, "4 ∥ 4 = 2 Ω; 2 + 2 = 4 Ω.", 1],
  ["EE", "ckt", "theorems", "For maximum power transfer from a DC source with internal resistance Rs, the load resistance should be", ["0", "Rs/2", "Rs", "2Rs"], 2, "Maximum power is delivered when RL = Rs.", 1],
  ["EE", "ckt", "transients", "A series RC circuit has R = 10 kΩ and C = 10 µF. Its time constant is", ["1 ms", "10 ms", "100 ms", "1 s"], 2, "τ = RC = 10⁴ × 10⁻⁵ = 0.1 s = 100 ms.", 1],
  ["EE", "cs", "frequency", "A minimum-phase system is closed-loop stable when", ["both gain margin and phase margin are positive", "gain margin is negative", "phase margin is negative", "both margins are zero"], 0, "For minimum-phase systems, positive gain and phase margins indicate stability.", 1],
  ["EE", "cs", "time", "The time constant of a first-order system is the time to reach what percentage of the final value for a step input?", ["50%", "63.2%", "86.5%", "98%"], 1, "1 − e⁻¹ ≈ 0.632.", 1],
  ["EE", "cs", "time", "The system type of G(s)H(s) = K / [s(s + 2)] is", ["0", "1", "2", "3"], 1, "Type equals the number of open-loop poles at the origin: one.", 1],
  ["EE", "emf", "gauss", "The electric flux through a closed surface enclosing a charge Q in free space is", ["Q", "Q/ε₀", "ε₀Q", "zero"], 1, "Gauss's law: ∮E·dA = Q/ε₀.", 1],
  ["EE", "mach", "dc", "The speed of a DC shunt motor can be raised above base speed by", ["increasing the field current", "decreasing the field current", "adding armature resistance", "reducing the supply voltage"], 1, "N ∝ (V − IaRa)/φ, so weakening the field increases speed.", 1],
  ["EE", "mach", "induction", "The synchronous speed of a 4-pole, 50 Hz induction motor is", ["750 rpm", "1000 rpm", "1500 rpm", "3000 rpm"], 2, "Ns = 120f/P = 120 × 50 / 4 = 1500 rpm.", 1],
  ["EE", "mach", "transformers", "A transformer operates at maximum efficiency when", ["Copper loss = iron loss", "Copper loss is zero", "Iron loss is zero", "Load is at no-load"], 0, "Efficiency peaks when variable (copper) loss equals constant (core) loss.", 1],
  ["EE", "meas", "instruments", "A PMMC instrument indicates the", ["RMS value", "average value", "peak value", "peak-to-peak value"], 1, "PMMC deflection is proportional to the average current.", 1],
  ["EE", "pe", "choppers", "An ideal buck converter with a 24 V input and duty cycle 0.25 (continuous conduction) gives", ["4 V", "6 V", "12 V", "96 V"], 1, "Vo = D × Vin = 0.25 × 24 = 6 V.", 1],
  ["EE", "pe", "rectifiers", "Average output of a single-phase fully controlled bridge rectifier (R load, firing angle α) is", ["(Vm/π)(1 + cos α)", "(2Vm/π) cos α", "(Vm/2π)(1 + cos α)", "(Vm/π) cos α"], 0, "With a resistive load the current is discontinuous, so Vavg = (Vm/π)(1 + cos α).", 2],
  ["EE", "ps", "faults", "Which type of fault occurs most often in power systems?", ["Three-phase symmetrical", "Line-to-line", "Single line-to-ground", "Double line-to-ground"], 2, "Single line-to-ground faults make up roughly 70–80% of all faults.", 1],
  ["EE", "ss", "lti", "The impulse response h(t) of a causal LTI system satisfies", ["h(t) = 0 for t < 0", "h(t) = 0 for t > 0", "h(t) is even", "h(t) is periodic"], 0, "A causal system cannot respond before the input is applied.", 1],
  ["EC", "ac", "opamp", "An ideal inverting amplifier with Rf = 100 kΩ and R1 = 10 kΩ has a voltage gain of", ["10", "−10", "11", "−11"], 1, "Gain = −Rf/R1 = −10.", 1],
  ["EC", "ac", "oscillators", "The Barkhausen criterion for sustained oscillation requires a loop gain of", ["0", "magnitude 1 with 0° (or 360°) total phase shift", "greater than 10", "−1 with 90° phase shift"], 1, "|Aβ| = 1 and the phase shift round the loop is 0° or 360°.", 1],
  ["EC", "comm", "analog", "The bandwidth of a DSB-FC AM signal with message bandwidth W is", ["W", "2W", "W/2", "4W"], 1, "AM carries both upper and lower sidebands: 2W.", 1],
  ["EC", "comm", "analog", "By Carson's rule, an FM signal with peak deviation 75 kHz and message bandwidth 15 kHz needs a bandwidth of about", ["90 kHz", "150 kHz", "180 kHz", "30 kHz"], 2, "B ≈ 2(Δf + fm) = 2(75 + 15) = 180 kHz.", 2],
  ["EC", "comm", "digital", "The Nyquist sampling rate for a signal band-limited to 4 kHz is", ["2 kHz", "4 kHz", "8 kHz", "16 kHz"], 2, "Nyquist rate = 2 × highest frequency = 8 kHz.", 1],
  ["EC", "comm", "info", "The entropy of a source with 4 equally likely symbols is", ["1 bit/symbol", "2 bits/symbol", "4 bits/symbol", "0.5 bit/symbol"], 1, "H = log₂ 4 = 2 bits per symbol.", 1],
  ["EC", "ctrl", "stability", "A continuous-time system is stable if all its closed-loop poles lie", ["in the right half of the s-plane", "on the imaginary axis", "in the left half of the s-plane", "at the origin"], 2, "Poles with negative real parts give decaying responses.", 1],
  ["EC", "dc", "combinational", "How many select lines does a 16:1 multiplexer need?", ["2", "3", "4", "16"], 2, "2⁴ = 16, so 4 select lines.", 1],
  ["EC", "dc", "sequential", "On a clock edge, a JK flip-flop with J = K = 1", ["resets", "sets", "holds its state", "toggles"], 3, "J = K = 1 is the toggle condition.", 1],
  ["EC", "edev", "physics", "In an n-type semiconductor, the majority carriers are", ["Holes", "Electrons", "Ions", "Protons"], 1, "Donor impurities contribute free electrons.", 1],
  ["EC", "edev", "pn", "The depletion region of a p-n junction widens under", ["forward bias", "reverse bias", "zero bias", "high doping only"], 1, "Reverse bias pulls majority carriers away from the junction, widening the depletion region.", 1],
  ["EC", "emt", "lines", "A lossless 50 Ω line terminated in a 50 Ω load has a VSWR of", ["0", "1", "2", "∞"], 1, "A matched load reflects nothing, so VSWR = 1.", 1],
  ["EC", "emt", "waves", "The intrinsic impedance of free space is approximately", ["50 Ω", "75 Ω", "120 Ω", "377 Ω"], 3, "η₀ = √(μ₀/ε₀) = 120π ≈ 377 Ω.", 1],
  ["EC", "nss", "theorems", "To find the Thevenin resistance of a network with only independent sources, you", ["short voltage sources and open current sources", "open voltage sources and short current sources", "remove all resistors", "short every source"], 0, "Independent voltage sources become shorts and current sources become opens.", 1],
  ["EC", "nss", "transforms", "The Fourier transform of the unit impulse δ(t) is", ["0", "1", "δ(f)", "1/(j2πf)"], 1, "The impulse contains all frequencies equally; its transform is 1.", 1],
  ["ME", "fm", "bernoulli", "Bernoulli's equation applies to flow that is", ["viscous and unsteady", "steady, inviscid and incompressible along a streamline", "compressible and rotational", "turbulent"], 1, "Its derivation assumes steady, inviscid, incompressible flow along a streamline.", 1],
  ["ME", "fm", "viscous", "Flow in a circular pipe is generally laminar when the Reynolds number is below about", ["200", "2000", "4000", "10,000"], 1, "Below roughly 2000–2300 pipe flow stays laminar.", 1],
  ["ME", "ht", "conduction", "Fourier's law describes heat transfer by", ["Conduction", "Convection", "Radiation", "Boiling"], 0, "q = −k A dT/dx is the conduction rate equation.", 1],
  ["ME", "ht", "radiation", "By the Stefan–Boltzmann law, the emissive power of a black body is proportional to", ["T", "T²", "T³", "T⁴"], 3, "E = σT⁴.", 1],
  ["ME", "md", "failure", "Which theory best predicts yielding of ductile materials?", ["Maximum principal stress", "Maximum distortion energy (von Mises)", "Maximum principal strain", "Maximum total strain energy"], 1, "Distortion energy theory agrees best with experiments on ductile metals.", 1],
  ["ME", "mech", "friction", "The angle of repose is equal to the", ["angle of friction", "angle of incidence", "45° always", "angle of projection"], 0, "At impending sliding on an incline, tan θ = μ, which defines the angle of friction.", 1],
  ["ME", "mfg", "casting", "By Chvorinov's rule, solidification time is proportional to", ["V/A", "(V/A)²", "A/V", "(A/V)²"], 1, "t = k(V/A)², where V is volume and A is surface area.", 1],
  ["ME", "mfg", "machining", "In Taylor's equation VTⁿ = C with n = 0.5, doubling the cutting speed changes the tool life to", ["one half", "one quarter", "double", "one eighth"], 1, "T ∝ V^(−1/n) = V^(−2), so doubling V divides T by 4.", 2],
  ["ME", "mfg", "or", "The economic order quantity (D = annual demand, S = ordering cost, H = holding cost per unit per year) is", ["√(DS/H)", "√(2DS/H)", "2DS/H", "√(2DH/S)"], 1, "Minimising ordering + holding cost gives EOQ = √(2DS/H).", 2],
  ["ME", "som", "columns", "Euler's critical load for a column with both ends pinned is", ["π²EI/L²", "π²EI/4L²", "2π²EI/L²", "4π²EI/L²"], 0, "Effective length equals actual length for pinned–pinned columns.", 1],
  ["ME", "som", "sfd", "Maximum bending moment for a simply supported beam of span L with central point load W is", ["WL/2", "WL/4", "WL/8", "WL²/8"], 1, "Each reaction is W/2; the moment at mid-span is (W/2)(L/2) = WL/4.", 1],
  ["ME", "som", "stress", "For an isotropic material, E, G and ν are related by", ["E = 2G(1 + ν)", "E = 3G(1 − 2ν)", "G = 2E(1 + ν)", "E = G(1 + ν)"], 0, "E = 2G(1 + ν).", 1],
  ["ME", "som", "torsion", "The maximum shear stress in a solid circular shaft of diameter d under torque T is", ["16T/πd³", "32T/πd³", "T/πd²", "16T/πd²"], 0, "τ = Tr/J with J = πd⁴/32 and r = d/2 gives 16T/πd³.", 1],
  ["ME", "td", "entropy", "The efficiency of a Carnot engine working between 600 K and 300 K is", ["25%", "50%", "66.7%", "75%"], 1, "η = 1 − T_L/T_H = 1 − 300/600 = 0.5.", 1],
  ["ME", "td", "laws", "For a reversible adiabatic process of an ideal gas", ["pV = constant", "pV^γ = constant", "p/T = constant", "V/T = constant"], 1, "A reversible adiabatic (isentropic) process follows pV^γ = constant.", 1],
  ["ME", "td", "refrigeration", "A refrigerator removes 3 kW of heat using 1 kW of work. Its COP is", ["1", "2", "3", "4"], 2, "COP = refrigerating effect / work input = 3/1 = 3.", 1],
  ["ME", "tom", "mechanisms", "By Gruebler's criterion, a four-bar linkage has how many degrees of freedom?", ["0", "1", "2", "3"], 1, "F = 3(n − 1) − 2j = 3(3) − 2(4) = 1.", 1],
  ["ME", "tom", "vibration", "A spring–mass system has k = 400 N/m and m = 1 kg. Its natural frequency is", ["20 rad/s", "400 rad/s", "√20 rad/s", "200 rad/s"], 0, "ωn = √(k/m) = √400 = 20 rad/s.", 1],
  ["CE", "env", "wastewater", "BOD stands for", ["Basic Oxygen Demand", "Biochemical Oxygen Demand", "Biological Organic Discharge", "Bulk Oxygen Density"], 1, "Biochemical oxygen demand measures oxygen used by microbes to break down organic matter.", 1],
  ["CE", "env", "water", "Alum is mainly used in water treatment for", ["disinfection", "coagulation", "softening", "aeration"], 1, "Alum is the most common coagulant.", 1],
  ["CE", "geo", "consolidation", "The time to reach a given degree of consolidation is proportional to", ["the drainage path length", "the square of the drainage path length", "the coefficient of consolidation", "the square of permeability"], 1, "t = Tv·H²/cv.", 1],
  ["CE", "geo", "permeability", "Darcy's law is valid for", ["Laminar flow", "Turbulent flow", "Transitional flow", "All flows"], 0, "v = ki assumes laminar seepage through soil.", 1],
  ["CE", "geo", "properties", "For a well-graded gravel, the coefficient of curvature Cc should lie between", ["0 and 1", "1 and 3", "3 and 6", "4 and 8"], 1, "Well graded requires 1 ≤ Cc ≤ 3 (and Cu > 4 for gravel).", 2],
  ["CE", "geo", "shear", "Rankine's active earth pressure coefficient for a cohesionless soil with φ = 30° is", ["1/3", "1/2", "1", "3"], 0, "Ka = (1 − sin φ)/(1 + sin φ) = (1 − 0.5)/(1 + 0.5) = 1/3.", 2],
  ["CE", "gm", "levelling", "In levelling, a back sight is", ["the first staff reading after setting up the instrument", "the last reading before moving the instrument", "a reading on an intermediate point", "any reading on a benchmark"], 0, "The back sight is the first reading taken after the level is set up.", 1],
  ["CE", "struct", "analysis", "A beam fixed at both ends under general in-plane loading has a degree of static indeterminacy of", ["1", "2", "3", "0"], 2, "6 reactions − 3 equations of equilibrium = 3.", 1],
  ["CE", "struct", "materials", "Normal consistency of cement is determined using the", ["Le Chatelier apparatus", "Vicat apparatus", "Slump cone", "Compaction factor apparatus"], 1, "The Vicat plunger penetration test gives standard consistency.", 1],
  ["CE", "struct", "rcc", "As per IS 456:2000, the minimum grade of concrete for reinforced concrete is", ["M15", "M20", "M25", "M30"], 1, "M20 is the minimum grade for RCC (mild exposure).", 1],
  ["CE", "struct", "rcc", "In limit state design to IS 456, the partial safety factor for concrete strength is", ["1.15", "1.5", "1.0", "1.75"], 1, "γm = 1.5 for concrete and 1.15 for steel.", 1],
  ["CE", "struct", "solid", "Maximum bending moment in a simply supported beam of span L under UDL w is", ["wL²/2", "wL²/4", "wL²/8", "wL²/12"], 2, "Mid-span moment = wL²/8.", 1],
  ["CE", "trans", "traffic", "Traffic flow q, density k and space-mean speed v are related by", ["q = k/v", "q = kv", "q = v/k", "q = k + v"], 1, "The fundamental relation of traffic flow is q = k × v.", 1],
  ["CE", "wre", "fluids", "The free surface of a liquid in a forced vortex takes the shape of a", ["Hyperboloid", "Paraboloid", "Cone", "Sphere"], 1, "z = ω²r²/2g, a paraboloid of revolution.", 1],
  ["CE", "wre", "hydrology", "A unit hydrograph is the direct runoff hydrograph from an effective rainfall of", ["1 mm", "1 cm", "10 cm", "1 m"], 1, "By definition, it results from 1 cm of effective rainfall over the catchment.", 1],
  ["CE", "wre", "open-channel", "At critical flow in an open channel, the Froude number is", ["0", "0.5", "1", "2"], 2, "Critical flow is defined by Fr = 1.", 1],
  ["IN", "ae", "opamps", "The input impedance of an ideal op-amp is", ["zero", "1 kΩ", "infinite", "equal to its output impedance"], 2, "An ideal op-amp draws no input current.", 1],
  ["IN", "coi", "fibre", "Light is guided along an optical fibre by", ["refraction only", "total internal reflection", "diffraction", "absorption"], 1, "The core's refractive index is higher than the cladding's, so light is totally internally reflected.", 1],
  ["IN", "cs", "controllers", "The main effect of integral action in a controller is to", ["eliminate steady-state error", "reduce overshoot", "speed up the response", "add dead time"], 0, "Integral action removes the offset for step inputs.", 1],
  ["IN", "cs", "feedback", "A second-order system is critically damped when the damping ratio ζ equals", ["0", "0.5", "0.707", "1"], 3, "ζ = 1 gives the fastest response without overshoot.", 1],
  ["IN", "de", "converters", "An 8-bit DAC has how many distinct output levels?", ["8", "16", "255", "256"], 3, "2⁸ = 256 levels.", 1],
  ["IN", "ecm", "theorems", "Two 6 Ω resistors in parallel have an equivalent resistance of", ["3 Ω", "6 Ω", "12 Ω", "36 Ω"], 0, "(6 × 6)/(6 + 6) = 3 Ω.", 1],
  ["IN", "meas", "bridges", "A Wheatstone bridge with arms P, Q, R, S is balanced when", ["P/Q = R/S", "P + Q = R + S", "PQ = RS", "P/R = S/Q"], 0, "At balance no current flows through the galvanometer: P/Q = R/S.", 1],
  ["IN", "meas", "errors", "A 0–100 V voltmeter is accurate to ±1% of full scale. When it reads 50 V, the limiting error is", ["±0.5%", "±1%", "±2%", "±5%"], 2, "±1% of 100 V is ±1 V, which is ±2% of a 50 V reading.", 2],
  ["IN", "sii", "displacement", "The gauge factor of a strain gauge is defined as", ["ΔR/R", "(ΔR/R)/strain", "strain/(ΔR/R)", "ΔL/L"], 1, "GF = fractional change in resistance per unit strain.", 1],
  ["IN", "sii", "displacement", "An LVDT is primarily used to measure", ["Temperature", "Displacement", "Pressure", "Flow"], 1, "The linear variable differential transformer gives an output proportional to core displacement.", 1],
  ["IN", "sii", "temperature", "A thermocouple works on the", ["Peltier effect", "Seebeck effect", "Hall effect", "Piezoelectric effect"], 1, "Two dissimilar junctions at different temperatures produce an EMF.", 1],
  ["IN", "sii", "temperature", "The resistance of a platinum RTD", ["decreases as temperature rises", "increases as temperature rises", "does not change with temperature", "changes only above 500 °C"], 1, "Metals have a positive temperature coefficient of resistance.", 1],
  ["IN", "ss", "transforms", "The Laplace transform of e^(−at)u(t) is", ["1/(s − a)", "1/(s + a)", "s/(s + a)", "a/(s + a)"], 1, "∫₀^∞ e^(−at)e^(−st) dt = 1/(s + a).", 1],
  ["CH", "cre", "rates", "The unit of the rate constant for a first-order reaction is", ["mol/L·s", "s⁻¹", "L/mol·s", "Dimensionless"], 1, "Rate = kC, so k has units of 1/time.", 1],
  ["CH", "cre", "rates", "The half-life of a first-order reaction", ["depends on the initial concentration", "is independent of the initial concentration", "increases with conversion", "is zero"], 1, "t½ = ln 2 / k, which does not depend on the initial concentration.", 1],
  ["CH", "cre", "reactors", "For a positive-order reaction at the same conversion, the volume of a PFR compared with a CSTR is", ["Larger", "Smaller", "Equal", "Unpredictable"], 1, "A PFR operates at higher average concentration, so it needs less volume for positive orders.", 2],
  ["CH", "fmo", "flow", "For laminar flow in a pipe, the Fanning friction factor is", ["16/Re", "64/Re", "0.079 Re^(−0.25)", "8/Re"], 0, "Fanning f = 16/Re (the Darcy factor is 64/Re).", 1],
  ["CH", "ht", "conv", "The Prandtl number is the ratio of", ["Inertia to viscous forces", "Momentum diffusivity to thermal diffusivity", "Convection to conduction", "Buoyancy to viscous forces"], 1, "Pr = ν/α.", 1],
  ["CH", "ht", "exchangers", "The log-mean temperature difference (LMTD) is used in the design of", ["Distillation columns", "Heat exchangers", "Reactors", "Cyclones"], 1, "Q = U A ΔT_lm for heat exchangers.", 1],
  ["CH", "ipc", "dynamics", "After a step change, a first-order system reaches 63.2% of its final value in", ["one time constant", "two time constants", "half a time constant", "five time constants"], 0, "1 − e⁻¹ = 0.632.", 1],
  ["CH", "mt", "diffusion", "Fick's first law relates molar flux to the", ["temperature gradient", "concentration gradient", "total pressure", "velocity gradient"], 1, "J = −D dC/dz.", 1],
  ["CH", "mt", "distillation", "In the McCabe–Thiele method, minimum reflux corresponds to", ["an infinite number of stages", "the minimum number of stages", "total reflux", "zero stages"], 0, "At minimum reflux the operating line touches the equilibrium curve, so infinite stages are needed.", 1],
  ["CH", "pct", "balances", "100 kg/h of a 20 wt% salt solution is concentrated to 50 wt% salt. The water evaporated is", ["40 kg/h", "50 kg/h", "60 kg/h", "80 kg/h"], 2, "Salt = 20 kg/h, so product = 20/0.5 = 40 kg/h and water removed = 100 − 40 = 60 kg/h.", 2],
  ["CH", "pct", "phase", "Raoult's law strictly applies to", ["Ideal solutions", "Real gases", "Electrolyte solutions", "Azeotropes"], 0, "pᵢ = xᵢ Pᵢˢᵃᵗ holds for ideal liquid mixtures.", 1],
  ["CH", "pde", "depreciation", "Equipment costs ₹10 lakh, has a salvage value of ₹2 lakh and a life of 8 years. Its straight-line depreciation per year is", ["₹1 lakh", "₹1.25 lakh", "₹0.8 lakh", "₹2 lakh"], 0, "(10 − 2)/8 = ₹1 lakh a year.", 1],
  ["CH", "pde", "profitability", "At the minimum acceptable rate of return, a project with a positive NPV is", ["not acceptable", "acceptable", "exactly break-even", "undefined"], 1, "A positive NPV means it earns more than the required rate.", 1],
  ["DA", "ai", "search", "A* tree search is guaranteed to find an optimal path when its heuristic is", ["admissible", "random", "always larger than the true cost", "non-zero"], 0, "An admissible heuristic never overestimates the true cost.", 1],
  ["DA", "co", "optimisation", "Gradient descent updates the parameters in the direction of", ["the gradient", "the negative gradient", "the Hessian", "a random vector"], 1, "Moving against the gradient decreases the function locally.", 1],
  ["DA", "dbw", "sql", "Which SQL clause filters the results of a GROUP BY?", ["WHERE", "HAVING", "ORDER BY", "LIMIT"], 1, "HAVING applies conditions to aggregated groups.", 1],
  ["DA", "dbw", "warehousing", "In a star schema, the central table is the", ["dimension table", "fact table", "lookup table", "index table"], 1, "A central fact table links to the dimension tables.", 1],
  ["DA", "la", "decompositions", "The singular values of a matrix A are the square roots of the eigenvalues of", ["A", "AᵀA", "A + Aᵀ", "A⁻¹"], 1, "σᵢ = √λᵢ(AᵀA).", 1],
  ["DA", "la", "eigen", "If A is a 3 × 3 matrix with eigenvalues 1, 2, 3, then det(A) is", ["6", "5", "3", "0"], 0, "The determinant is the product of the eigenvalues.", 1],
  ["DA", "ml", "classification", "In k-NN classification, increasing k generally", ["increases variance", "reduces variance and smooths the decision boundary", "always increases accuracy", "makes training slower"], 1, "Averaging over more neighbours lowers variance, at the cost of more bias.", 1],
  ["DA", "ml", "clustering", "Which of these is an unsupervised learning algorithm?", ["Linear regression", "K-means clustering", "Logistic regression", "Decision tree classifier"], 1, "K-means groups unlabelled data.", 1],
  ["DA", "ml", "evaluation", "Which technique most directly reduces overfitting?", ["Adding more features", "Regularisation", "Increasing model depth", "Reducing training data"], 1, "L1/L2 penalties constrain model complexity.", 1],
  ["DA", "ml", "evaluation", "Precision is defined as", ["TP / (TP + FN)", "TP / (TP + FP)", "TN / (TN + FP)", "(TP + TN) / total"], 1, "Precision = TP / (TP + FP); recall = TP / (TP + FN).", 1],
  ["DA", "ml", "nn", "ReLU(x) is defined as", ["1/(1 + e⁻ˣ)", "max(0, x)", "tanh(x)", "x²"], 1, "Rectified linear unit outputs x for positive inputs and 0 otherwise.", 1],
  ["DA", "pdsa", "ds", "Which data structure is last in, first out (LIFO)?", ["Queue", "Stack", "Heap", "Linked list"], 1, "A stack removes the most recently added element first.", 1],
  ["DA", "pdsa", "python", "What does print(7 // 2) output in Python 3?", ["3.5", "3", "4", "3.0"], 1, "// is floor division; with two integers it gives the integer 3.", 1],
  ["DA", "ps", "bayes", "A and B are independent with P(A) = 0.5 and P(B) = 0.4. P(A ∩ B) is", ["0.9", "0.2", "0.1", "0.45"], 1, "For independent events P(A ∩ B) = P(A)·P(B) = 0.2.", 1],
  ["DA", "ps", "distributions", "The variance of a uniform distribution on [0, 1] is", ["1/2", "1/3", "1/12", "1/4"], 2, "(b − a)²/12 = 1/12.", 1],
  ["DA", "ps", "rv", "The variance of a Bernoulli(p) random variable is", ["p", "p²", "p(1 − p)", "1 − p"], 2, "E[X²] − E[X]² = p − p².", 1],
];

const inPaper = (item) => (item[0] === '*' || item[0] === BRANCH.id) && SUBJECTS.some((s) => s.id === item[1]) && chapterById(item[1], item[2]);

/** Converts a bank item into the quiz player's question shape (options shuffled). */
export function toMCQ(item) {
  const [, sub, chapter, stem, opts, ans, explanation, marks] = item;
  let options = [...opts];
  let answer = ans;
  // Shuffle option order so the correct letter isn't predictable — unless an option refers to the others ("All of these", "Both…").
  if (!options.some((o) => /\b(all of|none of|both|neither|all of these|all three)\b/i.test(o))) {
    const order = options.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    options = order.map((i) => opts[i]);
    answer = order.indexOf(ans);
  }
  return { stem, statements: [], ask: '', options, answer, explanation: explanation || '', concept: chapterById(sub, chapter)?.name || '', subject: sub, chapter, marks: marks === 2 ? 2 : 1, passage: '' };
}

/** Number of offline questions for a chapter of the current paper. */
export const chapterCount = (sub, id) => BANK.filter((x) => inPaper(x) && x[1] === sub && x[2] === id).length;
export const subjectCount = (sub) => BANK.filter((x) => inPaper(x) && x[1] === sub).length;

export async function chapterQuestions(sub, id) {
  return BANK.filter((x) => inPaper(x) && x[1] === sub && x[2] === id).map(toMCQ);
}

/** All bank questions for a subject of the current paper, each tagged with its chapter. */
export async function subjectQuestions(sub) {
  return BANK.filter((x) => inPaper(x) && x[1] === sub).map(toMCQ);
}

/** Every offline question for the current paper (used by the practice paper). */
export async function paperQuestions() {
  return BANK.filter(inPaper).map(toMCQ);
}

export { chaptersOf };
