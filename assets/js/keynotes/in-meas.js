// Offline key notes: IN · Measurements. Built from the EE measurements notes plus instrumentation parts. Keys are chapter ids.
import { CONTENT as M } from './ee-meas.js';

export const CONTENT = {
  bridges: M.bridges,

  instruments: {
    overview: 'Instruments: PMMC and moving-iron meters, digital voltmeters and multimeters, oscilloscopes, Q-meters and spectrum analysers.',
    sections: [
      ...M.instruments.sections,
      ['Q-meter and spectrum analysers', [
        'Q-meter: series resonance; Q = V_C/V_in at resonance. Distributed capacitance found from two resonance readings: C_d = (C₁ − 4C₂)/3 when f₂ = 2f₁.',
        'Spectrum analyser: displays amplitude against frequency (superheterodyne sweep or FFT). Resolution bandwidth sets frequency resolution.',
        'Wave analyser measures individual harmonics; distortion analyser gives total harmonic distortion.',
      ]],
    ],
    exam: [...M.instruments.exam, 'Distributed capacitance of a coil from Q-meter readings.'],
    traps: M.instruments.traps,
  },

  errors: {
    overview: 'Static and dynamic characteristics of instruments, errors and uncertainty, and statistical analysis of readings.',
    sections: [
      ['Static and dynamic characteristics', [
        'Static: accuracy, precision, sensitivity (output/input), resolution, linearity, hysteresis, dead zone, drift.',
        'First-order instruments (thermometer): time constant τ; reaches 63.2% in τ; ramp lag error = rate × τ.',
        'Second-order instruments (galvanometer, accelerometer): ω_n and ζ; ζ ≈ 0.6–0.7 gives fast response with little overshoot.',
        'Dynamic error for a sinusoid in a first-order system: amplitude ratio 1/√(1 + (ωτ)²), phase lag tan⁻¹(ωτ).',
      ]],
      ...M.errors.sections,
      ['Statistical analysis', [
        'Mean x̄; deviation dᵢ = xᵢ − x̄; standard deviation σ = √(Σdᵢ²/(n − 1)) for small samples.',
        'For a Gaussian: 68.3% within ±σ, 95.4% within ±2σ, 99.7% within ±3σ.',
        'Least-squares straight-line fit for calibration curves.',
      ]],
    ],
    exam: ['Limiting error in a computed quantity (NAT).', 'Time-constant lag of a first-order sensor.'],
    traps: M.errors.traps,
  },
};
