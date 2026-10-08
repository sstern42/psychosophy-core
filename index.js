'use strict';

const aspectsData      = require('./data/aspects.json');
const positionsData    = require('./data/positions.json');
const descriptionsData = require('./data/descriptions.json');

const ASPECT_CODES = ['V', 'L', 'E', 'F'];

// ─── Internal helpers ────────────────────────────────────────────────────────

function permutations(items) {
  if (items.length <= 1) return [items.slice()];
  const out = [];
  items.forEach((item, i) => {
    const rest = items.slice(0, i).concat(items.slice(i + 1));
    permutations(rest).forEach(p => out.push([item].concat(p)));
  });
  return out;
}

function buildType(order) {
  const code = order.join('');
  return {
    code,
    order: order.slice(),
    aspects: order.map((aspect, i) => {
      const pos = positionsData[String(i + 1)];
      return { position: i + 1, aspect, name: aspectsData[aspect].name, strength: pos.strength, orientation: pos.orientation };
    }),
    positions: order.reduce((acc, aspect, i) => { acc[aspect] = i + 1; return acc; }, {})
  };
}

// All 24 orders of the four aspects, in a fixed order (V, L, E, F first).
const typesData = permutations(ASPECT_CODES).reduce((acc, order) => {
  const t = buildType(order);
  acc[t.code] = t;
  return acc;
}, {});

function normaliseCode(code) {
  return String(code).toUpperCase().trim();
}

function assertAspect(codeOrName) {
  const s = String(codeOrName).trim();
  const byCode = aspectsData[s.toUpperCase()];
  if (byCode) return byCode.code;
  const byName = Object.values(aspectsData).find(a => a.name.toLowerCase() === s.toLowerCase());
  if (byName) return byName.code;
  throw new Error(`Unknown psychosophy aspect: "${codeOrName}". Valid codes: ${ASPECT_CODES.join(', ')}`);
}

function assertPosition(position) {
  const n = Number(position);
  if (!positionsData[String(n)]) throw new Error(`Unknown position: "${position}". Valid positions: 1, 2, 3, 4`);
  return n;
}

// ─── Aspects ─────────────────────────────────────────────────────────────────

/**
 * Returns an aspect by code ('V') or name ('Will'). Case-insensitive.
 * @param {string} codeOrName
 * @returns {object}
 */
function getAspect(codeOrName) {
  return aspectsData[assertAspect(codeOrName)];
}

/** @returns {object[]} the four aspects, in V, L, E, F order */
function getAllAspects() {
  return ASPECT_CODES.map(c => aspectsData[c]);
}

// ─── Positions ───────────────────────────────────────────────────────────────

/**
 * Returns a position (1 to 4) with its strength and orientation.
 * @param {number|string} position
 * @returns {object}
 */
function getPosition(position) {
  return positionsData[String(assertPosition(position))];
}

/** @returns {object[]} the four positions, first to fourth */
function getAllPositions() {
  return [1, 2, 3, 4].map(n => positionsData[String(n)]);
}

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * Returns a type by its code: the four aspect letters from first to fourth
 * position, e.g. 'VLEF'. Case-insensitive.
 * @param {string} code
 * @returns {object}
 */
function getType(code) {
  const c = normaliseCode(code);
  if (!typesData[c]) throw new Error(`Unknown psychosophy type: "${code}". A type is the four letters ${ASPECT_CODES.join(', ')} in order, e.g. VLEF`);
  return typesData[c];
}

/** @returns {object[]} all 24 types */
function getAllTypes() {
  return Object.values(typesData);
}

/**
 * The position (1 to 4) an aspect holds in a type.
 * @param {string} type - e.g. 'VLEF'
 * @param {string} aspect - code or name
 * @returns {number}
 */
function positionOf(type, aspect) {
  return getType(type).positions[assertAspect(aspect)];
}

/**
 * The aspect code a type holds at a position.
 * @param {string} type - e.g. 'VLEF'
 * @param {number|string} position - 1 to 4
 * @returns {string}
 */
function aspectAt(type, position) {
  return getType(type).order[assertPosition(position) - 1];
}

/**
 * Types with a given aspect at a given position, e.g. every type with Will first.
 * @param {string} aspect - code or name
 * @param {number|string} position - 1 to 4
 * @returns {object[]}
 */
function getTypesWith(aspect, position) {
  const a = assertAspect(aspect);
  const p = assertPosition(position);
  return getAllTypes().filter(t => t.positions[a] === p);
}

// ─── Descriptions ────────────────────────────────────────────────────────────

/**
 * How an aspect shows in a position, as observable behaviour.
 * @param {string} aspect - code or name
 * @param {number|string} position - 1 to 4
 * @returns {{ aspect: string, position: number, summary: string, behaviour: string, signs: string[] }}
 */
function getDescription(aspect, position) {
  const a = assertAspect(aspect);
  const p = assertPosition(position);
  return Object.assign({ aspect: a, position: p }, descriptionsData.descriptions[a + p]);
}

module.exports = {
  getAspect, getAllAspects,
  getPosition, getAllPositions,
  getType, getAllTypes, positionOf, aspectAt, getTypesWith,
  getDescription,
  ASPECT_CODES,
  data: {
    aspects: aspectsData,
    positions: positionsData,
    types: typesData,
    descriptions: descriptionsData
  }
};
