document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-display');
    const gridButton = document.getElementById('grid-view-btn');
    const listButton = document.getElementById('list-view-btn');
    const copyrightYearSpan = document.getElementById('copyright-year');
    const lastModifiedSpan = document.getElementById('last-modified');
    const currentTimeSpan = document.getElementById('current-time'); // Handle current time span
    let cachedMembers = []; // Cache to avoid repeated fetches

    // Set dynamic footer info
    function setFooterDates() {
        const now = new Date();
        copyrightYearSpan.textContent = now.getFullYear();

        const lastModifiedDate = new Date(document.lastModified);
        lastModifiedSpan.textContent = lastModifiedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        if (currentTimeSpan) {
            currentTimeSpan.textContent = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }

    // Fetch and cache member data
    async function fetchMemberData() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            cachedMembers = await response.json();
            return cachedMembers;
        } catch (error) {
            console.error('Error fetching member data:', error);
            membersContainer.innerHTML = '<p>Failed to load member directory. Please try again later.</p>';
            return [];
        }
    }

    // Render members in grid or list layout
    function displayMembers(members, viewType) {
        membersContainer.innerHTML = '';
        membersContainer.className = `member-display ${viewType}-view`;

        members.forEach(member => {
            const container = document.createElement('div');
            container.classList.add(viewType === 'grid' ? 'member-card' : 'member-list-item');

            const imageSize = viewType === 'grid' ? '150x150' : '60x60';
            const img = `<img src="images/${member.imageFileName}" alt="${member.name} logo"
                        onerror="this.onerror=null;this.src='https://placehold.co/${imageSize}/e0e0e0/000000?text=No+Image';">`;

            const info = `
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phoneNumber}</p>
                <p>Membership Level: ${member.membershipLevel}</p>
                <a href="${member.websiteURL}" target="_blank">Visit Website</a>
            `;

            container.innerHTML = viewType === 'grid'
                ? `${img}${info}<p>${member.description}</p>`
                : `${img}<div class="member-info">${info}</div>`;

            membersContainer.appendChild(container);
        });

        gridButton.classList.toggle('active', viewType === 'grid');
        listButton.classList.toggle('active', viewType === 'list');
    }

    // Handle view toggles
    gridButton.addEventListener('click', () => displayMembers(cachedMembers, 'grid'));
    listButton.addEventListener('click', () => displayMembers(cachedMembers, 'list'));

    // Initialize
    setFooterDates();
    fetchMemberData().then(members => displayMembers(members, 'grid'));
});
