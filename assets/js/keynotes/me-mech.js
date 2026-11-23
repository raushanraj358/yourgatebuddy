// Offline key notes: ME · Engineering Mechanics (also reused by CE). Keys are chapter ids from data.js.
export const CONTENT = {
  fbd: {
    overview: 'Free-body diagrams and equilibrium: isolating a body, writing equilibrium equations, analysing trusses and frames, and the principle of virtual work.',
    sections: [
      ['Equilibrium of rigid bodies', [
        'Planar equilibrium: ΣF_x = 0, ΣF_y = 0, ΣM = 0 about any point (three independent equations).',
        'Two-force member: forces equal, opposite, collinear along the member. Three-force member: forces concurrent (or parallel).',
        "Lami's theorem for three concurrent forces: F₁/sin α = F₂/sin β = F₃/sin γ (angles opposite each force).",
        'Supports: roller (1 reaction), pin/hinge (2), fixed (3 including a moment).',
      ]],
      ['Trusses and frames', [
        'Simple truss is statically determinate when m = 2j − 3 (m members, j joints).',
        '**Method of joints:** equilibrium at each pin. **Method of sections:** cut through at most three unknown members and take moments.',
        'Zero-force members: at an unloaded joint with two non-collinear members, both are zero; with three members, two collinear, the third is zero.',
        'Frames and machines have multi-force members: dismember and use action–reaction pairs.',
      ]],
      ['Virtual work', [
        'For a body in equilibrium, total virtual work of external forces for any virtual displacement is zero: ΣF·δr + ΣM·δθ = 0.',
        'Useful for mechanisms with one degree of freedom (linkages, jacks) without finding internal forces.',
      ]],
    ],
    exam: ['Force in a particular truss member (NAT).', 'Reaction at a support for a beam or frame.'],
    traps: ['Wrong sense assumed for a member force: a negative answer means compression if tension was assumed.'],
  },

  friction: {
    overview: 'Friction: Coulomb’s laws, impending motion on planes and wedges, and belt friction.',
    sections: [
      ['Laws of friction', [
        'Limiting friction F = μN, independent of contact area and (nearly) of speed. μ_kinetic < μ_static.',
        'Angle of friction φ: tan φ = μ. Angle of repose = φ for a block on an inclined plane.',
        'On an incline θ: force to push up (parallel) = W(sin θ + μ cos θ); to hold from sliding down = W(sin θ − μ cos θ).',
        'Least force to drag a block on a horizontal plane acts at angle φ above horizontal: P_min = W sin φ.',
      ]],
      ['Belt and wedge friction', [
        'Belt (flat): T₁/T₂ = e^(μθ), θ in radians (wrap angle). V-belt: T₁/T₂ = e^(μθ/sin(β/2)) with groove angle β.',
        'Centrifugal tension T_c = mv²; maximum power when T_c = T_max/3.',
        'Wedges: draw FBDs of each block with friction opposing impending motion; self-locking if the wedge stays when the force is removed.',
        'Screw jack: efficiency η = tan α/tan(α + φ); self-locking when φ > α, so η < 50%.',
      ]],
    ],
    exam: ['Minimum force to move a block or the belt tension ratio (NAT).', 'Is a wedge or screw self-locking?'],
    traps: ['Using the wrap angle in degrees in e^(μθ).'],
  },

  dynamics: {
    overview: 'Kinematics and dynamics of particles and rigid bodies: motion equations, relative motion, Newton’s laws, and the work–energy principle.',
    sections: [
      ['Kinematics of particles', [
        'Constant acceleration: v = u + at; s = ut + ½at²; v² = u² + 2as.',
        'Projectile: range R = u² sin 2θ/g (max at 45°); max height u² sin²θ/(2g); time of flight 2u sin θ/g.',
        'Normal–tangential: a_t = dv/dt, a_n = v²/ρ.',
      ]],
      ['Kinematics of rigid bodies', [
        'v_B = v_A + ω × r_B/A. Instantaneous centre of zero velocity: v = ω × distance from the IC.',
        'Rolling without slipping: v_centre = ωr; contact point has zero velocity; top point moves at 2v.',
        'Coriolis acceleration 2ω × v_rel for a point moving along a rotating link.',
      ]],
      ["Newton's laws", [
        'ΣF = ma (translation); ΣM_G = I_Gα (rotation about the centre of mass).',
        'Pulley and connected-body problems: write F = ma for each body with the same string tension.',
        'Moments of inertia: rod about centre mL²/12, about end mL²/3; disc mR²/2; ring mR²; solid sphere 2mR²/5. Parallel axis: I = I_G + md².',
      ]],
      ['Work–energy principle', [
        'Work by all forces = change in kinetic energy. KE of rolling body = ½mv² + ½I_Gω².',
        'Rolling down an incline from rest: v² = 2gh/(1 + k²/r²) (k = radius of gyration). Sphere is fastest among sphere, disc, ring.',
        'Power = F·v = Tω.',
      ]],
    ],
    exam: ['Velocity or acceleration of a point in a mechanism (NAT).', 'Speed of a rolling body at the bottom of an incline.'],
    traps: ['Taking moments about a point that is accelerating without adding the inertia term.'],
  },

  impulse: {
    overview: 'Impulse and momentum: linear impulse, collisions with the coefficient of restitution, and angular momentum.',
    sections: [
      ['Impulse–momentum', [
        'Impulse ∫F dt = change in linear momentum mΔv. With no external impulse, total momentum is conserved.',
        'Variable mass (rocket) thrust = relative exhaust velocity × mass flow rate.',
      ]],
      ['Collisions and coefficient of restitution', [
        'e = (separation velocity)/(approach velocity) along the line of impact. e = 1 elastic, e = 0 perfectly plastic.',
        'Momentum is conserved along the line of impact; tangential velocities are unchanged for smooth bodies.',
        'Kinetic energy loss in direct impact: ΔKE = m₁m₂(1 − e²)(u₁ − u₂)²/(2(m₁ + m₂)).',
        'Equal masses, elastic head-on: velocities exchange. Ball dropped from h rebounds to e²h.',
      ]],
      ['Angular momentum', [
        'H = Iω for a rigid body about a fixed axis; ΣM = dH/dt. With no external moment, angular momentum is conserved (a skater pulling arms in spins faster).',
        'Angular impulse ∫M dt = change in angular momentum.',
      ]],
    ],
    exam: ['Velocities after a collision or energy lost (NAT).', 'Angular velocity after a change in moment of inertia.'],
    traps: ['Applying restitution to velocities perpendicular to the line of impact.'],
  },
};
