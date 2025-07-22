// Responsive Menu Toggle
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('navMenu').classList.toggle('show');
});

// View Toggle
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');
const members = document.getElementById('members');

gridBtn.addEventListener('click', () => {
  members.className = 'grid';
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');
});

listBtn.addEventListener('click', () => {
  members.className = 'list';
  listBtn.setAttribute('aria-pressed', 'true');
  gridBtn.setAttribute('aria-pressed', 'false');
});

// Load Members using async/await
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();

    const membersSection = document.getElementById('members');
    data.members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('card');

      let membershipLabel = 'Member';
      let levelClass = '';
      switch (member.membership) {
        case 1: membershipLabel = 'Bronze Member'; levelClass = 'bronze'; break;
        case 2: membershipLabel = 'Silver Member'; levelClass = 'silver'; break;
        case 3: membershipLabel = 'Gold Member'; levelClass = 'gold'; break;
      }

      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} Logo" loading="lazy" />
        <h3>${member.name}</h3>
        <p><strong class="${levelClass}">${membershipLabel}</strong></p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      `;
      membersSection.appendChild(card);
    });

  } catch (error) {
    console.error('Failed to load members:', error);
    members.textContent = 'Failed to load members. Please try again later.';
  }
}

loadMembers();
