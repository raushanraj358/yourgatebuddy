// Offline key notes: CS · Computer Networks. Keys are chapter ids from data.js.
export const CONTENT = {
  layering: {
    overview: 'Layering and switching: which layer does what, and the delay calculations that appear across the whole networks syllabus.',
    sections: [
      ['OSI and TCP/IP', [
        'OSI: physical, data link, network, transport, session, presentation, application. TCP/IP merges the top three into application.',
        'Units: bits (physical), frames (data link), packets/datagrams (network), segments (TCP) / datagrams (UDP), messages (application).',
        'Devices: hub/repeater (L1), switch/bridge (L2), router (L3).',
        'Hop-by-hop error and flow control at the data link layer; end-to-end at transport.',
      ]],
      ['Switching', [
        '**Circuit switching:** dedicated path set up first; constant rate; wasteful for bursty traffic.',
        '**Packet switching:** store-and-forward; statistical multiplexing; delay varies with queues.',
        'Store-and-forward over k links for one packet of L bits: k·L/R transmission delay plus propagation on each link.',
      ]],
      ['Delays', [
        'Transmission delay = L/R (packet length / bandwidth). Propagation delay = d/v (distance / signal speed, about 2 × 10⁸ m/s in cable).',
        'Total per hop = transmission + propagation + queuing + processing.',
        'Bandwidth–delay product = R × propagation delay: the bits “in flight” on the link.',
      ]],
    ],
    exam: ['End-to-end delay for a file split into packets across several routers (NAT).'],
    traps: ['Mixing kilo = 10³ for bandwidth (kbps) with kilo = 2¹⁰ for data (KB).'],
  },

  datalink: {
    overview: 'Data link layer is high-weightage: CRC, sliding-window efficiency and sequence numbers, and MAC protocols (ALOHA, CSMA/CD).',
    sections: [
      ['Framing and error detection', [
        'Framing: byte stuffing, bit stuffing (insert 0 after five consecutive 1s in HDLC), character count.',
        '**CRC:** append r zeros (r = degree of the generator), divide by the generator using XOR, append the remainder. Detects all burst errors of length ≤ r.',
        'Parity detects odd numbers of bit errors. Hamming distance d detects d − 1 errors and corrects ⌊(d − 1)/2⌋.',
      ]],
      ['Flow control protocols', [
        'a = propagation delay / transmission delay. Stop-and-wait efficiency = 1/(1 + 2a).',
        'Window W: efficiency = min(1, W/(1 + 2a)). To keep the pipe full, W ≥ 1 + 2a.',
        '**Go-Back-N:** sender window ≤ 2ᵏ − 1, receiver window 1; a loss resends the whole window.',
        '**Selective Repeat:** sender and receiver windows ≤ 2ᵏ⁻¹; resends only lost frames.',
      ]],
      ['MAC protocols and Ethernet', [
        'Pure ALOHA max throughput = 1/(2e) ≈ 18.4% at G = 0.5; slotted ALOHA = 1/e ≈ 36.8% at G = 1.',
        'CSMA/CD needs the frame transmission time ≥ 2 × propagation delay: minimum frame size = 2 × Tₚ × bandwidth.',
        'Ethernet: minimum frame 64 bytes, binary exponential back-off (after the n-th collision pick from 0 to 2ⁿ − 1 slots, capped at 10).',
      ]],
      ['Switching', ['Learning bridges build MAC tables from source addresses; spanning tree protocol removes loops.']],
    ],
    exam: ['CRC remainder or transmitted frame for a given generator.', 'Minimum sequence-number bits or window size for full utilisation (NAT).', 'Minimum Ethernet frame size for a given distance and rate.'],
    traps: ['Using round-trip time where one-way propagation is meant (or vice versa).', 'Window limits: GBN 2ᵏ − 1 but SR 2ᵏ⁻¹.'],
  },

  ip: {
    overview: 'IP addressing and routing are high-weightage: subnetting and CIDR, fragmentation offsets, and distance-vector vs link-state routing.',
    sections: [
      ['IPv4 addressing, subnetting and CIDR', [
        'Classful: A 0–127 (/8), B 128–191 (/16), C 192–223 (/24), D 224–239 (multicast), E 240–255.',
        'A /n block has 2^(32 − n) addresses and 2^(32 − n) − 2 usable hosts (network and broadcast addresses reserved).',
        'Network address = IP AND mask. Broadcast = network address with all host bits 1.',
        'Longest-prefix match decides the forwarding entry. Route aggregation (supernetting) merges contiguous blocks.',
        'Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.',
      ]],
      ['IP fragmentation', [
        'Each fragment’s data (except the last) must be a multiple of 8 bytes. Offset is in 8-byte units.',
        'MF = 1 on all fragments except the last. The IPv4 header is 20 bytes without options (HLEN in 4-byte words).',
        'Reassembly happens only at the destination.',
      ]],
      ['Routing', [
        '**Distance vector (RIP, Bellman–Ford):** share the whole table with neighbours; count-to-infinity problem (split horizon, poison reverse help).',
        '**Link state (OSPF, Dijkstra):** flood link-state packets; each router knows the full topology.',
        'TTL decrements at each router; the packet is dropped at 0 (ICMP time exceeded).',
      ]],
      ['ARP, DHCP, ICMP and NAT', [
        'ARP maps IP to MAC (broadcast request, unicast reply). DHCP assigns addresses (DORA: discover, offer, request, ack) over UDP 67/68.',
        'ICMP carries errors and echo (ping). NAT maps private addresses to a public address using ports.',
      ]],
    ],
    exam: ['Which subnet does an address belong to; how many hosts (NAT).', 'Fragment offsets and the MF flag for a datagram over a smaller MTU.', 'Routing tables after one or two distance-vector exchanges.'],
    traps: ['Forgetting to subtract 2 for usable hosts, or subtracting it for /31 and /32 special cases.', 'Writing fragment offset in bytes instead of 8-byte units.'],
  },

  transport: {
    overview: 'TCP and UDP: header fields, connection setup and teardown, flow control, and the congestion window calculations GATE loves.',
    sections: [
      ['Headers', [
        'UDP header 8 bytes: source port, destination port, length, checksum. Connectionless, no reliability.',
        'TCP header 20–60 bytes: sequence and acknowledgement numbers, flags (SYN, ACK, FIN, RST, PSH, URG), window, checksum, options.',
        'TCP sequence numbers count bytes; SYN and FIN each consume one sequence number.',
      ]],
      ['Connection management', [
        'Three-way handshake: SYN, SYN-ACK, ACK. Close with FIN/ACK in each direction (four segments, or three if combined).',
        'TIME_WAIT lasts 2 × MSL so delayed segments die out.',
      ]],
      ['Flow control and sliding window', [
        'The receiver advertises rwnd; the sender keeps unacknowledged bytes ≤ min(cwnd, rwnd).',
        'Sequence-number wrap-around time = 2³² bytes / bandwidth.',
      ]],
      ['Congestion control', [
        '**Slow start:** cwnd starts at 1 MSS and doubles every RTT until ssthresh.',
        '**Congestion avoidance:** +1 MSS per RTT after ssthresh.',
        'On timeout: ssthresh = cwnd/2, cwnd = 1 MSS (Tahoe). On 3 duplicate ACKs (Reno): ssthresh = cwnd/2, cwnd = ssthresh (fast recovery).',
        'Throughput ≈ window/RTT.',
      ]],
    ],
    exam: ['cwnd after n RTTs with a timeout in between (NAT).', 'Time to wrap sequence numbers at a given bandwidth.'],
    traps: ['Doubling cwnd past ssthresh; growth becomes linear there.', 'Counting the SYN as carrying no sequence number.'],
  },

  application: {
    overview: 'Application layer carries fewer marks: DNS, HTTP, email and FTP, and their transport protocols and ports.',
    sections: [
      ['DNS', ['Maps names to IP addresses; UDP port 53 (TCP for zone transfers). Iterative and recursive queries; caching with TTL.']],
      ['HTTP', [
        'TCP port 80 (HTTPS 443). Stateless; cookies add state.',
        'Non-persistent HTTP: 2 RTT per object (connection + request). Persistent: one connection for many objects; pipelining reduces RTTs further.',
      ]],
      ['Email and file transfer', [
        'SMTP (TCP 25) pushes mail; POP3 (110) and IMAP (143) retrieve it.',
        'FTP uses TCP 21 for control and 20 for data (active mode): control is “out of band”.',
        'Other ports: SSH 22, Telnet 23, DHCP 67/68 (UDP), SNMP 161 (UDP).',
      ]],
      ['Sockets', ['TCP server: socket, bind, listen, accept, read/write, close. Client: socket, connect. UDP uses sendto/recvfrom with no connection.']],
    ],
    exam: ['Which protocol runs over UDP/TCP; port numbers.', 'Total time to fetch a page with k objects under persistent/non-persistent HTTP.'],
    traps: ['Thinking DNS always uses TCP, or that SMTP retrieves mail.'],
  },
};
