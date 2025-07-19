document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Toggle views
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");
const directory = document.getElementById("directory");

gridBtn.addEventListener("click", () => {
  directory.classList.add("grid-view");
  directory.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  directory.classList.add("list-view");
  directory.classList.remove("grid-view");
});

// Fetch and display members
async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();

  data.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    directory.appendChild(card);
  });
}

getMembers();
