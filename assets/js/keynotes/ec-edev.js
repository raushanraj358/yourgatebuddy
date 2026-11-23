// Offline key notes: EC · Electronic Devices. Keys are chapter ids from data.js.
export const CONTENT = {
  physics: {
    overview: 'Semiconductor physics: energy bands, carrier concentrations and the Fermi level, drift and diffusion currents, mobility and resistivity.',
    sections: [
      ['Energy bands', [
        'Band gap at 300 K: Si ≈ 1.12 eV, Ge ≈ 0.66 eV, GaAs ≈ 1.42 eV. Si and Ge are indirect-gap; GaAs is direct-gap (good for LEDs and lasers).',
        'Band gap decreases slightly as temperature rises.',
      ]],
      ['Carrier concentration and Fermi level', [
        'Mass-action law: np = nᵢ² in equilibrium. nᵢ(Si, 300 K) ≈ 1.5 × 10¹⁰ cm⁻³ (1 × 10¹⁰ in newer texts).',
        'n-type (N_D ≫ nᵢ): n ≈ N_D, p = nᵢ²/N_D. p-type: p ≈ N_A.',
        'n = nᵢ e^((E_F − E_i)/kT). E_F moves towards E_C in n-type and towards E_V in p-type; E_C − E_F = kT ln(N_C/N_D).',
        'nᵢ ∝ T^(3/2) e^(−E_g/2kT): rises steeply with temperature.',
      ]],
      ['Drift and diffusion currents', [
        'Drift: J = q(nμₙ + pμₚ)E. Diffusion: Jₙ = qDₙ dn/dx, Jₚ = −qDₚ dp/dx.',
        'Einstein relation: D/μ = kT/q = V_T ≈ 25.9 mV at 300 K.',
        'Diffusion length L = √(Dτ). Continuity equation combines generation, recombination, drift and diffusion.',
      ]],
      ['Mobility and resistivity', [
        'σ = q(nμₙ + pμₚ); ρ = 1/σ. In Si, μₙ ≈ 1350 and μₚ ≈ 480 cm²/V·s (lightly doped).',
        'Mobility falls with higher doping (impurity scattering) and higher temperature (lattice scattering).',
        'Hall effect: V_H = BI/(qnt); its sign tells the carrier type; R_H = 1/(qn).',
      ]],
    ],
    exam: ['Carrier concentrations or resistivity of a doped sample (NAT).', 'Position of the Fermi level relative to E_i.'],
    traps: ['Using N_D for minority carriers; minority concentration is nᵢ²/N_D.'],
  },

  pn: {
    overview: 'P-N junction: built-in potential and depletion width, I–V under bias, junction capacitances, breakdown mechanisms, and optoelectronic devices.',
    sections: [
      ['Junction under bias', [
        'Built-in potential V_bi = V_T ln(N_AN_D/nᵢ²).',
        'Depletion width W = √(2ε(V_bi − V)(1/N_A + 1/N_D)/q); mostly on the lightly doped side. W ∝ √(V_bi + V_R).',
        'Diode equation: I = I_s(e^(V/ηV_T) − 1). I_s doubles roughly every 10 °C rise; V_D falls about 2 mV/°C at constant current.',
      ]],
      ['Depletion and diffusion capacitance', [
        'Depletion (transition) capacitance C_j = εA/W ∝ (V_bi + V_R)^(−1/2) for an abrupt junction (−1/3 for linearly graded). Dominates in reverse bias (varactors).',
        'Diffusion capacitance C_d = τI/V_T, dominates in forward bias.',
      ]],
      ['Zener and avalanche breakdown', [
        'Zener: heavy doping, narrow depletion region, tunnelling, below about 5 V; negative temperature coefficient.',
        'Avalanche: lighter doping, impact ionisation, above about 7 V; positive temperature coefficient.',
      ]],
      ['Photodiodes, LEDs and solar cells', [
        'Photodiode: reverse-biased; photocurrent ∝ light intensity. Responsivity R = ηqλ/(hc) A/W. Cut-off wavelength λ_c (µm) = 1.24/E_g (eV).',
        'LED: forward-biased direct-gap material; emitted wavelength λ ≈ 1.24/E_g µm.',
        'Solar cell: no bias; works in the fourth quadrant. Fill factor = P_max/(V_oc I_sc).',
      ]],
    ],
    exam: ['Depletion width or junction capacitance under a reverse bias (NAT).', 'Built-in potential for given doping.'],
    traps: ['Assuming the depletion region splits equally; it extends mostly into the lightly doped side.'],
  },

  transistors: {
    overview: 'BJT and MOSFET device physics: BJT current components, MOS capacitor regions, MOSFET I–V equations, threshold voltage and body effect.',
    sections: [
      ['BJT operation', [
        'Active mode: E–B forward, C–B reverse. Emitter injection efficiency γ, base transport factor α_T; α = γα_T; β = α/(1 − α).',
        'Base-width modulation (Early effect): I_C rises with V_CE; output resistance r_o = V_A/I_C.',
        'Heavily doped emitter, thin lightly doped base, moderately doped wide collector.',
      ]],
      ['MOS capacitor', [
        'Regions for p-substrate as V_G rises: accumulation, depletion, inversion (strong inversion at surface potential 2φ_F).',
        'High-frequency C–V: capacitance falls from C_ox in accumulation to a minimum in inversion.',
        'C_ox = ε_ox/t_ox.',
      ]],
      ['MOSFET I–V characteristics', [
        'Triode (V_DS < V_GS − V_t): I_D = μC_ox(W/L)[(V_GS − V_t)V_DS − V_DS²/2].',
        'Saturation: I_D = ½μC_ox(W/L)(V_GS − V_t)²(1 + λV_DS). Channel-length modulation gives r_o = 1/(λI_D).',
        'g_m = μC_ox(W/L)(V_GS − V_t) = 2I_D/(V_GS − V_t).',
      ]],
      ['Threshold voltage and body effect', [
        'V_t = V_FB + 2φ_F + √(2qε_sN_A·2φ_F)/C_ox.',
        'Body effect: V_t = V_t0 + γ(√(2φ_F + V_SB) − √(2φ_F)).',
        'Threshold falls as temperature rises; mobility also falls.',
      ]],
    ],
    exam: ['MOSFET region of operation and drain current (NAT).', 'Change in threshold voltage with source-body bias.'],
    traps: ['Checking only V_GS > V_t without checking V_DS for saturation.'],
  },

  fabrication: {
    overview: 'IC fabrication basics: oxidation, diffusion, ion implantation, photolithography, and the twin-tub CMOS process.',
    sections: [
      ['Oxidation and diffusion', [
        'Thermal oxidation: dry O₂ (slow, high-quality gate oxide) or wet H₂O (fast, field oxide). Deal–Grove model: linear then parabolic growth.',
        'About 44% of the oxide thickness consumes silicon.',
        'Diffusion: constant-source (erfc profile) and limited-source (Gaussian) profiles. Diffusion length ≈ 2√(Dt).',
      ]],
      ['Ion implantation', [
        'Precise dose and depth control; Gaussian profile around the projected range. Needs annealing to repair damage and activate dopants.',
        'Channelling is reduced by tilting the wafer.',
      ]],
      ['Photolithography', [
        'Coat, expose through a mask, develop, etch. Positive resist: exposed regions dissolve. Negative resist: exposed regions remain.',
        'Resolution ≈ k₁λ/NA. Wet etching is isotropic; dry (plasma/RIE) etching is anisotropic.',
      ]],
      ['Twin-tub CMOS process', [
        'Separate n-well and p-well optimise both transistors. Steps: wells, isolation (LOCOS or STI), gate oxide, polysilicon gate (self-aligned), source/drain implants, contacts and metal.',
        'Latch-up (parasitic thyristor) is prevented with guard rings, substrate contacts or SOI.',
      ]],
    ],
    exam: ['Order of process steps; which etch is anisotropic.', 'Oxide thickness or silicon consumed (NAT).'],
    traps: ['Confusing positive and negative photoresist behaviour.'],
  },
};
