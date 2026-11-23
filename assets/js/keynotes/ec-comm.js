// Offline key notes: EC · Communications (modulation parts are reused by IN). Keys are chapter ids from data.js.
export const CONTENT = {
  random: {
    overview: 'Random variables and processes underpin noise analysis: PDFs, autocorrelation and power spectral density, Gaussian noise, and random signals through LTI systems.',
    sections: [
      ['Random variables and PDFs', [
        'PDF f(x) ≥ 0 and integrates to 1; CDF F(x) = P(X ≤ x). Y = g(X): f_Y(y) = Σ f_X(xᵢ)/|g′(xᵢ)| over roots xᵢ.',
        'Gaussian N(μ, σ²); Q-function Q(x) = P(Z > x). Uniform quantisation error has variance Δ²/12.',
        'Sum of independent RVs: PDFs convolve; means and variances add.',
      ]],
      ['Autocorrelation and PSD', [
        'Wide-sense stationary: constant mean and R(τ) depends only on τ.',
        'Wiener–Khinchin: PSD S(f) = Fourier transform of R(τ). Average power = R(0) = ∫ S(f) df.',
        'R(τ) is even with its maximum at τ = 0.',
      ]],
      ['Gaussian processes and noise', [
        'White noise: S(f) = N₀/2 (two-sided), R(τ) = (N₀/2)δ(τ).',
        'Thermal noise power = kTB. Noise through an ideal low-pass filter of bandwidth B: power N₀B.',
        'Narrowband noise n(t) = n_c(t) cos ω_ct − n_s(t) sin ω_ct; n_c and n_s each have the same power as n(t).',
        'A Gaussian process through an LTI system stays Gaussian.',
      ]],
      ['Random signals through LTI systems', [
        'Output PSD S_y(f) = |H(f)|² S_x(f). Output mean = input mean × H(0).',
        'Noise-equivalent bandwidth B_N = ∫|H(f)|² df / |H(0)|²; for an RC low-pass, B_N = 1/(4RC).',
      ]],
    ],
    exam: ['Output noise power of a filter driven by white noise (NAT).', 'Autocorrelation or PSD of a random-phase sinusoid.'],
    traps: ['Mixing one-sided (N₀) and two-sided (N₀/2) PSD conventions.'],
  },

  analog: {
    overview: 'Analog modulation: AM (DSB-FC, DSB-SC, SSB, VSB), FM and PM, the superheterodyne receiver, and noise performance of AM and FM.',
    sections: [
      ['Amplitude modulation', [
        'AM: s(t) = A_c[1 + μ m(t)] cos ω_ct. Modulation index μ = (A_max − A_min)/(A_max + A_min).',
        'Power: P_t = P_c(1 + μ²/2); efficiency η = μ²/(2 + μ²) (33.3% at μ = 1). Bandwidth 2f_m.',
        'DSB-SC: no carrier, coherent detection. SSB: bandwidth f_m, half the power. VSB: used in TV, between SSB and DSB.',
        'Envelope detector needs μ ≤ 1 and 1/f_c ≪ RC ≪ 1/f_m.',
      ]],
      ['FM and PM', [
        'FM: instantaneous frequency f_c + k_f m(t). Frequency deviation Δf; modulation index β = Δf/f_m.',
        'Carson’s rule: bandwidth ≈ 2(Δf + f_m) = 2f_m(β + 1).',
        'Sideband amplitudes follow Bessel functions Jₙ(β); total power stays A_c²/2. Narrowband FM (β ≪ 1) has bandwidth ≈ 2f_m.',
        'PM: phase φ(t) = k_p m(t). FM of m(t) = PM of ∫m(t).',
      ]],
      ['Superheterodyne receiver', [
        'Mix to a fixed intermediate frequency (455 kHz AM, 10.7 MHz FM). Local oscillator f_LO = f_s + f_IF (usually).',
        'Image frequency f_im = f_s + 2f_IF; rejected by the RF stage. Image rejection ratio α = √(1 + Q²ρ²), ρ = f_im/f_s − f_s/f_im.',
      ]],
      ['SNR of AM and FM', [
        'Figure of merit: DSB-SC and SSB = 1; AM with envelope detection = μ²/(2 + μ²) ≤ 1/3.',
        'FM figure of merit = 3β²/2 (for sinusoidal tone): SNR improves with bandwidth. Threshold effect below a carrier-to-noise level.',
        'Pre-emphasis and de-emphasis improve FM SNR at high audio frequencies.',
      ]],
    ],
    exam: ['Power or efficiency of an AM signal (NAT).', 'Carson’s bandwidth of an FM signal.', 'Image frequency of a superheterodyne receiver.'],
    traps: ['Using peak deviation of the wrong signal when m(t) is scaled; Δf = k_f × max|m(t)|.'],
  },

  digital: {
    overview: 'Digital communication: PCM and quantisation, digital modulation schemes, matched filters and error probability, line codes and ISI.',
    sections: [
      ['PCM and quantisation', [
        'n bits per sample: L = 2ⁿ levels. SQNR for a full-scale sinusoid ≈ 6.02n + 1.76 dB (about 6 dB per bit).',
        'Bit rate = n × sampling rate. Minimum (Nyquist) bandwidth = bit rate/2.',
        'Companding (μ-law, A-law) evens out SQNR across signal levels. Delta modulation: slope overload if step/T_s < max slope of m(t); granular noise if step is too big.',
      ]],
      ['ASK, FSK, PSK and QAM', [
        'BPSK bit error probability P_b = Q(√(2E_b/N₀)). Coherent BFSK and ASK (on–off) need 3 dB more: Q(√(E_b/N₀)).',
        'QPSK has the same bit error rate as BPSK with half the bandwidth.',
        'M-ary schemes carry log₂M bits per symbol; QAM uses amplitude and phase. DPSK needs no carrier recovery.',
        'Bandwidth: BPSK ≈ 2R_b (null-to-null); M-ary PSK reduces it by log₂M.',
      ]],
      ['Matched filter and probability of error', [
        'Matched filter h(t) = s(T − t) maximises output SNR: (SNR)_max = 2E/N₀.',
        'Equivalent to a correlator receiver. For binary signals with distance d: P_e = Q(d/√(2N₀)).',
      ]],
      ['Line coding and ISI', [
        'NRZ, RZ, Manchester (no DC, self-clocking, double bandwidth), AMI (no DC).',
        'Nyquist criterion for zero ISI: sinc pulses at bandwidth R_s/2. Raised cosine with roll-off α: bandwidth (1 + α)R_s/2.',
        'Eye diagram: eye opening shows noise margin; width shows timing sensitivity.',
      ]],
    ],
    exam: ['SQNR or bit rate of a PCM system (NAT).', 'Bandwidth with raised-cosine pulses.', 'BER expression for a modulation scheme.'],
    traps: ['Using the raised-cosine bandwidth formula with the bit rate instead of the symbol rate for M-ary signals.'],
  },

  info: {
    overview: 'Information theory: entropy, mutual information, channel capacity (Shannon–Hartley), source coding and error-control codes.',
    sections: [
      ['Entropy and mutual information', [
        'Self-information I(x) = −log₂ p(x) bits. Entropy H(X) = −Σ p log₂ p; maximum log₂M for equiprobable symbols.',
        'Binary entropy H(p) = −p log p − (1 − p) log(1 − p); maximum 1 bit at p = 0.5.',
        'Mutual information I(X; Y) = H(X) − H(X | Y) = H(Y) − H(Y | X) ≥ 0. H(X, Y) = H(X) + H(Y | X).',
        'Information rate R = r × H bits/s (r symbols/s).',
      ]],
      ['Channel capacity', [
        'Binary symmetric channel with crossover p: C = 1 − H(p).',
        'Shannon–Hartley: C = B log₂(1 + S/N) bits/s. As B → ∞, C → 1.44 S/N₀.',
        'Reliable communication is possible iff R ≤ C. Minimum E_b/N₀ = ln 2 ≈ −1.6 dB.',
      ]],
      ['Source coding', [
        'Average length L ≥ H (Shannon’s source coding theorem). Efficiency = H/L.',
        'Huffman coding is optimal among prefix codes; Shannon–Fano is close. Kraft inequality: Σ 2^(−lᵢ) ≤ 1.',
      ]],
      ['Hamming codes', [
        '(n, k) block code: code rate k/n. Minimum distance d_min: detects d_min − 1, corrects ⌊(d_min − 1)/2⌋ errors.',
        'Hamming (7, 4): d_min = 3, corrects single errors; n = 2ᵐ − 1, k = n − m.',
        'Syndrome s = rHᵀ identifies the error position.',
      ]],
    ],
    exam: ['Entropy or Huffman average length (NAT).', 'Channel capacity of a BSC or an AWGN channel.'],
    traps: ['Using log base 10 or e and forgetting to convert to bits.'],
  },
};
