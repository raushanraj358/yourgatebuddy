// Offline key notes: EE · Power Systems. Keys are chapter ids from data.js.
export const CONTENT = {
  lines: {
    overview: 'Transmission line parameters and performance: R, L, C of lines, short/medium/long line models, ABCD constants, Ferranti effect and corona.',
    sections: [
      ['Line parameters', [
        'Inductance per phase (transposed, single circuit): L = 2 × 10⁻⁷ ln(GMD/GMR) H/m, with GMR = 0.7788r for a solid conductor.',
        'Capacitance to neutral: C = 2πε₀/ln(GMD/r) F/m (uses the actual radius, not GMR).',
        'Bundling conductors raises GMR: lower L, higher C, higher surge impedance loading, less corona.',
        'Surge impedance Z_c = √(L/C) ≈ 400 Ω for overhead lines; SIL = V_L²/Z_c.',
      ]],
      ['Short, medium and long lines', [
        'Short (< 80 km): series impedance only; A = D = 1, B = Z, C = 0.',
        'Medium (80–250 km): nominal π: A = D = 1 + YZ/2, B = Z, C = Y(1 + YZ/4).',
        'Long (> 250 km): A = D = cosh γl, B = Z_c sinh γl, C = sinh(γl)/Z_c.',
        'For any passive reciprocal network, AD − BC = 1; symmetrical lines have A = D.',
      ]],
      ['Ferranti effect and corona', [
        'Ferranti effect: at light load or no load, receiving-end voltage exceeds sending-end voltage because of line charging current; V_R = V_S/A at no load.',
        'Corona: ionisation of air when surface gradient exceeds about 30 kV/cm (peak) at NTP. Reduced by larger diameter and bundling. Peek’s formula gives corona loss.',
      ]],
    ],
    formulas: ['Phase velocity on a lossless line ≈ 1/√(LC) ≈ speed of light for overhead lines.', 'Regulation = (V_R,no-load − V_R,full-load)/V_R,full-load, with V_R,no-load = V_S/|A|.'],
    exam: ['ABCD constants or receiving-end voltage at no load (NAT).', 'Effect of bundling on L, C and SIL.'],
    traps: ['Using GMR in the capacitance formula; capacitance uses the conductor radius.'],
  },

  'load-flow': {
    overview: 'Load flow: forming Y_bus, bus types, Gauss–Seidel and Newton–Raphson methods, and the per-unit system.',
    sections: [
      ['Bus admittance matrix', [
        'Yᵢᵢ = sum of admittances connected to bus i (including shunts). Yᵢⱼ = −(admittance between i and j).',
        'Y_bus is symmetric (without phase shifters) and sparse. Removing a line changes four entries.',
      ]],
      ['Bus types', [
        '**Slack bus:** V and δ specified (balances losses). **PV (generator) bus:** P and |V| specified. **PQ (load) bus:** P and Q specified.',
        'Unknowns in NR (polar form): δ at all non-slack buses and |V| at PQ buses; Jacobian size (2n_PQ + n_PV) square.',
      ]],
      ['Solution methods', [
        '**Gauss–Seidel:** simple, little memory per iteration, slow (linear) convergence; iterations grow with system size; acceleration factor ≈ 1.6.',
        '**Newton–Raphson:** quadratic convergence, few iterations nearly independent of size; costs a Jacobian per iteration.',
        '**Fast decoupled:** uses P–δ and Q–V decoupling with constant matrices; fast and robust for high X/R lines.',
      ]],
      ['Per-unit system', [
        'Z_base = V_base²/S_base. Change of base: Z_new = Z_old × (S_new/S_old) × (V_old/V_new)².',
        'Per-unit impedance of a transformer is the same referred to either side.',
      ]],
    ],
    exam: ['Form Y_bus for a small network; size of the Jacobian.', 'Per-unit impedance on a new base (NAT).'],
    traps: ['Forgetting line-charging shunt admittance on the diagonal.'],
  },

  faults: {
    overview: 'Fault analysis: symmetrical three-phase faults with Thevenin impedance, symmetrical components, and LG, LL and LLG fault currents.',
    sections: [
      ['Symmetrical faults', [
        'Fault current = V_prefault/Z_th at the faulted bus (per unit). Fault MVA = base MVA / Z_pu (for 1 pu prefault voltage).',
        'Sub-transient, transient and steady-state reactances X″ < X′ < X_d.',
      ]],
      ['Symmetrical components', [
        'Operator a = 1∠120°. V_a = V₀ + V₁ + V₂; V₁ = (V_a + aV_b + a²V_c)/3; V₂ = (V_a + a²V_b + aV_c)/3; V₀ = (V_a + V_b + V_c)/3.',
        'Zero-sequence current flows only with a ground path; for a transformer it depends on the winding connection (Y-grounded vs Δ).',
        'Neutral impedance Z_n appears as 3Z_n in the zero-sequence network.',
      ]],
      ['Unsymmetrical faults', [
        '**LG:** sequence networks in series: I_a1 = I_a2 = I_a0 = E/(Z₁ + Z₂ + Z₀ + 3Z_f); I_f = 3I_a1.',
        '**LL:** positive and negative networks in parallel: I_a1 = −I_a2 = E/(Z₁ + Z₂ + Z_f); no zero sequence. |I_f| = √3 |I_a1|.',
        '**LLG:** all three in parallel (positive in series with the parallel combination of negative and zero(+3Z_f)).',
        'For a solidly grounded generator with Z₀ small, LG fault current can exceed the three-phase fault current.',
      ]],
    ],
    exam: ['LG or LL fault current in per unit or amperes (NAT).', 'Sequence components of a given set of phasors.'],
    traps: ['Forgetting the factor 3 on Z_f or Z_n in LG faults.'],
  },

  protection: {
    overview: 'Protection: relay types and settings, differential protection, distance relays, and circuit-breaker quantities.',
    sections: [
      ['Over-current relays', [
        'Plug setting multiplier PSM = fault current (secondary) / (plug setting × relay rated current).',
        'Operating time = TMS × time from the relay curve at that PSM. IDMT: inverse definite minimum time.',
        'Coordinate downstream to upstream with a grading margin (about 0.3–0.5 s).',
      ]],
      ['Distance relays', [
        'Measure impedance V/I. Impedance relay (circle at origin, non-directional), mho (directional, through origin, good for long lines), reactance relay (insensitive to arc resistance, short lines).',
        'Zones: zone 1 ≈ 80–90% of the line (instantaneous), zone 2 ≈ 120–150% (delayed), zone 3 backup.',
      ]],
      ['Differential protection', [
        'Operates on the difference of currents entering and leaving the protected zone (Merz–Price).',
        'Percentage (biased) differential adds restraint against CT mismatch. Transformer CTs are connected Δ on the Y side (and vice versa) to correct phase shift.',
        'Harmonic restraint (second harmonic) prevents tripping on magnetising inrush.',
      ]],
      ['Circuit breakers', [
        'Restriking voltage oscillates at f_n = 1/(2π√(LC)) and peaks at about 2V_m after π√(LC) seconds, so average RRRV = 2V_m/(π√(LC)).',
        'Breaking current is RMS at contact separation; making current = 2.55 × symmetrical breaking current (peak).',
        'SF₆ and vacuum breakers dominate at high and medium voltage respectively.',
      ]],
    ],
    exam: ['Operating time of an IDMT relay (NAT).', 'Making current of a breaker.', 'Which relay suits long / short lines?'],
    traps: ['Using primary current in the PSM formula without dividing by the CT ratio.'],
  },

  stability: {
    overview: 'Stability and economic dispatch: swing equation, equal area criterion for transient stability, steady-state limit, and equal incremental cost dispatch.',
    sections: [
      ['Swing equation', [
        '(2H/ω_s) d²δ/dt² = P_m − P_e (per unit), with H the inertia constant in MJ/MVA.',
        'Combining machines: H_eq = Σ Hᵢ Sᵢ/S_base for machines swinging together.',
        'Steady-state limit P_max = EV/X; small-signal oscillation frequency ω_n = √((ω_s/2H) P_max cos δ₀).',
      ]],
      ['Equal area criterion', [
        'Stable if the decelerating area (above P_m after clearing) can equal the accelerating area.',
        'Critical clearing angle for a three-phase fault at the generator bus with P_e = 0 during the fault: cos δ_cr = (π − 2δ₀) sin δ₀ − cos δ₀ (when post-fault P_max is the same as pre-fault).',
        'Faster clearing (lower clearing angle) improves stability.',
      ]],
      ['Economic load dispatch', [
        'Neglecting losses: all units run at equal incremental cost λ = dCᵢ/dPᵢ, within their limits.',
        'With losses: dCᵢ/dPᵢ × Lᵢ = λ, with penalty factor Lᵢ = 1/(1 − ∂P_L/∂Pᵢ).',
      ]],
    ],
    exam: ['Critical clearing angle (NAT).', 'Optimal sharing of load between two units with quadratic costs.'],
    traps: ['Mixing H on machine base with system base without converting.'],
  },
};
