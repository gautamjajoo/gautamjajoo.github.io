---
layout: page
title: "The Last Mile Problem in Code: the Temporal Asymmetry"
date: 2025-10-18
description: AI accelerates the act of creation but not the act of comprehension — and that gap is where most of the developer effort now lives.
tags: [ai, software-engineering, coding]
categories: blog
thumbnail: assets/img/last-mile-code.jpg
---

As AI coding assistants like Cursor, Copilot, and others have become mainstream, the way we write software has fundamentally changed (obviously).

If you plot time vs. code completion vs. accuracy, an interesting asymmetry appears — one that reveals how AI has shifted where and how long we spend our effort.

### The Pre-AI Era

In the pre-AI coding era, progress was gradual and symmetric: as time increased, both code completion and accuracy improved together. You wrote code line by line, debugged continuously, and saw both quantity and quality rise hand-in-hand. The relationship between time → completion → correctness was smooth.

### The Fascinating Inversion

At the start of a project, tools like Cursor generate 80% of the code instantly — the structure, logic, and even docstrings. The code completion curve spikes early, but then it flattens.

From there, most of the time is spent not writing, but fixing, integrating, and aligning the AI's output with the system's true intent. Accuracy (maybe) initially dips and improves but only slowly, through debugging, testing, and reasoning.

### When You Differentiate Accuracy Over Time

If we think of accuracy (or code correctness) as a function of time, A(t), then the rate of accuracy improvement, dA/dt, tells us how fast correctness improves as time progresses.

Formally:
- **Before AI:** dA/dt ≈ constant, moderately high
- **With AI:** dA/dt → 0 or oscillates near zero in the last mile

### The Paradox

AI accelerates the act of creation but not the act of comprehension. Humans are now reasoning *after* the code is written, instead of *as* it's being written — and that's cognitively expensive.

The brain is optimised for anticipatory reasoning: predicting what you will build. Not retrospective debugging, where you try to infer what the machine just wrote for you.

So even though AI compresses the early timeline of code creation, it stretches the cognitive effort curve — leading to what we can call **temporal and cognitive asymmetry**.

Completion peaks immediately, and the "last mile" dominates the developer's timeline.
