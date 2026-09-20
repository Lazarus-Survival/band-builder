const state = {
  bandKey: "civiles",
  name: "Mi banda",
  limit: 250,
  members: []
};

const AMMO_RULES = {
  civiles: {
    "Pistola .22": { cost: 1, size: 5 },
    "Pistola Ligera": { cost: 2, size: 5 },
    "Pistola Pesada": { cost: 3, size: 5 },
    "Pistola de Clavos": { cost: 1, size: 10 },
    "Escopeta Recortada": { cost: 4, size: 4 },
    "Pistola Ametralladora": { cost: 2, size: 5 },
    "Fusil .22": { cost: 1, size: 5 },
    "Fusil de Caza": { cost: 4, size: 5 },
    "Fusil Militar": { cost: 6, size: 4 },
    "Fusil de Combate": { cost: 6, size: 4 },
    "Escopeta": { cost: 4, size: 4 },
    "Subfusil": { cost: 2, size: 5 },
    "Carabina": { cost: 4, size: 5 },
    "Fusil de Asalto": { cost: 4, size: 5 },
    "Ametralladora Ligera": { cost: 4, size: 5 },
    "Honda": { cost: 1, size: 5 },
    "Arco de Caza": { cost: 1, size: 5 },
    "Arco de Poleas/Ballesta": { cost: 3, size: 5 },
    "Rifle Submarino": { cost: 3, size: 5 }
  },
  desertores: {
    "Pistola Ligera": { cost: 2, size: 5 },
    "Pistola Pesada": { cost: 3, size: 5 },
    "Fusil Militar": { cost: 6, size: 4 },
    "Fusil de Combate": { cost: 6, size: 4 },
    "Subfusil": { cost: 2, size: 5 },
    "Escopeta": { cost: 4, size: 4 },
    "Escopeta Militar": { cost: 4, size: 4 },
    "Carabina": { cost: 4, size: 5 },
    "Fusil de Asalto": { cost: 4, size: 5 },
    "Ametralladora Ligera": { cost: 4, size: 5 }
  },
  pandilleros: {
    "Pistola .22": { cost: 1, size: 5 },
    "Pistola Ligera": { cost: 2, size: 5 },
    "Pistola Pesada": { cost: 3, size: 5 },
    "Escopeta Recortada": { cost: 4, size: 4 },
    "Pistola Ametralladora": { cost: 2, size: 5 },
    "Escopeta": { cost: 4, size: 4 },
    "Subfusil": { cost: 2, size: 5 },
    "Carabina": { cost: 4, size: 5 },
    "Fusil de Asalto": { cost: 4, size: 5 }
  },
  sectarios: {
    "Pistola Ligera": { cost: 2, size: 5 },
    "Pistola Pesada": { cost: 3, size: 5 },
    "Escopeta Recortada": { cost: 4, size: 4 },
    "Pistola Ametralladora": { cost: 2, size: 5 },
    "Fusil de Caza": { cost: 4, size: 5 },
    "Escopeta": { cost: 4, size: 4 },
    "Subfusil": { cost: 2, size: 5 },
    "Carabina": { cost: 4, size: 5 },
    "Fusil de Asalto": { cost: 4, size: 5 },
    "Ametralladora Ligera": { cost: 4, size: 5 }
  },
  laboratorios: {
    "Pistola Ligera": { cost: 2, size: 5 },
    "Pistola Ametralladora": { cost: 2, size: 5 },
    "Subfusil": { cost: 2, size: 5 },
    "Carabina": { cost: 4, size: 5 },
    "Fusil de Asalto": { cost: 4, size: 5 },
    "Lanzallamas": { cost: 4, size: 4 }
  },
  carroneros: {
    "Pistola .22": { cost: 1, size: 5 },
    "Pistola Ligera": { cost: 2, size: 5 },
    "Honda": { cost: 1, size: 10 },
    "Pistola de Clavos": { cost: 1, size: 10 },
    "Escopeta Recortada": { cost: 4, size: 4 },
    "Arco de Caza": { cost: 1, size: 10 }
  }
};

const el = {
  bandName: document.querySelector("#bandName"),
  bandType: document.querySelector("#bandType"),
  pointsLimit: document.querySelector("#pointsLimit"),
  pointsBadge: document.querySelector("#pointsBadge"),
  addMember: document.querySelector("#addMemberButton"),
  members: document.querySelector("#members"),
  messages: document.querySelector("#messages"),
  sheet: document.querySelector("#sheet"),
  print: document.querySelector("#printButton"),
  template: document.querySelector("#memberTemplate")
};

const STAT_NAMES = ["COM", "DIS", "FUE", "INI", "MOR", "RES", "VIDA"];
function uid(){return globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random()}`;}
function band(){return LAZARUS_DATA.bands[state.bandKey];}
function firstProfile(){const entries=Object.entries(band().profiles);const leader=entries.find(([,p])=>p.leader);return leader?.[0]||entries[0][0];}
function newWeapon(){return {name:"",ammoBlocks:1};}
function addMember(profileName=null){state.members.push({id:uid(),name:"",profile:profileName||firstAvailableProfile()||firstProfile(),trait:"",flaw:"",armor:"",weapons:[newWeapon()],gear:[""]});render();}
function firstAvailableProfile(){for(const [name,profile] of Object.entries(band().profiles)){const count=state.members.filter(m=>m.profile===name).length;if(count<profile.max)return name;}return null;}
function options(map,selected,emptyLabel="Ninguno"){const result=[`<option value="">${emptyLabel}</option>`];for(const [name,value] of Object.entries(map)){const cost=typeof value==="number"?value:value.cost;result.push(`<option value="${escapeHtml(name)}" ${name===selected?"selected":""}>${escapeHtml(name)}${cost?` · ${cost} pts`:""}</option>`);}return result.join("");}
function profileOptions(selected){return Object.entries(band().profiles).map(([name,p])=>{const count=state.members.filter(m=>m.profile===name).length;const disabled=count>=p.max&&name!==selected;return `<option value="${escapeHtml(name)}" ${name===selected?"selected":""} ${disabled?"disabled":""}>${escapeHtml(name)} · ${p.cost} pts · máx. ${p.max}</option>`;}).join("");}
function ammoRule(weaponName){if(!weaponName)return null;return AMMO_RULES[state.bandKey]?.[weaponName]||null;}
function normalizedAmmoBlocks(weapon){return Math.max(1,Number(weapon.ammoBlocks)||1);}
function ammoCost(weapon){const rule=ammoRule(weapon.name);if(!rule)return 0;return(normalizedAmmoBlocks(weapon)-1)*rule.cost;}
function ammoCount(weapon){const rule=ammoRule(weapon.name);return rule?normalizedAmmoBlocks(weapon)*rule.size:null;}
function repeatedTraitCost(member){if(!member.trait)return 0;const base=band().traits[member.trait]||0;const sameBefore=state.members.slice(0,state.members.indexOf(member)).filter(m=>m.trait===member.trait).length;return base*(2**sameBefore);}
function repeatedFlawValue(member){if(!member.flaw)return 0;const base=band().flaws[member.flaw]||0;const sameBefore=state.members.slice(0,state.members.indexOf(member)).filter(m=>m.flaw===member.flaw).length;return base/(2**sameBefore);}
function memberCost(member){const b=band();const p=b.profiles[member.profile];if(!p)return 0;const weaponCost=member.weapons.reduce((sum,weapon)=>sum+(b.weapons[weapon.name]||0)+ammoCost(weapon),0);const gearCost=member.gear.reduce((sum,item)=>sum+(b.gear[item]||0),0);return p.cost+repeatedTraitCost(member)-repeatedFlawValue(member)+(b.armor[member.armor]||0)+weaponCost+gearCost;}
function totalCost(){return state.members.reduce((sum,m)=>sum+memberCost(m),0);}
function effectiveStats(member){const p=band().profiles[member.profile];if(!p)return[];const stats=[...p.stats];if(member.trait==="Atleta"&&typeof stats[5]==="number")stats[5]+=2;if(member.trait==="Duro de Pelar"&&typeof stats[6]==="number")stats[6]+=1;if(member.flaw==="Bajo de Forma"&&typeof stats[5]==="number")stats[5]-=2;return stats;}
function validate(){const errors=[];const b=band();const leaders=state.members.filter(m=>b.profiles[m.profile]?.leader).length;if(state.members.length<3)errors.push("La banda debe tener al menos 3 figuras.");if(leaders!==1)errors.push("La banda debe incluir exactamente un Líder.");if(totalCost()>state.limit)errors.push(`La banda supera el límite en ${formatPoints(totalCost()-state.limit)} puntos.`);for(const[profileName,profile]of Object.entries(b.profiles)){const count=state.members.filter(m=>m.profile===profileName).length;if(count>profile.max)errors.push(`Hay ${count} ${profileName}; el máximo es ${profile.max}.`);}state.members.forEach((m,index)=>{const p=b.profiles[m.profile];const label=m.name||`${m.profile} #${index+1}`;const filledWeapons=m.weapons.filter(w=>w.name);const weaponNames=filledWeapons.map(w=>w.name);const filledGear=m.gear.filter(Boolean);if(!p?.dog&&!p?.special&&filledWeapons.length===0)errors.push(`${label} debe llevar al menos un arma.`);const twoHanded=filledWeapons.filter(w=>LAZARUS_DATA.weapons[w.name]?.hands===2);if(twoHanded.length>1)errors.push(`${label} no puede llevar más de un arma a dos manos.`);if(new Set(weaponNames).size!==weaponNames.length)errors.push(`${label} lleva dos veces la misma arma; revisa la restricción de equipo duplicado.`);if(new Set(filledGear).size!==filledGear.length)errors.push(`${label} lleva dos veces el mismo elemento de equipo.`);if(p?.child){for(const weapon of filledWeapons){const info=LAZARUS_DATA.weapons[weapon.name];if(info?.ranged&&info.hands===2&&!weapon.name.includes(".22"))errors.push(`${label}: un Niño solo puede usar armas de fuego a dos manos con .22 en el nombre.`);}}if(p?.leader&&m.flaw==="Miedoso")errors.push(`${label}: un Líder no puede tener Miedoso.`);if(m.flaw&&repeatedFlawValue(m)>=p.cost)errors.push(`${label}: el valor de su Desventaja no puede ser igual o superior al coste de la figura básica.`);});return errors;}
function render(){renderBandControls();renderMembers();renderSummary();}
function renderBandControls(){el.bandName.value=state.name;el.pointsLimit.value=state.limit;el.bandType.innerHTML=Object.entries(LAZARUS_DATA.bands).map(([key,b])=>`<option value="${key}" ${key===state.bandKey?"selected":""}>${escapeHtml(b.name)}</option>`).join("");const total=totalCost();el.pointsBadge.textContent=`${formatPoints(total)} / ${formatPoints(state.limit)} pts`;el.pointsBadge.classList.toggle("over",total>state.limit);}
function renderMembers(){el.members.innerHTML="";state.members.forEach((member,index)=>{const node=el.template.content.cloneNode(true);const card=node.querySelector(".member-card");card.dataset.id=member.id;const p=band().profiles[member.profile];const nameInput=card.querySelector(".member-name");nameInput.value=member.name;nameInput.placeholder=`${member.profile} ${index+1}`;card.querySelector(".member-meta").textContent=`${member.profile}${p?.leader?" · Líder":""}`;card.querySelector(".member-cost").textContent=`${formatPoints(memberCost(member))} pts`;card.querySelector(".member-profile").innerHTML=profileOptions(member.profile);card.querySelector(".member-trait").innerHTML=options(band().traits,member.trait,"Sin dote");card.querySelector(".member-flaw").innerHTML=options(band().flaws,member.flaw,"Sin defecto");card.querySelector(".member-armor").innerHTML=options(band().armor,member.armor,"Sin protección");const stats=effectiveStats(member);card.querySelector(".stats").innerHTML=STAT_NAMES.map((stat,i)=>`<div class="stat"><b>${stats[i]??"-"}</b><span>${stat}</span></div>`).join("");renderWeaponRows(card,member);renderGearRows(card,member);card.querySelector(".rule-details").innerHTML=ruleDetails(member);bindMember(card,member);el.members.appendChild(node);});}
function ammoOptions(weapon){const rule=ammoRule(weapon.name);if(!rule)return"";const selected=normalizedAmmoBlocks(weapon);const result=[];for(let blocks=1;blocks<=10;blocks+=1){const rounds=blocks*rule.size;const extra=(blocks-1)*rule.cost;const label=blocks===1?`${rounds} proyectiles · incluidos`:`${rounds} proyectiles · +${extra} pts`;result.push(`<option value="${blocks}" ${blocks===selected?"selected":""}>${label}</option>`);}return result.join("");}
function weaponOptions(selected){
  const groups=[
    {label:"Armas cuerpo a cuerpo a una mano",ranged:false,hands:1},
    {label:"Armas cuerpo a cuerpo a dos manos",ranged:false,hands:2},
    {label:"Armas a distancia a una mano",ranged:true,hands:1},
    {label:"Armas a distancia a dos manos",ranged:true,hands:2}
  ];
  const entries=Object.entries(band().weapons).filter(([name])=>name);
  const result=['<option value="">Sin arma</option>'];
  for(const group of groups){
    const weapons=entries.filter(([name])=>{const info=LAZARUS_DATA.weapons[name];return info&&!!info.ranged===group.ranged&&info.hands===group.hands;}).sort(([a],[b])=>a.localeCompare(b,"es",{sensitivity:"base"}));
    if(!weapons.length)continue;
    result.push('<optgroup label="'+group.label+'">');
    for(const [name,cost] of weapons)result.push('<option value="'+escapeHtml(name)+'"'+(name===selected?' selected':'')+'>'+escapeHtml(name)+(cost?' · '+cost+' pts':'')+'</option>');
    result.push('</optgroup>');
  }
  return result.join("");
}
function renderWeaponRows(card,member){const container=card.querySelector(".weapon-list");container.innerHTML=member.weapons.map((weapon,index)=>{const rule=ammoRule(weapon.name);return `<div class="loadout-row weapon-row"><label>Arma ${index+1}<select class="weapon-select" data-index="${index}">${weaponOptions(weapon.name)}</select></label>${rule?`<label>Munición<select class="ammo-select" data-index="${index}">${ammoOptions(weapon)}</select></label>`:""}${member.weapons.length>1?`<button type="button" class="remove-loadout remove-weapon" data-index="${index}" title="Eliminar arma">×</button>`:""}</div>`;}).join("");}
function renderGearRows(card,member){const container=card.querySelector(".gear-list");container.innerHTML=member.gear.map((item,index)=>`<div class="loadout-row gear-row"><label>Equipo ${index+1}<select class="gear-select" data-index="${index}">${options(band().gear,item,"Sin equipo")}</select></label>${member.gear.length>1?`<button type="button" class="remove-loadout remove-gear" data-index="${index}" title="Eliminar equipo">×</button>`:""}</div>`).join("");}
function ammoDescription(weapon){const rule=ammoRule(weapon.name);if(!rule)return"";const rounds=ammoCount(weapon);const extra=ammoCost(weapon);return `Munición: ${rounds} proyectiles${extra?` (+${extra} pts)`:" (incluidos)"}`;}
function ruleDetails(member){const rows=[];if(member.trait)rows.push(`<div class="rule-line"><b>${escapeHtml(member.trait)}:</b> ${escapeHtml(LAZARUS_DATA.traits[member.trait]?.text||"Consulta el reglamento.")} <em>(${formatPoints(repeatedTraitCost(member))} pts)</em></div>`);if(member.flaw)rows.push(`<div class="rule-line"><b>${escapeHtml(member.flaw)}:</b> ${escapeHtml(LAZARUS_DATA.flaws[member.flaw]?.text||"Consulta el reglamento.")} <em>(-${formatPoints(repeatedFlawValue(member))} pts)</em></div>`);if(member.armor)rows.push(`<div class="rule-line"><b>${escapeHtml(member.armor)}:</b> ${escapeHtml(LAZARUS_DATA.armorText[member.armor]||"")}</div>`);for(const weapon of member.weapons.filter(w=>w.name)){const ammo=ammoDescription(weapon);rows.push(`<div class="rule-line"><b>${escapeHtml(weapon.name)}:</b> ${escapeHtml(LAZARUS_DATA.weapons[weapon.name]?.text||"")}${ammo?` <span class="ammo-note">· ${escapeHtml(ammo)}</span>`:""}</div>`);}for(const item of member.gear.filter(Boolean)){rows.push(`<div class="rule-line"><b>${escapeHtml(item)}:</b> ${escapeHtml(LAZARUS_DATA.gearText[item]||"")}</div>`);}return rows.join("");}
function bindMember(card,member){card.querySelector(".member-name").addEventListener("input",e=>{member.name=e.target.value;renderSummary();});const fields={".member-profile":"profile",".member-trait":"trait",".member-flaw":"flaw",".member-armor":"armor"};for(const[selector,key]of Object.entries(fields)){card.querySelector(selector).addEventListener("change",e=>{member[key]=e.target.value;render();});}card.querySelector(".add-weapon").addEventListener("click",()=>{member.weapons.push(newWeapon());render();});card.querySelectorAll(".weapon-select").forEach(select=>{select.addEventListener("change",e=>{const weapon=member.weapons[Number(e.target.dataset.index)];weapon.name=e.target.value;weapon.ammoBlocks=1;render();});});card.querySelectorAll(".ammo-select").forEach(select=>{select.addEventListener("change",e=>{member.weapons[Number(e.target.dataset.index)].ammoBlocks=Math.max(1,Number(e.target.value)||1);render();});});card.querySelectorAll(".remove-weapon").forEach(button=>{button.addEventListener("click",e=>{member.weapons.splice(Number(e.currentTarget.dataset.index),1);if(member.weapons.length===0)member.weapons.push(newWeapon());render();});});card.querySelector(".add-gear").addEventListener("click",()=>{member.gear.push("");render();});card.querySelectorAll(".gear-select").forEach(select=>{select.addEventListener("change",e=>{member.gear[Number(e.target.dataset.index)]=e.target.value;render();});});card.querySelectorAll(".remove-gear").forEach(button=>{button.addEventListener("click",e=>{member.gear.splice(Number(e.currentTarget.dataset.index),1);if(member.gear.length===0)member.gear.push("");render();});});card.querySelector(".remove-member").addEventListener("click",()=>{state.members=state.members.filter(m=>m.id!==member.id);render();});}
function renderSummary(){const errors=validate();el.messages.innerHTML=errors.length?errors.map(e=>`<div class="message error">${escapeHtml(e)}</div>`).join(""):`<div class="message ok">Banda válida según las comprobaciones implementadas en este MVP.</div>`;const total=totalCost();el.sheet.innerHTML=`<h3>${escapeHtml(state.name||"Banda sin nombre")}</h3><p class="sheet-sub">${escapeHtml(band().name)} · ${formatPoints(total)} / ${formatPoints(state.limit)} pts</p>${state.members.length?state.members.map(sheetMember).join(""):"<p>Añade miembros para generar la ficha.</p>"}`;el.pointsBadge.textContent=`${formatPoints(total)} / ${formatPoints(state.limit)} pts`;el.pointsBadge.classList.toggle("over",total>state.limit);}
function sheetMember(member,index){const stats=effectiveStats(member);const details=[];if(member.trait)details.push(`<p><b>Dote — ${escapeHtml(member.trait)}:</b> ${escapeHtml(LAZARUS_DATA.traits[member.trait]?.text||"Consulta el reglamento.")}</p>`);if(member.flaw)details.push(`<p><b>Defecto — ${escapeHtml(member.flaw)}:</b> ${escapeHtml(LAZARUS_DATA.flaws[member.flaw]?.text||"Consulta el reglamento.")}</p>`);if(member.armor)details.push(`<p><b>Protección — ${escapeHtml(member.armor)}:</b> ${escapeHtml(LAZARUS_DATA.armorText[member.armor]||"")}</p>`);for(const weapon of member.weapons.filter(w=>w.name)){const ammo=ammoDescription(weapon);details.push(`<p><b>Arma — ${escapeHtml(weapon.name)}:</b> ${escapeHtml(LAZARUS_DATA.weapons[weapon.name]?.text||"")}${ammo?`<br><span class="sheet-ammo"><b>${escapeHtml(ammo)}</b></span>`:""}</p>`);}for(const item of member.gear.filter(Boolean)){details.push(`<p><b>Equipo — ${escapeHtml(item)}:</b> ${escapeHtml(LAZARUS_DATA.gearText[item]||"")}</p>`);}return `<section class="sheet-member"><div class="sheet-member-head"><h4>${escapeHtml(member.name||`${member.profile} ${index+1}`)} · ${escapeHtml(member.profile)}</h4><b>${formatPoints(memberCost(member))} pts</b></div><div class="sheet-stats">${STAT_NAMES.map((name,i)=>`<div><b>${stats[i]??"-"}</b>${name}</div>`).join("")}</div><div class="sheet-details">${details.join("")}</div></section>`;}
function formatPoints(value){return Number.isInteger(value)?String(value):value.toFixed(1);}
function escapeHtml(value){return String(value??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));}
el.bandName.addEventListener("input",e=>{state.name=e.target.value;renderSummary();});
el.pointsLimit.addEventListener("input",e=>{state.limit=Math.max(1,Number(e.target.value)||250);renderSummary();});
el.bandType.addEventListener("change",e=>{state.bandKey=e.target.value;state.members=[];addMember(firstProfile());});
el.addMember.addEventListener("click",()=>{const profile=firstAvailableProfile();if(profile)addMember(profile);else alert("Has alcanzado el máximo de todos los perfiles disponibles para esta banda.");});

for(const[key,b]of Object.entries(LAZARUS_DATA.bands)){const option=document.createElement("option");option.value=key;option.textContent=b.name;el.bandType.appendChild(option);}
addMember(firstProfile());
