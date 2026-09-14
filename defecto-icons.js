// Biblioteca aprobada de iconos de Defectos. Basada únicamente en la lámina aprobada por el usuario.
// No modifica Dotes, armas, protección ni equipo.
(function(){
  const basePictogram = pictogram;
  const red = body => `<span class="defecto-icon" style="color:#ef2b32">${svgWrap(body)}</span>`;
  const icons = {
    "Activista Z":()=>red('<path d="M18 15c0-7 6-11 14-11s14 4 14 11v8c0 5-3 9-7 12v8H25v-8c-4-3-7-7-7-12z"/><circle cx="26" cy="21" r="3" fill="#111"/><circle cx="38" cy="21" r="3" fill="#111"/><path d="M27 29h10v5H27z" fill="#111"/><path d="M48 9c5-7 13-2 9 4l-9 9-9-9c-4-6 4-11 9-4z"/>'),
    "Adicción":()=>red('<path d="M13 49l30-30 5 5-30 30zM40 15l5-5 9 9-5 5zM10 45l9 9-4 4-9-9z"/><path d="M22 38l8 8M27 33l8 8M32 28l8 8" stroke="#111" stroke-width="2"/>'),
    "Alucinaciones":()=>red('<path d="M8 45c9-5 18-5 27 0s17 5 21 0c-6 10-15 12-25 7S14 49 8 53z"/><path d="M18 34c-6-8 6-11 0-19M30 34c-6-8 6-11 0-19M42 34c-6-8 6-11 0-19" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="51" cy="14" r="6"/><path d="M50 39v-12M46 31h8M50 27l5-5" stroke="currentColor" stroke-width="3"/>'),
    "Bajo de Forma":()=>red('<rect x="19" y="8" width="26" height="48" rx="2" fill="none" stroke="currentColor" stroke-width="5"/><path d="M27 4h10v5H27zM23 46h18v7H23z"/>'),
    "Cojo":()=>red('<circle cx="32" cy="10" r="6"/><path d="M24 18h16l2 19h-8v18h-7V37h-5z"/><path d="M34 37v10" stroke="#111" stroke-width="4"/>'),
    "Corto de vista":()=>red('<circle cx="20" cy="32" r="12" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="44" cy="32" r="12" fill="none" stroke="currentColor" stroke-width="5"/><path d="M32 30h0M8 29H4M60 29h-4" stroke="currentColor" stroke-width="5"/>'),
    "Depresivo":()=>red('<path d="M13 11c12-3 26-3 38 0v22c0 13-8 22-19 27-11-5-19-14-19-27z"/><path d="M21 25c3-3 6-3 9 0M34 25c3-3 6-3 9 0M23 43c5-6 13-6 18 0" fill="none" stroke="#111" stroke-width="4"/>'),
    "Egoísta":()=>red('<path d="M7 39l16-10 15 3-3 5 8 1 3 5-20 7-19-4z"/><path d="M45 12l4 6 7 1-5 5 1 7-7-3-6 3 1-7-5-5 7-1zM50 35l3 4 5 1-4 4 1 5-5-2-4 2 1-5-4-4 5-1z"/>'),
    "Gafe":()=>red('<path d="M32 27c-8-14-22-9-18 2 3 8 12 9 18 7-4 7-2 18 7 18 10 0 12-12 4-20 8 3 18-1 18-10 0-10-13-13-21 3z"/><path d="M34 35l-2 22" stroke="currentColor" stroke-width="4"/>'),
    "Honorable":()=>red('<circle cx="38" cy="12" r="6"/><path d="M28 20h18v35H24V31z"/><path d="M27 24L13 17l-3 5 15 10M13 17l5-6" fill="none" stroke="currentColor" stroke-width="6"/>'),
    "Imprudente":()=>red('<circle cx="41" cy="10" r="6"/><path d="M31 18l11 8 9-4 3 6-12 7-8-6-5 9 9 5-4 7-12-7-8 11H5l14-18 5-17z"/>'),
    "Lobo Solitario":()=>red('<circle cx="32" cy="16" r="7"/><circle cx="14" cy="23" r="5"/><circle cx="50" cy="23" r="5"/><path d="M21 53V36c0-8 4-13 11-13s11 5 11 13v17zM5 50V36c0-6 3-10 9-10 4 0 7 2 9 5-2 4-3 9-3 15v4zM44 50v-4c0-6-1-11-3-15 2-3 5-5 9-5 6 0 9 4 9 10v14z"/><path d="M23 34l18 18M41 34L23 52" stroke="#111" stroke-width="5"/>'),
    "Mal Olor":()=>red('<path d="M18 53c-8-11 8-15 0-27S25 12 21 4M32 53c-8-11 8-15 0-27S39 12 35 4M46 53c-8-11 8-15 0-27S53 12 49 4" fill="none" stroke="currentColor" stroke-width="5"/>'),
    "Manco":()=>red('<path d="M19 55V34h-5V18h7v13h4V11h7v20h4V8h7v23h4V15h7v24c0 10-8 17-18 17z"/><path d="M12 52L53 11" stroke="#111" stroke-width="6"/>'),
    "Miedoso":()=>red('<path d="M12 36l14-14 7 7 12-12 8 8-12 12 7 7-14 14-8-8-8 8-8-8 8-8z"/><path d="M29 24l6-6M39 38l7-7" stroke="#111" stroke-width="3"/>'),
    "Paranoico":()=>red('<path d="M9 32c8-7 8-15 16-11 4-9 13-9 17-1 9-4 15 4 12 11 8 5 3 15-5 15-3 9-14 9-18 2-8 6-17-1-14-9-8-1-10-9-8-7z" fill="none" stroke="currentColor" stroke-width="5"/><path d="M17 18l31 30M48 17L17 48" stroke="currentColor" stroke-width="3" opacity=".5"/>'),
    "Rencoroso":()=>red('<path d="M13 56V31c0-14 8-23 19-23s19 9 19 23v25z" fill="none" stroke="currentColor" stroke-width="5"/><path d="M28 17c7-3 13 1 15 7l-6 2 5 5-7 2" fill="none" stroke="currentColor" stroke-width="4"/><path d="M39 16l4-5M44 20l7-2" stroke="currentColor" stroke-width="3"/>'),
    "Suicida":()=>red('<path d="M32 7c13 0 20 9 20 20 0 8-4 13-9 17v11h-7v-8h-8v8h-7V44c-5-4-9-9-9-17C12 16 19 7 32 7z"/><circle cx="24" cy="28" r="5" fill="#111"/><circle cx="40" cy="28" r="5" fill="#111"/><path d="M27 39h10l-2 5h-6z" fill="#111"/>'),
    "Turbio":()=>red('<path d="M14 23h36l-5-9H19zM18 26h28v8H18zM20 34h24v22H20z"/><path d="M23 33h18" stroke="#111" stroke-width="4"/>'),
    "Viejo":()=>red('<circle cx="39" cy="10" r="5"/><path d="M31 18h12l2 35h-9l-2-20-5 20h-9l7-26z"/><path d="M45 30c9 0 10 8 10 14v13" fill="none" stroke="currentColor" stroke-width="4"/>')
  };
  pictogram=function(name,text=""){ return icons[name] ? icons[name]() : basePictogram(name,text); };
  if(typeof renderSummary==="function") renderSummary();
})();