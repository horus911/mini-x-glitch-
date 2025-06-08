const form = document.getElementById('postForm');
const feed = document.getElementById('feed');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  await fetch('/api/post', { method: 'POST', body: formData });
  form.reset();
  loadPosts();
});

async function loadPosts() {
  feed.innerHTML = 'Chargement...';
  const res = await fetch('/api/posts');
  const posts = await res.json();
  feed.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = \`
      <strong>\${post.username}</strong> • <small>\${new Date(post.date).toLocaleString()}</small><br/>
      \${post.text}<br/>
      \${post.media ? renderMedia(post.media) : ''}
    \`;
    feed.appendChild(div);
  });
}

function renderMedia(url) {
  if (url.match(/\.(mp4|webm)$/)) {
    return \`<video src="\${url}" controls class="media"></video>\`;
  } else {
    return \`<img src="\${url}" class="media"/>\`;
  }
}

loadPosts();