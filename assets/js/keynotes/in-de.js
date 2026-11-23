// Offline key notes: IN · Digital Electronics. Built from the CS, EE and EC digital notes plus logic families. Keys are chapter ids.
import { CONTENT as DL } from './cs-dl.js';
import { CONTENT as ADE } from './ee-ade.js';
import { CONTENT as DC } from './ec-dc.js';

export const CONTENT = {
  families: {
    overview: 'Logic families: TTL and CMOS characteristics, and the figures of merit — fan-out, noise margin, propagation delay and power.',
    sections: [
      ['TTL and CMOS', [
        'TTL (bipolar): totem-pole output, 5 V supply; floating inputs act as logic 1. Open-collector outputs allow wired-AND with a pull-up.',
        'CMOS: complementary PMOS/NMOS; nearly zero static power; dynamic power P = CV_DD²f (rises with frequency); very high input impedance.',
        'ECL: non-saturating, fastest, high power. Schottky TTL avoids saturation for speed.',
        'Tri-state outputs (0, 1, high-Z) allow bus sharing.',
      ]],
      ['Fan-out, noise margin and propagation delay', [
        'Noise margins: NM_H = V_OH − V_IH; NM_L = V_IL − V_OL. For standard TTL both are 0.4 V.',
        'Fan-out = min(I_OH/I_IH, I_OL/I_IL); standard TTL fan-out is 10.',
        'Propagation delay t_pd = (t_PHL + t_PLH)/2. Speed–power product (pJ) is the figure of merit.',
      ]],
    ],
    exam: ['Noise margin or fan-out from given currents and voltages (NAT).', 'Dynamic power of a CMOS circuit.'],
    traps: ['Forgetting that unused TTL inputs float high while CMOS inputs must never float.'],
  },

  circuits: {
    overview: 'Combinational and sequential circuits: Boolean algebra and K-maps, multiplexers and decoders, flip-flops, counters and registers.',
    sections: [...DL.boolean.sections.slice(0, 2), ...DL.combinational.sections.slice(1, 3), ...DL.sequential.sections.slice(0, 3)],
    exam: ['Minimised expression from a K-map.', 'Function realised by a MUX.', 'Modulus or sequence of a counter.'],
    traps: [...DL.boolean.traps, ...DL.sequential.traps],
  },

  converters: {
    overview: 'ADC and DAC: converter types and conversion time, DAC resolution, and microcontroller basics.',
    sections: [
      ...DC.converters.sections,
      ['Microcontroller basics', [
        'A microcontroller integrates CPU, RAM, ROM/flash, timers, I/O ports, ADC and serial interfaces on one chip (e.g. 8051).',
        '8051: 8-bit, 4 KB on-chip ROM, 128 bytes RAM, 4 I/O ports, 2 timers, 1 serial port, 5 interrupt sources; Harvard architecture.',
        'Microprocessor (8085) needs external memory and peripherals.',
      ]],
      ADE.micro.sections[0],
    ],
    exam: ['Conversion time of an ADC or DAC output voltage (NAT).', 'Number of comparators in a flash ADC.'],
    traps: [...DC.converters.traps],
  },
};
