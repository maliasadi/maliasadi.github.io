# Ali Asadi

Personal site and blog. [Astro](https://astro.build) builds a static site from Markdown posts and HTML slide decks. The finished files are what GitHub Pages will serve later.

The repository stays private, and GitHub Pages is not turned on. Nothing here publishes the site.

## Preview locally

Install Node.js 22 or newer, then from this folder:

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

To check the production build:

```bash
npm run build
npm run preview
```

## Add a post

Create one Markdown file in `src/content/blog/`. The name of the file becomes the URL. `src/content/blog/bell-pairs.md` is served at `/blog/bell-pairs/`.

````markdown
---
title: "Bell pairs, slowly"
description: "One paragraph that shows up in the list and the RSS feed."
date: 2026-10-22
tags: ["quantum"]
draft: false
---

Prose goes here. Inline math uses `$p(x) = |\langle x|\psi\rangle|^2$`.

Display math uses a pair of dollar signs on their own lines:

$$
|\Phi^{+}\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)
$$

A fenced code block is highlighted. Open it with three backticks and a language name, for example `python`.
````

`draft: true` hides a post from the site and the RSS feed. The first note is `src/content/blog/a-short-introduction.md`.

## Add a slide deck

Save a standalone HTML file in `public/slides/`. A reveal.js deck is a good fit. Any self-contained HTML file works too. A folder with `index.html` is fine when the deck has images next to it.

`public/slides/my-talk.html` is linked from the talks page and opens at `/slides/my-talk.html`.

Set the title and these tags in `<head>` so the gallery can label the talk:

```html
<title>My talk title</title>
<meta name="description" content="One sentence about the talk." />
<meta name="talk-date" content="2026-10-22" />
<meta name="talk-venue" content="Event name" />
<meta name="talk-featured" content="true" />
<meta name="talk-paper" content="Paper title" />
<meta name="talk-paper-url" content="https://arxiv.org/abs/0000.00000" />
<meta name="talk-paper-id" content="0000.00000" />
```

`talk-featured` is optional. Featured talks are listed first on the home page. `talk-sample` is only for placeholders. Leave `talk-venue` out when the deck has no event. The paper tags are optional; when all three are set, the home page and the talks list add a link of the form “Based on [paper title] (arXiv:id)”.

reveal.js and KaTeX are copied into `public/vendor/` when you run `npm run dev` or `npm run build`. A deck can point at `/vendor/reveal/reveal.css` and `/vendor/reveal/reveal.js`. Refresh the dev server after adding a file.

The deck in the repo is `public/slides/hybrid-quantum-programming-on-hpc.html`.

## Go live later

Do this only when the content and theme are ready:

1. Make the repository public.
2. In the repository settings, open Pages and set the source to **GitHub Actions**.

The next push to `master` runs `.github/workflows/pages.yml`, which builds the site and deploys it to [https://maliasadi.github.io](https://maliasadi.github.io).
