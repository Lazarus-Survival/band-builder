function allowedTrait(member, name) {
  const profile = band().profiles[member.profile];
  if (name === 'Inspirador' && !profile?.leader) return false;
  if (profile?.child) return band().childTraits?.includes(name) || false;
  if (profile?.dog && band().dogTraits) return band().dogTraits.includes(name);
  return !profile?.special;
}

function allowedFlaw(member, name) {
  const profile = band().profiles[member.profile];
  if (profile?.special) return false;
  if (profile?.leader && name === 'Miedoso') return false;
  return !profile?.child || band().childFlaws?.includes(name);
}

function traitOptions(member) {
  const entries = Object.entries(band().traits)
    .filter(([name]) => allowedTrait(member, name))
    .map(([name, cost]) => [name, name === 'Pirómano' && member.weapons.some(weapon => weapon.name === 'Lanzallamas') ? 10 : cost]);
  return options(Object.fromEntries(entries), member.trait, 'Sin dote');
}

function flawOptions(member) {
  const entries = Object.entries(band().flaws).filter(([name]) => allowedFlaw(member, name));
  return options(Object.fromEntries(entries), member.flaw, 'Sin defecto');
}

function allowedProtection(member, name) {
  const profile = band().profiles[member.profile];
  if (profile?.includedArmor) return name === profile.includedArmor;
  if (profile?.special) return false;
  if (profile?.child) return band().childArmor?.includes(name) || false;
  if (profile?.dog) return ['Protección ligera', 'Armadura primitiva'].includes(name);
  return true;
}

function equipmentEntries(member) {
  return [
    ...member.weapons.map(weapon => ({category: 'weapons', name: weapon.name, item: weapon})),
    {category: 'armor', name: member.armor, item: 'armor'},
    {category: 'armor', name: member.shield, item: 'shield'},
    ...member.gear.map((name, index) => ({category: 'gear', name, item: index}))
  ].filter(entry => entry.name);
}

function equipmentBaseCost(member, category, name, item) {
  const profile = band().profiles[member.profile];
  if (category === 'armor' && profile?.includedArmor === name && item === 'armor') return 0;
  return category === 'armor' && profile?.dog && band().dogArmor
    ? band().dogArmor[name] || 0
    : band()[category][name] || 0;
}

function equipmentCost(member, category, name, item) {
  const base = equipmentBaseCost(member, category, name, item);
  if (!band().scarce.includes(name)) return base;
  let previous = 0;
  for (const owner of state.members) {
    for (const entry of equipmentEntries(owner)) {
      if (owner === member && entry.category === category && entry.item === item) {
        return base * (1 + 0.5 * previous);
      }
      const included = entry.category === 'armor' && band().profiles[owner.profile]?.includedArmor === entry.name;
      if (!included && entry.category === category && entry.name === name) previous += 1;
    }
  }
  return base;
}

function equipmentLabel(name) {
  return name + (band().scarce.includes(name) ? ' (!)' : '');
}

function equipmentOption(member, category, name, item, selected) {
  let cost = equipmentCost(member, category, name, item);
  if (name !== selected && band().scarce.includes(name)) {
    const purchases = state.members.flatMap(owner => equipmentEntries(owner).filter(entry => {
      const currentSlot = owner === member && entry.category === category && entry.item === item;
      const included = entry.category === 'armor' && band().profiles[owner.profile]?.includedArmor === entry.name;
      return !currentSlot && !included && entry.category === category && entry.name === name;
    })).length;
    cost = equipmentBaseCost(member, category, name, item) * (1 + 0.5 * purchases);
  }
  const unit = LAZARUS_DATA.weapons[name]?.thrown && category === 'weapons' ? ' por unidad' : '';
  return '<option value="' + escapeHtml(name) + '"' + (name === selected ? ' selected' : '') + '>' +
    escapeHtml(equipmentLabel(name)) + ' · ' + formatPoints(cost) + ' pts' + unit + '</option>';
}

function gearOptions(member, index) {
  return '<option value="">Sin equipo</option>' + Object.keys(band().gear)
    .map(name => equipmentOption(member, 'gear', name, index, member.gear[index])).join('');
}

function weaponPurchaseCost(member, weapon) {
  return equipmentCost(member, 'weapons', weapon.name, weapon);
}

function protectionCost(member, field) {
  return equipmentCost(member, 'armor', member[field], field);
}

function gearPurchaseCost(member, index) {
  return equipmentCost(member, 'gear', member.gear[index], index);
}

function profileSpecialText(member) {
  const profile = band().profiles[member.profile];
  const rules = (profile?.specials || []).map(name => LAZARUS_DATA.specialText[name] || name);
  if (profile?.special) {
    const caretaker = state.members.find(candidate => candidate.id === member.caretakerId);
    rules.push('Cuidador: ' + (caretaker?.name || caretaker?.profile || 'Pendiente de elegir') + '.');
    rules.push(band().specialRules);
  }
  return rules.join(' ');
}

function caretakerControl(member) {
  if (!band().profiles[member.profile]?.special) return '';
  const candidates = state.members.filter(candidate => !band().profiles[candidate.profile]?.beast);
  return '<label>Cuidador<select class="member-caretaker"><option value="">Elige un cuidador</option>' +
    candidates.map(candidate => '<option value="' + escapeHtml(candidate.id) + '"' +
      (candidate.id === member.caretakerId ? ' selected' : '') + '>' +
      escapeHtml(candidate.name || candidate.profile) + '</option>').join('') + '</select></label>';
}

function validateBandRules() {
  const errors = [];
  const experimental = state.members.some(member => member.profile === 'Sujeto Experimental');
  if (state.bandKey === 'laboratorios' && experimental && state.members.some(member => member.profile === 'Quisling')) {
    errors.push('No se pueden incluir Quisling y Sujetos Experimentales en la misma banda.');
  }
  for (const member of state.members) {
    const profile = band().profiles[member.profile];
    const label = member.name || member.profile;
    if (member.trait && !allowedTrait(member, member.trait)) errors.push(label + ': dote no permitida para este perfil.');
    if (member.flaw && !allowedFlaw(member, member.flaw)) errors.push(label + ': defecto no permitido para este perfil.');
    if (member.weapons.some(weapon => weapon.name === 'Chaleco de Martirio') && member.trait !== 'Mártir') {
      errors.push(label + ': el Chaleco de Martirio requiere la dote Mártir.');
    }
    if (profile?.special && !state.members.some(candidate => candidate.id === member.caretakerId && !band().profiles[candidate.profile]?.beast)) {
      errors.push(label + ': elige un miembro de la banda como cuidador.');
    }
    if (member.flaw === 'Turbio' && !state.members.some(candidate => band().profiles[candidate.profile]?.child || band().profiles[candidate.profile]?.dog)) {
      errors.push(label + ': Turbio requiere un Chico o un Perro en la banda.');
    }
  }
  return errors;
}
