// Offline key notes: CH · Instrumentation & Process Control. Builds on the IN and EE control notes. Keys are chapter ids.
import { CONTENT as CS } from './ee-cs.js';
import { CONTENT as INCS } from './in-cs.js';

export const CONTENT = {
  instruments: {
    overview: 'Measuring instruments for process plants: temperature, pressure, flow and level sensors, and their dynamics.',
    sections: [
      ['Temperature', [
        'Thermocouples (wide range, need cold-junction compensation), RTDs (accurate, Pt100), thermistors (sensitive, narrow range), filled-system thermometers, pyrometers (non-contact, high temperature).',
        'A thermometer is a first-order system: τ = mc_p/(hA); in a thermowell the response becomes slower (second order or overdamped).',
      ]],
      ['Pressure', ['Manometers, Bourdon tubes, bellows and diaphragms with strain-gauge or capacitive transmitters; differential-pressure cells.', 'Vacuum: McLeod, Pirani and ionisation gauges.']],
      ['Flow', ['Orifice and venturi (Q ∝ √Δp), rotameter (variable area), magnetic (conductive liquids), turbine, vortex, ultrasonic and Coriolis (true mass flow).']],
      ['Level', ['Float and displacer, differential pressure (h = Δp/(ρg)), bubbler, capacitance, ultrasonic, radar and nuclear gauges.']],
    ],
    exam: ['Time constant of a thermometer or its reading during a ramp (NAT).', 'Which sensor suits a given service?'],
    traps: ['Forgetting the square-root relation between differential pressure and flow.'],
  },

  dynamics: {
    overview: 'Process dynamics and transfer functions: first- and second-order systems, dead time, interacting tanks, and stability by Routh and Bode.',
    sections: [
      ['First and second-order systems', [
        'First order K/(τs + 1): step response reaches 63.2% at τ; ramp response lags by τ; sinusoidal amplitude ratio 1/√(1 + ω²τ²), phase −tan⁻¹(ωτ).',
        'Liquid tank with linear outlet resistance R: τ = AR, gain R. Mercury thermometer: τ = mc_p/(hA).',
        'Two non-interacting tanks: product of first-order terms. Interacting tanks: τ₁τ₂s² + (τ₁ + τ₂ + A₁R₂)s + 1 (more sluggish).',
        'Second order: ζ < 1 underdamped; overshoot e^(−πζ/√(1−ζ²)); decay ratio = overshoot²; period T = 2πτ/√(1 − ζ²).',
        'Dead time e^(−θs): output shifted by θ; Padé approximation (1 − θs/2)/(1 + θs/2).',
        'Linearise non-linear models (e.g. outflow ∝ √h) with a Taylor series about the steady state using deviation variables.',
      ]],
      ['Stability: Routh and Bode', [
        ...CS['root-locus'].sections[0][1].slice(0, 3),
        'Bode stability: the closed loop is stable if the amplitude ratio is below 1 at the crossover frequency (phase −180°). Gain margin = 1/AR at crossover; phase margin at AR = 1.',
        'Dead time adds unlimited phase lag, so it eventually makes any loop unstable at high gain.',
      ]],
    ],
    exam: ['Response of a first-order system to a step or ramp (NAT).', 'Ultimate gain from Routh or Bode.', 'Decay ratio or overshoot of an underdamped system.'],
    traps: ['Forgetting deviation variables when writing transfer functions.'],
  },

  tuning: {
    overview: 'Controller tuning: P, PI and PID action, Ziegler–Nichols and Cohen–Coon methods, and cascade and feedforward control.',
    sections: [
      INCS.controllers.sections[0],
      ['Ziegler–Nichols and Cohen–Coon', [
        ...INCS.controllers.sections[1][1],
        'Cohen–Coon uses the first-order-plus-dead-time fit (K, τ, θ) of the process reaction curve; suits larger θ/τ than Z–N.',
        'Other criteria: IAE, ISE and ITAE minimisation; direct synthesis and IMC tuning.',
      ]],
      INCS.controllers.sections[2],
      ['Control valves', [
        'Characteristics: linear, equal-percentage (most common; good for variable pressure drop), quick-opening (on–off).',
        'Air-to-open (fail-closed) vs air-to-close (fail-open) chosen for safety on air failure.',
        'Valve sizing: Q = C_v√(ΔP/G).',
      ]],
    ],
    exam: ['Controller settings by Ziegler–Nichols (NAT).', 'Offset with P control or the effect of integral action.', 'Fail-safe valve action.'],
    traps: [...INCS.controllers.traps],
  },
};
