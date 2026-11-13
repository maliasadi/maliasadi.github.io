/**
 * Scroll-story copy. Keep captions and printed states here so wording
 * fixes can be made without hunting through markup.
 *
 * Qubit order is always (science, software, leadership).
 */

/**
 * Google Scholar profile URL. Leave empty to hide the Publications
 * link on the Talks page; set the URL here to show it.
 */
export const googleScholarUrl = 'https://scholar.google.ca/citations?user=pUKiEEoAAAAJ&hl=en';

export const storyCopy = {
  heroTagline: 'Quantum, classical and finance tinkerer and leader.',
  metaDescription:
    'Quantum, classical and finance tinkerer and leader. A scroll story of science, software and leadership.',

  ch1: {
    kicker: '01 · Separate wires',
    title: 'B.Sc. and M.Sc. in Computer Science',
    sub: '|science⟩ and |software⟩ start as a product; then |leadership⟩ joins as |0⟩ and entangles with |science⟩.',
    subPrefix: 'Isfahan University of Technology.',
    captionEarly: 'Two separate states: |science⟩ = (|0⟩+|1⟩)/√2, |software⟩ = |0⟩.',
    captionLate: 'leadership joins and entangles with science.',
    stateBell: '(|00⟩+|11⟩)/√2',
    stateBellOn: 'on (science, leadership)',
    softwareIdle: '|software⟩ = |0⟩',
    achievements: [
      'Ranked 1st in Mathematics and Computing University Competition (2010)',
      'Ranked 1st among B.Sc. students of the Department of Mathematical Sciences (2014)',
      'Ranked 3rd in Iranian National Mathematical Olympiad (2014)',
      'Ranked 1st among M.Sc. students of the Department of Mathematical Sciences (2016)',
    ],
  },

  ch2: {
    kicker: '02 · 2017–2021',
    title: 'Ph.D. Computer Science, Scientific Computing',
    sub: 'Western University. Cache-friendly, modular and parallel schemes — a classical machine. The entanglement persists.',
    state: '(|000⟩+|101⟩)/√2',
    order: '(science, software, leadership)',
    caption: 'The entanglement persists: (|000⟩+|101⟩)/√2.',
    achievements: [
      'Western Graduate Research Scholarship for Ph.D. in Computer Science (2017–2021)',
      'Mitacs Research and Development Scholarship for Internship at Maplesoft (2020)',
    ],
  },

  ch3: {
    kicker: '03',
    title: 'Quantum + HPC',
    sub: 'A CNOT from |science⟩ onto |software⟩ yields the GHZ state (|000⟩+|111⟩)/√2.',
    state: '(|000⟩+|111⟩)/√2',
    order: '(science, software, leadership)',
    caption: 'Three-way entanglement: a GHZ state.',
  },

  ch4: {
    kicker: '04 · 2021 onward',
    title: 'PennyLane, Catalyst and Lightning on the world\'s most powerful supercomputers',
    sub: 'The entangled wires run onto a supercomputing cluster.',
    state: '(|000⟩+|111⟩)/√2',
    order: '(science, software, leadership)',
    caption: 'The GHZ state continues: (|000⟩+|111⟩)/√2.',
    pennylane: 'The definitive open-source framework for quantum-classical programming.',
    catalyst:
      'A just-in-time compiler that takes hybrid quantum programs from Python to MLIR and native code.',
    lightning:
      'High-performance quantum simulators in C++, from laptop CPUs to multi-GPU clusters.',
  },

  ch5: {
    kicker: '05',
    title: 'Senior Technical & Solutions Lead | Quantum & High-Performance Computing',
    sub: 'A four-qubit gate reshapes the state. Still entangled.',
    state: '√0.20|1000⟩ + √0.30|0100⟩',
    stateLine2: '+ √0.35|0010⟩ + √0.15|0001⟩',
    orderNote: '|1000⟩ = science, |0100⟩ = software, |0010⟩ = leadership, |0001⟩ = finance.',
    norm: '0.20 + 0.30 + 0.35 + 0.15 = 1',
    measure: 'Measure me',
    reprepare: 'Click again to re-prepare',
    hint: 'A click collapses the state.',
  },
} as const;
