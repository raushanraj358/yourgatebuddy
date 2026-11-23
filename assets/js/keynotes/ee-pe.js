// Offline key notes: EE · Power Electronics. Keys are chapter ids from data.js.
export const CONTENT = {
  devices: {
    overview: 'Power devices: diodes, thyristors, MOSFETs and IGBTs, how they are triggered and turned off, and their static and switching characteristics.',
    sections: [
      ['Devices compared', [
        '**Power diode:** uncontrolled; reverse recovery time matters at high frequency.',
        '**Thyristor (SCR):** latch-on with a gate pulse; turns off only when current falls below holding current. High power, low frequency.',
        '**GTO:** can be turned off by a negative gate current. **TRIAC:** bidirectional SCR for AC control.',
        '**Power MOSFET:** voltage-controlled, fastest switching, positive temperature coefficient of R_DS(on) (easy paralleling); best at low voltage.',
        '**IGBT:** MOSFET input with bipolar output; medium frequency, high voltage and current.',
      ]],
      ['Triggering and commutation', [
        'SCR turn-on: gate triggering (usual), high dV/dt (unwanted; snubber limits it), over-voltage, temperature, light.',
        'Latching current > holding current. The anode current must reach latching current before the gate pulse ends.',
        '**Natural (line) commutation:** AC supply reverses current. **Forced commutation:** an external circuit reverses it (DC choppers).',
        'Turn-off time t_q: circuit turn-off time must exceed it.',
      ]],
      ['Protection', ['RC snubber limits dV/dt; series inductor limits di/dt; fast fuses for over-current.']],
    ],
    exam: ['Minimum gate pulse width given latching current and di/dt (NAT).', 'Which device suits a given power and frequency?'],
    traps: ['Thinking removing the gate pulse turns an SCR off.'],
  },

  rectifiers: {
    overview: 'Controlled rectifiers: average output voltage for each configuration, the effect of source inductance (overlap), and input power factor and harmonics.',
    sections: [
      ['Single-phase', [
        'Half-wave, R load: V_dc = (V_m/2π)(1 + cos α).',
        'Full converter, continuous current (highly inductive load): V_dc = (2V_m/π) cos α; inverts (negative V_dc) for α > 90°.',
        'Semi-converter: V_dc = (V_m/π)(1 + cos α); cannot invert (freewheeling action).',
      ]],
      ['Three-phase', [
        'Full converter (6-pulse bridge): V_dc = (3√2/π)V_L cos α = (3V_ml/π) cos α ≈ 1.35V_L cos α.',
        'Half-wave (3-pulse): V_dc = (3√3 V_mp/2π) cos α.',
        'Ripple frequency: 6f for a 6-pulse bridge.',
      ]],
      ['Effect of source inductance', [
        'Commutation overlap (angle μ) lowers the average output voltage.',
        'Three-phase bridge: ΔV = (3ωL_s/π)I_d, and cos α − cos(α + μ) = 2ωL_sI_d/(√2 V_L).',
        'Single-phase full converter: ΔV = (2ωL_s/π)I_d = 4fL_sI_d, and cos α − cos(α + μ) = 2ωL_sI_d/V_m.',
      ]],
      ['Power factor and harmonics', [
        'Input power factor = distortion factor × displacement factor (cos α for a full converter).',
        'Square-wave supply current contains harmonics of order 6k ± 1 for a 6-pulse bridge (5th, 7th, 11th, 13th…).',
        'Distortion factor of a square wave = 0.9 (single phase), 0.955 (three-phase six-pulse).',
      ]],
    ],
    exam: ['Average output voltage at a firing angle (NAT).', 'Input power factor of a converter.'],
    traps: ['Using the semi-converter formula for a full converter (or vice versa).'],
  },

  choppers: {
    overview: 'DC–DC converters: buck, boost and buck-boost relations, inductor and capacitor ripple, and continuous vs discontinuous conduction.',
    sections: [
      ['Converter relations (continuous conduction)', [
        'Duty cycle D = t_on/T.',
        '**Buck:** V_o = DV_in.',
        '**Boost:** V_o = V_in/(1 − D).',
        '**Buck-boost:** V_o = −DV_in/(1 − D) (inverted polarity). **Ćuk** has the same ratio with continuous input and output currents.',
        'Derive any of them from inductor volt-second balance: the average inductor voltage over a period is zero.',
      ]],
      ['Ripple', [
        'Buck inductor ripple ΔI = V_o(1 − D)/(fL). Output voltage ripple ΔV = ΔI/(8fC).',
        'Boost capacitor ripple ΔV = I_oD/(fC).',
        'Critical inductance (CCM/DCM boundary) for buck: L_c = (1 − D)R/(2f).',
      ]],
      ['Chopper classes', ['Class A (first quadrant), B (regeneration), C (two-quadrant current), D (two-quadrant voltage), E (four-quadrant).']],
    ],
    exam: ['Output voltage or duty cycle of a converter (NAT).', 'Peak-to-peak inductor current ripple.'],
    traps: ['Forgetting the sign inversion of the buck-boost output.'],
  },

  inverters: {
    overview: 'Inverters: single- and three-phase voltage-source inverters, their output harmonics, and sinusoidal PWM.',
    sections: [
      ['Single-phase', [
        'Half bridge: output ±V_dc/2. Full bridge: ±V_dc.',
        'Square-wave output: fundamental RMS = 0.9V_dc (full bridge) or 0.45V_dc (half bridge); only odd harmonics with amplitude ∝ 1/n.',
        'Quasi-square wave with pulse width 2d eliminates the nth harmonic when nd = 180° (e.g. 120° pulse removes the 3rd).',
      ]],
      ['Three-phase', [
        '180° conduction: phase voltage stepped, line RMS = 0.816V_dc; fundamental line RMS = 0.78V_dc.',
        '120° conduction: line RMS = 0.707V_dc.',
        'Output has no triplen harmonics in the line voltages.',
      ]],
      ['Sinusoidal PWM', [
        'Modulation index m_a = V_ref/V_carrier. Fundamental peak = m_a V_dc/2 (per leg) in the linear region (m_a ≤ 1).',
        'Harmonics move to around the carrier frequency and its multiples, easy to filter.',
        'Over-modulation (m_a > 1) adds low-order harmonics. Third-harmonic injection raises the usable output by about 15%.',
      ]],
    ],
    exam: ['RMS fundamental of a square-wave or quasi-square-wave inverter (NAT).', 'Which harmonics are eliminated for a given pulse width?'],
    traps: ['Mixing peak and RMS values of the fundamental (peak = 4V_dc/π for a full bridge).'],
  },
};
