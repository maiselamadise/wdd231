fetch("data/members.json")
  .then((response) => response.json())
  .then((data) => {
    const spotlightDiv = document.getElementById("spotlightContainer");
    const goldSilver = data.members.filter(member =>
      member.membership === "Gold" || member.membership === "Silver"
    );

    const randomMembers = [];
    while (randomMembers.length < 3 && goldSilver.length > 0) {
      const index = Math.floor(Math.random() * goldSilver.length);
      randomMembers.push(goldSilver.splice(index, 1)[0]);
    }

    spotlightDiv.innerHTML = randomMembers.map(member => `
      <div class="spotlight">
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      </div>
    `).join("");
  })
  .catch(err => {
    console.error("Error loading spotlights:", err);
    document.getElementById("spotlightContainer").textContent = "Unable to load member spotlights.";
  });
