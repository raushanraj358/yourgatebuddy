// Offline key notes: EC · Control Systems. Built from the EE control-systems notes. Keys are chapter ids from data.js.
import { CONTENT as CS } from './ee-cs.js';

export const CONTENT = {
  transfer: CS.block,

  response: {
    overview: 'Time and frequency response: first- and second-order transients, steady-state errors, Bode plots, gain and phase margins, and lead/lag compensation.',
    sections: [
      ...CS.time.sections,
      ...CS.frequency.sections.filter((s) => s[0] !== 'Nyquist criterion'),
    ],
    formulas: CS.time.formulas,
    exam: [...CS.time.exam, ...CS.frequency.exam.slice(0, 1)],
    traps: [...CS.time.traps],
  },

  stability: {
    overview: 'Stability: Routh–Hurwitz, root locus, and the Nyquist criterion.',
    sections: [
      ...CS['root-locus'].sections,
      CS.frequency.sections.find((s) => s[0] === 'Nyquist criterion'),
    ],
    exam: [...CS['root-locus'].exam, 'Number of RHP closed-loop poles from a Nyquist plot.'],
    traps: [...CS['root-locus'].traps, ...CS.frequency.traps],
  },

  'state-space': CS['state-space'],
};
