const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const postsPath = path.join(projectRoot, 'content', 'posts.json');
const indexPath = path.join(projectRoot, 'index.html');
const archivePath = path.join(projectRoot, 'archive.html');

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const months = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUGL', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'];
  return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
}

function formatLongDate(dateStr) {
  const d = new Date(dateStr);
  const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function build() {
  console.log('Starting SeeteeS MOD Build Engine...');
  
  if (!fs.existsSync(postsPath)) {
    console.error('Error: posts.json not found');
    return;
  }

  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  const latestPost = posts[0];
  
  // Update index.html
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Update HERO
  const heroHtml = `
        <article class="hero-copy">
          <p class="eyebrow text-reveal">Cover Story // ${formatLongDate(latestPost.date)}</p>
          <h2 class="glow-title text-reveal reveal-delay-1">${latestPost.title}</h2>
          <p class="text-reveal reveal-delay-2">${latestPost.summary}</p>
          <div class="hero-actions">
            <a class="button" href="posts/${latestPost.slug}.html">Leggi l'Analisi Completa</a>
            <a class="button-secondary" href="archive.html">Vedi Archivio Strategico</a>
          </div>
        </article>`;
  
  indexContent = indexContent.replace(
    /<!-- HERO_START -->[\s\S]*<!-- HERO_END -->/,
    `<!-- HERO_START -->${heroHtml}\n        <!-- HERO_END -->`
  );

  // Update News List in index.html (latest 5)
  const newsListHtml = posts.slice(1, 6).map(post => `
          <a href="posts/${post.slug}.html" class="news-row text-reveal">
            <p class="story-meta">${formatDate(post.date)}</p>
            <h2>${post.title}</h2>
            <p class="inline-link">Sfoglia →</p>
          </a>`).join('');
  
  indexContent = indexContent.replace(
    /<!-- NEWS_LIST_START -->[\s\S]*<!-- NEWS_LIST_END -->/,
    `<!-- NEWS_LIST_START -->${newsListHtml}\n          <!-- NEWS_LIST_END -->`
  );
  
  fs.writeFileSync(indexPath, indexContent);
  console.log('✓ index.html updated');

  // Update archive.html
  let archiveContent = fs.readFileSync(archivePath, 'utf8');
  const fullNewsListHtml = posts.map(post => `
        <a href="posts/${post.slug}.html" class="news-row">
          <p class="story-meta">${formatDate(post.date)}</p>
          <h2>${post.title}</h2>
          <p class="inline-link">Apri →</p>
        </a>`).join('');

  archiveContent = archiveContent.replace(
    /<!-- NEWS_LIST_START -->[\s\S]*<!-- NEWS_LIST_END -->/,
    `<!-- NEWS_LIST_START -->${fullNewsListHtml}\n        <!-- NEWS_LIST_END -->`
  );

  fs.writeFileSync(archivePath, archiveContent);
  console.log('✓ archive.html updated');
  
  console.log('Build completed successfully.');
}

build();
