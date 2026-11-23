// Offline key notes: CS · Operating System. Keys are chapter ids from data.js.
export const CONTENT = {
  processes: {
    overview: 'Processes and threads: process states, what the PCB holds, context switches, threads, and the classic fork() counting questions.',
    sections: [
      ['Process states and PCB', [
        'States: new → ready → running → waiting (blocked) → ready … → terminated. Only running → waiting is caused by the process itself (I/O or event wait).',
        'PCB: process id, state, program counter, registers, scheduling info, memory-management info, open files, accounting.',
        'Context switch saves one PCB and loads another; pure overhead.',
      ]],
      ['Threads', [
        'Threads of a process share code, data, heap and open files; each has its own stack, registers and PC.',
        '**User-level threads:** fast switching, no kernel support; one blocking system call blocks the whole process (many-to-one).',
        '**Kernel-level threads:** the kernel schedules them; can run on multiple cores; switching costs more.',
      ]],
      ['System calls and fork()', [
        'A system call switches from user mode to kernel mode via a trap.',
        'fork() returns 0 in the child and the child’s PID in the parent. n successive fork() calls create 2ⁿ − 1 new processes (2ⁿ total).',
        'In conditions like fork() && fork(), short-circuiting decides which processes call the second fork.',
        'exec() replaces the process image; wait() lets a parent collect a child’s exit status (otherwise the child is a zombie).',
      ]],
    ],
    exam: ['Number of child processes or lines printed by a fork() program (NAT).', 'Which items are shared between threads?'],
    traps: ['Counting the parent as a child process.', 'Forgetting that printf output buffered before fork() may be printed twice.'],
  },

  scheduling: {
    overview: 'CPU scheduling is a reliable NAT topic: draw a Gantt chart and compute average waiting and turnaround time.',
    sections: [
      ['Definitions', [
        'Turnaround time = completion − arrival. Waiting time = turnaround − burst. Response time = first run − arrival.',
        'Throughput = processes completed per unit time. CPU utilisation = busy time / total time.',
      ]],
      ['Algorithms', [
        '**FCFS:** non-preemptive; convoy effect when a long job is first.',
        '**SJF:** non-preemptive; optimal average waiting time among non-preemptive policies (needs burst lengths).',
        '**SRTF:** preemptive SJF; optimal average waiting time overall; can starve long jobs.',
        '**Round robin:** time quantum q; with n processes, a process waits at most (n − 1)q for its turn. Very large q → FCFS; very small q → huge switching overhead.',
        '**Priority:** preemptive or not; starvation fixed by ageing.',
        '**Multilevel (feedback) queues:** separate queues; processes may move between them.',
      ]],
      ['Working the numbers', [
        'Break ties by arrival time, then by process id, unless the question says otherwise.',
        'Include context-switch time only when the question gives it.',
      ]],
    ],
    formulas: ['Average waiting time = Σ (turnaround − burst)/n.'],
    exam: ['Average waiting or turnaround time for a given set of processes (NAT).', 'Which policy minimises waiting time or avoids starvation?'],
    traps: ['Forgetting that a newly arrived shorter job preempts in SRTF.', 'In round robin, a process arriving at the same time as a quantum expires: follow the question’s convention (usually the new arrival enters the queue first).'],
  },

  sync: {
    overview: 'Synchronisation questions check whether a given solution satisfies mutual exclusion, progress and bounded waiting, and trace semaphore values.',
    sections: [
      ['Critical section requirements', [
        '**Mutual exclusion:** at most one process inside. **Progress:** if none is inside, a waiting process can enter without indefinite postponement by processes not interested. **Bounded waiting:** a limit on how many times others can enter first.',
        'Strict alternation (turn variable) gives mutual exclusion but violates progress.',
      ]],
      ["Peterson's solution", [
        'Two processes, flag[2] and turn. Satisfies all three requirements (on hardware that does not reorder memory operations).',
        'Hardware: test-and-set and compare-and-swap give mutual exclusion; plain TSL spin locks do not guarantee bounded waiting.',
      ]],
      ['Semaphores and mutexes', [
        'wait(S)/P: S = S − 1, block if negative (or wait while S ≤ 0). signal(S)/V: S = S + 1, wake a waiter.',
        'Counting semaphore with initial value n lets n processes in. A negative value −k means k processes are waiting (in the blocking version).',
        'A mutex has an owner; a binary semaphore does not.',
      ]],
      ['Classic problems', [
        '**Producer–consumer:** mutex = 1, empty = N, full = 0. Wrong order of wait(mutex) and wait(empty) can deadlock.',
        '**Readers–writers:** readers share, writers exclusive; the first version can starve writers.',
        '**Dining philosophers:** naïve solution deadlocks; fixes include asymmetric pick-up or allowing at most 4 at the table.',
      ]],
    ],
    exam: ['Final value of a shared variable or semaphore after concurrent execution (NAT).', 'Does this code ensure mutual exclusion / avoid deadlock?'],
    traps: ['Assuming x = x + 1 is atomic; it is load, add, store and can interleave.'],
  },

  deadlock: {
    overview: 'Deadlock questions test the four necessary conditions, resource-allocation graphs, the Banker’s algorithm and minimum resource counts.',
    sections: [
      ['Necessary conditions', [
        'Mutual exclusion, hold and wait, no preemption, circular wait. All four must hold for deadlock.',
        'Prevention breaks one condition (e.g. order resources to break circular wait).',
      ]],
      ['Resource allocation graph', [
        'Single instance per resource: a cycle ⇔ deadlock. Multiple instances: a cycle is necessary but not sufficient.',
        'Wait-for graph (single instances) for detection: cycle means deadlock.',
      ]],
      ["Banker's algorithm", [
        'Need = Max − Allocation. Safe if some order lets every process get its Need from Available plus what earlier processes release.',
        'A safe state is never deadlocked; an unsafe state may lead to deadlock.',
      ]],
      ['Minimum resources', [
        'n processes each needing at most k units of a resource: deadlock is impossible if total units ≥ n(k − 1) + 1.',
        'Conversely, the maximum number of processes that guarantees no deadlock with R units each needing k: n ≤ (R − 1)/(k − 1).',
      ]],
      ['Detection and recovery', ['Run a detection algorithm (like Banker’s with current requests); recover by terminating processes or preempting resources.']],
    ],
    exam: ['Is the system in a safe state; find a safe sequence.', 'Minimum resources to avoid deadlock (NAT).'],
    traps: ['Treating any cycle as deadlock when resources have multiple instances.'],
  },

  memory: {
    overview: 'Memory management and paging is the highest-weight OS topic: page tables, multilevel paging, TLB effective access time, and page-replacement fault counts.',
    sections: [
      ['Contiguous allocation', [
        'First fit, best fit, worst fit. External fragmentation in variable partitions; internal fragmentation in fixed partitions.',
        'Compaction removes external fragmentation at a cost.',
      ]],
      ['Paging', [
        'Logical address = page number | offset. Offset bits = log₂(page size). Pages = virtual space / page size.',
        'Page table size = number of pages × PTE size. Paging has no external fragmentation; the last page has internal fragmentation (half a page on average).',
      ]],
      ['Multi-level paging and TLB', [
        'Split the page number so each inner table fits in one page: entries per page = page size / PTE size.',
        'EAT with TLB, single level: h(t + m) + (1 − h)(t + 2m). With k levels the miss path needs k + 1 memory accesses.',
        'Inverted page table: one entry per frame, searched by (pid, page).',
      ]],
      ['Segmentation', ['Variable-sized logical units; address = segment | offset, checked against the limit. External fragmentation possible.']],
      ['Page replacement', [
        '**FIFO** (suffers Belady’s anomaly), **Optimal** (replace the page used farthest in future; lowest faults), **LRU** (stack algorithm, no Belady anomaly).',
        'Effective access time with page faults: (1 − p)·m + p·(fault service time).',
      ]],
      ['Thrashing', ['Too many processes for the frames available: page-fault rate soars and CPU utilisation collapses. Fix with the working-set model or page-fault frequency control.']],
    ],
    exam: ['Page faults for a reference string under FIFO/LRU/Optimal (NAT).', 'Page-table size or number of levels needed.', 'Effective memory access time with TLB and faults.'],
    traps: ['Leaving out the initial loads into empty frames: they are page faults, and GATE counts them unless told otherwise.', 'Using virtual address bits for frame numbers.'],
  },

  files: {
    overview: 'File systems carry fewer marks: allocation methods, inode block counts, and disk-scheduling head movement.',
    sections: [
      ['File allocation', [
        '**Contiguous:** fast sequential and direct access; external fragmentation.',
        '**Linked:** no fragmentation; direct access is slow; a lost pointer breaks the chain (FAT keeps pointers in a table).',
        '**Indexed:** an index block per file. UNIX inode: 12 direct + single, double, triple indirect pointers.',
        'Max file size with inode = (direct + p + p² + p³) × block size, where p = block size / pointer size.',
      ]],
      ['Directory structure', ['Single-level, two-level, tree, acyclic graph (shared files via links), general graph.']],
      ['Disk scheduling', [
        '**FCFS**, **SSTF** (nearest request first; can starve), **SCAN** (elevator, goes to the end), **C-SCAN** (one direction, jump back), **LOOK / C-LOOK** (turn at the last request).',
        'Total head movement = sum of absolute cylinder differences in service order.',
      ]],
      ['Free-space management', ['Bit vector (one bit per block), linked list, grouping, counting.']],
    ],
    exam: ['Total head movement for a request queue (NAT).', 'Maximum file size with a given inode structure.'],
    traps: ['In SCAN, the head goes to the last cylinder even with no request there; LOOK turns at the last request.'],
  },
};
