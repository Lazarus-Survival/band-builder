// Band PDFs and Chapter 5, reviewed 2026-09-20; see docs/loadout-rules.md.
const TOOL_UPGRADE_COST={civiles:1,pandilleros:1,sectarios:1,carroneros:1};
const TOOL_TEXT='+2 a los chequeos de romper';
const ATTACHMENT_WEAPONS={
  'Silenciador':['Pistola .22','Pistola Ligera','Pistola Pesada','Pistola Ametralladora','Subfusil','Fusil .22','Fusil de Caza','Fusil de Combate','Fusil Militar','Fusil de Asalto','Carabina'],
  'Visor Óptico':['Subfusil','Carabina','Fusil de Asalto'],
  'Mira Telescópica':['Fusil .22','Fusil de Caza','Fusil Militar','Fusil de Combate']
};
function toolUpgradePrice(weapon){return weapon.name==='Arma CC Pesada'?TOOL_UPGRADE_COST[state.bandKey]??null:null;}
function toolCost(weapon){return weapon.tool?(toolUpgradePrice(weapon)??0):0;}
function weaponRuleText(weapon){
  const text=LAZARUS_DATA.weapons[weapon.name]?.text||'';
  return weapon.name==='Arma CC Pesada'&&!toolCost(weapon)?text.replace(/,?\s*Herramienta\b/g,''):text;
}
function toolWeapons(member){return member.weapons.filter(w=>w.tool&&toolUpgradePrice(w)!==null);}
function ensureLoadoutIds(member){member.weapons.forEach(w=>{if(!w.id)w.id=uid();});member.gearTargets??=[];}
function compatibleWeapons(member,item){return member.weapons.filter(w=>ATTACHMENT_WEAPONS[item]?.includes(w.name));}
function attachmentWeapon(member,index){return compatibleWeapons(member,member.gear[index]).find(w=>w.id===member.gearTargets?.[index]);}
function weaponAttachments(member,weapon){return member.gear.filter((item,index)=>attachmentWeapon(member,index)===weapon);}
function clearWeaponLinks(member,weapon){member.gearTargets=(member.gearTargets||[]).map(id=>id===weapon.id?'':id);weapon.tool=false;}
function attachmentSelector(member,item,index){
  if(!ATTACHMENT_WEAPONS[item])return '';
  const candidates=compatibleWeapons(member,item), selected=attachmentWeapon(member,index)?.id||'';
  return '<label>Acoplar a<select class="attachment-select" data-index="'+index+'"><option value="">'+(candidates.length?'Elige un arma':'Sin armas compatibles')+'</option>'+candidates.map(w=>'<option value="'+escapeHtml(w.id)+'"'+(w.id===selected?' selected':'')+'>'+escapeHtml(w.name)+' · Arma '+(member.weapons.indexOf(w)+1)+'</option>').join('')+'</select></label>';
}
function bindLoadoutExtras(card,member){
  card.querySelectorAll('.tool-upgrade').forEach(input=>input.addEventListener('change',()=>{const weapon=member.weapons[Number(input.dataset.index)];weapon.tool=input.checked&&toolUpgradePrice(weapon)!==null;render();}));
  card.querySelectorAll('.attachment-select').forEach(select=>select.addEventListener('change',()=>{const index=Number(select.dataset.index);member.gearTargets[index]=compatibleWeapons(member,member.gear[index]).some(w=>w.id===select.value)?select.value:'';render();}));
}
