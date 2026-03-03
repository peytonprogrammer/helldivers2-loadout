// Helldivers 2 Equipment Data — sourced from helldivers.wiki.gg
// AP = Armor Penetration level from wiki
// Faction ratings: 1 = meh, 2 = solid, 3 = excellent
// Warbond assignments: best effort — tweak if wrong!
//
// RULES (from Peyton):
// Terminids: incendiary/fire weapons, laser weapons, caustic (except Sterilizer) → 3
// Automatons: medium pen or higher primary (AP 3+), heavy stratagems (AP 4+) → 3
// Illuminate: arc-based, shields, energy/plasma weapons → 3

const FACTIONS = ['terminids', 'automatons', 'illuminate'];

const WARBONDS = [
  'Base Game',
  'Helldivers Mobilize',
  'Steeled Veterans',
  'Cutting Edge',
  'Democratic Detonation',
  'Polar Patriots',
  'Viper Commandos',
  "Freedom's Flame",
  'Chemical Agents',
  'Truth Enforcers',
  'Urban Legends',
  'Servants of Freedom',
  'Borderline Justice',
  'Masters of Ceremony',
  'Force of Law',
  'Control Group',
  'Dust Devils',
  'Python Commandos',
  'Redacted Regiment',
  'Siege Breakers',
  'Halo',  // Halo collab
  'Killzone 2',  // Legendary
  'Deluxe Edition',
];

// ══════════════════════════════════════════════════════════
// PRIMARIES
// ══════════════════════════════════════════════════════════
const primaries = [
  // Assault Rifles
  { name: 'AR-23 Liberator', type: 'Assault Rifle', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'AR-23P Liberator Penetrator', type: 'Assault Rifle', ap: 3, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Steeled Veterans' },
  { name: 'AR-23C Liberator Concussive', type: 'Assault Rifle', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'AR-23A Liberator Carbine', type: 'Assault Rifle', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Viper Commandos' },
  { name: 'AR-61 Tenderizer', type: 'Assault Rifle', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Polar Patriots' },
  { name: 'StA-52 Assault Rifle', type: 'Assault Rifle', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Killzone 2' },
  { name: 'AR-32 Pacifier', type: 'Assault Rifle', ap: 3, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Force of Law' },
  { name: 'AR-2 Coyote', type: 'Assault Rifle', ap: 3, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Dust Devils' },
  { name: 'MA5C Assault Rifle', type: 'Assault Rifle', ap: 3, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Halo' },
  { name: 'BR-14 Adjudicator', type: 'Battle Rifle', ap: 3, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Democratic Detonation' },
  { name: 'AR/GL-21 One-Two', type: 'Assault Rifle/GL', ap: 3, terminids: 2, automatons: 3, illuminate: 2, warbond: 'Python Commandos' },
  { name: 'AR-59 Suppressor', type: 'Assault Rifle', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Redacted Regiment' },

  // Marksman Rifles
  { name: 'R-2 Amendment', type: 'Marksman Rifle', ap: 2, terminids: 1, automatons: 1, illuminate: 1, warbond: 'Masters of Ceremony' },
  { name: 'R-2124 Constitution', type: 'Marksman Rifle', ap: 3, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Helldivers Mobilize' },
  { name: 'R-6 Deadeye', type: 'Marksman Rifle', ap: 3, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Urban Legends' },
  { name: 'R-63 Diligence', type: 'Marksman Rifle', ap: 2, terminids: 1, automatons: 1, illuminate: 1, warbond: 'Helldivers Mobilize' },
  { name: 'R-63CS Diligence Counter Sniper', type: 'Marksman Rifle', ap: 3, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Helldivers Mobilize' },
  { name: 'R-72 Censor', type: 'Marksman Rifle', ap: 2, terminids: 1, automatons: 1, illuminate: 1, warbond: 'Redacted Regiment' },

  // SMGs
  { name: 'MP-98 Knight', type: 'SMG', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Deluxe Edition' },
  { name: 'StA-11 SMG', type: 'SMG', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Killzone 2' },
  { name: 'M7S SMG', type: 'SMG', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Halo' },
  { name: 'SMG-32 Reprimand', type: 'SMG', ap: 3, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Truth Enforcers' },
  { name: 'SMG-37 Defender', type: 'SMG', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'SMG-72 Pummeler', type: 'SMG', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Polar Patriots' },

  // Shotguns
  { name: 'SG-8 Punisher', type: 'Shotgun', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Helldivers Mobilize' },
  { name: 'SG-8S Slugger', type: 'Shotgun', ap: 3, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Helldivers Mobilize' },
  { name: 'SG-20 Halt', type: 'Shotgun', ap: 3, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Truth Enforcers' },
  { name: 'SG-451 Cookout', type: 'Shotgun', ap: 2, terminids: 3, automatons: 1, illuminate: 1, warbond: "Freedom's Flame" },  // incendiary
  { name: 'DBS-2 Double Freedom', type: 'Shotgun', ap: 3, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Python Commandos' },
  { name: 'M90A Shotgun', type: 'Shotgun', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Halo' },
  { name: 'SG-225 Breaker', type: 'Shotgun', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Helldivers Mobilize' },
  { name: 'SG-225SP Breaker Spray&Pray', type: 'Shotgun', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Helldivers Mobilize' },
  { name: 'SG-225IE Breaker Incendiary', type: 'Shotgun', ap: 2, terminids: 3, automatons: 1, illuminate: 1, warbond: "Freedom's Flame" },  // incendiary

  // Explosive
  { name: 'CB-9 Exploding Crossbow', type: 'Explosive', ap: 3, terminids: 2, automatons: 2, illuminate: 2, warbond: 'Democratic Detonation' },
  { name: 'R-36 Eruptor', type: 'Explosive', ap: 4, terminids: 2, automatons: 3, illuminate: 2, warbond: 'Democratic Detonation' },

  // Energy / Laser / Plasma / Arc
  { name: 'SG-8P Punisher Plasma', type: 'Energy', ap: 3, terminids: 2, automatons: 2, illuminate: 3, warbond: 'Cutting Edge' },
  { name: 'PLAS-39 Accelerator Rifle', type: 'Energy', ap: 3, terminids: 2, automatons: 2, illuminate: 3, warbond: 'Killzone 2' },
  { name: 'ARC-12 Blitzer', type: 'Energy', ap: 3, terminids: 2, automatons: 1, illuminate: 3, warbond: 'Cutting Edge' },
  { name: 'LAS-5 Scythe', type: 'Energy', ap: 2, terminids: 3, automatons: 1, illuminate: 2, warbond: 'Helldivers Mobilize' },
  { name: 'LAS-16 Sickle', type: 'Energy', ap: 2, terminids: 3, automatons: 1, illuminate: 2, warbond: 'Cutting Edge' },
  { name: 'LAS-17 Double-Edge Sickle', type: 'Energy', ap: 4, terminids: 3, automatons: 3, illuminate: 3, warbond: 'Servants of Freedom' },
  { name: 'PLAS-1 Scorcher', type: 'Energy', ap: 3, terminids: 3, automatons: 2, illuminate: 3, warbond: 'Cutting Edge' },
  { name: 'PLAS-101 Purifier', type: 'Energy', ap: 3, terminids: 2, automatons: 2, illuminate: 3, warbond: 'Polar Patriots' },
  { name: 'LAS-13 Trident', type: 'Energy', ap: 2, terminids: 3, automatons: 1, illuminate: 2, warbond: 'Siege Breakers' },

  // Special
  { name: 'VG-70 Variable', type: 'Special', ap: 2, terminids: 2, automatons: 1, illuminate: 2, warbond: 'Control Group' },
  { name: 'FLAM-66 Torcher', type: 'Flamethrower', ap: 4, terminids: 3, automatons: 1, illuminate: 1, warbond: "Freedom's Flame" },
  { name: 'JAR-5 Dominator', type: 'DMR', ap: 3, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Steeled Veterans' },
];

// ══════════════════════════════════════════════════════════
// SECONDARIES
// ══════════════════════════════════════════════════════════
const secondaries = [
  { name: 'P-92 Warrant', type: 'Pistol', ap: 3, terminids: 1, automatons: 2, illuminate: 1, warbond: 'Force of Law' },
  { name: 'P-2 Peacemaker', type: 'Pistol', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'P-19 Redeemer', type: 'Machine Pistol', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'P-113 Verdict', type: 'Pistol', ap: 3, terminids: 1, automatons: 2, illuminate: 1, warbond: 'Steeled Veterans' },
  { name: 'M6C/SOCOM Pistol', type: 'Pistol', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Halo' },
  { name: 'P-4 Senator', type: 'Revolver', ap: 4, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Helldivers Mobilize' },
  { name: 'CQC-19 Stun Lance', type: 'Melee', ap: 3, terminids: 2, automatons: 1, illuminate: 2, warbond: 'Urban Legends' },
  { name: 'CQC-2 Saber', type: 'Melee', ap: 3, terminids: 2, automatons: 1, illuminate: 2, warbond: 'Masters of Ceremony' },
  { name: 'CQC-30 Stun Baton', type: 'Melee', ap: 3, terminids: 2, automatons: 1, illuminate: 2, warbond: 'Urban Legends' },
  { name: 'CQC-5 Combat Hatchet', type: 'Melee', ap: 3, terminids: 2, automatons: 1, illuminate: 2, warbond: 'Polar Patriots' },
  { name: 'CQC-42 Machete', type: 'Melee', ap: 3, terminids: 2, automatons: 1, illuminate: 2, warbond: 'Viper Commandos' },
  { name: 'P-11 Stim Pistol', type: 'Support Pistol', ap: 0, terminids: 2, automatons: 2, illuminate: 2, warbond: 'Chemical Agents' },
  { name: 'SG-22 Bushwhacker', type: 'Sawed-Off', ap: 2, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Viper Commandos' },
  { name: 'LAS-58 Talon', type: 'Energy Pistol', ap: 3, terminids: 3, automatons: 1, illuminate: 3, warbond: 'Cutting Edge' },
  { name: 'P-72 Crisper', type: 'Incendiary Pistol', ap: 4, terminids: 3, automatons: 1, illuminate: 1, warbond: "Freedom's Flame" },
  { name: 'GP-31 Grenade Pistol', type: 'Grenade Pistol', ap: 3, terminids: 2, automatons: 2, illuminate: 2, warbond: 'Democratic Detonation' },
  { name: 'LAS-7 Dagger', type: 'Energy Pistol', ap: 2, terminids: 3, automatons: 1, illuminate: 3, warbond: 'Cutting Edge' },
  { name: 'GP-20 Ultimatum', type: 'Grenade Pistol', ap: 6, terminids: 2, automatons: 3, illuminate: 2, warbond: 'Servants of Freedom' },
  { name: 'PLAS-15 Loyalist', type: 'Energy Pistol', ap: 3, terminids: 2, automatons: 2, illuminate: 3, warbond: 'Truth Enforcers' },
  { name: 'P-35 Re-Educator', type: 'Pistol', ap: 4, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Redacted Regiment' },
];

// ══════════════════════════════════════════════════════════
// GRENADES
// ══════════════════════════════════════════════════════════
const grenades = [
  { name: 'G-12 High Explosive', type: 'Explosive', ap: 4, terminids: 2, automatons: 2, illuminate: 2, warbond: 'Base Game' },
  { name: 'G-6 Frag', type: 'Frag', ap: 3, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'G-10 Incendiary', type: 'Incendiary', ap: 3, terminids: 3, automatons: 1, illuminate: 1, warbond: "Freedom's Flame" },
  { name: 'G-16 Impact', type: 'Impact', ap: 4, terminids: 2, automatons: 2, illuminate: 2, warbond: 'Base Game' },
  { name: 'G-13 Incendiary Impact', type: 'Incendiary', ap: 3, terminids: 3, automatons: 1, illuminate: 1, warbond: 'Polar Patriots' },
  { name: 'G-23 Stun', type: 'Stun', ap: 6, terminids: 2, automatons: 2, illuminate: 2, warbond: 'Cutting Edge' },
  { name: 'G-4 Gas', type: 'Gas', ap: 6, terminids: 3, automatons: 1, illuminate: 1, warbond: 'Chemical Agents' },
  { name: 'G-3 Smoke', type: 'Smoke', ap: 0, terminids: 1, automatons: 2, illuminate: 1, warbond: 'Base Game' },
  { name: 'G-123 Thermite', type: 'Thermite', ap: 7, terminids: 2, automatons: 3, illuminate: 2, warbond: 'Democratic Detonation' },
  { name: 'K-2 Throwing Knife', type: 'Knife', ap: 3, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Viper Commandos' },
  { name: 'G-7 Pineapple', type: 'Frag', ap: 3, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Dust Devils' },
  { name: 'TED-63 Dynamite', type: 'Explosive', ap: 4, terminids: 2, automatons: 2, illuminate: 2, warbond: 'Urban Legends' },
  { name: 'G-50 Seeker', type: 'Homing', ap: 4, terminids: 2, automatons: 2, illuminate: 2, warbond: 'Servants of Freedom' },
  { name: 'G-142 Pyrotech', type: 'Incendiary', ap: 3, terminids: 3, automatons: 1, illuminate: 1, warbond: 'Masters of Ceremony' },
  { name: 'G-109 Urchin', type: 'Explosive', ap: 6, terminids: 2, automatons: 3, illuminate: 2, warbond: 'Force of Law' },
  { name: 'G-31 Arc', type: 'Arc', ap: 4, terminids: 2, automatons: 2, illuminate: 3, warbond: 'Control Group' },
  { name: 'TM-1 Lure Mine', type: 'Mine', ap: 5, terminids: 3, automatons: 1, illuminate: 1, warbond: 'Redacted Regiment' },
  { name: 'G-89 Smokescreen', type: 'Smoke', ap: 0, terminids: 1, automatons: 2, illuminate: 1, warbond: 'Redacted Regiment' },
  { name: 'G/SH-39 Shield', type: 'Shield', ap: 0, terminids: 1, automatons: 2, illuminate: 3, warbond: 'Siege Breakers' },
];

// ══════════════════════════════════════════════════════════
// STRATAGEMS (no warbond — these are ship upgrades / requisition)
// ══════════════════════════════════════════════════════════

const supportWeapons = [
  { name: 'MG-43 Machine Gun', ap: 3, hasBackpack: false, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Base Game' },
  { name: 'APW-1 Anti-Materiel Rifle', ap: 4, hasBackpack: false, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Base Game' },
  { name: 'M-105 Stalwart', ap: 2, hasBackpack: false, terminids: 2, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'EAT-17 Expendable Anti-Tank', ap: 6, hasBackpack: false, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Base Game' },
  { name: 'GR-8 Recoilless Rifle', ap: 6, hasBackpack: true, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Base Game' },
  { name: 'FLAM-40 Flamethrower', ap: 4, hasBackpack: false, terminids: 3, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'AC-8 Autocannon', ap: 4, hasBackpack: true, terminids: 2, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'MG-206 Heavy Machine Gun', ap: 4, hasBackpack: false, terminids: 2, automatons: 3, illuminate: 1, warbond: 'Base Game' },
  { name: 'RL-77 Airburst Rocket Launcher', ap: 3, hasBackpack: true, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Base Game' },
  { name: 'MLS-4X Commando', ap: 6, hasBackpack: false, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Base Game' },
  { name: 'RS-422 Railgun', ap: 5, hasBackpack: false, terminids: 1, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'FAF-14 Spear', ap: 7, hasBackpack: true, terminids: 1, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'LAS-98 Laser Cannon', ap: 4, hasBackpack: false, terminids: 3, automatons: 2, illuminate: 3, warbond: 'Base Game' },
  { name: 'ARC-3 Arc Thrower', ap: 7, hasBackpack: false, terminids: 2, automatons: 2, illuminate: 3, warbond: 'Base Game' },
  { name: 'LAS-99 Quasar Cannon', ap: 6, hasBackpack: false, terminids: 2, automatons: 3, illuminate: 3, warbond: 'Base Game' },
  { name: 'GL-21 Grenade Launcher', ap: 4, hasBackpack: false, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Base Game' },
  { name: 'StA-X3 W.A.S.P. Launcher', ap: 6, hasBackpack: true, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Killzone 2' },
  { name: 'TX-41 Sterilizer', ap: 5, hasBackpack: false, terminids: 1, automatons: 1, illuminate: 1, warbond: 'Chemical Agents' },  // terrible
  { name: 'GL-52 De-Escalator', ap: 4, hasBackpack: false, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Force of Law' },
  { name: 'PLAS-45 Epoch', ap: 5, hasBackpack: false, terminids: 2, automatons: 2, illuminate: 3, warbond: 'Control Group' },
  { name: 'S-11 Speargun', ap: 5, hasBackpack: false, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Dust Devils' },
  { name: 'EAT-700 Expendable Napalm', ap: 6, hasBackpack: false, terminids: 3, automatons: 1, illuminate: 1, warbond: 'Dust Devils' },
  { name: 'MS-11 Solo Silo', ap: 9, hasBackpack: false, terminids: 1, automatons: 3, illuminate: 2, warbond: 'Dust Devils' },
  { name: 'M-1000 Maxigun', ap: 3, hasBackpack: false, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Python Commandos' },
  { name: 'B/MD C4 Pack', ap: 7, hasBackpack: true, terminids: 2, automatons: 3, illuminate: 2, warbond: 'Redacted Regiment' },
  { name: 'CQC-20 Breaching Hammer', ap: 5, hasBackpack: false, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Siege Breakers' },
  { name: 'EAT-411 Leveller', ap: 6, hasBackpack: false, terminids: 1, automatons: 3, illuminate: 1, warbond: 'Siege Breakers' },
  { name: 'GL-28 Belt-Fed Grenade Launcher', ap: 4, hasBackpack: true, terminids: 2, automatons: 2, illuminate: 1, warbond: 'Siege Breakers' },
];

const orbitals = [
  { name: 'Orbital Gatling Barrage', terminids: 2, automatons: 2, illuminate: 1, warbond: 'Base Game' },
  { name: 'Orbital Airburst Strike', terminids: 3, automatons: 1, illuminate: 2, warbond: 'Base Game' },
  { name: 'Orbital 120mm HE Barrage', terminids: 2, automatons: 2, illuminate: 2, warbond: 'Base Game' },
  { name: 'Orbital 380mm HE Barrage', terminids: 2, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'Orbital Walking Barrage', terminids: 2, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'Orbital Laser', terminids: 3, automatons: 3, illuminate: 3, warbond: 'Base Game' },
  { name: 'Orbital Railcannon Strike', terminids: 2, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'Orbital Precision Strike', terminids: 1, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'Orbital Gas Strike', terminids: 3, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'Orbital EMS Strike', terminids: 1, automatons: 1, illuminate: 3, warbond: 'Base Game' },
  { name: 'Orbital Smoke Strike', terminids: 1, automatons: 2, illuminate: 1, warbond: 'Base Game' },
  { name: 'Orbital Napalm Barrage', terminids: 3, automatons: 1, illuminate: 1, warbond: 'Base Game' },
];

const eagles = [
  { name: 'Eagle Strafing Run', terminids: 2, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'Eagle Airstrike', terminids: 2, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'Eagle Cluster Bomb', terminids: 3, automatons: 1, illuminate: 2, warbond: 'Base Game' },
  { name: 'Eagle Napalm Airstrike', terminids: 3, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'Eagle Smoke Strike', terminids: 1, automatons: 2, illuminate: 1, warbond: 'Base Game' },
  { name: 'Eagle 110mm Rocket Pods', terminids: 1, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'Eagle 500kg Bomb', terminids: 2, automatons: 3, illuminate: 2, warbond: 'Base Game' },
];

const backpacks = [
  { name: 'Shield Generator Pack', terminids: 1, automatons: 2, illuminate: 3, warbond: 'Base Game' },
  { name: 'Jump Pack', terminids: 2, automatons: 2, illuminate: 2, warbond: 'Base Game' },
  { name: 'Guard Dog', terminids: 2, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'Guard Dog Rover', terminids: 3, automatons: 1, illuminate: 3, warbond: 'Base Game' },
  { name: 'Ballistic Shield Backpack', terminids: 1, automatons: 2, illuminate: 2, warbond: 'Base Game' },
  { name: 'Supply Pack', terminids: 2, automatons: 2, illuminate: 2, warbond: 'Base Game' },
  { name: 'Guard Dog Dog Breath', terminids: 3, automatons: 1, illuminate: 1, warbond: 'Chemical Agents' },
  { name: 'Guard Dog Hotdog', terminids: 2, automatons: 1, illuminate: 1, warbond: 'Python Commandos' },
];

const vehicles = [
  { name: 'Patriot Exosuit', terminids: 2, automatons: 2, illuminate: 2, warbond: 'Base Game' },
  { name: 'Emancipator Exosuit', terminids: 1, automatons: 3, illuminate: 2, warbond: 'Base Game' },
];

const sentries = [
  { name: 'Machine Gun Sentry', terminids: 2, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'Gatling Sentry', terminids: 3, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'Mortar Sentry', terminids: 3, automatons: 2, illuminate: 2, warbond: 'Base Game' },
  { name: 'Autocannon Sentry', terminids: 1, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'Rocket Sentry', terminids: 1, automatons: 3, illuminate: 2, warbond: 'Base Game' },
  { name: 'EMS Mortar Sentry', terminids: 1, automatons: 1, illuminate: 3, warbond: 'Base Game' },
  { name: 'Tesla Tower', terminids: 2, automatons: 1, illuminate: 3, warbond: 'Base Game' },
  { name: 'Anti-Personnel Minefield', terminids: 3, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'Incendiary Mines', terminids: 3, automatons: 1, illuminate: 1, warbond: 'Base Game' },
  { name: 'Anti-Tank Mines', terminids: 1, automatons: 3, illuminate: 1, warbond: 'Base Game' },
  { name: 'Shield Generator Relay', terminids: 1, automatons: 2, illuminate: 3, warbond: 'Base Game' },
];

// ══════════════════════════════════════════════════════════
// COSMETICS — pure drip, no faction weighting
// warbond tags included for filtering
// ══════════════════════════════════════════════════════════
const armors = [
  { name: 'SC-30 Trailblazer Scout', weight: 'Light', passive: 'Scout', warbond: 'Base Game' },
  { name: 'SC-34 Infiltrator', weight: 'Light', passive: 'Scout', warbond: 'Helldivers Mobilize' },
  { name: 'SC-37 Legionnaire', weight: 'Light', passive: 'Servo-Assisted', warbond: 'Steeled Veterans' },
  { name: 'CE-35 Trench Engineer', weight: 'Light', passive: 'Engineering Kit', warbond: 'Steeled Veterans' },
  { name: 'CE-74 Breaker', weight: 'Light', passive: 'Fortified', warbond: 'Democratic Detonation' },
  { name: 'SA-12 Servo Assisted', weight: 'Light', passive: 'Servo-Assisted', warbond: 'Base Game' },
  { name: 'CM-09 Bonesnapper', weight: 'Medium', passive: 'Med-Kit', warbond: 'Base Game' },
  { name: 'CM-14 Physician', weight: 'Medium', passive: 'Med-Kit', warbond: 'Cutting Edge' },
  { name: 'CM-21 Trench Paramedic', weight: 'Medium', passive: 'Med-Kit', warbond: 'Steeled Veterans' },
  { name: 'DP-40 Hero of the Federation', weight: 'Medium', passive: 'Democracy Protects', warbond: 'Helldivers Mobilize' },
  { name: 'SA-25 Steel Trooper', weight: 'Medium', passive: 'Servo-Assisted', warbond: 'Polar Patriots' },
  { name: 'SA-32 Dynamo', weight: 'Medium', passive: 'Servo-Assisted', warbond: 'Cutting Edge' },
  { name: 'FS-55 Devastator', weight: 'Medium', passive: 'Fortified', warbond: 'Base Game' },
  { name: 'FS-38 Eradicator', weight: 'Medium', passive: 'Fortified', warbond: 'Helldivers Mobilize' },
  { name: 'DP-53 Savior of the Free', weight: 'Medium', passive: 'Democracy Protects', warbond: 'Democratic Detonation' },
  { name: 'FS-05 Marksman', weight: 'Heavy', passive: 'Fortified', warbond: 'Base Game' },
  { name: 'FS-61 Dreadnought', weight: 'Heavy', passive: 'Fortified', warbond: 'Helldivers Mobilize' },
  { name: 'CE-07 Demolition Specialist', weight: 'Heavy', passive: 'Engineering Kit', warbond: 'Democratic Detonation' },
  { name: 'EX-03 Prototype X', weight: 'Heavy', passive: 'Extra Padding', warbond: 'Cutting Edge' },
  { name: 'EX-16 Prototype 16', weight: 'Heavy', passive: 'Extra Padding', warbond: 'Polar Patriots' },
  { name: 'DP-11 Champion of the People', weight: 'Heavy', passive: 'Democracy Protects', warbond: 'Viper Commandos' },
];

const helmets = [
  { name: 'B-01 Tactical', warbond: 'Base Game' },
  { name: 'B-08 Scout', warbond: 'Base Game' },
  { name: 'C-01 Duty', warbond: 'Helldivers Mobilize' },
  { name: 'C-02 Breaker', warbond: 'Helldivers Mobilize' },
  { name: 'TR-7 Ambassador of the Brand', warbond: 'Steeled Veterans' },
  { name: 'TR-9 Cavalier of Democracy', warbond: 'Democratic Detonation' },
  { name: 'EX-04 Prototype 4', warbond: 'Cutting Edge' },
  { name: 'B-24 Enforcer', warbond: 'Polar Patriots' },
  { name: 'C-10 Whistleblower', warbond: 'Viper Commandos' },
  { name: 'B-27 Fortified Commando', warbond: 'Truth Enforcers' },
];

const capes = [
  // Base Game / Standard Issue
  { name: 'Foesmasher', warbond: 'Base Game' },
  // Helldivers Mobilize (free warbond)
  { name: 'Independence Bringer', warbond: 'Helldivers Mobilize' },
  { name: "Liberty's Herald", warbond: 'Helldivers Mobilize' },
  { name: 'Tideturner', warbond: 'Helldivers Mobilize' },
  { name: 'The Cape of Stars and Suffrage', warbond: 'Helldivers Mobilize' },
  { name: 'Unblemished Allegiance', warbond: 'Helldivers Mobilize' },
  { name: 'Cresting Honour', warbond: 'Helldivers Mobilize' },
  { name: 'Judgement Day', warbond: 'Helldivers Mobilize' },
  { name: 'Blazing Samaritan', warbond: 'Helldivers Mobilize' },
  { name: 'Mantle of True Citizenship', warbond: 'Helldivers Mobilize' },
  { name: 'Light of Eternal Liberty', warbond: 'Helldivers Mobilize' },
  // Steeled Veterans
  { name: "Cloak of Posterity's Gratitude", warbond: 'Steeled Veterans' },
  { name: 'Tyrant Hunter', warbond: 'Steeled Veterans' },
  { name: 'Bastion of Integrity', warbond: 'Steeled Veterans' },
  { name: 'Bastion of Integrity 2', warbond: 'Steeled Veterans' },
  { name: 'Drape of Glory', warbond: 'Steeled Veterans' },
  // Cutting Edge
  { name: 'Botslayer', warbond: 'Cutting Edge' },
  { name: 'Martyris Rex', warbond: 'Cutting Edge' },
  { name: 'Agent of Oblivion', warbond: 'Cutting Edge' },
  // Democratic Detonation
  { name: 'Harbinger of True Equality', warbond: 'Democratic Detonation' },
  { name: "Eagle's Fury", warbond: 'Democratic Detonation' },
  { name: "Freedom's Tapestry", warbond: 'Democratic Detonation' },
  // Polar Patriots
  { name: "Dissident's Nightmare", warbond: 'Polar Patriots' },
  { name: 'Pinions of Everlasting Glory', warbond: 'Polar Patriots' },
  { name: 'Order of the Venerated Ballot', warbond: 'Polar Patriots' },
  // Viper Commandos
  { name: 'Mark of the Crimson Fang', warbond: 'Viper Commandos' },
  { name: 'Executioners Canopy', warbond: 'Viper Commandos' },
  // Truth Enforcers
  { name: 'Pride of the Whistleblower', warbond: 'Truth Enforcers' },
  { name: 'Proof of Faultless Virtue', warbond: 'Truth Enforcers' },
  // Freedom's Flame
  { name: 'Purifying Eclipse', warbond: "Freedom's Flame" },
  { name: 'The Breach', warbond: "Freedom's Flame" },
  // Urban Legends
  { name: 'Greatcloak of Rebar Resolve', warbond: 'Urban Legends' },
  { name: 'Holder of the Yellow Line', warbond: 'Urban Legends' },
  // Chemical Agents
  { name: 'Standard of Safe Distance', warbond: 'Chemical Agents' },
  { name: "Patient Zero's Remembrance", warbond: 'Chemical Agents' },
  // Servants of Freedom
  { name: 'Fre Liberam', warbond: 'Servants of Freedom' },
  { name: 'Per Democrasum', warbond: 'Servants of Freedom' },
  // Borderline Justice
  { name: 'Reaper of Bounties', warbond: 'Borderline Justice' },
  { name: 'Way of the Bandolier', warbond: 'Borderline Justice' },
  // Masters of Ceremony
  { name: 'Humble Regalia', warbond: 'Masters of Ceremony' },
  { name: "Federation's Embrace", warbond: 'Masters of Ceremony' },
  // Special / Events
  { name: 'Will of the People', warbond: 'Super Citizen Edition' },
  { name: 'Eye of Freedom', warbond: 'Anniversary Gift' },
  { name: 'Defender of Our Dream', warbond: 'Killzone Event' },
  { name: 'Strength in Our Arms', warbond: 'Superstore' },
  { name: "Fallen Hero's Vengeance", warbond: 'Base Game' },
];


// Exposed as globals (no module.exports needed)
