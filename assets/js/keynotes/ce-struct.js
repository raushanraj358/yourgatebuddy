// Offline key notes: CE · Structural Engineering. Mechanics and solid mechanics are built from the ME notes. Keys are chapter ids.
import { CONTENT as MECH } from './me-mech.js';
import { CONTENT as SOM } from './me-som.js';

export const CONTENT = {
  mechanics: {
    overview: 'Engineering mechanics for civil: equilibrium and free-body diagrams, trusses, friction and virtual work.',
    sections: [...MECH.fbd.sections, ...MECH.friction.sections.slice(0, 1)],
    exam: [...MECH.fbd.exam, ...MECH.friction.exam.slice(0, 1)],
    traps: [...MECH.fbd.traps, ...MECH.friction.traps],
  },

  solid: {
    overview: 'Solid mechanics: stress–strain and elastic constants, bending and shear stresses, torsion, deflection of beams and columns.',
    sections: [
      SOM.stress.sections[0], SOM.stress.sections[1],
      ...SOM.sfd.sections,
      SOM.torsion.sections[0],
      SOM.deflection.sections.find((s) => s[0] === 'Standard results'),
      SOM.columns.sections[0], SOM.columns.sections[1],
    ],
    exam: ['Principal stresses or bending stress at a point (NAT).', 'Deflection of a standard beam.', 'Euler buckling load for given end conditions.'],
    traps: [...SOM.stress.traps, ...SOM.columns.traps],
  },

  analysis: {
    overview: 'Structural analysis: determinacy, the slope-deflection and moment-distribution methods, influence lines and matrix methods.',
    sections: [
      ['Static and kinematic indeterminacy', [
        'Plane frame: D_s = 3m + r − 3j − r_released (m members, r reactions, j joints). Plane truss: D_s = m + r − 2j.',
        'Kinematic indeterminacy D_k = number of unknown joint displacements (3 per rigid joint in a plane frame, minus restraints; ignore axial deformation if stated).',
        'Stable and determinate when D_s = 0 with a geometrically stable arrangement.',
      ]],
      ['Slope deflection and moment distribution', [
        'Slope deflection: M_AB = M_FAB + (2EI/L)(2θ_A + θ_B − 3Δ/L).',
        'Fixed-end moments: central point load PL/8; UDL wL²/12; point load at a, b: Pab²/L² and Pa²b/L².',
        'Moment distribution: stiffness 4EI/L (far end fixed), 3EI/L (far end pinned); carry-over factor ½ to a fixed far end, 0 to a pinned end.',
        'Distribution factor = member stiffness / sum of stiffnesses at the joint.',
      ]],
      ['Influence lines', [
        'Müller-Breslau: the ILD for a reaction or internal force is the deflected shape when that restraint is released and given a unit displacement.',
        'Simply supported beam: ILD for reaction is a triangle; for moment at a section, a triangle with peak ab/L at the section.',
        'Max moment under a moving load train occurs when the load and the resultant are equidistant from the centre (absolute max).',
        'For a UDL longer than the span, max shear at a section: load one side of the section only.',
      ]],
      ['Matrix methods', [
        'Flexibility (force) method: unknowns are redundant forces. Stiffness (displacement) method: unknowns are joint displacements.',
        'Beam element stiffness: [12, 6L, −12, 6L; 6L, 4L², −6L, 2L²; …] × EI/L³. Stiffness matrices are symmetric and positive definite (when supported).',
      ]],
      ['Arches and cables', ['Three-hinged arch is determinate; horizontal thrust H = wL²/(8h) for UDL on a parabolic arch (zero bending).', 'Cable under UDL takes a parabolic shape; tension maximum at supports.']],
    ],
    exam: ['Degree of static or kinematic indeterminacy (NAT).', 'Moment at a joint by moment distribution.', 'Maximum bending moment from an influence line.'],
    traps: ['Forgetting released (hinge) reactions when counting indeterminacy.'],
  },

  rcc: {
    overview: 'RCC design by limit state (IS 456): flexure of singly and doubly reinforced beams, shear and bond, columns and footings, and prestressed concrete basics.',
    sections: [
      ['Limit state design (IS 456)', [
        'Partial safety factors: concrete 1.5, steel 1.15, load 1.5 (DL + LL). Design strengths 0.67f_ck/1.5 = 0.446f_ck and 0.87f_y.',
        'Stress block: average stress 0.36f_ck over depth x_u; centroid at 0.42x_u from the top.',
        'Limiting x_u,max/d: 0.53 (Fe 250), 0.48 (Fe 415), 0.46 (Fe 500).',
        'M_u,lim = 0.36f_ck b x_u,max(d − 0.42x_u,max) = 0.138f_ck bd² (Fe 415), 0.133f_ck bd² (Fe 500).',
        'Minimum tension steel A_s/(bd) = 0.85/f_y; maximum 4% of bD.',
      ]],
      ['Singly and doubly reinforced beams', [
        'Singly: x_u = 0.87f_yA_st/(0.36f_ck b). Under-reinforced if x_u < x_u,max (ductile failure).',
        'Doubly reinforced when M_u > M_u,lim: extra moment carried by compression steel and equal extra tension steel.',
        'Flanged beams: effective flange width b_f = L₀/6 + b_w + 6D_f (T-beam).',
        'Span/depth limits: cantilever 7, simply supported 20, continuous 26.',
      ]],
      ['Shear and bond', [
        'Nominal shear τ_v = V_u/(bd); compare with τ_c (table, depends on % steel) and τ_c,max.',
        'Vertical stirrups: V_us = 0.87f_y A_sv d/s_v. Max spacing 0.75d or 300 mm.',
        'Development length L_d = φσ_s/(4τ_bd), with τ_bd raised 60% for deformed bars.',
      ]],
      ['Columns and footings', [
        'Short column if L_eff/D < 12. Axial capacity P_u = 0.4f_ckA_c + 0.67f_yA_sc (includes minimum eccentricity).',
        'Longitudinal steel 0.8%–4% (practical 6%); minimum 4 bars (rectangular), 6 (circular).',
        'Footings: check one-way shear at d from the column face, two-way (punching) at d/2, and bending at the face.',
      ]],
      ['Prestressed concrete', [
        'Pre-tensioning (bonded, factory) and post-tensioning (site, ducts).',
        'Losses: elastic shortening, creep, shrinkage, relaxation, friction and anchorage slip (last two for post-tensioning).',
        'Stress = P/A ± Pe·y/I ± M·y/I. Load balancing: a parabolic tendon with sag h balances w = 8Ph/L².',
      ]],
    ],
    exam: ['Moment capacity or neutral axis depth of a beam (NAT).', 'Shear reinforcement spacing.', 'Loss of prestress or load-balancing force.'],
    traps: ['Using 0.67f_ck without the partial factor, or forgetting the 0.87 on f_y.'],
  },

  steel: {
    overview: 'Steel structures (IS 800, limit state): bolted and welded connections, tension and compression members, beams and plate girders, and plastic analysis.',
    sections: [
      ['Bolted and welded connections', [
        'Bolt in shear: V_dsb = f_ub(n_nA_nb + n_sA_sb)/(√3 γ_mb), γ_mb = 1.25. Bearing: 2.5k_b d t f_u/γ_mb.',
        'Bolt value = lesser of shear and bearing strength. HSFG bolts resist slip by friction.',
        'Fillet weld: throat = 0.7 × size; strength f_u/(√3 γ_mw) × throat × length (γ_mw = 1.25 shop, 1.5 field).',
      ]],
      ['Tension and compression members', [
        'Tension member: least of gross yielding (A_g f_y/1.1), net rupture (0.9A_n f_u/1.25) and block shear.',
        'Net area with staggered holes: add s²/(4g) for each diagonal.',
        'Compression: slenderness λ = KL/r; design stress from buckling curves (a, b, c, d) by section type.',
        'IS 800 limits KL/r to 180 for members carrying dead and imposed compressive loads and 250 for members resisting compression only from wind or earthquake; tension members have looser limits.',
      ]],
      ['Beams and plate girders', [
        'Plastic moment M_p = f_y Z_p. Shape factor Z_p/Z_e: rectangle 1.5, circle 1.7, I-section ≈ 1.12–1.14.',
        'Laterally unsupported beams fail by lateral–torsional buckling.',
        'Plate girders: web stiffeners prevent web buckling; intermediate stiffeners for shear; bearing stiffeners at supports and loads.',
      ]],
      ['Plastic analysis', [
        'Collapse mechanism forms with enough plastic hinges (indeterminacy + 1 for complete collapse).',
        'Fixed beam, central load: P_c = 8M_p/L. UDL: w_c = 16M_p/L². Simply supported UDL: 8M_p/L²; propped cantilever UDL: 11.66M_p/L².',
        'Upper bound (kinematic) and lower bound (static) theorems.',
      ]],
    ],
    exam: ['Collapse load of a beam (NAT).', 'Shape factor of a section.', 'Strength of a bolted or welded joint.'],
    traps: ['Using elastic section modulus for plastic moment.'],
  },

  materials: {
    overview: 'Construction materials and management: cement and concrete properties and tests, mix design, and CPM/PERT for project scheduling.',
    sections: [
      ['Cement and concrete properties', [
        'Bogue compounds: C₃S (early strength, heat), C₂S (later strength), C₃A (flash set, sulphate attack), C₄AF.',
        'Gypsum controls setting time. Initial setting ≥ 30 min, final ≤ 600 min (OPC).',
        'Abrams’ law: strength falls as the water–cement ratio rises. Workability: slump, compaction factor, Vee-Bee.',
        'Characteristic strength f_ck: 5% of results may fall below it. Target mean = f_ck + 1.65s.',
        'Flexural strength (modulus of rupture) = 0.7√f_ck; E_c = 5000√f_ck (MPa).',
      ]],
      ['Mix design and tests', [
        'IS 10262 mix design: target strength → w/c ratio → water content → cement → aggregates.',
        'Tests: cube compressive strength (150 mm, 28 days), split tensile, rebound hammer and ultrasonic pulse velocity (NDT).',
        'Fineness of cement by Blaine air permeability; soundness by Le Chatelier (lime) and autoclave (magnesia).',
      ]],
      ['Construction management (CPM/PERT)', [
        'Critical path has zero total float. Total float = LS − ES = LF − EF; free float = ES(successor) − EF.',
        'PERT tₑ = (t_o + 4t_m + t_p)/6; σ = (t_p − t_o)/6. Probability from z = (T_s − T_e)/σ_cp.',
        'Crashing: shorten activities with the least cost slope on the critical path.',
      ]],
    ],
    exam: ['Target mean strength or w/c ratio question (NAT).', 'Project duration and floats.'],
    traps: ['Confusing total float and free float.'],
  },
};
