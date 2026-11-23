// Offline key notes: CH · Heat Transfer. Built from the ME heat-transfer notes plus evaporators. Keys are chapter ids.
import { CONTENT as HT } from './me-ht.js';

export const CONTENT = {
  conv: {
    overview: 'Conduction and convection: steady conduction with thermal resistances, forced and free convection correlations, and overall heat transfer coefficients.',
    sections: [HT.conduction.sections[0], HT.conduction.sections[1], ...HT.convection.sections],
    exam: ['Heat loss through an insulated pipe (NAT).', 'Film coefficient from Dittus–Boelter.', 'Critical radius of insulation.'],
    traps: [...HT.convection.traps],
  },

  radiation: HT.radiation,

  exchangers: {
    overview: 'Heat exchangers: double-pipe and shell-and-tube designs, LMTD and NTU methods, and fouling.',
    sections: [
      ['Double pipe and shell-and-tube', [
        'Double pipe: simple, for small duties; true counter-flow possible.',
        'Shell-and-tube: baffles raise shell-side coefficient; 1-2 (one shell pass, two tube passes) needs the LMTD correction factor F.',
        'Put the fouling, corrosive or high-pressure fluid in the tubes (easier to clean, cheaper to contain).',
        'Tube-side h from Dittus–Boelter; shell-side from Kern or Bell–Delaware methods.',
      ]],
      ...HT.exchangers.sections,
      ['Fouling', [
        '1/U_o = 1/h_o + R_fo + (D_o ln(D_o/D_i))/(2k) + R_fi(D_o/D_i) + (1/h_i)(D_o/D_i) (based on outer area).',
        'Fouling factors lower U over time; design with allowances and cleaning schedules. Clean U vs dirty U gives the cleanliness factor.',
      ]],
    ],
    exam: ['Area of an exchanger by LMTD or ε–NTU (NAT).', 'Overall coefficient with fouling.'],
    traps: [...HT.exchangers.traps, 'Mixing inner- and outer-area bases when combining resistances.'],
  },

  evaporators: {
    overview: 'Boiling and condensation coefficients, and single- and multiple-effect evaporators with steam economy.',
    sections: [
      ['Boiling and condensation', [
        'Pool boiling curve: natural convection, nucleate boiling (very high h), critical heat flux, transition, film boiling (Leidenfrost).',
        'Operate in nucleate boiling, below the critical heat flux.',
        'Film condensation (Nusselt): vertical plate h ∝ [ρ²gλk³/(μLΔT)]^(1/4). Horizontal tubes: h ∝ (1/D)^(1/4); tube bundle of N rows: h_N = h₁N^(−1/4).',
        'Dropwise condensation gives much higher coefficients than film condensation.',
      ]],
      ['Single and multiple-effect evaporators', [
        'Energy balance: steam heat = feed sensible heat + latent heat of vapour: S λ_s = F c_p(T − T_F) + Vλ.',
        'Boiling point elevation (Dühring’s rule) reduces the available temperature difference.',
        'Steam economy = kg vapour / kg steam ≈ number of effects (n effects give economy close to n).',
        'Capacity of n effects ≈ that of a single effect with the same total ΔT; economy rises but capacity does not.',
        'Feed arrangements: forward (no pumps between effects), backward (better for viscous liquids), mixed, parallel.',
        'Vapour recompression (thermal or mechanical) improves economy.',
      ]],
    ],
    exam: ['Steam consumption or economy of an evaporator (NAT).', 'Heat flux regime on the boiling curve.'],
    traps: ['Ignoring boiling point elevation when computing ΔT.'],
  },
};
