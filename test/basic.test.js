// basic.test.js: smoke tests, no test framework required
// Run with: node test/basic.test.js

'use strict';

const p = require('../index.js');

let passed = 0;
let failed = 0;

function assert(label, condition) {
  if (condition) {
    console.log(`  ✓  ${label}`);
    passed++;
  } else {
    console.error(`  ✗  ${label}`);
    failed++;
  }
}

function throws(fn) {
  try { fn(); return false; } catch (e) { return true; }
}

function section(name) {
  console.log(`\n${name}`);
}

// ─── Aspects ─────────────────────────────────────────────────────────────────
section('Aspects');
assert('four aspects',                      p.getAllAspects().length === 4);
assert('order is V, L, E, F',               p.getAllAspects().map(a => a.code).join('') === 'VLEF');
assert('by code',                           p.getAspect('V').name === 'Will');
assert('by name, case-insensitive',         p.getAspect('physics').code === 'F');
assert('lower-case code',                   p.getAspect('e').name === 'Emotion');
assert('unknown aspect throws',             throws(() => p.getAspect('X')));

// ─── Positions ───────────────────────────────────────────────────────────────
section('Positions');
assert('four positions',                    p.getAllPositions().length === 4);
assert('1 and 2 are strong',                p.getPosition(1).strength === 'Strong' && p.getPosition('2').strength === 'Strong');
assert('3 and 4 are weak',                  p.getPosition(3).strength === 'Weak' && p.getPosition(4).strength === 'Weak');
assert('1 and 3 are result',                p.getPosition(1).orientation === 'Result' && p.getPosition(3).orientation === 'Result');
assert('2 and 4 are process',               p.getPosition(2).orientation === 'Process' && p.getPosition(4).orientation === 'Process');
assert('each strength/orientation pair is unique',
  new Set(p.getAllPositions().map(x => x.strength + x.orientation)).size === 4);
assert('unknown position throws',           throws(() => p.getPosition(5)));

// ─── Types ───────────────────────────────────────────────────────────────────
section('Types');
const all = p.getAllTypes();
assert('24 types',                          all.length === 24);
assert('codes are unique',                  new Set(all.map(t => t.code)).size === 24);
assert('every code uses each aspect once',  all.every(t => [...t.code].sort().join('') === 'EFLV'));
const vlef = p.getType('vlef');
assert('getType is case-insensitive',       vlef.code === 'VLEF');
assert('order matches code',                vlef.order.join('') === 'VLEF');
assert('aspects carry position attributes', vlef.aspects[2].aspect === 'E' && vlef.aspects[2].strength === 'Weak' && vlef.aspects[2].orientation === 'Result');
assert('positions map',                     vlef.positions.V === 1 && vlef.positions.F === 4);
assert('positionOf',                        p.positionOf('FELV', 'Logic') === 3);
assert('aspectAt',                          p.aspectAt('FELV', 1) === 'F');
assert('positionOf and aspectAt agree for every type',
  all.every(t => [1, 2, 3, 4].every(n => p.positionOf(t.code, p.aspectAt(t.code, n)) === n)));
assert('six types per aspect per position', p.getTypesWith('Will', 1).length === 6 && p.getTypesWith('E', 4).length === 6);
assert('unknown type throws',               throws(() => p.getType('VVLE')));

// ─── Descriptions ────────────────────────────────────────────────────────────
section('Descriptions');
const keys = Object.keys(p.data.descriptions.descriptions);
assert('16 descriptions',                   keys.length === 16);
assert('one for every aspect and position', p.ASPECT_CODES.every(a => [1, 2, 3, 4].every(n => keys.includes(a + n))));
const d = p.getDescription('Emotion', 3);
assert('getDescription by name and number', d.aspect === 'E' && d.position === 3 && typeof d.summary === 'string');
assert('every description has summary, behaviour and three signs',
  keys.every(k => {
    const x = p.data.descriptions.descriptions[k];
    return x.summary && x.behaviour && Array.isArray(x.signs) && x.signs.length === 3;
  }));
assert('no em dashes in any description',   !JSON.stringify(p.data.descriptions).includes('—'));
// The typing interview never asks about or records health, diet, weight or
// eating, so the descriptions it reads stay off those topics too.
const excluded = /\b(health|diet|weight|eat|eating|ate|food|meals?|illness|medical)\b/i;
assert('descriptions stay off health, diet, weight and eating',
  keys.every(k => !excluded.test(JSON.stringify(p.data.descriptions.descriptions[k]))));

// ─── Summary ─────────────────────────────────────────────────────────────────
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
