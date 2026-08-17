const express = require('express');
const path = require('path');
const {
  FACTIONS, WARBONDS, primaries, secondaries, grenades,
  supportWeapons, orbitals, eagles, backpacks, vehicles, sentries,
  armors, helmets, capes
} = require('./data');

const app = express();
const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '127.0.0.1';

// ── Helpers ──────────────────────────────────────────────

function weightedRandom(items, faction) {
  const weights = { 3: 5, 2: 2, 1: 1 };
  const pool = [];
  for (const item of items) {
    const rating = item[faction] || 2;
    for (let i = 0; i < (weights[rating] || 1); i++) pool.push(item);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function pureRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pickUniqueWeighted(items, faction, count) {
  const picked = [];
  const available = [...items];
  for (let i = 0; i < count && available.length > 0; i++) {
    const choice = weightedRandom(available, faction);
    picked.push(choice);
    const idx = available.findIndex(x => x.name === choice.name);
    if (idx !== -1) available.splice(idx, 1);
  }
  return picked;
}

// Filter items by warbond set (items without warbond field always pass)
function filterByWarbonds(items, warbondSet) {
  if (!warbondSet) return items;
  return items.filter(i => !i.warbond || warbondSet.has(i.warbond));
}

// ── API ──────────────────────────────────────────────────

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/warbonds', (_req, res) => {
  res.json(WARBONDS);
});

app.get('/api/generate/:faction', (req, res) => {
  const f = req.params.faction.toLowerCase();
  if (!FACTIONS.includes(f)) {
    return res.status(400).json({ error: `Unknown faction. Use: ${FACTIONS.join(', ')}` });
  }

  // Parse warbond filter from query string
  let warbondSet = null;
  const rawWarbonds = req.query.warbonds;
  if (rawWarbonds !== undefined) {
    if (typeof rawWarbonds !== 'string' || rawWarbonds.length > 2048) {
      return res.status(400).json({ error: 'warbonds must be a comma-separated string' });
    }
    const requestedWarbonds = rawWarbonds.split(',').map(w => w.trim()).filter(Boolean);
    const unknownWarbonds = requestedWarbonds.filter(w => !WARBONDS.includes(w));
    if (unknownWarbonds.length > 0) {
      return res.status(400).json({ error: `Unknown warbond: ${unknownWarbonds.join(', ')}` });
    }
    // Base Game equipment is always available, even when no premium warbond is selected.
    warbondSet = new Set(['Base Game', ...requestedWarbonds]);
  }

  // Filter pools
  const fprimaries = filterByWarbonds(primaries, warbondSet);
  const fsecondaries = filterByWarbonds(secondaries, warbondSet);
  const fgrenades = filterByWarbonds(grenades, warbondSet);
  const farmors = filterByWarbonds(armors, warbondSet);
  const fhelmets = filterByWarbonds(helmets, warbondSet);
  const fcapes = filterByWarbonds(capes, warbondSet);

  const primary = weightedRandom(fprimaries, f);
  const secondary = weightedRandom(fsecondaries, f);
  const grenade = weightedRandom(fgrenades, f);

  // ── Stratagem slot logic (some stratagems are warbond-gated) ──
  const fweapons = filterByWarbonds(supportWeapons, warbondSet);
  const fbackpacks = filterByWarbonds(backpacks, warbondSet);

  const weapon = weightedRandom(fweapons, f);

  let backpack = null;
  let extraStrike = null;
  const strikePoolRaw = [...orbitals, ...eagles, ...sentries];
  const fstrikes = filterByWarbonds(strikePoolRaw, warbondSet);
  const strikePoolFiltered = fstrikes;

  if (weapon.hasBackpack) {
    extraStrike = weightedRandom(strikePoolFiltered, f);
  } else {
    backpack = weightedRandom(fbackpacks, f);
  }

  const availableStrikes = extraStrike
    ? strikePoolFiltered.filter(s => s.name !== extraStrike.name)
    : [...strikePoolFiltered];
  // Max 4 stratagems per mission: weapon + backpack/extraStrike + strikes + vehicle = 4
  const strikes = pickUniqueWeighted(availableStrikes, f, 1);

  const fvehicles = filterByWarbonds(vehicles, warbondSet);
  const vehicle = weightedRandom(fvehicles, f);

  const strats = [];
  strats.push({ ...weapon, slotType: 'Support Weapon' });
  if (backpack) strats.push({ ...backpack, slotType: 'Backpack' });
  if (extraStrike) strats.push({ ...extraStrike, slotType: 'Strike' });
  strikes.forEach(s => strats.push({ ...s, slotType: 'Strike' }));
  strats.push({ ...vehicle, slotType: 'Vehicle' });

  // Cosmetics — pure random, filtered by warbond
  const armor = pureRandom(farmors);
  const helmet = pureRandom(fhelmets);
  const cape = pureRandom(fcapes);

  res.json({
    faction: f,
    primary, secondary, grenade,
    stratagems: strats,
    armor, helmet, cape
  });
});

app.get('/api/names', (_req, res) => {
  const pick = arr => arr.map(x => ({ name: x.name, warbond: x.warbond || 'Base Game' }));
  res.json({
    primary: pick(primaries),
    secondary: pick(secondaries),
    grenade: pick(grenades),
    strat: [
      ...pick(supportWeapons),
      ...pick(orbitals),
      ...pick(eagles),
      ...pick(backpacks),
      ...pick(vehicles),
      ...pick(sentries),
    ],
    armor: armors.map(x => ({ name: x.name, warbond: x.passive || 'Base Game' })),
    helmet: pick(helmets),
    cape: pick(capes),
  });
});

app.get('/api/factions', (_req, res) => {
  res.json(FACTIONS);
});

app.listen(PORT, HOST, () => {
  console.log(`🦅 Helldivers 2 Loadout Generator running at http://${HOST}:${PORT}`);
});
