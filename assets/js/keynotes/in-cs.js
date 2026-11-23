// Offline key notes: IN · Control Systems (process controllers are reused by CH). Built partly from the EE notes. Keys are chapter ids.
import { CONTENT as CS } from './ee-cs.js';

export const CONTENT = {
  feedback: {
    overview: 'Feedback principles: block diagrams and signal flow graphs, transfer functions, time response and steady-state error.',
    sections: [...CS.block.sections, ...CS.time.sections],
    formulas: CS.time.formulas,
    exam: [...CS.block.exam, ...CS.time.exam],
    traps: [...CS.block.traps, ...CS.time.traps],
  },

  stability: {
    overview: 'Stability analysis: Routh–Hurwitz, root locus, Bode plots and the Nyquist criterion.',
    sections: [...CS['root-locus'].sections, ...CS.frequency.sections.filter((s) => s[0] !== 'Lead and lag compensators')],
    exam: [...CS['root-locus'].exam, ...CS.frequency.exam],
    traps: [...CS['root-locus'].traps, ...CS.frequency.traps],
  },

  controllers: {
    overview: 'Process controllers: P, PI and PID action, tuning rules, feedforward, cascade and ratio control, and state-space basics.',
    sections: [
      ['P, PI and PID action', [
        'PID: u(t) = K_c[e + (1/T_i)∫e dt + T_d de/dt]; G_c(s) = K_c(1 + 1/(T_is) + T_ds).',
        '**P:** fast, but leaves an offset (steady-state error) for step changes in type-0 processes. Proportional band PB = 100/K_c %.',
        '**I:** removes offset (adds a pole at the origin) but adds phase lag and can cause oscillation; integral windup when the actuator saturates.',
        '**D:** anticipates error, adds damping and phase lead; amplifies noise; acts only on changes.',
        'PI ≈ lag compensator; PD ≈ lead compensator.',
      ]],
      ['Ziegler–Nichols tuning', [
        'Ultimate-gain (closed-loop) method: find K_u and period P_u at sustained oscillation. P: K_c = 0.5K_u. PI: 0.45K_u, T_i = P_u/1.2. PID: 0.6K_u, T_i = P_u/2, T_d = P_u/8.',
        'Process reaction curve (open-loop) method uses the dead time and slope of the step response; Cohen–Coon refines it for larger dead times.',
        'Z–N tuning aims for a quarter decay ratio (aggressive).',
      ]],
      ['Feedforward, cascade and ratio control', [
        '**Feedforward:** measures the disturbance and corrects before the output changes; ideal G_ff = −G_d/G_p; needs a good model; combined with feedback in practice.',
        '**Cascade:** inner (secondary) loop must be faster than the outer loop; rejects disturbances entering the inner loop early.',
        '**Ratio control:** keeps one flow in proportion to another (e.g. fuel–air).',
        'Split-range, override and selective control handle multiple actuators or constraints.',
      ]],
      ['State-space basics', CS['state-space'].sections[0][1].concat(CS['state-space'].sections[2][1].slice(0, 2))],
    ],
    exam: ['Ziegler–Nichols settings from ultimate gain and period (NAT).', 'Offset with proportional control.', 'Feedforward controller transfer function.'],
    traps: ['Expecting proportional-only control to remove offset for a step load change.'],
  },
};
