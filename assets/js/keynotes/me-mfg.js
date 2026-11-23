// Offline key notes: ME · Manufacturing & Industrial Engineering. Keys are chapter ids from data.js.
export const CONTENT = {
  casting: {
    overview: 'Casting, forming and joining: gating design and solidification time, bulk deformation (rolling, forging, extrusion), sheet-metal operations and welding heat input.',
    sections: [
      ['Sand casting and gating design', [
        'Pattern allowances: shrinkage, draft, machining, distortion, shake.',
        'Gating: sprue, runner, ingates. Fill time = volume/(A_g√(2gh)) for a top gate. Bottom gate: t = (A_m/A_g)(2/√(2g))(√h_t − √(h_t − h_m)).',
        'Tapered sprue avoids aspiration (A₁/A₂ = √(h₂/h₁)).',
      ]],
      ["Solidification time (Chvorinov's rule)", [
        't = B(V/A)²: casting modulus V/A decides solidification time.',
        'Riser must solidify after the casting: (V/A)_riser > (V/A)_casting (often by 20%).',
        'Cylinder riser with H = D has the best V/A ratio for its volume. Sphere has the highest V/A of all shapes.',
      ]],
      ['Rolling, forging and extrusion', [
        'Rolling: maximum draft Δh_max = μ²R. Neutral point where roll and strip speeds match. Roll force ≈ σ̄ w √(RΔh).',
        'Forging: open die force with friction rises with D/h; closed die needs flash.',
        'Extrusion pressure p = σ̄ ln(A₀/A_f) (ideal); direct extrusion has more friction than indirect.',
        'Hot working above recrystallisation temperature; cold working causes strain hardening and better finish.',
        'Wire drawing: maximum reduction per pass ≈ 63% (ideal, ln(A₀/A_f) = 1).',
      ]],
      ['Sheet metal operations', [
        'Blanking/punching force = perimeter × thickness × shear strength. Shear on the punch reduces force.',
        'Clearance on the die for blanking (punch size = blank − 2c); on the punch for piercing (die size = hole + 2c).',
        'Deep drawing limit ratio ≈ 2 (D/d).',
      ]],
      ['Welding processes and heat input', [
        'Arc heat input per unit length = ηVI/v (efficiency η, travel speed v).',
        'Arc length characteristic and power source: drooping (constant current) for SMAW; constant voltage for GMAW.',
        'Resistance welding heat H = I²Rt. Gas welding: oxyacetylene neutral flame 1:1.',
        'Processes: SMAW, GMAW (MIG), GTAW (TIG, non-consumable tungsten), SAW (high deposition), electron beam and laser (deep, narrow).',
      ]],
    ],
    exam: ['Solidification time ratio using Chvorinov’s rule (NAT).', 'Blanking force or roll force.', 'Heat input in arc welding.'],
    traps: ['Putting the clearance on the wrong tool (die for blanking, punch for piercing).'],
  },

  machining: {
    overview: 'Machining: chip formation and Merchant’s circle, tool life (Taylor), machining time and MRR, and non-traditional processes.',
    sections: [
      ["Mechanics of cutting (Merchant's circle)", [
        'Chip thickness ratio r = t₁/t₂ = l₂/l₁ (< 1). Shear angle tan φ = r cos α/(1 − r sin α).',
        'Merchant’s theory: 2φ + β − α = 90° (β = friction angle, α = rake angle).',
        'Shear force F_s = F_c cos φ − F_t sin φ; friction coefficient μ = (F_t + F_c tan α)/(F_c − F_t tan α).',
        'Orthogonal vs oblique cutting; continuous chips (ductile, high speed), discontinuous (brittle), built-up edge (low speed).',
      ]],
      ["Tool life (Taylor's equation)", [
        'VTⁿ = C. n ≈ 0.1–0.15 (HSS), 0.2–0.25 (carbide), 0.4–0.6 (ceramic).',
        'Extended: VTⁿfᵃdᵇ = K. Speed has the largest effect on tool life, then feed, then depth.',
        'Optimum tool life for minimum cost T = (1/n − 1)(C_t/C_m + t_c); for maximum production T = (1/n − 1)t_c.',
        'Flank wear decides tool life; crater wear affects tool strength.',
      ]],
      ['Machining time and MRR', [
        'Turning: time = L/(fN); MRR = f d V (V = πDN).',
        'Drilling MRR = (πD²/4) f N. Milling MRR = w d f_t z N.',
        'Surface roughness (turning, sharp tool) R_max ≈ f²/(8r) for nose radius r.',
      ]],
      ['Non-traditional machining', [
        'EDM: spark erosion, any conducting material, tool wear. ECM: anodic dissolution, no tool wear, MRR = (A I)/(ρ Z F).',
        'USM: brittle materials (glass, ceramics). AJM: brittle and heat-sensitive. LBM and EBM: fine holes; EBM needs vacuum.',
      ]],
    ],
    exam: ['Shear angle from chip ratio and rake angle (NAT).', 'Tool life change with speed using Taylor’s equation.', 'MRR in ECM or machining time in turning.'],
    traps: ['Using diameter in mm with speed in m/min without converting units.'],
  },

  metrology: {
    overview: 'Metrology: limits, fits and tolerances, gauge design (Taylor’s principle), surface roughness parameters, and comparators and CMMs.',
    sections: [
      ['Limits, fits and tolerances', [
        'Hole basis system: lower deviation of hole = 0 (H). Tolerance = upper − lower limit.',
        'Clearance fit: min hole > max shaft. Interference: max hole < min shaft. Transition: overlap.',
        'Maximum clearance = max hole − min shaft; maximum interference = max shaft − min hole.',
        'IT grade tolerance i = 0.45∛D + 0.001D (µm, D in mm).',
      ]],
      ['Gauge design', [
        "Taylor's principle: GO gauge checks the maximum material condition (full form); NOT GO checks the least material condition (one dimension at a time).",
        'Gauge maker’s tolerance ≈ 10% of work tolerance; wear allowance on GO gauges.',
      ]],
      ['Surface roughness', ['R_a = arithmetic mean deviation; R_q = RMS; R_z = mean peak-to-valley. For a triangular profile R_a = R_max/4.']],
      ['Comparators and CMM', [
        'Comparators (mechanical, optical, pneumatic, electrical) magnify deviation from a master.',
        'Sine bar: sin θ = h/L. Slip gauges build lengths with the fewest blocks.',
        'CMM probes points in 3-D; autocollimator measures small angles and straightness.',
      ]],
    ],
    exam: ['Maximum clearance or interference for a fit (NAT).', 'GO/NOT GO gauge dimensions.', 'Angle from a sine bar setup.'],
    traps: ['Assigning the GO gauge to the least material condition.'],
  },

  ppc: {
    overview: 'Production planning and control: forecasting methods and errors, scheduling rules including Johnson’s algorithm, line balancing and MRP.',
    sections: [
      ['Forecasting', [
        'Moving average (simple or weighted). Exponential smoothing: Fₜ₊₁ = Fₜ + α(Dₜ − Fₜ). Larger α reacts faster.',
        'Errors: MAD = Σ|e|/n; MSE; bias = Σe/n. Tracking signal = Σe/MAD.',
        'Regression for trend: y = a + bx by least squares.',
      ]],
      ["Scheduling and Johnson's rule", [
        'Single machine: SPT minimises mean flow time; EDD minimises maximum lateness.',
        'Johnson’s rule (n jobs, 2 machines): pick the smallest time; if on machine 1 schedule first, if on machine 2 schedule last; repeat.',
        'Makespan from a Gantt chart: machine 2 waits for machine 1 to finish each job.',
      ]],
      ['Line balancing', [
        'Cycle time C = available time / required output. Minimum stations = ⌈Σtᵢ/C⌉.',
        'Line efficiency = Σtᵢ/(n × C). Balance delay = 1 − efficiency.',
        'Heuristics: largest candidate rule, ranked positional weight.',
      ]],
      ['MRP', ['Gross requirements from the master schedule and bill of materials; net requirements = gross − on-hand − scheduled receipts; offset by lead times.', 'Lot sizing: lot-for-lot, EOQ, period order quantity.']],
    ],
    exam: ['Exponential smoothing forecast (NAT).', 'Makespan by Johnson’s rule.', 'Number of stations or line efficiency.'],
    traps: ['Forgetting to offset orders by lead time in MRP.'],
  },

  or: {
    overview: 'Inventory control and operations research: EOQ models, linear programming and simplex, transportation and assignment, PERT/CPM, and queuing.',
    sections: [
      ['EOQ models', [
        'EOQ Q∗ = √(2DS/H). At EOQ, annual ordering cost = annual holding cost; total cost = √(2DSH).',
        'Production (EPQ): Q = √(2DS/(H(1 − d/p))).',
        'With shortages allowed: Q = √(2DS/H) × √((H + B)/B).',
        'Reorder point = demand during lead time (+ safety stock).',
      ]],
      ['Linear programming and simplex', [
        'Optimum lies at a vertex of the feasible region. Slack (≤), surplus (≥) and artificial variables.',
        'Simplex: entering variable by most negative reduced cost (max problems); leaving by minimum ratio test.',
        'Degeneracy: a basic variable is zero. Unbounded: no positive ratio. Multiple optima: a zero reduced cost for a non-basic variable at optimum.',
        'Dual of a max problem with ≤ constraints is a min problem with ≥; optimal objective values are equal.',
      ]],
      ['Transportation and assignment', [
        'Transportation: m + n − 1 basic cells; initial solution by north-west corner, least cost or Vogel’s method; optimise by MODI (uᵢ + vⱼ = cᵢⱼ).',
        'Assignment: Hungarian method (row and column reduction, cover zeros with minimum lines).',
      ]],
      ['PERT and CPM', [
        'Critical path: longest path; zero total float. Total float = LS − ES.',
        'PERT expected time tₑ = (a + 4m + b)/6; variance ((b − a)/6)². Project variance = sum along the critical path.',
        'Crashing: shorten the critical activity with the lowest cost slope first.',
      ]],
      ['Queuing theory', [
        'M/M/1 with ρ = λ/μ < 1: L = ρ/(1 − ρ); L_q = ρ²/(1 − ρ); W = 1/(μ − λ); W_q = λ/(μ(μ − λ)).',
        "Little's law: L = λW. Probability of n customers: (1 − ρ)ρⁿ.",
      ]],
    ],
    exam: ['EOQ or total cost (NAT).', 'Critical path duration and probability of completion.', 'Average queue length or waiting time.'],
    traps: ['Using monthly demand with annual holding cost in EOQ.'],
  },
};
