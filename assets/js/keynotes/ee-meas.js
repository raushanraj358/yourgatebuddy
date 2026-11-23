// Offline key notes: EE · Electrical & Electronic Measurements (also reused by IN). Keys are chapter ids from data.js.
export const CONTENT = {
  bridges: {
    overview: 'Bridges measure R, L, C and frequency by balancing to a null. Learn each bridge’s balance equations and what it is best for.',
    sections: [
      ['DC bridges', [
        '**Wheatstone:** balance when P/Q = R/S; for medium resistances (1 Ω to a few MΩ). Sensitivity is highest with equal arms.',
        '**Kelvin double bridge:** low resistances (< 1 Ω); eliminates lead and contact resistance.',
        'High resistances: loss-of-charge method or megger.',
      ]],
      ['AC bridges', [
        'General balance: Z₁Z₄ = Z₂Z₃ (both magnitude and phase must balance).',
        '**Maxwell inductance–capacitance:** medium-Q coils (1 < Q < 10); L = R₂R₃C₁.',
        '**Hay’s bridge:** high-Q coils (Q > 10).',
        '**Anderson:** precise inductance over a wide range. **Owen:** inductance using a capacitor.',
        '**Schering:** capacitance and dissipation factor (tan δ) of insulation, especially at high voltage.',
        '**Wien:** frequency measurement; balance at f = 1/(2π√(R₁R₂C₁C₂)) (f = 1/(2πRC) for equal arms); also the basis of the Wien oscillator.',
        '**De Sauty:** compares two lossless capacitors.',
      ]],
    ],
    exam: ['Unknown L, R or C at balance from given arm values (NAT).', 'Which bridge suits high-Q coils or insulation loss?'],
    traps: ['Applying Maxwell’s bridge to high-Q coils (it needs a huge R and is hard to balance); use Hay’s bridge.'],
  },

  instruments: {
    overview: 'Indicating instruments, instrument transformers, oscilloscopes and digital voltmeters: what each measures and how it responds to AC, DC and waveform shape.',
    sections: [
      ['Analogue instruments', [
        '**PMMC:** DC only; reads the average value; linear scale; high accuracy. Range extension by shunt (ammeter) R_sh = R_m/(m − 1) or series multiplier (voltmeter) R_se = R_m(m − 1).',
        '**Moving iron:** AC and DC; reads RMS; non-linear (square-law) scale.',
        '**Electrodynamometer:** AC and DC; reads true RMS; used as a wattmeter.',
        'Rectifier-type meters respond to the average but are calibrated in RMS for sine waves (form factor 1.11), so they misread non-sinusoidal waves.',
        'Voltmeter sensitivity = 1/I_fsd Ω/V; loading error is high when the meter resistance is comparable to the circuit resistance.',
      ]],
      ['Instrument transformers (CT and PT)', [
        'CT secondary must never be opened under load (dangerous voltage and core saturation). Ratio and phase-angle errors come from the magnetising current.',
        'PT works like a step-down transformer on almost open-circuit.',
      ]],
      ['Oscilloscopes and digital voltmeters', [
        'Lissajous figures: f_y/f_x = (horizontal tangencies)/(vertical tangencies). Phase from an ellipse: sin φ = Y-intercept/Y-max.',
        'Rise time and bandwidth: t_r ≈ 0.35/BW. Probe compensation: 10:1 probes need adjustment for flat response.',
        'DVM types: ramp, dual-slope integrating (rejects mains noise, slow), successive approximation (fast).',
        'An n-digit display resolution is 1/10ⁿ; a 3½-digit meter counts to 1999.',
      ]],
    ],
    exam: ['Reading of PMMC, MI and rectifier meters for a given waveform (NAT).', 'Shunt or multiplier resistance for range extension.'],
    traps: ['Assuming a PMMC reads RMS; it reads the average (zero for pure AC).'],
  },

  power: {
    overview: 'Power and energy measurement: wattmeter connections and errors, energy meter constants and creep, and three-phase power measurement.',
    sections: [
      ['Wattmeters', [
        'Electrodynamometer wattmeter: current coil in series, pressure coil across the load; reads V I cos φ.',
        'Errors from pressure-coil inductance (reads high at lagging pf) and from coil power consumption; compensated windings correct the latter.',
        'Low power factor wattmeters are designed for small deflecting torque.',
      ]],
      ['Energy meters', [
        'Induction-type energy meter: meter constant in rev/kWh. Errors: creep (rotation at no load, prevented by holes in the disc), phase and friction errors.',
        'Percentage error = (recorded − true)/true × 100, using energy computed from the disc revolutions.',
      ]],
      ['Three-phase power', [
        'n-wire system needs n − 1 wattmeters (Blondel’s theorem).',
        'Two-wattmeter method: P = W₁ + W₂; tan φ = √3(W₁ − W₂)/(W₁ + W₂) for balanced loads.',
        'One-wattmeter method works only for balanced loads with an accessible neutral (or using the reactive connection for VAR).',
      ]],
    ],
    exam: ['Error of an energy meter from revolutions counted in a test (NAT).', 'Power factor from two wattmeter readings.'],
    traps: ['Forgetting that a wattmeter reading can be negative at low power factor in the two-wattmeter method.'],
  },

  errors: {
    overview: 'Error analysis: types of errors, accuracy versus precision, and combining errors (limiting and probable).',
    sections: [
      ['Types of errors', [
        '**Gross:** human mistakes. **Systematic:** instrumental, environmental, observational; repeatable and correctable. **Random:** unpredictable; reduced by averaging.',
        'Accuracy: closeness to the true value. Precision: closeness of repeated readings to each other. Resolution: smallest detectable change.',
        'Error quoted as a percentage of full scale grows as a percentage of the reading at low readings: measure near full scale.',
      ]],
      ['Limiting errors', [
        'Sum or difference: absolute errors add. Product or quotient: relative (percentage) errors add.',
        'Power: relative error of xⁿ = n × relative error of x.',
      ]],
      ['Probable error', [
        'For independent random errors, combine in quadrature: e = √(e₁² + e₂² + …) (for products, use relative errors).',
        'Probable error of a single reading = 0.6745σ. Standard deviation of the mean = σ/√n.',
      ]],
    ],
    exam: ['Limiting error in a computed quantity like power I²R (NAT).', 'Percentage error at a low reading of a meter specified on full scale.'],
    traps: ['Adding absolute errors in a product; use relative errors.'],
  },
};
