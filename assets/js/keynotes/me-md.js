// Offline key notes: ME · Machine Design. Keys are chapter ids from data.js.
export const CONTENT = {
  failure: {
    overview: 'Static failure theories decide when a component under combined stress fails. Ductile materials use shear- or energy-based theories; brittle materials use normal-stress theories.',
    sections: [
      ['Failure theories', [
        '**Maximum principal stress (Rankine):** σ₁ ≤ S_yt/N. Suits brittle materials.',
        '**Maximum shear stress (Tresca, Guest):** (σ₁ − σ₃)/2 ≤ S_y/(2N). Conservative for ductile materials; hexagon in σ₁–σ₂ space.',
        '**Distortion energy (von Mises):** σ_e = √(σ₁² − σ₁σ₂ + σ₂²) ≤ S_y/N. Best for ductile materials; ellipse enclosing the Tresca hexagon.',
        'Pure shear: Tresca gives S_sy = 0.5S_y; von Mises gives S_sy = 0.577S_y.',
        'Maximum principal strain (St. Venant) and total strain energy (Haigh) are less used.',
      ]],
      ['Factor of safety', [
        'N = failure stress / working stress. Higher for uncertain loads, brittle materials, or serious consequences of failure.',
      ]],
      ['Stress concentration', [
        'Theoretical factor K_t = σ_max/σ_nominal at holes, fillets, grooves. A small hole in a wide plate under tension: K_t = 3.',
        'Fatigue notch factor K_f = 1 + q(K_t − 1), notch sensitivity 0 ≤ q ≤ 1.',
        'Ductile parts under static load usually ignore K_t (local yielding redistributes stress); brittle parts and fatigue loading do not.',
      ]],
    ],
    exam: ['Factor of safety by Tresca and von Mises for a combined stress state (NAT).', 'Shear yield strength predicted by each theory.'],
    traps: ['Forgetting σ₃ = 0 in Tresca when σ₁ and σ₂ have the same sign (max shear is σ₁/2, not (σ₁ − σ₂)/2).'],
  },

  fatigue: {
    overview: 'Fatigue: S–N curves and endurance limit, its modifying factors, and design under fluctuating stress with Goodman, Soderberg and Gerber criteria.',
    sections: [
      ['S–N curve and endurance limit', [
        'Steels show an endurance limit (knee near 10⁶ cycles); aluminium does not.',
        'Endurance limit of a polished specimen S_e′ ≈ 0.5S_ut for steel.',
        'Actual S_e = k_a k_b k_c k_d … S_e′ (surface, size, load, temperature, reliability factors), divided by K_f for notches.',
        'Finite life: straight line on log–log axes between 0.9S_ut at 10³ and S_e at 10⁶ cycles.',
      ]],
      ['Fluctuating stresses', [
        'Mean σ_m = (σ_max + σ_min)/2; amplitude σ_a = (σ_max − σ_min)/2. Stress ratio R = σ_min/σ_max.',
        '**Soderberg:** σ_a/S_e + σ_m/S_y = 1/N (most conservative).',
        '**Goodman:** σ_a/S_e + σ_m/S_ut = 1/N.',
        '**Gerber:** Nσ_a/S_e + (Nσ_m/S_ut)² = 1 (parabola; fits data best).',
        'Cumulative damage (Miner’s rule): Σ nᵢ/Nᵢ = 1 at failure.',
      ]],
    ],
    exam: ['Factor of safety under fluctuating load by Goodman or Soderberg (NAT).', 'Life from Miner’s rule.'],
    traps: ['Applying the stress concentration factor to the mean stress as well as the amplitude for ductile materials (usually only the amplitude).'],
  },

  joints: {
    overview: 'Joints: bolted and riveted joints under direct and eccentric loads, and welded joints (butt and fillet).',
    sections: [
      ['Bolted and riveted joints', [
        'Rivet failure modes: shearing of rivets, crushing of plate/rivet, tearing of plate between rivets.',
        'Efficiency = least strength / strength of the solid plate.',
        'Bolt preload: stiffness of bolt k_b and members k_m share the external load; bolt takes the fraction k_b/(k_b + k_m).',
        'Bolt core area decides tensile capacity (σ_t × πd_c²/4).',
      ]],
      ['Eccentric loading', [
        'Direct shear P/n on each bolt plus secondary shear due to moment: Fᵢ = P e rᵢ/Σr² (in-plane).',
        'Vectorially add both; the farthest bolt (with aligned components) is critical.',
        'Out-of-plane eccentricity (bracket loaded away from the wall) puts bolts in tension proportional to their distance from the tilting edge.',
      ]],
      ['Welded joints', [
        'Fillet weld throat t = 0.707 × leg size s. Strength in shear = τ × 0.707 s × L.',
        'Butt weld strength = σ × t × L. Parallel fillet welds take shear along their length; transverse fillets are about 1.4 times stronger (often taken the same in GATE).',
        'Eccentric welds: direct shear plus torsional shear τ₂ = T r/J, with J of the weld treated as a line × throat.',
      ]],
    ],
    exam: ['Maximum force on a bolt in an eccentric joint (NAT).', 'Length of a fillet weld for a given load.'],
    traps: ['Using leg size instead of throat for fillet weld area.'],
  },

  elements: {
    overview: 'Machine elements: shaft design under combined loads, spur gear strength, rolling and sliding bearings, and brakes and clutches.',
    sections: [
      ['Shaft design', [
        'Combined bending and torsion: d³ = (16/(πτ_allow))√(M² + T²) (max shear theory). With shock factors: √((K_mM)² + (K_tT)²).',
        'Also check torsional rigidity: θ = TL/(GJ) within limits.',
      ]],
      ['Spur gear design', [
        'Lewis equation: bending strength F_t = σ_b b m Y (Y = Lewis form factor). Velocity (Barth) factor accounts for dynamic load.',
        'Buckingham dynamic load and wear (Hertz contact) strength checks.',
        'Tangential force F_t = 2T/d = P/v; radial force F_r = F_t tan φ.',
      ]],
      ['Rolling and sliding bearings', [
        'Rolling bearings: life L₁₀ = (C/P)ᵏ million revolutions; k = 3 for ball, 10/3 for roller bearings. Equivalent load P = XF_r + YF_a.',
        'Journal bearings: Petroff’s equation for friction in lightly loaded bearings; Sommerfeld number S = (r/c)²(μN/p). Hydrodynamic lubrication needs relative motion and a converging wedge.',
      ]],
      ['Brakes and clutches', [
        'Plate clutch torque: uniform wear T = μW(R₁ + R₂)/2 × n; uniform pressure T = (2/3)μW(R₁³ − R₂³)/(R₁² − R₂²) × n (n = number of friction surfaces).',
        'Uniform wear is assumed for worn clutches (gives lower, safer torque).',
        'Band brake: T₁/T₂ = e^(μθ). Block brake: self-energising if friction helps apply the shoe; self-locking if no external force is needed.',
      ]],
    ],
    exam: ['Bearing life for a changed load (NAT).', 'Torque capacity of a clutch.', 'Shaft diameter under combined loading.'],
    traps: ['Using exponent 3 for roller bearings (it is 10/3).'],
  },
};
