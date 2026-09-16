(function installApprovedCardIcons(){
const POS={
"Acechante Nocturno":[0,0],"Artes Marciales":[1,0],"Atleta":[2,0],"Ave de Carroña":[3,0],"Berserker":[4,0],"Cazador de Zombis":[5,0],"Conductor experto":[6,0],"Conocimiento de la situación":[7,0],"Desarmar":[8,0],"Despiadado":[9,0],"Duelista":[10,0],
"Duro de Pelar":[0,1],"Emboscador":[1,1],"Entrenado":[2,1],"Especialista en entradas":[3,1],"Esquiva":[4,1],"Explorador":[5,1],"Fanático":[6,1],"Furtivo":[7,1],"Hombre de Confianza":[8,1],"Inspirador":[9,1],"Ladrón de Coches":[10,1],
"Mártir":[0,2],"Matador de Zombis":[1,2],"Nervios de Acero":[2,2],"Parkour":[3,2],"Pistolero":[4,2],"Primeros Auxilios":[5,2],"Puntería":[6,2],"Reacción rápida":[7,2],"Sigiloso":[8,2],"Táctico":[9,2],"Vista de águila":[10,2]
};

const DEFECTOS={
"Activista Z":"activista-z.png",
"Adicción":"adiccion.png",
"Alucinaciones":"alucinaciones.png",
"Bajo de Forma":"bajo-de-forma.png",
"Cojo":"cojo.png",
"Corto de vista":"corto-de-vista.png",
"Depresivo":"depresivo.png",
"Egoísta":"egoista.png",
"Gafe":"gafe.png",
"Honorable":"honorable.png",
"Imprudente":"imprudente.png",
"Lobo Solitario":"lobo-solitario.png",
"Mal Olor":"mal-olor.png",
"Manco":"manco.png",
"Miedoso":"miedoso.png",
"Paranoico":"paranoico.png",
"Rencoroso":"rencoroso.png",
"Suicida":"suicida.png",
"Turbio":"turbio.png",
"Viejo":"viejo.png"
};

let tries=0;

const timer=setInterval(()=>{
tries++;

if(
typeof iconBadge!=="function" ||
typeof pictogram!=="function" ||
typeof renderSummary!=="function" ||
!window.APPROVED_ICON_SPRITE
){
if(tries>=200){
clearInterval(timer);
console.error("No se pudo inicializar la ficha visual antes de instalar los iconos aprobados.");
}
return;
}

clearInterval(timer);

const fallbackPictogram=pictogram;

iconBadge=function(name,text=""){

const defecto=DEFECTOS[name];

if(defecto){
return `<span class="item-icon" aria-hidden="true"><img src="assets/defectos/${defecto}" width="50" height="50" style="display:block;width:50px;height:50px;object-fit:fill;" alt=""></span>`;
}

const p=POS[name];

if(p){
const x=p[0]*50;
const y=p[1]*50;

return `<span class="item-icon" aria-hidden="true"><span style="display:block;width:50px;height:50px;background-image:url('${window.APPROVED_ICON_SPRITE}');background-repeat:no-repeat;background-size:550px 250px;background-position:-${x}px -${y}px"></span></span>`;
}

return `<span class="item-icon" aria-hidden="true">${fallbackPictogram(name,text)}</span>`;
};

renderSummary();

},50);

})();
