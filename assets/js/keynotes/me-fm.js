// Offline key notes: ME · Fluid Mechanics (also reused by CE and CH). Keys are chapter ids from data.js.
export const CONTENT = {
  statics: {
    overview: 'Fluid statics: pressure variation and manometers, hydrostatic forces on submerged surfaces, and buoyancy and stability of floating bodies.',
    sections: [
      ['Pressure and manometers', [
        'dp/dz = −ρg: p = p₀ + ρgh at depth h. Absolute = gauge + atmospheric.',
        'Manometer: start at one end, add ρgh going down, subtract going up, equate at the other end.',
        'Differential U-tube with manometric fluid ρ_m between two points in a fluid ρ: p₁ − p₂ = (ρ_m − ρ)g h (same level points).',
      ]],
      ['Forces on submerged surfaces', [
        'Plane surface: F = ρg h̄ A (h̄ = depth of centroid).',
        'Centre of pressure: h_cp = h̄ + I_G sin²θ/(A h̄), always below the centroid.',
        'Curved surface: horizontal component = force on the vertical projection; vertical component = weight of fluid above (real or imaginary).',
      ]],
      ['Buoyancy and stability', [
        'Buoyant force = weight of displaced fluid (Archimedes), acting at the centre of buoyancy B.',
        'Floating body is stable if the metacentre M is above G. Metacentric height GM = I/V − BG (I of waterline area about the tilt axis).',
        'Submerged body is stable only if B is above G.',
        'Period of rolling T = 2π√(k²/(g·GM)).',
      ]],
    ],
    exam: ['Force and centre of pressure on a gate (NAT).', 'Metacentric height of a floating block.'],
    traps: ['Using the depth of the centre of pressure to compute the force; force uses the centroid depth.'],
  },

  bernoulli: {
    overview: 'Continuity, Bernoulli and momentum equations, with flow-measuring devices such as the venturi meter and orifices.',
    sections: [
      ['Continuity equation', ['Steady flow: ρ₁A₁V₁ = ρ₂A₂V₂; incompressible: A₁V₁ = A₂V₂ (Q = AV).', 'Differential form for incompressible flow: ∇ · V = 0.']],
      ["Bernoulli's equation", [
        'Along a streamline for steady, inviscid, incompressible flow: p/ρg + V²/2g + z = constant.',
        'Irrotational flow: the constant is the same everywhere. With losses: add h_L to the downstream side; with a pump add h_p upstream.',
        'Pitot tube: V = √(2Δp/ρ) from stagnation minus static pressure.',
        'Torricelli: jet velocity from a tank V = √(2gh).',
      ]],
      ['Venturi meter and orifice', [
        'Venturi: Q = C_d A₁A₂√(2gh)/√(A₁² − A₂²); C_d ≈ 0.96–0.98.',
        'Orifice meter: C_d ≈ 0.6–0.65 (vena contracta); larger permanent pressure loss.',
        'Coefficients: C_d = C_c × C_v.',
      ]],
      ['Momentum equation', [
        'ΣF = ṁ(V_out − V_in) (vector form) on a control volume.',
        'Jet on a fixed flat plate normal to it: F = ρAV². On a moving plate: ρA(V − u)²; on a series of vanes: ρAV(V − u).',
        'Pipe bend: include pressure forces pA at inlet and outlet.',
      ]],
    ],
    exam: ['Discharge through a venturi meter (NAT).', 'Force exerted by a jet on a plate or vane.'],
    traps: ['Using Bernoulli across a pump or through a region with large losses without adding head terms.'],
  },

  viscous: {
    overview: 'Viscous flow: laminar flow in pipes and between plates, the Darcy–Weisbach equation and losses, and dimensional analysis.',
    sections: [
      ['Laminar flow in pipes (Hagen–Poiseuille)', [
        'Re = ρVD/μ; laminar below about 2000 in pipes.',
        'Velocity profile parabolic: u_max = 2V_avg. Δp = 32μVL/D²; Q = πD⁴Δp/(128μL).',
        'Friction factor f = 64/Re (Darcy). Shear stress varies linearly from zero at the centre to τ_w at the wall.',
        'Kinetic energy correction factor α = 2, momentum correction β = 4/3 for laminar pipe flow.',
      ]],
      ['Flow between parallel plates', [
        'Fixed plates: u_max = 1.5V_avg; Δp = 12μVL/h².',
        'Couette flow (one plate moving, no pressure gradient): linear profile.',
      ]],
      ['Darcy–Weisbach and losses', [
        'h_f = fLV²/(2gD). Turbulent f from the Moody chart or Colebrook; Blasius f = 0.316/Re^0.25 for smooth pipes.',
        'Minor losses h = KV²/2g: sudden expansion (V₁ − V₂)²/2g; exit loss V²/2g; entrance ≈ 0.5V²/2g.',
        'Pipes in series: same Q, losses add. In parallel: same head loss, flows add.',
        'Equivalent pipe: L/D⁵ adds for pipes in series (same f).',
        'Power transmission is maximum when h_f = H/3.',
      ]],
      ['Dimensional analysis', [
        'Buckingham π: n variables, m fundamental dimensions → n − m dimensionless groups.',
        'Reynolds (inertia/viscous), Froude (inertia/gravity, open channels and ships), Mach (compressibility), Weber (surface tension), Euler (pressure).',
        'Model laws: match Re for pipe flow, Fr for free-surface flow. Froude scaling: velocity ∝ √L, discharge ∝ L^2.5.',
      ]],
    ],
    exam: ['Head loss or pressure drop in laminar flow (NAT).', 'Number of π-groups or model velocity from similarity.'],
    traps: ['Using the Fanning friction factor (f/4) in the Darcy formula.'],
  },

  boundary: {
    overview: 'Boundary layers: thickness definitions, laminar and turbulent growth, separation, and drag and lift on bodies.',
    sections: [
      ['Boundary layer thickness', [
        'δ: where u = 0.99U. Displacement thickness δ∗ = ∫(1 − u/U) dy. Momentum thickness θ = ∫(u/U)(1 − u/U) dy. Shape factor H = δ∗/θ (2.59 Blasius laminar, ≈1.3 turbulent).',
        'Laminar (Blasius): δ/x = 5/√Re_x; C_f,local = 0.664/√Re_x; average C_D = 1.328/√Re_L.',
        'Turbulent: δ/x ≈ 0.37/Re_x^(1/5).',
        'Transition on a flat plate around Re_x ≈ 5 × 10⁵.',
      ]],
      ['Separation', ['Occurs in an adverse pressure gradient (dp/dx > 0) when the wall shear falls to zero; leads to wakes and pressure drag.']],
      ['Drag and lift', [
        'Drag F_D = C_D ½ρV²A; lift F_L = C_L ½ρV²A.',
        'Stokes’ law for a sphere at Re < 1: F_D = 3πμDV, C_D = 24/Re. Terminal velocity V = (ρ_s − ρ)gD²/(18μ).',
        'Streamlining reduces pressure drag; a rough golf ball delays separation (smaller wake).',
      ]],
    ],
    exam: ['Boundary-layer thickness at a location or drag on a plate (NAT).', 'Terminal velocity of a small sphere.'],
    traps: ['Using laminar formulas beyond the transition Reynolds number.'],
  },

  turbo: {
    overview: 'Turbomachinery: velocity triangles and Euler’s equation, impulse and reaction turbines, centrifugal pumps, and specific speed for selection.',
    sections: [
      ['Velocity triangles and Euler equation', [
        'Work per unit mass = V_w1u₁ − V_w2u₂ (turbine). Head H = (V_w1u₁ − V_w2u₂)/g.',
        'Degree of reaction = static pressure change in the rotor / total energy change.',
      ]],
      ['Turbines', [
        '**Pelton (impulse):** high head, low flow; max efficiency when bucket speed u = V/2; jet ratio D/d.',
        '**Francis (reaction, mixed flow):** medium head; draft tube recovers kinetic energy.',
        '**Kaplan (axial, adjustable blades):** low head, large flow; high part-load efficiency.',
        'Pelton: ideal hydraulic efficiency approaches 100% at u = V/2 with a 180° deflection; real buckets deflect about 165° and have friction (k < 1).',
      ]],
      ['Centrifugal pumps', [
        'Manometric efficiency = gH_m/(V_w2u₂). Backward-curved vanes are usual (stable characteristics).',
        'Affinity laws: Q ∝ ND³, H ∝ N²D², P ∝ N³D⁵.',
        'Cavitation: NPSH available must exceed NPSH required. Priming needed before starting.',
        'Pumps in series add head; in parallel add flow.',
      ]],
      ['Specific speed', [
        'Turbine: N_s = N√P/H^(5/4). Pump: N_s = N√Q/H^(3/4).',
        'Rising N_s: Pelton (low) → Francis → Kaplan (high). Pumps: radial (low) → mixed → axial (high).',
      ]],
    ],
    exam: ['Power or efficiency from a velocity triangle (NAT).', 'Turbine type from specific speed.', 'Scaled pump head or flow via affinity laws.'],
    traps: ['Mixing the turbine (√P, H^(5/4)) and pump (√Q, H^(3/4)) forms of specific speed.'],
  },
};
