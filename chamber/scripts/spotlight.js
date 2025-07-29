async function loadSpotlights() {
  const container = document.getElementById('spotlight-container');

  try {
    const response = await fetch('data/members.json');
    const members = await response.json();

    // Shuffle members
    const shuffled = members.sort(() => 0.5 - Math.random());

    // Pick 2 or 3 members
    const count = Math.floor(Math.random() * 2) + 2;
    const selected = shuffled.slice(0, count);

    // Create spotlight cards
    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <img src="images/${member.imageFileName}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><strong>Description:</strong> ${member.description}</p>
        <p><strong>Phone:</strong> ${member.phoneNumber}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><a href="${member.websiteURL}" target="_blank">Visit Website</a></p>
        <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = `<p>Error loading spotlight members.</p>`;
    console.error('Error loading members.json:', error);
  }
}

window.addEventListener('DOMContentLoaded', loadSpotlights);
