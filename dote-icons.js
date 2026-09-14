// Biblioteca aprobada de iconos de Dotes. No modifica Defectos, armas, protección ni equipo.
(function(){
  const basePictogram = pictogram;
  const icon = body => svgWrap(body);
  const icons = {
    "Acechante Nocturno": () => icon('<path d="M18 16l-8-6 3 16c-4 5-5 11-3 17 3 9 11 15 22 15s19-6 22-15c2-6 1-12-3-17l3-16-8 6c-4-3-9-5-14-5s-10 2-14 5z" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="24" cy="32" r="7" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="40" cy="32" r="7" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="24" cy="32" r="2"/><circle cx="40" cy="32" r="2"/><path d="M29 42l3-4 3 4-3 4z"/>'),
    "Artes Marciales": () => icon('<circle cx="39" cy="11" r="5"/><path d="M32 18l9 8 9-4 3 5-12 7-8-6-5 8 8 5-3 6-11-7-8 11-7-4 14-23z"/><path d="M27 28L14 22l2-6 15 5z"/>'),
    "Atleta": () => icon('<circle cx="39" cy="10" r="6"/><path d="M31 18l11 8-5 9 12 7-4 7-15-9-5 7H12l12-14 2-13z"/><path d="M27 25l-13 6-3-6 17-9z"/>'),
    "Ave de Carroña": () => icon('<path d="M9 16c15-8 31-6 42 3-7 2-11 6-13 11 8 2 13 7 15 15-8-3-15-3-21 0-8 4-15 3-21-2 9-3 14-8 15-15-6-2-12-6-17-12z"/><path d="M46 19l10-3-6 7z" fill="white" opacity=".8"/>'),
    "Berserker": () => icon('<path d="M12 18l8-9 7 7 5-9 5 9 7-7 8 9-5 8c4 4 6 9 6 15 0 10-9 18-21 18S11 51 11 41c0-6 2-11 6-15z"/><circle cx="24" cy="35" r="3" fill="white"/><circle cx="40" cy="35" r="3" fill="white"/><path d="M20 47c7-6 17-6 24 0l-4 6-5-4-3 6-3-6-5 4z" fill="white"/>'),
    "Cazador de Zombis": () => icon('<path d="M20 12c4-5 20-5 24 0l4 8-3 17-7 5v10h-5v-8h-4v8h-5V42l-7-5-3-17z"/><circle cx="25" cy="27" r="4" fill="white"/><circle cx="39" cy="27" r="4" fill="white"/><path d="M27 36h10l-2 5h-6z" fill="white"/><path d="M33 8l4 7-5 4 7 4-5 5" fill="none" stroke="white" stroke-width="3"/>'),
    "Conductor experto": () => icon('<circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="32" cy="32" r="6"/><path d="M32 26V12M27 35L15 45M37 35l12 10" stroke="currentColor" stroke-width="6"/>'),
    "Conocimiento de la situación": () => icon('<circle cx="21" cy="35" r="10" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="43" cy="35" r="10" fill="none" stroke="currentColor" stroke-width="5"/><path d="M14 27l5-13h8l3 15M50 27l-5-13h-8l-3 15M28 33h8" fill="none" stroke="currentColor" stroke-width="5"/>'),
    "Desarmar": () => icon('<path d="M19 55V35h-5V20h7v12h4V13h7v19h4V10h7v22h4V17h7v23c0 10-8 17-18 17z"/>'),
    "Despiadado": () => icon('<path d="M32 7c13 0 20 9 20 20 0 8-4 13-9 17v11h-7v-8h-8v8h-7V44c-5-4-9-9-9-17C12 16 19 7 32 7z"/><circle cx="24" cy="28" r="4" fill="white"/><circle cx="40" cy="28" r="4" fill="white"/><path d="M28 38h8l-4 5z" fill="white"/>'),
    "Duelista": () => icon('<path d="M49 7l6 6-31 31-6-6zM14 36l14 14-5 5L9 41z"/><path d="M29 45l8 8-3 3-8-8z"/>'),
    "Duro de Pelar": () => icon('<path d="M11 44c5-8 9-11 15-12-2-6 0-13 5-17 4 4 5 8 4 13 5-5 11-6 17-2-2 7-7 12-14 14 4 2 8 6 10 12H21c-5 0-8-3-10-8z"/><path d="M25 31c5 3 11 3 16 0" fill="none" stroke="white" stroke-width="3"/>'),
    "Emboscador": () => icon('<path d="M5 49c5-13 11-18 18-17-3-9 1-16 9-22 5 7 6 14 3 21 8-8 17-7 25 2-7 2-10 6-11 11 5 1 8 4 10 9H5z"/><path d="M12 45l9-8M23 49l8-12M35 48l10-12M47 48l7-8" stroke="white" stroke-width="2" opacity=".45"/>'),
    "Entrenado": () => icon('<path d="M9 39c2-17 10-28 23-28s21 11 23 28H9z"/><path d="M14 39h42v7H8c0-4 2-7 6-7z"/><path d="M32 13v25" stroke="white" stroke-width="3" opacity=".35"/>'),
    "Escurridizo": () => icon('<circle cx="39" cy="11" r="5"/><path d="M32 18l10 9-7 9 12 13h-9l-9-10-7 8H9l14-16 3-12z"/><path d="M14 55h39" stroke="currentColor" stroke-width="4" stroke-dasharray="5 4"/>'),
    "Especialista en entradas": () => icon('<circle cx="20" cy="37" r="9" fill="none" stroke="currentColor" stroke-width="6"/><path d="M26 31l24-24 8 8-7 7-4-4-5 5 4 4-6 6-4-4-8 8z"/>'),
    "Esquiva": () => icon('<path d="M8 34c11-15 24-21 40-18l-8-8 6-5 17 17-17 17-6-5 8-8c-14-2-24 2-34 14z"/>'),
    "Explorador": () => icon('<path d="M12 12l13-5 14 5 13-5v45l-13 5-14-5-13 5z" fill="none" stroke="currentColor" stroke-width="4"/><path d="M25 7v45M39 12v45M17 22l6-4 6 5 6-8 7 6 6-4M18 42l8-5 7 4 8-9 7 5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="43" cy="24" r="3"/>'),
    "Fanático": () => icon('<path d="M34 5c5 10 2 15-2 20 8-4 12-10 12-17 10 10 14 21 9 32-4 11-12 18-22 18-12 0-21-8-22-20-1-10 5-18 13-26-1 8 2 12 6 15 1-8 2-14 6-22z"/>'),
    "Furtivo": () => icon('<path d="M17 55V38c0-9 6-17 15-19-4-2-7-6-7-11h14c0 5-3 9-7 11 9 2 15 10 15 19v17z"/><path d="M19 30c8-7 18-7 26 0" fill="none" stroke="white" stroke-width="3" opacity=".55"/>'),
    "Hombre de Confianza": () => icon('<circle cx="23" cy="21" r="8"/><circle cx="43" cy="21" r="8"/><path d="M8 51c1-12 7-19 15-19 5 0 9 3 11 8 2-5 5-8 10-8 8 0 13 7 14 19z"/><path d="M25 40l6 6 12-13" fill="none" stroke="white" stroke-width="4"/>'),
    "Inspirador": () => icon('<circle cx="32" cy="17" r="8"/><circle cx="15" cy="25" r="6"/><circle cx="49" cy="25" r="6"/><path d="M20 53V39c0-8 5-13 12-13s12 5 12 13v14zM4 53V39c0-6 4-10 10-10 4 0 7 2 9 5-2 4-3 9-3 15v4zM44 53v-4c0-6-1-11-3-15 2-3 5-5 9-5 6 0 10 4 10 10v14z"/>'),
    "Ladrón de Coches": () => icon('<path d="M10 31l6-13h32l6 13 5 4v14h-6v6h-7v-6H18v6h-7v-6H5V35z"/><path d="M18 22l-4 10h36l-4-10z" fill="white" opacity=".65"/><circle cx="17" cy="40" r="4" fill="white"/><circle cx="47" cy="40" r="4" fill="white"/>'),
    "Mártir": () => icon('<path d="M28 7h8v18h13v8H36v24h-8V33H15v-8h13z"/>'),
    "Matador de Zombis": () => icon('<path d="M19 17c5-7 21-7 26 0l3 10-4 13-7 5v10h-5v-8h-4v8h-5V45l-7-5-3-13z"/><circle cx="24" cy="31" r="4" fill="white"/><circle cx="39" cy="31" r="4" fill="white"/><path d="M27 39h10l-2 5h-6z" fill="white"/><path d="M38 7l6 5-8 10-5-4zM43 12l9 8-4 5-9-8z"/>'),
    "Nervios de Acero": () => icon('<path d="M9 34l13-13 8 8 12-12 13 13-9 9 9 9-8 8-13-13-12 12-13-13 9-8z"/>'),
    "Parkour": () => icon('<circle cx="36" cy="10" r="5"/><path d="M29 18l11 7 9-5 3 6-12 8-7-5-5 8 9 5-4 7-12-7-7 10H5l14-18 4-14z"/><path d="M43 53h15V39H48v7h-5z"/>'),
    "Pistolero": () => icon('<path d="M10 20h39v15H29l5 21H21l-6-21h-5z"/><rect x="40" y="16" width="12" height="5" rx="2"/>'),
    "Primeros Auxilios": () => icon('<rect x="8" y="18" width="48" height="36" rx="5"/><path d="M24 18v-7h16v7" fill="none" stroke="currentColor" stroke-width="5"/><rect x="28" y="25" width="8" height="22" fill="white"/><rect x="21" y="32" width="22" height="8" fill="white"/>'),
    "Puntería": () => icon('<circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="32" cy="32" r="3"/><path d="M32 5v15M32 44v15M5 32h15M44 32h15" stroke="currentColor" stroke-width="4"/>'),
    "Reacción rápida": () => icon('<circle cx="35" cy="34" r="16" fill="none" stroke="currentColor" stroke-width="5"/><path d="M35 34l9-9M30 8h12M36 8v8M12 24h12M8 34h12M12 44h12" fill="none" stroke="currentColor" stroke-width="5"/>'),
    "Sigiloso": () => icon('<path d="M13 20h14l5 7 5-7h14l-6 11c5 4 8 10 8 18H11c0-8 3-14 8-18z"/><path d="M18 47c8-6 20-6 28 0" fill="none" stroke="white" stroke-width="3" opacity=".5"/>'),
    "Táctico": () => icon('<circle cx="17" cy="45" r="5" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="46" cy="18" r="5" fill="none" stroke="currentColor" stroke-width="4"/><path d="M21 42c7-2 12-6 15-12l3-6M34 15l7 3-2 7M9 13l10 10M19 13L9 23M45 42l10 10M55 42L45 52" fill="none" stroke="currentColor" stroke-width="4"/>'),
    "Vista de águila": () => icon('<path d="M5 31c12-17 28-24 50-16-5 3-9 7-11 12 6 0 11 2 15 6-8 1-14 4-19 10-6 8-16 12-29 10 7-4 12-9 15-15-8 2-15 0-21-7z"/><circle cx="43" cy="24" r="3" fill="white"/>')
  };

  pictogram = function(name, text="") {
    const draw = icons[name];
    return draw ? draw() : basePictogram(name, text);
  };

  // La ficha pudo renderizarse antes de cargar esta biblioteca.
  if (typeof render === "function") render();
})();
