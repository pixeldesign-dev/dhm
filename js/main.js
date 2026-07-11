/* DHM site behaviour */

document.addEventListener('DOMContentLoaded', () => {
  /* ---- mobile nav ---- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-main');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  /* ---- footer year ---- */
  document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---- newsletter / inquiry forms (front-end only) ---- */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const success = form.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    });
  });
});

/* =========================================================
   PRODUCT CATALOG DATA
   Used on products.html for grid render, filter, search, modal
   ========================================================= */
const DHM_PRODUCTS = [
  {
    id: 'ever-white',
    name: 'Ever White',
    full: 'Easy wash',
    category: 'laundry',
    categoryLabel: 'Laundry care',
    ref: 'EW-2026',
    short: 'High-performance liquid detergent for hospital and hospitality linen.',
    description: 'A concentrated liquid detergent engineered for commercial laundry lines handling hospital and hotel linen. Formulated to lift organic stains while remaining gentle on fabric fibres over repeated wash cycles.',
    benefits: ['Removes tough organic stains', 'Deep-cleans without fading colour', 'Disinfects fabric during the wash', 'Extends linen lifespan'],
    applications: ['Hospitals', 'Hotels', 'Commercial laundry services'],
    directions: 'Dose 20–40 ml per kg of dry linen depending on soil level. Add directly to the main wash at 40–60°C.',
    storage: 'Store in a cool, dry place away from direct sunlight. Keep container tightly closed.'
  },
  {
    id: 'eco-soft',
    name: 'Eco Soft',
    full: 'Ever White',
    category: 'laundry',
    categoryLabel: 'Laundry care',
    ref: 'ES-2026',
    short: 'Fabric conditioner that softens linen while neutralising residual odour.',
    description: 'A biodegradable fabric conditioner formulated to leave linen soft to the touch and free of residual detergent odour, suited to high-turnover commercial laundries.',
    benefits: ['Softens fabric in a single rinse', 'Neutralises detergent and odour residue', 'Reduces static and creasing', 'Biodegradable formulation'],
    applications: ['Hotels', 'Hospitals', 'Institutional laundry'],
    directions: 'Add 15–25 ml per kg of dry linen during the final rinse cycle.',
    storage: 'Store between 10–30°C, away from heat sources. Shake before use.'
  },
  {
    id: 'chem-master',
    name: 'Chem Master',
    full: 'Enzyme',
    category: 'laundry',
    categoryLabel: 'Laundry care',
    ref: 'CM-2026',
    short: 'pH-neutral wash additive that protects fabric and machine components.',
    description: 'A pH-balanced laundry additive that neutralises alkaline residue left by detergents, protecting both fabric fibres and washing machine components over time.',
    benefits: ['Balances wash-water pH', 'Protects machine seals and drums', 'Prevents fabric yellowing', 'Compatible with all linen types'],
    applications: ['Commercial laundry services', 'Hotels', 'Hospitals'],
    directions: 'Add 10–15 ml per kg of dry linen in the neutralising rinse stage.',
    storage: 'Store upright in a ventilated area. Avoid contact with strong acids.'
  },

    {
    id: 'chem-master',
    name: 'Chem Master',
    full: 'Eco soft',
    category: 'laundry',
    categoryLabel: 'Laundry care',
    ref: 'CM-2026',
    short: 'pH-neutral wash additive that protects fabric and machine components.',
    description: 'A pH-balanced laundry additive that neutralises alkaline residue left by detergents, protecting both fabric fibres and washing machine components over time.',
    benefits: ['Balances wash-water pH', 'Protects machine seals and drums', 'Prevents fabric yellowing', 'Compatible with all linen types'],
    applications: ['Commercial laundry services', 'Hotels', 'Hospitals'],
    directions: 'Add 10–15 ml per kg of dry linen in the neutralising rinse stage.',
    storage: 'Store upright in a ventilated area. Avoid contact with strong acids.'
  },


    {
    id: 'chem-master',
    name: 'Chem Master',
    full: 'Clorex',
    category: 'laundry',
    categoryLabel: 'Laundry care',
    ref: 'CM-2026',
    short: 'pH-neutral wash additive that protects fabric and machine components.',
    description: 'A pH-balanced laundry additive that neutralises alkaline residue left by detergents, protecting both fabric fibres and washing machine components over time.',
    benefits: ['Balances wash-water pH', 'Protects machine seals and drums', 'Prevents fabric yellowing', 'Compatible with all linen types'],
    applications: ['Commercial laundry services', 'Hotels', 'Hospitals'],
    directions: 'Add 10–15 ml per kg of dry linen in the neutralising rinse stage.',
    storage: 'Store upright in a ventilated area. Avoid contact with strong acids.'
  },

    {
    id: 'chem-master',
    name: 'Chem Master',
    full: 'Vertex',
    category: 'laundry',
    categoryLabel: 'Laundry care',
    ref: 'CM-2026',
    short: 'pH-neutral wash additive that protects fabric and machine components.',
    description: 'A pH-balanced laundry additive that neutralises alkaline residue left by detergents, protecting both fabric fibres and washing machine components over time.',
    benefits: ['Balances wash-water pH', 'Protects machine seals and drums', 'Prevents fabric yellowing', 'Compatible with all linen types'],
    applications: ['Commercial laundry services', 'Hotels', 'Hospitals'],
    directions: 'Add 10–15 ml per kg of dry linen in the neutralising rinse stage.',
    storage: 'Store upright in a ventilated area. Avoid contact with strong acids.'
  },

    {
    id: 'chem-master',
    name: 'Chem Master',
    full: 'Chem Master',
    category: 'laundry',
    categoryLabel: 'Laundry care',
    ref: 'CM-2026',
    short: 'pH-neutral wash additive that protects fabric and machine components.',
    description: 'A pH-balanced laundry additive that neutralises alkaline residue left by detergents, protecting both fabric fibres and washing machine components over time.',
    benefits: ['Balances wash-water pH', 'Protects machine seals and drums', 'Prevents fabric yellowing', 'Compatible with all linen types'],
    applications: ['Commercial laundry services', 'Hotels', 'Hospitals'],
    directions: 'Add 10–15 ml per kg of dry linen in the neutralising rinse stage.',
    storage: 'Store upright in a ventilated area. Avoid contact with strong acids.'
  },





 
  
  {
    id: 'rid',
    name: 'RID',
    full: 'Safeshield',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'RD-2026',
    short: 'Concentrated floor cleaner for large-area daily housekeeping.',
    description: 'A concentrated multi-surface floor cleaner formulated for daily mopping across large institutional and hospitality floor areas, cutting grease and grime without leaving residue.',
    benefits: ['Cuts grease and grime fast', 'Leaves no sticky residue', 'Pleasant lasting fragrance', 'Safe on tile, vinyl and stone'],
    applications: ['Hospitals', 'Hotels', 'Institutions and offices'],
    directions: 'Dilute 30–50 ml per 5 litres of water for routine mopping.',
    storage: 'Store in a cool, dry area. Keep cap tightly closed after use.'
  },
  {
    id: 'wealth',
    name: 'Wealth Polish',
    full: 'White Phenol',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'WP-2026',
    short: 'High-gloss polish for floors and wood furniture surfaces.',
    description: 'A high-gloss polish formulated to restore shine to floors and wooden furniture in hotel lobbies and institutional common areas after routine cleaning.',
    benefits: ['Restores high-gloss shine', 'Adds a protective surface layer', 'Resists fingerprints and dust', 'Pleasant residual fragrance'],
    applications: ['Hotel lobbies', 'Institutions', 'Furniture and reception areas'],
    directions: 'Apply a thin, even coat with a soft cloth or applicator, buff once dry.',
    storage: 'Store upright, away from heat and direct sunlight.'
  },
  {
    id: 'glasspro',
    name: 'GlassPro',
    full: 'Super Shine',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'GP-2026',
    short: 'Streak-free cleaner for glass, mirrors and chrome fittings.',
    description: 'A streak-free formulation for glass partitions, mirrors and chrome fittings common to hotel lobbies, hospital reception areas and institutional buildings.',
    benefits: ['Streak-free finish', 'Fast evaporation, no wiping marks', 'Removes fingerprints and smudges', 'Safe on tinted and tempered glass'],
    applications: ['Hotels', 'Hospitals', 'Offices and institutions'],
    directions: 'Spray directly onto the surface and wipe with a clean, dry cloth or squeegee.',
    storage: 'Store at room temperature, away from direct sunlight.'
  },

  {
    id: 'glasspro',
    name: 'GlassPro',
    full: 'RID',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'GP-2026',
    short: 'Streak-free cleaner for glass, mirrors and chrome fittings.',
    description: 'A streak-free formulation for glass partitions, mirrors and chrome fittings common to hotel lobbies, hospital reception areas and institutional buildings.',
    benefits: ['Streak-free finish', 'Fast evaporation, no wiping marks', 'Removes fingerprints and smudges', 'Safe on tinted and tempered glass'],
    applications: ['Hotels', 'Hospitals', 'Offices and institutions'],
    directions: 'Spray directly onto the surface and wipe with a clean, dry cloth or squeegee.',
    storage: 'Store at room temperature, away from direct sunlight.'
  },

  {
    id: 'glasspro',
    name: 'GlassPro',
    full: 'Lemon – on Dishwash Active Gel',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'GP-2026',
    short: 'Streak-free cleaner for glass, mirrors and chrome fittings.',
    description: 'A streak-free formulation for glass partitions, mirrors and chrome fittings common to hotel lobbies, hospital reception areas and institutional buildings.',
    benefits: ['Streak-free finish', 'Fast evaporation, no wiping marks', 'Removes fingerprints and smudges', 'Safe on tinted and tempered glass'],
    applications: ['Hotels', 'Hospitals', 'Offices and institutions'],
    directions: 'Spray directly onto the surface and wipe with a clean, dry cloth or squeegee.',
    storage: 'Store at room temperature, away from direct sunlight.'
  },

  {
    id: 'glasspro',
    name: 'GlassPro',
    full: 'Resolve Toilet Cleaner',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'GP-2026',
    short: 'Streak-free cleaner for glass, mirrors and chrome fittings.',
    description: 'A streak-free formulation for glass partitions, mirrors and chrome fittings common to hotel lobbies, hospital reception areas and institutional buildings.',
    benefits: ['Streak-free finish', 'Fast evaporation, no wiping marks', 'Removes fingerprints and smudges', 'Safe on tinted and tempered glass'],
    applications: ['Hotels', 'Hospitals', 'Offices and institutions'],
    directions: 'Spray directly onto the surface and wipe with a clean, dry cloth or squeegee.',
    storage: 'Store at room temperature, away from direct sunlight.'
  },

  {
    id: 'glasspro',
    name: 'GlassPro',
    full: 'REX Disnfected Toilet Cleaner',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'GP-2026',
    short: 'Streak-free cleaner for glass, mirrors and chrome fittings.',
    description: 'A streak-free formulation for glass partitions, mirrors and chrome fittings common to hotel lobbies, hospital reception areas and institutional buildings.',
    benefits: ['Streak-free finish', 'Fast evaporation, no wiping marks', 'Removes fingerprints and smudges', 'Safe on tinted and tempered glass'],
    applications: ['Hotels', 'Hospitals', 'Offices and institutions'],
    directions: 'Spray directly onto the surface and wipe with a clean, dry cloth or squeegee.',
    storage: 'Store at room temperature, away from direct sunlight.'
  },

  {
    id: 'glasspro',
    name: 'GlassPro',
    full: 'Rescue Toilet Cleaner',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'GP-2026',
    short: 'Streak-free cleaner for glass, mirrors and chrome fittings.',
    description: 'A streak-free formulation for glass partitions, mirrors and chrome fittings common to hotel lobbies, hospital reception areas and institutional buildings.',
    benefits: ['Streak-free finish', 'Fast evaporation, no wiping marks', 'Removes fingerprints and smudges', 'Safe on tinted and tempered glass'],
    applications: ['Hotels', 'Hospitals', 'Offices and institutions'],
    directions: 'Spray directly onto the surface and wipe with a clean, dry cloth or squeegee.',
    storage: 'Store at room temperature, away from direct sunlight.'
  },

  {
    id: 'glasspro',
    name: 'GlassPro',
    full: 'Maxwell Toilet Cleaner',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'GP-2026',
    short: 'Streak-free cleaner for glass, mirrors and chrome fittings.',
    description: 'A streak-free formulation for glass partitions, mirrors and chrome fittings common to hotel lobbies, hospital reception areas and institutional buildings.',
    benefits: ['Streak-free finish', 'Fast evaporation, no wiping marks', 'Removes fingerprints and smudges', 'Safe on tinted and tempered glass'],
    applications: ['Hotels', 'Hospitals', 'Offices and institutions'],
    directions: 'Spray directly onto the surface and wipe with a clean, dry cloth or squeegee.',
    storage: 'Store at room temperature, away from direct sunlight.'
  },

  {
    id: 'glasspro',
    name: 'GlassPro',
    full: 'Wealth',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'GP-2026',
    short: 'Streak-free cleaner for glass, mirrors and chrome fittings.',
    description: 'A streak-free formulation for glass partitions, mirrors and chrome fittings common to hotel lobbies, hospital reception areas and institutional buildings.',
    benefits: ['Streak-free finish', 'Fast evaporation, no wiping marks', 'Removes fingerprints and smudges', 'Safe on tinted and tempered glass'],
    applications: ['Hotels', 'Hospitals', 'Offices and institutions'],
    directions: 'Spray directly onto the surface and wipe with a clean, dry cloth or squeegee.',
    storage: 'Store at room temperature, away from direct sunlight.'
  },

  {
    id: 'glasspro',
    name: 'GlassPro',
    full: 'Deft',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'GP-2026',
    short: 'Streak-free cleaner for glass, mirrors and chrome fittings.',
    description: 'A streak-free formulation for glass partitions, mirrors and chrome fittings common to hotel lobbies, hospital reception areas and institutional buildings.',
    benefits: ['Streak-free finish', 'Fast evaporation, no wiping marks', 'Removes fingerprints and smudges', 'Safe on tinted and tempered glass'],
    applications: ['Hotels', 'Hospitals', 'Offices and institutions'],
    directions: 'Spray directly onto the surface and wipe with a clean, dry cloth or squeegee.',
    storage: 'Store at room temperature, away from direct sunlight.'
  },


  {
    id: 'glasspro',
    name: 'GlassPro',
    full: 'Enrich Room Mate',
    category: 'housekeeping',
    categoryLabel: 'House Keeping',
    ref: 'GP-2026',
    short: 'Streak-free cleaner for glass, mirrors and chrome fittings.',
    description: 'A streak-free formulation for glass partitions, mirrors and chrome fittings common to hotel lobbies, hospital reception areas and institutional buildings.',
    benefits: ['Streak-free finish', 'Fast evaporation, no wiping marks', 'Removes fingerprints and smudges', 'Safe on tinted and tempered glass'],
    applications: ['Hotels', 'Hospitals', 'Offices and institutions'],
    directions: 'Spray directly onto the surface and wipe with a clean, dry cloth or squeegee.',
    storage: 'Store at room temperature, away from direct sunlight.'
  },


];
