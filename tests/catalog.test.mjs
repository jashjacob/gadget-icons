import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { svg, names } from '../icons.mjs';
import { categories, matchesSearch, javascriptSnippet, iconLink } from '../docs/catalog.js';

test('existing icons remain available and every icon has exactly one category', () => {
  const categorized = Object.values(categories).flat();
  assert.deepEqual([...categorized].sort(), [...names].sort());
  assert.equal(names.length, 58);
  for (const name of ['robot-vacuum', 'smart-speaker', 'console', 'motherboard']) assert.ok(svg(name));
});

test('search understands familiar terms and multiple words', () => {
  for (const [name, query] of [['processor', 'CPU'], ['external-hard-drive', 'hard disk'], ['sd-card', 'memory card'], ['controller', 'gaming'], ['robot-vacuum', 'vacuum dock'], ['wireless-charging-stand', 'wireless charger']]) {
    assert.ok(matchesSearch(name, name, query), `${query} should find ${name}`);
  }
  assert.equal(matchesSearch('camera', 'Camera', 'vacuum'), false);
});

test('copied JavaScript is executable and respects export settings', async () => {
  const snippet = javascriptSnippet('sd-card', 32, 2);
  assert.ok(snippet.startsWith("import { svg } from 'gadget-icons';"));
  const code = snippet.replace("import { svg } from 'gadget-icons';", '');
  const result = new Function('svg', `${code}\nreturn icon;`)(svg);
  assert.match(result, /width="32" height="32"/);
  assert.match(result, /stroke-width="2"/);
});

test('shared links round trip the selected icon and settings under the Pages path', () => {
  const url = iconLink('https://jashjacob.github.io/gadget-icons/?old=1#library', 'sd-card', 32, 2);
  assert.equal(url.pathname, '/gadget-icons/');
  assert.equal(url.hash, '');
  assert.equal(url.searchParams.get('icon'), 'sd-card');
  assert.equal(url.searchParams.get('size'), '32');
  assert.equal(url.searchParams.get('stroke'), '2');
});

test('generated declarations stay in sync with the icon source', async () => {
  const declarations = await readFile(new URL('../icons.d.mts', import.meta.url), 'utf8');
  const declaredNames = [...declarations.matchAll(/\| '([^']+)'/g)].map((match) => match[1]);
  assert.deepEqual(declaredNames, names);
});
