import { icons, names } from './icons-data.js';

const categories = {
  Computing: ['laptop', 'monitor', 'keyboard', 'mouse', 'mini-pc', 'nas', 'gpu', 'processor', 'motherboard', 'pc', 'ssd'],
  Cameras: ['camera', 'camera-lens', 'tripod', 'vlog-camera', 'action-camera', 'webcam', 'drone'],
  Audio: ['headphones', 'microphone', 'earbuds', 'smart-speaker', 'soundbar'],
  'Mobile & wearables': ['phone', 'smartwatch', 'smart-glasses', 'smart-ring', 'tablet', 'e-reader'],
  'Smart home': ['tv', 'router', 'smart-display', 'security-camera', 'robot-vacuum', 'projector'],
  Gaming: ['controller', 'console', 'handheld-console', 'vr-headset'],
  Accessories: ['powerbank', 'charger', 'usb-cable', 'usb-hub', 'backpack']
};

const categoryFor = Object.fromEntries(
  Object.entries(categories).flatMap(([category, iconNames]) => iconNames.map((name) => [name, category]))
);

const state = {
  query: '',
  category: 'All',
  size: 44,
  stroke: 1.6,
  selected: null
};

const grid = document.querySelector('#icon-grid');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const search = document.querySelector('#icon-search');
const filters = document.querySelector('#category-filters');
const sizeControl = document.querySelector('#size-control');
const sizeValue = document.querySelector('#size-value');
const strokeControl = document.querySelector('#stroke-control');
const strokeValue = document.querySelector('#stroke-value');
const dialog = document.querySelector('#icon-dialog');
const toast = document.querySelector('#toast');
let toastTimer;

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function svgMarkup(name, { size = state.size, stroke = state.stroke, ariaHidden = true } = {}) {
  const icon = icons[name];
  const hidden = ariaHidden ? ' aria-hidden="true"' : ` role="img" aria-label="${escapeAttribute(icon.label)} icon"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"${hidden}>${icon.paths}</svg>`;
}

function rawSvg(name) {
  return `${svgMarkup(name, { size: 24, stroke: state.stroke }).replace(' aria-hidden="true"', '')}\n`;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
  showToast(successMessage);
}

function visibleNames() {
  const query = state.query.trim().toLowerCase();
  return names.filter((name) => {
    const matchesCategory = state.category === 'All' || categoryFor[name] === state.category;
    const haystack = `${name} ${icons[name].label} ${categoryFor[name]}`.toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });
}

function renderGrid() {
  const filtered = visibleNames();
  document.documentElement.style.setProperty('--preview-size', `${state.size}px`);

  grid.innerHTML = filtered.map((name) => {
    const icon = icons[name];
    return `<article class="icon-card">
      <button class="copy-card" type="button" data-copy-name="${name}" aria-label="Copy ${escapeAttribute(icon.label)} SVG">
        <span class="copy-note">Copy SVG</span>
        <span class="icon-art">${svgMarkup(name)}</span>
        <span class="icon-meta">
          <span class="icon-label">${icon.label}</span>
          <code class="icon-name">${name}</code>
        </span>
      </button>
      <button class="details-button" type="button" data-details-name="${name}" aria-label="More options for ${escapeAttribute(icon.label)}">&lt;/&gt;</button>
    </article>`;
  }).join('');

  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'icon' : 'icons'}`;
  emptyState.hidden = filtered.length !== 0;
}

function renderFilters() {
  const categoryNames = ['All', ...Object.keys(categories)];
  filters.innerHTML = categoryNames.map((category) => {
    const count = category === 'All' ? names.length : categories[category].length;
    return `<button class="filter-button" type="button" data-category="${category}" aria-pressed="${state.category === category}">${category} <span aria-hidden="true">${count}</span></button>`;
  }).join('');
}

function openDetails(name) {
  state.selected = name;
  const icon = icons[name];
  document.querySelector('#dialog-preview').innerHTML = svgMarkup(name, { size: 126, stroke: state.stroke });
  document.querySelector('#dialog-category').textContent = categoryFor[name];
  document.querySelector('#dialog-title').textContent = icon.label;
  document.querySelector('#dialog-name').textContent = name;
  document.querySelector('#code-preview').textContent = `svg('${name}', { size: 24, strokeWidth: ${state.stroke} })`;
  dialog.showModal();
}

function renderHero() {
  document.querySelector('#hero-icons').innerHTML = ['laptop', 'camera', 'smartwatch']
    .map((name) => `<div class="hero-icon">${svgMarkup(name, { size: 84, stroke: 1.3 })}</div>`)
    .join('');
}

grid.addEventListener('click', (event) => {
  const copyButton = event.target.closest('[data-copy-name]');
  const detailsButton = event.target.closest('[data-details-name]');
  if (copyButton) {
    const name = copyButton.dataset.copyName;
    copyText(rawSvg(name), `${icons[name].label} SVG copied`);
  } else if (detailsButton) {
    openDetails(detailsButton.dataset.detailsName);
  }
});

filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  state.category = button.dataset.category;
  renderFilters();
  renderGrid();
});

search.addEventListener('input', () => {
  state.query = search.value;
  renderGrid();
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== search && !dialog.open) {
    event.preventDefault();
    search.focus();
  }
});

sizeControl.addEventListener('input', () => {
  state.size = Number(sizeControl.value);
  sizeValue.value = state.size;
  renderGrid();
});

strokeControl.addEventListener('input', () => {
  state.stroke = Number(strokeControl.value);
  strokeValue.value = state.stroke.toFixed(1);
  renderGrid();
});

document.querySelector('#clear-search').addEventListener('click', () => {
  search.value = '';
  state.query = '';
  state.category = 'All';
  renderFilters();
  renderGrid();
  search.focus();
});

document.querySelector('#install-copy').addEventListener('click', () => {
  copyText('npm install gadget-icons', 'Install command copied');
});

document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('#copy-svg').addEventListener('click', () => {
  if (state.selected) copyText(rawSvg(state.selected), `${icons[state.selected].label} SVG copied`);
});

document.querySelector('#copy-js').addEventListener('click', () => {
  if (state.selected) copyText(`svg('${state.selected}', { size: 24, strokeWidth: ${state.stroke} });`, 'JavaScript copied');
});

document.querySelector('#download-svg').addEventListener('click', () => {
  if (!state.selected) return;
  const blob = new Blob([rawSvg(state.selected)], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${state.selected}.svg`;
  link.click();
  URL.revokeObjectURL(url);
  showToast(`${icons[state.selected].label} downloaded`);
});

const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('gadget-icons-theme');
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('.theme-label').textContent = theme === 'dark' ? 'Light' : 'Dark';
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} appearance`);
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#11110f' : '#f5f4f0';
}

setTheme(savedTheme || preferredTheme);
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('gadget-icons-theme', nextTheme);
  setTheme(nextTheme);
});

renderHero();
renderFilters();
renderGrid();
