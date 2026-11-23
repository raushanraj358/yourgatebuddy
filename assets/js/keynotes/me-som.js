// Offline key notes: ME · Mechanics of Materials (also reused by CE). Keys are chapter ids from data.js.
export const CONTENT = {
  stress: {
    overview: 'Stress and strain: elastic constants, Mohr’s circle for plane stress, thermal stresses, and thin cylinders.',
    sections: [
      ["Elastic constants and Hooke's law", [
        'σ = Eε (within the proportional limit). E = 2G(1 + ν) = 3K(1 − 2ν). For metals ν ≈ 0.25–0.33; ν ≤ 0.5.',
        'Volumetric strain = ε_x + ε_y + ε_z. Bar under axial load: δ = PL/(AE).',
        'Tapered bar: δ = 4PL/(πEd₁d₂). Bar hanging under self-weight: δ = ρgL²/(2E).',
        'Strain energy per volume = σ²/(2E). Suddenly applied load gives twice the gradual stress; impact adds more.',
      ]],
      ["Mohr's circle", [
        'Centre (σ_x + σ_y)/2, radius R = √(((σ_x − σ_y)/2)² + τ_xy²).',
        'Principal stresses σ₁,₂ = centre ± R; maximum in-plane shear = R, on planes at 45° to principal planes.',
        'Principal planes: tan 2θ_p = 2τ_xy/(σ_x − σ_y); no shear on principal planes.',
        'Pure shear τ: principal stresses ±τ. Equal biaxial σ: circle shrinks to a point (no shear in plane).',
        'Absolute maximum shear (3-D) = (σ_max − σ_min)/2 including σ₃ = 0 for plane stress.',
      ]],
      ['Thermal stresses', [
        'Free expansion δ = αLΔT. Fully restrained: σ = EαΔT.',
        'Partially restrained (gap Δ): σ = E(αLΔT − Δ)/L. Composite bars: compatibility of strains plus force balance.',
      ]],
      ['Thin cylinders', [
        'Hoop stress σ_h = pd/(2t); longitudinal σ_l = pd/(4t). Thin sphere: pd/(4t).',
        'Volumetric strain of a cylinder = (pd/(4tE))(5 − 4ν).',
        'Thin if d/t > 20 (approx.).',
      ]],
    ],
    exam: ['Principal stresses or maximum shear from a stress state (NAT).', 'Thermal stress in a constrained bar.'],
    traps: ['Forgetting σ₃ = 0 when finding absolute maximum shear in plane stress.'],
  },

  sfd: {
    overview: 'Shear force and bending moment diagrams, bending stresses, and shear stress distribution in beams.',
    sections: [
      ['SFD and BMD', [
        'dV/dx = −w (load intensity); dM/dx = V. Maximum moment where shear is zero (or changes sign).',
        'Simply supported, central point load P: M_max = PL/4. UDL w: M_max = wL²/8. Cantilever with end load: PL at the fixed end; UDL: wL²/2.',
        'Point of contraflexure: where M changes sign (in overhanging beams).',
        'A couple causes a jump in the BMD; a point load causes a jump in the SFD.',
      ]],
      ['Bending stresses', [
        'Flexure formula: σ = My/I; M/I = σ/y = E/R. Section modulus Z = I/y_max.',
        'Rectangle: I = bd³/12, Z = bd²/6. Circle: I = πd⁴/64, Z = πd³/32.',
        'Neutral axis passes through the centroid (pure bending, linear elastic).',
      ]],
      ['Shear stresses in beams', [
        'τ = VQ/(Ib), Q = first moment of area beyond the point.',
        'Rectangle: parabolic, τ_max = 1.5 τ_avg at the neutral axis. Circle: τ_max = (4/3)τ_avg.',
        'I-section: web carries most of the shear force; flanges carry most of the bending moment.',
      ]],
    ],
    exam: ['Maximum bending moment or its location (NAT).', 'Ratio of maximum to average shear stress.'],
    traps: ['Sign convention mix-ups when reading moments from the SFD area.'],
  },

  torsion: {
    overview: 'Torsion of circular shafts, combined bending and torsion, and helical springs.',
    sections: [
      ['Torsion of circular shafts', [
        'T/J = τ/r = Gθ/L. Solid shaft J = πd⁴/32; hollow J = π(D⁴ − d⁴)/32.',
        'τ_max = 16T/(πd³) for a solid shaft. Power P = 2πNT/60.',
        'Torsional stiffness GJ/L. Shafts in series: angles add; in parallel: torques add.',
        'A hollow shaft is stronger and stiffer per unit weight than a solid one.',
      ]],
      ['Combined bending and torsion', [
        'Equivalent moment M_e = ½(M + √(M² + T²)) (maximum principal stress theory).',
        'Equivalent torque T_e = √(M² + T²) (maximum shear stress theory).',
      ]],
      ['Springs', [
        'Close-coiled helical spring: τ = 8WD/(πd³) (× Wahl factor for curvature), deflection δ = 8WD³n/(Gd⁴).',
        'Stiffness k = Gd⁴/(8D³n). Springs in series: 1/k = Σ1/kᵢ; in parallel: k = Σkᵢ.',
        'Spring index C = D/d. Wahl factor K = (4C − 1)/(4C − 4) + 0.615/C.',
      ]],
    ],
    exam: ['Diameter of a shaft for given power and allowable stress (NAT).', 'Spring stiffness or deflection.'],
    traps: ['Using radius for diameter in J or in τ = 16T/(πd³).'],
  },

  deflection: {
    overview: 'Deflection of beams by double integration, Macaulay’s method, moment–area theorems, and energy methods (Castigliano).',
    sections: [
      ['Double integration', [
        'EI d²y/dx² = M(x). Integrate twice and apply boundary conditions (zero deflection at supports, zero slope at a fixed end).',
      ]],
      ["Macaulay's method", ['Write one moment equation with bracket terms ⟨x − a⟩ that are zero when negative; integrate brackets as wholes.']],
      ['Moment–area method', [
        'Change in slope between two points = area of M/EI diagram between them.',
        'Tangential deviation = first moment of that area about the point where deviation is measured.',
      ]],
      ['Standard results', [
        'Cantilever, end load P: δ = PL³/(3EI), slope PL²/(2EI). UDL w: δ = wL⁴/(8EI), slope wL³/(6EI). End moment M: δ = ML²/(2EI).',
        'Simply supported, central load: δ = PL³/(48EI), end slope PL²/(16EI). UDL: δ = 5wL⁴/(384EI).',
        'Fixed–fixed, central load: δ = PL³/(192EI); UDL: wL⁴/(384EI).',
      ]],
      ['Strain energy and Castigliano', [
        'U = ∫M²/(2EI) dx (bending) + ∫T²/(2GJ) dx + ∫P²/(2AE) dx.',
        'Castigliano: deflection at a load = ∂U/∂P; slope = ∂U/∂M (add a dummy load if needed).',
        "Maxwell's reciprocal theorem: deflection at A due to a unit load at B equals deflection at B due to a unit load at A.",
      ]],
    ],
    exam: ['Deflection or slope at a point (NAT).', 'Ratio of deflections for different support conditions.'],
    traps: ['Forgetting the 5 in 5wL⁴/(384EI) for a simply supported beam under UDL.'],
  },

  columns: {
    overview: 'Columns: Euler’s critical load, effective length for end conditions, slenderness, and the Rankine formula for intermediate columns.',
    sections: [
      ["Euler's buckling load", [
        'P_cr = π²EI_min/L_e². Buckling occurs about the axis of minimum moment of inertia.',
        'Critical stress = π²E/λ², with slenderness ratio λ = L_e/r_min, r = √(I/A).',
        'Valid only for long columns where the critical stress is below the proportional limit.',
      ]],
      ['Effective length', [
        'Both ends pinned: L_e = L. Fixed–free: 2L. Fixed–pinned: L/√2 ≈ 0.7L. Fixed–fixed: L/2.',
        'So P_cr ratios (pinned = 1): fixed–free 1/4, fixed–pinned 2, fixed–fixed 4.',
      ]],
      ['Rankine formula', [
        '1/P_R = 1/P_c + 1/P_E, i.e. P = σ_cA/(1 + a(L_e/r)²) with Rankine constant a = σ_c/(π²E).',
        'Covers short (crushing) to long (buckling) columns.',
      ]],
    ],
    exam: ['Euler load for given end conditions (NAT).', 'Ratio of buckling loads for different supports.'],
    traps: ['Using I_max instead of I_min.'],
  },
};
