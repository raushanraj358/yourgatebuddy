// Offline key notes: IN · Electrical Circuits & Machines. Built from the EE circuits and machines notes. Keys are chapter ids.
import { CONTENT as CKT } from './ee-ckt.js';
import { CONTENT as MACH } from './ee-mach.js';

export const CONTENT = {
  theorems: {
    overview: 'Circuit theorems: nodal and mesh analysis, Thevenin/Norton, superposition and maximum power transfer, and two-port networks.',
    sections: [...CKT.theorems.sections, ...CKT['two-port'].sections],
    formulas: CKT.theorems.formulas,
    exam: [...CKT.theorems.exam, ...CKT['two-port'].exam.slice(0, 1)],
    traps: [...CKT.theorems.traps, ...CKT['two-port'].traps],
  },

  transients: {
    overview: 'Transients and AC steady state: RL, RC and RLC responses, phasors and power, and resonance.',
    sections: [...CKT.transients.sections, ...CKT.ac.sections],
    formulas: [...CKT.transients.formulas, ...CKT.ac.formulas],
    exam: [...CKT.transients.exam, ...CKT.ac.exam],
    traps: [...CKT.transients.traps, ...CKT.ac.traps],
  },

  machines: {
    overview: 'Transformers and machines for instrumentation: transformer equivalent circuit, regulation and efficiency, DC machine equations, and induction motor slip and torque.',
    sections: [
      MACH.transformers.sections[0], MACH.transformers.sections[2],
      MACH.dc.sections[0], MACH.dc.sections[2],
      MACH.induction.sections[0], MACH.induction.sections[1], MACH.induction.sections[2],
    ],
    exam: ['Transformer efficiency or regulation (NAT).', 'DC motor speed after a change.', 'Induction motor slip and rotor copper loss.'],
    traps: [...MACH.transformers.traps, ...MACH.induction.traps],
  },
};
