const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = vm.createContext({assert, document:{querySelector:()=>({})}});
for (const file of ['data.js','loadout-rules.js','band-rules.js','app.js']) {
  let source=fs.readFileSync(path.join(__dirname,'..',file),'utf8');
  if(file==='app.js')source=source.split('el.bandName.addEventListener')[0];
  vm.runInContext(source,context);
}
vm.runInContext(`
function make(profile, weapons=[]) {
  return {id:uid(), profile, trait:'', flaw:'', armor:'', shield:'', weapons:weapons.map(name=>({id:uid(),name,ammoBlocks:1})),gear:['']};
}
assert.equal(Object.keys(LAZARUS_DATA.bands).length,7);
for(const b of Object.values(LAZARUS_DATA.bands)) {
  for(const [section,catalog] of [['traits','traits'],['flaws','flaws'],['weapons','weapons'],['armor','armorText'],['gear','gearText']]) {
    for(const [name,cost] of Object.entries(b[section])) {
      assert.ok(Object.hasOwn(LAZARUS_DATA[catalog],name),name);
      assert.ok(Number.isFinite(cost),name);
    }
  }
}
assert.ok(!Object.hasOwn(LAZARUS_DATA.weapons,'Fusil de Combate'));
assert.ok(!Object.hasOwn(LAZARUS_DATA.traits,'Conductor experto'));
assert.match(LAZARUS_DATA.traits['Mecánico'].text,/arrancarlos/);
state.bandKey='civiles';
const leader=make('Líder',['Granada de mano','Granada de mano','Granada de mano']);
state.members=[leader];
assert.equal(memberCost(leader),86); // 50 + 8 + 12 + 16, per-unit scarce purchases.
leader.weapons.pop();
assert.equal(memberCost(leader),70);
leader.weapons=[{name:'Fusil .22 Semiautomático',ammoBlocks:3}];
assert.equal(memberCost(leader),63); // 50 + 11 + two additional ammunition packs.
assert.match(weaponRuleText(leader.weapons[0]),/Semiautomático/);
const child=make('Chico');
assert.equal(allowedWeapon(child,'Pistola Ligera'),true);
assert.equal(allowedWeapon(child,'Fusil .22'),false);
assert.equal(allowedTrait(child,'Sigiloso'),true);
assert.equal(allowedTrait(child,'Akimbo'),false);
assert.equal(allowedTrait(make('Secuaz'),'Inspirador'),false);
assert.equal(allowedTrait(leader,'Inspirador'),true);
const heavy={name:'Arma a dos manos',tool:false};
assert.doesNotMatch(weaponRuleText(heavy),/Herramienta/);
heavy.tool=true;
assert.match(weaponRuleText(heavy),/Herramienta\+/);
state.bandKey='desertores';
assert.match(weaponRuleText({name:'Carabina'}),/Bayoneta/);
assert.equal(band().weapons['Fusil de Francotirador'],16);
assert.ok(!Object.hasOwn(band().flaws,'Adicción III'));
state.bandKey='laboratorios';
const chief=make('Científico jefe');
const quisling=make('Quisling');
state.members=[chief,quisling];
normalizeProfile(quisling);
assert.equal(quisling.armor,'Protección ligera');
assert.equal(memberCost(quisling),35);
assert.ok(validateBandRules().some(text=>text.includes('cuidador')));
quisling.caretakerId=chief.id;
assert.equal(validateBandRules().length,0);
state.members.push(make('Sujeto Experimental'));
assert.ok(validateBandRules().some(text=>text.includes('misma banda')));
chief.trait='Pirómano';
chief.weapons=[{name:'Lanzallamas',ammoBlocks:1}];
assert.equal(repeatedTraitCost(chief),10);
state.bandKey='ninos';
const dog=make('Peludo');
dog.armor='Protección ligera';
dog.trait='Grande';
state.members=[dog];
assert.equal(memberCost(dog),28);
assert.deepEqual(effectiveStats(dog),[5,'-',5,6,3,6,3]);
assert.equal(allowedTrait(dog,'Protector'),true);
assert.equal(allowedTrait(dog,'Artes Marciales'),false);
assert.equal(ammoRule('Honda').size,5);
assert.equal(band().profiles.Mayor.cost,40);
`, context);
console.log('Drive band update, equipment costs, restrictions and profiles passed');
