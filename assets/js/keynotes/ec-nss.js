// Offline key notes: EC · Networks, Signals & Systems. Built from the EE circuits and signals notes plus EC-specific parts.
import { CONTENT as CKT } from './ee-ckt.js';
import { CONTENT as SS } from './ee-ss.js';

const join = (overview, parts, extra = {}) => ({
  overview,
  sections: [...parts.flatMap((p) => p.sections), ...(extra.sections || [])],
  formulas: [...parts.flatMap((p) => p.formulas || []), ...(extra.formulas || [])],
  exam: [...parts.flatMap((p) => p.exam || []), ...(extra.exam || [])].slice(0, 4),
  traps: [...parts.flatMap((p) => p.traps || []), ...(extra.traps || [])],
});

export const CONTENT = {
  theorems: join('Network theorems and two-port networks: nodal and mesh analysis, Thevenin/Norton, superposition, maximum power transfer, and Z/Y/h/ABCD parameters.', [CKT.theorems, CKT['two-port']]),

  transients: join('Transient analysis of RL, RC and RLC circuits, solving circuits in the Laplace (s) domain, and resonance.', [CKT.transients], {
    sections: [
      ['Laplace-domain circuit analysis', [
        'Replace R → R, L → sL with a series source −Li(0⁻) (or parallel i(0⁻)/s), C → 1/(sC) with a series source v(0⁻)/s.',
        'Solve algebraically, then invert with partial fractions. Initial and final value theorems check the answer quickly.',
      ]],
      ['Resonance', CKT.ac.sections.find((s) => s[0] === 'Resonance')[1]],
    ],
  }),

  signals: join('Continuous and discrete signals: classification, operations, LTI systems and convolution, causality and stability.', [SS.lti], {
    sections: [
      ['Signal classification and operations', [
        'Energy signal: finite energy, zero power. Power signal: finite non-zero power (periodic signals). Some are neither (e.g. a ramp).',
        'Even part (x(t) + x(−t))/2; odd part (x(t) − x(−t))/2.',
        'x(at − b): shift first by b, then scale by a (or scale then shift by b/a). Discrete-time decimation x[2n] loses samples.',
        'Sum of two periodic signals is periodic iff the ratio of periods is rational; period = LCM. A discrete sinusoid cos(ω₀n) is periodic only if ω₀/2π is rational.',
        'δ(at) = δ(t)/|a|; ∫ x(t)δ(t − t₀) dt = x(t₀) (sifting).',
      ]],
    ],
  }),

  transforms: join('Fourier, Laplace and Z-transforms, the DTFT and DFT, and the sampling theorem.', [SS.fourier, SS.laplace, SS.z, SS.sampling], {
    sections: [
      ['DTFT and DFT', [
        'DTFT X(e^(jω)) is periodic in ω with period 2π.',
        'N-point DFT samples the DTFT at ω = 2πk/N. Multiplication of DFTs ↔ circular convolution.',
        'Linear convolution of lengths L and M via DFT needs N ≥ L + M − 1 (zero-pad).',
        'Radix-2 FFT needs (N/2) log₂N complex multiplications versus N² for direct DFT.',
        'DFT of a real sequence is conjugate symmetric: X[N − k] = X∗[k].',
      ]],
    ],
  }),
};
