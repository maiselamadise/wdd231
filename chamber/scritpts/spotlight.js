async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to load members");

    const data = await response.json();
    const goldSilverMembers = data.members.filter(m =>
      m.membership === "Gold" || m.membership === "Silver"
    );

    const randomSpotlights = [];
    while (randomSpotlights.length < 3 && goldSilverMembers.length > 0) {
      const index = Math.floor(Math.random() * goldSilverMembers.length);
      const selected = goldSilverMembers.splice(index, 1)[0];
      randomSpotlights.push(selected);
    }

    const spotlightSection = document.getElementById("spotlights");
    randomSpotlights.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="${member.logo}" alt="${member.name} Logo">
        <h3>${member.name}</h3>
        <p>Membership: ${member.membership}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;
      spotlightSection.appendChild(card);
    });

  } catch (error) {
    console.error("Spotlight error:", error);
    document.getElementById("spotlights").innerHTML = "<p>Unable to load spotlights.</p>";
  }
}

loadSpotlights();
