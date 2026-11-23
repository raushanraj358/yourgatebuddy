// Offline key notes: EE · Analog & Digital Electronics. Keys are chapter ids from data.js.
export const CONTENT = {
  devices: {
    overview: 'Diodes and BJTs: rectifiers and clippers, transistor biasing and stability, small-signal amplifiers, and MOSFET basics.',
    sections: [
      ['Rectifiers and clippers', [
        'Half-wave: V_dc = V_m/π, ripple factor 1.21, PIV = V_m. Full-wave: V_dc = 2V_m/π, ripple 0.482; PIV = 2V_m (centre-tap) or V_m (bridge).',
        'Capacitor filter: ripple V_r ≈ I_dc/(fC) for half-wave, I_dc/(2fC) for full-wave.',
        'Clippers cut off part of the waveform; clampers shift its DC level (peak-to-peak preserved).',
      ]],
      ['BJT biasing', [
        'Active region: BE forward, CB reverse biased. I_C = βI_B, I_E = (β + 1)I_B, α = β/(β + 1).',
        'Voltage-divider bias is the most stable (stability factor S close to 1); fixed bias is the least stable (S = β + 1).',
        'Q-point from the DC load line: V_CE = V_CC − I_C(R_C + R_E).',
      ]],
      ['Small-signal amplifiers', [
        'g_m = I_C/V_T (V_T ≈ 26 mV at room temperature); r_π = β/g_m.',
        'Common emitter: A_v ≈ −g_m R_C (without R_E), ≈ −R_C/R_E with an unbypassed emitter resistor.',
        'CE: high voltage and current gain, phase inversion. CB: low input impedance, unity current gain. CC (emitter follower): voltage gain ≈ 1, buffer.',
      ]],
      ['MOSFET basics', [
        'Saturation: I_D = ½μ_nC_ox(W/L)(V_GS − V_t)² when V_DS ≥ V_GS − V_t. Triode below that.',
        'g_m = 2I_D/(V_GS − V_t) = √(2μ_nC_ox(W/L)I_D). Very high input resistance.',
      ]],
    ],
    exam: ['Output of a diode circuit for a given input (sketch or value).', 'Q-point and voltage gain of a BJT amplifier (NAT).'],
    traps: ['Using V_T = 26 mV for MOSFET g_m.', 'Forgetting the 0.7 V drop (or two drops in a bridge).'],
  },

  opamps: {
    overview: 'Op-amps are heavily asked: ideal-op-amp analysis with virtual short, standard configurations, integrators/differentiators, filters and oscillators.',
    sections: [
      ['Ideal op-amp', [
        'Infinite gain, infinite input impedance, zero output impedance, infinite bandwidth. With negative feedback, V₊ = V₋ (virtual short) and input currents are zero.',
        'Real op-amp limits: gain–bandwidth product (constant), slew rate (max dV/dt), offset voltage and bias currents, CMRR.',
        'Full-power bandwidth f = SR/(2πV_m).',
      ]],
      ['Amplifiers', [
        'Inverting: A = −R_f/R₁, input impedance R₁. Non-inverting: A = 1 + R_f/R₁, very high input impedance. Voltage follower: A = 1.',
        'Summing amplifier: V_o = −R_f(V₁/R₁ + V₂/R₂ + …). Difference amplifier with matched ratios: V_o = (R_f/R₁)(V₂ − V₁).',
        'Closed-loop bandwidth = GBW/(1 + R_f/R₁) (noise gain).',
      ]],
      ['Integrators and differentiators', [
        'Integrator: V_o = −(1/RC)∫V_in dt; a square wave in gives a triangle out. Practical: resistor across C limits low-frequency gain.',
        'Differentiator: V_o = −RC dV_in/dt; noisy at high frequency; practical: series resistor with C.',
      ]],
      ['Active filters and oscillators', [
        'First-order low-pass cutoff f_c = 1/(2πRC). Sallen–Key second-order sections; Butterworth has a maximally flat passband (Q = 0.707).',
        'RC phase-shift oscillator: f = 1/(2πRC√6), needs gain ≥ 29. Wien bridge: f = 1/(2πRC), needs gain = 3.',
        'Schmitt trigger: hysteresis with thresholds set by positive feedback; converts noisy signals to clean square waves.',
      ]],
    ],
    exam: ['Output voltage of an op-amp circuit with several inputs (NAT).', 'Frequency and gain condition of an oscillator.'],
    traps: ['Applying virtual short to an op-amp used as a comparator (no negative feedback).'],
  },

  digital: {
    overview: 'Combinational and sequential logic plus data converters: logic simplification, MUX/decoder design, flip-flops and counters, and ADC/DAC resolution.',
    sections: [
      ['Logic gates and Boolean algebra', [
        'NAND and NOR are universal. De Morgan: (AB)′ = A′ + B′; (A + B)′ = A′B′.',
        'K-maps group 1s in powers of two; don’t-cares help make bigger groups.',
      ]],
      ['Multiplexers and decoders', [
        'A 2ⁿ:1 MUX implements any n-variable function (or n + 1 variables with the extra variable on the data inputs).',
        'An n-to-2ⁿ decoder with an OR gate implements any function as a sum of minterms.',
      ]],
      ['Flip-flops and counters', [
        'D: Q⁺ = D. T: Q⁺ = T ⊕ Q. JK: Q⁺ = JQ′ + K′Q.',
        'Ripple counters are slow (delays add); synchronous counters clock all stages together. Ring counter: n states; Johnson: 2n.',
        'A mod-N ripple counter divides the clock frequency by N.',
      ]],
      ['ADC and DAC', [
        'n-bit DAC resolution = V_FS/(2ⁿ − 1) (or V_ref/2ⁿ, depending on the definition used in the question).',
        'R-2R ladder uses only two resistor values; weighted-resistor DAC needs a wide range of values.',
        'Flash ADC: 2ⁿ − 1 comparators, fastest. SAR: n clock cycles per conversion. Dual-slope: slow, accurate, rejects noise. Counter-type: up to 2ⁿ clocks.',
        'Quantisation error is ±½ LSB.',
      ]],
    ],
    exam: ['Function realised by a MUX circuit.', 'DAC output for a given digital input or ADC conversion time (NAT).'],
    traps: ['Mixing the 2ⁿ and 2ⁿ − 1 resolution definitions; follow the question’s full-scale value.'],
  },

  micro: {
    overview: '8085 microprocessor basics: architecture, registers and flags, instruction types and addressing modes, and timing.',
    sections: [
      ['8085 architecture', [
        '8-bit data bus, 16-bit address bus (64 KB memory). Lower address byte multiplexed with data (AD0–AD7), separated using ALE.',
        'Registers: accumulator A, B, C, D, E, H, L (pairs BC, DE, HL), stack pointer and program counter (16-bit).',
        'Flags: sign, zero, auxiliary carry, parity, carry.',
        'Interrupts: TRAP (non-maskable, highest priority), RST 7.5, RST 6.5, RST 5.5, INTR.',
      ]],
      ['Instructions and addressing modes', [
        'Modes: immediate (MVI A, 05H), register (MOV A, B), direct (LDA 2050H), register indirect (MOV A, M uses HL), implied (CMA).',
        'Data transfer, arithmetic, logical, branch and machine-control groups.',
        'Stack grows downwards: PUSH decrements SP by 2; CALL pushes the return address.',
        'T-states: each machine cycle takes 3–6 T-states; time = T-states × clock period.',
      ]],
    ],
    exam: ['Contents of registers or flags after a short program.', 'Execution time of a delay loop (NAT).'],
    traps: ['Forgetting that INR/DCR do not change the carry flag.'],
  },
};
