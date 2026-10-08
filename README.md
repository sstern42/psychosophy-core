# psychosophy-core

Psychosophy data and query library. Covers the four aspects (Will, Logic, Emotion, Physics), the four positions, all 24 types, and a description of how each aspect shows in each position, structured for use in any JavaScript project.

No dependencies. No build step. Works in Node.js 12+.

```bash
npm install psychosophy-core
```

> **Status: 0.1, draft.** The structure (aspects, positions, the 24 orders) is settled. The descriptions in `data/descriptions.json` are a first draft awaiting review, and the traditional type names are not included yet.

---

## Quick start

```js
const psychosophy = require('psychosophy-core');

// A type is its four aspects in order, first position to fourth
const t = psychosophy.getType('VLEF');
console.log(t.order);              // ['V', 'L', 'E', 'F']
console.log(t.positions.E);        // 3
console.log(t.aspects[2].strength); // 'Weak'

psychosophy.positionOf('FELV', 'Logic'); // 3
psychosophy.aspectAt('FELV', 1);         // 'F'

// How an aspect shows in a position
const d = psychosophy.getDescription('Emotion', 3);
console.log(d.summary); // 'Feels a lot but finds it hard to show.'

// Every type with Will first
psychosophy.getTypesWith('Will', 1).map(t => t.code); // six codes
```

---

## API at a glance

| Area | Functions |
|------|-----------|
| Aspects | `getAspect`, `getAllAspects` |
| Positions | `getPosition`, `getAllPositions` |
| Types | `getType`, `getAllTypes`, `positionOf`, `aspectAt`, `getTypesWith` |
| Descriptions | `getDescription` |
| Raw data | `data` (`aspects`, `positions`, `types`, `descriptions`), `ASPECT_CODES` |

---

## API

### Aspects

#### `getAspect(codeOrName)` → object
Accepts a code (`'V'`) or a name (`'Will'`). Case-insensitive.

```js
{
  code: 'V',
  name: 'Will',
  domain: 'Wants, decisions and personal power',
  description: 'What a person wants, how they make choices, and how firmly they stand behind those choices when other people are involved.'
}
```

| Code | Name | Domain |
|------|------|--------|
| V | Will | Wants, decisions and personal power |
| L | Logic | Thought, opinion and argument |
| E | Emotion | Feelings and their expression |
| F | Physics | The material and physical world |

#### `getAllAspects()` → object[]
The four aspects in V, L, E, F order.

### Positions

#### `getPosition(position)` → object
Accepts 1 to 4 (number or string).

```js
{
  position: 3,
  name: 'Third',
  strength: 'Weak',
  orientation: 'Result',
  summary: 'Sensitive and anxious. ...'
}
```

| Position | Strength | Orientation |
|----------|----------|-------------|
| 1 | Strong | Result |
| 2 | Strong | Process |
| 3 | Weak | Result |
| 4 | Weak | Process |

#### `getAllPositions()` → object[]
The four positions, first to fourth.

### Types

#### `getType(code)` → object
A type's code is its four aspect letters from first position to fourth, e.g. `'VLEF'`. Case-insensitive.

```js
{
  code: 'VLEF',
  order: ['V', 'L', 'E', 'F'],
  aspects: [
    { position: 1, aspect: 'V', name: 'Will',    strength: 'Strong', orientation: 'Result' },
    { position: 2, aspect: 'L', name: 'Logic',   strength: 'Strong', orientation: 'Process' },
    { position: 3, aspect: 'E', name: 'Emotion', strength: 'Weak',   orientation: 'Result' },
    { position: 4, aspect: 'F', name: 'Physics', strength: 'Weak',   orientation: 'Process' }
  ],
  positions: { V: 1, L: 2, E: 3, F: 4 }
}
```

The 24 types are every order of the four aspects, generated in code, so `data.types` and the descriptions can't disagree.

#### `getAllTypes()` → object[]
All 24 types.

#### `positionOf(type, aspect)` → number
The position (1 to 4) an aspect holds in a type.

#### `aspectAt(type, position)` → string
The aspect code a type holds at a position.

#### `getTypesWith(aspect, position)` → object[]
The six types with that aspect at that position.

### Descriptions

#### `getDescription(aspect, position)` → object
How an aspect shows in a position, written as observable behaviour.

```js
{
  aspect: 'E',
  position: 3,
  summary: 'Feels a lot but finds it hard to show.',
  behaviour: 'Feelings run deep, but expressing them feels exposed and awkward. ...',
  signs: ['Looks composed while churning inside', '...', '...']
}
```

All 16 are in `data/descriptions.json`, keyed by aspect and position (`'E3'`). They are original descriptions, and they stay off health, diet, weight and eating, which the tests check, so they can be used directly in a typing interview that never asks about those topics.

---

## Background

Psychosophy, also known as Psycho-Yoga, is a theory of personality developed by Alexander Afanasyev. It describes a person by the order in which they hold four aspects of life (will, logic, emotion and physics), from the one they're most confident in to the one they care least about. It is often used alongside socionics.

For socionics data in the same style, see [socionics-core](https://github.com/sstern42/socionics-core).

---

## Licence

MIT
