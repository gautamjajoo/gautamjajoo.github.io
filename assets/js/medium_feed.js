
/**
 * Fetches Medium posts via rss2json and renders them.
 * @param {string} rssUrl - The Medium RSS feed URL.
 * @param {string} containerId - The ID of the container to render into.
 */
function renderMediumFeed(rssUrl, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok') {
                let html = '<ul class="post-list">';
                data.items.forEach(item => {
                    // Extract first image from content if thumbnail is missing
                    let thumbnail = item.thumbnail;
                    if (!thumbnail) {
                        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                        if (imgMatch) thumbnail = imgMatch[1];
                    }

                    const date = new Date(item.pubDate).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    });

                    html += `
            <li>
              <div class="row">
                <div class="${thumbnail ? 'col-sm-9' : 'col-sm-12'}">
                  <h3>
                    <a class="post-title" href="${item.link}" target="_blank">${item.title}</a>
                    <svg width="2rem" height="2rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </h3>
                  <p>${item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : ''}</p>
                  <p class="post-meta">
                    ${date} &nbsp; &middot; &nbsp; medium.com
                  </p>
                  <p class="post-tags">
                    ${item.categories.map(cat => `<a href="#"><i class="fa-solid fa-hashtag fa-sm"></i> ${cat}</a>`).join(' &nbsp; ')}
                  </p>
                </div>
                ${thumbnail ? `
                <div class="col-sm-3">
                  <img class="card-img" src="${thumbnail}" style="object-fit: cover; height: 90%" alt="image">
                </div>` : ''}
              </div>
            </li>
          `;
                });
                html += '</ul>';
                container.innerHTML = html;
            } else {
                container.innerHTML = '<p>Failed to load Medium posts.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching Medium feed:', error);
            container.innerHTML = '<p>Failed to load Medium posts.</p>';
        });
}
