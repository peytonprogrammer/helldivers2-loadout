#!/usr/bin/env node

const {
  FACTIONS, primaries, secondaries, grenades,
  supportWeapons, orbitals, eagles, backpacks, vehicles, sentries,
  armors, helmets, capes
} = require('./data');

const stratagems = [
  ...supportWeapons.map(item => ({ ...item, category: 'Support Weapon' })),
  ...orbitals.map(item => ({ ...item, category: 'Orbital' })),
  ...eagles.map(item => ({ ...item, category: 'Eagle' })),
  ...backpacks.map(item => ({ ...item, category: 'Backpack' })),
  ...vehicles.map(item => ({ ...item, category: 'Vehicle' })),
  ...sentries.map(item => ({ ...item, category: 'Sentry' })),
];

// ── Helpers ──────────────────────────────────────────────

function weightedRandom(items, faction) {
  // Build weighted pool: rating 3 = 5 entries, 2 = 2 entries, 1 = 1 entry
  const weights = { 3: 5, 2: 2, 1: 1 };
  const pool = [];
  for (const item of items) {
    const rating = item[faction] || 1;
    const count = weights[rating] || 1;
    for (let i = 0; i < count; i++) pool.push(item);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickUnique(items, faction, count) {
  const picked = [];
  const available = [...items];
  for (let i = 0; i < count && available.length > 0; i++) {
    const choice = weightedRandom(available, faction);
    picked.push(choice);
    // Remove all instances of this item
    const idx = available.findIndex(x => x.name === choice.name);
    if (idx !== -1) available.splice(idx, 1);
  }
  return picked;
}

function ratingStars(rating) {
  return '★'.repeat(rating) + '☆'.repeat(3 - rating);
}

// ── Main ─────────────────────────────────────────────────

function generateLoadout(faction) {
  const f = faction.toLowerCase();
  if (!FACTIONS.includes(f)) {
    console.error(`\n  Unknown faction: "${faction}"`);
    console.error(`  Valid factions: ${FACTIONS.join(', ')}\n`);
    process.exit(1);
  }

  const primary = weightedRandom(primaries, f);
  const secondary = weightedRandom(secondaries, f);
  const grenade = weightedRandom(grenades, f);

  // Pick 4 stratagems, avoiding duplicates
  // Ensure at least one support weapon if possible
  const supportWeapons = stratagems.filter(s => s.category === 'Support Weapon');
  const otherStrats = stratagems.filter(s => s.category !== 'Support Weapon' && s.category !== 'Mission');

  const strats = [];
  // First pick: support weapon
  strats.push(weightedRandom(supportWeapons, f));
  // Remaining 3 from everything else (no dupes)
  const remainingPool = [...otherStrats, ...supportWeapons.filter(s => s.name !== strats[0].name)];
  const remaining = pickUnique(remainingPool, f, 3);
  strats.push(...remaining);

  const armor = weightedRandom(armors, f);
  const helmet = weightedRandom(helmets, f);
  const cape = weightedRandom(capes, f);

  // ── Display ──
  const factionEmoji = {
    terminids: '🐛',
    automatons: '🤖',
    illuminate: '👾'
  };

  console.log(`
╔══════════════════════════════════════════════════════╗
║     HELLDIVERS 2 LOADOUT GENERATOR  ⬇️  🦅           ║
╠══════════════════════════════════════════════════════╣
║  Faction: ${(factionEmoji[f] + ' ' + f.toUpperCase()).padEnd(41)}║
╚══════════════════════════════════════════════════════╝
`);

  console.log(`  🔫 PRIMARY:    ${primary.name}`);
  console.log(`                 ${primary.type} | Effectiveness: ${ratingStars(primary[f])}`);
  console.log();
  console.log(`  🔫 SECONDARY:  ${secondary.name}`);
  console.log(`                 ${secondary.type} | Effectiveness: ${ratingStars(secondary[f])}`);
  console.log();
  console.log(`  💣 GRENADE:    ${grenade.name}`);
  console.log(`                 ${grenade.type} | Effectiveness: ${ratingStars(grenade[f])}`);
  console.log();
  console.log(`  📡 STRATAGEMS:`);
  for (let i = 0; i < strats.length; i++) {
    const s = strats[i];
    console.log(`     ${i + 1}. ${s.name}`);
    console.log(`        ${s.category} | Effectiveness: ${ratingStars(s[f])}`);
  }
  console.log();
  console.log(`  🛡️  ARMOR:     ${armor.name}`);
  console.log(`                 ${armor.weight} | ${armor.passive}`);
  console.log();
  console.log(`  ⛑️  HELMET:    ${helmet.name}`);
  console.log();
  console.log(`  🦸 CAPE:       ${cape.name}`);
  console.log();
  console.log(`  ─────────────────────────────────────────────`);
  console.log(`  For Super Earth! 🌍 Democracy never sleeps!`);
  console.log();
}

// ── CLI ──────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
  Helldivers 2 Loadout Generator
  ──────────────────────────────
  Usage: node index.js <faction>

  Factions:
    terminids    🐛  Bug enemies
    automatons   🤖  Robot enemies
    illuminate   👾  Alien enemies

  Example:
    node index.js terminids
    node index.js automatons
    node index.js illuminate
  `);
  process.exit(0);
}

generateLoadout(args[0]);
