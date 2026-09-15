export const categories = {
  Computing: ['laptop', 'monitor', 'keyboard', 'mouse', 'mini-pc', 'nas', 'gpu', 'processor', 'motherboard', 'pc', 'ssd', 'external-hard-drive'],
  Cameras: ['camera', 'camera-lens', 'tripod', 'vlog-camera', 'action-camera', 'dash-camera', 'camera-gimbal', 'webcam', 'drone', 'sd-card'],
  Audio: ['headphones', 'microphone', 'earbuds', 'smart-speaker', 'soundbar', 'audio-interface'],
  'Mobile & wearables': ['phone', 'foldable-phone', 'smartwatch', 'smart-glasses', 'smart-ring', 'tablet', 'e-reader'],
  'Smart home': ['tv', 'streaming-stick', 'router', 'smart-display', 'security-camera', 'video-doorbell', 'smart-bulb', 'air-purifier', 'robot-vacuum', 'projector'],
  Gaming: ['controller', 'console', 'handheld-console', 'vr-headset'],
  Accessories: ['powerbank', 'charger', 'gan-charger', 'charging-station', 'bluetooth-tracker', 'usb-cable', 'usb-hub', 'backpack', 'wireless-charging-stand']
};

export const categoryFor = Object.fromEntries(Object.entries(categories).flatMap(
  ([category, names]) => names.map((name) => [name, category])
));

const aliases = {
  processor: 'cpu chip chipset', gpu: 'graphics video card', pc: 'desktop computer tower',
  laptop: 'notebook computer macbook', phone: 'smartphone mobile iphone android',
  'robot-vacuum': 'robot vacuum cleaner dock docking station cleaning',
  'smart-speaker': 'speaker grille grill assistant voice audio',
  'external-hard-drive': 'external hard disk hdd portable storage backup',
  'foldable-phone': 'folding mobile smartphone flip',
  'gan-charger': 'gallium nitride compact power adapter usb c',
  'charging-station': 'multi device dock phone watch wireless charger',
  'bluetooth-tracker': 'item finder tag locator airtag',
  'streaming-stick': 'tv dongle media player hdmi',
  'video-doorbell': 'door camera smart home bell security',
  'smart-bulb': 'connected light lamp home automation',
  'air-purifier': 'clean air filter appliance fan',
  'dash-camera': 'dashcam car camera vehicle recorder',
  'camera-gimbal': 'stabilizer handheld video camera rig',
  'audio-interface': 'sound card recording studio xlr usb',
  ssd: 'solid state drive storage', nas: 'network attached storage server',
  'sd-card': 'sd memory card storage photography',
  'wireless-charging-stand': 'wireless charger charging stand qi magsafe phone',
  powerbank: 'power bank battery portable charging',
  controller: 'gamepad joystick gaming', 'console': 'gaming playstation xbox',
  'handheld-console': 'portable gaming steam deck switch',
  'smartwatch': 'watch wearable fitness', 'earbuds': 'earphones wireless audio',
  'usb-hub': 'adapter dongle ports', 'camera-lens': 'photography lens',
  'e-reader': 'ereader kindle ebook books', 'tv': 'television screen',
  'router': 'wifi wi-fi network internet', 'vr-headset': 'virtual reality headset'
};

export function matchesSearch(name, label, query) {
  const normalize = (value) => value.toLowerCase().replace(/[-_]/g, ' ');
  const haystack = normalize(`${name} ${label} ${categoryFor[name]} ${aliases[name] || ''}`);
  return normalize(query).trim().split(/\s+/).every((word) => haystack.includes(word));
}

export function javascriptSnippet(name, size, stroke) {
  return `import { svg } from 'gadget-icons';\n\nconst icon = svg('${name}', { size: ${size}, strokeWidth: ${stroke} });`;
}

export function iconLink(base, name, size, stroke) {
  const url = new URL(base);
  url.hash = '';
  url.search = new URLSearchParams({ icon: name, size: String(size), stroke: String(stroke) });
  return url;
}
