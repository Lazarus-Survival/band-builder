function iconBadge(name,text=""){
  const source=`${name} ${text}`.toLowerCase();
  let glyph="◆";
  if(/punter|disparo|visor|mira/.test(source))glyph="⌖";
  else if(/fusil|carabina/.test(source))glyph="▰";
  else if(/pistola/.test(source))glyph="◩";
  else if(/escopeta/.test(source))glyph="▱";
  else if(/subfusil|ametralladora/.test(source))glyph="▣";
  else if(/arco|ballesta/.test(source))glyph="◒";
  else if(/lanza/.test(source))glyph="↗";
  else if(/espada|katana|mandoble/.test(source))glyph="✦";
  else if(/motosierra/.test(source))glyph="✹";
  else if(/lanzallamas/.test(source))glyph="♨";
  else if(/escudo/.test(source))glyph="⬟";
  else if(/blindaje|armadura|protección/.test(source))glyph="▤";
  else if(/linterna|foco/.test(source))glyph="◉";
  else if(/botiqu/.test(source))glyph="✚";
  else if(/mochila/.test(source))glyph="▥";
  else if(/cuerda|gancho/.test(source))glyph="∿";
  else if(/vida|duro/.test(source))glyph="♥";
  else if(/atleta|parkour|escurr/.test(source))glyph="➜";
  else if(/miedo|paranoi|alucin|depres/.test(source))glyph="◐";
  else if(/sigil|furtiv|embosc/.test(source))glyph="◉";
  else if(/lider|inspir|táctic|tactic|confianza/.test(source))glyph="★";
  const mark=[...name.replace(/[^A-Za-zÁÉÍÓÚÜÑ0-9]/g,"")].slice(-1)[0]||"·";
  return `<span class="item-icon" aria-hidden="true"><span>${glyph}</span><small>${escapeHtml(mark.toUpperCase())}</small></span>`;
}

function parseWeaponProfile(name){
  const text=LAZARUS_DATA.weapons[name]?.text||"";
  const parts=text.split("·").map(v=>v.trim().replace(/\.$/,"")).filter(Boolean);
  const out={range:parts.shift()||"—",bonus:"—",damage:"—",dice:"—",special:[]};
  for(const part of parts){
    if(/^Daño\s+/i.test(part))out.damage=part.replace(/^Daño\s+/i,"");
    else if(/^\d+\s+dado/i.test(part))out.dice=part.match(/^\d+/)?.[0]||part;
    else if(/^[+\-]?\d*\s*\/\s*[+\-]?\d+$/.test(part)||/^[+\-]\d+$/.test(part))out.bonus=part;
    else out.special.push(part);
  }
  out.special=out.special.join(", ")||"—";
  return out;
}

function parseProtectionProfile(name){
  const text=LAZARUS_DATA.armorText[name]||"";
  const out={fire:"—",cc:"—",bites:"—",special:text||"—"};
  const rx=/(\d+)\s+contra\s+(armas de fuego|CC|Mordiscos)/gi; let m;
  while((m=rx.exec(text))){const type=m[2].toLowerCase();if(type.includes("fuego"))out.fire=m[1];else if(type==="cc")out.cc=m[1];else out.bites=m[1];}
  return out;
}

function fullRow(name,description,extra=""){
  return `<div class="visual-info-row">${iconBadge(name,description)}<div class="visual-info-copy"><div class="visual-info-title"><b>${escapeHtml(name)}</b>${extra}</div><p>${escapeHtml(description||"Consulta el reglamento.")}</p></div></div>`;
}

function weaponVisual(weapon){
  const desc=LAZARUS_DATA.weapons[weapon.name]?.text||""; const p=parseWeaponProfile(weapon.name); const ammo=ammoDescription(weapon);
  return `<div class="visual-item-card"><div class="visual-item-head">${iconBadge(weapon.name,desc)}<div><b>${escapeHtml(weapon.name)}</b>${ammo?`<span>${escapeHtml(ammo.replace(/^Munición:\s*/,""))}</span>`:""}</div></div><div class="visual-stat-table weapon-stats"><div><span>Alcance</span><b>${escapeHtml(p.range)}</b></div><div><span>Bono</span><b>${escapeHtml(p.bonus)}</b></div><div><span>Daño</span><b>${escapeHtml(p.damage)}</b></div><div><span>Dados</span><b>${escapeHtml(p.dice)}</b></div><div class="special"><span>Especial</span><b>${escapeHtml(p.special)}</b></div></div></div>`;
}

function protectionVisual(label,name){
  const desc=LAZARUS_DATA.armorText[name]||""; const p=parseProtectionProfile(name);
  return `<div class="visual-item-card"><div class="visual-item-head">${iconBadge(name,desc)}<div><span class="visual-kicker">${label}</span><b>${escapeHtml(name)}</b></div></div><div class="visual-stat-table protection-stats"><div><span>Fuego</span><b>${p.fire}</b></div><div><span>CC</span><b>${p.cc}</b></div><div><span>Mordiscos</span><b>${p.bites}</b></div><div class="special"><span>Especial</span><b>${escapeHtml(p.special)}</b></div></div></div>`;
}

function visualSection(title,content,klass=""){
  return `<section class="visual-section ${klass}"><div class="visual-section-title">${title}</div>${content||'<div class="visual-empty">—</div>'}</section>`;
}

sheetMember=function(member,index){
  const stats=effectiveStats(member);
  const traits=[];
  if(member.trait)traits.push(fullRow(member.trait,LAZARUS_DATA.traits[member.trait]?.text,`<span class="visual-points">${formatPoints(repeatedTraitCost(member))} pts</span>`));
  if(member.flaw)traits.push(fullRow(member.flaw,LAZARUS_DATA.flaws[member.flaw]?.text,`<span class="visual-points negative">-${formatPoints(repeatedFlawValue(member))} pts</span>`));
  const weapons=member.weapons.filter(w=>w.name).map(weaponVisual).join("");
  const protection=[]; if(member.armor)protection.push(protectionVisual("Indumentaria",member.armor)); if(member.shield)protection.push(protectionVisual("Escudo",member.shield));
  const gear=member.gear.filter(Boolean).map(item=>fullRow(item,LAZARUS_DATA.gearText[item])).join("");
  return `<article class="character-card"><header class="character-card-head"><div><h4>${escapeHtml(member.name||`${member.profile} ${index+1}`)}</h4><span>${escapeHtml(member.profile)}</span></div><div class="character-points"><b>${formatPoints(memberCost(member))}</b><span>PUNTOS</span></div></header>${visualSection("Atributos",`<div class="visual-attributes">${STAT_NAMES.map((n,i)=>`<div><span>${n}</span><b>${stats[i]??"-"}</b></div>`).join("")}</div>`,"attributes")}${visualSection("Dote / Defecto",traits.join(""))}${visualSection("Armas",weapons)}${visualSection("Protección",protection.join(""))}${visualSection("Equipo",gear)}</article>`;
};
renderSummary();