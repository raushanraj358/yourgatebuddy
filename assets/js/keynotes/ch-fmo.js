// Offline key notes: CH · Fluid Mechanics & Mechanical Operations. Fluid basics come from the ME notes. Keys are chapter ids.
import { CONTENT as FM } from './me-fm.js';

export const CONTENT = {
  flow: {
    overview: 'Fluid statics and flow for chemical engineers: manometers, Bernoulli and momentum balances, pipe flow and friction factor, flow measurement, and packed and fluidised beds.',
    sections: [
      FM.statics.sections[0],
      ...FM.bernoulli.sections,
      ...FM.viscous.sections.slice(0, 3),
      ['Packed and fluidised beds', [
        'Ergun equation: Δp/L = 150μV(1 − ε)²/(ε³d_p²) + 1.75ρV²(1 − ε)/(ε³d_p) (viscous + inertial terms). Kozeny–Carman is the laminar part.',
        'Minimum fluidisation: bed weight per area balances pressure drop: Δp = L(1 − ε)(ρ_p − ρ)g.',
        'Beyond minimum fluidisation, Δp stays constant while the bed expands. Terminal velocity of particles is the upper limit (entrainment).',
        'Sphericity φ_s = surface of equal-volume sphere / particle surface.',
      ]],
    ],
    exam: ['Pressure drop in a pipe or packed bed (NAT).', 'Minimum fluidisation velocity.', 'Flow through an orifice or venturi.'],
    traps: ['Using the Fanning friction factor in the Darcy form (Darcy f = 4 × Fanning f).'],
  },

  pumps: {
    overview: 'Pumps and compressors: pump characteristic curves, NPSH and cavitation, affinity laws, and compressor power.',
    sections: [
      ['Pump characteristics and NPSH', [
        'Centrifugal pump curve: head falls with flow; operating point where it meets the system curve (static head + friction ∝ Q²).',
        'NPSH_available = (P_suction − P_vapour)/(ρg) + V²/(2g) at the pump inlet (or P_tank/(ρg) + z − h_f − P_v/(ρg)). Must exceed NPSH_required to avoid cavitation.',
        'Affinity laws: Q ∝ N, H ∝ N², P ∝ N³ (same diameter).',
        'Positive displacement (reciprocating, gear) pumps give nearly constant flow regardless of head; need a relief valve.',
        'Pump power = ρgQH/η.',
      ]],
      ['Compressors and power', [
        'Isothermal work W = P₁V₁ ln(P₂/P₁) (minimum). Adiabatic W = (γ/(γ − 1))P₁V₁[(P₂/P₁)^((γ−1)/γ) − 1].',
        'Multistage with perfect intercooling: equal pressure ratio per stage, r = (P_final/P_initial)^(1/n), minimises work.',
        'Volumetric efficiency of a reciprocating compressor = 1 + c − c(P₂/P₁)^(1/n) (c = clearance fraction).',
      ]],
    ],
    exam: ['NPSH available (NAT).', 'Compressor power or optimum interstage pressure.', 'New flow/head after a speed change.'],
    traps: ['Ignoring vapour pressure or friction losses when calculating NPSH.'],
  },

  size: {
    overview: 'Size reduction and screening: laws of comminution, crushers and mills, and particle size analysis.',
    sections: [
      ['Laws of comminution', [
        "Rittinger (fine grinding, new surface): E = K_R(1/D₂ − 1/D₁).",
        "Kick (coarse crushing): E = K_K ln(D₁/D₂) — energy depends on the reduction ratio only.",
        "Bond (intermediate): W = 10W_i(1/√P₈₀ − 1/√F₈₀) (W_i = work index, sizes in µm, kWh/t).",
        'Crushers: jaw and gyratory (coarse), roll crushers, ball mills (fine). Ball mill critical speed N_c = (1/2π)√(g/(R − r)) ≈ 42.3/√(D − d) rpm (D, d in m); operate at 65–80% of N_c.',
      ]],
      ['Screening and particle size analysis', [
        'Tyler mesh: number of openings per inch; the opening ratio between successive screens is √2.',
        'Screen effectiveness = recovery of oversize × recovery of undersize (from material balances).',
        'Mean diameters: volume–surface (Sauter) mean D_s = 1/Σ(xᵢ/Dᵢ); mass mean Σxᵢ Dᵢ.',
        'Specific surface of particles A_w = 6/(φ_s ρ_p D) (per unit mass).',
      ]],
    ],
    exam: ['Energy for size reduction by Rittinger/Kick/Bond (NAT).', 'Critical speed of a ball mill.', 'Screen effectiveness.'],
    traps: ['Applying Kick’s law to fine grinding (use Rittinger).'],
  },

  separation: {
    overview: 'Mechanical separations: filtration theory, settling and sedimentation, cyclones and centrifuges, and agitation and mixing.',
    sections: [
      ['Filtration theory', [
        'Constant-pressure filtration: t/V = (μαc/(2A²ΔP))V + μR_m/(AΔP). Plot t/V against V: slope gives specific cake resistance α, intercept the medium resistance R_m.',
        'Compressible cakes: α = α₀ΔPˢ (s = compressibility, 0 to 1).',
        'Constant-rate filtration: pressure rises linearly with time (incompressible cake).',
        'Washing time on a plate-and-frame press: wash rate = ¼ of the final filtration rate (path doubled, area halved).',
      ]],
      ['Settling and sedimentation', [
        'Stokes’ law (Re < 1): v_t = gd²(ρ_p − ρ)/(18μ). Newton’s regime (Re > 1000): C_D ≈ 0.44, v_t ∝ √d.',
        'Hindered settling is slower (Richardson–Zaki: v = v_t εⁿ).',
        'Thickener area from Kynch / Coe–Clevenger batch settling tests.',
      ]],
      ['Cyclones, centrifuges and agitation', [
        'Centrifugal separation factor = ω²r/g. Settling velocity in a centrifuge replaces g with ω²r.',
        'Cyclone cut size d₅₀: particles collected with 50% efficiency.',
        'Agitation: power number N_p = P/(ρN³D⁵); constant in the turbulent regime (P ∝ N³D⁵); in laminar regime N_p ∝ 1/Re (P ∝ μN²D³).',
        'Baffles prevent vortexing. Scale-up by constant power per volume or tip speed.',
      ]],
    ],
    exam: ['Filtration time or cake resistance from data (NAT).', 'Terminal settling velocity.', 'Agitator power on scale-up.'],
    traps: ['Applying Stokes’ law outside Re < 1.'],
  },
};
