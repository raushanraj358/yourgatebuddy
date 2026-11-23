// Offline key notes: IN · Sensors & Industrial Instrumentation. Keys are chapter ids from data.js.
export const CONTENT = {
  displacement: {
    overview: 'Displacement and strain sensors: resistive, capacitive and inductive transducers, the LVDT, strain gauges with bridge circuits, and piezoelectric sensors.',
    sections: [
      ['Resistive, capacitive and inductive sensors', [
        'Potentiometer: output ∝ displacement; loading by the meter makes it non-linear (error largest near x ≈ 2/3 of travel).',
        'Capacitive: C = εA/d. Changing gap d gives non-linear (1/d) response; changing area or dielectric is linear. Differential (push–pull) arrangement linearises.',
        'Variable-reluctance inductive sensors: L ∝ 1/(gap).',
      ]],
      ['LVDT', [
        'One primary, two secondaries in series opposition: output ∝ core displacement, phase shows direction; zero at the null position (small residual voltage).',
        'Linear over a limited range; infinite resolution; no friction. Needs phase-sensitive demodulation for a DC output.',
        'Excitation frequency should be about 10 times the highest displacement frequency.',
      ]],
      ['Strain gauges and bridges', [
        'Gauge factor GF = (ΔR/R)/ε = 1 + 2ν + (Δρ/ρ)/ε; ≈ 2 for metal foil, 100+ for semiconductor gauges.',
        'Quarter bridge output ≈ (V/4)GF ε; half bridge (two active arms) doubles it; full bridge quadruples it.',
        'Temperature compensation with a dummy gauge in the adjacent arm. Poisson arrangement on a bar under tension gives (V/4)GF ε(1 + ν).',
      ]],
      ['Piezoelectric sensors', [
        'Charge q = dF (d = charge sensitivity, C/N). Voltage V = q/C. Quartz, PZT, PVDF.',
        'Cannot measure static force: the charge leaks through the time constant RC (high-pass response). Charge amplifiers extend the low-frequency range.',
        'Equivalent circuit is a charge source with capacitance; high natural frequency makes them good for dynamic pressure and acceleration.',
      ]],
    ],
    exam: ['Bridge output for given strain and gauge factor (NAT).', 'Sensitivity of a capacitive sensor.', 'Low-frequency cutoff of a piezoelectric sensor.'],
    traps: ['Using a piezoelectric sensor for static measurements.'],
  },

  temperature: {
    overview: 'Temperature sensors: thermocouples, RTDs and thermistors, and radiation pyrometers.',
    sections: [
      ['Thermocouples', [
        'Seebeck effect: EMF depends on the hot–cold junction temperature difference.',
        'Laws: intermediate metals (a third metal at uniform temperature adds no EMF), intermediate temperatures (E(T₁,T₃) = E(T₁,T₂) + E(T₂,T₃)).',
        'Cold-junction compensation is needed. Types: K (chromel–alumel, general purpose), J, T (low temperature), R/S/B (platinum–rhodium, high temperature).',
        'Typical sensitivity ≈ 40 µV/°C for type K.',
      ]],
      ['RTDs and thermistors', [
        'RTD: R = R₀(1 + αT); platinum α ≈ 0.00385/°C (Pt100 = 100 Ω at 0 °C). Very linear and stable.',
        'Three- or four-wire connections cancel lead resistance. Self-heating error from excitation current.',
        'Thermistor (NTC): R = R₀ e^(β(1/T − 1/T₀)) (T in K); very sensitive, highly non-linear, narrow range.',
      ]],
      ['Pyrometers', [
        'Total radiation pyrometer: uses σT⁴; corrections for emissivity (T_true = T_measured/ε^(1/4)).',
        'Optical (disappearing filament) pyrometer: compares brightness at one wavelength.',
        'Two-colour (ratio) pyrometer reduces the effect of emissivity.',
      ]],
    ],
    exam: ['Temperature from an RTD or thermistor resistance (NAT).', 'Thermocouple EMF using the law of intermediate temperatures.'],
    traps: ['Using Celsius in the thermistor equation; it needs kelvin.'],
  },

  'pressure-flow': {
    overview: 'Pressure, flow, level and viscosity measurement: elastic pressure elements, differential pressure flowmeters, electromagnetic and ultrasonic meters, and level and viscosity instruments.',
    sections: [
      ['Pressure gauges and diaphragms', [
        'Elastic elements: Bourdon tube (high pressure), bellows (low), diaphragm (dynamic, with strain gauges or capacitive pickup).',
        'Manometers for low pressure; McLeod, Pirani (thermal conductivity) and ionisation gauges for vacuum.',
        'Dead-weight tester is the primary standard for calibrating pressure gauges.',
      ]],
      ['Differential pressure flowmeters', [
        'Q = C_d A₂√(2Δp/ρ)/√(1 − β⁴), β = d/D. Flow ∝ √Δp, so square-root extraction is needed and rangeability is about 3:1 to 4:1.',
        'Orifice (cheap, high permanent loss), venturi (low loss, costly), flow nozzle, pitot tube (point velocity).',
        'Rotameter (variable area): float position ∝ flow; constant pressure drop.',
      ]],
      ['Electromagnetic and ultrasonic flowmeters', [
        'Electromagnetic: E = BDv (Faraday); needs a conductive liquid; no obstruction, linear, independent of viscosity and density.',
        'Ultrasonic transit-time: Δt ≈ 2Lv cos θ/c²; Doppler type needs particles or bubbles.',
        'Turbine meter: frequency ∝ flow; vortex shedding meter: f = St·v/d. Coriolis meter measures mass flow directly.',
        'Hot-wire anemometer: King’s law I²R = (A + B√v)(T_w − T_f).',
      ]],
      ['Level and viscosity measurement', [
        'Level: float, displacer, differential pressure (h = Δp/(ρg)), capacitive, ultrasonic, radar, radioactive (non-contact).',
        'Viscosity: capillary (Hagen–Poiseuille), falling sphere (Stokes), rotational (Couette) viscometers.',
      ]],
    ],
    exam: ['Flow rate through an orifice from Δp (NAT).', 'EMF of an electromagnetic flowmeter.', 'Level from a differential pressure reading.'],
    traps: ['Forgetting that DP flowmeters read Δp ∝ Q²: halving flow quarters Δp.'],
  },
};
