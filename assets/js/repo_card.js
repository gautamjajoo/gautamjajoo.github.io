/**
 * Fetches GitHub repository data and renders a card.
 * @param {string} repo - The repository name (owner/repo).
 * @param {string} containerId - The ID of the container to render into.
 */
function renderRepoCard(repo, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const apiUrl = `https://api.github.com/repos/${repo}`;
  const cacheKey = `repo_data_${repo}`;
  const cachedData = localStorage.getItem(cacheKey);
  const cacheTime = 3600000; // 1 hour

  function render(data) {
    const { name, description, stargazers_count, forks_count, html_url, language } = data;

    // Simple card styling using Bootstrap classes
    const cardHtml = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title"><a href="${html_url}" target="_blank" class="text-decoration-none">${name}</a></h5>
          <p class="card-text small">${description || "No description available."}</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="badge bg-light text-dark border">${language || "Code"}</span>
            <div class="text-muted small">
              <span class="me-2"><i class="fas fa-star"></i> ${stargazers_count}</span>
              <span><i class="fas fa-code-branch"></i> ${forks_count}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = cardHtml;
  }

  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheTime) {
      render(data);
      return;
    }
  }

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
      render(data);
    })
    .catch((error) => {
      console.error("Error fetching repo data:", error);
      container.innerHTML = `
        <div class="card h-100 border-danger">
          <div class="card-body text-danger">
            <h5 class="card-title">${repo}</h5>
            <p class="card-text">Failed to load data.</p>
            <a href="https://github.com/${repo}" target="_blank" class="btn btn-sm btn-outline-danger">View on GitHub</a>
          </div>
        </div>
      `;
    });
}

/**
 * Fetches GitHub user data and renders a card.
 * @param {string} username - The GitHub username.
 * @param {string} containerId - The ID of the container to render into.
 */
function renderUserCard(username, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const apiUrl = `https://api.github.com/users/${username}`;
  const cacheKey = `user_data_${username}`;
  const cachedData = localStorage.getItem(cacheKey);
  const cacheTime = 3600000; // 1 hour

  function render(data) {
    const { login, avatar_url, html_url, bio, public_repos, followers, following } = data;

    const cardHtml = `
      <div class="card h-100">
        <div class="card-body text-center">
          <img src="${avatar_url}" alt="${login}" class="rounded-circle mb-3" style="width: 80px; height: 80px;">
          <h5 class="card-title"><a href="${html_url}" target="_blank" class="text-decoration-none">${login}</a></h5>
          <p class="card-text small">${bio || "No bio available."}</p>
          <div class="d-flex justify-content-center gap-3 mt-3">
             <div class="text-muted small">
              <div class="fw-bold">${public_repos}</div>
              <div>Repos</div>
            </div>
            <div class="text-muted small">
              <div class="fw-bold">${followers}</div>
              <div>Followers</div>
            </div>
            <div class="text-muted small">
              <div class="fw-bold">${following}</div>
              <div>Following</div>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = cardHtml;
  }

  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheTime) {
      render(data);
      return;
    }
  }

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
      render(data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      container.innerHTML = `
        <div class="card h-100 border-danger">
          <div class="card-body text-danger">
            <h5 class="card-title">${username}</h5>
            <p class="card-text">Failed to load data.</p>
            <a href="https://github.com/${username}" target="_blank" class="btn btn-sm btn-outline-danger">View on GitHub</a>
          </div>
        </div>
      `;
    });
}
