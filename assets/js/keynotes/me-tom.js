// Offline key notes: ME · Theory of Machines & Vibrations. Keys are chapter ids from data.js.
export const CONTENT = {
  mechanisms: {
    overview: 'Mechanisms and linkages: mobility, Grashof’s criterion, inversions, velocity and acceleration analysis, and cams.',
    sections: [
      ['Degrees of freedom (Gruebler)', [
        'Planar mobility F = 3(n − 1) − 2j₁ − j₂ (n links including ground, j₁ lower pairs, j₂ higher pairs).',
        'F = 1: constrained mechanism; F = 0: structure; F < 0: redundant (pre-loaded) structure.',
        'Kutzbach for spatial: F = 6(n − 1) − 5j₁ − 4j₂ − 3j₃ − 2j₄ − j₅.',
      ]],
      ['Four-bar and slider–crank', [
        "Grashof: s + l ≤ p + q ⇒ at least one link can fully rotate. Fixing the shortest link's neighbour gives crank–rocker; fixing the shortest gives double crank; fixing the opposite link gives double rocker.",
        'Slider–crank inversions: reciprocating engine, Whitworth quick return, rotary engine, oscillating cylinder, hand pump.',
        'Number of instantaneous centres = n(n − 1)/2; Kennedy: any three links’ ICs are collinear.',
      ]],
      ['Velocity and acceleration analysis', [
        'v_BA = ω·AB, perpendicular to AB. Acceleration has centripetal ω²r (towards the centre) and tangential αr components.',
        'Coriolis component 2ωv appears for a slider on a rotating link (quick-return mechanisms).',
        'Slider–crank piston velocity ≈ ωr(sin θ + sin 2θ/(2n)), acceleration ≈ ω²r(cos θ + cos 2θ/n), n = l/r.',
      ]],
      ['Cams', [
        'Follower motions: uniform velocity (infinite acceleration at ends), SHM, uniform acceleration (parabolic), cycloidal (no jerk discontinuity; best at high speed).',
        'Pressure angle should stay below about 30° for a translating follower.',
        'Base circle, pitch curve, prime circle; larger base circle lowers pressure angle.',
      ]],
    ],
    exam: ['Degrees of freedom of a given linkage (NAT).', 'Type of four-bar chain from link lengths.', 'Number of ICs or Coriolis acceleration.'],
    traps: ['Counting a ternary joint (three links at one pin) as one joint; it counts as two.'],
  },

  gears: {
    overview: 'Gears and gear trains: law of gearing and terminology, involute profiles and interference, and simple, compound and epicyclic trains.',
    sections: [
      ['Law of gearing and terminology', [
        'Common normal at the point of contact must pass through the fixed pitch point for a constant velocity ratio.',
        'Module m = d/T (mm); circular pitch p = πm; diametral pitch P = T/d.',
        'Velocity ratio ω₁/ω₂ = T₂/T₁ = d₂/d₁. Addendum = 1m, dedendum = 1.25m (standard).',
        'Contact ratio = path of contact / base pitch (p cos φ); should exceed about 1.2.',
      ]],
      ['Involute profiles and interference', [
        'Involute gears keep the pressure angle constant and tolerate centre-distance changes.',
        'Interference when the addendum extends below the base circle of the mating gear. Minimum teeth on a pinion meshing with a rack to avoid it: T = 2a_w/sin²φ (≈ 32 for 14.5°, 18 for 20°).',
        'Remedies: larger pressure angle, stub teeth, undercutting, profile shift.',
      ]],
      ['Gear trains', [
        'Simple train: ratio = T_driven/T_driver of the end gears; idlers change direction only.',
        'Compound train: product of driven teeth / product of driver teeth.',
        'Epicyclic: use the tabular method or (N_gear − N_arm)/(N_sun − N_arm) = ± T_sun/T_gear.',
        'Sun–planet–ring: T_ring = T_sun + 2T_planet (same module).',
      ]],
    ],
    exam: ['Speed of an output gear in an epicyclic train (NAT).', 'Minimum number of teeth to avoid interference.'],
    traps: ['Sign errors in epicyclic trains: external meshes reverse direction, internal meshes do not.'],
  },

  flywheels: {
    overview: 'Flywheels and governors: turning moment diagrams, fluctuation of energy and speed, governor types and characteristics, and balancing of masses.',
    sections: [
      ['Turning moment diagrams and flywheel design', [
        'Maximum fluctuation of energy ΔE = largest area between the torque curve and the mean torque line.',
        'ΔE = Iω²C_s, where coefficient of fluctuation of speed C_s = (ω_max − ω_min)/ω_mean.',
        'Rim-type flywheel: I ≈ mR²; mass needed falls with the square of radius and speed.',
        'Hoop stress in a rotating rim σ = ρv²: limits the rim speed.',
      ]],
      ['Governors', [
        'Watt: height h = g/ω² (h in m, ω in rad/s). Porter: adds a central load, h = (g/ω²)(m + M)/m for equal arms.',
        'Hartnell (spring-loaded) is compact and works at high speed.',
        '**Sensitivity:** small speed range for full sleeve travel. **Stability:** radius rises with speed. **Isochronous:** constant equilibrium speed (infinitely sensitive, hunts).',
        'Effort and power of a governor measure its ability to overcome friction.',
      ]],
      ['Balancing of masses', [
        'Static balance: Σmr = 0. Dynamic balance: Σmr = 0 and Σmrl = 0 (couples) — needs two planes.',
        'Reciprocating masses: primary force mω²r cos θ, secondary mω²(r/n) cos 2θ. Partial balancing of locomotives trades horizontal for vertical unbalance (hammer blow).',
        'In-line engines: firing order and crank arrangement decide which forces and couples cancel.',
      ]],
    ],
    exam: ['Flywheel mass or moment of inertia for a speed fluctuation limit (NAT).', 'Height of a Watt or Porter governor.', 'Balancing mass in a given plane.'],
    traps: ['Using total energy instead of the maximum fluctuation of energy.'],
  },

  vibration: {
    overview: 'Vibrations: free vibration of single degree of freedom systems, damping, forced vibration and resonance, transmissibility, and whirling of shafts.',
    sections: [
      ['Free vibration (SDOF)', [
        'ω_n = √(k/m); f_n = ω_n/2π. Static deflection form: ω_n = √(g/δ_st).',
        'Springs in series: 1/k = Σ1/kᵢ; in parallel: Σkᵢ. Torsional: ω_n = √(k_t/J).',
        'Energy (Rayleigh) method: set d/dt(KE + PE) = 0. Spring mass m_s adds m_s/3 to the effective mass.',
        'Simple pendulum ω = √(g/L); compound pendulum ω = √(mgh/I_O).',
      ]],
      ['Damping and logarithmic decrement', [
        'Damping ratio ζ = c/c_c, c_c = 2√(km) = 2mω_n. Damped frequency ω_d = ω_n√(1 − ζ²).',
        'Log decrement δ = ln(x₁/x₂) = 2πζ/√(1 − ζ²) ≈ 2πζ; over n cycles δ = (1/n) ln(x₀/xₙ).',
        'Coulomb (dry friction) damping: amplitude falls linearly by 4F/k per cycle.',
      ]],
      ['Forced vibration and resonance', [
        'Amplitude ratio X/(F₀/k) = 1/√((1 − r²)² + (2ζr)²), r = ω/ω_n. Phase tan φ = 2ζr/(1 − r²).',
        'At resonance (r = 1) amplitude = F₀/(2ζk); phase lag 90°.',
        'Transmissibility TR = √(1 + (2ζr)²)/√((1 − r²)² + (2ζr)²). TR < 1 only when r > √2 (isolation); there, more damping increases TR.',
        'Rotating unbalance: mX/(m_e e) = r²/√((1 − r²)² + (2ζr)²).',
      ]],
      ['Critical speed of shafts', [
        'Whirling (critical) speed equals the natural frequency of transverse vibration: ω_c = √(g/δ_st).',
        'Dunkerley: 1/ω² = Σ1/ωᵢ² for several loads (lower bound).',
      ]],
    ],
    exam: ['Natural frequency of a spring–mass system (NAT).', 'Damping ratio from successive amplitudes.', 'Transmissibility or isolation range.'],
    traps: ['Thinking more damping always reduces transmitted force; above r = √2 it increases it.'],
  },
};
