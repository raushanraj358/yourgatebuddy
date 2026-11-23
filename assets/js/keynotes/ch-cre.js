// Offline key notes: CH · Chemical Reaction Engineering. Keys are chapter ids from data.js.
export const CONTENT = {
  rates: {
    overview: 'Rate laws: reaction order and rate constants, the Arrhenius equation, and analysing batch rate data by integral and differential methods.',
    sections: [
      ['Reaction order and rate constant', [
        '−r_A = kC_Aⁿ. Units of k: (concentration)^(1−n) time⁻¹.',
        'Zero order: C_A = C_A0 − kt; half-life C_A0/(2k). First order: ln(C_A0/C_A) = kt; half-life ln 2/k (independent of C_A0).',
        'Second order (A + A): 1/C_A − 1/C_A0 = kt; half-life 1/(kC_A0).',
        'Half-life t½ ∝ C_A0^(1−n), so the order follows from how t½ changes with initial concentration.',
        'Elementary reactions: order matches stoichiometry. Rate-limiting step and pseudo-steady-state hypothesis for mechanisms.',
      ]],
      ['Arrhenius equation', [
        'k = A e^(−E/RT). ln(k₂/k₁) = (E/R)(1/T₁ − 1/T₂).',
        'Rule of thumb: rate roughly doubles for a 10 °C rise near room temperature (E ≈ 50 kJ/mol).',
        'Collision theory k ∝ T^(1/2)e^(−E/RT); transition-state theory k ∝ T e^(−E/RT).',
      ]],
      ['Analysis of rate data', [
        'Integral method: guess an order, plot its linear form against time.',
        'Differential method: ln(−dC_A/dt) vs ln C_A gives slope n.',
        'Method of initial rates and isolation (excess) method for multiple reactants.',
        'Variable-volume gas reactions: V = V₀(1 + ε_AX_A), ε_A = fractional volume change at full conversion.',
      ]],
    ],
    exam: ['Activation energy from rate constants at two temperatures (NAT).', 'Order from half-life data.', 'Conversion after a given time in a batch reactor.'],
    traps: ['Using °C in the Arrhenius equation.'],
  },

  reactors: {
    overview: 'Ideal reactors: batch, CSTR and PFR design equations, reactors in series and their comparison, and selectivity in multiple reactions.',
    sections: [
      ['Batch reactor design', ['t = N_A0 ∫ dX/(−r_A V); constant volume: t = C_A0 ∫ dX/(−r_A).']],
      ['CSTR and PFR design equations', [
        'CSTR: τ = V/v₀ = C_A0X/(−r_A) evaluated at exit conditions.',
        'PFR: τ = C_A0 ∫₀ˣ dX/(−r_A) (same as a constant-volume batch reactor).',
        'First order: CSTR X = kτ/(1 + kτ); PFR X = 1 − e^(−kτ).',
        'Second order (constant density): CSTR kτC_A0 = X/(1 − X)²; PFR kτC_A0 = X/(1 − X).',
        'Levenspiel plot (1/−r_A vs X): PFR volume = area under the curve; CSTR = rectangle.',
      ]],
      ['Reactors in series', [
        'For positive-order reactions, PFR needs less volume than CSTR for the same conversion; the gap grows with order and conversion.',
        'n equal CSTRs in series approach a PFR as n → ∞. First order: C_A,n/C_A0 = 1/(1 + kτᵢ)ⁿ.',
        'For autocatalytic reactions use a CSTR up to the rate maximum and then a PFR.',
        'Recycle reactor: recycle ratio R from 0 (PFR) to ∞ (CSTR).',
      ]],
      ['Multiple reactions and selectivity', [
        'Parallel A → R (order a₁), A → S (order a₂): high C_A favours the higher-order path (use PFR/batch); low C_A favours the lower-order path (use CSTR).',
        'Series A → R → S: maximum intermediate in PFR at τ_opt = ln(k₂/k₁)/(k₂ − k₁); CSTR τ_opt = 1/√(k₁k₂).',
        'Temperature favours the path with higher activation energy.',
      ]],
      ['Non-isothermal operation', ['Adiabatic temperature rise ΔT = (−ΔH_r)C_A0X/(ρc_p). CSTR steady states from heat generation vs removal curves (multiple steady states possible).']],
    ],
    exam: ['Volume of a CSTR or PFR for a given conversion (NAT).', 'Conversion in CSTRs in series.', 'Optimum time for maximum intermediate.'],
    traps: ['Using the PFR equation for a CSTR (CSTR rate is evaluated at exit concentration).'],
  },

  rtd: {
    overview: 'Residence time distribution and non-ideal reactors: E and F curves, mean and variance, and the tanks-in-series, dispersion and segregation models.',
    sections: [
      ['Residence time distribution', [
        'Pulse tracer gives E(t) = C(t)/∫C dt; step tracer gives F(t). E = dF/dt; ∫E dt = 1.',
        'Mean residence time t̄ = ∫tE dt (= V/v for a closed vessel). Variance σ² = ∫(t − t̄)²E dt.',
        'Ideal PFR: E is a spike at τ. Ideal CSTR: E = (1/τ)e^(−t/τ); F = 1 − e^(−t/τ).',
        'Dead zones make t̄ < V/v; bypassing shows an early peak.',
      ]],
      ['Segregation and dispersion models', [
        'Tanks-in-series: N = t̄²/σ² (equal tanks).',
        'Axial dispersion: Péclet number Pe = uL/D. Small dispersion: σ²/t̄² ≈ 2D/(uL). Pe → ∞ is plug flow; Pe → 0 is mixed flow.',
        'Segregation model: X̄ = ∫X_batch(t)E(t) dt. Exact for first-order reactions, where mixing earliness does not matter.',
        'For non-first-order reactions, early vs late mixing changes conversion (maximum mixedness vs segregation bounds).',
      ]],
    ],
    exam: ['Mean residence time or variance from tracer data (NAT).', 'Number of equivalent tanks.', 'Conversion by the segregation model.'],
    traps: ['Normalising E(t) incorrectly (area under E must be 1).'],
  },

  catalysis: {
    overview: 'Heterogeneous catalysis: adsorption-based rate laws (Langmuir–Hinshelwood), internal diffusion with the Thiele modulus and effectiveness factor, and external mass transfer.',
    sections: [
      ['Heterogeneous catalysis kinetics', [
        'Steps: external diffusion, internal (pore) diffusion, adsorption, surface reaction, desorption.',
        'Langmuir adsorption θ = KP/(1 + KP). Langmuir–Hinshelwood rate for A → products with surface reaction controlling: r = kK_AP_A/(1 + K_AP_A + …).',
        'Eley–Rideal: an adsorbed species reacts with a gas-phase species.',
        'Catalyst deactivation by sintering, poisoning or coking.',
      ]],
      ['Effectiveness factor and Thiele modulus', [
        'Thiele modulus φ = L√(k/D_e) (L = V_p/S_p; R/3 for a sphere).',
        'Slab: η = tanh φ/φ. Sphere: η = (3/φ²)(φ coth φ − 1) with φ based on R.',
        'Small φ (< 0.4): η ≈ 1 (reaction controls). Large φ: η ≈ 1/φ (strong pore diffusion).',
        'Under strong pore diffusion the observed activation energy is about half the true value and the apparent order is (n + 1)/2.',
        'Weisz–Prater criterion uses observed rates to check for pore diffusion limits.',
      ]],
      ['External mass transfer', ['Rate = k_c a (C_b − C_s). External limitation shows weak temperature dependence and depends on flow velocity; increase velocity or reduce particle size to remove it.']],
    ],
    exam: ['Effectiveness factor for a given Thiele modulus (NAT).', 'Apparent activation energy under pore diffusion.'],
    traps: ['Using particle radius R instead of the characteristic length R/3 (or vice versa) for the Thiele modulus.'],
  },
};
