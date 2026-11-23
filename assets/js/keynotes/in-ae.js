// Offline key notes: IN · Analog Electronics. Built from the EE and EC electronics notes plus instrumentation parts. Keys are chapter ids.
import { CONTENT as ADE } from './ee-ade.js';
import { CONTENT as AC } from './ec-ac.js';

export const CONTENT = {
  devices: {
    overview: 'Diodes and transistors: diode circuits, BJT and MOSFET biasing, and small-signal amplifiers.',
    sections: [AC.diodes.sections[0], AC.diodes.sections[2], ADE.devices.sections[1], AC.amplifiers.sections[1], ADE.devices.sections[3]],
    exam: ['Output of a diode clipper or Zener regulator.', 'Q-point and voltage gain of an amplifier (NAT).'],
    traps: [...ADE.devices.traps],
  },

  opamps: {
    overview: 'Op-amps: ideal and practical characteristics, amplifiers, integrators and differentiators, the instrumentation amplifier, and comparators.',
    sections: [
      ...ADE.opamps.sections.slice(0, 3),
      ['Instrumentation amplifier', [
        'Three-op-amp form: two non-inverting buffers then a difference amplifier. Gain = (1 + 2R/R_G)(R₃/R₂); one resistor R_G sets the gain.',
        'Very high input impedance and high CMRR; ideal for bridge and transducer outputs.',
        'CMRR is limited by resistor matching in the difference stage.',
      ]],
      AC.opamp.sections.find((s) => s[0] === 'Comparators and Schmitt trigger'),
    ],
    exam: ['Gain of an instrumentation amplifier (NAT).', 'Output of an op-amp circuit or Schmitt trigger thresholds.'],
    traps: [...ADE.opamps.traps],
  },

  filters: {
    overview: 'Active filters, oscillators and precision rectifiers.',
    sections: [
      ['Butterworth active filters', [
        'Butterworth: maximally flat passband; |H| = 1/√(1 + (ω/ω_c)²ⁿ); roll-off 20n dB/decade; −3 dB at ω_c for every order.',
        'Sallen–Key second-order low-pass with equal R and C: f_c = 1/(2πRC), Q set by gain (Butterworth Q = 0.707 needs gain 1.586).',
        'Higher orders cascade second-order sections (plus one first-order section for odd orders).',
        'High-pass by swapping R and C; band-pass by cascading or multiple-feedback topologies.',
      ]],
      ['Oscillators', AC.oscillators.sections.find((s) => s[0] === 'RC, LC and crystal oscillators')[1].concat(['Barkhausen criterion: loop gain |Aβ| = 1 and phase 0° (360°).'])],
      ['Precision rectifiers', [
        'An op-amp with diodes in the feedback loop rectifies signals smaller than a diode drop (the diode drop is divided by the open-loop gain).',
        'Half-wave precision rectifier output follows the input for one polarity; full-wave (absolute value) circuits use two op-amps.',
        'Peak detector: diode plus capacitor inside the loop holds the peak value.',
      ]],
    ],
    exam: ['Cutoff frequency or gain of an active filter (NAT).', 'Oscillation frequency of an RC oscillator.'],
    traps: ['Assuming a higher-order Butterworth filter has a different −3 dB frequency; all orders are −3 dB at ω_c.'],
  },
};
