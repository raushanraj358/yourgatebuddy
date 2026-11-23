// Offline key notes: CH · Process Calculations & Thermodynamics. Keys are chapter ids from data.js.
export const CONTENT = {
  balances: {
    overview: 'Material and energy balances: steady-state balances with and without reaction, recycle, bypass and purge, heats of reaction, and humidity calculations.',
    sections: [
      ['Steady-state material balances', [
        'Input + generation = output + consumption (+ accumulation, zero at steady state).',
        'Degrees of freedom = unknowns − independent equations; solve when it is zero. Choose a convenient basis (100 mol or 100 kg).',
        'Tie components (pass through unchanged) give quick answers.',
        'With reaction: extent of reaction ξ, nᵢ = nᵢ₀ + νᵢξ. Limiting reactant runs out first; excess % = (fed − stoichiometric)/stoichiometric × 100.',
        'Conversion = reacted/fed; yield and selectivity for multiple reactions.',
      ]],
      ['Recycle, bypass and purge', [
        'Overall conversion uses fresh feed and final product; single-pass conversion uses reactor inlet and outlet.',
        'Purge stops inerts building up: inert in = inert purged at steady state.',
        'Bypass streams mix with the processed stream after the unit.',
      ]],
      ['Energy balances and heats of reaction', [
        'Closed system: Q − W = ΔU. Open steady flow: Q − W_s = ΔH + ΔKE + ΔPE.',
        'ΔH_rxn° = Σν ΔH_f°(products) − Σν ΔH_f°(reactants) = Σ ΔH_c°(reactants) − Σ ΔH_c°(products).',
        'Hess’s law; Kirchhoff: ΔH_rxn(T) = ΔH_rxn(T₀) + ∫ΔC_p dT. Adiabatic flame temperature from ΔH = 0.',
        'Higher heating value includes latent heat of the water formed; lower heating value does not.',
      ]],
      ['Humidity and saturation', [
        'Absolute humidity H = (p_v/(P − p_v))(M_w/M_air) = 0.622 p_v/(P − p_v) for water–air.',
        'Relative humidity = p_v/p_sat. Percentage saturation = H/H_sat (slightly less than RH).',
        'Dew point: temperature where p_sat = p_v. Humid heat c_s = 1.005 + 1.88H kJ/kg·K.',
        'Raoult’s law vapour pressures from Antoine: log p_sat = A − B/(T + C).',
      ]],
    ],
    exam: ['Recycle ratio or purge rate (NAT).', 'Heat of reaction from heats of formation or combustion.', 'Humidity or dew point of air.'],
    traps: ['Mixing single-pass and overall conversion.'],
  },

  laws: {
    overview: 'Thermodynamics for chemical engineers: first and second laws, PVT behaviour and equations of state, and property relations.',
    sections: [
      ['First and second laws', [
        'ΔU = Q − W (closed); ΔH = Q for constant-pressure, no shaft work. Ideal gas: C_p − C_v = R.',
        'Entropy: dS = δQ_rev/T; ΔS_universe ≥ 0. Carnot efficiency 1 − T_C/T_H.',
        'Reversible adiabatic ideal gas: TV^(γ−1) and PV^γ constant. Isothermal work = RT ln(V₂/V₁).',
      ]],
      ['PVT behaviour and equations of state', [
        'Ideal gas PV = nRT. Compressibility Z = PV/(RT); Z = 1 for ideal gases.',
        'Van der Waals: (P + a/V²)(V − b) = RT; a = 27R²T_c²/(64P_c), b = RT_c/(8P_c); Z_c = 3/8.',
        'Virial: Z = 1 + B/V + C/V² + … = 1 + BP/RT (truncated). Redlich–Kwong, Soave and Peng–Robinson are cubic EOS for real fluids.',
        'Corresponding states: Z = f(T_r, P_r, ω) with acentric factor ω (Pitzer).',
      ]],
      ['Thermodynamic property relations', [
        'dU = TdS − PdV; dH = TdS + VdP; dA = −SdT − PdV; dG = −SdT + VdP.',
        'Maxwell relations, e.g. (∂S/∂P)_T = −(∂V/∂T)_P; (∂S/∂V)_T = (∂P/∂T)_V.',
        'C_p − C_v = TVβ²/κ. Joule–Thomson coefficient μ_JT = (∂T/∂P)_H; zero for an ideal gas; inversion temperature.',
        'Clapeyron: dP_sat/dT = ΔH_vap/(TΔV); Clausius–Clapeyron: ln(P₂/P₁) = −(ΔH_vap/R)(1/T₂ − 1/T₁).',
      ]],
    ],
    exam: ['Work or entropy change in an ideal-gas process (NAT).', 'Van der Waals constants or Z.', 'Vapour pressure from Clausius–Clapeyron.'],
    traps: ['Using the ideal-gas C_p − C_v = R for liquids or real gases.'],
  },

  phase: {
    overview: 'Phase equilibria: fugacity and activity coefficients, Raoult’s law and VLE calculations, and azeotropes.',
    sections: [
      ['Fugacity and activity coefficients', [
        'Equilibrium: equal fugacity of each component in every phase. Fugacity coefficient φ = f/P (1 for an ideal gas).',
        'Activity coefficient γᵢ = fᵢ/(xᵢfᵢ°). Models: Margules, van Laar, Wilson, NRTL, UNIQUAC.',
        'Gibbs–Duhem: Σxᵢ d ln γᵢ = 0 (at constant T, P) checks consistency of data.',
        'Excess Gibbs energy Gᴱ/RT = Σxᵢ ln γᵢ. Two-suffix Margules: ln γ₁ = Ax₂², ln γ₂ = Ax₁².',
      ]],
      ["Raoult's law and VLE", [
        'Ideal: yᵢP = xᵢPᵢ_sat. Modified Raoult: yᵢP = xᵢγᵢPᵢ_sat.',
        'Bubble point: P = ΣxᵢPᵢ_sat (for ideal solutions). Dew point: 1/P = Σyᵢ/Pᵢ_sat.',
        'K-value Kᵢ = yᵢ/xᵢ; relative volatility α = K₁/K₂ = P₁_sat/P₂_sat (ideal).',
        'Henry’s law for dilute gases: pᵢ = Hᵢxᵢ. Gibbs phase rule F = C − P + 2 (minus number of independent reactions).',
      ]],
      ['Azeotropes', [
        'At an azeotrope x = y, so simple distillation cannot pass it. Positive deviation (γ > 1) gives a minimum-boiling (maximum-pressure) azeotrope (ethanol–water); negative deviation gives a maximum-boiling one.',
        'At the azeotrope γ₁P₁_sat = γ₂P₂_sat = P.',
        'Broken by pressure-swing, extractive or azeotropic distillation.',
      ]],
    ],
    exam: ['Bubble or dew pressure of a mixture (NAT).', 'Activity coefficient from Margules parameters.', 'Degrees of freedom by the phase rule.'],
    traps: ['Forgetting γ in modified Raoult’s law for non-ideal mixtures.'],
  },

  'reaction-eq': {
    overview: 'Chemical reaction equilibria: the equilibrium constant from Gibbs energy, effect of temperature and pressure, and equilibrium conversion.',
    sections: [
      ['Equilibrium constant', [
        'ΔG° = −RT ln K. K = Π(âᵢ)^νᵢ; for ideal gases K = Π(yᵢP/P°)^νᵢ.',
        'K > 1 favours products. ΔG° from standard Gibbs energies of formation.',
      ]],
      ['Effect of temperature and pressure', [
        "Van ’t Hoff: d ln K/dT = ΔH°/(RT²); ln(K₂/K₁) = −(ΔH°/R)(1/T₂ − 1/T₁) for constant ΔH°.",
        'Exothermic reactions: K falls as T rises (lower equilibrium conversion at high T).',
        'Pressure does not change K but changes conversion when Δν ≠ 0: higher P favours fewer moles (Le Chatelier). Inerts act like lower pressure.',
      ]],
      ['Equilibrium conversion', [
        'Write mole numbers with the extent of reaction, form mole fractions, substitute into K and solve.',
        'Multiple reactions: one K and one extent per independent reaction.',
      ]],
    ],
    exam: ['Equilibrium conversion for a gas-phase reaction (NAT).', 'K at another temperature via van ’t Hoff.'],
    traps: ['Thinking pressure changes K; it changes the equilibrium composition only.'],
  },
};
