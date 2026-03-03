// Client-side loadout generation (replaces server.js API endpoints)

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

function filterByWarbonds(items, warbondSet) {
  if (!warbondSet) return items;
  return items.filter(i => !i.warbond || warbondSet.has(i.warbond));
}

function generateLoadout(faction, warbondSet) {
  const f = faction.toLowerCase();
  if (!FACTIONS.includes(f)) {
    return { error: `Unknown faction. Use: ${FACTIONS.join(', ')}` };
  }

  // Convert array/Set to Set if needed
  let wbSet = null;
  if (warbondSet && warbondSet.size > 0) {
    wbSet = (warbondSet instanceof Set) ? warbondSet : new Set(warbondSet);
  }

  const fprimaries = filterByWarbonds(primaries, wbSet);
  const fsecondaries = filterByWarbonds(secondaries, wbSet);
  const fgrenades = filterByWarbonds(grenades, wbSet);
  const farmors = filterByWarbonds(armors, wbSet);
  const fhelmets = filterByWarbonds(helmets, wbSet);
  const fcapes = filterByWarbonds(capes, wbSet);

  const primary = weightedRandom(fprimaries.length ? fprimaries : primaries, f);
  const secondary = weightedRandom(fsecondaries.length ? fsecondaries : secondaries, f);
  const grenade = weightedRandom(fgrenades.length ? fgrenades : grenades, f);

  const fweapons = filterByWarbonds(supportWeapons, wbSet);
  const fbackpacks = filterByWarbonds(backpacks, wbSet);

  const weapon = weightedRandom(fweapons.length ? fweapons : supportWeapons, f);

  let backpack = null;
  let extraStrike = null;
  const strikePoolRaw = [...orbitals, ...eagles, ...sentries];
  const fstrikes = filterByWarbonds(strikePoolRaw, wbSet);
  const strikePoolFiltered = fstrikes.length ? fstrikes : strikePoolRaw;

  if (weapon.hasBackpack) {
    extraStrike = weightedRandom(strikePoolFiltered, f);
  } else {
    backpack = weightedRandom(fbackpacks.length ? fbackpacks : backpacks, f);
  }

  const availableStrikes = extraStrike
    ? strikePoolFiltered.filter(s => s.name !== extraStrike.name)
    : [...strikePoolFiltered];
  const strikes = pickUniqueWeighted(availableStrikes, f, 1);

  const fvehicles = filterByWarbonds(vehicles, wbSet);
  const vehicle = weightedRandom(fvehicles.length ? fvehicles : vehicles, f);

  const strats = [];
  strats.push({ ...weapon, slotType: 'Support Weapon' });
  if (backpack) strats.push({ ...backpack, slotType: 'Backpack' });
  if (extraStrike) strats.push({ ...extraStrike, slotType: 'Strike' });
  strikes.forEach(s => strats.push({ ...s, slotType: 'Strike' }));
  strats.push({ ...vehicle, slotType: 'Vehicle' });

  const armor = pureRandom(farmors.length ? farmors : armors);
  const helmet = pureRandom(fhelmets.length ? fhelmets : helmets);
  const cape = pureRandom(fcapes.length ? fcapes : capes);

  return {
    faction: f,
    primary, secondary, grenade,
    stratagems: strats,
    armor, helmet, cape
  };
}

function getNames() {
  const pick = arr => arr.map(x => ({ name: x.name, warbond: x.warbond || 'Base Game' }));
  return {
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
  };
}

function getWarbonds() {
  return WARBONDS;
}

function getFactions() {
  return FACTIONS;
}
