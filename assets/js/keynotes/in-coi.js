// Offline key notes: IN · Communication & Optical Instrumentation. Modulation is built from the EC notes. Keys are chapter ids.
import { CONTENT as COMM } from './ec-comm.js';

export const CONTENT = {
  modulation: {
    overview: 'Modulation for instrumentation: AM and FM, sampling and PCM, and basic digital modulation.',
    sections: [
      COMM.analog.sections[0], COMM.analog.sections[1],
      ['Sampling and PCM', [
        'Sample at f_s ≥ 2f_m (Nyquist). n bits per sample: 2ⁿ levels; SQNR ≈ 6.02n + 1.76 dB for a full-scale sinusoid.',
        'Bit rate = n·f_s; minimum bandwidth = bit rate/2.',
        'Time-division multiplexing interleaves samples from several channels.',
      ]],
      ['Digital modulation basics', COMM.digital.sections.find((s) => s[0] === 'ASK, FSK, PSK and QAM')[1]],
    ],
    exam: ['Power in an AM signal or Carson bandwidth of FM (NAT).', 'Bit rate and SQNR of a PCM system.'],
    traps: COMM.analog.traps,
  },

  optics: {
    overview: 'Optical sources and detectors: LEDs and lasers, photodiodes and phototransistors, and interferometers.',
    sections: [
      ['LEDs and lasers', [
        'Photon energy E = hc/λ; λ (µm) = 1.24/E (eV). LEDs need direct-gap semiconductors.',
        'LED: spontaneous emission, broad spectrum, incoherent, cheap. Laser: stimulated emission, population inversion, optical cavity; narrow, coherent, directional.',
        'Laser diodes have a threshold current; output rises steeply above it.',
        'He–Ne laser: 632.8 nm. Nd:YAG: 1064 nm.',
      ]],
      ['Photodiodes and phototransistors', [
        'Quantum efficiency η = electrons out / photons in. Responsivity R = ηqλ/(hc) = ηλ(µm)/1.24 A/W.',
        'PIN photodiode: wide intrinsic region, fast, low noise. APD: internal gain by avalanche multiplication, more noise.',
        'Phototransistor: higher sensitivity (current gain) but slower. LDR (photoconductive cell): resistance falls with light; slow.',
        'Photovoltaic mode (zero bias) for solar cells and low noise; photoconductive mode (reverse bias) for speed.',
      ]],
      ['Interferometers', [
        'Michelson: moving one mirror by d changes the path by 2d; number of fringes N = 2d/λ.',
        'Mach–Zehnder and Fabry–Pérot interferometers for sensing and spectroscopy; Fabry–Pérot finesse sets resolution.',
        'Applications: displacement measurement to fractions of a wavelength, refractive index, optical flat testing.',
      ]],
    ],
    exam: ['Responsivity or photocurrent of a photodiode (NAT).', 'Mirror displacement from a fringe count.'],
    traps: ['Counting fringes as d/λ instead of 2d/λ in a Michelson interferometer.'],
  },

  fibre: {
    overview: 'Fibre optics: numerical aperture and acceptance angle, modes, fibre-optic sensing, and losses and dispersion.',
    sections: [
      ['Numerical aperture and modes', [
        'NA = √(n₁² − n₂²) = n₀ sin θ_a (acceptance angle). Relative index difference Δ = (n₁ − n₂)/n₁; NA ≈ n₁√(2Δ).',
        'Critical angle at the core–cladding boundary: sin θ_c = n₂/n₁.',
        'V-number V = (2πa/λ)NA. Single mode if V < 2.405. Number of modes ≈ V²/2 (step index), V²/4 (graded index).',
      ]],
      ['Fibre-optic sensing', [
        'Intensity-modulated (microbend, reflective), phase-modulated (interferometric, very sensitive), wavelength-modulated (fibre Bragg grating: λ_B = 2n_eff Λ).',
        'Immune to EMI, safe in explosive areas, distributed sensing possible (OTDR, Raman/Brillouin).',
      ]],
      ['Losses and dispersion', [
        'Attenuation α(dB) = 10 log(P_in/P_out); dB/km. Low-loss windows: 850 nm, 1310 nm (zero dispersion in standard fibre), 1550 nm (lowest loss ≈ 0.2 dB/km).',
        'Loss mechanisms: absorption, Rayleigh scattering (∝ 1/λ⁴), bending, splice and connector losses.',
        'Intermodal dispersion (multimode): Δt ≈ Ln₁Δ/c (step index); graded index reduces it greatly. Chromatic (material + waveguide) dispersion in single-mode fibre.',
        'Bandwidth–distance product limits bit rate: B ≈ 1/(2Δt).',
      ]],
    ],
    exam: ['NA, acceptance angle or V-number (NAT).', 'Received power after fibre and connector losses.', 'Modal dispersion over a length.'],
    traps: ['Using refractive indices in the wrong order (core n₁ is larger).'],
  },
};
