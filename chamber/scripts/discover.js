// ✅ Update copyright year
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// ✅ Set last modified date with ISO datetime attribute
const lastModifiedDate = new Date(document.lastModified);
document.getElementById('last-modified').textContent = lastModifiedDate.toLocaleString();
document.getElementById('last-modified').setAttribute('datetime', lastModifiedDate.toISOString());

// ✅ Real-time current clock with ISO datetime attribute
function updateCurrentTime() {
  const now = new Date();
  document.getElementById('current-time').textContent = now.toLocaleTimeString();
  document.getElementById('current-time').setAttribute('datetime', now.toISOString().slice(0, 16));
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// ✅ Last visit logic using localStorage
const lastVisitKey = 'lastVisit';
const lastVisit = localStorage.getItem(lastVisitKey);
const message = document.getElementById('last-visit-message');

if (lastVisit) {
  const last = new Date(lastVisit);
  const daysAgo = Math.floor((Date.now() - last.getTime()) / (1000 * 60 * 60 * 24));
  message.textContent = `Welcome back! Your last visit was ${daysAgo} day(s) ago (${last.toLocaleString()}).`;
} else {
  message.textContent = "Welcome to your first visit to Chamber Discovery!";
}
localStorage.setItem(lastVisitKey, new Date().toISOString());

// ✅ Fetch business cards from JSON file
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/businesses.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch businesses data.');
      return response.json();
    })
    .then(businesses => {
      const container = document.getElementById('discover-container');

      businesses.forEach((biz, index) => {
        const imageFile = biz.imageFileName.toLowerCase();
        const website = biz.websiteURL.startsWith('http') ? biz.websiteURL : `https://${biz.websiteURL}`;
        const phone = biz.phoneNumber.replace(/\s+/g, '');

        const article = document.createElement('article');
        article.className = 'discover-card';
        article.setAttribute('aria-labelledby', `card${index + 1}-title`);

        article.innerHTML = `
          <figure>
            <img src="images/${imageFile}" 
                 alt="Image of ${biz.name}" 
                 loading="lazy" width="400" height="250">
            <figcaption class="sr-only">${biz.name} storefront</figcaption>
          </figure>
          <h2 id="card${index + 1}-title">${biz.name} <span class="membership-level">(${biz.membershipLevel} Member)</span></h2>
          <address>${biz.address}</address>
          <p>${biz.description}</p>
          <p>Phone: <a href="tel:${phone}">${biz.phoneNumber}</a></p>
          <p>Website: <a href="${website}" target="_blank" rel="noopener noreferrer">${website}</a></p>
          <button type="button" class="learn-more" data-name="${biz.name}">Learn More</button>
        `;

        container.appendChild(article);
      });

      // ✅ Button click event
      document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', e => {
          const name = e.currentTarget.getAttribute('data-name');
          alert(`More info about ${name} coming soon!`);
        });
      });
    })
    .catch(error => {
      console.error('Error loading businesses:', error);
      document.getElementById('discover-container').innerHTML = `
        <article class="discover-card" style="grid-column: span 3;">
          <h2>Oops!</h2>
          <p>We couldn’t load the businesses right now. Please try refreshing the page or come back later.</p>
        </article>`;
    });
});
