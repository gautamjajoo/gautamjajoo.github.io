# Economics of AI page

The page is intended for https://jajoo.xyz/economics-of-ai/. The custom domain is served by Netlify. This repository also builds to GitHub Pages and generates static output on the `gh-pages` branch. Deployment to GitHub Pages alone does not publish the page to the custom domain. The initial Netlify deployment is pending access to the existing hosting account.

The content source is `README.md` on the `main` branch of `gautamjajoo/awesome-economics-of-ai`. Edit and push that README to update the reading list. No change to this website repository is needed for normal reading-list updates.

`assets/js/economics-of-ai.js` fetches the raw README when the page opens, every five minutes while visible, and when a stale tab becomes visible. GitHub CDN caching may add a few minutes. It renders Markdown with Marked, sanitizes HTML with DOMPurify, assigns GitHub-compatible heading IDs, and resolves repository-relative links and images. The dependencies are pinned and bundled locally in `assets/js/economics-of-ai/`; their licenses are included there.

`economics-of-ai/index.html` includes a saved copy from October 12, 2026 for readers without JavaScript and as a fallback during network failures. The page identifies this older copy when live loading fails. The saved copy is not automatically refreshed; normal JavaScript-enabled visits always request the current README. Unchanged content is not replaced on periodic refreshes.

Styling lives in `assets/css/economics-of-ai.css`. The page is standalone static HTML so it works with both the current Pages branch build and the repository's Jekyll deployment workflow.
