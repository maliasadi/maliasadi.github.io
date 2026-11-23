/**
 * Work page entries, newest first.
 * Set `secondary` for a smaller blog or tutorial card.
 * To add a paper, insert it in this list.
 */

export interface WorkLink {
  label: string;
  href: string;
  /** Draw a small arrow after the label. */
  arrow?: boolean;
}

export interface WorkEntry {
  title: string;
  year: number;
  /** Venue and date line under the title. */
  meta: string;
  summary: string;
  links: WorkLink[];
  secondary?: boolean;
}

export const workEntries: WorkEntry[] = [
  {
    title: 'Practical Estimation of Trotter Error for Hamiltonian Simulation',
    year: 2026,
    meta: '2026 · arXiv preprint',
    summary: 'A practical method for bounding Trotter error in Hamiltonian simulation.',
    links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2606.30738' }],
  },
  {
    title: 'Propelling aerospace applications with Rolls-Royce, AMD, and PennyLane',
    year: 2026,
    meta: 'March 10, 2026',
    summary: 'A look at quantum software applied to aerospace engineering problems.',
    links: [
      {
        label: 'Read on PennyLane',
        href: 'https://pennylane.ai/blog/2026/03/propelling-aerospace-applications-rolls-royce-amd-pennylane',
        arrow: true,
      },
    ],
    secondary: true,
  },
  {
    title: 'How to use Catalyst with Lightning-GPU',
    year: 2025,
    meta: 'February 2025',
    summary: 'A hands-on guide to running Catalyst programs on Lightning-GPU.',
    links: [{ label: 'Read demo', href: 'https://pennylane.ai/demos/how_to_catalyst_lightning_gpu' }],
    secondary: true,
  },
  {
    title: 'Hybrid quantum programming with PennyLane Lightning on HPC platforms',
    year: 2024,
    meta: '2024 · arXiv preprint',
    summary: 'A hybrid programming approach for running Lightning at HPC scale.',
    links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2403.02512' }],
  },
  {
    title: 'Catalyst: a Python JIT compiler for auto-differentiable hybrid quantum programs',
    year: 2024,
    meta: '2024 · JOSS 9(99) 6720',
    summary: 'A Python JIT compiler that turns hybrid quantum programs into native, auto-differentiable code.',
    links: [{ label: 'DOI', href: 'https://doi.org/10.21105/joss.06720' }],
  },
  {
    title: 'How to quantum just-in-time compile VQE with Catalyst',
    year: 2024,
    meta: 'April 2024',
    summary: 'How to just-in-time compile a VQE workflow with Catalyst.',
    links: [
      {
        label: 'Read demo',
        href: 'https://pennylane.ai/demos/tutorial_how_to_quantum_just_in_time_compile_vqe_catalyst/',
      },
    ],
    secondary: true,
  },
  {
    title: 'Parallelization of triangular decompositions: Techniques and implementation',
    year: 2023,
    meta: '2023 · Journal of Symbolic Computation 115',
    summary: 'Techniques and an implementation for running triangular decompositions in parallel.',
    links: [
      { label: 'DOI', href: 'https://doi.org/10.1016/j.jsc.2022.08.015' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/1906.00039' },
    ],
  },
  {
    title: 'Subresultant Chains Using Bézout Matrices',
    year: 2022,
    meta: '2022 · CASC 2022, LNCS 13366',
    summary: 'A method for computing subresultant chains with Bézout matrices.',
    links: [{ label: 'DOI', href: 'https://doi.org/10.1007/978-3-031-14788-3_3' }],
  },
  {
    title: 'PennyLane: Automatic differentiation of hybrid quantum-classical computations',
    year: 2022,
    meta: '2022 · arXiv v4',
    summary: 'The framework paper on automatic differentiation of hybrid quantum-classical programs.',
    links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/1811.04968' }],
  },
  {
    title: 'Cache-Friendly, Modular and Parallel Schemes For Computing Subresultant Chains',
    year: 2021,
    meta: '2021 · Ph.D. thesis, Western University',
    summary: 'Cache-friendly, modular and parallel schemes for computing subresultant chains.',
    links: [{ label: 'Thesis', href: 'https://ir.lib.uwo.ca/etd/8205' }],
  },
  {
    title: 'Computational Schemes for Subresultant Chains',
    year: 2021,
    meta: '2021 · CASC 2021, LNCS 12865',
    summary: 'Computational schemes for constructing subresultant chains.',
    links: [{ label: 'DOI', href: 'https://doi.org/10.1007/978-3-030-85165-1_3' }],
  },
  {
    title: 'Multivariate Power Series in Maple',
    year: 2021,
    meta: '2021 · CCIS 1414',
    summary: 'Multivariate power series arithmetic, developed in Maple.',
    links: [
      { label: 'DOI', href: 'https://doi.org/10.1007/978-3-030-81698-8_4' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2106.15519' },
    ],
  },
  {
    title: 'On the parallelization of triangular decompositions',
    year: 2020,
    meta: '2020 · ISSAC 2020',
    summary: 'A parallel approach to triangular decompositions.',
    links: [{ label: 'DOI', href: 'https://doi.org/10.1145/3373207.3404065' }],
  },
  {
    title: 'Algorithms and Data Structures for Sparse Polynomial Arithmetic',
    year: 2019,
    meta: '2019 · Mathematics 7(5) 441',
    summary: 'Algorithms and data structures for arithmetic on sparse polynomials.',
    links: [{ label: 'DOI', href: 'https://doi.org/10.3390/math7050441' }],
  },
  {
    title: 'Sparse Polynomial Arithmetic with the BPAS Library',
    year: 2018,
    meta: '2018 · CASC 2018, LNCS 11077',
    summary: 'Sparse polynomial arithmetic in the BPAS library.',
    links: [{ label: 'DOI', href: 'https://doi.org/10.1007/978-3-319-99639-4_3' }],
  },
  {
    title: 'Algebraic tools supporting comprehensive optimization of parametric GPU kernels',
    year: 2018,
    meta: 'May 2018 · Poster, IBM CAS',
    summary: 'Algebraic tools for optimizing parametric GPU kernels.',
    links: [
      {
        label: 'Poster',
        href: 'https://www.orcca.on.ca/files/presentations/2018_05-IBM-CAS_BPAS-Poster.pdf',
      },
    ],
  },
];
