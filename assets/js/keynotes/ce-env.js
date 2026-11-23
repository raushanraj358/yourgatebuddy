// Offline key notes: CE · Environmental Engineering. Keys are chapter ids from data.js.
export const CONTENT = {
  water: {
    overview: 'Water supply: quality parameters and standards, coagulation and sedimentation, filtration and disinfection, and water demand and distribution.',
    sections: [
      ['Water quality parameters', [
        'Physical: turbidity (NTU), colour, taste, temperature. Chemical: pH, hardness, alkalinity, chlorides, fluoride, nitrates. Biological: coliforms (MPN).',
        'Hardness (as CaCO₃) = Σ (ion mg/L × 50/equivalent weight). Carbonate hardness = min(total hardness, alkalinity).',
        'IS 10500 drinking limits: pH 6.5–8.5; fluoride 1.0 (permissible 1.5) mg/L; nitrate 45 mg/L.',
      ]],
      ['Coagulation and sedimentation', [
        'Alum dose by jar test. Flocculation via velocity gradient G = √(P/(μV)); Gt ≈ 10⁴–10⁵.',
        'Stokes’ settling velocity v_s = g(G_s − 1)d²/(18ν). Discrete particles in a tank are removed fully if v_s ≥ overflow rate Q/A (surface loading).',
        'Removal efficiency = v_s/(Q/A) for smaller particles. Detention time = volume/Q. Removal is independent of depth for an ideal tank.',
      ]],
      ['Filtration and disinfection', [
        'Slow sand filter: 2–3 m³/m²/day (approx.), biological layer (schmutzdecke). Rapid sand: about 30 times faster, backwashed.',
        'Chlorination: chlorine demand = applied − residual. Breakpoint chlorination leaves free residual. HOCl is about 80 times more effective than OCl⁻ (favoured at low pH).',
        'Chick’s law: N/N₀ = e^(−kt).',
      ]],
      ['Water demand and distribution', [
        'Population forecasting: arithmetic (P₀ + n x̄), geometric (P₀(1 + r)ⁿ), incremental increase (P₀ + n x̄ + n(n + 1)ȳ/2).',
        'Peak factors: maximum daily ≈ 1.8 × average; maximum hourly ≈ 2.7 × average (approx.).',
        'Hardy Cross balances networks: ΔQ = −Σh/(nΣ|h/Q|).',
      ]],
    ],
    exam: ['Total hardness from ion concentrations (NAT).', 'Settling tank removal efficiency.', 'Projected population by a given method.'],
    traps: ['Forgetting to convert ion mg/L to CaCO₃ equivalent.'],
  },

  wastewater: {
    overview: 'Wastewater: BOD and COD with BOD kinetics, the activated sludge process, trickling filters and sludge treatment, and sewer design.',
    sections: [
      ['BOD, COD and BOD kinetics', [
        'BOD_t = L₀(1 − e^(−kt)) (base e) or L₀(1 − 10^(−Kt)) with k = 2.303K.',
        'BOD₅ at 20 °C is the standard. Temperature correction k_T = k₂₀ θ^(T − 20), θ ≈ 1.047.',
        'BOD from a dilution test: (D₁ − D₂)/P (P = fraction of sample).',
        'COD ≥ BOD (COD includes non-biodegradable matter). BOD/COD ≈ 0.5 indicates biodegradable sewage.',
      ]],
      ['Activated sludge process', [
        'F/M ratio = QS₀/(VX). Hydraulic retention time θ = V/Q. Mean cell residence time θ_c = VX/(Q_wX_r + Q_eX_e).',
        'Sludge volume index SVI = settled volume (mL/L) × 1000/MLSS (mg/L); good settling SVI < 150.',
        'Return ratio Q_r/Q = X/(X_r − X).',
        'Monod kinetics: μ = μ_m S/(K_s + S).',
      ]],
      ['Trickling filters and sludge treatment', [
        'Trickling filter: biofilm on media; NRC formula for efficiency; recirculation improves performance.',
        'Sludge digestion: anaerobic (methane), aerobic. Sludge volume ∝ 1/(100 − p) for moisture content p%.',
        'Oxidation ponds rely on algae–bacteria symbiosis.',
      ]],
      ['Sewer design', [
        'Self-cleansing velocity ≈ 0.6–0.9 m/s; maximum ≈ 3 m/s to avoid scour.',
        'Manning’s equation for design; sewers designed partly full (about 0.8 depth for large sewers).',
        'Streeter–Phelps oxygen sag curve: critical deficit downstream of the outfall.',
      ]],
    ],
    exam: ['BOD₅ or ultimate BOD from kinetics (NAT).', 'F/M ratio or SVI.', 'Sludge volume after a change in moisture content.'],
    traps: ['Mixing base-10 K and base-e k rate constants.'],
  },

  air: {
    overview: 'Air pollution: pollutants and standards, atmospheric stability and plume dispersion, stack height, and particulate control devices.',
    sections: [
      ['Pollutants and standards', [
        'Primary (emitted directly: SO₂, NOₓ, CO, PM) and secondary (formed: O₃, PAN, sulphate aerosols).',
        'Conversion: µg/m³ = ppm × M × 1000/24.45 at 25 °C, 1 atm.',
        'NAAQS (India) covers PM₁₀, PM₂.₅, SO₂, NO₂, CO, O₃, lead, ammonia and others.',
      ]],
      ['Dispersion and stack height', [
        'Lapse rate: dry adiabatic 9.8 °C/km. Super-adiabatic: unstable (looping plume); sub-adiabatic and inversion: stable (fanning).',
        'Coning in neutral conditions; lofting with an inversion below the stack; fumigation with an inversion above.',
        'Gaussian plume: ground-level centreline C = (Q/(πσ_yσ_zu)) e^(−H²/(2σ_z²)).',
        'Effective stack height H = h + Δh (plume rise). Indian guideline: h = 14Q^0.3 (Q in kg/h of SO₂), minimum 30 m.',
      ]],
      ['Control devices', [
        'Settling chamber (coarse), cyclone (> 10 µm), fabric filter/baghouse (fine, high efficiency), electrostatic precipitator (fine, η = 1 − e^(−wA/Q), Deutsch equation).',
        'Wet scrubbers remove gases and particles; SO₂ by flue-gas desulphurisation; NOₓ by SCR.',
      ]],
    ],
    exam: ['Ground-level concentration from the Gaussian plume (NAT).', 'ESP efficiency or stack height.'],
    traps: ['Forgetting the effective height includes plume rise.'],
  },

  'solid-waste': {
    overview: 'Solid waste and noise: generation and characterisation, collection and disposal, landfills and composting, and noise levels.',
    sections: [
      ['Generation and characterisation', [
        'Indian MSW: high organic and moisture content, low calorific value (poor for incineration).',
        'Moisture content (wet basis) = (wet − dry)/wet. Energy content by Dulong’s formula from elemental composition.',
      ]],
      ['Collection and disposal', [
        'Hauled container and stationary container systems. Collection is the largest cost component.',
        'Disposal hierarchy: reduce, reuse, recycle, recover, then landfill.',
      ]],
      ['Landfills and composting', [
        'Sanitary landfill: liner, leachate collection, gas venting, daily cover. Landfill gas ≈ 50–60% methane.',
        'Composting C/N ratio ≈ 25–30; aerobic (windrow) or anaerobic. Vermicomposting uses earthworms.',
        'Incineration suits high-calorific, low-moisture waste; reduces volume by about 90%.',
      ]],
      ['Noise pollution', [
        'Sound level L = 10 log₁₀(I/I₀) dB = 20 log₁₀(p/p₀).',
        'Adding levels: L = 10 log₁₀(Σ10^(Lᵢ/10)). Two equal sources add 3 dB.',
        'L_eq is the equivalent continuous level. Point source: −6 dB per doubling of distance; line source −3 dB.',
      ]],
    ],
    exam: ['Combined sound level of several sources (NAT).', 'Moisture content or landfill volume.'],
    traps: ['Adding decibels arithmetically.'],
  },
};
