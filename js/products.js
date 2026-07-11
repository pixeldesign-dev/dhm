/* DHM products.html logic — depends on DHM_PRODUCTS from main.js */

document.addEventListener('DOMContentLoaded', () => {
  const laundryGrid = document.getElementById('laundryGrid');
const housekeepingGrid = document.getElementById('housekeepingGrid');
  const empty = document.getElementById('emptyState');
  const searchInput = document.getElementById('productSearch');
  const tabs = document.querySelectorAll('.filter-tabs button');
  const overlay = document.getElementById('productModal');
  const modalInner = document.getElementById('modalInner');
  const modalClose = document.getElementById('modalClose');

  let activeFilter = 'all';
  let activeQuery = '';

  // honour ?cat= query param coming from homepage / products category links
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat');
  if (catParam) activeFilter = catParam;

  function cardTemplate(p) {
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="shot">
          <span class="tag">REF · ${p.ref}</span>
          <div class="bottle"></div>
        </div>
        <div class="body">
          <span class="cat-tag">${p.categoryLabel}</span>
          <h3>${p.full}</h3>
          <p>${p.short}</p>
          <div class="card-foot">
            <button class="btn btn-outline btn-sm js-view" data-id="${p.id}">View details</button>
            <a href="contact.html?product=${encodeURIComponent(p.full)}" class="arrow-link">Inquire →</a>
          </div>
        </div>
      </article>`;
  }

 function render() {
  const filtered = DHM_PRODUCTS.filter(p => {
    const matchesCat = activeFilter === 'all' || p.category === activeFilter;
    const matchesQuery =
      !activeQuery ||
      (p.full + ' ' + p.short).toLowerCase().includes(activeQuery);

    return matchesCat && matchesQuery;
  });

  const laundry = filtered.filter(p => p.category === 'laundry');
  const housekeeping = filtered.filter(p => p.category === 'housekeeping');

  laundryGrid.innerHTML = laundry.map(cardTemplate).join('');
  housekeepingGrid.innerHTML = housekeeping.map(cardTemplate).join('');

  document.querySelector('.product-section:first-of-type').style.display =
    laundry.length ? '' : 'none';

  document.querySelector('.product-section:last-of-type').style.display =
    housekeeping.length ? '' : 'none';

  empty.classList.toggle('show', filtered.length === 0);

  document.querySelectorAll('.js-view').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.id));
  });
}

  tabs.forEach(tab => {
    if (tab.dataset.cat === activeFilter) tab.classList.add('active');
    else tab.classList.remove('active');
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.cat;
      render();
    });
  });

  searchInput?.addEventListener('input', e => {
    activeQuery = e.target.value.trim().toLowerCase();
    render();
  });

  function openModal(id) {
    const p = DHM_PRODUCTS.find(x => x.id === id);
    if (!p) return;
    modalInner.innerHTML = `
      <div class="modal-grid">
        <div class="modal-shot"><div class="bottle"></div></div>
        <div class="modal-body">
          <span class="cat-tag">${p.categoryLabel} · REF ${p.ref}</span>
          <h2>${p.full}</h2>
          <div class="modal-section">
            <h5>Description</h5>
            <p>${p.description}</p>
          </div>
          <div class="modal-section">
            <h5>Benefits</h5>
            <ul>${p.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
          </div>
          <div class="modal-section">
            <h5>Applications</h5>
            <ul>${p.applications.map(a => `<li>${a}</li>`).join('')}</ul>
          </div>
          <div class="modal-section">
            <h5>Directions to use</h5>
            <p>${p.directions}</p>
          </div>
          <div class="modal-section">
            <h5>Storage information</h5>
            <p>${p.storage}</p>
          </div>
          <div class="modal-actions">
            <button class="btn btn-primary js-download">Download brochure</button>
            <a href="contact.html?product=${encodeURIComponent(p.full)}" class="btn btn-accent">Send inquiry</a>
          </div>
        </div>
      </div>`;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalInner.querySelector('.js-download')?.addEventListener('click', () => {
      alert('Brochure download is available once connected to the document library.');
    });
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  render();
});
