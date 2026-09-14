function svgWrap(body){return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">${body}</svg>`;}
function pictogram(name,text=""){
  const source=`${name} ${text}`.toLowerCase();
  if(/fusil|carabina/.test(source)) return svgWrap('<path d="M6 30h31l6-6h5v4h10v8H47l-5-4h-7l-5 7h-8l3-7H6z"/><rect x="11" y="35" width="16" height="5" rx="1"/><path d="M21 40l5 13h7l-2-13z"/>');
  if(/pistola/.test(source)) return svgWrap('<path d="M12 21h34v15H28l5 20H21l-6-20h-3z"/><rect x="38" y="17" width="11" height="5" rx="2"/>');
  if(/escopeta/.test(source)) return svgWrap('<path d="M5 27h45l9 5-9 5H30l-6 9H13l7-9H5z"/><rect x="37" y="24" width="15" height="4" rx="1"/>');
  if(/subfusil|ametralladora/.test(source)) return svgWrap('<path d="M7 25h38l10 7-10 7H31l-4 11H16l4-11H7z"/><rect x="34" y="20" width="8" height="5"/><path d="M30 39l7 12h7l-3-12z"/>');
  if(/arco|ballesta/.test(source)) return svgWrap('<path d="M18 8c18 8 18 40 0 48M46 8c-18 8-18 40 0 48M18 8l28 48M46 8L18 56" fill="none" stroke="currentColor" stroke-width="5"/><path d="M31 10h3v44h-3z"/>');
  if(/motosierra/.test(source)) return svgWrap('<rect x="11" y="24" width="30" height="17" rx="4"/><path d="M41 27h12l5 5-5 5H41zM17 41h9v10h-9z"/><circle cx="22" cy="32" r="4"/>');
  if(/katana|mandoble|espada/.test(source)) return svgWrap('<path d="M44 7l8 8-28 28-8-8zM13 39l12 12-5 5L8 44zM29 45l7 7-3 3-7-7z"/>');
  if(/lanza/.test(source)) return svgWrap('<path d="M11 50L47 14l6 6-36 36z"/><path d="M45 8l11 11-17 5z"/>');
  if(/lanzallamas/.test(source)) return svgWrap('<path d="M7 28h28v12H7zM35 31h13v6H35z"/><path d="M48 24c7 3 9 7 7 12-2 4-6 6-10 4 4-3 4-6 0-9 4 0 6-3 3-7z"/><rect x="15" y="40" width="7" height="12"/>');
  if(/escudo bal/.test(source)) return svgWrap('<path d="M32 6l21 7v16c0 14-9 24-21 29C20 53 11 43 11 29V13z"/><path d="M32 12v38" fill="none" stroke="white" stroke-width="4" opacity=".55"/>');
  if(/escudo/.test(source)) return svgWrap('<path d="M14 10h36v31L32 57 14 41z"/><rect x="29" y="14" width="6" height="35" fill="white" opacity=".5"/>');
  if(/blindaje|armadura|protección ligera/.test(source)) return svgWrap('<path d="M19 8l10 6h6l10-6 8 9-6 9v28H17V26l-6-9z"/><path d="M24 16h16v33H24z" fill="white" opacity=".2"/>');
  if(/visor óptico|mira telescópica/.test(source)) return svgWrap('<rect x="8" y="25" width="42" height="14" rx="7"/><rect x="45" y="21" width="10" height="22" rx="3"/><path d="M18 22v20M31 22v20" fill="none" stroke="white" stroke-width="3" opacity=".55"/>');
  if(/linterna/.test(source)) return svgWrap('<path d="M10 24h28v16H10zM38 20h10l8 12-8 12H38z"/><circle cx="48" cy="32" r="7" fill="white" opacity=".5"/>');
  if(/foco/.test(source)) return svgWrap('<rect x="9" y="19" width="28" height="26" rx="4"/><path d="M37 23l18-8v34l-18-8z"/><circle cx="22" cy="32" r="8" fill="white" opacity=".45"/>');
  if(/botiqu/.test(source)) return svgWrap('<rect x="9" y="16" width="46" height="36" rx="6"/><rect x="24" y="23" width="16" height="22" fill="white"/><rect x="21" y="27" width="22" height="14" fill="white"/>');
  if(/mochila/.test(source)) return svgWrap('<rect x="15" y="18" width="34" height="38" rx="8"/><path d="M23 18c0-7 18-7 18 0M11 27h6v22h-6M47 27h6v22h-6" fill="none" stroke="currentColor" stroke-width="5"/>');
  if(/cuerda|gancho/.test(source)) return svgWrap('<path d="M14 12c18 0 18 18 4 18S4 49 21 52s25-14 13-22" fill="none" stroke="currentColor" stroke-width="6"/><path d="M40 10v18c0 8 10 8 10 0" fill="none" stroke="currentColor" stroke-width="6"/>');
  if(/punter|disparo/.test(source)) return svgWrap('<circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="32" cy="32" r="5"/><path d="M32 5v13M32 46v13M5 32h13M46 32h13" stroke="currentColor" stroke-width="5"/>');
  if(/artes marciales/.test(source)) return svgWrap('<path d="M17 13h8v15h5V9h8v19h5V14h8v25c0 11-8 18-18 18S15 50 15 39V25h8v10h4V13z"/>');
  if(/lobo solitario/.test(source)) return svgWrap('<path d="M8 28l9-14 10 7 5-14 6 14 10-7 8 14-7 24-17 7-17-7z"/><circle cx="24" cy="35" r="3" fill="white"/><circle cx="40" cy="35" r="3" fill="white"/><path d="M26 46h12l-6 5z" fill="white"/>');
  if(/atleta|parkour/.test(source)) return svgWrap('<circle cx="38" cy="11" r="6"/><path d="M31 20l10 9-7 9 11 14h-9l-9-11-7 7H8l15-17 3-11z"/>');
  if(/duro de pelar/.test(source)) return svgWrap('<path d="M32 56S10 44 10 25c0-9 6-15 14-15 5 0 8 3 8 3s3-3 8-3c8 0 14 6 14 15 0 19-22 31-22 31z"/><path d="M29 18h6v10h10v6H35v10h-6V34H19v-6h10z" fill="white"/>');
  if(/miedoso|paranoi|alucin|depres/.test(source)) return svgWrap('<circle cx="32" cy="26" r="18"/><path d="M18 49c4-10 24-10 28 0v8H18z"/><circle cx="25" cy="25" r="3" fill="white"/><circle cx="39" cy="25" r="3" fill="white"/><path d="M24 35c5-4 11-4 16 0" fill="none" stroke="white" stroke-width="3"/>');
  if(/sigil|furtiv|embosc/.test(source)) return svgWrap('<path d="M6 32c8-12 18-18 26-18s18 6 26 18c-8 12-18 18-26 18S14 44 6 32z"/><circle cx="32" cy="32" r="9" fill="white"/><circle cx="32" cy="32" r="4"/>');
  if(/berserker|despiadado|matador/.test(source)) return svgWrap('<path d="M16 8l12 17-8 5 15 26 13-18-8-5 10-15-18 7z"/>');
  if(/líder|lider|inspirador|táctico|tactico|confianza/.test(source)) return svgWrap('<path d="M32 6l7 14 16 2-12 11 4 16-15-8-15 8 4-16L9 22l16-2z"/>');
  if(/manco/.test(source)) return svgWrap('<path d="M20 9h9v21l7-6 6 6-14 14H20zM13 48h38v8H13z"/>');
  if(/cojo|bajo de forma|viejo/.test(source)) return svgWrap('<circle cx="37" cy="11" r="6"/><path d="M32 20l10 9-5 10 8 14h-9l-8-12-8 10H9l14-17 3-14z"/><path d="M8 57l48-48" stroke="white" stroke-width="5"/>');
  if(/adicción|suicida/.test(source)) return svgWrap('<path d="M18 11h28v42H18z"/><path d="M23 18h18v8H23zM26 31h12v15H26z" fill="white" opacity=".5"/>');
  return svgWrap('<circle cx="32" cy="32" r="22"/><path d="M32 15l5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1z" fill="white" opacity=".72"/>');
}
function iconBadge(name,text=""){return `<span class="item-icon" aria-hidden="true">${pictogram(name,text)}</span>`;}

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