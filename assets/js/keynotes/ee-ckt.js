// Offline key notes: EE · Electric Circuits (also reused by EC and IN). Keys are chapter ids from data.js.
export const CONTENT = {
  theorems: {
    overview: 'Network theorems are the toolkit for every circuits question: nodal and mesh analysis, Thevenin/Norton equivalents, superposition and maximum power transfer.',
    sections: [
      ['Nodal and mesh analysis', [
        'KCL: currents leaving a node sum to zero. KVL: voltages around a loop sum to zero.',
        'Nodal analysis needs (n − 1) equations for n nodes; a voltage source between two non-reference nodes forms a supernode.',
        'Mesh analysis works for planar circuits; a current source shared by two meshes forms a supermesh.',
      ]],
      ['Thevenin and Norton', [
        'V_th = open-circuit voltage; I_N = short-circuit current; R_th = V_th/I_N.',
        'With only independent sources, R_th = resistance seen with voltage sources shorted and current sources opened.',
        'With dependent sources, apply a test source at the terminals (do not kill dependent sources).',
      ]],
      ['Superposition', [
        'In a linear circuit, the response is the sum of responses to each independent source acting alone (others killed).',
        'Does not apply to power (power is not linear in current).',
      ]],
      ['Maximum power transfer', [
        'DC: R_L = R_th gives P_max = V_th²/(4R_th), with 50% efficiency.',
        'AC: Z_L = Z_th∗ (complex conjugate). If only a resistive load is allowed, R_L = |Z_th|.',
      ]],
    ],
    formulas: ['Star–delta: R_Y = R_aR_b/(R_a + R_b + R_c); R_Δ = (R₁R₂ + R₂R₃ + R₃R₁)/R_opposite.', 'Voltage divider: V₁ = V R₁/(R₁ + R₂). Current divider: I₁ = I R₂/(R₁ + R₂).'],
    exam: ['Thevenin equivalent of a circuit with a dependent source.', 'Maximum power delivered to a load (NAT).'],
    traps: ['Killing dependent sources when finding R_th.', 'Using superposition to add powers.'],
  },

  transients: {
    overview: 'Transient analysis: first-order RL/RC responses, second-order RLC damping, and initial and final conditions just after switching.',
    sections: [
      ['First-order circuits', [
        'Any first-order response: x(t) = x(∞) + [x(0⁺) − x(∞)]e^(−t/τ).',
        'τ = RC for RC circuits; τ = L/R for RL circuits, with R the Thevenin resistance seen by C or L.',
        'After 5τ the response is within 1% of its final value.',
      ]],
      ['Initial and final conditions', [
        'Capacitor voltage and inductor current cannot change instantly (with finite sources).',
        'At t = 0⁺: an uncharged capacitor acts as a short; an unenergised inductor acts as an open circuit.',
        'At steady DC (t → ∞): capacitor is open, inductor is short.',
      ]],
      ['Second-order RLC', [
        'Series RLC: α = R/(2L), ω₀ = 1/√(LC). Parallel RLC: α = 1/(2RC).',
        'ζ = α/ω₀. ζ > 1 overdamped, ζ = 1 critically damped, ζ < 1 underdamped with ω_d = √(ω₀² − α²).',
      ]],
    ],
    formulas: ['Energy stored: ½CV² in a capacitor, ½LI² in an inductor.', 'Series RLC is critically damped when R = 2√(L/C).'],
    exam: ['Capacitor voltage or inductor current at a given time after switching (NAT).', 'Damping condition of an RLC circuit.'],
    traps: ['Using the source resistance only for τ instead of the full Thevenin resistance seen by the element.'],
  },

  ac: {
    overview: 'Sinusoidal steady state: phasors and impedance, real/reactive/apparent power and power factor, and series and parallel resonance.',
    sections: [
      ['Phasors and impedance', [
        'Z_R = R, Z_L = jωL, Z_C = 1/(jωC) = −j/(ωC). In an inductor current lags voltage by 90°; in a capacitor it leads.',
        'Use RMS phasors for power: V_rms = V_m/√2 for a sinusoid.',
      ]],
      ['AC power and power factor', [
        'S = VI∗ = P + jQ. P = V I cos φ (W), Q = V I sin φ (VAR), |S| = VI (VA).',
        'Power factor = cos φ = P/|S|; lagging for inductive loads.',
        'Power-factor correction: a shunt capacitor supplies Q_C = P(tan φ₁ − tan φ₂); C = Q_C/(ωV²).',
      ]],
      ['Resonance', [
        'Series: X_L = X_C at ω₀ = 1/√(LC); impedance minimum (= R), current maximum. Q = ω₀L/R = 1/(ω₀CR). Bandwidth = ω₀/Q = R/L.',
        'Parallel (ideal): impedance maximum at ω₀; Q = R/(ω₀L) = ω₀CR.',
        'Voltage across L or C in series resonance is Q times the source voltage.',
      ]],
    ],
    formulas: ['Half-power frequencies satisfy ω₁ω₂ = ω₀².', 'Average power in a resistor = V_rms²/R.'],
    exam: ['Complex power and power factor of a load (NAT).', 'Resonant frequency, Q and bandwidth.'],
    traps: ['Using peak values in power formulas meant for RMS.', 'Getting the sign of Q wrong: inductive loads absorb positive reactive power.'],
  },

  'two-port': {
    overview: 'Two-port networks: the Z, Y, h and ABCD parameter sets, their conditions for reciprocity and symmetry, and how interconnections combine.',
    sections: [
      ['Parameter sets', [
        'Z (open-circuit impedance): V = ZI. Y (short-circuit admittance): I = YV.',
        'h (hybrid): V₁ = h₁₁I₁ + h₁₂V₂, I₂ = h₂₁I₁ + h₂₂V₂ (used for transistors).',
        'ABCD (transmission): V₁ = AV₂ − BI₂, I₁ = CV₂ − DI₂ (I₂ into port 2).',
      ]],
      ['Reciprocity and symmetry', [
        'Reciprocal: Z₁₂ = Z₂₁; Y₁₂ = Y₂₁; h₁₂ = −h₂₁; AD − BC = 1.',
        'Symmetric: Z₁₁ = Z₂₂; Y₁₁ = Y₂₂; Δh = 1; A = D.',
      ]],
      ['Interconnections', [
        'Series–series: Z parameters add. Parallel–parallel: Y parameters add.',
        'Series–parallel: h parameters add. Cascade: ABCD matrices multiply.',
      ]],
    ],
    formulas: ['T-network with series arms Z₁, Z₂ and shunt Z₃: Z₁₁ = Z₁ + Z₃, Z₂₂ = Z₂ + Z₃, Z₁₂ = Z₂₁ = Z₃.'],
    exam: ['Find a parameter matrix of a given T or π network.', 'Overall ABCD of cascaded sections.'],
    traps: ['Sign convention for I₂ in ABCD parameters (current leaving port 2 is −I₂).'],
  },

  'three-phase': {
    overview: 'Three-phase circuits: star and delta relations, balanced power, and the two-wattmeter method.',
    sections: [
      ['Star and delta', [
        'Star: V_L = √3 V_ph (line voltage leads phase voltage by 30° for positive sequence); I_L = I_ph.',
        'Delta: V_L = V_ph; I_L = √3 I_ph.',
        'Balanced delta load Z_Δ is equivalent to a star load Z_Y = Z_Δ/3.',
      ]],
      ['Balanced power', ['P = √3 V_L I_L cos φ; Q = √3 V_L I_L sin φ; S = √3 V_L I_L.', 'Total instantaneous power in a balanced three-phase system is constant.']],
      ['Two-wattmeter method', [
        'P = W₁ + W₂ for any three-wire load (balanced or not).',
        'Balanced load: tan φ = √3 (W₁ − W₂)/(W₁ + W₂).',
        'At power factor 0.5 one wattmeter reads zero; below 0.5 one reads negative. At unity pf they read equal.',
      ]],
    ],
    formulas: ['W₁ = V_L I_L cos(30° − φ), W₂ = V_L I_L cos(30° + φ) for a lagging balanced load.'],
    exam: ['Power factor from two wattmeter readings (NAT).', 'Line current for a delta-connected load.'],
    traps: ['Using phase voltage in √3 V_L I_L formulas.'],
  },
};
