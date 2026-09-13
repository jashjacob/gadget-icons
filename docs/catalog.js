export const categories = {
  Computing: ['laptop', 'monitor', 'keyboard', 'mouse', 'mini-pc', 'nas', 'gpu', 'processor', 'motherboard', 'pc', 'ssd', 'external-hard-drive'],
  Cameras: ['camera', 'camera-lens', 'tripod', 'vlog-camera', 'action-camera', 'webcam', 'drone', 'sd-card'],
  Audio: ['headphones', 'microphone', 'earbuds', 'smart-speaker', 'soundbar'],
  'Mobile & wearables': ['phone', 'smartwatch', 'smart-glasses', 'smart-ring', 'tablet', 'e-reader'],
  'Smart home': ['tv', 'router', 'smart-display', 'security-camera', 'robot-vacuum', 'projector'],
  Gaming: ['controller', 'console', 'handheld-console', 'vr-headset'],
  Accessories: ['powerbank', 'charger', 'usb-cable', 'usb-hub', 'backpack', 'wireless-charging-stand']
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
