import { marked } from "./economics-of-ai/marked.min.js";
import DOMPurify from "./economics-of-ai/purify.min.js";
import GithubSlugger from "./economics-of-ai/slugger.min.js";

const repository = "https://github.com/gautamjajoo/awesome-economics-of-ai";
const rawBase = "https://raw.githubusercontent.com/gautamjajoo/awesome-economics-of-ai/main/";
const content = document.getElementById("readme-content");
const status = document.getElementById("sync-status");
const refreshInterval = 5 * 60 * 1000;
let previousMarkdown;
let lastAttempt = 0;
let loading = false;

function renderReadme(markdown) {
  const fragment = DOMPurify.sanitize(marked.parse(markdown, { gfm: true }), {
    USE_PROFILES: { html: true },
    RETURN_DOM_FRAGMENT: true,
    FORBID_TAGS: ["style", "form", "input", "button"],
    FORBID_ATTR: ["style"],
  });
  const slugger = new GithubSlugger();
  for (const heading of fragment.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
    heading.id = slugger.slug(heading.textContent);
  }
  for (const link of fragment.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("#")) {
      link.href = new URL(href, `${repository}/blob/main/`).href;
    }
    link.rel = "noopener noreferrer";
  }
  for (const image of fragment.querySelectorAll("img[src]")) {
    image.src = new URL(image.getAttribute("src"), rawBase).href;
    image.loading = "lazy";
  }
  return fragment;
}

async function refreshReadme() {
  if (loading || document.hidden) return;
  loading = true;
  lastAttempt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${rawBase}README.md`, { cache: "no-cache", signal: controller.signal });
    if (!response.ok) throw new Error(`README request failed: ${response.status}`);
    const markdown = await response.text();
    if (!markdown.trim()) throw new Error("The README is empty.");
    if (markdown !== previousMarkdown) {
      const firstLoad = previousMarkdown === undefined;
      content.replaceChildren(renderReadme(markdown));
      previousMarkdown = markdown;
      if (firstLoad && location.hash) {
        try {
          document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
        } catch {
          // An invalid URL fragment should not prevent the list from loading.
        }
      }
    }
    status.textContent = "";
  } catch {
    status.textContent = previousMarkdown
      ? "The latest update could not load. Showing the last loaded version. You can also read it on GitHub."
      : "The latest version could not load. Showing a saved copy from October 12, 2026. You can read the latest version on GitHub.";
  } finally {
    clearTimeout(timeout);
    loading = false;
  }
}

refreshReadme();
setInterval(refreshReadme, refreshInterval);
document.addEventListener("visibilitychange", () => {
  if (Date.now() - lastAttempt >= refreshInterval) refreshReadme();
});
