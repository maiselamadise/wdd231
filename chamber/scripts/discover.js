// ✅ Update copyright
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// ✅ Last modified date
const lastModifiedDate = new Date(document.lastModified);
const lastModifiedElement = document.getElementById('last-modified');
lastModifiedElement.textContent = lastModifiedDate.toLocaleString();
lastModifiedElement.setAttribute('datetime', lastModifiedDate.toISOString());

// ✅ Current time
function updateCurrentTime() {
  const now = new Date();
  const currentTimeElement = document.getElementById('current-time');
  currentTimeElement.textContent = now.toLocaleTimeString();
  currentTimeElement.setAttribute('datetime', now.toISOString().slice(0, 16));
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// ✅ Last visit tracking
const lastVisitKey = 'lastVisit';
const lastVisitMessage = document.getElementById('last-visit-message');
const lastVisit = localStorage.getItem(lastVisitKey);

if (lastVisit) {
  const last = new Date(lastVisit);
  const daysAgo = Math.floor((Date.now() - last.getTime()) / (1000 * 60 * 60 * 24));
  lastVisitMessage.textContent = `Welcome back! Your last visit was ${daysAgo} day(s) ago (${last.toLocaleString()}).`;
} else {
  lastVisitMessage.textContent = "Welcome to your first visit to Chamber Discovery!";
}
localStorage.setItem(lastVisitKey, new Date().toISOString());

// ✅ Fetch and display business cards
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/businesses.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch businesses data.');
      return response.json();
    })
    .then(businesses => {
      const container = document.getElementById('discover-container');

      businesses.forEach((biz, index) => {
        const imageFile = encodeURIComponent(biz.imageFileName.toLowerCase());
        const website = /^https?:\/\//i.test(biz.websiteURL)
          ? biz.websiteURL
          : `https://${biz.websiteURL}`;
        const phone = biz.phoneNumber.replace(/\s+/g, '');

        const article = document.createElement('article');
        article.className = 'discover-card';
        article.setAttribute('aria-labelledby', `card${index + 1}-title`);
        article.setAttribute('role', 'region');
        article.setAttribute('aria-label', `${biz.name} business card`);

        article.innerHTML = `
          <figure>
            <img src="images/${imageFile}" 
                 alt="Image of ${biz.name}" 
                 loading="lazy" width="400" height="250">
            <figcaption class="sr-only">${biz.name} storefront</figcaption>
          </figure>
          <h2 id="card${index + 1}-title">${biz.name} 
            <span class="membership-level">(${biz.membershipLevel} Member)</span>
          </h2>
          <address>${biz.address}</address>
          <p>${biz.description}</p>
          <p>Phone: <a href="tel:${phone}">${biz.phoneNumber}</a></p>
          <p>Website: <a href="${website}" target="_blank" rel="noopener noreferrer">${website}</a></p>
          <button type="button" class="learn-more" 
                  data-name="${biz.name}" 
                  aria-label="Learn more about ${biz.name}">Learn More</button>
        `;

        container.appendChild(article);
      });

      // ✅ Learn More button functionality
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
