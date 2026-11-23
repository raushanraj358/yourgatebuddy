// Offline key notes: EC · Digital Circuits. Built from the CS digital-logic and EE electronics notes plus EC-specific parts.
import { CONTENT as DL } from './cs-dl.js';
import { CONTENT as ADE } from './ee-ade.js';

export const CONTENT = {
  numbers: {
    overview: DL['number-rep'].overview,
    sections: [
      ...DL['number-rep'].sections,
      ['Binary arithmetic and codes', [
        'BCD: each decimal digit in 4 bits; after a BCD addition, add 6 (0110) when a digit exceeds 9 or produces a carry.',
        'Excess-3 = BCD + 3 (self-complementing). Gray code changes one bit between successive values.',
        'Hamming code: parity bits at positions 1, 2, 4, 8…; 2ᵖ ≥ m + p + 1 for m data bits.',
      ]],
    ],
    formulas: DL['number-rep'].formulas,
    exam: DL['number-rep'].exam,
    traps: DL['number-rep'].traps,
  },

  combinational: {
    overview: 'Combinational logic: Boolean algebra and K-maps, CMOS gate design, multiplexers, decoders and adders, and arithmetic circuits.',
    sections: [
      ...DL.boolean.sections.slice(0, 2),
      ['CMOS logic gates', [
        'Pull-down network of NMOS implements the complement of the function; the pull-up PMOS network is its dual (series ↔ parallel).',
        'A CMOS gate is naturally inverting: NAND and NOR are single stages; AND/OR need an extra inverter.',
        'Static power is nearly zero; dynamic power P = αCV_DD²f.',
        'NAND is preferred over NOR because series PMOS (slower holes) is avoided in the pull-up.',
      ]],
      ...DL.combinational.sections,
    ],
    exam: ['Function of a given CMOS transistor network.', 'Function realised by a MUX or decoder circuit.', 'Delay of a ripple-carry adder.'],
    traps: ['Reading the pull-down network as the function itself; the output is its complement.'],
  },

  sequential: DL.sequential,

  converters: {
    overview: 'Data converters: sample-and-hold, ADC architectures and their speed, and DAC types and resolution.',
    sections: [
      ['Sample and hold', [
        'Tracks the input, then holds it constant while the ADC converts. Key specs: acquisition time, aperture time, droop rate.',
        'Aperture uncertainty limits the highest input frequency: t_a < 1/(2πf·2ⁿ) for ½-LSB accuracy (approx.).',
      ]],
      ['ADCs: flash and SAR', ADE.digital.sections[3][1]],
      ['DACs: R-2R and weighted', [
        'Weighted-resistor DAC: resistors R, 2R, 4R… needs a wide range of precise values.',
        'R-2R ladder: only two values; output = −V_ref (R_f/R) × (digital value/2ⁿ) for the common inverting form.',
        'Monotonicity, settling time, offset and gain errors are the main specs.',
      ]],
    ],
    exam: ['DAC output for a given binary input (NAT).', 'Number of comparators in a flash ADC or clock cycles for SAR.'],
    traps: ['Mixing 2ⁿ and 2ⁿ − 1 in resolution; follow the question’s definition.'],
  },

  computer: {
    overview: 'Computer organisation basics for EC: memory types and organisation, microprocessor basics, and addressing modes.',
    sections: [
      ['Memory types', [
        'SRAM: 6 transistors per cell, fast, no refresh (caches). DRAM: 1 transistor + 1 capacitor, dense, needs refresh (main memory).',
        'ROM, PROM, EPROM (UV erase), EEPROM (electrical byte erase), Flash (block erase).',
        'Memory size: 2ⁿ locations × m bits needs n address lines and m data lines. Building a 2ᴺ × M memory from 2ⁿ × m chips needs (2ᴺ/2ⁿ)(M/m) chips.',
      ]],
      ['Microprocessor basics', ADE.micro.sections[0][1]],
      ['Addressing modes', ADE.micro.sections[1][1]],
    ],
    exam: ['Number of chips and address lines for a memory system (NAT).', 'Register contents after a short 8085 program.'],
    traps: ['Forgetting that DRAM needs refresh and SRAM does not.'],
  },
};
