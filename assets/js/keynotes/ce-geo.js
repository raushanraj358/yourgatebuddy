// Offline key notes: CE · Geotechnical Engineering. Keys are chapter ids from data.js.
export const CONTENT = {
  properties: {
    overview: 'Soil properties and classification: phase relationships, index properties and Atterberg limits, and the IS soil classification system.',
    sections: [
      ['Phase relationships', [
        'Void ratio e = V_v/V_s; porosity n = V_v/V; n = e/(1 + e).',
        'Se = wG (S = degree of saturation, w = water content, G = specific gravity).',
        'Bulk unit weight γ = (G + Se)γ_w/(1 + e). Dry γ_d = Gγ_w/(1 + e) = γ/(1 + w). Submerged γ′ = γ_sat − γ_w.',
        'Air content a_c = V_a/V_v; percentage air voids n_a = n·a_c.',
      ]],
      ['Index properties and Atterberg limits', [
        'Liquid limit (Casagrande cup, 25 blows / cone penetration 20 mm), plastic limit (3 mm thread), shrinkage limit.',
        'Plasticity index PI = LL − PL. Liquidity index LI = (w − PL)/PI. Consistency index CI = (LL − w)/PI.',
        'Activity = PI/(% clay fraction finer than 2 µm). Montmorillonite is highly active.',
        'Relative density D_r = (e_max − e)/(e_max − e_min).',
      ]],
      ['IS soil classification', [
        'Coarse-grained if more than 50% retained on 75 µm sieve. Well graded (W) needs C_u ≥ 4 (gravel) or ≥ 6 (sand) and 1 ≤ C_c ≤ 3.',
        'C_u = D₆₀/D₁₀; C_c = D₃₀²/(D₁₀D₆₀).',
        'Fine-grained: plasticity chart with the A-line PI = 0.73(LL − 20). Above the A-line: clays (C); below: silts (M). L/I/H for LL < 35, 35–50, > 50.',
      ]],
    ],
    exam: ['Dry density or void ratio from given data (NAT).', 'Classify a soil from grading and Atterberg limits.'],
    traps: ['Using total weight instead of dry weight for water content (w = W_w/W_s).'],
  },

  permeability: {
    overview: 'Permeability and seepage: Darcy’s law and permeability tests, flow nets, effective stress, and quicksand conditions.',
    sections: [
      ["Darcy's law and permeability tests", [
        'v = ki; Q = kiA. Seepage velocity v_s = v/n.',
        'Constant-head test (coarse soils): k = QL/(Aht). Falling-head (fine soils): k = (aL/(At)) ln(h₁/h₂).',
        'Hazen: k ≈ C D₁₀² (cm/s with D₁₀ in cm, C ≈ 100).',
        'Layered soils: horizontal k_h = Σkᵢhᵢ/H; vertical k_v = H/Σ(hᵢ/kᵢ). k_h ≥ k_v always.',
      ]],
      ['Flow nets and seepage', [
        'Seepage q = kH N_f/N_d (N_f flow channels, N_d equipotential drops).',
        'Flow lines and equipotential lines meet at right angles and form curvilinear squares.',
        'Anisotropic soil: transform scale by √(k_v/k_h); equivalent k = √(k_hk_v).',
      ]],
      ['Effective stress and quicksand', [
        'Terzaghi: σ′ = σ − u. Effective stress controls strength and compressibility.',
        'Upward seepage reduces σ′ by iγ_w z; downward seepage increases it.',
        'Critical hydraulic gradient i_c = γ′/γ_w = (G − 1)/(1 + e) ≈ 1. Quicksand when i ≥ i_c. Factor of safety against piping = i_c/i_exit.',
        'Capillary rise in soil makes pore pressure negative above the water table (increases σ′).',
      ]],
    ],
    exam: ['Seepage under a dam from a flow net (NAT).', 'Effective stress at a depth with upward seepage.', 'Critical gradient.'],
    traps: ['Using total stress where effective stress is needed (e.g. in strength).'],
  },

  consolidation: {
    overview: 'Consolidation and compaction: Terzaghi’s 1-D theory, coefficient of consolidation and time factor, settlement calculation, and compaction tests.',
    sections: [
      ["Terzaghi's consolidation theory", [
        'Coefficient of consolidation c_v = k/(m_vγ_w). Time t = T_v H_dr²/c_v.',
        'T_v ≈ (π/4)U² for U ≤ 60%; T_50 = 0.197, T_90 = 0.848.',
        'Drainage path H_dr = H/2 for double drainage, H for single drainage. Time ∝ H_dr².',
        'c_v from Casagrande (log t) or Taylor (√t) fitting.',
      ]],
      ['Compression index and settlement', [
        'Normally consolidated clay: S = (C_cH/(1 + e₀)) log₁₀((σ₀′ + Δσ)/σ₀′).',
        'Overconsolidated (σ₀′ + Δσ ≤ σ_c′): use the recompression index C_r. OCR = σ_c′/σ₀′.',
        'Skempton: C_c ≈ 0.009(LL − 10) for undisturbed clays. m_v = a_v/(1 + e₀).',
        'Secondary compression (creep) follows primary consolidation.',
      ]],
      ['Compaction', [
        'Standard Proctor: 2.6 kg rammer, 310 mm drop, 3 layers, 25 blows. Modified: 4.9 kg, 450 mm, 5 layers.',
        'Optimum moisture content gives maximum dry density. Heavier compaction raises MDD and lowers OMC.',
        'Zero-air-voids line: γ_d = Gγ_w/(1 + wG).',
        'Dry of optimum: flocculated structure; wet of optimum: dispersed.',
      ]],
    ],
    exam: ['Time for a given degree of consolidation (NAT).', 'Primary consolidation settlement.', 'Dry density on the zero-air-voids line.'],
    traps: ['Using the full layer thickness as H_dr for double drainage.'],
  },

  shear: {
    overview: 'Shear strength: Mohr–Coulomb criterion, direct shear and triaxial tests, lateral earth pressure (Rankine and Coulomb), and slope stability.',
    sections: [
      ['Mohr–Coulomb criterion', [
        'τ_f = c′ + σ′ tan φ′. Failure plane at 45° + φ/2 to the major principal plane.',
        'σ₁ = σ₃ tan²(45° + φ/2) + 2c tan(45° + φ/2).',
      ]],
      ['Direct shear and triaxial tests', [
        'Triaxial UU, CU, CD tests. UU on saturated clay: φ_u = 0, c_u = (σ₁ − σ₃)/2.',
        'Unconfined compression: c_u = q_u/2. Sensitivity = undisturbed/remoulded q_u.',
        'Skempton pore pressure: Δu = B[Δσ₃ + A(Δσ₁ − Δσ₃)]; B = 1 for saturated soil.',
        'Dense sand dilates (negative pore pressure in undrained shear); loose sand contracts.',
      ]],
      ['Earth pressure: Rankine and Coulomb', [
        'K₀ = 1 − sin φ′ (normally consolidated). Active K_a = (1 − sin φ)/(1 + sin φ) = tan²(45° − φ/2); passive K_p = 1/K_a.',
        'Active thrust P_a = ½K_aγH² at H/3 above the base (cohesionless, dry).',
        'Cohesive soil: tension crack depth z_c = 2c/(γ√K_a); unsupported cut height 2z_c.',
        'Surcharge q adds K_a q uniformly. Submerged soil: use γ′ plus full water pressure.',
        'Coulomb’s theory includes wall friction and sloping backfill (wedge analysis).',
      ]],
      ['Slope stability', [
        'Infinite slope, dry cohesionless: FS = tan φ/tan β. With seepage parallel to slope: FS = (γ′/γ_sat) tan φ/tan β (about half).',
        'Finite slopes: method of slices (Fellenius, Bishop), Taylor’s stability number S_n = c/(F γ H).',
      ]],
    ],
    exam: ['Active earth pressure on a retaining wall (NAT).', 'Shear parameters from triaxial results.', 'Factor of safety of an infinite slope.'],
    traps: ['Applying K_a to the water pressure; water pressure acts in full (coefficient 1).'],
  },

  foundations: {
    overview: 'Foundations: Terzaghi’s bearing capacity, shallow foundation settlement, pile capacity, and stress distribution in soil.',
    sections: [
      ["Terzaghi's bearing capacity", [
        'Strip footing: q_u = cN_c + γD_fN_q + 0.5γBN_γ. Square: 1.3cN_c + γD_fN_q + 0.4γBN_γ. Circular: 1.3cN_c + γD_fN_q + 0.3γBN_γ.',
        'Saturated clay (φ = 0): N_c = 5.7 (Terzaghi), 5.14 (Skempton/Meyerhof); N_q = 1, N_γ = 0.',
        'Water table at the base halves the γ in the N_γ term (use γ′). Net ultimate q_nu = q_u − γD_f; safe = q_nu/FS + γD_f.',
        'Local shear failure: reduce c and tan φ to 2/3.',
      ]],
      ['Shallow foundations and settlement', [
        'Immediate settlement S_i = qB(1 − ν²)I_f/E. Consolidation settlement as in the consolidation chapter.',
        'Plate load test: for clay, settlement ∝ B; for sand, S_f/S_p = (B_f(B_p + 0.3)/(B_p(B_f + 0.3)))².',
        'Combined footings and rafts when columns are close or soil is weak.',
      ]],
      ['Pile foundations', [
        'Q_u = Q_b + Q_s = q_bA_b + Σf_sA_s. Clay: Q_b = 9c_uA_b; skin friction αc_u (α method).',
        'Group efficiency (Converse–Labarre) < 1 for friction piles in clay; block failure check.',
        'Negative skin friction from settling fill drags the pile down.',
        'Dynamic formulas: Engineering News Q_a = WH/(6(S + C)).',
      ]],
      ['Boussinesq stress distribution', [
        'Point load: σ_z = (3Q/(2πz²)) [1/(1 + (r/z)²)]^(5/2). Directly below (r = 0): σ_z = 0.4775Q/z².',
        '2:1 method: Δσ = Q/((B + z)(L + z)).',
        'Pressure bulb: significant stress to about 1.5–2B below a footing.',
        'Westergaard’s solution suits stratified soils (lower stresses).',
      ]],
    ],
    exam: ['Ultimate bearing capacity of a footing (NAT).', 'Vertical stress below a point load.', 'Pile capacity in clay.'],
    traps: ['Forgetting to use γ′ when the water table rises to the footing base.'],
  },
};
