// Single source of truth: every icon's inner SVG markup, keyed by name.
// scripts/build.mjs reads this file to generate the standalone files in
// icons/ and the preview grid in preview.svg. Add or edit an icon here, then
// run `npm run build` to regenerate both.
//
// House rules for a new icon (internal — the README talks about this in
// prose, this is the literal checklist):
//   - 24x24 viewBox, elements kept off the outer ~2px so nothing crowds the edge.
//   - stroke-width 1.6, stroke-linecap/linejoin round. Set once in svg() and
//     scripts/build.mjs, not per icon.
//   - fill: none by default. rx="1.5" for rigid/hard-shelled objects, "3" for
//     soft/held/worn ones — except a true capsule shape (mouse or controller
//     body) keeps its half-dimension pill radius; flattening those to 3 breaks
//     the silhouette that makes them legible. See mouse/controller below.
//   - one filled element per icon (a dot or bolt, stroke="none"), placed only
//     where an outline would vanish at icon size. Exceptions: controller,
//     soundbar, vr-headset — at this radius, a stroke-width this close to the
//     shape's own radius makes an "unfilled" circle render as a smudged blob
//     instead of a clean ring, so the one-fill rule made them worse, not
//     simpler. Multi-fill stays for objects whose real identity depends on
//     several small elements (button cluster, driver row, twin lenses).
//   - draw straight-on. No side views, no pseudo-3D — every icon in this set
//     shares one honest front angle, which is most of why many unrelated
//     objects read as one family instead of a grab-bag.
//   - max ~3 visual layers (body, functional component(s), one signature
//     detail). If you need a 4th, the icon is probably trying to say too much.
export const icons = {
  laptop: {
    label: 'Laptop',
    paths: '<rect x="4" y="4" width="16" height="10" rx="1.5"/><path d="M2 18.5h20l-1.8-3.5H3.8z"/>'
  },
  phone: {
    label: 'Phone',
    paths: '<rect x="7" y="2.5" width="10" height="19" rx="1.5"/><line x1="10" y1="19" x2="14" y2="19"/>'
  },
  headphones: {
    label: 'Headphones',
    paths: '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="2.5" y="13" width="4" height="6" rx="3"/><rect x="17.5" y="13" width="4" height="6" rx="3"/>'
  },
  microphone: {
    label: 'Microphone',
    paths: '<rect x="8" y="2.5" width="8" height="12" rx="4"/><path d="M5.5 10.5v1a6.5 6.5 0 0 0 13 0v-1M12 18v3M8.5 21h7"/>'
  },
  earbuds: {
    label: 'Earbuds',
    paths: '<circle cx="7.5" cy="8" r="2.6"/><rect x="6.6" y="10.2" width="1.8" height="8.3" rx="3"/><circle cx="16.5" cy="8" r="2.6"/><rect x="15.6" y="10.2" width="1.8" height="8.3" rx="3"/>'
  },
  tv: {
    label: 'TV',
    paths: '<rect x="2.5" y="4" width="19" height="12.5" rx="1.5"/><path d="M7 20.5l1.5-3.5M17 20.5l-1.5-3.5"/>'
  },
  monitor: {
    label: 'Monitor',
    paths: '<rect x="3.5" y="3.5" width="17" height="12" rx="1.5"/><path d="M12 15.5v2.5"/><path d="M8 20.5h8"/>'
  },
  keyboard: {
    label: 'Keyboard',
    paths: '<rect x="2" y="6" width="20" height="12" rx="1.5"/><path d="M5 10h1M9 10h1M13 10h1M17 10h1M5 14h1M18 14h1M9 14h6"/>'
  },
  mouse: {
    label: 'Mouse',
    paths: '<rect x="7" y="2.5" width="10" height="18" rx="5"/><line x1="12" y1="2.5" x2="12" y2="9"/>'
  },
  camera: {
    label: 'Camera',
    paths: '<rect x="2.5" y="7" width="19" height="13" rx="1.5"/><circle cx="12" cy="13.5" r="4"/><path d="M8 7l1.5-2.5h5L16 7"/>'
  },
  'camera-lens': {
    label: 'Camera lens',
    paths: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><path d="M12 6.5l4.8 2.8v5.5L12 17.5l-4.8-2.7V9.3z"/>'
  },
  tripod: {
    label: 'Tripod',
    paths: '<rect x="7" y="3" width="10" height="4" rx="1.5"/><path d="M12 7v5M7.5 12h9M12 12l-4 9M12 12l4 9M12 12v9"/>'
  },
  'vlog-camera': {
    label: 'Vlog camera',
    paths: '<rect x="3" y="6" width="13" height="10" rx="1.5"/><circle cx="9.5" cy="11" r="3"/><rect x="17" y="8" width="4.5" height="6" rx="1.5"/>'
  },
  'action-camera': {
    label: 'Action camera',
    paths: '<rect x="3" y="6" width="18" height="12" rx="1.5"/><circle cx="15.5" cy="12" r="3.5"/><rect x="5.5" y="8.5" width="4" height="2.5" rx="0.8"/><circle cx="7.5" cy="14.5" r="0.7" fill="currentColor" stroke="none"/>'
  },
  webcam: {
    label: 'Webcam',
    paths: '<circle cx="12" cy="9" r="6"/><circle cx="12" cy="9" r="2" fill="currentColor" stroke="none"/><path d="M8.3 19.5h7.4a1.5 1.5 0 0 0-1.5-1.5h-4.4a1.5 1.5 0 0 0-1.5 1.5z"/>'
  },
  drone: {
    label: 'Drone',
    paths: '<path d="M2.2 4.5h4.6M4.5 2.2v4.6M17.2 4.5h4.6M19.5 2.2v4.6M2.2 19.5h4.6M4.5 17.2v4.6M17.2 19.5h4.6M19.5 17.2v4.6"/><path d="M6.3 6.3L10.2 10.2M17.7 6.3L13.8 10.2M6.3 17.7L10.2 13.8M17.7 17.7L13.8 13.8"/><rect x="9.5" y="9.5" width="5" height="5" rx="1.5"/>'
  },
  smartwatch: {
    label: 'Smartwatch',
    paths: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 7V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V7M9 17v3.5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V17"/><line x1="17.3" y1="10.5" x2="19" y2="10.5"/>'
  },
  'smart-glasses': {
    label: 'Smart glasses',
    paths: '<rect x="2.5" y="8" width="8" height="7" rx="3"/><rect x="13.5" y="8" width="8" height="7" rx="3"/><path d="M10.5 10.5h3M2.5 9L2 7M21.5 9l.5-2"/><circle cx="19.5" cy="9.8" r="0.7" fill="currentColor" stroke="none"/>'
  },
  'smart-ring': {
    label: 'Smart ring',
    paths: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><rect x="10" y="18.5" width="4" height="1.5" rx="0.75" fill="currentColor" stroke="none"/>'
  },
  tablet: {
    label: 'Tablet',
    paths: '<rect x="4" y="2.5" width="16" height="19" rx="1.5"/><circle cx="12" cy="19" r="0.9" fill="currentColor" stroke="none"/>'
  },
  'e-reader': {
    label: 'E-reader',
    paths: '<rect x="5" y="2.5" width="14" height="19" rx="1.5"/><path d="M8 8h8M8 11h8M8 14h5"/>'
  },
  router: {
    label: 'Router',
    paths: '<rect x="3" y="11" width="18" height="7" rx="1.5"/><path d="M8 11l-1.5-6M16 11l1.5-6"/><circle cx="12" cy="14.5" r="0.9" fill="currentColor" stroke="none"/>'
  },
  powerbank: {
    label: 'Power bank',
    paths: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M13 6l-4 7h3l-1 5 5-8h-3z" fill="currentColor" stroke="none"/>'
  },
  charger: {
    label: 'Charger',
    paths: '<path d="M9 5V2.5M15 5V2.5"/><rect x="6.5" y="5" width="11" height="16.5" rx="1.5"/><path d="M10 17.5h4"/>'
  },
  'usb-cable': {
    label: 'USB cable',
    paths: '<rect x="3" y="2.5" width="7" height="4.5" rx="1.2"/><rect x="15.5" y="3.25" width="5.5" height="3" rx="1.5"/><path d="M6.5 7v5a5.5 5.5 0 0 0 11 0V6.25M5 4.75h3"/>'
  },
  'usb-hub': {
    label: 'USB hub',
    paths: '<rect x="3" y="6" width="18" height="12" rx="1.5"/><path d="M2 12h1M7 9.5h3v5H7zM14 9.5h3v5h-3z"/>'
  },
  backpack: {
    label: 'Backpack',
    paths: '<path d="M9.5 6V3.5a2.5 2.5 0 0 1 5 0V6"/><rect x="6" y="6" width="12" height="15" rx="3"/><path d="M6 11.5h12"/><rect x="9" y="16" width="6" height="4" rx="1.2"/>'
  },
  'mini-pc': {
    label: 'Mini PC',
    paths: '<rect x="3" y="6" width="18" height="12" rx="1.5"/><circle cx="7" cy="9" r="0.9" fill="currentColor" stroke="none"/><path d="M14 9h4M14 12h4M14 15h4"/>'
  },
  nas: {
    label: 'NAS',
    paths: '<rect x="5" y="2.5" width="14" height="19" rx="1.5"/><rect x="7.5" y="5.5" width="9" height="4.5" rx="1.2"/><rect x="7.5" y="11.5" width="9" height="4.5" rx="1.2"/><circle cx="12" cy="18.5" r="0.9" fill="currentColor" stroke="none"/>'
  },
  gpu: {
    label: 'GPU',
    paths: '<rect x="2.5" y="6" width="19" height="10" rx="1.5"/><circle cx="8" cy="11" r="2.5"/><circle cx="16" cy="11" r="2.5"/><path d="M2.5 16v3M6 16v2"/>'
  },
  processor: {
    label: 'Processor',
    paths: '<rect x="3" y="3" width="18" height="18" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/><path d="M3 7h2M3 11h2M3 15h2M19 7h2M19 11h2M19 15h2M7 3v2M11 3v2M15 3v2M7 19v2M11 19v2M15 19v2"/>'
  },
  motherboard: {
    label: 'Motherboard',
    paths: '<rect x="3" y="3" width="18" height="18" rx="1.5"/><rect x="5.5" y="5.5" width="7" height="7" rx="1.2"/><path d="M15 5.5v9M18 5.5v9M12.5 9H15M12.5 12H15M5.5 16h4v3M15 17h3"/><circle cx="18" cy="18.5" r="0.7" fill="currentColor" stroke="none"/>'
  },
  pc: {
    label: 'PC',
    paths: '<rect x="5" y="4" width="14" height="16" rx="1.5"/><circle cx="9" cy="7" r="0.9" fill="currentColor" stroke="none"/><path d="M14 6.5v9M16.5 6.5v9"/><path d="M8 20v1.5M16 20v1.5"/>'
  },
  'smart-speaker': {
    label: 'Smart speaker',
    paths: '<rect x="6" y="3" width="12" height="18" rx="4"/><path d="M9.5 6.5h5"/><path d="M9 11h0M12 11h0M15 11h0M9 14h0M12 14h0M15 14h0M9 17h0M12 17h0M15 17h0"/>'
  },
  'smart-display': {
    label: 'Smart display',
    paths: '<rect x="3" y="3.5" width="18" height="14" rx="3"/><circle cx="12" cy="6.2" r="0.7" fill="currentColor" stroke="none"/><path d="M8.5 21h7L14 17.5h-4z"/>'
  },
  'security-camera': {
    label: 'Security camera',
    paths: '<path d="M5 9a7 7 0 0 1 14 0v2H5z"/><path d="M8 11v2a4 4 0 0 0 8 0v-2"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M7 4h10M12 4v2"/>'
  },
  'robot-vacuum': {
    label: 'Robot vacuum',
    paths: '<path d="M6 14V4a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 18 4v10M10 6h4"/><rect x="3" y="14" width="18" height="7" rx="3.5"/><path d="M4 17.5h16M9.5 14v-1a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1"/>'
  },
  'external-hard-drive': {
    label: 'External hard drive',
    paths: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M5 16.5h14M8 19h3"/><circle cx="16" cy="19" r="0.7" fill="currentColor" stroke="none"/>'
  },
  'sd-card': {
    label: 'SD card',
    paths: '<path d="M9 3h9a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"/><path d="M4 11h2v3H4M10 5.5v4M12.5 5.5v4M15 5.5v4M17.5 5.5v4"/>'
  },
  'wireless-charging-stand': {
    label: 'Wireless charging stand',
    paths: '<circle cx="12" cy="8" r="5.5"/><path d="M12 13.5V20M6 21h12M12.5 5l-2 3h3l-2 3"/>'
  },
  soundbar: {
    label: 'Soundbar',
    paths: '<rect x="2" y="9" width="20" height="6" rx="3"/><circle cx="7" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="17" cy="12" r="1" fill="currentColor" stroke="none"/>'
  },
  ssd: {
    label: 'SSD',
    paths: '<path d="M3 8h16v8H3a1 1 0 0 1-1-1v-1.5a1.5 1.5 0 0 0 0-3V9a1 1 0 0 1 1-1zM19 10h3v4h-3"/><rect x="6" y="10.5" width="3" height="3" rx="0.5"/><rect x="12" y="10.5" width="3" height="3" rx="0.5"/>'
  },
  projector: {
    label: 'Projector',
    paths: '<rect x="2.5" y="7" width="15" height="9" rx="1.5"/><circle cx="17.5" cy="11.5" r="2.5"/><path d="M20.5 8l3-2.5M20.5 15l3 2.5"/>'
  },
  controller: {
    label: 'Controller',
    paths: '<rect x="2.5" y="8" width="19" height="9" rx="4.5"/><path d="M7 10.5v3M5.5 12h3"/><circle cx="16" cy="10.8" r="0.9" fill="currentColor" stroke="none"/><circle cx="18" cy="12.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="14" cy="12.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="16" cy="14.2" r="0.9" fill="currentColor" stroke="none"/>'
  },
  console: {
    label: 'Console',
    paths: '<path d="M8 3h8l1.5 18h-11z"/><path d="M12.5 3L14 21M9 8h3.5"/><circle cx="10" cy="17.5" r="0.8" fill="currentColor" stroke="none"/>'
  },
  'handheld-console': {
    label: 'Handheld console',
    paths: '<rect x="2.5" y="6.5" width="19" height="11" rx="3"/><rect x="9" y="8.5" width="6" height="7" rx="1.2"/><path d="M5.5 11v2M4.5 12h2"/><circle cx="18.5" cy="10.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="18.5" cy="13.5" r="0.8" fill="currentColor" stroke="none"/>'
  },
  'vr-headset': {
    label: 'VR headset',
    paths: '<path d="M4 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a3 3 0 0 1-3 3h-1.5a1.5 1.5 0 0 1-1.4-1l-.5-1.3a1.5 1.5 0 0 0-2.8 0L10.4 16a1.5 1.5 0 0 1-1.4 1H7a3 3 0 0 1-3-3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="16.5" cy="11" r="1" fill="currentColor" stroke="none"/>'
  },
  'foldable-phone': {
    label: 'Foldable phone',
    paths: '<path d="M4.5 3.5H11v17H4.5A1.5 1.5 0 0 1 3 19V5a1.5 1.5 0 0 1 1.5-1.5zM13 3.5h6.5A1.5 1.5 0 0 1 21 5v14a1.5 1.5 0 0 1-1.5 1.5H13z"/><path d="M11 4.5v15M13 4.5v15"/><circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none"/>'
  },
  'gan-charger': {
    label: 'GaN charger',
    paths: '<path d="M9 5V2.5M15 5V2.5"/><rect x="6" y="5" width="12" height="16.5" rx="1.5"/><rect x="9.5" y="17.5" width="5" height="1.5" rx="0.75"/><path d="M12.5 8.5l-2 3h3l-2 3"/>'
  },
  'charging-station': {
    label: 'Charging station',
    paths: '<rect x="2.5" y="18.5" width="19" height="3" rx="1.5"/><rect x="3.5" y="3" width="8" height="13" rx="1.5"/><circle cx="17.5" cy="10.5" r="3"/><path d="M7.5 16v2.5M17.5 13.5v5"/><path d="M8 6l-2.5 4h2L7 13l2.5-4h-2z" fill="currentColor" stroke="none"/>'
  },
  'bluetooth-tracker': {
    label: 'Bluetooth tracker',
    paths: '<circle cx="12" cy="12" r="9"/><circle cx="16.5" cy="7.5" r="1"/><path d="M7 10l6 5-3.5 2.5v-10L13 10l-6 5"/>'
  },
  'streaming-stick': {
    label: 'Streaming stick',
    paths: '<rect x="6.5" y="9.5" width="11" height="12" rx="1.5"/><path d="M8.5 9.5V8L6.5 6V2.5h11V6l-2 2v1.5M10 5v1M14 5v1"/><path d="M10.5 14l4 2.5-4 2.5z" fill="currentColor" stroke="none"/>'
  },
  'video-doorbell': {
    label: 'Video doorbell',
    paths: '<rect x="7" y="2.5" width="10" height="19" rx="3"/><circle cx="12" cy="8" r="2.5"/><circle cx="12" cy="16.5" r="2"/><circle cx="12" cy="8" r="0.7" fill="currentColor" stroke="none"/>'
  },
  'smart-bulb': {
    label: 'Smart bulb',
    paths: '<path d="M7 8.5a5 5 0 1 1 10 0c0 2.2-1.1 3.5-2.2 4.7-.5.6-.8 1.2-.8 1.8h-4c0-.6-.3-1.2-.8-1.8C8.1 12 7 10.7 7 8.5zM10 18h4M10.5 20.5h3"/><path d="M9.2 8.2a4 4 0 0 1 5.6 0M10.6 9.8a2 2 0 0 1 2.8 0"/><circle cx="12" cy="11.5" r="0.7" fill="currentColor" stroke="none"/>'
  },
  'air-purifier': {
    label: 'Air purifier',
    paths: '<rect x="7" y="2.5" width="10" height="14" rx="5"/><rect x="10" y="5.5" width="4" height="8" rx="2"/><path d="M7 16.5V20a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 17 20v-3.5M10 18.5v1M14 18.5v1"/>'
  },
  'dash-camera': {
    label: 'Dash camera',
    paths: '<path d="M12 3v3M8.5 3h7"/><rect x="3" y="6" width="18" height="13" rx="1.5"/><circle cx="14.5" cy="12.5" r="3.5"/><path d="M14.5 9v7M11.5 10.8l6 3.4M17.5 10.8l-6 3.4"/><rect x="5.5" y="8.5" width="3.5" height="2.5" rx="0.8"/><circle cx="7.2" cy="15.5" r="0.7" fill="currentColor" stroke="none"/>'
  },
  'camera-gimbal': {
    label: 'Camera gimbal',
    paths: '<rect x="2.5" y="4" width="10" height="7" rx="1.5"/><circle cx="7.5" cy="7.5" r="2"/><path d="M12.5 7.5h2.5a2 2 0 0 1 2 2V13h-4v8.5M11 21.5h4"/><circle cx="17" cy="13" r="1.5"/>'
  },
  'audio-interface': {
    label: 'Audio interface',
    paths: '<rect x="2.5" y="5.5" width="19" height="13" rx="1.5"/><circle cx="7.5" cy="12" r="3.2"/><circle cx="7.5" cy="10.5" r="0.55" fill="currentColor" stroke="none"/><circle cx="6.3" cy="12.8" r="0.55" fill="currentColor" stroke="none"/><circle cx="8.7" cy="12.8" r="0.55" fill="currentColor" stroke="none"/><circle cx="16.5" cy="10" r="2.4"/><path d="M16.5 10l1.2-1.2M14.5 16v-1a2 2 0 0 1 4 0v1M14.5 16h1M17.5 16h1"/>'
  }
};

// <svg class="..." ...>{paths}</svg> for one icon, ready to inline. Consumers
// who want a plain string (innerHTML, dangerouslySetInnerHTML, etc.) can call
// this directly; consumers who want a DOM node can parse the result.
export function svg(name, { size = 24, className, strokeWidth = 1.6 } = {}) {
  const icon = icons[name];
  if (!icon) throw new Error(`gadget-icons: no icon named "${name}"`);
  const cls = className ? ` class="${className}"` : '';
  return `<svg${cls} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon.paths}</svg>`;
}

export const names = Object.keys(icons);
