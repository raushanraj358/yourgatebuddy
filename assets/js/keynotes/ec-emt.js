// Offline key notes: EC · Electromagnetics. Keys are chapter ids from data.js.
export const CONTENT = {
  maxwell: {
    overview: 'Maxwell’s equations in differential and integral form, boundary conditions at interfaces, and the Poynting vector for power flow.',
    sections: [
      ['Differential and integral forms', [
        '∇ · D = ρᵥ (Gauss); ∇ · B = 0; ∇ × E = −∂B/∂t (Faraday); ∇ × H = J + ∂D/∂t (Ampère–Maxwell).',
        'Integral forms: ∯D·dS = Q; ∯B·dS = 0; ∮E·dl = −dΦ/dt; ∮H·dl = I + d/dt ∬D·dS.',
        'Displacement current density J_d = ∂D/∂t; ratio of conduction to displacement current = σ/(ωε) (loss tangent).',
        'Continuity equation: ∇ · J = −∂ρᵥ/∂t.',
      ]],
      ['Boundary conditions', [
        'Tangential E continuous: E₁t = E₂t. Normal D jumps by surface charge: D₁n − D₂n = ρₛ.',
        'Normal B continuous. Tangential H jumps by surface current: H₁t − H₂t = Kₛ.',
        'At a perfect conductor: tangential E = 0 and normal B = 0 at the surface.',
      ]],
      ['Poynting vector', [
        'P = E × H (W/m²); time-average ⟨P⟩ = ½Re(E × H∗).',
        'Plane wave in free space: ⟨P⟩ = E₀²/(2η₀), η₀ ≈ 120π ≈ 377 Ω.',
      ]],
    ],
    exam: ['Identify a valid field from Maxwell’s equations, or find H from E.', 'Field on the other side of a dielectric boundary.'],
    traps: ['Forgetting the ½ in time-average power for phasor amplitudes.'],
  },

  waves: {
    overview: 'Plane waves: propagation in lossless, lossy and conducting media, skin depth, reflection and transmission at boundaries, and polarisation.',
    sections: [
      ['Wave propagation in media', [
        'γ = α + jβ = √(jωμ(σ + jωε)). Lossless: β = ω√(με), v = 1/√(με), η = √(μ/ε).',
        'Good conductor (σ ≫ ωε): α = β = √(πfμσ); η = (1 + j)√(πfμ/σ) (45° phase).',
        'Wavelength λ = 2π/β. In a dielectric λ = λ₀/√εᵣ.',
      ]],
      ['Skin depth', ['δ = 1/α = 1/√(πfμσ). Fields fall to 1/e (37%) in one skin depth; power to 1/e².', 'Copper at 1 MHz: δ ≈ 66 µm (δ ∝ 1/√f).']],
      ['Reflection and refraction', [
        'Normal incidence: Γ = (η₂ − η₁)/(η₂ + η₁); τ = 1 + Γ = 2η₂/(η₂ + η₁). Reflected power fraction |Γ|².',
        'Standing wave ratio s = (1 + |Γ|)/(1 − |Γ|). A perfect conductor gives Γ = −1.',
        'Snell’s law n₁ sin θ₁ = n₂ sin θ₂. Total internal reflection beyond θ_c = sin⁻¹(n₂/n₁).',
        'Brewster angle (parallel polarisation, no reflection): tan θ_B = √(ε₂/ε₁) for non-magnetic media.',
      ]],
      ['Polarisation', [
        'Linear: components in phase (or 180°). Circular: equal amplitudes, 90° phase difference. Otherwise elliptical.',
        'Handedness by IEEE convention: look along propagation; clockwise rotation is right-hand.',
      ]],
    ],
    exam: ['Skin depth or attenuation in a conductor (NAT).', 'Reflection coefficient and transmitted power fraction.', 'Polarisation type of a given field.'],
    traps: ['Mixing the direction-of-view conventions for circular polarisation.'],
  },

  lines: {
    overview: 'Transmission lines: characteristic impedance, reflection coefficient and VSWR, input impedance, Smith chart and impedance matching.',
    sections: [
      ['Characteristic impedance', [
        'Z₀ = √((R + jωL)/(G + jωC)); lossless Z₀ = √(L/C), v = 1/√(LC).',
        'Coaxial line: Z₀ = (60/√εᵣ) ln(b/a) Ω.',
      ]],
      ['Reflection coefficient and VSWR', [
        'Γ_L = (Z_L − Z₀)/(Z_L + Z₀). VSWR = (1 + |Γ|)/(1 − |Γ|); 1 when matched, ∞ for open/short.',
        'Voltage maxima and minima are λ/4 apart; successive maxima are λ/2 apart.',
        'Return loss = −20 log|Γ| dB.',
      ]],
      ['Input impedance and the Smith chart', [
        'Lossless: Z_in = Z₀(Z_L + jZ₀ tan βl)/(Z₀ + jZ_L tan βl).',
        'Short-circuited line: Z_in = jZ₀ tan βl; open: −jZ₀ cot βl. A λ/2 line repeats the load.',
        'Smith chart: normalised impedance; moving towards the generator rotates clockwise; a full rotation is λ/2.',
      ]],
      ['Impedance matching', [
        'Quarter-wave transformer: Z_in = Z₀²/Z_L, so for a resistive load choose Z₀ = √(Z_in Z_L).',
        'Single-stub matching cancels the susceptance at the point where the normalised conductance is 1.',
      ]],
    ],
    exam: ['VSWR or input impedance of a line (NAT).', 'Characteristic impedance of a quarter-wave matching section.'],
    traps: ['Using electrical length in degrees vs radians inconsistently in tan βl.'],
  },

  waveguides: {
    overview: 'Rectangular waveguide modes and cut-off frequencies, and antenna parameters, dipoles and arrays.',
    sections: [
      ['Rectangular waveguide modes', [
        'Cut-off f_c(m,n) = (c/2)√((m/a)² + (n/b)²) for an air-filled guide (a > b).',
        'Dominant mode TE₁₀: f_c = c/(2a). TM modes need m, n ≥ 1 (lowest TM₁₁). No TEM mode in a hollow guide.',
        'Guide wavelength λ_g = λ/√(1 − (f_c/f)²). Phase velocity > c, group velocity < c, v_pv_g = c².',
        'Wave impedance: TE Z = η/√(1 − (f_c/f)²); TM Z = η√(1 − (f_c/f)²). Below cut-off, modes are evanescent.',
      ]],
      ['Antenna gain and directivity', [
        'Directivity D = 4πU_max/P_rad. Gain G = efficiency × D. Effective aperture A_e = Gλ²/(4π).',
        'Friis: P_r = P_tG_tG_r(λ/(4πR))². Radiation resistance R_r = 2P_rad/|I₀|².',
        'Beamwidth narrows as aperture grows; HPBW ≈ 70λ/D degrees for a dish.',
      ]],
      ['Dipoles and arrays', [
        'Hertzian (short) dipole: D = 1.5, R_r = 80π²(dl/λ)². Half-wave dipole: D = 1.64, R_r ≈ 73 Ω.',
        'Array factor multiplies the element pattern (pattern multiplication).',
        'Uniform linear array with spacing d and progressive phase α: ψ = βd cos θ + α. Broadside α = 0; end-fire α = −βd.',
      ]],
    ],
    exam: ['Cut-off frequency of a mode or the number of propagating modes (NAT).', 'Received power using Friis’ equation.', 'Directivity or radiation resistance of a dipole.'],
    traps: ['Assuming TM₁₀ exists; TM modes need both indices non-zero.'],
  },
};
