// Responsive menu toggle
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('navMenu').classList.toggle('show');
});

// View toggle
document.getElementById('gridView').addEventListener('click', () => {
  document.getElementById('members').className = 'grid';
});

document.getElementById('listView').addEventListener('click', () => {
  document.getElementById('members').className = 'list';
});

// Load members from JSON
fetch('data/members.json')
  .then(response => response.json())
  .then(data => {
    const membersSection = document.getElementById('members');
    data.members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} Logo" />
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;
      membersSection.appendChild(card);
    });
  });