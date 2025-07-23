fetch("data/member.json")
  .then(res => res.json())
  .then(data => {
    const eligible = data.filter(member => member.level === "gold" || member.level === "silver");

    const shuffled = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlightContainer");

    shuffled.forEach(member => {
      const card = document.createElement("div");
      card.className = "spotlight-card";
      card.innerHTML = `
        <img src="${member.logo}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.phone}</p>
        <p>${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="level">${member.level.toUpperCase()} Member</p>
      `;
      container.appendChild(card);
    });
  });
