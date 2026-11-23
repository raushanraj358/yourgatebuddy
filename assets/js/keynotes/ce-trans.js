// Offline key notes: CE · Transportation Engineering. Keys are chapter ids from data.js.
export const CONTENT = {
  geometric: {
    overview: 'Highway geometric design (IRC): sight distances, superelevation and horizontal curves, and gradients and vertical curves.',
    sections: [
      ['Sight distances', [
        'Stopping sight distance SSD = vt + v²/(2gf) (v in m/s, reaction time t = 2.5 s, f ≈ 0.35–0.40). On a gradient: v²/(2g(f ± n)).',
        'Overtaking sight distance OSD = d₁ + d₂ + d₃ = v_b t + (v_b T + 2s) + vT, with T = √(4s/a) and s = 0.7v_b + 6 (m).',
        'Intermediate sight distance = 2 × SSD. Two-lane undivided road: headlight SSD = 2 × SSD for two-way stopping.',
      ]],
      ['Superelevation and horizontal curves', [
        'e + f = v²/(gR). IRC: design e for 75% of design speed ignoring friction: e = (0.75v)²/(gR), max 7% (plain), 10% (hills).',
        'Ruling minimum radius R = v²/(g(e + f)), f = 0.15.',
        'Extra widening = nl²/(2R) (mechanical) + V/(9.5√R) (psychological, V in km/h).',
        'Transition curve length (spiral): L = v³/(CR), C = 80/(75 + V) (0.5–0.8 m/s³).',
        'Set-back distance (sight distance S within the curve, driver d from the inner edge): m = R − (R − d) cos(S/(2(R − d))), angle in radians.',
      ]],
      ['Gradients and vertical curves', [
        'Ruling, limiting, exceptional and minimum (drainage) gradients. Grade compensation on curves = (30 + R)/R %, max 75/R %.',
        'Summit curve length (L > SSD): L = NS²/4.4 with N = deviation angle (algebraic difference of grades), h₁ = 1.2 m, h₂ = 0.15 m.',
        'Valley curve: designed for comfort (L = 2√(Nv³/C)) and headlight sight distance; uses cubic parabola.',
      ]],
    ],
    exam: ['Stopping sight distance at a given speed (NAT).', 'Superelevation required for a curve.', 'Length of a summit curve.'],
    traps: ['Using km/h directly where v must be in m/s (divide by 3.6).'],
  },

  pavement: {
    overview: 'Pavement design: flexible pavements (CBR method and IRC 37), rigid pavement stresses (Westergaard), and tests on highway materials.',
    sections: [
      ['Flexible pavements (CBR, IRC)', [
        'CBR = load at 2.5 mm (or 5 mm) penetration / standard load × 100 (standard 1370 kg at 2.5 mm, 2055 kg at 5 mm).',
        'Design traffic in msa: N = 365A[(1 + r)ⁿ − 1]/r × D × F (lane distribution D, vehicle damage factor F).',
        'Equivalent single wheel load and fourth-power law: damage ∝ (axle load/standard axle)⁴ (standard 80 kN).',
        'Layers: subgrade, sub-base, base, binder and surface course. Load spreads through layers (grain-to-grain).',
      ]],
      ['Rigid pavement stresses (Westergaard)', [
        'Radius of relative stiffness l = [Eh³/(12(1 − μ²)k)]^(1/4).',
        'Critical load positions: interior, edge and corner. Corner stress (Goldbeck): σ = 3P/h²; Westergaard corner formula adds (a√2/l)^0.6 correction.',
        'Warping (temperature) stress σ = (Eαt/2)(C_x + μC_y)/(1 − μ²). Frictional (subgrade restraint) stress grows with slab length and limits the spacing of contraction joints.',
        'Joints: contraction, expansion, construction, longitudinal; dowel bars transfer load across transverse joints; tie bars hold longitudinal joints.',
      ]],
      ['Highway material tests', [
        'Aggregates: crushing value, abrasion (Los Angeles), impact value, soundness, shape (flakiness and elongation indices).',
        'Bitumen: penetration (consistency grade), ductility, softening point (ring and ball), flash and fire point, viscosity grade (VG-10, VG-30…).',
        'Marshall mix design: stability and flow, air voids 3–5%, VMA and VFB.',
      ]],
    ],
    exam: ['Design traffic in msa (NAT).', 'Radius of relative stiffness or corner stress.', 'CBR from a load–penetration test.'],
    traps: ['Taking the CBR at 2.5 mm when the 5 mm value is higher (repeat the test; use 5 mm if it is still higher).'],
  },

  traffic: {
    overview: 'Traffic engineering: flow, speed and density relations, spot speed studies, signal design by Webster’s method, and capacity and level of service.',
    sections: [
      ['Traffic flow parameters', [
        'q = k × v_s (flow = density × space-mean speed).',
        'Greenshields: v = v_f(1 − k/k_j). Maximum flow q_max = v_f k_j/4 at k = k_j/2 and v = v_f/2.',
        'Time-mean speed ≥ space-mean speed: v_t = v_s + σ²/v_s. Space-mean speed is the harmonic mean of spot speeds.',
        'Headway h = 1/q; spacing s = 1/k.',
        'Spot speed: 85th percentile for speed limits, 98th for geometric design, 15th for minimum speed.',
      ]],
      ["Signal design (Webster's method)", [
        'Optimum cycle C₀ = (1.5L + 5)/(1 − Y), L = total lost time, Y = Σ critical flow ratios (q/s).',
        'Effective green split in proportion to each phase’s flow ratio yᵢ/Y × (C₀ − L).',
        'Saturation flow ≈ 525w PCU/h for widths 5.5–18 m (approx.).',
        'Signal is oversaturated if Y ≥ 1.',
      ]],
      ['Capacity and level of service', [
        'Capacity = maximum hourly volume under prevailing conditions; theoretical capacity of a lane = 1000v/s (v km/h, s m spacing).',
        'Level of service A (free flow) to F (forced/breakdown).',
        'PCU values convert mixed traffic to passenger-car units.',
        'Rotary capacity (Wardrop): Q_p = 280w(1 + e/w)(1 − p/3)/(1 + w/l).',
      ]],
    ],
    exam: ['Maximum flow or density from Greenshields (NAT).', 'Optimum cycle length.', 'Space-mean speed from spot speeds.'],
    traps: ['Taking the arithmetic mean of spot speeds as the space-mean speed.'],
  },
};
