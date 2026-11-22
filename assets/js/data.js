/* YourGATEBuddy — static data: GATE papers, syllabus and built-in question bank. */
(function () {
  "use strict";

  const GA = {
    id: "ga", name: "General Aptitude", marks: 15,
    topics: ["Verbal ability", "Quantitative aptitude", "Analytical reasoning", "Spatial aptitude"],
  };
  const EM = {
    id: "em", name: "Engineering Mathematics", marks: 13,
    topics: ["Linear algebra", "Calculus", "Differential equations", "Complex variables", "Probability & statistics", "Numerical methods"],
  };

  const s = (id, name, marks, topics) => ({ id, name, marks, topics });

  const BRANCHES = [
    {
      id: "CS", name: "Computer Science & IT", short: "CSE / IT", color: "#6366f1", icon: "cpu",
      subjects: [GA, EM,
        s("dl", "Digital Logic", 5, ["Boolean algebra", "Combinational circuits", "Sequential circuits", "Number representation"]),
        s("coa", "Computer Organization & Architecture", 9, ["Machine instructions & addressing", "ALU & datapath", "Pipelining", "Cache & memory hierarchy", "I/O & DMA"]),
        s("pds", "Programming & Data Structures", 10, ["C programming", "Recursion", "Arrays, stacks, queues", "Linked lists", "Trees & BST", "Heaps & graphs"]),
        s("algo", "Algorithms", 9, ["Asymptotic analysis", "Searching & sorting", "Greedy", "Dynamic programming", "Divide & conquer", "Graph algorithms"]),
        s("toc", "Theory of Computation", 8, ["Regular languages & FA", "Context-free languages & PDA", "Turing machines", "Undecidability"]),
        s("cd", "Compiler Design", 5, ["Lexical analysis", "Parsing", "Syntax-directed translation", "Intermediate code & optimisation"]),
        s("os", "Operating System", 9, ["Processes & threads", "CPU scheduling", "Synchronisation", "Deadlock", "Memory management & paging", "File systems"]),
        s("db", "Databases", 8, ["ER model", "Relational algebra & SQL", "Normalisation", "Transactions & concurrency", "Indexing & B+ trees"]),
        s("cn", "Computer Networks", 9, ["Layering & switching", "Data link layer", "IP addressing & routing", "TCP/UDP", "Application layer protocols"]),
      ],
    },
    {
      id: "EE", name: "Electrical Engineering", short: "Electrical", color: "#f59e0b", icon: "bolt",
      subjects: [GA, EM,
        s("ckt", "Electric Circuits", 10, ["Network theorems", "Transient analysis", "Sinusoidal steady state", "Two-port networks", "Three-phase circuits"]),
        s("emf", "Electromagnetic Fields", 4, ["Coulomb's & Gauss's law", "Electric potential", "Biot–Savart & Ampère's law", "Inductance & capacitance"]),
        s("ss", "Signals & Systems", 7, ["LTI systems", "Fourier series & transform", "Laplace transform", "Z-transform", "Sampling theorem"]),
        s("mach", "Electrical Machines", 11, ["Transformers", "DC machines", "Induction machines", "Synchronous machines"]),
        s("ps", "Power Systems", 11, ["Transmission line parameters", "Load flow", "Fault analysis", "Protection", "Stability"]),
        s("cs", "Control Systems", 8, ["Block diagrams & SFG", "Time response", "Routh–Hurwitz & root locus", "Bode & Nyquist", "State space"]),
        s("meas", "Electrical & Electronic Measurements", 5, ["Bridges", "Instruments", "Power & energy measurement", "Error analysis"]),
        s("ade", "Analog & Digital Electronics", 8, ["Diodes & BJTs", "Op-amps", "Combinational & sequential logic", "Microprocessor basics"]),
        s("pe", "Power Electronics", 8, ["Power devices", "Rectifiers", "DC–DC converters", "Inverters"]),
      ],
    },
    {
      id: "EC", name: "Electronics & Communication", short: "ECE", color: "#10b981", icon: "wave",
      subjects: [GA, EM,
        s("nss", "Networks, Signals & Systems", 12, ["Network theorems", "Transient analysis", "Continuous & discrete signals", "Fourier, Laplace, Z-transform"]),
        s("edev", "Electronic Devices", 7, ["Semiconductor physics", "P-N junction", "BJT & MOSFET", "Fabrication basics"]),
        s("ac", "Analog Circuits", 10, ["Diode circuits", "Amplifiers & biasing", "Op-amp circuits", "Oscillators & feedback"]),
        s("dc", "Digital Circuits", 8, ["Number systems", "Combinational logic", "Sequential circuits", "Data converters", "Computer organisation basics"]),
        s("ctrl", "Control Systems", 8, ["Transfer functions", "Time & frequency response", "Stability", "State space"]),
        s("comm", "Communications", 11, ["Random processes", "Analog modulation", "Digital modulation", "Information theory"]),
        s("emt", "Electromagnetics", 9, ["Maxwell's equations", "Plane waves", "Transmission lines", "Waveguides & antennas"]),
      ],
    },
    {
      id: "ME", name: "Mechanical Engineering", short: "Mechanical", color: "#ef4444", icon: "gear",
      subjects: [GA, EM,
        s("mech", "Engineering Mechanics", 4, ["Free-body diagrams", "Friction", "Kinematics & dynamics", "Impulse & momentum"]),
        s("som", "Mechanics of Materials", 8, ["Stress & strain", "SFD & BMD", "Torsion", "Deflection of beams", "Columns"]),
        s("tom", "Theory of Machines & Vibrations", 8, ["Mechanisms & linkages", "Gears & gear trains", "Flywheels & governors", "Free & forced vibration"]),
        s("md", "Machine Design", 5, ["Failure theories", "Fatigue", "Joints", "Shafts, gears, bearings"]),
        s("fm", "Fluid Mechanics", 9, ["Fluid statics", "Bernoulli's equation", "Viscous flow", "Boundary layer", "Turbomachinery"]),
        s("ht", "Heat Transfer", 7, ["Conduction", "Convection", "Radiation", "Heat exchangers"]),
        s("td", "Thermodynamics & Applications", 11, ["Laws of thermodynamics", "Entropy", "Power cycles", "Refrigeration & air conditioning", "IC engines"]),
        s("mfg", "Manufacturing & Industrial Engineering", 15, ["Casting, forming & joining", "Machining", "Metrology", "Production planning", "Inventory & operations research"]),
      ],
    },
    {
      id: "CE", name: "Civil Engineering", short: "Civil", color: "#0ea5e9", icon: "building",
      subjects: [GA, EM,
        s("struct", "Structural Engineering", 18, ["Engineering mechanics", "Solid mechanics", "Structural analysis", "RCC design", "Steel structures", "Construction materials"]),
        s("geo", "Geotechnical Engineering", 14, ["Soil properties & classification", "Permeability & seepage", "Consolidation", "Shear strength", "Foundations"]),
        s("wre", "Water Resources Engineering", 14, ["Fluid mechanics", "Open channel flow", "Hydrology", "Irrigation"]),
        s("env", "Environmental Engineering", 10, ["Water quality & treatment", "Wastewater treatment", "Air pollution", "Solid waste management"]),
        s("trans", "Transportation Engineering", 10, ["Highway geometric design", "Pavement design", "Traffic engineering"]),
        s("gm", "Geomatics Engineering", 4, ["Levelling", "Theodolite & traversing", "Remote sensing & GIS"]),
      ],
    },
    {
      id: "IN", name: "Instrumentation Engineering", short: "Instrumentation", color: "#a855f7", icon: "gauge",
      subjects: [GA, EM,
        s("ecm", "Electrical Circuits & Machines", 8, ["Circuit theorems", "Transients", "Transformers & machines"]),
        s("ss", "Signals & Systems", 8, ["LTI systems", "Transforms", "Sampling & filters"]),
        s("cs", "Control Systems", 9, ["Feedback principles", "Stability analysis", "Controllers (P, PI, PID)"]),
        s("ae", "Analog Electronics", 9, ["Diodes & transistors", "Op-amps", "Active filters"]),
        s("de", "Digital Electronics", 8, ["Logic families", "Combinational & sequential circuits", "ADC/DAC"]),
        s("meas", "Measurements", 8, ["Bridges", "Instruments", "Error analysis"]),
        s("sii", "Sensors & Industrial Instrumentation", 10, ["Displacement & strain sensors", "Temperature sensors", "Pressure & flow measurement"]),
        s("coi", "Communication & Optical Instrumentation", 7, ["Modulation", "Optical sources & detectors", "Fibre optics"]),
      ],
    },
    {
      id: "CH", name: "Chemical Engineering", short: "Chemical", color: "#14b8a6", icon: "flask",
      subjects: [GA, EM,
        s("pct", "Process Calculations & Thermodynamics", 10, ["Material & energy balances", "Laws of thermodynamics", "Phase equilibria", "Chemical reaction equilibria"]),
        s("fmo", "Fluid Mechanics & Mechanical Operations", 10, ["Fluid statics & flow", "Pumps & compressors", "Size reduction", "Filtration & settling"]),
        s("ht", "Heat Transfer", 8, ["Conduction & convection", "Radiation", "Heat exchangers", "Evaporators"]),
        s("mt", "Mass Transfer", 11, ["Diffusion", "Distillation", "Absorption", "Extraction & drying"]),
        s("cre", "Chemical Reaction Engineering", 11, ["Rate laws", "Ideal reactors (CSTR, PFR)", "RTD & non-ideal reactors", "Catalysis"]),
        s("ipc", "Instrumentation & Process Control", 8, ["Measuring instruments", "Transfer functions", "Controller tuning"]),
        s("pde", "Plant Design & Economics", 5, ["Cost estimation", "Depreciation", "Profitability analysis"]),
        s("ct", "Chemical Technology", 4, ["Inorganic industries", "Petroleum refining", "Polymers"]),
      ],
    },
    {
      id: "DA", name: "Data Science & AI", short: "Data Science & AI", color: "#ec4899", icon: "brain",
      subjects: [GA,
        s("ps", "Probability & Statistics", 14, ["Random variables", "Distributions", "Hypothesis testing", "Bayes' theorem"]),
        s("la", "Linear Algebra", 10, ["Vector spaces", "Eigenvalues", "Matrix decompositions (SVD, LU)"]),
        s("co", "Calculus & Optimization", 7, ["Limits & derivatives", "Taylor series", "Optimisation"]),
        s("pdsa", "Programming, DS & Algorithms", 14, ["Python programming", "Data structures", "Sorting & searching", "Graph algorithms"]),
        s("dbw", "Database Management & Warehousing", 10, ["ER model & SQL", "Normalisation", "Data warehousing"]),
        s("ml", "Machine Learning", 16, ["Regression", "Classification", "Clustering", "Neural networks", "Model evaluation"]),
        s("ai", "Artificial Intelligence", 14, ["Search", "Logic", "Reasoning under uncertainty"]),
      ],
    },
  ];

  // ---- Built-in question bank ----
  // a = index of correct option. d = difficulty (1 easy, 2 medium, 3 hard).
  const q = (branch, subject, text, opts, a, ex, d = 1) => ({ branch, subject, q: text, o: opts, a, ex, d });

  const BANK = [
    // General Aptitude (all papers)
    q("*", "ga", "Choose the word closest in meaning to 'ephemeral'.", ["Lasting", "Transient", "Eternal", "Robust"], 1, "Ephemeral means lasting a very short time, so 'transient' is the synonym."),
    q("*", "ga", "If 3x + 2 = 17, what is x²?", ["9", "16", "25", "36"], 2, "3x = 15, so x = 5 and x² = 25."),
    q("*", "ga", "A 150 m long train passes a pole in 15 s. Its speed in km/h is", ["30", "36", "40", "54"], 1, "Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/h."),
    q("*", "ga", "Pipe A fills a tank in 10 h and pipe B in 15 h. Together they fill it in", ["5 h", "6 h", "7.5 h", "12.5 h"], 1, "Combined rate = 1/10 + 1/15 = 1/6 per hour, so 6 hours.", 2),
    q("*", "ga", "Find the next term: 2, 6, 12, 20, 30, ?", ["36", "40", "42", "48"], 2, "Terms are n(n+1): 1·2, 2·3, 3·4, 4·5, 5·6, so next is 6·7 = 42."),
    q("*", "ga", "He is senior ___ me by two years.", ["than", "to", "from", "over"], 1, "'Senior', 'junior', 'superior' and 'inferior' take 'to', not 'than'."),
    q("*", "ga", "The average of 5 numbers is 20. If one number is removed, the average becomes 18. The removed number is", ["22", "26", "28", "30"], 2, "Sum = 100; remaining sum = 4 × 18 = 72; removed = 28.", 2),
    q("*", "ga", "Two fair dice are rolled. The probability that the sum is 7 is", ["1/12", "1/9", "1/6", "5/36"], 2, "Favourable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 of 36 = 1/6."),
    q("*", "ga", "A shopkeeper marks goods 25% above cost and gives a 10% discount. The profit is", ["10%", "12.5%", "15%", "11.5%"], 1, "Selling price = 1.25 × 0.9 = 1.125 × cost, a 12.5% profit.", 2),
    q("*", "ga", "Statements: All roses are flowers. Some flowers fade quickly. Which conclusion definitely follows?", ["Some roses fade quickly", "All roses fade quickly", "No rose fades quickly", "None of these follows"], 3, "The flowers that fade quickly may or may not include roses, so no conclusion about roses follows.", 2),

    // Engineering Mathematics (all papers except DA)
    q("*", "em", "The eigenvalues of the matrix [[2, 0], [0, 3]] are", ["0 and 5", "2 and 3", "1 and 6", "−2 and −3"], 1, "For a diagonal matrix the eigenvalues are the diagonal entries."),
    q("*", "em", "The determinant of [[1, 2], [3, 4]] is", ["−2", "2", "10", "−10"], 0, "1·4 − 2·3 = −2."),
    q("*", "em", "The derivative of x·eˣ at x = 0 is", ["0", "1", "e", "2"], 1, "d/dx(x eˣ) = eˣ + x eˣ, which is 1 at x = 0."),
    q("*", "em", "∫₀¹ x² dx equals", ["1/2", "1/3", "1/4", "1"], 1, "x³/3 evaluated from 0 to 1 = 1/3."),
    q("*", "em", "The rank of a 3 × 3 matrix in which every entry is 1 is", ["0", "1", "2", "3"], 1, "All rows are identical, so only one row is linearly independent.", 2),
    q("*", "em", "The solution of dy/dx = y with y(0) = 1 is", ["y = x + 1", "y = eˣ", "y = e⁻ˣ", "y = ln x"], 1, "Separating variables gives y = Ceˣ, and y(0) = 1 gives C = 1."),
    q("*", "em", "The Laplace transform of the constant 1 is", ["1", "s", "1/s", "1/s²"], 2, "L{1} = ∫₀^∞ e^(−st) dt = 1/s for s > 0."),
    q("*", "em", "A fair coin is tossed 3 times. P(at least one head) is", ["1/2", "3/4", "7/8", "1/8"], 2, "1 − P(no heads) = 1 − 1/8 = 7/8."),

    // CS / IT
    q("CS", "algo", "The worst-case time complexity of binary search on a sorted array of n elements is", ["O(1)", "O(log n)", "O(n)", "O(n log n)"], 1, "Each comparison halves the search space."),
    q("CS", "pds", "The maximum number of nodes in a binary tree of height h (root at height 0) is", ["2ʰ", "2ʰ − 1", "2ʰ⁺¹ − 1", "2ʰ⁺¹"], 2, "Level i holds up to 2ⁱ nodes; summing i = 0..h gives 2ʰ⁺¹ − 1.", 2),
    q("CS", "toc", "Which language is NOT context-free?", ["{aⁿbⁿ | n ≥ 0}", "{wwᴿ}", "{aⁿbⁿcⁿ | n ≥ 0}", "Balanced parentheses"], 2, "aⁿbⁿcⁿ needs two simultaneous count comparisons; the pumping lemma for CFLs shows it is not context-free.", 2),
    q("CS", "toc", "The minimal DFA accepting binary strings that end in '01' has how many states?", ["2", "3", "4", "5"], 1, "States track the suffix seen: none, '0', '01' — three states.", 2),
    q("CS", "os", "Belady's anomaly can occur with which page replacement algorithm?", ["LRU", "Optimal", "FIFO", "LFU"], 2, "With FIFO, adding frames can increase page faults. Stack algorithms like LRU and Optimal do not show the anomaly."),
    q("CS", "os", "Which of these is NOT a necessary condition for deadlock?", ["Mutual exclusion", "Hold and wait", "Circular wait", "Preemption"], 3, "The condition is 'no preemption'. Allowing preemption prevents deadlock."),
    q("CS", "db", "Which normal form removes transitive functional dependencies on the key?", ["1NF", "2NF", "3NF", "4NF"], 2, "3NF requires no non-prime attribute to depend transitively on a candidate key."),
    q("CS", "cn", "How many usable host addresses does a /26 subnet have?", ["30", "62", "64", "126"], 1, "6 host bits give 2⁶ = 64 addresses, minus network and broadcast = 62."),
    q("CS", "algo", "The number of edges in a complete undirected graph Kₙ is", ["n", "n − 1", "n(n − 1)/2", "n²"], 2, "Every pair of vertices is joined: C(n, 2) = n(n − 1)/2."),
    q("CS", "dl", "The 8-bit two's complement representation of −5 is", ["10000101", "11111010", "11111011", "11111101"], 2, "+5 = 00000101; invert to 11111010, add 1 → 11111011.", 2),
    q("CS", "coa", "A 4-stage pipeline with no hazards executes 100 instructions in how many cycles?", ["100", "103", "104", "400"], 1, "k + n − 1 = 4 + 100 − 1 = 103 cycles.", 2),

    // EE
    q("EE", "ckt", "Two 4 Ω resistors in parallel, in series with a 2 Ω resistor, give an equivalent resistance of", ["2 Ω", "4 Ω", "6 Ω", "10 Ω"], 1, "4 ∥ 4 = 2 Ω; 2 + 2 = 4 Ω."),
    q("EE", "mach", "The synchronous speed of a 4-pole, 50 Hz induction motor is", ["750 rpm", "1000 rpm", "1500 rpm", "3000 rpm"], 2, "Ns = 120f/P = 120 × 50 / 4 = 1500 rpm."),
    q("EE", "mach", "A transformer operates at maximum efficiency when", ["Copper loss = iron loss", "Copper loss is zero", "Iron loss is zero", "Load is at no-load"], 0, "Efficiency peaks when variable (copper) loss equals constant (core) loss."),
    q("EE", "ckt", "The power factor of a purely inductive circuit is", ["1", "0.707 lagging", "0 lagging", "0 leading"], 2, "Current lags voltage by 90°, so cos 90° = 0 (lagging)."),
    q("EE", "cs", "The time constant of a first-order system is the time to reach what percentage of the final value for a step input?", ["50%", "63.2%", "86.5%", "98%"], 1, "1 − e⁻¹ ≈ 0.632."),
    q("EE", "cs", "The system type of G(s)H(s) = K / [s(s + 2)] is", ["0", "1", "2", "3"], 1, "Type equals the number of open-loop poles at the origin: one."),
    q("EE", "pe", "Average output of a single-phase fully controlled bridge rectifier (R load, firing angle α) is", ["(Vm/π)(1 + cos α)", "(2Vm/π) cos α", "(Vm/2π)(1 + cos α)", "(Vm/π) cos α"], 0, "With a resistive load the current is discontinuous, so Vavg = (Vm/π)(1 + cos α).", 3),

    // EC
    q("EC", "comm", "The Nyquist sampling rate for a signal band-limited to 4 kHz is", ["2 kHz", "4 kHz", "8 kHz", "16 kHz"], 2, "Nyquist rate = 2 × highest frequency = 8 kHz."),
    q("EC", "edev", "In an n-type semiconductor, the majority carriers are", ["Holes", "Electrons", "Ions", "Protons"], 1, "Donor impurities contribute free electrons."),
    q("EC", "ac", "An ideal inverting amplifier with Rf = 100 kΩ and R1 = 10 kΩ has a voltage gain of", ["10", "−10", "11", "−11"], 1, "Gain = −Rf/R1 = −10."),
    q("EC", "dc", "How many select lines does a 16:1 multiplexer need?", ["2", "3", "4", "16"], 2, "2⁴ = 16, so 4 select lines."),
    q("EC", "comm", "The bandwidth of a DSB-FC AM signal with message bandwidth W is", ["W", "2W", "W/2", "4W"], 1, "AM carries both upper and lower sidebands: 2W."),
    q("EC", "nss", "The Fourier transform of the unit impulse δ(t) is", ["0", "1", "δ(f)", "1/(j2πf)"], 1, "The impulse contains all frequencies equally; its transform is 1."),
    q("EC", "emt", "The intrinsic impedance of free space is approximately", ["50 Ω", "75 Ω", "120 Ω", "377 Ω"], 3, "η₀ = √(μ₀/ε₀) = 120π ≈ 377 Ω."),

    // ME
    q("ME", "td", "The efficiency of a Carnot engine working between 600 K and 300 K is", ["25%", "50%", "66.7%", "75%"], 1, "η = 1 − T_L/T_H = 1 − 300/600 = 0.5."),
    q("ME", "som", "Euler's critical load for a column with both ends pinned is", ["π²EI/L²", "π²EI/4L²", "2π²EI/L²", "4π²EI/L²"], 0, "Effective length equals actual length for pinned–pinned columns."),
    q("ME", "fm", "Flow in a circular pipe is generally laminar when the Reynolds number is below about", ["200", "2000", "4000", "10,000"], 1, "Below roughly 2000–2300 pipe flow stays laminar."),
    q("ME", "tom", "By Gruebler's criterion, a four-bar linkage has how many degrees of freedom?", ["0", "1", "2", "3"], 1, "F = 3(n − 1) − 2j = 3(3) − 2(4) = 1."),
    q("ME", "som", "Maximum bending moment for a simply supported beam of span L with central point load W is", ["WL/2", "WL/4", "WL/8", "WL²/8"], 1, "Each reaction is W/2; the moment at mid-span is (W/2)(L/2) = WL/4."),
    q("ME", "ht", "Fourier's law describes heat transfer by", ["Conduction", "Convection", "Radiation", "Boiling"], 0, "q = −k A dT/dx is the conduction rate equation."),
    q("ME", "mfg", "The economic order quantity (D = annual demand, S = ordering cost, H = holding cost per unit per year) is", ["√(DS/H)", "√(2DS/H)", "2DS/H", "√(2DH/S)"], 1, "Minimising ordering + holding cost gives EOQ = √(2DS/H).", 2),

    // CE
    q("CE", "struct", "Maximum bending moment in a simply supported beam of span L under UDL w is", ["wL²/2", "wL²/4", "wL²/8", "wL²/12"], 2, "Mid-span moment = wL²/8."),
    q("CE", "struct", "Normal consistency of cement is determined using the", ["Le Chatelier apparatus", "Vicat apparatus", "Slump cone", "Compaction factor apparatus"], 1, "The Vicat plunger penetration test gives standard consistency."),
    q("CE", "geo", "Darcy's law is valid for", ["Laminar flow", "Turbulent flow", "Transitional flow", "All flows"], 0, "v = ki assumes laminar seepage through soil."),
    q("CE", "env", "BOD stands for", ["Basic Oxygen Demand", "Biochemical Oxygen Demand", "Biological Organic Discharge", "Bulk Oxygen Density"], 1, "Biochemical oxygen demand measures oxygen used by microbes to break down organic matter."),
    q("CE", "struct", "As per IS 456:2000, the minimum grade of concrete for reinforced concrete is", ["M15", "M20", "M25", "M30"], 1, "M20 is the minimum grade for RCC (mild exposure)."),
    q("CE", "geo", "For a well-graded gravel, the coefficient of curvature Cc should lie between", ["0 and 1", "1 and 3", "3 and 6", "4 and 8"], 1, "Well graded requires 1 ≤ Cc ≤ 3 (and Cu > 4 for gravel).", 2),
    q("CE", "wre", "The free surface of a liquid in a forced vortex takes the shape of a", ["Hyperboloid", "Paraboloid", "Cone", "Sphere"], 1, "z = ω²r²/2g, a paraboloid of revolution."),

    // IN
    q("IN", "sii", "A thermocouple works on the", ["Peltier effect", "Seebeck effect", "Hall effect", "Piezoelectric effect"], 1, "Two dissimilar junctions at different temperatures produce an EMF."),
    q("IN", "sii", "The gauge factor of a strain gauge is defined as", ["ΔR/R", "(ΔR/R)/strain", "strain/(ΔR/R)", "ΔL/L"], 1, "GF = fractional change in resistance per unit strain."),
    q("IN", "meas", "A Wheatstone bridge with arms P, Q, R, S is balanced when", ["P/Q = R/S", "P + Q = R + S", "PQ = RS", "P/R = S/Q"], 0, "At balance no current flows through the galvanometer: P/Q = R/S."),
    q("IN", "sii", "An LVDT is primarily used to measure", ["Temperature", "Displacement", "Pressure", "Flow"], 1, "The linear variable differential transformer gives an output proportional to core displacement."),
    q("IN", "cs", "A second-order system is critically damped when the damping ratio ζ equals", ["0", "0.5", "0.707", "1"], 3, "ζ = 1 gives the fastest response without overshoot."),

    // CH
    q("CH", "cre", "The unit of the rate constant for a first-order reaction is", ["mol/L·s", "s⁻¹", "L/mol·s", "Dimensionless"], 1, "Rate = kC, so k has units of 1/time."),
    q("CH", "pct", "Raoult's law strictly applies to", ["Ideal solutions", "Real gases", "Electrolyte solutions", "Azeotropes"], 0, "pᵢ = xᵢ Pᵢˢᵃᵗ holds for ideal liquid mixtures."),
    q("CH", "ht", "The Prandtl number is the ratio of", ["Inertia to viscous forces", "Momentum diffusivity to thermal diffusivity", "Convection to conduction", "Buoyancy to viscous forces"], 1, "Pr = ν/α."),
    q("CH", "cre", "For a positive-order reaction at the same conversion, the volume of a PFR compared with a CSTR is", ["Larger", "Smaller", "Equal", "Unpredictable"], 1, "A PFR operates at higher average concentration, so it needs less volume for positive orders.", 2),
    q("CH", "ht", "The log-mean temperature difference (LMTD) is used in the design of", ["Distillation columns", "Heat exchangers", "Reactors", "Cyclones"], 1, "Q = U A ΔT_lm for heat exchangers."),

    // DA
    q("DA", "ml", "Which of these is an unsupervised learning algorithm?", ["Linear regression", "K-means clustering", "Logistic regression", "Decision tree classifier"], 1, "K-means groups unlabelled data."),
    q("DA", "ps", "The variance of a Bernoulli(p) random variable is", ["p", "p²", "p(1 − p)", "1 − p"], 2, "E[X²] − E[X]² = p − p²."),
    q("DA", "ml", "Which technique most directly reduces overfitting?", ["Adding more features", "Regularisation", "Increasing model depth", "Reducing training data"], 1, "L1/L2 penalties constrain model complexity."),
    q("DA", "ml", "ReLU(x) is defined as", ["1/(1 + e⁻ˣ)", "max(0, x)", "tanh(x)", "x²"], 1, "Rectified linear unit outputs x for positive inputs and 0 otherwise."),
    q("DA", "dbw", "Which SQL clause filters the results of a GROUP BY?", ["WHERE", "HAVING", "ORDER BY", "LIMIT"], 1, "HAVING applies conditions to aggregated groups."),
    q("DA", "ps", "A and B are independent with P(A) = 0.5 and P(B) = 0.4. P(A ∩ B) is", ["0.9", "0.2", "0.1", "0.45"], 1, "For independent events P(A ∩ B) = P(A)·P(B) = 0.2."),
    q("DA", "la", "If A is a 3 × 3 matrix with eigenvalues 1, 2, 3, then det(A) is", ["6", "5", "3", "0"], 0, "The determinant is the product of the eigenvalues."),
  ].map((item, i) => ({ id: "b" + i, ...item }));

  const TIPS = [
    "Revise formulas daily for 15 minutes. Spaced repetition beats long cramming sessions.",
    "General Aptitude is 15 marks and the most scoring section. Don't skip it.",
    "Attempt previous year papers under a timer to build exam stamina.",
    "NAT questions have no negative marking. Always attempt them.",
    "Keep a 'mistakes notebook' and review it every weekend.",
    "Engineering Mathematics carries about 13 marks and its concepts repeat every year.",
    "Learn to use the GATE virtual calculator early. It's the only one allowed.",
    "Spend the last month mostly on revision and full-length mock tests.",
  ];

  window.GB_DATA = { BRANCHES, BANK, TIPS };
})();
