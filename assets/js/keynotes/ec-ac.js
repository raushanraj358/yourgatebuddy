// Offline key notes: EC · Analog Circuits. Keys are chapter ids from data.js.
import { CONTENT as ADE } from './ee-ade.js';

export const CONTENT = {
  diodes: {
    overview: 'Diode circuits: clippers and clampers, rectifiers with filters, and Zener regulators. Use the piecewise-linear model and check each diode’s state.',
    sections: [
      ['Clipping and clamping', [
        'Clipper: a diode with a reference voltage limits the output above or below a level. Assume a state, solve, and check the assumption.',
        'Clamper: a capacitor and diode shift the waveform so that its peak sits at a reference; the peak-to-peak value is unchanged (needs RC ≫ period).',
        'Voltage doubler: output ≈ 2V_m.',
      ]],
      ['Rectifiers', ADE.devices.sections[0][1]],
      ['Zener regulators', [
        'Zener in reverse breakdown holds V_Z. Series resistor R_s = (V_in − V_Z)/(I_Z + I_L).',
        'Design for the worst case: minimum input with maximum load must keep I_Z ≥ I_Z,min; maximum input with minimum load must keep P_Z ≤ rating.',
        'Line regulation and load regulation improve with a smaller Zener resistance r_z.',
      ]],
    ],
    exam: ['Output waveform or value of a clipper/clamper.', 'Range of load current or R_s for a Zener regulator (NAT).'],
    traps: ['Forgetting to check whether the Zener is actually in breakdown (input may be too low).'],
  },

  amplifiers: {
    overview: 'Transistor amplifiers are high-weightage: biasing, small-signal models for CE/CB/CC (and CS/CG/CD), frequency response, differential pairs and current mirrors.',
    sections: [
      ['BJT and MOSFET biasing', [
        'Voltage-divider (self) bias gives the most stable Q-point. Check that the BJT is in active region (V_CE > V_CE,sat) or the MOSFET in saturation.',
        'Thermal runaway is prevented with emitter degeneration.',
      ]],
      ['Small-signal analysis', [
        'BJT hybrid-π: g_m = I_C/V_T, r_π = β/g_m, r_o = V_A/I_C. MOSFET: g_m = 2I_D/V_ov, no r_π (infinite).',
        'CE/CS: A_v = −g_m(R_C ∥ r_o); with emitter resistor R_E: ≈ −R_C/(R_E + 1/g_m).',
        'CB/CG: non-inverting gain ≈ g_mR_C; input resistance ≈ 1/g_m (low).',
        'CC/CD (follower): gain ≈ 1; output resistance ≈ 1/g_m; input resistance ≈ β R_E for a BJT.',
        'Miller effect: a capacitance C between input and output of an inverting gain −A appears at the input as C(1 + A).',
      ]],
      ['Frequency response', [
        'Low-frequency cutoff from coupling and bypass capacitors; high-frequency cutoff from device capacitances (C_π, C_μ).',
        'Unity-gain frequency f_T = g_m/(2π(C_π + C_μ)). Gain × bandwidth is roughly constant.',
        'Cascading n identical stages shrinks bandwidth: f_H,n = f_H√(2^(1/n) − 1).',
      ]],
      ['Differential amplifiers and current mirrors', [
        'Differential gain A_d = g_mR_C (single-ended g_mR_C/2). Common-mode gain A_c ≈ −R_C/(2R_EE). CMRR = |A_d/A_c|, improved by a current-source tail.',
        'Basic current mirror: I_out ≈ I_ref (BJT: I_ref/(1 + 2/β)). Widlar and Wilson mirrors improve output resistance or allow small currents.',
      ]],
    ],
    exam: ['Voltage gain, input or output resistance of an amplifier stage (NAT).', 'Mid-band gain and cutoff frequency.', 'CMRR of a differential pair.'],
    traps: ['Forgetting r_o in parallel with the load when it is given.', 'Using V_T-based g_m for MOSFETs.'],
  },

  opamp: {
    overview: 'Op-amp circuits: inverting and non-inverting amplifiers, integrators and differentiators, active filters, comparators and Schmitt triggers.',
    sections: [
      ...ADE.opamps.sections,
      ['Comparators and Schmitt trigger', [
        'Open-loop comparator: output saturates to ±V_sat depending on which input is higher.',
        'Inverting Schmitt trigger with feedback divider R₁ (to ground) and R₂ (to output): thresholds ±V_sat R₁/(R₁ + R₂); hysteresis = 2V_sat R₁/(R₁ + R₂).',
        'Astable multivibrator with an op-amp: T = 2RC ln((1 + β)/(1 − β)), β = R₁/(R₁ + R₂).',
      ]],
    ],
    exam: ['Output of an op-amp circuit (NAT).', 'Threshold voltages and hysteresis of a Schmitt trigger.'],
    traps: ['Applying virtual short in comparator or Schmitt trigger circuits (positive feedback).'],
  },

  oscillators: {
    overview: 'Feedback topologies and oscillators: how each feedback type changes impedances, the Barkhausen criterion, standard oscillator frequencies, and power amplifier classes.',
    sections: [
      ['Feedback topologies', [
        'Closed-loop gain A_f = A/(1 + Aβ); desensitivity (1 + Aβ). Bandwidth increases and distortion falls by the same factor.',
        'Series mixing (voltage input) raises input impedance; shunt mixing lowers it. Voltage sampling lowers output impedance; current sampling raises it.',
        'Topologies: series–shunt (voltage amplifier), shunt–series (current), series–series (transconductance), shunt–shunt (transresistance).',
      ]],
      ['Barkhausen criterion', ['Sustained oscillation needs loop gain |Aβ| = 1 and total phase shift 0° (or 360°). In practice start with |Aβ| slightly above 1.']],
      ['RC, LC and crystal oscillators', [
        'RC phase-shift: f = 1/(2πRC√6), gain ≥ 29. Wien bridge: f = 1/(2πRC), gain 3.',
        'Colpitts: f = 1/(2π√(L C_eq)), C_eq = C₁C₂/(C₁ + C₂). Hartley: f = 1/(2π√((L₁ + L₂ + 2M)C)).',
        'Crystal: very high Q; series and parallel resonance close together; excellent frequency stability.',
      ]],
      ['Power amplifiers', [
        'Class A: conducts 360°, max efficiency 25% (resistive load) or 50% (transformer coupled).',
        'Class B: 180° each, push–pull, max efficiency π/4 ≈ 78.5%; crossover distortion.',
        'Class AB: slightly more than 180°, removes crossover distortion. Class C: < 180°, tuned RF amplifiers, efficiency approaching 100%.',
      ]],
    ],
    exam: ['Oscillation frequency of Colpitts/Hartley/RC circuits (NAT).', 'Input/output resistance with a given feedback type.', 'Efficiency of a class B stage.'],
    traps: ['Using 50% for class A with a resistive (non-transformer) load; it is 25%.'],
  },
};
