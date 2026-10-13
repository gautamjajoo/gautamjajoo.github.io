# Economics of AI page

The page is live at https://jajoo.xyz/economics-of-ai/. The domain is registered through Hostinger and the website is hosted by Netlify (project `superb-arithmetic-387838`). Netlify automatically deploys the `master` branch of this repository. The repository also has a separate GitHub Pages build and generates static output on `gh-pages`. The custom-domain deployment and live README loading were verified on October 12, 2026.

The content source is `README.md` on the `main` branch of `gautamjajoo/awesome-economics-of-ai`. Edit and push that README to update the reading list. No change to this website repository is needed for normal reading-list updates.

`assets/js/economics-of-ai.js` fetches the raw README when the page opens, every five minutes while visible, and when a stale tab becomes visible. GitHub CDN caching may add a few minutes. It renders Markdown with Marked, sanitizes HTML with DOMPurify, assigns GitHub-compatible heading IDs, and resolves repository-relative links and images. The dependencies are pinned and bundled locally in `assets/js/economics-of-ai/`; their licenses are included there.

`economics-of-ai/index.html` includes a saved copy from October 12, 2026 for readers without JavaScript and as a fallback during network failures. The page identifies this older copy when live loading fails. The saved copy is not automatically refreshed; normal JavaScript-enabled visits always request the current README. Unchanged content is not replaced on periodic refreshes.

Styling lives in `assets/css/economics-of-ai.css`. The page is standalone static HTML so it works with both the current Pages branch build and the repository's Jekyll deployment workflow.
