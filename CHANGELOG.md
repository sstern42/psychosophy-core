# Changelog

## 0.2.0

Revised against published accounts of Afanasyev's theory (the Psychosophy Library's pages on the aspects and the four functions, and an English reinterpretation of the theory).

- **Fixed: orientation.** Positions 1 and 4 are result-oriented and 2 and 3 are process-oriented. 0.1 had 3 as result and 4 as process.
- **Added: `exchange`** on each position and each type's aspects: Monologue for positions 1 and 4, Dialogue for 2 and 3.
- **Position summaries:** the first position is rigid and gives only from surplus (0.1 said it gives freely); the third is process-driven, testing itself and hiding behind a protective manner; the fourth is indifferent to judgement as well as receptive, and switches off under pressure.
- **Aspects:** Will now includes self-worth, perseverance and standing among others; Emotion includes reading feelings and artistic taste; Physics includes activity, appearance, physical strength, territory and general optimism. Health stays out of the descriptions on purpose.
- **Descriptions:** V1, E1 and F1 no longer describe giving care to others, which belongs to the second position; F1 trusts personal experience and defends its ground. V3, L3, E3 and F3 gain each aspect's characteristic fear and cover (humiliation and clowning, incompetence and scepticism, emotional scenes and irony, physical confrontation and prudishness) and the third position's self-testing. E4 now picks up other people's moods (0.1 said it was not much moved by them). L4 can be loose and playful in discussion. The second-position descriptions gain the care they offer others.

## 0.1.0

- First release, draft: the four aspects, the four positions (strength and orientation), all 24 types generated from the orders of the aspects, and query functions (`getAspect`, `getPosition`, `getType`, `positionOf`, `aspectAt`, `getTypesWith`, `getDescription`).
- `data/descriptions.json`: original descriptions of each aspect in each position (summary, behaviour, three observable signs), marked as a draft for review. The tests check they avoid em dashes and stay off health, diet, weight and eating.
- Traditional type names are not included yet.
