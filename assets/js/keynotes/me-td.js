// Offline key notes: ME · Thermodynamics & Applications. Keys are chapter ids from data.js.
export const CONTENT = {
  laws: {
    overview: 'Zeroth and first laws for closed and open systems, work in standard processes, and properties of pure substances using steam tables.',
    sections: [
      ['Zeroth and first laws', [
        'Zeroth law: two bodies in thermal equilibrium with a third are in equilibrium with each other (basis of thermometry).',
        'First law (closed system): Q − W = ΔU. For a cycle ∮δQ = ∮δW. Heat and work are path functions; U, H, S are properties.',
        'Sign convention: heat added and work done by the system are positive.',
      ]],
      ['Closed-system processes (ideal gas)', [
        'Isobaric W = pΔV; isochoric W = 0; isothermal W = p₁V₁ ln(V₂/V₁).',
        'Polytropic pVⁿ = C: W = (p₁V₁ − p₂V₂)/(n − 1). Adiabatic reversible n = γ.',
        'Ideal gas: c_p − c_v = R; γ = c_p/c_v; ΔU = mc_vΔT, ΔH = mc_pΔT for any process.',
        'Free (unrestrained) expansion: W = 0, Q = 0, so ΔU = 0 (T constant for an ideal gas).',
      ]],
      ['Open systems (steady flow)', [
        'SFEE: q − w = Δh + ΔV²/2 + gΔz per unit mass.',
        'Nozzle: h₁ − h₂ = (V₂² − V₁²)/2. Throttling valve: h₁ = h₂ (isenthalpic). Turbine/compressor (adiabatic): w = h₁ − h₂.',
        'Flow work pv is included in enthalpy. Steady-flow reversible work = −∫v dp.',
      ]],
      ['Pure substances and steam tables', [
        'Dryness fraction x: v = v_f + x v_fg; h = h_f + x h_fg; s = s_f + x s_fg.',
        'Compressed liquid ≈ saturated liquid at the same temperature. Superheated tables give properties directly.',
        'Critical point of water ≈ 22.06 MPa, 374 °C; triple point 0.01 °C, 0.611 kPa.',
      ]],
    ],
    exam: ['Work or heat in a polytropic process (NAT).', 'Exit velocity of a nozzle or state after throttling.'],
    traps: ['Using ∫p dV for open-system (shaft) work; steady-flow work is −∫v dp.'],
  },

  entropy: {
    overview: 'Second law: Kelvin–Planck and Clausius statements, Carnot efficiency, the Clausius inequality, entropy change, and availability (exergy).',
    sections: [
      ['Second law and Carnot cycle', [
        'Kelvin–Planck: no engine converts all heat from one reservoir into work. Clausius: heat does not flow from cold to hot by itself.',
        'Carnot efficiency η = 1 − T_L/T_H (absolute temperatures); highest possible between two reservoirs.',
        'Carnot refrigerator COP = T_L/(T_H − T_L); heat pump COP = T_H/(T_H − T_L) = COP_R + 1.',
      ]],
      ['Clausius inequality', ['∮ δQ/T ≤ 0; equality for reversible cycles. A cycle with ∮δQ/T > 0 is impossible.']],
      ['Entropy change', [
        'dS = δQ_rev/T. Entropy generation S_gen ≥ 0 (increase of entropy principle).',
        'Ideal gas: Δs = c_p ln(T₂/T₁) − R ln(p₂/p₁) = c_v ln(T₂/T₁) + R ln(v₂/v₁).',
        'Incompressible solid/liquid: Δs = c ln(T₂/T₁). Heat Q to a reservoir at T: ΔS = Q/T.',
        'Mixing two equal masses of water at T₁ and T₂: ΔS = 2mc ln((T₁ + T₂)/(2√(T₁T₂))) > 0.',
      ]],
      ['Availability and irreversibility', [
        'Availability of heat Q at T with surroundings T₀: Q(1 − T₀/T).',
        'Closed system availability φ = (u − u₀) + p₀(v − v₀) − T₀(s − s₀); flow exergy ψ = (h − h₀) − T₀(s − s₀) + V²/2 + gz.',
        'Irreversibility I = T₀S_gen (Gouy–Stodola). Second-law efficiency = useful exergy out / exergy in.',
      ]],
    ],
    exam: ['Entropy generated in a heat transfer or mixing process (NAT).', 'Is a proposed engine possible (Clausius inequality)?'],
    traps: ['Using °C in Carnot efficiency.'],
  },

  cycles: {
    overview: 'Power cycles: Rankine with reheat and regeneration, Brayton gas turbine cycle, and Otto and Diesel air-standard cycles.',
    sections: [
      ['Rankine cycle', [
        'Processes: pump (1–2), boiler (2–3), turbine (3–4), condenser (4–1). η = (W_T − W_P)/Q_in.',
        'Pump work ≈ v(p₂ − p₁), small. Back work ratio is low compared with gas cycles.',
        'Raising boiler pressure or superheat, or lowering condenser pressure, raises efficiency. High pressure lowers turbine exit dryness.',
        '**Reheat:** mainly improves exit dryness (and work output). **Regeneration (feedwater heaters):** raises mean temperature of heat addition and efficiency.',
      ]],
      ['Brayton cycle', [
        'η = 1 − 1/r_p^((γ − 1)/γ), depends only on the pressure ratio for the ideal cycle.',
        'Maximum work at r_p = (T_max/T_min)^(γ/(2(γ − 1))), where T₂ = T₄ = √(T₁T₃).',
        'Regeneration helps at low pressure ratios; intercooling and reheating increase work output.',
        'Back work ratio is high (compressor uses 40–60% of turbine work).',
      ]],
      ['Otto and Diesel cycles', [
        'Otto (constant-volume heat addition): η = 1 − 1/r^(γ − 1).',
        'Diesel (constant-pressure heat addition): η = 1 − (1/r^(γ − 1)) × (ρ^γ − 1)/(γ(ρ − 1)), cut-off ratio ρ.',
        'For the same compression ratio, Otto > Dual > Diesel efficiency. For the same maximum pressure and temperature, Diesel > Dual > Otto.',
        'Mean effective pressure = net work / swept volume.',
      ]],
    ],
    exam: ['Thermal efficiency of a Rankine or Brayton cycle (NAT).', 'Comparison of Otto, Diesel and dual cycles.'],
    traps: ['Comparing Otto and Diesel without stating which quantity is held equal.'],
  },

  refrigeration: {
    overview: 'Refrigeration and air conditioning: vapour compression cycle and COP, refrigerants, psychrometry, and air-conditioning processes.',
    sections: [
      ['Vapour compression cycle', [
        'Processes: compressor (1–2, isentropic), condenser (2–3), expansion valve (3–4, isenthalpic), evaporator (4–1).',
        'COP_R = (h₁ − h₄)/(h₂ − h₁). Refrigerating effect = h₁ − h₄. 1 tonne of refrigeration = 3.5 kW (211 kJ/min).',
        'Subcooling raises the refrigerating effect; superheating at evaporator exit protects the compressor.',
        'Lower evaporator or higher condenser temperature reduces COP.',
      ]],
      ['Other systems', ['Air refrigeration (Bell–Coleman) for aircraft; vapour absorption (NH₃–water, LiBr–water) uses heat instead of compressor work.']],
      ['Psychrometry', [
        'Specific humidity ω = 0.622 p_v/(p − p_v). Relative humidity φ = p_v/p_sat at the dry-bulb temperature.',
        'Dew point: temperature at which vapour starts to condense at constant p_v. Wet-bulb temperature lies between dew point and dry bulb (all equal at saturation).',
        'Enthalpy of moist air h ≈ 1.005t + ω(2501 + 1.88t) kJ/kg dry air.',
      ]],
      ['Air-conditioning processes', [
        'Sensible heating/cooling: ω constant. Cooling and dehumidification: cool below dew point.',
        'Evaporative cooling: along a constant wet-bulb line. Adiabatic mixing: mixed state lies on the line joining the two states (mass-weighted).',
        'Bypass factor of a coil = (t_out − t_coil)/(t_in − t_coil). Sensible heat factor = sensible/total heat.',
      ]],
    ],
    exam: ['COP or refrigerant mass flow for a cycle (NAT).', 'Specific humidity or relative humidity from given data.'],
    traps: ['Using total pressure instead of vapour pressure in ω.'],
  },

  ic: {
    overview: 'IC engines: performance parameters and efficiencies, and combustion phenomena in SI and CI engines.',
    sections: [
      ['Engine performance parameters', [
        'Indicated power IP = p_imLAn k/60 (n = N/2 for four-stroke, N for two-stroke).',
        'Brake power BP = 2πNT/60. Mechanical efficiency = BP/IP; friction power = IP − BP.',
        'Brake thermal efficiency = BP/(ṁ_f × CV). BSFC = ṁ_f/BP.',
        'Volumetric efficiency = actual air inducted / swept volume at intake conditions.',
        'Morse test (multi-cylinder) finds IP by cutting off one cylinder at a time.',
      ]],
      ['Combustion in SI engines', [
        'Spark ignition of a premixed charge. Abnormal combustion: knock (auto-ignition of end gas), pre-ignition.',
        'Knock rises with compression ratio, inlet temperature and spark advance; reduced by high-octane fuel.',
        'Octane number = % iso-octane in an iso-octane/n-heptane blend that knocks the same.',
      ]],
      ['Combustion in CI engines', [
        'Fuel injected into hot compressed air self-ignites after an ignition delay. Long delay causes diesel knock.',
        'Diesel knock is reduced by high cetane fuel, higher compression ratio and inlet temperature (opposite of SI knock).',
        'Cetane number = % cetane in a cetane/α-methylnaphthalene blend with the same ignition delay.',
      ]],
    ],
    exam: ['Brake thermal efficiency or BSFC (NAT).', 'Factors that reduce knock in SI vs CI engines.'],
    traps: ['Forgetting n = N/2 for four-stroke engines.'],
  },
};
