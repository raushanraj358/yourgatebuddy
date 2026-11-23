// Offline key notes: CH · Mass Transfer. Keys are chapter ids from data.js.
export const CONTENT = {
  diffusion: {
    overview: 'Diffusion and mass transfer coefficients: Fick’s law, equimolar and one-way diffusion, film, penetration and surface-renewal theories, and interphase transfer.',
    sections: [
      ["Fick's law", [
        'J_A = −D_AB dC_A/dz. Total flux N_A = x_A(N_A + N_B) + J_A.',
        'Equimolar counter-diffusion (distillation): N_A = D_AB(p_A1 − p_A2)/(RTz).',
        'Diffusion of A through stagnant B (absorption, evaporation): N_A = (D_AB P/(RTz)) (p_A1 − p_A2)/p_B,lm.',
        'Gas diffusivity ∝ T^1.75/P (Fuller); liquid diffusivity ∝ T/μ (Stokes–Einstein, Wilke–Chang).',
      ]],
      ['Mass transfer coefficients', [
        'N_A = k_c ΔC = k_G Δp = k_y Δy. Sherwood Sh = k_cL/D; Schmidt Sc = μ/(ρD).',
        'Correlations: Sh = 2 + 0.6Re^(1/2)Sc^(1/3) (sphere, Ranz–Marshall). Chilton–Colburn analogy: j_D = j_H = f/2.',
        'Film theory: k ∝ D. Penetration (Higbie) and surface renewal (Danckwerts): k ∝ √D.',
      ]],
      ['Interphase mass transfer', [
        'Two-film theory: resistances add. 1/K_y = 1/k_y + m/k_x; 1/K_x = 1/k_x + 1/(m k_y) (m = slope of equilibrium line).',
        'Gas-film control when m is small (soluble gases like NH₃ in water); liquid-film control when m is large (sparingly soluble, like O₂ or CO₂).',
      ]],
    ],
    exam: ['Flux of A through stagnant B (NAT).', 'Overall coefficient from individual coefficients.', 'Which film controls?'],
    traps: ['Using the equimolar formula for diffusion through a stagnant film (missing the p_B,lm term).'],
  },

  distillation: {
    overview: 'Distillation: VLE and relative volatility, McCabe–Thiele stage construction, flash and batch distillation, and reflux ratio.',
    sections: [
      ['VLE and relative volatility', [
        'Constant relative volatility: y = αx/(1 + (α − 1)x).',
        'α close to 1 means a difficult separation (many stages).',
      ]],
      ['McCabe–Thiele method', [
        'Assumes constant molar overflow. Rectifying line: y = (R/(R + 1))x + x_D/(R + 1).',
        'q-line: y = (q/(q − 1))x − z_F/(q − 1). Saturated liquid q = 1 (vertical); saturated vapour q = 0 (horizontal); subcooled q > 1.',
        'Step off stages between the operating lines and the equilibrium curve; the reboiler counts as one stage.',
        'Murphree efficiency relates actual and ideal stage changes; overall efficiency = ideal/actual stages.',
      ]],
      ['Flash and batch distillation', [
        'Flash: F = V + L; Fz = Vy + Lx; y = −(L/V)x + (F/V)z with y, x in equilibrium.',
        'Batch (Rayleigh): ln(F/W) = ∫ dx/(y − x) from x_W to x_F. With constant α: ln(F x_F/(W x_W)) = α ln(F(1 − x_F)/(W(1 − x_W))).',
        'Steam distillation lowers the boiling temperature of high-boiling, immiscible organics.',
      ]],
      ['Reflux ratio', [
        'Total reflux gives minimum stages (Fenske: N_min = ln[(x_D/(1 − x_D))((1 − x_W)/x_W)]/ln α).',
        'Minimum reflux R_min where an operating line touches the equilibrium curve (pinch). Underwood equations for multicomponent.',
        'Optimum reflux is usually 1.2–1.5 × R_min (balances capital and operating cost).',
      ]],
    ],
    exam: ['Number of ideal stages or minimum reflux (NAT).', 'Fenske minimum stages.', 'Flash vaporisation fraction.'],
    traps: ['Forgetting that the partial reboiler (and a partial condenser) is an equilibrium stage.'],
  },

  absorption: {
    overview: 'Gas absorption: operating lines, minimum liquid rate, and packed column height from HTU and NTU.',
    sections: [
      ['Operating line and minimum liquid rate', [
        'Use solute-free bases: L_s(X₁ − X₂) = G_s(Y₁ − Y₂) (mole ratios).',
        'Minimum liquid rate: the operating line touches the equilibrium curve. Actual rate ≈ 1.2–1.5 × minimum.',
        'Absorption factor A = L/(mG). A > 1 makes high recovery possible.',
      ]],
      ['HTU and NTU', [
        'Packed height Z = HTU × NTU. Gas-phase: Z = H_OG × N_OG, H_OG = G/(K_y a).',
        'Dilute, straight equilibrium line: N_OG = (y₁ − y₂)/Δy_lm.',
        'Kremser equation for the number of ideal stages with linear equilibrium.',
        'HETP: height equivalent to a theoretical plate. H_OG = H_G + (mG/L)H_L.',
      ]],
      ['Column operation', [
        'Flooding sets the maximum gas rate; design at 60–80% of flooding velocity.',
        'Stripping (desorption) is the reverse: operating line below the equilibrium line; stripping factor S = mG/L.',
      ]],
    ],
    exam: ['Minimum liquid rate (NAT).', 'Height of packing from HTU and NTU.'],
    traps: ['Mixing mole fractions and mole ratios on the same diagram.'],
  },

  extraction: {
    overview: 'Extraction and drying: liquid–liquid extraction on triangular diagrams, drying rate curves, humidification and cooling towers, and adsorption isotherms.',
    sections: [
      ['Liquid–liquid extraction', [
        'Distribution coefficient K = y/x (solute in extract / raffinate). Selectivity β = (y_A/y_B)/(x_A/x_B) > 1 needed.',
        'Triangular diagram: mixing points lie on straight lines (lever rule); tie lines join equilibrium phases; plait point where they vanish.',
        'Immiscible solvents, cross-current stages: fraction remaining after n stages = (1/(1 + E))ⁿ, E = KS/F (extraction factor).',
        'Counter-current extraction is more efficient than cross-current for the same solvent.',
      ]],
      ['Drying rate curves', [
        'Constant-rate period (surface moisture, rate set by external heat/mass transfer) then falling-rate period (internal diffusion).',
        'Critical moisture content X_c separates them. Equilibrium moisture X∗ cannot be removed at given conditions.',
        'Constant-rate time t_c = (L_s/(A N_c))(X₁ − X_c). Falling rate (linear): t_f = (L_s(X_c − X∗)/(A N_c)) ln((X_c − X∗)/(X₂ − X∗)).',
      ]],
      ['Humidification and cooling towers', [
        'Adiabatic saturation temperature ≈ wet-bulb temperature for air–water (Lewis relation, Le ≈ 1).',
        'Cooling tower: range = hot water in − cold water out; approach = cold water out − wet-bulb temperature.',
        'Tower height from Merkel’s equation using enthalpy driving force: Z = (L/(K_ya)) ∫ dT/(H∗ − H) × c_L.',
      ]],
      ['Adsorption', [
        'Isotherms: Langmuir q = q_mKC/(1 + KC) (monolayer); Freundlich q = KC^(1/n) (empirical); BET for multilayer (surface area).',
        'Physical adsorption: weak, reversible, multilayer. Chemisorption: strong, specific, monolayer.',
        'Fixed beds show a breakthrough curve; regeneration by temperature or pressure swing.',
      ]],
    ],
    exam: ['Drying time (NAT).', 'Solute remaining after cross-current extraction.', 'Cooling tower range and approach.'],
    traps: ['Using dry-bulb instead of wet-bulb temperature for a cooling tower’s approach.'],
  },
};
