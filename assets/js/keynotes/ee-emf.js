// Offline key notes: EE · Electromagnetic Fields. Keys are chapter ids from data.js.
export const CONTENT = {
  gauss: {
    overview: 'Coulomb’s and Gauss’s laws give the electric field of charge distributions. Symmetry (spherical, cylindrical, planar) makes Gauss’s law the fastest route.',
    sections: [
      ["Coulomb's law and field", [
        'F = q₁q₂/(4πε₀r²) along the line joining the charges; E = F/q.',
        'Point charge: E = Q/(4πε₀r²). Infinite line charge λ: E = λ/(2πε₀r). Infinite sheet σ: E = σ/(2ε₀), independent of distance.',
        '1/(4πε₀) ≈ 9 × 10⁹ N m²/C²; ε₀ ≈ 8.854 × 10⁻¹² F/m.',
      ]],
      ["Gauss's law", [
        '∯ D · dS = Q_enclosed; differential form ∇ · D = ρᵥ.',
        'Inside a uniformly charged solid sphere: E ∝ r. Inside a conducting shell or conductor: E = 0.',
        'Just outside a conductor: E = σ/ε₀, normal to the surface.',
      ]],
      ['Divergence theorem applications', [
        '∯ D · dS = ∭ ∇ · D dV. Use it to find the enclosed charge from a given D field.',
      ]],
    ],
    formulas: ['D = εE = ε₀εᵣE.', 'Flux through a closed surface = Q/ε₀ (in free space).'],
    exam: ['Field at a point from symmetric charge distributions.', 'Total charge enclosed given D (NAT).'],
    traps: ['Using the sheet result σ/(2ε₀) next to a conductor, where it is σ/ε₀.'],
  },

  potential: {
    overview: 'Electric potential, dielectrics and stored energy: computing V from E (and back), polarisation, boundary conditions and capacitor energy.',
    sections: [
      ['Potential and gradient', [
        'V = −∫ E · dl; E = −∇V. The electrostatic field is conservative (∇ × E = 0).',
        'Point charge: V = Q/(4πε₀r). Equipotential surfaces are perpendicular to field lines.',
        'Poisson: ∇²V = −ρ/ε; Laplace: ∇²V = 0 in charge-free regions.',
      ]],
      ['Dielectrics and polarisation', [
        'P = ε₀χₑE; εᵣ = 1 + χₑ. Bound charge densities: ρ_b = −∇ · P, σ_b = P · n.',
        'Boundary conditions: tangential E is continuous; normal D jumps by the free surface charge (continuous if none).',
      ]],
      ['Energy in electric fields', [
        'Energy density w = ½εE² = ½D · E. Total W = ½∭ εE² dV.',
        'Capacitor energy = ½CV² = Q²/(2C).',
      ]],
    ],
    exam: ['Potential difference between two points from a given field.', 'Field in a dielectric across a boundary.'],
    traps: ['Forgetting the minus sign in E = −∇V.'],
  },

  magnetostatics: {
    overview: 'Biot–Savart and Ampère’s laws give magnetic fields of currents; Faraday’s law gives induced EMF; the Lorentz force acts on moving charges.',
    sections: [
      ['Biot–Savart law', [
        'dH = I dl × â_R/(4πR²).',
        'Infinite straight wire: B = μ₀I/(2πr). Centre of a circular loop: B = μ₀I/(2a). Finite wire: B = μ₀I(sin α₂ − sin α₁)/(4πr).',
      ]],
      ["Ampère's law", [
        '∮ H · dl = I_enclosed; ∇ × H = J (+ ∂D/∂t in time-varying fields).',
        'Long solenoid: B = μ₀nI inside, ≈ 0 outside. Toroid: B = μ₀NI/(2πr).',
        'No magnetic monopoles: ∇ · B = 0.',
      ]],
      ["Faraday's law", [
        'EMF = −dΦ/dt (Lenz: the induced current opposes the change). Motional EMF = (v × B) · l, i.e. Blv.',
        '∇ × E = −∂B/∂t.',
      ]],
      ['Lorentz force', [
        'F = q(E + v × B). Force on a current element: F = I L × B.',
        'Force per metre between parallel wires: μ₀I₁I₂/(2πd); attractive for currents in the same direction.',
      ]],
    ],
    exam: ['Magnetic field at a point due to a wire or loop.', 'Induced EMF in a moving or rotating conductor.'],
    traps: ['Mixing H (A/m) and B (T); B = μH.'],
  },

  inductance: {
    overview: 'Capacitance and inductance of standard geometries and the energy they store.',
    sections: [
      ['Capacitance', [
        'Parallel plate: C = εA/d. Coaxial cable: C = 2πεL/ln(b/a). Isolated sphere: C = 4πεa.',
        'Concentric spheres: C = 4πε ab/(b − a). Two-wire line: C ≈ πεL/ln(d/a) (d ≫ a).',
        'Dielectrics in series layers add like capacitors in series; side-by-side like parallel.',
      ]],
      ['Self and mutual inductance', [
        'L = NΦ/I. Solenoid: L = μN²A/l. Coaxial cable (external): L = (μL/2π) ln(b/a). Toroid: L = μN²h ln(b/a)/(2π) (rectangular section).',
        'Mutual inductance M = k√(L₁L₂), 0 ≤ k ≤ 1. Series aiding: L₁ + L₂ + 2M; opposing: L₁ + L₂ − 2M.',
      ]],
      ['Stored energy', ['Magnetic energy W = ½LI²; energy density ½μH² = B²/(2μ).']],
    ],
    exam: ['Capacitance per unit length of a coaxial cable (NAT).', 'Equivalent inductance of coupled coils.'],
    traps: ['Using ln(a/b) instead of ln(b/a) (outer over inner).'],
  },
};
