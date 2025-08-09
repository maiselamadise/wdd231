// Dates and time display
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = new Date(document.lastModified).toLocaleString();

function updateCurrentTime() {
  const now = new Date();
  document.getElementById('current-time').textContent = now.toLocaleTimeString();
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// Last visit message using localStorage
const lastVisit = localStorage.getItem('lastVisit');
const message = document.getElementById('last-visit-message');
if (lastVisit) {
  message.textContent = `Welcome back! Your last visit was on ${lastVisit}.`;
} else {
  message.textContent = "Welcome to your first visit to Chamber Discovery!";
}
localStorage.setItem('lastVisit', new Date().toLocaleString());

// Fetch and render business data
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/businesses.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch JSON');
      return response.json();
    })
    .then(businesses => {
      const container = document.getElementById('discover-container');

      businesses.forEach((biz, index) => {
        const imageFile = biz.imageFileName.toLowerCase();
        const website = biz.websiteURL.startsWith("http") ? biz.websiteURL : `https://${biz.websiteURL}`;
        const phone = biz.phoneNumber.replace(/\s+/g, '');

        const article = document.createElement('article');
        article.className = 'discover-card';
        article.setAttribute('aria-labelledby', `card${index + 1}-title`);

        article.innerHTML = `
          <figure>
            <img src="images/${imageFile}" alt="Image of ${biz.name}" loading="lazy" width="400" height="250">
            <figcaption class="sr-only">${biz.name} image</figcaption>
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

      // Button event
      document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', e => {
          const name = e.target.getAttribute('data-name');
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
