const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const context=vm.createContext({state:{bandKey:'civiles'},uid:()=>Math.random().toString(),assert});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../loadout-rules.js'),'utf8'),context);
vm.runInContext(`
const heavy={id:'heavy',name:'Arma CC Pesada',tool:true};
for(const key of ['civiles','pandilleros','sectarios','carroneros']){state.bandKey=key;assert.equal(toolCost(heavy),1);}
for(const key of ['laboratorios','desertores']){state.bandKey=key;assert.equal(toolUpgradePrice(heavy),null);assert.equal(toolCost(heavy),0);}
state.bandKey='civiles';
const rifle={id:'rifle',name:'Fusil .22'},pistol={id:'pistol',name:'Pistola Ligera'};
const m={weapons:[heavy,rifle,pistol],gear:['Mira Telescópica','Silenciador'],gearTargets:['rifle','pistol']};
assert.equal(compatibleWeapons(m,'Mira Telescópica').length,1);
assert.equal(attachmentWeapon(m,0),rifle);
m.weapons.shift();assert.equal(attachmentWeapon(m,0),rifle);assert.equal(attachmentWeapon(m,1),pistol);
clearWeaponLinks(m,rifle);rifle.name='Escopeta';assert.equal(attachmentWeapon(m,0),undefined);assert.equal(attachmentWeapon(m,1),pistol);
assert.equal(compatibleWeapons({weapons:[{name:'Pistola de Clavos'},{name:'Rifle Submarino'}]},'Silenciador').length,0);
assert.equal(compatibleWeapons({weapons:[{name:'Subfusil'},{name:'Carabina'},{name:'Fusil de Asalto'}]},'Visor Óptico').length,3);
assert.equal(toolWeapons({weapons:[heavy]}).length,1);clearWeaponLinks(m,heavy);assert.equal(toolWeapons({weapons:[heavy]}).length,0);
`,context);
console.log('Loadout rules passed');
