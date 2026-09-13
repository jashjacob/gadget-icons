// Regenerates the derived artifacts from icons.mjs, the single source of
// truth: standalone SVG files, the README preview, and the gallery data.
// Run with `npm run build`.
import { mkdir, writeFile, readdir, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { icons, names } from '../icons.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const iconsDir = join(root, 'icons');
const galleryDir = join(root, 'docs');

async function writeIconFiles() {
  await mkdir(iconsDir, { recursive: true });

  // Clear stale files first so a renamed/removed icon doesn't leave an orphan
  // .svg behind that icons.mjs no longer knows about.
  const existing = await readdir(iconsDir).catch(() => []);
  await Promise.all(existing.filter((f) => f.endsWith('.svg'))
    .map((f) => unlink(join(iconsDir, f))));

  await Promise.all(names.map((name) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name].paths}</svg>\n`;
    return writeFile(join(iconsDir, `${name}.svg`), svg);
  }));
}

async function writeGalleryData() {
  await mkdir(galleryDir, { recursive: true });
  const data = Object.fromEntries(names.map((name) => [name, icons[name]]));
  const source = `// Generated from icons.mjs by npm run build. Do not edit directly.\nexport const icons = ${JSON.stringify(data, null, 2)};\nexport const names = ${JSON.stringify(names, null, 2)};\n`;
  await writeFile(join(galleryDir, 'icons-data.js'), source);
}

async function writeTypes() {
  const union = names.map((name) => `  | '${name}'`).join('\n');
  await writeFile(join(root, 'icons.d.mts'), `// Generated from icons.mjs by npm run build. Do not edit directly.
export type IconName =\n${union};
export interface IconDefinition { label: string; paths: string; }
export interface SvgOptions {
  size?: number;
  className?: string;
  strokeWidth?: number;
}
export declare const icons: Record<IconName, IconDefinition>;
export declare const names: IconName[];
export declare function svg(name: IconName, options?: SvgOptions): string;
`);
}

// A curated front row, not the whole set: a hero this size can hold about
// 6-9 icons before it stops reading as "a few strong examples" and starts
// reading as "an arbitrary slice of the grid below it." Picked for category
// spread (computing, mobile, imaging, audio, aerial, wearable, PC hardware,
// gaming) rather than any ranking. Every name here must exist in icons.mjs -
// the build throws if one doesn't, rather than silently dropping it.
const HERO_NAMES = ['laptop', 'phone', 'camera', 'headphones', 'drone', 'smartwatch', 'gpu', 'console'];

// Single-quoted family names, not double: this whole stack is embedded inside
// a double-quoted SVG attribute (font-family="${SANS}"), and an unescaped "
// inside that string breaks the attribute and the whole document with it.
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

// Warm-neutral palette so the card reads as one considered surface rather
// than default white-on-black. It's baked into the image (not currentColor)
// on purpose: a README preview is embedded as a flat <img>, which can't
// react to the surrounding page's light/dark theme, so the only way to stay
// legible in both is to carry an opaque background of its own rather than
// trying to blend into either.
const INK = '#171510';
const BODY = '#57544A';
const MUTED = '#8C8878';
const RULE = '#E6E1D3';
const PAPER = '#F8F5EE';

function iconGroup(name, x, y, size) {
  const scale = size / 24;
  return `<g transform="translate(${x}, ${y}) scale(${scale})" stroke="${INK}" fill="none" stroke-width="${1.6 / scale}" stroke-linecap="round" stroke-linejoin="round">${icons[name].paths.replace(/currentColor/g, INK)}</g>`;
}

// A showcase, not a catalogue scan: a titled hero strip of a few strong
// icons at real size, then the full set below at a plainer, smaller scale.
// No card chrome anywhere - alignment to one shared 8-column grid (both the
// hero row and the full collection use the same column width) does the
// organizing work instead, so nothing competes with the icons themselves.
async function writePreview() {
  const width = 960;
  const margin = 64;
  const contentW = width - margin * 2;
  const cols = 8;
  const colW = contentW / cols;

  let y = 0;
  const parts = [];

  // Hero: name, tagline, spec line.
  y += 74;
  parts.push(`<text x="${margin}" y="${y}" font-family="${SANS}" font-size="42" font-weight="700" letter-spacing="-0.02em" fill="${INK}">Gadget Icons</text>`);
  y += 34;
  parts.push(`<text x="${margin}" y="${y}" font-family="${SANS}" font-size="18" font-weight="400" fill="${BODY}">Icons for the devices we use every day.</text>`);
  y += 30;
  parts.push(`<text x="${margin}" y="${y}" font-family="${MONO}" font-size="11.5" font-weight="500" letter-spacing="0.08em" fill="${MUTED}">24PX GRID · 1.6PX STROKE · SVG · MIT LICENSED</text>`);

  y += 28;
  parts.push(`<line x1="${margin}" y1="${y}" x2="${width - margin}" y2="${y}" stroke="${RULE}" stroke-width="1"/>`);

  // Hero row: a few icons at real size, no per-item card.
  const heroIconSize = 40;
  const heroTop = y + 48;
  for (const [i, name] of HERO_NAMES.entries()) {
    if (!icons[name]) throw new Error(`preview: HERO_NAMES has unknown icon "${name}"`);
    const cx = margin + colW * i + colW / 2;
    parts.push(iconGroup(name, cx - heroIconSize / 2, heroTop, heroIconSize));
    parts.push(`<text x="${cx}" y="${heroTop + heroIconSize + 22}" text-anchor="middle" font-family="${SANS}" font-size="10" font-weight="600" letter-spacing="0.04em" fill="${MUTED}">${icons[name].label.toUpperCase()}</text>`);
  }
  y = heroTop + heroIconSize + 22 + 56;

  // Full collection: same 8-column rhythm, plainer and smaller.
  parts.push(`<text x="${margin}" y="${y}" font-family="${SANS}" font-size="11" font-weight="700" letter-spacing="0.12em" fill="${MUTED}">THE FULL COLLECTION · ${names.length} ICONS</text>`);
  y += 40;

  const gridIconSize = 28;
  const rowH = 92;
  const gridTop = y;
  const rows = Math.ceil(names.length / cols);
  names.forEach((name, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = margin + colW * col + colW / 2;
    const iconY = gridTop + row * rowH;
    parts.push(iconGroup(name, cx - gridIconSize / 2, iconY, gridIconSize));
    parts.push(`<text x="${cx}" y="${iconY + gridIconSize + 20}" text-anchor="middle" font-family="${SANS}" font-size="9.5" font-weight="600" letter-spacing="0.02em" fill="${MUTED}">${icons[name].label}</text>`);
  });
  const lastRowIconY = gridTop + (rows - 1) * rowH;
  const contentBottom = lastRowIconY + gridIconSize + 20 + 4; // + descender clearance

  const height = Math.round(contentBottom + 48);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${PAPER}"/>
${parts.join('\n')}
</svg>
`;
  await writeFile(join(root, 'preview.svg'), svg);
}

await writeIconFiles();
await writeGalleryData();
await writeTypes();
await writePreview();
console.log(`Wrote ${names.length} icon files, preview.svg, and docs/icons-data.js`);
