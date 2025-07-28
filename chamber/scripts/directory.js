const memberDisplay = document.getElementById('member-display');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

const dataURL = 'data/members.json'; // Path to your JSON file

// Function to fetch member data
async function getMemberData() {
    try {
        const response = await fetch(dataURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data, 'grid'); // Display as grid by default
    } catch (error) {
        console.error('Error fetching member data:', error);
        memberDisplay.innerHTML = '<p>Error loading member data. Please try again later.</p>';
    }
}

// Function to display members
function displayMembers(members, viewType) {
    memberDisplay.innerHTML = ''; // Clear existing content
    memberDisplay.classList.remove('grid-view', 'list-view'); // Remove previous view classes
    memberDisplay.classList.add(`${viewType}-view`); // Add current view class

    members.forEach(member => {
        if (viewType === 'grid') {
            const card = document.createElement('div');
            card.classList.add('member-card');
            // Add classes based on membership level for styling
            if (member.membershipLevel === 2) {
                card.classList.add('silver-member');
            } else if (member.membershipLevel === 3) {
                card.classList.add('gold-member');
            }

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                <p class="member-level">Level: ${member.membershipLevel}</p>
                ${member.otherInfo ? `<p class="other-info">${member.otherInfo}</p>` : ''}
            `;
            memberDisplay.appendChild(card);
        } else { // list view
            const listItem = document.createElement('div');
            listItem.classList.add('member-list-item');
            // Add classes based on membership level for styling
            if (member.membershipLevel === 2) {
                listItem.classList.add('silver-member-list');
            } else if (member.membershipLevel === 3) {
                listItem.classList.add('gold-member-list');
            }

            listItem.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo">
                <div>
                    <h3>${member.name}</h3>
                    <p>${member.address} | ${member.phone} | <a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                </div>
            `;
            memberDisplay.appendChild(listItem);
        }
    });
}

// Event Listeners for view toggles
gridViewBtn.addEventListener('click', () => {
    getMemberData().then(data => displayMembers(data, 'grid')); // Re-fetch or re-display as grid
});

listViewBtn.addEventListener('click', () => {
    getMemberData().then(data => displayMembers(data, 'list')); // Re-fetch or re-display as list
});

// Initial call to load members when the page loads
getMemberData();