// Offline key notes: CS · Computer Organization & Architecture. Keys are chapter ids from data.js.
export const CONTENT = {
  instructions: {
    overview: 'Machine instructions questions count bits in an instruction format, identify addressing modes from code, or work out how many instructions of each type an expanding opcode allows.',
    sections: [
      ['Instruction formats', [
        'Fields: opcode, register specifiers, address or immediate. Bits for k registers = ⌈log₂k⌉; for a memory of 2ᵐ words, an address needs m bits.',
        '0-, 1-, 2- and 3-address instructions: stack machines use 0, accumulator machines 1.',
      ]],
      ['Addressing modes', [
        '**Immediate:** operand in the instruction (constants). **Register / direct:** operand in a register / at the given address.',
        '**Indirect:** the address holds the address of the operand (pointers). **Register indirect:** register holds the address.',
        '**Indexed / base:** EA = base + offset (arrays, records). **PC-relative:** EA = PC + offset (branches, position-independent code).',
        '**Auto-increment / decrement:** stepping through arrays and stacks.',
      ]],
      ['RISC vs CISC', [
        'RISC: fixed-length instructions, load–store architecture, many registers, simple modes, one instruction per cycle in a pipeline, hardwired control.',
        'CISC: variable-length instructions, memory operands, many modes, often microprogrammed control.',
      ]],
      ['Expanding opcodes', [
        'With an n-bit opcode space, each unused opcode pattern of a longer-address instruction frees 2^(address bits) patterns for the next type.',
        'Example: 16-bit instruction, 4-bit opcode, 3 address fields of 4 bits. If there are 14 three-address instructions, 2 patterns remain, giving 2 × 16 = 32 possible two-address instructions.',
      ]],
    ],
    exam: ['Maximum number of instructions of a given type with expanding opcodes (NAT).', 'Which addressing mode suits pointers, arrays or relocatable code.'],
    traps: ['Counting the number of memory accesses for indirect addressing: one extra access per level of indirection.'],
  },

  alu: {
    overview: 'ALU and datapath questions are lower weight: control unit design, microprogram word sizes, and Booth’s multiplication.',
    sections: [
      ['Datapath and control', [
        'Datapath: registers, ALU, buses and multiplexers. The control unit generates the signals that move data each cycle.',
        '**Hardwired control:** fast, built from logic; hard to change (RISC).',
        '**Microprogrammed control:** control memory holds microinstructions; easier to change, slower (CISC).',
        'Horizontal microcode: one bit per control signal (wide, fast, parallel). Vertical: encoded fields (narrow, needs decoders).',
      ]],
      ['Control word size', [
        'Microinstruction = control field + condition (branch) field + next-address field. Next-address bits = log₂(control memory words).',
        'Encoding k mutually exclusive signals in a vertical field needs ⌈log₂(k + 1)⌉ bits (one code for “none”).',
      ]],
      ["Booth's multiplication", [
        'Scan pairs (Qᵢ, Qᵢ₋₁): 10 → subtract M; 01 → add M; 00 or 11 → no operation; then arithmetic shift right.',
        'Works directly on 2’s-complement signed numbers. Worst case is alternating bits (…0101); best is long runs of 1s or 0s.',
      ]],
    ],
    exam: ['Control memory size or microinstruction width (NAT).', 'Number of additions/subtractions Booth’s algorithm performs for a multiplier.'],
    traps: ['Forgetting the implicit Q₋₁ = 0 to the right of the LSB in Booth’s algorithm.'],
  },

  pipelining: {
    overview: 'Pipelining is one of the most asked COA topics: speed-up, throughput, and stall cycles from data, control and structural hazards.',
    sections: [
      ['Performance', [
        'k-stage pipeline, n instructions, cycle time τ: time = (k + n − 1)τ. Non-pipelined: nkτ (with equal stages).',
        'Speed-up = nk/(k + n − 1) → k as n grows. With unequal stages, the cycle time is the slowest stage plus latch delay.',
        'With stalls: CPI = 1 + stall cycles per instruction; speed-up = pipeline depth/(1 + stalls per instruction), if stages are balanced.',
      ]],
      ['Data hazards', [
        'RAW (true dependency) is the real hazard in in-order pipelines; WAR and WAW matter with out-of-order execution.',
        '**Operand forwarding** removes most RAW stalls; a load followed by a dependent use still needs one stall (load-use hazard) in the classic 5-stage pipeline.',
      ]],
      ['Control hazards', [
        'A taken branch flushes instructions fetched after it. Branch penalty = number of stages before the branch is resolved.',
        'Effective CPI = 1 + (branch fraction × taken fraction × penalty) for predict-not-taken.',
        'Remedies: delayed branch, branch prediction, resolving branches earlier.',
      ]],
      ['Structural hazards', [
        'Two instructions need the same resource in the same cycle (single memory for instruction fetch and data). Fix by duplicating resources (split caches).',
      ]],
    ],
    formulas: ['Throughput = 1 instruction per cycle ideally.', 'Efficiency = speed-up/k.'],
    exam: ['Total cycles for a code sequence with dependencies, with and without forwarding (NAT).', 'Speed-up of a pipeline with unequal stage delays.'],
    traps: ['Using the average stage delay instead of the maximum for the clock period.', 'Forgetting the latch (buffer) delay added to each stage.'],
  },

  cache: {
    overview: 'Cache and memory hierarchy is the highest-weight COA topic: address splitting (tag/index/offset), hit and miss accounting, average access time, and virtual memory with TLBs.',
    sections: [
      ['Mapping', [
        'Address = tag | index | block offset. Offset bits = log₂(block size). Index bits = log₂(number of sets).',
        '**Direct-mapped:** sets = lines. **Fully associative:** one set, no index. **k-way set-associative:** sets = lines/k.',
        'Tag-memory size = lines × (tag bits + valid + dirty + other status bits).',
        'Misses: compulsory, capacity, conflict (conflict misses vanish with full associativity).',
      ]],
      ['Replacement and write policies', [
        'LRU, FIFO, random. LRU needs bookkeeping bits per set.',
        '**Write-through:** memory updated on every write (often with a write buffer). **Write-back:** only when a dirty block is evicted.',
        'Write-allocate (fetch on write miss) usually pairs with write-back; no-write-allocate with write-through.',
      ]],
      ['Average memory access time', [
        'AMAT = hit time + miss rate × miss penalty.',
        'Simultaneous (parallel) access to levels: T = h₁t₁ + (1 − h₁)h₂t₂ + (1 − h₁)(1 − h₂)t₃.',
        'Hierarchical access: T = t₁ + (1 − h₁)(t₂ + (1 − h₂)t₃).',
      ]],
      ['Main memory and virtual memory', [
        'Interleaving across modules lets consecutive words be fetched in parallel.',
        'Page table entries = virtual address space / page size. Page-table size = entries × PTE size.',
        'Effective access time with TLB: EAT = h(t_TLB + t_mem) + (1 − h)(t_TLB + 2t_mem) for a single-level table.',
      ]],
    ],
    formulas: ['Number of lines = cache size / block size.', 'Tag bits = physical address bits − index bits − offset bits.'],
    exam: ['Tag size or total tag memory for a set-associative cache (NAT).', 'Count hits and misses for an access sequence under LRU.', 'Miss rate of a loop over an array given block size.'],
    traps: ['Using the virtual address width when the cache is physically addressed (or vice versa).', 'Forgetting that a miss penalty may include writing back a dirty block.'],
  },

  io: {
    overview: 'I/O questions compute the fraction of CPU time spent on I/O under programmed, interrupt-driven and DMA transfer, and disk access times.',
    sections: [
      ['Programmed and interrupt-driven I/O', [
        'Programmed I/O: the CPU polls the device status (busy waiting), wasting cycles.',
        'Interrupt-driven: the device interrupts when ready; overhead per transfer = interrupt service time.',
        'Vectored interrupts supply the handler address directly; daisy chaining sets priority by position.',
      ]],
      ['DMA', [
        'The DMA controller moves blocks between device and memory; the CPU only sets it up and handles a completion interrupt.',
        '**Burst (block) mode:** DMA holds the bus for the whole block; CPU blocked meanwhile.',
        '**Cycle stealing:** DMA takes one bus cycle at a time; CPU slowed but not stopped.',
        '% CPU time lost in cycle stealing = (time to transfer one word)/(time to prepare one word) × 100, as commonly asked.',
      ]],
      ['Disk access time', [
        'Access time = seek + rotational latency + transfer. Average rotational latency = half a rotation.',
        'Transfer rate = bytes per track × rotations per second. Capacity = surfaces × tracks × sectors × bytes per sector.',
      ]],
    ],
    exam: ['Percentage of CPU time consumed by DMA or interrupts (NAT).', 'Disk capacity and average access time.'],
    traps: ['Using full rotation time instead of half for average latency.', 'Mixing kilobytes (2¹⁰) and transfer rates in 10³ units.'],
  },
};
