// Offline key notes: ME · Heat Transfer (also reused by CH). Keys are chapter ids from data.js.
export const CONTENT = {
  conduction: {
    overview: 'Conduction: Fourier’s law, 1-D steady conduction through walls, cylinders and spheres with thermal resistances, fins, and lumped capacitance transients.',
    sections: [
      ["Fourier's law", ['q = −kA dT/dx. Thermal conductivity: metals high (copper ≈ 400 W/m·K), gases low.', 'Thermal diffusivity α = k/(ρc_p): how fast temperature changes spread.']],
      ['1-D steady conduction', [
        'Plane wall R = L/(kA). Cylinder R = ln(r₂/r₁)/(2πkL). Sphere R = (r₂ − r₁)/(4πk r₁r₂). Convection R = 1/(hA).',
        'Resistances add in series; conductances add in parallel. Heat rate Q = ΔT/ΣR.',
        'Critical insulation radius: cylinder r_c = k/h; sphere 2k/h. Adding insulation below r_c increases heat loss.',
        'Uniform heat generation q‴ in a wall of half-thickness L: T_max − T_s = q‴L²/(2k). Cylinder: q‴R²/(4k).',
      ]],
      ['Fins', [
        'm = √(hP/(kA_c)). Infinitely long fin: Q = √(hPkA_c) θ₀. Insulated tip: Q = √(hPkA_c) θ₀ tanh(mL).',
        'Fin efficiency = actual heat / heat if the whole fin were at base temperature. Effectiveness = fin heat / heat without the fin; worthwhile if > 2.',
        'Fins help most on the side with low h (gas side).',
      ]],
      ['Lumped capacitance', [
        'Valid when Biot number Bi = hL_c/k < 0.1 (L_c = V/A).',
        '(T − T∞)/(T₀ − T∞) = e^(−t/τ), τ = ρVc/(hA). Equivalently e^(−Bi·Fo).',
      ]],
    ],
    exam: ['Heat loss through a composite wall or pipe (NAT).', 'Critical radius of insulation.', 'Time to cool a small body (lumped).'],
    traps: ['Applying lumped analysis when Bi > 0.1.'],
  },

  convection: {
    overview: 'Convection: dimensionless numbers, standard correlations for forced and free convection, and the thermal boundary layer.',
    sections: [
      ['Dimensionless numbers', [
        'Nu = hL/k (convective/conductive). Pr = ν/α = μc_p/k (momentum vs thermal diffusivity). Re = VL/ν.',
        'Grashof Gr = gβΔTL³/ν² (buoyancy/viscous); Rayleigh Ra = Gr·Pr.',
        'Stanton St = Nu/(Re Pr) = h/(ρVc_p).',
      ]],
      ['Forced and free convection correlations', [
        'Laminar flat plate: Nu_x = 0.332 Re_x^(1/2) Pr^(1/3); average Nu = 0.664 Re_L^(1/2) Pr^(1/3).',
        'Fully developed laminar pipe flow: Nu = 3.66 (constant wall temperature), 4.36 (constant heat flux).',
        'Turbulent pipe (Dittus–Boelter): Nu = 0.023 Re^0.8 Prⁿ (n = 0.4 heating, 0.3 cooling).',
        'Free convection: Nu = C Raⁿ (n = 1/4 laminar, 1/3 turbulent).',
        'Newton’s law of cooling: q = hA(T_s − T∞).',
      ]],
      ['Thermal boundary layer', [
        'δ_t/δ ≈ Pr^(−1/3). Pr ≈ 0.7 for air; liquid metals Pr ≪ 1 (thick thermal layer); oils Pr ≫ 1.',
        'Reynolds analogy: St = C_f/2 for Pr = 1; Chilton–Colburn: St Pr^(2/3) = C_f/2.',
      ]],
    ],
    exam: ['Heat transfer coefficient from a correlation (NAT).', 'Which dimensionless number governs free convection?'],
    traps: ['Using Re in free convection; buoyancy-driven flow uses Gr or Ra.'],
  },

  radiation: {
    overview: 'Radiation: black and grey bodies, the Stefan–Boltzmann and Wien laws, view factors, and radiation networks between surfaces.',
    sections: [
      ['Black and grey bodies', [
        'Black body absorbs all radiation; emissive power E_b = σT⁴, σ = 5.67 × 10⁻⁸ W/m²K⁴.',
        "Kirchhoff's law: emissivity = absorptivity (at the same temperature and wavelength; for grey bodies overall).",
        'Opaque surface: α + ρ = 1. Wien’s displacement: λ_max T = 2898 µm·K.',
      ]],
      ['View factors', [
        'Reciprocity: A₁F₁₂ = A₂F₂₁. Summation: ΣF₁ⱼ = 1 over an enclosure.',
        'A flat or convex surface cannot see itself: F₁₁ = 0. Small body inside a large enclosure: F₁₂ = 1.',
        'Hemisphere over its base disc: F_disc→hemisphere = 1, F_hemisphere→disc = 0.5.',
      ]],
      ['Radiation networks', [
        'Surface resistance (1 − ε)/(εA); space resistance 1/(A₁F₁₂).',
        'Two large parallel plates: q = σ(T₁⁴ − T₂⁴)/(1/ε₁ + 1/ε₂ − 1).',
        'Small body in a large enclosure: q = ε₁σA₁(T₁⁴ − T₂⁴).',
        'n radiation shields of equal emissivity between two plates cut heat transfer to 1/(n + 1).',
      ]],
    ],
    exam: ['Net radiation exchange between surfaces (NAT).', 'Unknown view factor using reciprocity and summation.'],
    traps: ['Using Celsius instead of kelvin in T⁴.'],
  },

  exchangers: {
    overview: 'Heat exchangers: overall coefficient, LMTD method for sizing, and the effectiveness–NTU method for rating.',
    sections: [
      ['LMTD method', [
        'Q = UA ΔT_lm, ΔT_lm = (ΔT₁ − ΔT₂)/ln(ΔT₁/ΔT₂).',
        'Counter-flow gives a larger LMTD than parallel flow for the same terminal temperatures; outlet of cold fluid can exceed the hot outlet.',
        'Condensers and evaporators (one fluid at constant temperature): parallel and counter-flow behave the same.',
        'Multi-pass or cross-flow: Q = UA F ΔT_lm,counter with a correction factor F ≤ 1.',
        '1/U = 1/h_i + R_wall + 1/h_o + fouling resistances.',
      ]],
      ['Effectiveness–NTU method', [
        'ε = Q/Q_max, Q_max = C_min(T_h,in − T_c,in). NTU = UA/C_min. C_r = C_min/C_max.',
        'Parallel flow: ε = (1 − e^(−NTU(1 + C_r)))/(1 + C_r). Counter-flow: ε = (1 − e^(−NTU(1 − C_r)))/(1 − C_r e^(−NTU(1 − C_r))).',
        'C_r = 0 (phase change): ε = 1 − e^(−NTU) for any arrangement. Counter-flow with C_r = 1: ε = NTU/(1 + NTU).',
      ]],
    ],
    exam: ['Area or outlet temperature using LMTD or ε–NTU (NAT).', 'Effectiveness of a condenser.'],
    traps: ['Using the arithmetic mean temperature difference instead of the log mean.'],
  },
};
