// Offline key notes: EE · Signals & Systems (also reused by EC and IN). Keys are chapter ids from data.js.
export const CONTENT = {
  lti: {
    overview: 'LTI systems are described completely by their impulse response. Questions test system properties, convolution and stability.',
    sections: [
      ['System properties', [
        '**Linear:** superposition holds (additivity + homogeneity). A system with a constant term (y = 2x + 3) is not linear.',
        '**Time-invariant:** a shift in input gives the same shift in output. y(t) = x(2t) or y(t) = t·x(t) are time-varying.',
        '**Causal:** output depends only on present and past inputs. **Memoryless:** only on the present input.',
        '**Invertible:** distinct inputs give distinct outputs.',
      ]],
      ['Convolution', [
        'y(t) = x(t) ∗ h(t) = ∫ x(τ)h(t − τ) dτ; y[n] = Σ x[k]h[n − k].',
        'Commutative, associative, distributive. x(t) ∗ δ(t − t₀) = x(t − t₀).',
        'Length of the linear convolution of sequences of length N and M: N + M − 1. Support of continuous convolution adds start and end times.',
        'Two rectangular pulses of equal width convolve to a triangle.',
      ]],
      ['Impulse and step response', [
        'Step response s(t) = ∫ h(τ) dτ from −∞ to t; h(t) = ds/dt. In discrete time, h[n] = s[n] − s[n − 1].',
      ]],
      ['BIBO stability and causality', [
        'Stable iff ∫|h(t)| dt < ∞ (Σ|h[n]| < ∞). Causal LTI iff h(t) = 0 for t < 0.',
        'In terms of poles: continuous-time causal systems are stable if all poles are in the left half-plane; discrete-time if inside the unit circle.',
      ]],
    ],
    exam: ['Which of the systems are linear / time-invariant / causal / stable?', 'Value of a convolution at a particular time (NAT).'],
    traps: ['Calling y = x + 1 linear; it fails homogeneity (zero input gives non-zero output).'],
  },

  fourier: {
    overview: 'Fourier series and transforms: coefficients of periodic signals, transform properties and pairs, and Parseval’s theorem for power and energy.',
    sections: [
      ['Fourier series', [
        'x(t) = Σ cₖ e^(jkω₀t), cₖ = (1/T)∫ x(t)e^(−jkω₀t) dt.',
        'Even signal: only cosine terms. Odd: only sine terms. Half-wave symmetry x(t ± T/2) = −x(t): only odd harmonics.',
        'Square wave contains odd harmonics with amplitudes ∝ 1/k; triangle wave ∝ 1/k².',
        'Dirichlet conditions ensure convergence; at a jump the series converges to the midpoint (Gibbs overshoot ≈ 9%).',
      ]],
      ['Fourier transform properties', [
        'Time shift: x(t − t₀) ↔ e^(−jωt₀)X(ω). Frequency shift: e^(jω₀t)x(t) ↔ X(ω − ω₀).',
        'Scaling: x(at) ↔ (1/|a|)X(ω/a). Duality: X(t) ↔ 2πx(−ω).',
        'Differentiation ↔ multiply by jω. Convolution ↔ multiplication.',
        'Real and even x ⇒ X real and even. Real x ⇒ |X| even, phase odd.',
      ]],
      ['Standard pairs', [
        'δ(t) ↔ 1; 1 ↔ 2πδ(ω); e^(−at)u(t) ↔ 1/(a + jω); rect pulse of width T ↔ T sinc(ωT/2π).',
        'cos ω₀t ↔ π[δ(ω − ω₀) + δ(ω + ω₀)]; Gaussian ↔ Gaussian.',
      ]],
      ["Parseval's theorem", [
        'Energy: ∫|x(t)|² dt = (1/2π)∫|X(ω)|² dω. Power of a periodic signal = Σ|cₖ|².',
      ]],
    ],
    exam: ['Fourier transform of a shifted or scaled pulse.', 'Power in specific harmonics of a periodic signal (NAT).'],
    traps: ['Losing the 1/2π factor when switching between ω and f forms.'],
  },

  laplace: {
    overview: 'The Laplace transform turns differential equations into algebra. Questions focus on ROC, inverse transforms, transfer functions and pole–zero locations.',
    sections: [
      ['Properties and ROC', [
        'X(s) = ∫ x(t)e^(−st) dt. ROC is a vertical strip with no poles inside.',
        'Right-sided signal: ROC to the right of the rightmost pole. Left-sided: left of the leftmost. Two-sided: a strip.',
        'The same X(s) with different ROCs gives different signals: e^(−at)u(t) and −e^(−at)u(−t) both have 1/(s + a).',
        'Initial value: x(0⁺) = lim(s→∞) sX(s). Final value: x(∞) = lim(s→0) sX(s), valid only if poles of sX(s) lie in the left half-plane.',
      ]],
      ['Transfer functions, poles and zeros', [
        'H(s) = Y(s)/X(s) with zero initial conditions = Laplace transform of h(t).',
        'Stable and causal ⇔ all poles in the left half-plane (ROC includes the jω axis).',
        'Frequency response H(jω) is H(s) on the jω axis (if the ROC includes it).',
      ]],
    ],
    formulas: ['L{t e^(−at)u(t)} = 1/(s + a)².', 'L{e^(−at)sin ωt u(t)} = ω/((s + a)² + ω²).'],
    exam: ['Inverse Laplace via partial fractions; final value of a response.', 'Which ROC gives a stable or causal system?'],
    traps: ['Applying the final value theorem to an unstable or oscillating system.'],
  },

  z: {
    overview: 'The Z-transform is the discrete-time Laplace: ROC rules, inverse transforms by partial fractions, and stability of difference equations.',
    sections: [
      ['Z-transform and ROC', [
        'X(z) = Σ x[n]z⁻ⁿ. aⁿu[n] ↔ 1/(1 − az⁻¹), ROC |z| > |a|. −aⁿu[−n − 1] ↔ the same, ROC |z| < |a|.',
        'Right-sided: outside the outermost pole. Left-sided: inside the innermost. Two-sided: an annulus.',
        'Shift: x[n − k] ↔ z⁻ᵏX(z). Multiplication by n ↔ −z dX/dz.',
      ]],
      ['Inverse Z-transform', [
        'Partial fractions in z⁻¹ (or X(z)/z), then match standard pairs with the given ROC. Long division gives the first few samples.',
      ]],
      ['Discrete-time systems', [
        'Difference equation → H(z) = Y(z)/X(z). FIR: only zeros (besides poles at z = 0), always stable. IIR: has poles.',
        'Causal and stable ⇔ all poles inside the unit circle. H(e^(jω)) is H(z) on the unit circle.',
        'Initial value: x[0] = lim(z→∞) X(z). Final value: lim(z→1) (z − 1)X(z) if stable.',
      ]],
    ],
    exam: ['Find h[n] from a difference equation; is the system stable?', 'Inverse Z-transform with a given ROC.'],
    traps: ['Ignoring the ROC when inverting; the same expression can be causal or anti-causal.'],
  },

  sampling: {
    overview: 'Sampling theorem: Nyquist rates, aliasing and reconstruction, including the effect of multiplying or squaring signals on bandwidth.',
    sections: [
      ['Nyquist rate', [
        'A signal band-limited to f_m Hz is recovered from samples taken at f_s ≥ 2f_m. Nyquist rate = 2f_m; Nyquist interval = 1/(2f_m).',
        'Bandwidth rules: x²(t) doubles the bandwidth; x₁(t)x₂(t) has bandwidth f₁ + f₂; x₁ ∗ x₂ has min(f₁, f₂); x(at) scales by a.',
        'Band-pass sampling: a signal from f_L to f_H can be sampled at a lower rate (≥ 2 × bandwidth for suitable positions).',
      ]],
      ['Aliasing', [
        'Sampling creates copies of the spectrum at multiples of f_s. If f_s < 2f_m, copies overlap: aliasing.',
        'A tone at f₀ sampled at f_s appears at |f₀ − k f_s| for the k that brings it into [0, f_s/2].',
        'Anti-aliasing filter: low-pass before sampling.',
      ]],
      ['Reconstruction', [
        'Ideal low-pass filter with cutoff between f_m and f_s − f_m (sinc interpolation).',
        'Zero-order hold (flat-top) introduces sinc amplitude distortion (aperture effect).',
      ]],
    ],
    exam: ['Nyquist rate of a product, square or sum of signals (NAT).', 'Apparent frequency of an under-sampled tone.'],
    traps: ['For x(t) = sinc²-type signals, using the sinc bandwidth instead of double it.'],
  },
};
