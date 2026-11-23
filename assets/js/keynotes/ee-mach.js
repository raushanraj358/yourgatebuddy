// Offline key notes: EE · Electrical Machines. Keys are chapter ids from data.js.
export const CONTENT = {
  transformers: {
    overview: 'Transformers are the highest-weight machines topic: equivalent circuit, open- and short-circuit tests, regulation, efficiency, auto-transformers and three-phase connections.',
    sections: [
      ['Equivalent circuit', [
        'E = 4.44 f N Φ_m. Turns ratio a = N₁/N₂ = V₁/V₂ = I₂/I₁ (ideal).',
        'Refer impedances with a²: Z referred to the primary = a²Z₂.',
        'Shunt branch: core-loss resistance R_c and magnetising reactance X_m. Series branch: winding resistance and leakage reactance.',
      ]],
      ['OC and SC tests', [
        '**Open-circuit test** (LV side, rated voltage): gives core (iron) loss and the shunt branch.',
        '**Short-circuit test** (HV side, rated current at reduced voltage): gives copper loss and the series impedance.',
      ]],
      ['Regulation and efficiency', [
        'Regulation ≈ (I R cos φ ± I X sin φ)/V (+ lagging, − leading); can be negative at leading pf.',
        'Efficiency = output/(output + core loss + copper loss). Copper loss ∝ (load fraction)².',
        'Maximum efficiency when copper loss = core loss, i.e. at load fraction x = √(P_core/P_cu,FL).',
        'All-day efficiency = energy output / energy input over 24 hours (distribution transformers).',
      ]],
      ['Auto-transformers', [
        'Saves copper: weight of copper ∝ (1 − 1/a) relative to a two-winding transformer for ratio a (a > 1).',
        'kVA rating as an auto-transformer = two-winding rating × a/(a − 1) when reconnected (conductive + inductive transfer).',
      ]],
      ['Three-phase connections', [
        'Y–Y, Δ–Δ, Y–Δ, Δ–Y. Y–Δ and Δ–Y introduce a 30° phase shift (vector groups such as Dyn11).',
        'Open delta (V–V) carries 57.7% of the full Δ–Δ rating (86.6% of the two transformers’ combined rating).',
      ]],
    ],
    exam: ['Maximum efficiency and the load at which it occurs (NAT).', 'Regulation at a given power factor.', 'kVA of an auto-transformer connection.'],
    traps: ['Scaling core loss with load (it is constant at constant voltage and frequency).'],
  },

  dc: {
    overview: 'DC machines: EMF and torque equations, generator and motor characteristics, speed control, armature reaction and commutation.',
    sections: [
      ['EMF and torque', [
        'E = PΦNZ/(60A), where A = P for lap and 2 for wave winding.',
        'Torque T = PΦZI_a/(2πA) = E I_a/ω. So E ∝ ΦN and T ∝ ΦI_a.',
        'Motor: V = E_b + I_aR_a. Generator: E = V + I_aR_a.',
      ]],
      ['Types and characteristics', [
        '**Shunt motor:** nearly constant speed. **Series motor:** T ∝ I_a² before saturation, high starting torque; never start on no load (runs away).',
        '**Compound:** cumulative or differential.',
        'Generators need residual magnetism and field resistance below the critical value to build up.',
      ]],
      ['Speed control', [
        'N ∝ (V − I_aR_a)/Φ. Field weakening raises speed above base; armature voltage control below base (Ward–Leonard).',
        'Armature resistance control is simple but wasteful.',
      ]],
      ['Armature reaction and commutation', [
        'Armature MMF distorts and weakens the main field, shifting the magnetic neutral axis. Compensating windings and interpoles reduce it.',
        'Interpoles assist commutation by inducing a voltage that reverses coil current in time.',
      ]],
      ['Losses and efficiency', ['Maximum efficiency when variable (copper) loss = constant loss.']],
    ],
    exam: ['New speed after a change in load or field current (NAT).', 'Back EMF, torque or efficiency of a motor.'],
    traps: ['Forgetting that a shunt field current changes when terminal voltage changes.'],
  },

  induction: {
    overview: 'Induction machines are high-weightage: slip, the equivalent circuit, the torque–slip curve, starting and speed control, and single-phase motors.',
    sections: [
      ['Rotating field and slip', [
        'Synchronous speed N_s = 120f/P. Slip s = (N_s − N)/N_s. Rotor current frequency = s·f.',
        'Rotor never reaches synchronous speed while motoring (no relative motion, no torque).',
      ]],
      ['Equivalent circuit and power flow', [
        'Rotor branch R₂′/s; split as R₂′ (copper loss) + R₂′(1 − s)/s (mechanical load).',
        'Air-gap power P_ag : rotor copper loss : mechanical power = 1 : s : (1 − s).',
      ]],
      ['Torque–slip characteristics', [
        'T ∝ sR₂V²/(R₂² + (sX₂)²). At small slip T ∝ s (linear region); at large slip T ∝ 1/s.',
        'Maximum torque at s_max = R₂/X₂; T_max ∝ V²/(2X₂), independent of rotor resistance.',
        'Adding rotor resistance increases s_max and starting torque (slip-ring motors); T_start = T_max when R₂ = X₂.',
        'Torque ∝ V²: a 10% voltage drop cuts torque by about 19%.',
      ]],
      ['Starting and speed control', [
        'DOL starting current ≈ 5–7 × full load. Star–delta starter reduces starting current and torque to 1/3.',
        'Auto-transformer starter with tapping x: line current and torque both scale by x².',
        'Speed control: pole changing, V/f control (constant flux), rotor resistance, slip-power recovery.',
      ]],
      ['Single-phase induction motors', [
        'A pulsating field = two counter-rotating fields (double revolving field theory); no starting torque on its own.',
        'Starting methods: split-phase, capacitor-start, capacitor-run, shaded pole.',
      ]],
    ],
    exam: ['Rotor copper loss or efficiency from slip (NAT).', 'Slip at maximum torque; effect of supply voltage on torque.', 'Starting current with star–delta or auto-transformer starters.'],
    traps: ['Using rotor input = output; rotor copper loss is s times air-gap power.'],
  },

  synchronous: {
    overview: 'Synchronous machines: EMF equation, armature reaction, voltage regulation methods, parallel operation, and synchronous motor V-curves.',
    sections: [
      ['EMF and armature reaction', [
        'E = 4.44 f Φ N_ph K_p K_d (pitch and distribution factors). f = PN/120.',
        'Armature reaction at lagging pf demagnetises; at leading pf it magnetises; at unity pf it cross-magnetises.',
        'Synchronous reactance X_s = leakage reactance + armature reaction reactance.',
      ]],
      ['Voltage regulation', [
        'E = V + I(R_a + jX_s). Regulation = (E − V)/V.',
        'EMF (synchronous impedance) method is pessimistic; MMF method optimistic; ZPF (Potier) is most accurate.',
        'Short-circuit ratio (SCR) ≈ 1/X_s (saturated value, per unit). A high SCR means better stability but a bigger, costlier machine.',
      ]],
      ['Power and parallel operation', [
        'Power P = (EV/X_s) sin δ (cylindrical rotor, R_a neglected); maximum at δ = 90°.',
        'Salient pole adds a reluctance term: (V²/2)(1/X_q − 1/X_d) sin 2δ.',
        'Synchronising conditions: equal voltage, frequency and phase sequence, and in phase.',
        'Changing excitation of a generator on an infinite bus changes reactive power; changing the prime mover input changes real power.',
      ]],
      ['Synchronous motors and V-curves', [
        'Runs only at synchronous speed; not self-starting (damper windings help start as induction motor).',
        'V-curves: armature current vs field current at constant load. Over-excited motor draws leading current (synchronous condenser); under-excited draws lagging.',
      ]],
    ],
    exam: ['Excitation EMF and load angle for a given load (NAT).', 'Effect of changing field current on power factor.'],
    traps: ['Thinking excitation changes real power output on an infinite bus.'],
  },
};
