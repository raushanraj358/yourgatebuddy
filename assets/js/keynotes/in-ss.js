// Offline key notes: IN · Signals & Systems. Built from the EE and EC signals notes plus digital filters. Keys are chapter ids.
import { CONTENT as SS } from './ee-ss.js';
import { CONTENT as NSS } from './ec-nss.js';

export const CONTENT = {
  lti: SS.lti,

  transforms: {
    overview: 'Transforms: Fourier series and transform, Laplace and Z-transforms, and the DFT and FFT.',
    sections: NSS.transforms.sections.filter((s) => !['Nyquist rate', 'Aliasing', 'Reconstruction'].includes(s[0])),
    formulas: [...SS.laplace.formulas],
    exam: ['Fourier coefficient or transform of a standard signal.', 'Inverse Z-transform with a given ROC.', 'Number of multiplications for an N-point FFT (NAT).'],
    traps: [...SS.fourier.traps, ...SS.z.traps],
  },

  filters: {
    overview: 'Sampling and digital filters: the sampling theorem and aliasing, FIR and IIR filters, and basic filter design methods.',
    sections: [
      ...SS.sampling.sections,
      ['FIR and IIR filters', [
        'FIR: y[n] = Σ bₖx[n − k]; always stable; linear phase if the coefficients are symmetric (or antisymmetric).',
        'IIR: feedback terms (poles); sharper response for the same order; can be unstable; phase is non-linear.',
        'Linear-phase FIR types I–IV by length (odd/even) and symmetry; type II cannot be high-pass, type III and IV are zero at DC.',
        'Moving average (N points) is a simple low-pass FIR with nulls at multiples of f_s/N.',
      ]],
      ['Filter design basics', [
        'FIR by windowing (rectangular, Hamming, Hann, Blackman): wider main lobe trades for lower side lobes.',
        'IIR from analog prototypes (Butterworth: maximally flat; Chebyshev: ripple, sharper; elliptic: sharpest).',
        'Bilinear transform s = (2/T)(1 − z⁻¹)/(1 + z⁻¹) maps the jΩ axis to the unit circle with frequency warping Ω = (2/T) tan(ω/2); no aliasing.',
        'Impulse invariance preserves the impulse response but aliases; suits low-pass filters only.',
        'Butterworth order n ≥ log((10^(0.1A_s) − 1)/(10^(0.1A_p) − 1))/(2 log(Ω_s/Ω_p)).',
      ]],
    ],
    exam: ['Nyquist rate of a signal (NAT).', 'Is a given FIR filter linear phase?', 'Pre-warped analog frequency for the bilinear transform.'],
    traps: ['Forgetting frequency pre-warping when designing with the bilinear transform.'],
  },
};
