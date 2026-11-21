const SHIELD_NAMES = new Set(["Escudo de Mano", "Escudo Balístico"]);

function protectionOptions(kind, selected, member) {
  const entries = Object.entries(band().armor).filter(([name]) => {
    if (!name || !allowedProtection(member, name)) return false;
    return kind === "shield" ? SHIELD_NAMES.has(name) : !SHIELD_NAMES.has(name);
  });
  const emptyLabel = kind === "shield" ? "Sin escudo" : "Sin indumentaria";
  const result = [`<option value="">${emptyLabel}</option>`];
  for (const [name] of entries) {
    result.push(equipmentOption(member, "armor", name, kind === "shield" ? "shield" : "armor", selected));
  }
  return result.join("");
}


ruleDetails = function(member) {
  const rows=[];
  const special = profileSpecialText(member);
  if (special) rows.push('<div class="rule-line">' + escapeHtml(special) + '</div>');
  rows.push(caretakerControl(member));
  if(member.trait) rows.push(`<div class="rule-line"><b>Dote · ${escapeHtml(member.trait)}:</b> ${escapeHtml(LAZARUS_DATA.traits[member.trait]?.text||"Consulta el reglamento.")} <em>(${formatPoints(repeatedTraitCost(member))} pts)</em></div>`);
  if(member.flaw) rows.push(`<div class="rule-line"><b>Defecto · ${escapeHtml(member.flaw)}:</b> ${escapeHtml(LAZARUS_DATA.flaws[member.flaw]?.text||"Consulta el reglamento.")} <em>(-${formatPoints(repeatedFlawValue(member))} pts)</em></div>`);
  for(const weapon of member.weapons.filter(w=>w.name)){
    const ammo=ammoDescription(weapon);
    rows.push(`<div class="rule-line"><b>Arma · ${escapeHtml(equipmentLabel(weapon.name))}:</b> ${escapeHtml(weaponRuleText(weapon))}${ammo?` <span class="ammo-note">· ${escapeHtml(ammo)}</span>`:""}</div>`);
  }
  if(member.armor) rows.push(`<div class="rule-line"><b>Indumentaria · ${escapeHtml(equipmentLabel(member.armor))}:</b> ${escapeHtml(LAZARUS_DATA.armorText[member.armor]||"")}</div>`);
  if(member.shield) rows.push(`<div class="rule-line"><b>Escudo · ${escapeHtml(equipmentLabel(member.shield))}:</b> ${escapeHtml(LAZARUS_DATA.armorText[member.shield]||"")}</div>`);
  for(const item of member.gear.filter(Boolean)){
    rows.push(`<div class="rule-line"><b>Equipo · ${escapeHtml(equipmentLabel(item))}:</b> ${escapeHtml(LAZARUS_DATA.gearText[item]||"")}</div>`);
  }
  return rows.join("");
};

bindMember = function(card,member) {bindLoadoutExtras(card,member);
  card.querySelector('.member-caretaker')?.addEventListener('change', event => {member.caretakerId=event.target.value;renderSummary();});
  card.querySelector(".member-name").addEventListener("input",e=>{member.name=e.target.value;renderSummary();});
  const fields={".member-profile":"profile",".member-trait":"trait",".member-flaw":"flaw",".member-armor":"armor",".member-shield":"shield"};
  for(const[selector,key]of Object.entries(fields)){
    card.querySelector(selector).addEventListener("change",e=>{if(key==="profile"&&fixedTrait(member))member.trait="";member[key]=e.target.value;render();});
  }
  card.querySelector(".add-weapon").addEventListener("click",()=>{member.weapons.push(newWeapon());render();});
  card.querySelectorAll(".weapon-select").forEach(select=>{select.addEventListener("change",e=>{const weapon=member.weapons[Number(e.target.dataset.index)];clearWeaponLinks(member,weapon);weapon.name=e.target.value;weapon.ammoBlocks=1;render();});});
  card.querySelectorAll(".ammo-select").forEach(select=>{select.addEventListener("change",e=>{member.weapons[Number(e.target.dataset.index)].ammoBlocks=Math.max(1,Number(e.target.value)||1);render();});});
  card.querySelectorAll(".remove-weapon").forEach(button=>{button.addEventListener("click",e=>{clearWeaponLinks(member,member.weapons[Number(e.currentTarget.dataset.index)]);member.weapons.splice(Number(e.currentTarget.dataset.index),1);if(member.weapons.length===0)member.weapons.push(newWeapon());render();});});
  card.querySelector(".add-gear").addEventListener("click",()=>{member.gear.push("");render();});
  card.querySelectorAll(".gear-select").forEach(select=>{select.addEventListener("change",e=>{member.gearTargets[Number(e.target.dataset.index)]="";member.gear[Number(e.target.dataset.index)]=e.target.value;render();});});
  card.querySelectorAll(".remove-gear").forEach(button=>{button.addEventListener("click",e=>{member.gearTargets.splice(Number(e.currentTarget.dataset.index),1);member.gear.splice(Number(e.currentTarget.dataset.index),1);if(member.gear.length===0)member.gear.push("");render();});});
  card.querySelector(".remove-member").addEventListener("click",()=>{state.members=state.members.filter(m=>m.id!==member.id);render();});
};

renderMembers = function() {
  el.members.innerHTML="";
  state.members.forEach((member,index)=>{
    if (member.shield === undefined) member.shield = "";
    const node=el.template.content.cloneNode(true);
    const card=node.querySelector(".member-card");
    card.dataset.id=member.id;
    const p=band().profiles[member.profile];
    const nameInput=card.querySelector(".member-name");
    nameInput.value=member.name;
    nameInput.placeholder=`${member.profile} ${index+1}`;
    card.querySelector(".member-meta").textContent=`${member.profile}${p?.leader?" · Líder":p?.beast?" · Bestia":""}`;
    card.querySelector(".member-cost").textContent=`${formatPoints(memberCost(member))} pts`;
    card.querySelector(".member-profile").innerHTML=profileOptions(member.profile);
    const traitSelect=card.querySelector(".member-trait");
    traitSelect.disabled=!!fixedTrait(member);
    traitSelect.innerHTML=traitOptions(member);
    card.querySelector(".member-flaw").innerHTML=flawOptions(member);
    card.querySelector(".member-armor").innerHTML=protectionOptions("armor",member.armor,member);
    card.querySelector(".member-shield").innerHTML=protectionOptions("shield",member.shield,member);
    for(const [key,prefix] of [["trait","×"],["flaw","÷"]]){
      const repeats=key==="trait"?(member.trait?traitRepeats(member):0):member[key]?state.members.slice(0,index).filter(m=>m[key]===member[key]).length:0;
      card.querySelector('.repeat-'+key).textContent=repeats?prefix+(2**repeats):"";
    }
    const stats=effectiveStats(member);
    card.querySelector(".stats").innerHTML=STAT_NAMES.map((stat,i)=>`<div class="stat"><b>${stats[i]??"-"}</b><span>${stat}</span></div>`).join("");
    renderWeaponRows(card,member);
    renderGearRows(card,member);
    card.querySelector('.member-armor').disabled=!!p?.includedArmor;
    const noGear=p?.beast||p?.child;
    card.querySelector('.add-gear').hidden=!!noGear;
    if(noGear)card.querySelector('.gear-list').innerHTML='';
    card.querySelector(".rule-details").innerHTML=ruleDetails(member);
    bindMember(card,member);
    el.members.appendChild(node);
  });
};

function sheetSection(title, content) {
  return `<div class="sheet-section"><div class="sheet-section-title">${title}</div>${content || '<p class="sheet-empty">—</p>'}</div>`;
}

sheetMember = function(member,index) {
  const stats=effectiveStats(member);
  const traits=[];
  if(member.trait) traits.push(`<p><b>Dote — ${escapeHtml(member.trait)}:</b> ${escapeHtml(LAZARUS_DATA.traits[member.trait]?.text||"Consulta el reglamento.")}</p>`);
  if(member.flaw) traits.push(`<p><b>Defecto — ${escapeHtml(member.flaw)}:</b> ${escapeHtml(LAZARUS_DATA.flaws[member.flaw]?.text||"Consulta el reglamento.")}</p>`);
  const weapons=[];
  for(const weapon of member.weapons.filter(w=>w.name)){
    const ammo=ammoDescription(weapon);
    weapons.push(`<p><b>${escapeHtml(weapon.name)}:</b> ${escapeHtml(weaponRuleText(weapon))}${ammo?`<br><span class="sheet-ammo"><b>${escapeHtml(ammo)}</b></span>`:""}</p>`);
  }
  const protection=[];
  if(member.armor) protection.push(`<p><b>Indumentaria — ${escapeHtml(member.armor)}:</b> ${escapeHtml(LAZARUS_DATA.armorText[member.armor]||"")}</p>`);
  if(member.shield) protection.push(`<p><b>Escudo — ${escapeHtml(member.shield)}:</b> ${escapeHtml(LAZARUS_DATA.armorText[member.shield]||"")}</p>`);
  const gear=[];
  for(const item of member.gear.filter(Boolean)) gear.push(`<p><b>${escapeHtml(item)}:</b> ${escapeHtml(LAZARUS_DATA.gearText[item]||"")}</p>`);
  return `<section class="sheet-member"><div class="sheet-member-head"><h4>${escapeHtml(member.name||`${member.profile} ${index+1}`)} · ${escapeHtml(member.profile)}</h4><b>${formatPoints(memberCost(member))} pts</b></div><div class="sheet-stats">${STAT_NAMES.map((name,i)=>`<div><b>${stats[i]??"-"}</b>${name}</div>`).join("")}</div><div class="sheet-details">${sheetSection("Dote / Defecto",traits.join(""))}${sheetSection("Armas",weapons.join(""))}${sheetSection("Protección",protection.join(""))}${sheetSection("Equipo",gear.join(""))}</div></section>`;
};

render();

(function loadVisualCards(){
  const css=document.createElement("link");
  css.rel="stylesheet";
  css.href="card-visuals.css?v=20260922-3";
  document.head.appendChild(css);
  const script=document.createElement("script");
  script.src="card-visuals.js?v=20261121-3";
  document.body.appendChild(script);
})();