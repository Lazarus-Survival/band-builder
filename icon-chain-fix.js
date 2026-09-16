(function installApprovedCardIcons(){
const DOTES={
"Acechante Nocturno":"acechante-nocturno.png",
"Artes Marciales":"artes-marciales.png",
"Atleta":"atleta.png",
"Ave de Carroña":"ave-de-carrona.png",
"Berserker":"berserker.png",
"Cazador de Zombis":"cazador-de-zombis.png",
"Conductor experto":"conductor-experto.png",
"Conocimiento de la situación":"conocimiento-de-la-situacion.png",
"Desarmar":"desarmar.png",
"Despiadado":"despiadado.png",
"Duelista":"duelista.png",
"Duro de Pelar":"duro-de-pelar.png",
"Emboscador":"emboscador.png",
"Entrenado":"entrenado.png",
"Especialista en entradas":"especialista-en-entradas.png",
"Esquiva":"esquiva.png",
"Explorador":"explorador.png",
"Fanático":"fanatico.png",
"Furtivo":"furtivo.png",
"Hombre de Confianza":"hombre-de-confianza.png",
"Inspirador":"inspirador.png",
"Ladrón de Coches":"ladron-de-coches.png",
"Mártir":"martir.png",
"Matador de Zombis":"matador-de-zombis.png",
"Nervios de Acero":"nervios-de-acero.png",
"Parkour":"parkour.png",
"Pistolero":"pistolero.png",
"Primeros Auxilios":"primeros-auxilios.png",
"Puntería":"punteria.png",
"Reacción rápida":"reaccion-rapida.png",
"Sigiloso":"sigiloso.png",
"Táctico":"tactico.png",
"Vista de águila":"vista-de-aguila.png"
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

const dote=DOTES[name];

if(dote){
return `<span class="item-icon" aria-hidden="true"><img src="assets/dotes/${dote}" width="50" height="50" style="display:block;width:50px;height:50px;object-fit:fill;" alt=""></span>`;
}

return `<span class="item-icon" aria-hidden="true">${fallbackPictogram(name,text)}</span>`;
};

renderSummary();

},50);

})();
