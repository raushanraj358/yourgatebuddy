// Static content: GATE papers (branches), their syllabus (subject → topic → sub-topics), curated resources, habits, tips
// and reminder presets. The offline question bank lives in assets/js/content.js.
//
// The app works on ONE paper at a time (the learner's branch, chosen at onboarding / in Profile). SUBJECTS, CHAPTERS and
// LIBRARY are live ES-module bindings that setBranch() swaps, so every view that imports them sees the current paper.
//
// Vocabulary: a GATE "subject" (e.g. Algorithms) is a subject here; a syllabus topic (e.g. Dynamic programming) is a
// "chapter" (that name is used throughout the code); its sub-topics are the chapter's "topics" checklist.
// Subject ids and chapter ids are stored in user data. Don't rename them; adding chapters or topics is safe.

export const EXAM = {
  name: 'GATE',
  date: '2027-02-06', // GATE is usually held over the first two weekends of February; update once the organising IIT announces dates.
  questions: 65,
  minutes: 180,
  maxMarks: 100,
};

/** GATE marking: 1- and 2-mark questions; a wrong MCQ loses one third of its marks. negFor(m) is the marks deducted. */
export const negFor = (marks) => (marks === 2 ? 2 / 3 : 1 / 3);
export const round2 = (n) => Math.round(n * 100) / 100;

export const BRANCHES = [
  { id: 'CS', name: 'Computer Science & IT', short: 'CSE / IT', icon: 'cpu' },
  { id: 'EE', name: 'Electrical Engineering', short: 'Electrical', icon: 'bolt' },
  { id: 'EC', name: 'Electronics & Communication', short: 'ECE', icon: 'wave' },
  { id: 'ME', name: 'Mechanical Engineering', short: 'Mechanical', icon: 'gear' },
  { id: 'CE', name: 'Civil Engineering', short: 'Civil', icon: 'building' },
  { id: 'IN', name: 'Instrumentation Engineering', short: 'Instrumentation', icon: 'gauge' },
  { id: 'CH', name: 'Chemical Engineering', short: 'Chemical', icon: 'flask' },
  { id: 'DA', name: 'Data Science & AI', short: 'Data Science & AI', icon: 'brain' },
];
export const branchById = (id) => BRANCHES.find((b) => b.id === id) || BRANCHES[0];

// weight: how much GATE has asked from the topic in recent papers (H = high, M = medium, L = low). A guide, not a rule.
const ch = (id, name, weight, topics) => ({ id, name, weight, topics });
const sub = (id, name, short, icon, marks, chapters) => ({ id, name, short, icon, marks, chapters });

const GA = sub('ga', 'General Aptitude', 'Aptitude', 'bulb', 15, [
  ch('verbal', 'Verbal ability', 'H', ['English grammar', 'Sentence completion', 'Verbal analogies', 'Word groups & vocabulary', 'Instructions & critical reasoning', 'Reading comprehension']),
  ch('quant', 'Quantitative aptitude', 'H', ['Data interpretation: tables, graphs & charts', 'Numerical computation & estimation', 'Ratios, percentages & averages', 'Powers, exponents & logarithms', 'Permutations & combinations', 'Series & mensuration', 'Elementary statistics & probability']),
  ch('analytical', 'Analytical reasoning', 'M', ['Deduction & induction', 'Analogy', 'Numerical relations & reasoning', 'Syllogisms & statements']),
  ch('spatial', 'Spatial aptitude', 'M', ['Transformations: translation, rotation, scaling, mirroring', 'Assembling & grouping', 'Paper folding & cutting', 'Patterns in 2D & 3D']),
]);

const EM = sub('em', 'Engineering Mathematics', 'Maths', 'calc', 13, [
  ch('linear-algebra', 'Linear algebra', 'H', ['Matrix algebra', 'Systems of linear equations', 'Rank & determinants', 'Eigenvalues & eigenvectors']),
  ch('calculus', 'Calculus', 'H', ['Limits, continuity & differentiability', 'Mean value theorems', 'Maxima & minima', 'Definite & improper integrals', 'Partial derivatives', 'Gradient, divergence & curl', 'Line, surface & volume integrals (Gauss, Stokes, Green)']),
  ch('differential-equations', 'Differential equations', 'M', ['First-order ODEs (linear, exact)', 'Higher-order linear ODEs with constant coefficients', 'Cauchy–Euler equation', 'Laplace transform methods', 'PDEs: heat, wave & Laplace equations']),
  ch('complex-variables', 'Complex variables', 'L', ['Analytic functions & Cauchy–Riemann equations', "Cauchy's integral theorem & formula", 'Taylor & Laurent series', 'Residue theorem']),
  ch('probability', 'Probability & statistics', 'M', ['Probability axioms & conditional probability', "Bayes' theorem", 'Discrete & continuous distributions', 'Mean, variance & correlation', 'Regression']),
  ch('numerical-methods', 'Numerical methods', 'L', ['Roots of equations: bisection & Newton–Raphson', "Numerical integration: trapezoidal & Simpson's rules", 'Numerical solution of ODEs: Euler & Runge–Kutta', 'Interpolation']),
]);

// CS has its own maths syllabus: linear algebra, calculus, probability (plus Discrete Mathematics as a separate subject below).
const EM_CS = sub('em', 'Engineering Mathematics', 'Maths', 'calc', 8, [
  ch('linear-algebra', 'Linear algebra', 'H', ['Matrices & determinants', 'Systems of linear equations', 'Rank & linear independence', 'Eigenvalues & eigenvectors', 'LU decomposition']),
  ch('calculus', 'Calculus', 'M', ['Limits, continuity & differentiability', 'Maxima & minima', 'Mean value theorem', 'Integration']),
  ch('probability', 'Probability & statistics', 'H', ['Random variables', 'Uniform, normal, exponential, Poisson & binomial distributions', 'Mean, median, mode & standard deviation', "Conditional probability & Bayes' theorem"]),
]);

const SYLLABUS = {
  CS: [GA, EM_CS,
    sub('dm', 'Discrete Mathematics', 'Discrete Maths', 'link', 6, [
      ch('logic', 'Propositional & first-order logic', 'M', ['Propositional logic & tautologies', 'Predicates & quantifiers', 'Rules of inference']),
      ch('sets', 'Sets, relations & functions', 'M', ['Equivalence relations & partial orders', 'Functions: one-one, onto, bijections', 'Lattices', 'Monoids & groups']),
      ch('combinatorics', 'Combinatorics', 'H', ['Counting, permutations & combinations', 'Pigeonhole principle', 'Recurrence relations', 'Generating functions']),
      ch('graphs', 'Graph theory', 'H', ['Connectivity', 'Matching', 'Colouring', 'Trees & spanning trees', "Planarity & Euler's formula"]),
    ]),
    sub('dl', 'Digital Logic', 'Digital Logic', 'cpu', 5, [
      ch('boolean', 'Boolean algebra', 'M', ['Boolean laws & theorems', 'K-map minimisation', "SOP, POS & don't-cares", 'Universal gates']),
      ch('combinational', 'Combinational circuits', 'M', ['Adders & subtractors', 'Multiplexers & demultiplexers', 'Decoders & encoders', 'Comparators']),
      ch('sequential', 'Sequential circuits', 'H', ['Latches & flip-flops (SR, JK, D, T)', 'Flip-flop conversions', 'Synchronous & asynchronous counters', 'Shift registers', 'Finite state machines']),
      ch('number-rep', 'Number representation', 'H', ['Number systems & base conversion', "1's & 2's complement", 'Overflow detection', 'Floating point (IEEE 754)']),
    ]),
    sub('coa', 'Computer Organization & Architecture', 'COA', 'layers', 9, [
      ch('instructions', 'Machine instructions & addressing', 'M', ['Instruction formats', 'Addressing modes', 'RISC vs CISC', 'Expanding opcodes']),
      ch('alu', 'ALU & datapath', 'L', ['ALU design', 'Datapath & control unit', 'Hardwired vs microprogrammed control', "Booth's multiplication"]),
      ch('pipelining', 'Pipelining', 'H', ['Pipeline stages & speed-up', 'Data hazards & forwarding', 'Control hazards & branch handling', 'Structural hazards & stalls']),
      ch('cache', 'Cache & memory hierarchy', 'H', ['Direct, associative & set-associative mapping', 'Replacement & write policies', 'Average memory access time', 'Main memory & interleaving', 'Virtual memory & TLB']),
      ch('io', 'I/O & DMA', 'M', ['Programmed & interrupt-driven I/O', 'DMA: burst & cycle stealing', 'Interrupt handling', 'Disk access time']),
    ]),
    sub('pds', 'Programming & Data Structures', 'Programming & DS', 'code', 10, [
      ch('c', 'C programming', 'H', ['Data types, operators & precedence', 'Pointers & arrays', 'Functions & parameter passing', 'Storage classes & scope', 'Strings & structures']),
      ch('recursion', 'Recursion', 'H', ['Tracing recursive functions', 'Recursion trees', 'Tail recursion']),
      ch('linear', 'Arrays, stacks, queues', 'M', ['Array address calculation', 'Stack applications: expression evaluation', 'Queues & circular queues', 'Deques & priority queues']),
      ch('linked-lists', 'Linked lists', 'M', ['Singly linked lists', 'Doubly & circular lists', 'Operations & their complexity']),
      ch('trees', 'Trees & BST', 'H', ['Binary tree traversals', 'Binary search tree operations', 'AVL trees & rotations', 'Counting trees & tree properties']),
      ch('heaps', 'Heaps & graphs', 'M', ['Binary heaps (min & max)', 'Build-heap in O(n)', 'Graph representations', 'Hashing & collision resolution']),
    ]),
    sub('algo', 'Algorithms', 'Algorithms', 'chart', 9, [
      ch('asymptotic', 'Asymptotic analysis', 'H', ['Big-O, Ω & Θ notation', 'Recurrences & Master theorem', 'Best, worst & average case']),
      ch('sorting', 'Searching & sorting', 'M', ['Binary search', 'Quick, merge & heap sort', 'Insertion & selection sort', 'Lower bound for comparison sorting', 'Counting & radix sort']),
      ch('greedy', 'Greedy', 'M', ['Activity selection', 'Huffman coding', 'Fractional knapsack', 'Job sequencing with deadlines']),
      ch('dp', 'Dynamic programming', 'H', ['0/1 knapsack', 'Longest common subsequence', 'Matrix chain multiplication', 'Edit distance & optimal BST', 'Floyd–Warshall']),
      ch('divide-conquer', 'Divide & conquer', 'M', ['Merge sort & quicksort analysis', "Strassen's multiplication", 'Selection & closest pair']),
      ch('graph-algorithms', 'Graph algorithms', 'H', ['BFS & DFS applications', 'Minimum spanning trees: Kruskal & Prim', 'Shortest paths: Dijkstra & Bellman–Ford', 'Topological sort & connected components']),
    ]),
    sub('toc', 'Theory of Computation', 'TOC', 'repeat', 8, [
      ch('regular', 'Regular languages & FA', 'H', ['DFA & NFA', 'Regular expressions', 'DFA minimisation', 'Pumping lemma for regular languages', 'Closure properties']),
      ch('cfl', 'Context-free languages & PDA', 'H', ['Context-free grammars & ambiguity', 'Pushdown automata', 'Pumping lemma for CFLs', 'Closure & decision properties']),
      ch('tm', 'Turing machines', 'M', ['Turing machine basics', 'Recursive & recursively enumerable languages', 'Chomsky hierarchy']),
      ch('undecidability', 'Undecidability', 'M', ['Halting problem', 'Reductions', "Rice's theorem", 'Decidable vs undecidable problems']),
    ]),
    sub('cd', 'Compiler Design', 'Compilers', 'code', 5, [
      ch('lexical', 'Lexical analysis', 'L', ['Tokens, lexemes & patterns', 'Regular expressions to DFA', 'Lexical errors']),
      ch('parsing', 'Parsing', 'H', ['FIRST & FOLLOW', 'LL(1) parsing', 'LR(0), SLR, LALR & CLR parsing', 'Conflicts & operator precedence']),
      ch('sdt', 'Syntax-directed translation', 'M', ['S-attributed & L-attributed definitions', 'Syntax trees', 'Type checking']),
      ch('optimisation', 'Intermediate code & optimisation', 'M', ['Three-address code', 'Basic blocks & flow graphs', 'Constant folding & common subexpressions', 'Liveness & data-flow analysis', 'Runtime environments']),
    ]),
    sub('os', 'Operating System', 'OS', 'settings', 9, [
      ch('processes', 'Processes & threads', 'M', ['Process states & PCB', 'Context switching', 'User vs kernel threads', 'System calls & fork()']),
      ch('scheduling', 'CPU scheduling', 'H', ['FCFS', 'SJF & SRTF', 'Round robin', 'Priority scheduling', 'Waiting & turnaround time']),
      ch('sync', 'Synchronisation', 'H', ['Critical section problem', "Peterson's solution", 'Semaphores & mutexes', 'Producer–consumer, readers–writers, dining philosophers']),
      ch('deadlock', 'Deadlock', 'M', ['Necessary conditions', 'Resource allocation graph', "Banker's algorithm", 'Detection & recovery']),
      ch('memory', 'Memory management & paging', 'H', ['Contiguous allocation & fragmentation', 'Paging & page tables', 'Multi-level paging & TLB', 'Segmentation', 'Page replacement: FIFO, LRU, Optimal', 'Thrashing']),
      ch('files', 'File systems', 'L', ['File allocation methods', 'Directory structure', 'Disk scheduling: SSTF, SCAN, C-SCAN', 'Free-space management']),
    ]),
    sub('db', 'Databases', 'DBMS', 'database', 8, [
      ch('er', 'ER model', 'L', ['Entities, attributes & relationships', 'Cardinality & participation', 'ER to relational mapping']),
      ch('sql', 'Relational algebra & SQL', 'H', ['Relational algebra operators', 'Tuple relational calculus', 'SQL queries & joins', 'Aggregation, GROUP BY & nested queries']),
      ch('normalisation', 'Normalisation', 'H', ['Functional dependencies & closure', 'Candidate keys', '1NF, 2NF, 3NF & BCNF', 'Lossless & dependency-preserving decomposition']),
      ch('transactions', 'Transactions & concurrency', 'H', ['ACID properties', 'Conflict & view serialisability', 'Recoverable & cascadeless schedules', 'Two-phase locking & timestamp protocols']),
      ch('indexing', 'Indexing & B+ trees', 'M', ['Primary, secondary & clustering indexes', 'B & B+ tree order and height', 'File organisation']),
    ]),
    sub('cn', 'Computer Networks', 'Networks', 'network', 9, [
      ch('layering', 'Layering & switching', 'M', ['OSI & TCP/IP layers', 'Circuit vs packet switching', 'Transmission, propagation & queuing delays']),
      ch('datalink', 'Data link layer', 'H', ['Framing & error detection (CRC)', 'Stop-and-wait, Go-Back-N & Selective Repeat', 'ALOHA, CSMA/CD & Ethernet', 'Switching']),
      ch('ip', 'IP addressing & routing', 'H', ['IPv4 addressing, subnetting & CIDR', 'IP fragmentation', 'Distance vector & link state routing', 'ARP, DHCP, ICMP & NAT']),
      ch('transport', 'TCP/UDP', 'H', ['UDP & TCP headers', 'TCP connection management', 'Flow control & sliding window', 'Congestion control']),
      ch('application', 'Application layer protocols', 'L', ['DNS', 'HTTP', 'SMTP & FTP', 'Sockets basics']),
    ]),
  ],

  EE: [GA, EM,
    sub('ckt', 'Electric Circuits', 'Circuits', 'bolt', 10, [
      ch('theorems', 'Network theorems', 'H', ['KCL, KVL, nodal & mesh analysis', 'Thevenin & Norton', 'Superposition', 'Maximum power transfer']),
      ch('transients', 'Transient analysis', 'H', ['RL & RC transients', 'RLC circuits', 'Initial & final conditions']),
      ch('ac', 'Sinusoidal steady state', 'H', ['Phasors & impedance', 'AC power & power factor', 'Series & parallel resonance']),
      ch('two-port', 'Two-port networks', 'M', ['Z, Y, h & ABCD parameters', 'Interconnection of two-ports']),
      ch('three-phase', 'Three-phase circuits', 'M', ['Star & delta connections', 'Balanced three-phase power', 'Two-wattmeter method']),
    ]),
    sub('emf', 'Electromagnetic Fields', 'EM Fields', 'radio', 4, [
      ch('gauss', "Coulomb's & Gauss's law", 'M', ["Coulomb's law & electric field", "Gauss's law", 'Divergence theorem applications']),
      ch('potential', 'Electric potential', 'M', ['Potential & potential gradient', 'Dielectrics & polarisation', 'Energy in electric fields']),
      ch('magnetostatics', "Biot–Savart & Ampère's law", 'M', ['Biot–Savart law', "Ampère's law", "Faraday's law", 'Lorentz force']),
      ch('inductance', 'Inductance & capacitance', 'L', ['Capacitance of standard geometries', 'Self & mutual inductance', 'Stored energy']),
    ]),
    sub('ss', 'Signals & Systems', 'Signals', 'wave', 7, [
      ch('lti', 'LTI systems', 'H', ['Linearity, time invariance & causality', 'Convolution', 'Impulse & step response', 'BIBO stability']),
      ch('fourier', 'Fourier series & transform', 'H', ['Fourier series of periodic signals', 'Fourier transform properties', "Parseval's theorem"]),
      ch('laplace', 'Laplace transform', 'M', ['Properties & region of convergence', 'Transfer functions, poles & zeros']),
      ch('z', 'Z-transform', 'M', ['Z-transform & ROC', 'Inverse Z-transform', 'Discrete-time systems']),
      ch('sampling', 'Sampling theorem', 'M', ['Nyquist rate', 'Aliasing', 'Reconstruction']),
    ]),
    sub('mach', 'Electrical Machines', 'Machines', 'gear', 11, [
      ch('transformers', 'Transformers', 'H', ['Equivalent circuit', 'OC & SC tests', 'Regulation & efficiency', 'Auto-transformers', 'Three-phase connections']),
      ch('dc', 'DC machines', 'M', ['EMF & torque equations', 'Types & characteristics', 'Speed control', 'Armature reaction & commutation']),
      ch('induction', 'Induction machines', 'H', ['Rotating magnetic field & slip', 'Equivalent circuit', 'Torque–slip characteristics', 'Starting & speed control', 'Single-phase induction motors']),
      ch('synchronous', 'Synchronous machines', 'H', ['EMF equation & armature reaction', 'Voltage regulation', 'Parallel operation', 'Synchronous motors & V-curves']),
    ]),
    sub('ps', 'Power Systems', 'Power Systems', 'network', 11, [
      ch('lines', 'Transmission line parameters', 'H', ['R, L & C of lines', 'Short, medium & long lines', 'ABCD constants', 'Ferranti effect & corona']),
      ch('load-flow', 'Load flow', 'M', ['Bus admittance matrix', 'Gauss–Seidel method', 'Newton–Raphson method', 'Per-unit system']),
      ch('faults', 'Fault analysis', 'H', ['Symmetrical faults', 'Symmetrical components', 'Unsymmetrical faults']),
      ch('protection', 'Protection', 'M', ['Over-current & distance relays', 'Differential protection', 'Circuit breakers']),
      ch('stability', 'Stability', 'M', ['Swing equation', 'Equal area criterion', 'Economic load dispatch']),
    ]),
    sub('cs', 'Control Systems', 'Control', 'target', 8, [
      ch('block', 'Block diagrams & SFG', 'M', ['Block diagram reduction', "Signal flow graphs & Mason's gain formula", 'Feedback principles']),
      ch('time', 'Time response', 'H', ['First & second-order systems', 'Steady-state errors & error constants', 'Time-domain specifications']),
      ch('root-locus', 'Routh–Hurwitz & root locus', 'H', ['Routh–Hurwitz criterion', 'Root locus construction']),
      ch('frequency', 'Bode & Nyquist', 'H', ['Bode plots', 'Gain & phase margins', 'Nyquist criterion', 'Lead & lag compensators']),
      ch('state-space', 'State space', 'M', ['State-space models', 'Solution of state equations', 'Controllability & observability']),
    ]),
    sub('meas', 'Electrical & Electronic Measurements', 'Measurements', 'gauge', 5, [
      ch('bridges', 'Bridges', 'M', ['Wheatstone & Kelvin bridges', 'AC bridges: Maxwell, Schering, Wien']),
      ch('instruments', 'Instruments', 'M', ['PMMC, moving iron & dynamometer', 'Instrument transformers (CT & PT)', 'Oscilloscopes & digital voltmeters']),
      ch('power', 'Power & energy measurement', 'M', ['Wattmeters', 'Energy meters', 'Three-phase power measurement']),
      ch('errors', 'Error analysis', 'L', ['Types of errors', 'Limiting & probable error']),
    ]),
    sub('ade', 'Analog & Digital Electronics', 'Electronics', 'cpu', 8, [
      ch('devices', 'Diodes & BJTs', 'M', ['Rectifiers & clippers', 'BJT biasing', 'Small-signal amplifiers', 'MOSFET basics']),
      ch('opamps', 'Op-amps', 'H', ['Ideal op-amp characteristics', 'Inverting & non-inverting amplifiers', 'Integrators & differentiators', 'Active filters & oscillators']),
      ch('digital', 'Combinational & sequential logic', 'M', ['Logic gates & Boolean algebra', 'Multiplexers & decoders', 'Flip-flops & counters', 'ADC & DAC']),
      ch('micro', 'Microprocessor basics', 'L', ['8085 architecture', 'Instructions & addressing modes']),
    ]),
    sub('pe', 'Power Electronics', 'Power Electronics', 'bolt', 8, [
      ch('devices', 'Power devices', 'M', ['Power diodes, thyristors, MOSFETs & IGBTs', 'Triggering & commutation', 'Static & switching characteristics']),
      ch('rectifiers', 'Rectifiers', 'H', ['Single & three-phase controlled rectifiers', 'Effect of source inductance', 'Power factor & harmonics']),
      ch('choppers', 'DC–DC converters', 'H', ['Buck, boost & buck-boost converters', 'Duty cycle & ripple']),
      ch('inverters', 'Inverters', 'M', ['Single & three-phase inverters', 'Sinusoidal PWM']),
    ]),
  ],

  EC: [GA, EM,
    sub('nss', 'Networks, Signals & Systems', 'Networks & Signals', 'wave', 12, [
      ch('theorems', 'Network theorems', 'H', ['Nodal & mesh analysis', 'Thevenin, Norton & superposition', 'Maximum power transfer', 'Two-port networks']),
      ch('transients', 'Transient analysis', 'M', ['RL, RC & RLC circuits', 'Laplace-domain circuit analysis', 'Resonance']),
      ch('signals', 'Continuous & discrete signals', 'M', ['Signal classification & operations', 'LTI systems & convolution', 'Causality & stability']),
      ch('transforms', 'Fourier, Laplace, Z-transform', 'H', ['Fourier series & transform', 'Laplace transform', 'Z-transform', 'DTFT & DFT', 'Sampling theorem']),
    ]),
    sub('edev', 'Electronic Devices', 'Devices', 'atom', 7, [
      ch('physics', 'Semiconductor physics', 'H', ['Energy bands', 'Carrier concentration & Fermi level', 'Drift & diffusion currents', 'Mobility & resistivity']),
      ch('pn', 'P-N junction', 'H', ['Junction under bias', 'Depletion capacitance', 'Zener & avalanche breakdown', 'Photodiodes, LEDs & solar cells']),
      ch('transistors', 'BJT & MOSFET', 'M', ['BJT operation', 'MOS capacitor', 'MOSFET I–V characteristics', 'Threshold voltage & body effect']),
      ch('fabrication', 'Fabrication basics', 'L', ['Oxidation & diffusion', 'Ion implantation', 'Photolithography', 'Twin-tub CMOS process']),
    ]),
    sub('ac', 'Analog Circuits', 'Analog', 'chart', 10, [
      ch('diodes', 'Diode circuits', 'M', ['Clipping & clamping', 'Rectifiers', 'Zener regulators']),
      ch('amplifiers', 'Amplifiers & biasing', 'H', ['BJT & MOSFET biasing', 'Small-signal analysis (CE, CB, CC)', 'Frequency response', 'Differential amplifiers & current mirrors']),
      ch('opamp', 'Op-amp circuits', 'H', ['Inverting & non-inverting amplifiers', 'Integrators & differentiators', 'Active filters', 'Comparators & Schmitt trigger']),
      ch('oscillators', 'Oscillators & feedback', 'M', ['Feedback topologies', 'Barkhausen criterion', 'RC, LC & crystal oscillators', 'Power amplifiers (class A, B, AB)']),
    ]),
    sub('dc', 'Digital Circuits', 'Digital', 'cpu', 8, [
      ch('numbers', 'Number systems', 'L', ['Number representations', 'Binary arithmetic & codes']),
      ch('combinational', 'Combinational logic', 'H', ['Boolean algebra & K-maps', 'CMOS logic gates', 'Multiplexers, decoders & adders', 'Arithmetic circuits']),
      ch('sequential', 'Sequential circuits', 'H', ['Latches & flip-flops', 'Counters & shift registers', 'Finite state machines']),
      ch('converters', 'Data converters', 'M', ['Sample & hold', 'ADCs: flash & SAR', 'DACs: R-2R & weighted']),
      ch('computer', 'Computer organisation basics', 'L', ['Memory types', 'Microprocessor basics', 'Addressing modes']),
    ]),
    sub('ctrl', 'Control Systems', 'Control', 'target', 8, [
      ch('transfer', 'Transfer functions', 'M', ['Block diagrams & signal flow graphs', 'Feedback principles']),
      ch('response', 'Time & frequency response', 'H', ['Transient & steady-state response', 'Bode plots', 'Gain & phase margins', 'Lead & lag compensation']),
      ch('stability', 'Stability', 'H', ['Routh–Hurwitz criterion', 'Root locus', 'Nyquist criterion']),
      ch('state-space', 'State space', 'M', ['State-space representation', 'State transition matrix', 'Controllability & observability']),
    ]),
    sub('comm', 'Communications', 'Communications', 'radio', 11, [
      ch('random', 'Random processes', 'H', ['Random variables & PDFs', 'Autocorrelation & PSD', 'Gaussian processes & noise', 'Random signals through LTI systems']),
      ch('analog', 'Analog modulation', 'M', ['AM: DSB, SSB & VSB', 'FM & PM', 'Superheterodyne receiver', 'SNR of AM & FM']),
      ch('digital', 'Digital modulation', 'H', ['PCM & quantisation', 'ASK, FSK, PSK & QAM', 'Matched filter & probability of error', 'Line coding & ISI']),
      ch('info', 'Information theory', 'M', ['Entropy & mutual information', 'Shannon channel capacity', 'Huffman source coding', 'Hamming codes']),
    ]),
    sub('emt', 'Electromagnetics', 'EM Theory', 'globe', 9, [
      ch('maxwell', "Maxwell's equations", 'M', ['Differential & integral forms', 'Boundary conditions', 'Poynting vector']),
      ch('waves', 'Plane waves', 'H', ['Wave propagation in media', 'Skin depth', 'Reflection & refraction', 'Polarisation']),
      ch('lines', 'Transmission lines', 'H', ['Characteristic impedance', 'Reflection coefficient & VSWR', 'Smith chart', 'Impedance matching & quarter-wave transformer']),
      ch('waveguides', 'Waveguides & antennas', 'M', ['Rectangular waveguide modes', 'Cut-off frequency', 'Antenna gain & directivity', 'Dipoles & arrays']),
    ]),
  ],

  ME: [GA, EM,
    sub('mech', 'Engineering Mechanics', 'Mechanics', 'target', 4, [
      ch('fbd', 'Free-body diagrams', 'M', ['Equilibrium of rigid bodies', 'Trusses & frames', 'Virtual work']),
      ch('friction', 'Friction', 'M', ['Laws of friction', 'Belt & wedge friction']),
      ch('dynamics', 'Kinematics & dynamics', 'M', ['Kinematics of particles & rigid bodies', "Newton's laws", 'Work–energy principle']),
      ch('impulse', 'Impulse & momentum', 'L', ['Impulse–momentum', 'Collisions & coefficient of restitution', 'Angular momentum']),
    ]),
    sub('som', 'Mechanics of Materials', 'Strength of Materials', 'layers', 8, [
      ch('stress', 'Stress & strain', 'H', ["Elastic constants & Hooke's law", "Mohr's circle", 'Thermal stresses', 'Thin cylinders']),
      ch('sfd', 'SFD & BMD', 'H', ['Shear force & bending moment diagrams', 'Bending stresses', 'Shear stresses in beams']),
      ch('torsion', 'Torsion', 'M', ['Torsion of circular shafts', 'Combined bending & torsion', 'Springs']),
      ch('deflection', 'Deflection of beams', 'H', ['Double integration method', "Macaulay's method", 'Moment–area method', 'Strain energy & Castigliano']),
      ch('columns', 'Columns', 'M', ["Euler's buckling load", 'Effective length', 'Rankine formula']),
    ]),
    sub('tom', 'Theory of Machines & Vibrations', 'TOM & Vibrations', 'gear', 8, [
      ch('mechanisms', 'Mechanisms & linkages', 'M', ['Degrees of freedom (Gruebler)', 'Four-bar & slider–crank', 'Velocity & acceleration analysis', 'Cams']),
      ch('gears', 'Gears & gear trains', 'M', ['Law of gearing & terminology', 'Involute profiles & interference', 'Simple, compound & epicyclic trains']),
      ch('flywheels', 'Flywheels & governors', 'L', ['Turning moment diagrams', 'Flywheel design', 'Governors', 'Balancing of masses']),
      ch('vibration', 'Free & forced vibration', 'H', ['Free vibration of SDOF systems', 'Damping & logarithmic decrement', 'Forced vibration & resonance', 'Critical speed of shafts']),
    ]),
    sub('md', 'Machine Design', 'Machine Design', 'settings', 5, [
      ch('failure', 'Failure theories', 'H', ['Static failure theories (Tresca, von Mises)', 'Factor of safety', 'Stress concentration']),
      ch('fatigue', 'Fatigue', 'M', ['S–N curve & endurance limit', 'Goodman & Soderberg criteria']),
      ch('joints', 'Joints', 'M', ['Bolted & riveted joints', 'Welded joints']),
      ch('elements', 'Shafts, gears, bearings', 'M', ['Shaft design', 'Spur gear design', 'Rolling & sliding bearings', 'Brakes & clutches']),
    ]),
    sub('fm', 'Fluid Mechanics', 'Fluids', 'droplet', 9, [
      ch('statics', 'Fluid statics', 'M', ['Manometers', 'Forces on submerged surfaces', 'Buoyancy & stability']),
      ch('bernoulli', "Bernoulli's equation", 'H', ['Continuity equation', "Bernoulli's equation & applications", 'Venturi meter & orifice', 'Momentum equation']),
      ch('viscous', 'Viscous flow', 'H', ['Laminar flow in pipes (Hagen–Poiseuille)', 'Flow between parallel plates', 'Darcy–Weisbach & head losses', 'Dimensional analysis']),
      ch('boundary', 'Boundary layer', 'M', ['Boundary layer thickness', 'Drag & lift']),
      ch('turbo', 'Turbomachinery', 'M', ['Velocity triangles', 'Pelton, Francis & Kaplan turbines', 'Centrifugal pumps', 'Specific speed']),
    ]),
    sub('ht', 'Heat Transfer', 'Heat Transfer', 'thermo', 7, [
      ch('conduction', 'Conduction', 'H', ["Fourier's law", '1-D steady conduction', 'Fins', 'Lumped capacitance']),
      ch('convection', 'Convection', 'M', ['Re, Pr & Nu', 'Forced & free convection correlations', 'Thermal boundary layer']),
      ch('radiation', 'Radiation', 'M', ['Black & grey bodies', 'Stefan–Boltzmann law', 'View factors', 'Radiation networks']),
      ch('exchangers', 'Heat exchangers', 'H', ['LMTD method', 'Effectiveness–NTU method']),
    ]),
    sub('td', 'Thermodynamics & Applications', 'Thermodynamics', 'thermo', 11, [
      ch('laws', 'Laws of thermodynamics', 'H', ['Zeroth & first laws', 'Closed & open systems', 'Pure substances & steam tables']),
      ch('entropy', 'Entropy', 'H', ['Second law & Carnot cycle', 'Clausius inequality', 'Entropy change', 'Availability & irreversibility']),
      ch('cycles', 'Power cycles', 'H', ['Rankine cycle, reheat & regeneration', 'Brayton cycle', 'Otto & Diesel cycles']),
      ch('refrigeration', 'Refrigeration & air conditioning', 'M', ['Vapour compression cycle & COP', 'Psychrometry', 'Air-conditioning processes']),
      ch('ic', 'IC engines', 'L', ['Engine performance parameters', 'Combustion in SI & CI engines']),
    ]),
    sub('mfg', 'Manufacturing & Industrial Engineering', 'Manufacturing', 'building', 15, [
      ch('casting', 'Casting, forming & joining', 'H', ['Sand casting & gating design', "Solidification time (Chvorinov's rule)", 'Rolling, forging & extrusion', 'Sheet metal operations', 'Welding processes & heat input']),
      ch('machining', 'Machining', 'H', ["Mechanics of cutting (Merchant's circle)", "Tool life (Taylor's equation)", 'Machining time & MRR', 'Non-traditional machining']),
      ch('metrology', 'Metrology', 'M', ['Limits, fits & tolerances', 'Gauge design', 'Surface roughness', 'Comparators & CMM']),
      ch('ppc', 'Production planning', 'M', ['Forecasting', "Scheduling & Johnson's rule", 'Line balancing', 'MRP']),
      ch('or', 'Inventory & operations research', 'H', ['EOQ models', 'Linear programming & simplex', 'Transportation & assignment', 'PERT & CPM', 'Queuing theory']),
    ]),
  ],

  CE: [GA, EM,
    sub('struct', 'Structural Engineering', 'Structures', 'building', 18, [
      ch('mechanics', 'Engineering mechanics', 'M', ['Equilibrium & free-body diagrams', 'Trusses', 'Friction & virtual work']),
      ch('solid', 'Solid mechanics', 'H', ['Stress–strain & elastic constants', 'Bending & shear stresses', 'Torsion', 'Deflection of beams', 'Columns']),
      ch('analysis', 'Structural analysis', 'H', ['Static & kinematic indeterminacy', 'Slope deflection & moment distribution', 'Influence lines', 'Matrix methods']),
      ch('rcc', 'RCC design', 'H', ['Limit state design (IS 456)', 'Singly & doubly reinforced beams', 'Shear & bond', 'Columns & footings', 'Prestressed concrete']),
      ch('steel', 'Steel structures', 'M', ['Bolted & welded connections', 'Tension & compression members', 'Beams & plate girders', 'Plastic analysis']),
      ch('materials', 'Construction materials', 'M', ['Cement & concrete properties', 'Mix design & tests', 'Construction management (CPM/PERT)']),
    ]),
    sub('geo', 'Geotechnical Engineering', 'Geotechnical', 'layers', 14, [
      ch('properties', 'Soil properties & classification', 'H', ['Phase relationships', 'Index properties & Atterberg limits', 'IS soil classification']),
      ch('permeability', 'Permeability & seepage', 'H', ["Darcy's law & permeability tests", 'Flow nets & seepage', 'Effective stress & quicksand']),
      ch('consolidation', 'Consolidation', 'H', ["Terzaghi's consolidation theory", 'Compression index & settlement', 'Compaction']),
      ch('shear', 'Shear strength', 'H', ['Mohr–Coulomb criterion', 'Direct shear & triaxial tests', 'Earth pressure: Rankine & Coulomb', 'Slope stability']),
      ch('foundations', 'Foundations', 'M', ["Terzaghi's bearing capacity", 'Shallow foundations & settlement', 'Pile foundations', 'Boussinesq stress distribution']),
    ]),
    sub('wre', 'Water Resources Engineering', 'Water Resources', 'droplet', 14, [
      ch('fluids', 'Fluid mechanics', 'H', ['Fluid properties & statics', 'Continuity, energy & momentum equations', 'Pipe flow & losses', 'Boundary layer & dimensional analysis']),
      ch('open-channel', 'Open channel flow', 'H', ['Specific energy & critical flow', 'Hydraulic jump', 'Gradually varied flow', "Uniform flow (Manning's equation)"]),
      ch('hydrology', 'Hydrology', 'H', ['Precipitation & the hydrologic cycle', 'Infiltration & evaporation', 'Unit hydrograph', 'Flood routing', 'Groundwater & well hydraulics']),
      ch('irrigation', 'Irrigation', 'M', ['Crop water requirements', 'Duty, delta & base period', 'Canal design: Kennedy & Lacey', 'Hydraulic structures']),
    ]),
    sub('env', 'Environmental Engineering', 'Environmental', 'leaf', 10, [
      ch('water', 'Water quality & treatment', 'H', ['Water quality parameters', 'Coagulation & sedimentation', 'Filtration & disinfection', 'Water demand & distribution']),
      ch('wastewater', 'Wastewater treatment', 'H', ['BOD, COD & BOD kinetics', 'Activated sludge process', 'Trickling filters & sludge treatment', 'Sewer design']),
      ch('air', 'Air pollution', 'M', ['Pollutants & standards', 'Dispersion & stack height', 'Control devices']),
      ch('solid-waste', 'Solid waste management', 'L', ['Generation & characterisation', 'Collection & disposal', 'Landfills & composting', 'Noise pollution']),
    ]),
    sub('trans', 'Transportation Engineering', 'Transportation', 'road', 10, [
      ch('geometric', 'Highway geometric design', 'H', ['Sight distances', 'Superelevation & horizontal curves', 'Gradients & vertical curves']),
      ch('pavement', 'Pavement design', 'M', ['Flexible pavements (CBR, IRC)', 'Rigid pavement stresses (Westergaard)', 'Highway material tests']),
      ch('traffic', 'Traffic engineering', 'H', ['Traffic flow parameters', "Signal design (Webster's method)", 'Capacity & level of service']),
    ]),
    sub('gm', 'Geomatics Engineering', 'Geomatics', 'globe', 4, [
      ch('levelling', 'Levelling', 'M', ['Principles of surveying', 'Levelling & contouring', 'Errors & adjustments']),
      ch('theodolite', 'Theodolite & traversing', 'M', ['Distance & angle measurement', 'Traversing & triangulation', 'Curves']),
      ch('rs', 'Remote sensing & GIS', 'L', ['Photogrammetry', 'Remote sensing principles', 'GIS & GPS basics']),
    ]),
  ],

  IN: [GA, EM,
    sub('ecm', 'Electrical Circuits & Machines', 'Circuits & Machines', 'bolt', 8, [
      ch('theorems', 'Circuit theorems', 'H', ['Nodal & mesh analysis', 'Network theorems', 'Two-port networks']),
      ch('transients', 'Transients', 'M', ['RL, RC & RLC transients', 'Sinusoidal steady state & resonance']),
      ch('machines', 'Transformers & machines', 'M', ['Transformer basics', 'DC machines', 'Induction motors']),
    ]),
    sub('ss', 'Signals & Systems', 'Signals', 'wave', 8, [
      ch('lti', 'LTI systems', 'H', ['Convolution', 'Impulse response', 'Stability & causality']),
      ch('transforms', 'Transforms', 'H', ['Fourier series & transform', 'Laplace transform', 'Z-transform', 'DFT & FFT']),
      ch('filters', 'Sampling & filters', 'M', ['Sampling theorem', 'FIR & IIR filters', 'Filter design basics']),
    ]),
    sub('cs', 'Control Systems', 'Control', 'target', 9, [
      ch('feedback', 'Feedback principles', 'H', ['Block diagrams & SFG', 'Transfer functions', 'Time response & steady-state error']),
      ch('stability', 'Stability analysis', 'H', ['Routh–Hurwitz', 'Root locus', 'Bode & Nyquist']),
      ch('controllers', 'Controllers (P, PI, PID)', 'M', ['P, PI & PID action', 'Ziegler–Nichols tuning', 'Feedforward, cascade & ratio control', 'State-space basics']),
    ]),
    sub('ae', 'Analog Electronics', 'Analog', 'chart', 9, [
      ch('devices', 'Diodes & transistors', 'M', ['Diode circuits', 'BJT & MOSFET biasing', 'Small-signal amplifiers']),
      ch('opamps', 'Op-amps', 'H', ['Op-amp characteristics', 'Amplifiers, integrators & differentiators', 'Instrumentation amplifier', 'Comparators & Schmitt trigger']),
      ch('filters', 'Active filters', 'M', ['Butterworth active filters', 'Oscillators', 'Precision rectifiers']),
    ]),
    sub('de', 'Digital Electronics', 'Digital', 'cpu', 8, [
      ch('families', 'Logic families', 'L', ['TTL & CMOS', 'Fan-out, noise margin & propagation delay']),
      ch('circuits', 'Combinational & sequential circuits', 'H', ['Boolean algebra & K-maps', 'Multiplexers & decoders', 'Flip-flops, counters & registers']),
      ch('converters', 'ADC/DAC', 'M', ['ADC types & conversion time', 'DAC resolution', 'Microcontroller basics']),
    ]),
    sub('meas', 'Measurements', 'Measurements', 'gauge', 8, [
      ch('bridges', 'Bridges', 'M', ['DC bridges', 'AC bridges']),
      ch('instruments', 'Instruments', 'H', ['PMMC & moving iron meters', 'Digital voltmeters & multimeters', 'Oscilloscopes', 'Q-meter & spectrum analysers']),
      ch('errors', 'Error analysis', 'M', ['Static & dynamic characteristics', 'Errors & uncertainty', 'Statistical analysis']),
    ]),
    sub('sii', 'Sensors & Industrial Instrumentation', 'Sensors', 'thermo', 10, [
      ch('displacement', 'Displacement & strain sensors', 'H', ['Resistive, capacitive & inductive sensors', 'LVDT', 'Strain gauges & bridges', 'Piezoelectric sensors']),
      ch('temperature', 'Temperature sensors', 'H', ['Thermocouples', 'RTDs & thermistors', 'Pyrometers']),
      ch('pressure-flow', 'Pressure & flow measurement', 'H', ['Pressure gauges & diaphragms', 'Differential pressure flowmeters', 'Electromagnetic & ultrasonic flowmeters', 'Level & viscosity measurement']),
    ]),
    sub('coi', 'Communication & Optical Instrumentation', 'Optical & Comm.', 'radio', 7, [
      ch('modulation', 'Modulation', 'M', ['AM & FM', 'Sampling & PCM', 'Digital modulation basics']),
      ch('optics', 'Optical sources & detectors', 'M', ['LEDs & lasers', 'Photodiodes & phototransistors', 'Interferometers']),
      ch('fibre', 'Fibre optics', 'M', ['Numerical aperture & modes', 'Fibre-optic sensing', 'Losses & dispersion']),
    ]),
  ],

  CH: [GA, EM,
    sub('pct', 'Process Calculations & Thermodynamics', 'Calculations & Thermo', 'calc', 10, [
      ch('balances', 'Material & energy balances', 'H', ['Steady-state material balances', 'Recycle, bypass & purge', 'Energy balances & heats of reaction', 'Humidity & saturation']),
      ch('laws', 'Laws of thermodynamics', 'M', ['First & second laws', 'PVT behaviour & equations of state', 'Thermodynamic property relations']),
      ch('phase', 'Phase equilibria', 'H', ['Fugacity & activity coefficients', "Raoult's law & VLE", 'Azeotropes']),
      ch('reaction-eq', 'Chemical reaction equilibria', 'M', ['Equilibrium constant', 'Effect of temperature & pressure on conversion']),
    ]),
    sub('fmo', 'Fluid Mechanics & Mechanical Operations', 'Fluids & Mech. Ops', 'droplet', 10, [
      ch('flow', 'Fluid statics & flow', 'H', ['Manometers', 'Bernoulli & momentum equations', 'Pipe flow & friction factor', 'Flow measurement', 'Packed & fluidised beds']),
      ch('pumps', 'Pumps & compressors', 'M', ['Pump characteristics & NPSH', 'Compressors & power']),
      ch('size', 'Size reduction', 'M', ["Laws of comminution: Rittinger, Kick & Bond", 'Screening & particle size analysis']),
      ch('separation', 'Filtration & settling', 'M', ['Filtration theory', 'Settling & sedimentation', 'Cyclones, centrifuges & agitation']),
    ]),
    sub('ht', 'Heat Transfer', 'Heat Transfer', 'thermo', 8, [
      ch('conv', 'Conduction & convection', 'H', ['Steady conduction', 'Forced & free convection', 'Heat transfer coefficients']),
      ch('radiation', 'Radiation', 'L', ['Black-body radiation & view factors']),
      ch('exchangers', 'Heat exchangers', 'H', ['Double pipe & shell-and-tube', 'LMTD & NTU methods', 'Fouling']),
      ch('evaporators', 'Evaporators', 'M', ['Boiling & condensation', 'Single & multiple-effect evaporators']),
    ]),
    sub('mt', 'Mass Transfer', 'Mass Transfer', 'layers', 11, [
      ch('diffusion', 'Diffusion', 'H', ["Fick's law", 'Mass transfer coefficients', 'Interphase mass transfer & film theory']),
      ch('distillation', 'Distillation', 'H', ['VLE & relative volatility', 'McCabe–Thiele method', 'Flash & batch distillation', 'Reflux ratio']),
      ch('absorption', 'Absorption', 'M', ['HTU & NTU', 'Minimum liquid rate']),
      ch('extraction', 'Extraction & drying', 'M', ['Liquid–liquid extraction', 'Drying rate curves', 'Humidification & cooling towers', 'Adsorption']),
    ]),
    sub('cre', 'Chemical Reaction Engineering', 'Reaction Engg.', 'flask', 11, [
      ch('rates', 'Rate laws', 'H', ['Reaction order & rate constant', 'Arrhenius equation', 'Analysis of rate data']),
      ch('reactors', 'Ideal reactors (CSTR, PFR)', 'H', ['Batch reactor design', 'CSTR & PFR design equations', 'Reactors in series', 'Multiple reactions & selectivity']),
      ch('rtd', 'RTD & non-ideal reactors', 'M', ['Residence time distribution', 'Segregation & dispersion models']),
      ch('catalysis', 'Catalysis', 'M', ['Heterogeneous catalysis kinetics', 'Effectiveness factor & Thiele modulus']),
    ]),
    sub('ipc', 'Instrumentation & Process Control', 'Process Control', 'gauge', 8, [
      ch('instruments', 'Measuring instruments', 'L', ['Temperature, pressure, flow & level sensors']),
      ch('dynamics', 'Transfer functions', 'H', ['First & second-order systems', 'Process dynamics', 'Stability: Routh & Bode']),
      ch('tuning', 'Controller tuning', 'M', ['P, PI & PID controllers', 'Ziegler–Nichols & Cohen–Coon', 'Cascade & feedforward control']),
    ]),
    sub('pde', 'Plant Design & Economics', 'Plant Economics', 'chart', 5, [
      ch('cost', 'Cost estimation', 'M', ['Capital & operating costs', 'Six-tenths rule & cost indices']),
      ch('depreciation', 'Depreciation', 'M', ['Straight-line & declining-balance methods', 'Time value of money']),
      ch('profitability', 'Profitability analysis', 'M', ['Payback period & ROI', 'NPV & IRR', 'Optimum design']),
    ]),
    sub('ct', 'Chemical Technology', 'Chem. Technology', 'building', 4, [
      ch('inorganic', 'Inorganic industries', 'L', ['Sulphuric acid, chlor-alkali & ammonia', 'Fertilisers']),
      ch('petroleum', 'Petroleum refining', 'L', ['Crude distillation', 'Cracking & reforming']),
      ch('polymers', 'Polymers', 'L', ['Polymerisation types', 'Polyethylene, PVC & nylon']),
    ]),
  ],

  DA: [GA,
    sub('ps', 'Probability & Statistics', 'Probability', 'chart', 14, [
      ch('rv', 'Random variables', 'H', ['Discrete & continuous random variables', 'Expectation & variance', 'Joint distributions & covariance', 'Conditional expectation']),
      ch('distributions', 'Distributions', 'H', ['Binomial, Poisson & geometric', 'Uniform, exponential & normal', 't, chi-squared & the central limit theorem']),
      ch('testing', 'Hypothesis testing', 'M', ['Confidence intervals', 'z-test, t-test & chi-squared test', 'Correlation & covariance']),
      ch('bayes', "Bayes' theorem", 'H', ['Counting & probability axioms', 'Conditional probability & independence', "Applying Bayes' theorem"]),
    ]),
    sub('la', 'Linear Algebra', 'Linear Algebra', 'calc', 10, [
      ch('spaces', 'Vector spaces', 'M', ['Subspaces, span & basis', 'Linear independence', 'Projections & orthogonality']),
      ch('eigen', 'Eigenvalues', 'H', ['Eigenvalues & eigenvectors', 'Determinants & rank', 'Quadratic forms', 'Diagonalisation']),
      ch('decompositions', 'Matrix decompositions (SVD, LU)', 'M', ['LU decomposition', 'Singular value decomposition', 'Gaussian elimination & linear systems']),
    ]),
    sub('co', 'Calculus & Optimization', 'Calculus', 'target', 7, [
      ch('limits', 'Limits & derivatives', 'M', ['Functions of a single variable', 'Limits & continuity', 'Differentiability']),
      ch('taylor', 'Taylor series', 'L', ['Taylor & Maclaurin series', 'Approximation error']),
      ch('optimisation', 'Optimisation', 'M', ['Maxima & minima', 'Single-variable optimisation', 'Gradient descent basics']),
    ]),
    sub('pdsa', 'Programming, DS & Algorithms', 'Programming & DSA', 'code', 14, [
      ch('python', 'Python programming', 'H', ['Python basics & data types', 'Functions & recursion', 'Tracing program output']),
      ch('ds', 'Data structures', 'H', ['Stacks & queues', 'Linked lists', 'Trees & binary search trees', 'Hash tables']),
      ch('sorting', 'Sorting & searching', 'H', ['Linear & binary search', 'Selection, bubble & insertion sort', 'Merge & quick sort', 'Complexity analysis']),
      ch('graphs', 'Graph algorithms', 'M', ['BFS & DFS', 'Shortest paths']),
    ]),
    sub('dbw', 'Database Management & Warehousing', 'Databases', 'database', 10, [
      ch('sql', 'ER model & SQL', 'H', ['ER model', 'Relational model & algebra', 'SQL queries']),
      ch('normalisation', 'Normalisation', 'M', ['Functional dependencies', 'Normal forms', 'Indexing & tree indexes']),
      ch('warehousing', 'Data warehousing', 'M', ['Data transformation: normalisation, discretisation, sampling', 'Multidimensional data model', 'Star & snowflake schemas', 'OLAP: roll-up, drill-down, slice & dice']),
    ]),
    sub('ml', 'Machine Learning', 'Machine Learning', 'sparkles', 16, [
      ch('regression', 'Regression', 'H', ['Simple & multiple linear regression', 'Ridge regression', 'Bias–variance trade-off']),
      ch('classification', 'Classification', 'H', ['Logistic regression', 'k-nearest neighbours', 'Naive Bayes & LDA', 'Support vector machines', 'Decision trees']),
      ch('clustering', 'Clustering', 'M', ['k-means & k-medoids', 'Hierarchical clustering', 'PCA & dimensionality reduction']),
      ch('nn', 'Neural networks', 'M', ['Perceptron & MLP', 'Activation functions', 'Feed-forward networks & backpropagation']),
      ch('evaluation', 'Model evaluation', 'H', ['Leave-one-out & k-fold cross-validation', 'Precision, recall & F1', 'Overfitting & regularisation']),
    ]),
    sub('ai', 'Artificial Intelligence', 'AI', 'brain', 14, [
      ch('search', 'Search', 'H', ['Uninformed search: BFS, DFS, iterative deepening', 'Informed search: A* & heuristics', 'Adversarial search: minimax & alpha-beta']),
      ch('logic', 'Logic', 'M', ['Propositional logic', 'Predicate logic & inference']),
      ch('uncertainty', 'Reasoning under uncertainty', 'H', ['Conditional independence', 'Bayesian networks & variable elimination', 'Approximate inference by sampling']),
    ]),
  ],
};

// Subject colours: fixed for the shared papers, then a palette in syllabus order.
const PALETTE = ['#3b6fd8', '#9b4fd6', '#1f9d55', '#e0566b', '#d97706', '#0891b2', '#c026d3', '#65a30d', '#dc2626', '#4f46e5', '#0d9488'];
const FIXED = { ga: '#b7791f', em: '#0e9f7e' };

/** Every subject of a paper, with colours assigned. */
export function subjectsOf(branchId) {
  let n = 0;
  return (SYLLABUS[branchId] || SYLLABUS.CS).map((s) => ({
    id: s.id, name: s.name, short: s.short, icon: s.icon, marks: s.marks,
    color: FIXED[s.id] || PALETTE[n++ % PALETTE.length],
  }));
}
export const syllabusOf = (branchId) => SYLLABUS[branchId] || SYLLABUS.CS;

/* ---------------- Current paper (live bindings) ---------------- */
export let BRANCH = BRANCHES[0];
export let SUBJECTS = [];
export let CHAPTERS = {};
export let LIBRARY = [];

export function setBranch(id) {
  BRANCH = branchById(id);
  SUBJECTS = subjectsOf(BRANCH.id);
  CHAPTERS = Object.fromEntries(syllabusOf(BRANCH.id).map((s) => [s.id, s.chapters]));
  LIBRARY = ALL_LIBRARY.filter((r) => !r.branch || r.branch.includes(BRANCH.id));
  return BRANCH;
}

export const subjectById = (id) => SUBJECTS.find((s) => s.id === id) || { id, name: id || 'General', short: id || 'General', color: '#8b8d96', icon: 'book', marks: 0 };
export const chaptersOf = (s) => CHAPTERS[s] || [];
export const chapterById = (s, id) => chaptersOf(s).find((c) => c.id === id) || null;
export const allChapters = () => SUBJECTS.flatMap((s) => chaptersOf(s.id).map((c) => ({ ...c, subject: s.id })));
export const WEIGHT_LABEL = { H: 'High weightage', M: 'Medium weightage', L: 'Low weightage' };

export const HABITS = [
  { id: 'concepts', emoji: '📘', title: 'Concept study', hint: 'One topic from standard notes or a book' },
  { id: 'problems', emoji: '🎯', title: 'Problem practice', hint: '25+ questions' },
  { id: 'revision', emoji: '🔁', title: 'Revision', hint: "Revise yesterday's topics" },
  { id: 'formulas', emoji: '🧮', title: 'Formula sheet', hint: 'Read your short notes' },
  { id: 'aptitude', emoji: '💡', title: 'Aptitude', hint: '10 GA questions' },
  { id: 'pyq', emoji: '📝', title: 'PYQs', hint: 'Previous-year GATE questions' },
];

export const TIPS = [
  'Solve previous-year GATE questions topic by topic before you start full mocks. They show you exactly what gets asked.',
  'General Aptitude is 15 marks and the most scoring section. Practise 10 aptitude questions every day.',
  'Engineering Mathematics carries about 13 marks and its ideas repeat every year. Never skip it.',
  'NAT and MSQ questions have no negative marking. Always attempt them.',
  'A wrong 1-mark MCQ costs 1/3 mark and a wrong 2-mark MCQ costs 2/3. Guess only when you can eliminate two options.',
  'Keep a short-notes sheet for every subject and read it every morning for 15 minutes.',
  'Learn to use the GATE virtual calculator early. It is the only calculator allowed in the exam.',
  'Analyse every mock test for twice the time you took to write it. Your mistakes are your syllabus.',
  'Spend the last 6–8 weeks mostly on revision and full-length mock tests.',
  'Revise on a 1–3–7–21 day cycle. A topic revised four times is a topic you own in the exam hall.',
  'Sleep 7 hours. Memory consolidates while you rest; late nights cost marks.',
  'Finish one standard book per subject thoroughly rather than five books halfway.',
];

const ALL_LIBRARY = [
  // Official & free learning
  { id: 'gate-official', cat: 'Official', title: 'GATE official website', desc: "The organising IIT changes every year. Search 'GATE <year> official website' for the brochure, syllabus, registration and answer keys.", type: 'web' },
  { id: 'gate-papers', cat: 'Official', title: 'Previous GATE papers & answer keys', desc: 'Official papers and keys from recent years. Solve them under a timer.', url: 'https://gate.nptel.ac.in', type: 'pdf' },
  { id: 'virtual-calc', cat: 'Official', title: 'GATE virtual calculator', desc: 'The only calculator allowed in the exam. Practise with the official online version on the GATE website.', type: 'web' },
  { id: 'nptel', cat: 'Free Learning', title: 'NPTEL', desc: 'Free IIT video courses for every GATE subject.', url: 'https://nptel.ac.in', type: 'video' },
  { id: 'swayam', cat: 'Free Learning', title: 'SWAYAM', desc: 'Free government courses, many taught by IIT faculty.', url: 'https://swayam.gov.in', type: 'video' },
  { id: 'mit-ocw', cat: 'Free Learning', title: 'MIT OpenCourseWare', desc: 'Lecture notes and problem sets for core engineering subjects.', url: 'https://ocw.mit.edu', type: 'web' },
  { id: 'khan-maths', cat: 'Free Learning', title: 'Khan Academy: linear algebra, calculus & probability', desc: 'Clear refreshers for Engineering Mathematics.', url: 'https://www.khanacademy.org/math', type: 'video' },
  { id: 'b-ga', cat: 'Aptitude & Maths', title: 'Quantitative Aptitude: R.S. Aggarwal', desc: 'Enough practice for the GATE aptitude section.', type: 'book' },
  { id: 'b-kreyszig', cat: 'Aptitude & Maths', title: 'Advanced Engineering Mathematics: Erwin Kreyszig', desc: 'Reference for linear algebra, calculus, ODEs, complex variables and probability.', type: 'book', branch: ['EE', 'EC', 'ME', 'CE', 'IN', 'CH'] },
  { id: 'b-grewal', cat: 'Aptitude & Maths', title: 'Higher Engineering Mathematics: B.S. Grewal', desc: 'Exam-oriented maths with many solved problems.', type: 'book', branch: ['EE', 'EC', 'ME', 'CE', 'IN', 'CH'] },
  // CS
  { id: 'b-rosen', cat: 'Standard Books', title: 'Discrete Mathematics: Kenneth Rosen', desc: 'Logic, sets, combinatorics and graph theory.', type: 'book', branch: ['CS'] },
  { id: 'b-clrs', cat: 'Standard Books', title: 'Introduction to Algorithms: Cormen et al. (CLRS)', desc: 'Algorithms and data structures; do the chapter exercises.', type: 'book', branch: ['CS', 'DA'] },
  { id: 'b-galvin', cat: 'Standard Books', title: 'Operating System Concepts: Silberschatz, Galvin & Gagne', desc: 'The standard OS text.', type: 'book', branch: ['CS'] },
  { id: 'b-korth', cat: 'Standard Books', title: 'Database System Concepts: Korth', desc: 'ER model, SQL, normalisation and transactions.', type: 'book', branch: ['CS', 'DA'] },
  { id: 'b-kurose', cat: 'Standard Books', title: 'Computer Networking: Kurose & Ross', desc: 'Top-down networks with clear numericals.', type: 'book', branch: ['CS'] },
  { id: 'b-hamacher', cat: 'Standard Books', title: 'Computer Organization: Hamacher', desc: 'Pipelining, cache and memory.', type: 'book', branch: ['CS'] },
  { id: 'b-ullman', cat: 'Standard Books', title: 'Introduction to Automata Theory: Hopcroft & Ullman', desc: 'Theory of computation.', type: 'book', branch: ['CS'] },
  { id: 'b-mano', cat: 'Standard Books', title: 'Digital Design: Morris Mano', desc: 'Digital logic for CS, EC, EE and IN.', type: 'book', branch: ['CS', 'EC', 'EE', 'IN'] },
  // EE / EC / IN
  { id: 'b-hayt', cat: 'Standard Books', title: 'Engineering Circuit Analysis: Hayt & Kemmerly', desc: 'Network theory fundamentals.', type: 'book', branch: ['EE', 'EC', 'IN'] },
  { id: 'b-oppenheim', cat: 'Standard Books', title: 'Signals & Systems: Oppenheim & Willsky', desc: 'Signals, transforms and sampling.', type: 'book', branch: ['EE', 'EC', 'IN'] },
  { id: 'b-nagrath', cat: 'Standard Books', title: 'Control Systems Engineering: Nagrath & Gopal', desc: 'Control systems for EE, EC, IN and CH.', type: 'book', branch: ['EE', 'EC', 'IN'] },
  { id: 'b-sedra', cat: 'Standard Books', title: 'Microelectronic Circuits: Sedra & Smith', desc: 'Analog circuits and devices.', type: 'book', branch: ['EC', 'EE', 'IN'] },
  { id: 'b-bimbhra', cat: 'Standard Books', title: 'Electrical Machinery: P.S. Bimbhra', desc: 'Transformers, DC and AC machines.', type: 'book', branch: ['EE'] },
  { id: 'b-kothari', cat: 'Standard Books', title: 'Modern Power System Analysis: Kothari & Nagrath', desc: 'Load flow, faults and stability.', type: 'book', branch: ['EE'] },
  { id: 'b-bimbhra-pe', cat: 'Standard Books', title: 'Power Electronics: P.S. Bimbhra', desc: 'Converters and inverters with numericals.', type: 'book', branch: ['EE'] },
  { id: 'b-sawhney', cat: 'Standard Books', title: 'Electrical & Electronic Measurements: A.K. Sawhney', desc: 'Bridges, instruments and errors.', type: 'book', branch: ['EE', 'IN'] },
  { id: 'b-streetman', cat: 'Standard Books', title: 'Solid State Electronic Devices: Streetman', desc: 'Semiconductor physics and devices.', type: 'book', branch: ['EC'] },
  { id: 'b-lathi', cat: 'Standard Books', title: 'Modern Digital & Analog Communication: B.P. Lathi', desc: 'Analog & digital communication.', type: 'book', branch: ['EC'] },
  { id: 'b-hayt-em', cat: 'Standard Books', title: 'Engineering Electromagnetics: Hayt & Buck', desc: 'Fields, waves and transmission lines.', type: 'book', branch: ['EC', 'EE'] },
  { id: 'b-nakra', cat: 'Standard Books', title: 'Instrumentation, Measurement & Analysis: Nakra & Chaudhry', desc: 'Sensors and industrial instrumentation.', type: 'book', branch: ['IN'] },
  // ME
  { id: 'b-cengel', cat: 'Standard Books', title: 'Thermodynamics: Cengel & Boles', desc: 'Laws, entropy and cycles.', type: 'book', branch: ['ME'] },
  { id: 'b-bansal', cat: 'Standard Books', title: 'Fluid Mechanics: R.K. Bansal', desc: 'Exam-oriented fluid mechanics and machines.', type: 'book', branch: ['ME', 'CE'] },
  { id: 'b-gere', cat: 'Standard Books', title: 'Mechanics of Materials: Gere & Timoshenko', desc: 'Strength of materials.', type: 'book', branch: ['ME', 'CE'] },
  { id: 'b-rattan', cat: 'Standard Books', title: 'Theory of Machines: S.S. Rattan', desc: 'Mechanisms, gears and vibrations.', type: 'book', branch: ['ME'] },
  { id: 'b-shigley', cat: 'Standard Books', title: "Shigley's Mechanical Engineering Design", desc: 'Machine design.', type: 'book', branch: ['ME'] },
  { id: 'b-pnrao', cat: 'Standard Books', title: 'Manufacturing Technology: P.N. Rao', desc: 'Casting, forming, welding and machining.', type: 'book', branch: ['ME'] },
  { id: 'b-incropera', cat: 'Standard Books', title: 'Fundamentals of Heat & Mass Transfer: Incropera', desc: 'Conduction, convection and radiation.', type: 'book', branch: ['ME', 'CH'] },
  // CE
  { id: 'b-punmia', cat: 'Standard Books', title: 'Soil Mechanics & Foundations: B.C. Punmia', desc: 'Geotechnical engineering.', type: 'book', branch: ['CE'] },
  { id: 'b-khanna', cat: 'Standard Books', title: 'Highway Engineering: Khanna & Justo', desc: 'Geometric design, pavements and traffic.', type: 'book', branch: ['CE'] },
  { id: 'b-garg', cat: 'Standard Books', title: 'Environmental Engineering: S.K. Garg', desc: 'Water supply and wastewater.', type: 'book', branch: ['CE'] },
  { id: 'b-subramanya', cat: 'Standard Books', title: 'Engineering Hydrology & Open Channel Flow: K. Subramanya', desc: 'Hydrology and channel hydraulics.', type: 'book', branch: ['CE'] },
  { id: 'b-is456', cat: 'Standard Books', title: 'IS 456:2000 & IS 800:2007 codes', desc: 'Keep the RCC and steel codes handy while solving design questions.', type: 'pdf', branch: ['CE'] },
  // CH
  { id: 'b-levenspiel', cat: 'Standard Books', title: 'Chemical Reaction Engineering: Octave Levenspiel', desc: 'Reactor design and kinetics.', type: 'book', branch: ['CH'] },
  { id: 'b-mccabe', cat: 'Standard Books', title: 'Unit Operations of Chemical Engineering: McCabe, Smith & Harriott', desc: 'Fluids, heat transfer and mechanical operations.', type: 'book', branch: ['CH'] },
  { id: 'b-treybal', cat: 'Standard Books', title: 'Mass Transfer Operations: Treybal', desc: 'Distillation, absorption and extraction.', type: 'book', branch: ['CH'] },
  { id: 'b-smith', cat: 'Standard Books', title: 'Chemical Engineering Thermodynamics: Smith, Van Ness & Abbott', desc: 'Phase and reaction equilibria.', type: 'book', branch: ['CH'] },
  // DA
  { id: 'b-isl', cat: 'Standard Books', title: 'An Introduction to Statistical Learning', desc: 'Regression, classification and resampling. Free PDF from the authors.', url: 'https://www.statlearning.com', type: 'pdf', branch: ['DA'] },
  { id: 'b-strang', cat: 'Standard Books', title: 'Introduction to Linear Algebra: Gilbert Strang', desc: 'Vector spaces, eigenvalues and SVD.', type: 'book', branch: ['DA'] },
  { id: 'b-aima', cat: 'Standard Books', title: 'Artificial Intelligence: A Modern Approach: Russell & Norvig', desc: 'Search, logic and probabilistic reasoning.', type: 'book', branch: ['DA'] },
  { id: 'b-ross', cat: 'Standard Books', title: 'A First Course in Probability: Sheldon Ross', desc: 'Probability for DA.', type: 'book', branch: ['DA'] },
  // Practice
  { id: 'b-pyq', cat: 'Practice', title: 'Topic-wise previous GATE papers (any reputed publisher)', desc: 'Solve the last 10+ years topic-wise, then as full papers.', type: 'book' },
];

export const PRESET_REMINDERS = [
  { title: 'Morning formula & short-notes revision', time: '06:30', repeat: 'daily', emoji: '🧮' },
  { title: 'Core subject study block', time: '09:00', repeat: 'daily', emoji: '📘' },
  { title: 'Aptitude practice (10 questions)', time: '13:30', repeat: 'daily', emoji: '💡' },
  { title: 'Previous-year questions', time: '17:00', repeat: 'weekdays', emoji: '📝' },
  { title: "Revise today's topic", time: '21:30', repeat: 'daily', emoji: '🔁' },
  { title: 'Full-length GATE mock test', time: '14:00', repeat: 'weekly', days: [0], emoji: '🎯' },
];

setBranch('CS');
