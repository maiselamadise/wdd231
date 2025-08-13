
import { fetchData } from './fetchData.js';
import { savePreference, loadPreference } from './storage.js';
import { openModal, bindModal } from './modal.js';

document.addEventListener('DOMContentLoaded', async ()=>{
  bindModal();

  const container = document.getElementById('services-container');
  const filterSelect = document.getElementById('filter');
  const sortSelect = document.getElementById('sort');

  const PREFS_KEY = 'amc_filters';

  // Load preferences
  const prefs = loadPreference(PREFS_KEY, {filter:'all', sort:'name-asc'});
  if(filterSelect) filterSelect.value = prefs.filter;
  if(sortSelect) sortSelect.value = prefs.sort;

  let items = [];
  try{
    items = await fetchData('data/aircons.json');
    render(items, prefs.filter, prefs.sort);
  }catch(_){
    container.textContent = 'Failed to load services.';
  }

  function render(data, filter, sort){
    container.innerHTML = '';
    let list = [...data];

    // Filter
    if(filter !== 'all'){
      list = list.filter(i => i.category === filter);
    }

    // Sort
    if(sort === 'name-asc') list.sort((a,b)=> a.name.localeCompare(b.name));
    if(sort === 'price-asc') list.sort((a,b)=> a.priceValue - b.priceValue);
    if(sort === 'rating-desc') list.sort((a,b)=> b.energyRating - a.energyRating);

    // Create cards (at least 15)
    list.forEach(item=>{
      const card = document.createElement('div');
      card.className = 'card service-card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <h3>${item.name}</h3>
        <p><span class="badge">${item.category}</span></p>
        <p>Energy Rating: ⭐ ${item.energyRating}</p>
        <p>Price: ${item.price}</p>
      `;
      card.addEventListener('click', ()=>{
        openModal(`
          <article>
            <h2>${item.name}</h2>
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <p>${item.description}</p>
            <ul>
              <li><strong>Category:</strong> ${item.category}</li>
              <li><strong>Energy Rating:</strong> ${item.energyRating}</li>
              <li><strong>Cooling Capacity:</strong> ${item.btu} BTU</li>
              <li><strong>Noise:</strong> ${item.noise} dB</li>
              <li><strong>Price:</strong> ${item.price}</li>
            </ul>
          </article>
        `);
      });
      container.appendChild(card);
    });
  }

  function save(){
    savePreference(PREFS_KEY, { filter: filterSelect.value, sort: sortSelect.value });
  }

  filterSelect?.addEventListener('change', ()=>{
    save(); render(items, filterSelect.value, sortSelect.value);
  });
  sortSelect?.addEventListener('change', ()=>{
    save(); render(items, filterSelect.value, sortSelect.value);
  });
});
