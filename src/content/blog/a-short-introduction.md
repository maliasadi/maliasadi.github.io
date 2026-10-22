---
title: "A short introduction"
description: "Compilers, simulators, a piano, and a squash court."
date: 2026-10-22
tags: ["quantum"]
---

I am a scientific computing tinkerer. I craft the compilers and simulators that make classical-quantum applications run fast.

Most of that work is in [PennyLane](https://pennylane.ai/profile/maliasadi): Lightning, the state-vector simulators, and Catalyst, the just-in-time compiler and runtime. I am the technical lead of performance, and a senior quantum software developer, at Xanadu. [GitHub](https://github.com/maliasadi) puts it in one line: crafting high-performance quantum software. Open-source contributions date back to 2015.

Lightning is written in C++. The fast paths use vector instructions, threads, and GPUs, and a distributed state vector when one machine is not enough. Catalyst takes a hybrid program through QIR and LLVM and runs it on those simulators or on hardware. The runtime beside it is multi-device and asynchronous, with plugins for both QIR and QASM.

Earlier, the work was high-performance symbolic computation: a fast solver for polynomial systems, parallel arithmetic for dense and sparse polynomials, and a stretch on Maple’s multivariate power series, where quicker arithmetic improved factorization by up to 500×.

The public notes are the recent part of that thread. [Quantum just-in-time compiling a variational eigensolver with Catalyst](https://pennylane.ai/demos/tutorial_how_to_quantum_just_in_time_compile_vqe_catalyst). [Using Catalyst with Lightning-GPU](https://pennylane.ai/demos/how_to_catalyst_lightning_gpu). [Compiling a fluid-dynamics workflow onto AMD GPUs](https://pennylane.ai/blog/2026/03/propelling-aerospace-applications-rolls-royce-amd-pennylane) with Lightning and Catalyst.

Lately I've been curious about where quantum and high-performance computing meet finance, from Monte Carlo pricing to portfolio optimization, and what it would take to make those workloads run fast. Off the clock, you'll find me at a piano, on a squash court, or reading about economics.
