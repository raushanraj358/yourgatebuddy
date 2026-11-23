// Offline key notes: CE · Water Resources Engineering. Fluid mechanics is built from the ME notes. Keys are chapter ids.
import { CONTENT as FM } from './me-fm.js';

export const CONTENT = {
  fluids: {
    overview: 'Fluid mechanics for civil: properties and statics, continuity, energy and momentum equations, pipe flow and losses, boundary layers and dimensional analysis.',
    sections: [
      ['Fluid properties', [
        'Newtonian fluid: τ = μ du/dy. Kinematic viscosity ν = μ/ρ. Viscosity of liquids falls with temperature; of gases rises.',
        'Surface tension: capillary rise h = 4σ cos θ/(ρgd); pressure inside a droplet 4σ/d, a soap bubble 8σ/d.',
        'Bulk modulus K = −dp/(dV/V).',
      ]],
      ...FM.statics.sections,
      ...FM.bernoulli.sections,
      ...FM.viscous.sections,
      FM.boundary.sections[0],
    ],
    exam: ['Force on a gate or discharge through a venturi (NAT).', 'Head loss in pipes in series or parallel.', 'Model scale ratios from Froude similarity.'],
    traps: [...FM.statics.traps, ...FM.viscous.traps],
  },

  'open-channel': {
    overview: 'Open channel flow: specific energy and critical flow, hydraulic jumps, gradually varied flow profiles, and uniform flow by Manning’s equation.',
    sections: [
      ['Specific energy and critical flow', [
        'E = y + V²/(2g) = y + q²/(2gy²) for a rectangular channel (q = discharge per unit width).',
        'Critical depth y_c = (q²/g)^(1/3); E_min = 1.5y_c. Froude number Fr = V/√(gD) (D = hydraulic depth A/T).',
        'Fr < 1 subcritical (tranquil), Fr > 1 supercritical (rapid). At critical flow Q²T/(gA³) = 1.',
        'A hump: depth falls in subcritical flow and rises in supercritical; maximum hump height without choking ΔZ = E₁ − E_c.',
      ]],
      ['Hydraulic jump', [
        'Sequent depths (rectangular): y₂/y₁ = ½(−1 + √(1 + 8Fr₁²)).',
        'Energy loss ΔE = (y₂ − y₁)³/(4y₁y₂). Length ≈ 6(y₂ − y₁).',
        'Used for energy dissipation below spillways; the jump forms only from supercritical to subcritical flow.',
      ]],
      ['Gradually varied flow', [
        'dy/dx = (S₀ − S_f)/(1 − Fr²).',
        'Profiles: M (mild, y_n > y_c), S (steep, y_n < y_c), C (critical), H (horizontal), A (adverse). Zones 1, 2, 3 by depth relative to y_n and y_c.',
        'M1: backwater behind a dam. M2: drawdown before a free overfall. S1: behind an obstruction on a steep slope.',
      ]],
      ["Uniform flow (Manning's equation)", [
        'V = (1/n) R^(2/3) S^(1/2) (SI). Chezy: V = C√(RS); C = R^(1/6)/n.',
        'Hydraulic radius R = A/P. Most economical sections: rectangle b = 2y (R = y/2); trapezoid is half a hexagon (R = y/2); triangle with 90° vertex.',
      ]],
    ],
    exam: ['Critical depth or sequent depth (NAT).', 'Energy loss in a hydraulic jump.', 'GVF profile type.'],
    traps: ['Using total discharge instead of discharge per unit width in y_c = (q²/g)^(1/3).'],
  },

  hydrology: {
    overview: 'Hydrology: precipitation and its measurement, infiltration and evaporation, unit hydrographs, flood routing, and groundwater and well hydraulics.',
    sections: [
      ['Precipitation and the hydrologic cycle', [
        'Mean areal rainfall: arithmetic mean, Thiessen polygon (area-weighted), isohyetal (most accurate).',
        'Missing data: normal ratio method P_x = (N_x/n)Σ(Pᵢ/Nᵢ) if normals differ by more than 10%.',
        'Double mass curve checks consistency of a rain-gauge record.',
        'Optimum number of rain gauges N = (C_v/ε)².',
      ]],
      ['Infiltration and evaporation', [
        'Horton: f = f_c + (f₀ − f_c)e^(−kt). φ-index: average rate above which rainfall volume equals runoff volume. W-index excludes initial losses.',
        'Evaporation: pan coefficient ≈ 0.7 for Class A pan. Penman combines energy and aerodynamic terms.',
      ]],
      ['Unit hydrograph', [
        'Unit hydrograph: direct runoff from 1 cm of effective rainfall in a given duration, uniform over the catchment.',
        'Area under a UH = catchment area × 1 cm. Peak flow Q = Σ(UH ordinate × excess rainfall).',
        'S-curve method changes UH duration. Rational method: Q = CiA/3.6 (Q m³/s, i mm/h, A km²) for small catchments.',
      ]],
      ['Flood routing', ['Reservoir routing: Modified Puls (storage–indication). Channel routing: Muskingum S = K[xI + (1 − x)Q].']],
      ['Groundwater and well hydraulics', [
        'Confined aquifer (Thiem): Q = 2πKb(s₁ − s₂)/ln(r₂/r₁). Unconfined (Dupuit): Q = πK(h₂² − h₁²)/ln(r₂/r₁).',
        'Transmissivity T = Kb. Storativity S (confined) and specific yield S_y (unconfined).',
        'Specific capacity = Q/drawdown.',
      ]],
    ],
    exam: ['Runoff or peak flow from a unit hydrograph (NAT).', 'Discharge of a well.', 'φ-index from a storm.'],
    traps: ['Mixing units in the rational formula (the 3.6 converts mm/h and km² to m³/s).'],
  },

  irrigation: {
    overview: 'Irrigation engineering: crop water requirements, duty and delta, canal design by Kennedy and Lacey, and hydraulic structures on permeable foundations.',
    sections: [
      ['Crop water requirements', [
        'Consumptive use (evapotranspiration) by Blaney–Criddle or Penman. Net irrigation requirement = CU − effective rainfall.',
        'Field capacity and permanent wilting point bound the available moisture; irrigate before readily available moisture is used.',
        'Depth of water to bring soil to field capacity d = (γ_d/γ_w) × depth × (FC − m).',
      ]],
      ['Duty, delta and base period', [
        'Δ = 8.64B/D (Δ in m, B in days, D in ha per m³/s).',
        'Duty rises downstream in a canal system (less loss). Outlet factor duty at the outlet.',
        'Irrigation efficiencies: conveyance, application, storage, distribution.',
      ]],
      ['Canal design: Kennedy and Lacey', [
        'Kennedy: critical velocity V₀ = 0.55m y^0.64 (m = critical velocity ratio).',
        'Lacey regime: P = 4.75√Q; silt factor f = 1.76√d (d in mm); R = 0.47(Q/f)^(1/3); V = (Qf²/140)^(1/6); S = f^(5/3)/(3340Q^(1/6)).',
      ]],
      ['Hydraulic structures', [
        'Bligh’s creep theory: hydraulic gradient = H/L (creep length). Lane’s weighted creep: vertical length counts fully, horizontal one-third.',
        'Khosla’s theory uses exit gradient G_E = (H/d)(1/(π√λ)) and pressure correction factors.',
        'Uplift: floor thickness t = h/(G − 1) (h = uplift head) with a safety factor.',
        'Structures: weirs and barrages, canal falls, cross-drainage works (aqueduct, siphon aqueduct, super passage, level crossing).',
      ]],
    ],
    exam: ['Duty or delta calculation (NAT).', 'Lacey’s regime dimensions.', 'Exit gradient or floor thickness.'],
    traps: ['Mixing duty units (ha per cumec) with base period in weeks instead of days.'],
  },
};
