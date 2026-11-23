// Offline key notes: EE · Control Systems (sections are reused by EC, IN and CH). Keys are chapter ids from data.js.
export const CONTENT = {
  block: {
    overview: 'Block diagrams and signal flow graphs reduce a system to one transfer function. Mason’s gain formula is the fastest route for complex graphs.',
    sections: [
      ['Block diagram reduction', [
        'Series blocks multiply; parallel blocks add. Negative feedback loop: G/(1 + GH); positive feedback: G/(1 − GH).',
        'Moving a take-off point or summing point past a block requires compensating blocks (G or 1/G).',
      ]],
      ["Signal flow graphs and Mason's gain formula", [
        'T = Σ PₖΔₖ / Δ, where Δ = 1 − Σ(loop gains) + Σ(products of two non-touching loops) − Σ(three non-touching) + …',
        'Δₖ = Δ computed with loops touching the k-th forward path removed.',
      ]],
      ['Feedback principles', [
        'Negative feedback reduces sensitivity to G by a factor (1 + GH): S_G^T = 1/(1 + GH). Sensitivity to H is about −1 for large GH.',
        'Feedback increases bandwidth, reduces the effect of disturbances and noise inside the loop, and can affect stability.',
      ]],
    ],
    exam: ['Transfer function of a signal flow graph via Mason’s formula.', 'Sensitivity of the closed-loop gain to a parameter (NAT).'],
    traps: ['Missing a pair of non-touching loops when computing Δ.'],
  },

  time: {
    overview: 'Time response: first- and second-order systems, time-domain specifications, and steady-state errors with the error constants.',
    sections: [
      ['First and second-order systems', [
        'First order 1/(τs + 1): reaches 63.2% in τ; settling ≈ 4τ (2%).',
        'Second order ω_n²/(s² + 2ζω_ns + ω_n²). Damped frequency ω_d = ω_n√(1 − ζ²).',
        'Underdamped 0 < ζ < 1; critically damped ζ = 1; overdamped ζ > 1; undamped ζ = 0 (sustained oscillation).',
      ]],
      ['Time-domain specifications', [
        'Peak time t_p = π/ω_d. Peak overshoot M_p = e^(−πζ/√(1 − ζ²)).',
        'Rise time (0–100%) t_r = (π − θ)/ω_d with θ = cos⁻¹ζ. Settling time ≈ 4/(ζω_n) (2%) or 3/(ζω_n) (5%).',
        'Dominant poles: poles far to the left (5× or more) have little effect.',
      ]],
      ['Steady-state error and error constants', [
        'For unity feedback, e_ss = lim s·R(s)/(1 + G(s)) as s → 0.',
        'K_p = lim G(s), K_v = lim sG(s), K_a = lim s²G(s) as s → 0.',
        'Step: 1/(1 + K_p); ramp: 1/K_v; parabola: 1/K_a.',
        'Type number = number of poles of G(s) at the origin. Type 0 has finite step error; type 1 zero step error and finite ramp error; type 2 zero ramp error.',
      ]],
    ],
    formulas: ['Overshoot 16.3% at ζ = 0.5; 4.3% at ζ = 0.707.', 'Closed-loop poles: −ζω_n ± jω_d.'],
    exam: ['ζ and ω_n from a transfer function, then overshoot or settling time (NAT).', 'Steady-state error for a ramp input.'],
    traps: ['Applying error-constant formulas to non-unity feedback without converting to an equivalent unity loop.', 'Using the final value theorem for an unstable closed loop.'],
  },

  'root-locus': {
    overview: 'Routh–Hurwitz decides stability and the range of gain; the root locus shows how closed-loop poles move as gain varies.',
    sections: [
      ['Routh–Hurwitz criterion', [
        'Number of sign changes in the first column = number of right-half-plane poles.',
        'A zero in the first column: replace with ε and continue. A row of zeros: form the auxiliary polynomial from the row above and use its derivative; its roots are symmetric (often on the jω axis).',
        'The gain K that makes a row zero gives marginal stability; the auxiliary equation gives the oscillation frequency.',
        'Necessary (not sufficient) condition: all coefficients present and of the same sign.',
      ]],
      ['Root locus construction', [
        'Starts at open-loop poles (K = 0), ends at open-loop zeros or infinity (K → ∞). Number of branches = number of poles.',
        'Real-axis segments lie to the left of an odd number of real poles and zeros.',
        'Asymptote angles = (2q + 1)180°/(P − Z); centroid = (Σ poles − Σ zeros)/(P − Z).',
        'Break-away/break-in points: dK/ds = 0. jω-axis crossing from Routh. Angle of departure from complex poles: 180° − Σ angles from other poles + Σ angles from zeros.',
        'Magnitude condition gives K at any point on the locus: K = Π|s − pᵢ|/Π|s − zᵢ|.',
      ]],
    ],
    exam: ['Range of K for stability (NAT).', 'Centroid, asymptote angles or break-away point of a root locus.'],
    traps: ['Forgetting that adding a pole pushes the locus right (less stable) and adding a zero pulls it left.'],
  },

  frequency: {
    overview: 'Frequency response: Bode plots, gain and phase margins, the Nyquist criterion, and lead/lag compensators.',
    sections: [
      ['Bode plots', [
        'A pole at the origin: −20 dB/decade, −90°. A simple real pole: −20 dB/dec after its corner, phase −45° at the corner.',
        'A quadratic pair: −40 dB/dec, phase −90° at ω_n, resonant peak M_r = 1/(2ζ√(1 − ζ²)) for ζ < 0.707 at ω_r = ω_n√(1 − 2ζ²).',
        'A time delay e^(−sT) adds phase −ωT but no magnitude change.',
        'Minimum-phase systems: magnitude determines phase; all poles and zeros in the left half-plane.',
      ]],
      ['Gain and phase margins', [
        'Gain crossover ω_gc: |GH| = 1. Phase crossover ω_pc: ∠GH = −180°.',
        'GM = −20 log|GH(jω_pc)| dB; PM = 180° + ∠GH(jω_gc). Both positive ⇒ stable (minimum-phase).',
        'For a second-order system PM ≈ 100ζ degrees (for ζ < 0.7).',
        'Bandwidth ≈ ω_n√(1 − 2ζ² + √(4ζ⁴ − 4ζ² + 2)).',
      ]],
      ['Nyquist criterion', [
        'Z = N + P: closed-loop RHP poles Z, encirclements N of −1 (clockwise), open-loop RHP poles P. Stable iff Z = 0.',
        'For stable open loop (P = 0), the plot must not encircle −1.',
      ]],
      ['Lead and lag compensators', [
        '**Lead** (zero nearer the origin than the pole): adds phase near crossover, increases PM and bandwidth, faster response. Maximum phase φ_m: sin φ_m = (1 − α)/(1 + α) at ω_m = 1/(T√α).',
        '**Lag**: improves steady-state accuracy (low-frequency gain) with little phase change near crossover; slows the response.',
        'Lead ≈ PD action; lag ≈ PI action.',
      ]],
    ],
    exam: ['Gain or phase margin from a transfer function (NAT).', 'Number of RHP closed-loop poles from a Nyquist plot.', 'Maximum phase lead of a compensator.'],
    traps: ['Counting encirclements in the wrong direction or around the origin instead of −1.'],
  },

  'state-space': {
    overview: 'State-space models: building ẋ = Ax + Bu, solving with the state transition matrix, and testing controllability and observability.',
    sections: [
      ['State-space models', [
        'ẋ = Ax + Bu, y = Cx + Du. Transfer function G(s) = C(sI − A)⁻¹B + D.',
        'Poles of G(s) are eigenvalues of A (unless cancelled). Controllable canonical form puts the characteristic coefficients in the last row of A.',
        'State representation is not unique; similarity transforms keep the eigenvalues.',
      ]],
      ['Solution of state equations', [
        'State transition matrix Φ(t) = e^(At) = L⁻¹{(sI − A)⁻¹}.',
        'x(t) = Φ(t)x(0) + ∫₀ᵗ Φ(t − τ)Bu(τ) dτ. Properties: Φ(0) = I, Φ⁻¹(t) = Φ(−t), Φ(t₁ + t₂) = Φ(t₁)Φ(t₂).',
      ]],
      ['Controllability and observability', [
        'Controllable iff rank [B AB A²B … Aⁿ⁻¹B] = n (Kalman).',
        'Observable iff rank [C; CA; …; CAⁿ⁻¹] = n.',
        'A pole–zero cancellation in G(s) means the realisation is uncontrollable or unobservable.',
        'State feedback u = −Kx can place all poles arbitrarily iff the system is controllable.',
      ]],
    ],
    exam: ['Transfer function from (A, B, C, D) or eigenvalues of A.', 'Is the system controllable / observable? (often with a parameter)'],
    traps: ['Forgetting D in G(s) = C(sI − A)⁻¹B + D.'],
  },
};
