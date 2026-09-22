const LAZARUS_DATA = {
  traits: {
    "": { cost: 0, text: "Sin dote." },
    "Artes Marciales": { text: "Repite fallos al impactar y dañar en cuerpo a cuerpo." },
    "Atleta": { text: "+2 PR." },
    "Ave de Carroña": { text: "Repite la tirada de botín." },
    "Berserker": { text: "+1 ataque en CC; debe ser la última acción gastada." },
    "Cazador de Zombis": { text: "Repite tirada para dañar a zombis con arco, ballesta o arpón submarino." },
    "Conductor experto": { text: "+2 a chequeos de Conducir y esquivar con un vehículo." },
    "Conocimiento de la situación": { text: "+2 a la tirada de Iniciativa si no está el líder; +1 si está presente." },
    "Desarmar": { text: "Tras impactar en CC puede realizar un chequeo de FUE enfrentado para hacer perder un arma al rival." },
    "Despiadado": { text: "Repite tiradas de dañar en CC." },
    "Duelista": { text: "No aplica el penalizador al combinar arma ligera con otra arma permitida." },
    "Duro de Pelar": { text: "+1 Vida." },
    "Emboscador": { text: "Repite toda tirada para dañar a humanos o perros si ataca estando Oculto." },
    "Entrenado": { text: "Repite un resultado de Pifia en una tirada de Disparo." },
    "Escurridizo": { text: "Usa INI en lugar de FUE contra ataque de Turba de zombis." },
    "Especialista en entradas": { text: "+1 al forzar puertas o ventanas." },
    "Esquiva": { text: "-1 a ser impactado en CC." },
    "Explorador": { text: "La banda puede mover 3D6 cm antes de determinar la iniciativa del primer turno." },
    "Fanático": { text: "+1 MOR contra zombis, pero -1 MOR a amigos a 10 cm." },
    "Furtivo": { text: "Puede realizar acciones de Avanzar sin perder Oculto." },
    "Hombre de Confianza": { text: "Aliados a 10 cm pueden sumar +1 MOR si no reciben ya el bono del Líder." },
    "Inspirador": { text: "A 10 cm, novatos y secuaces reciben +1 a sus chequeos." },
    "Ladrón de Coches": { text: "+2 al forzar puertas de coches y arrancarlos." },
    "Mártir": { text: "No realiza chequeos de Miedo y puede equiparse con Chaleco de Martirio." },
    "Matador de Zombis": { text: "Repite tirada para impactar y dañar a zombis en CC." },
    "Nervios de Acero": { text: "+2 MOR para chequeos de Miedo." },
    "Parkour": { text: "+2 a Saltar y Trepar." },
    "Pistolero": { text: "No aplica el penalizador al disparar dos pistolas." },
    "Primeros Auxilios": { text: "Con 1 uso de Botiquín y chequeo de INI, recupera 1 PV a un Superviviente o Perro." },
    "Puntería": { text: "Repite tiradas de Impactar en Disparo." },
    "Reacción rápida": { text: "Puede hacer un ataque CC de oportunidad al ser cargado si no estaba trabado." },
    "Sigiloso": { text: "Todo disparo contra esta figura tiene -1 adicional; no acumulable con Escudo Balístico." },
    "Táctico": { text: "Tras colocar botín, incógnitas y elegir lado, puede cambiar de cuadrante de despliegue y huida." },
    "Vista de águila": { text: "Cancela el -1 por disparar a un combate cuerpo a cuerpo." }
  },
  flaws: {
    "": { cost: 0, text: "Sin defecto." },
    "Activista Z": { text: "No ataca a un zombi salvo que ese zombi le haya atacado antes. No chequea Miedo por zombis." },
    "Adicción": { text: "Al inicio de su activación chequea MOR con penalizador según nivel; si falla pierde la primera acción." },
    "Alucinaciones": { text: "Si falla MOR, el rival puede hacerle cargar o disparar contra un enemigo inexistente." },
    "Bajo de Forma": { text: "Empieza la partida con -2 RES." },
    "Cojo": { text: "Mueve 7 cm por Paso Ligero y usa el dado más bajo al Avanzar." },
    "Corto de vista": { text: "-2 a Disparar a más de 10 cm; debe llevar arma a distancia." },
    "Depresivo": { text: "Al inicio de cada activación chequea MOR; si falla pierde una acción." },
    "Egoísta": { text: "Solo puntúa la mitad del botín que captura." },
    "Gafe": { text: "Chequeos a 10 cm reciben -1; tiradas de prueba pierden 1 al resultado de cada dado." },
    "Honorable": { text: "Si ve a un compañero trabado en melee, debe gastar acciones en cargar al mismo enemigo." },
    "Imprudente": { text: "Si está tras cobertura y recibe un disparo, con 1-5 pierde la cobertura." },
    "Lobo Solitario": { text: "-1 a tiradas de Atributos si está a 10 cm o menos de compañeros." },
    "Manco": { text: "Solo puede llevar un arma a una mano o un elemento de equipo que use manos." },
    "Miedoso": { text: "Nunca se beneficia de compañeros o Líder para chequeos de Miedo; no válido para Líder." },
    "Paranoico": { text: "Si falla MOR, el rival puede hacerle cargar o disparar contra un compañero." },
    "Rencoroso": { text: "No aporta bonos cooperativos como el +1 al CC de compañeros." },
    "Suicida": { text: "Al inicio chequea MOR; si falla, el rival lo mueve hacia el enemigo más cercano." },
    "Turbio": { text: "-1 a acciones de Niños y Perros aliados a 20 cm; la banda debe incluir niño, perro o ambos." },
    "Viejo": { text: "Antes de una segunda acción de Mover, Trepar, Saltar o Romper, chequea FUE; si falla pierde la acción." }
  },
  weapons: {
    "": { cost: 0, text: "Sin arma." },
    "Arma CC Ligera": { hands: 1, text: "CC · Daño 7+ · 1 dado · Pareja." },
    "Arma CC Pesada": { hands: 1, text: "CC · Daño 6+ · 1 dado · Pareja, Herramienta." },
    "Espada": { hands: 1, text: "CC · +1 · Daño 6+ · 1 dado · Equilibrada." },
    "Arma a dos manos": { hands: 2, text: "CC · Daño 5+ · 1 dado · Herramienta+." },
    "Katana o Mandoble": { hands: 2, text: "CC · +1 · Daño 5+ · 1 dado · Equilibrada." },
    "Lanza": { hands: 2, text: "CC · Daño 6+ · 1 dado · Alcance." },
    "Motosierra": { hands: 2, text: "CC · -1 · Daño 4+ · 2 dados · Ruido 1, Herramienta+." },
    "Bastón": { hands: 2, text: "CC · Daño 6+ · 1 dado · Derribo Mejorado." },
    "Pistola .22": { hands: 1, ranged: true, text: "10-20 cm · -/-1 · Daño 8+ (5+ vs Z) · 1 dado · Ruido 1, Semiautomático." },
    "Pistola Ligera": { hands: 1, ranged: true, text: "10-25 cm · -/-1 · Daño 5+ · 1 dado · Ruido 1, Semiautomático." },
    "Pistola Pesada": { hands: 1, ranged: true, text: "15-30 cm · -/-1 · Daño 4+ · 1 dado · Ruido 1, Semiautomático." },
    "Pistola de Clavos": { hands: 1, ranged: true, text: "10 cm · Daño 4+ · 1 dado." },
    "Pistola Ametralladora": { hands: 1, ranged: true, text: "10-25 cm · -/-2 · Daño 5+ · 1 dado · Ruido 1, Ráfaga+." },
    "Escopeta Recortada": { hands: 1, ranged: true, text: "10-25 cm · +1/-2 · Daño 3+/5+ · 2 dados · Ruido 2, Impacto." },
    "Honda": { hands: 1, ranged: true, text: "15-30 cm · -/-1 · Daño 6+ (9+) · 1 dado · Munición no letal." },
    "Fusil .22": { hands: 2, ranged: true, text: "20-40 cm · -/-1 · Daño 8+ (5+ vs Z) · 1 dado · Ruido 1." },
    "Fusil de Caza": { hands: 2, ranged: true, text: "30-50 cm · -/-1 · Daño 4+ · 1 dado · Ruido 1." },
    "Escopeta": { hands: 2, ranged: true, text: "15-35 cm · +1/-1 · Daño 3+ · 2 dados · Ruido 2, Impacto." },
    "Escopeta Militar": { hands: 2, ranged: true, text: "15-35 cm · +1/-1 · Daño 3+ · 2 dados · Ruido 2, Impacto, Semiautomático!." },
    "Subfusil": { hands: 2, ranged: true, text: "15-30 cm · -/-1 · Daño 5+ · 1 dado · Semiautomático, Ráfaga, Compacto." },
    "Carabina": { hands: 2, ranged: true, text: "20-35 cm · -/-1 · Daño 4+ · 1 dado · Semiautomático, Ráfaga." },
    "Fusil de Asalto": { hands: 2, ranged: true, text: "25-45 cm · -/-1 · Daño 4+ · 1 dado · Semiautomático, Ráfaga." },
    "Fusil de Combate": { hands: 2, ranged: true, text: "25-50 cm · -/-1 · Daño 3+ · 1 dado · Semiautomático+, Ráfaga!." },
    "Ametralladora Ligera": { hands: 2, ranged: true, text: "25-50 cm · -/-1 · Daño 4+ · 1 dado · Ruido 2, Ráfaga+." },
    "Arco de Caza": { hands: 2, ranged: true, text: "15-30 cm · +1/-1 · Daño 6+ · 1 dado · Ruido 0, Semiautomático." },
    "Arco de Poleas/Ballesta": { hands: 2, ranged: true, text: "20-40 cm · -/-1 · Daño 5+ · 2 dados · Ruido 0." },
    "Rifle Submarino": { hands: 2, ranged: true, text: "15-30 cm · -/-2 · Daño 3+ · 2 dados · Ruido 0." },
    "Lanzallamas": { hands: 2, ranged: true, text: "30 cm · Daño 6+ (10+) · 4 dados · Ruido 1, Fuego, Ignora cobertura." }
  },
  gearText: {
    "": "Sin equipo adicional.",
    "Linterna": "Ilumina hasta 40 cm; ocupa una mano.",
    "Linterna Manos libres": "Ilumina hasta 40 cm sin ocupar la mano.",
    "Foco halógeno": "Ilumina hasta 60 cm; ocupa dos manos.",
    "Cuerda y gancho": "+1 a Trepar.",
    "Visión Nocturna": "Permite ver en la oscuridad a cualquier distancia; -1 a Disparo.",
    "Visión Termal": "Permite ver en la oscuridad sin penalizador; no detecta zombis más allá del alcance nocturno normal.",
    "Botiquín": "5 usos; permite usar Primeros Auxilios.",
    "Silenciador": "Reduce el Ruido en 1.",
    "Visor Óptico": "Permite disparar en Semiautomático sin el penalizador habitual.",
    "Mira Telescópica": "Gastando una acción de apuntar, +1 dado de daño.",
    "Mochila grande": "Permite llevar 2 marcadores de botín en lugar de 1."
  },
  armorText: {
    "": "Sin protección.",
    "Protección ligera": "Protección 1 contra CC y Mordiscos.",
    "Armadura primitiva": "Protección 1 contra CC y 2 contra Mordiscos.",
    "Blindaje I": "Protección 1 contra armas de fuego y 1 contra CC.",
    "Blindaje II": "Protección 2 contra armas de fuego, 1 contra CC y 1 contra Mordiscos.",
    "Escudo de Mano": "Protección 1 contra CC; -1 a ser impactado en CC; ocupa una mano.",
    "Escudo Balístico": "Protección 2 contra armas de fuego; -1 a ser impactado por armas a distancia; ocupa una mano."
  },
  bands: {
    civiles: {
      name: "Civiles",
      profiles: {
        "Líder": { max: 1, leader: true, stats: [4,4,5,6,5,4,5], cost: 55 },
        "Secuaz": { max: 2, stats: [4,4,4,5,5,4,4], cost: 40 },
        "Recluta": { max: 4, stats: [3,3,4,4,4,3,3], cost: 20 },
        "Niño": { max: 1, child: true, stats: [2,3,2,4,3,3,2], cost: 10 },
        "Perro": { max: 1, dog: true, stats: [4,"-",4,6,3,6,2], cost: 15 }
      },
      traits: { "Artes Marciales":30,"Atleta":15,"Ave de Carroña":5,"Berserker":10,"Cazador de Zombis":5,"Conductor experto":15,"Conocimiento de la situación":15,"Desarmar":20,"Despiadado":20,"Duelista":10,"Duro de Pelar":20,"Emboscador":10,"Entrenado":10,"Escurridizo":5,"Especialista en entradas":5,"Esquiva":25,"Explorador":10,"Fanático":10,"Furtivo":10,"Hombre de Confianza":5,"Inspirador":30,"Ladrón de Coches":10,"Matador de Zombis":10,"Nervios de Acero":15,"Parkour":10,"Pistolero":10,"Primeros Auxilios":10,"Puntería":30,"Reacción rápida":10,"Táctico":10,"Vista de águila":10 },
      flaws: { "Activista Z":20,"Adicción":10,"Alucinaciones":40,"Bajo de Forma":15,"Cojo":20,"Corto de vista":10,"Depresivo":10,"Egoísta":30,"Gafe":10,"Honorable":20,"Imprudente":10,"Manco":20,"Miedoso":15,"Paranoico":20,"Rencoroso":20,"Suicida":30,"Turbio":5,"Lobo Solitario":10,"Viejo":30 },
      armor: { "Protección ligera":3,"Armadura primitiva":6,"Blindaje I":15,"Blindaje II":25,"Escudo de Mano":6,"Escudo Balístico":35 },
      weapons: { "Arma CC Ligera":1,"Arma CC Pesada":3,"Espada":5,"Arma a dos manos":5,"Katana o Mandoble":7,"Lanza":3,"Motosierra":12,"Bastón":5,"Pistola .22":6,"Pistola Ligera":8,"Pistola Pesada":10,"Pistola de Clavos":8,"Escopeta Recortada":10,"Pistola Ametralladora":8,"Fusil .22":9,"Fusil de Caza":12,"Fusil de Combate":16,"Escopeta":12,"Subfusil":10,"Carabina":14,"Fusil de Asalto":18,"Ametralladora Ligera":25,"Honda":3,"Arco de Caza":6,"Arco de Poleas/Ballesta":10,"Rifle Submarino":10 },
      gear: { "Linterna":1,"Linterna Manos libres":2,"Foco halógeno":3,"Cuerda y gancho":2,"Visión Nocturna":10,"Botiquín":5,"Silenciador":5,"Visor Óptico":10,"Mira Telescópica":15,"Mochila grande":2 }
    },
    desertores: {
      name: "Desertores",
      profiles: {
        "Caudillo": { max: 1, leader: true, stats: [4,5,5,5,5,4,5], cost: 55 },
        "Veterano": { max: 2, stats: [4,5,4,4,5,4,4], cost: 40 },
        "Recluta": { max: 2, stats: [3,4,4,3,4,3,3], cost: 20 },
        "Unidad Canina": { max: 1, dog: true, stats: [4,"-",4,6,3,6,2], cost: 15 }
      },
      traits: { "Artes Marciales":20,"Atleta":10,"Conductor experto":15,"Conocimiento de la situación":15,"Desarmar":20,"Duro de Pelar":20,"Emboscador":10,"Entrenado":5,"Especialista en entradas":5,"Esquiva":25,"Explorador":10,"Inspirador":30,"Nervios de Acero":15,"Primeros Auxilios":10,"Puntería":30,"Reacción rápida":10,"Táctico":10,"Vista de águila":10 },
      flaws: { "Adicción":10,"Depresivo":10,"Egoísta":30,"Gafe":10,"Honorable":20,"Imprudente":10,"Paranoico":20,"Rencoroso":20,"Suicida":30,"Lobo Solitario":10 },
      armor: { "Blindaje I":12,"Blindaje II":20,"Escudo Balístico":30 },
      weapons: { "Arma CC Ligera":1,"Pistola Ligera":8,"Pistola Pesada":10,"Fusil de Combate":15,"Subfusil":8,"Escopeta":10,"Escopeta Militar":14,"Carabina":12,"Fusil de Asalto":15,"Ametralladora Ligera":20 },
      gear: { "Linterna":1,"Linterna Manos libres":2,"Visión Nocturna":8,"Visión Termal":10,"Botiquín":5,"Silenciador":5,"Visor Óptico":8,"Mira Telescópica":12,"Mochila grande":2 }
    },
    pandilleros: {
      name: "Pandilleros",
      profiles: {
        "Jefe": { max: 1, leader: true, stats: [4,4,6,5,5,4,5], cost: 55 },
        "Matón": { max: 3, stats: [4,4,5,4,5,4,4], cost: 40 },
        "Aspirante": { max: 3, stats: [3,3,5,3,4,3,3], cost: 20 }
      },
      traits: { "Ave de Carroña":5,"Conductor experto":10,"Conocimiento de la situación":10,"Desarmar":20,"Despiadado":20,"Duro de Pelar":15,"Emboscador":10,"Entrenado":10,"Especialista en entradas":5,"Esquiva":25,"Furtivo":10,"Hombre de Confianza":10,"Ladrón de Coches":5,"Nervios de Acero":10,"Pistolero":5,"Primeros Auxilios":10,"Reacción rápida":10,"Vista de águila":10 },
      flaws: { "Adicción":10,"Alucinaciones":40,"Bajo de Forma":15,"Cojo":20,"Corto de vista":10,"Depresivo":10,"Egoísta":30,"Gafe":10,"Imprudente":10,"Manco":20,"Paranoico":20,"Rencoroso":20,"Lobo Solitario":10 },
      armor: { "Protección ligera":3,"Blindaje I":12 },
      weapons: { "Arma CC Ligera":1,"Arma CC Pesada":3,"Espada":5,"Arma a dos manos":5,"Pistola .22":6,"Pistola Ligera":8,"Pistola Pesada":10,"Escopeta Recortada":10,"Pistola Ametralladora":8,"Escopeta":12,"Subfusil":10,"Carabina":14,"Fusil de Asalto":18 },
      gear: { "Linterna":1,"Linterna Manos libres":2,"Visión Nocturna":10,"Botiquín":5,"Silenciador":3,"Visor Óptico":8,"Mochila grande":2 }
    },
    sectarios: {
      name: "Sectarios",
      profiles: {
        "Gurú": { max: 1, leader: true, stats: [4,4,5,5,6,4,5], cost: 55 },
        "Iniciado": { max: 2, stats: [4,4,4,4,6,4,4], cost: 40 },
        "Acólito": { max: 5, stats: [3,3,4,3,5,3,3], cost: 20 }
      },
      traits: { "Atleta":15,"Berserker":10,"Conocimiento de la situación":15,"Desarmar":20,"Despiadado":20,"Duro de Pelar":20,"Emboscador":10,"Entrenado":10,"Especialista en entradas":5,"Esquiva":25,"Fanático":5,"Furtivo":10,"Inspirador":20,"Mártir":15,"Nervios de Acero":15,"Primeros Auxilios":10,"Puntería":30,"Reacción rápida":10,"Táctico":10,"Vista de águila":10 },
      flaws: { "Bajo de Forma":15,"Cojo":20,"Corto de vista":10,"Egoísta":30,"Gafe":10,"Honorable":20,"Imprudente":10,"Manco":20,"Rencoroso":20,"Lobo Solitario":10,"Viejo":30 },
      armor: { "Protección ligera":3,"Blindaje I":15 },
      weapons: { "Arma CC Ligera":1,"Arma CC Pesada":3,"Espada":5,"Arma a dos manos":5,"Katana o Mandoble":7,"Bastón":3,"Pistola Ligera":8,"Pistola Pesada":10,"Escopeta Recortada":10,"Pistola Ametralladora":8,"Fusil de Caza":12,"Escopeta":12,"Subfusil":10,"Carabina":14,"Fusil de Asalto":18,"Ametralladora Ligera":25 },
      gear: { "Linterna":1,"Linterna Manos libres":2,"Foco halógeno":3,"Visión Nocturna":10,"Botiquín":5,"Silenciador":4,"Visor Óptico":10,"Mira Telescópica":12,"Mochila grande":2 }
    },
    laboratorios: {
      name: "Laboratorios Z",
      profiles: {
        "Científico jefe": { max: 1, leader: true, stats: [3,5,4,5,5,4,6], cost: 45 },
        "Ayudante": { max: 2, stats: [3,5,4,4,5,4,5], cost: 35 },
        "Operativo": { max: 3, stats: [2,4,3,3,4,3,4], cost: 15 },
        "Sujeto Experimental": { max: 2, special: true, stats: [3,"-",2,3,"-","-",1], cost: 10 }
      },
      traits: { "Artes Marciales":30,"Atleta":15,"Conductor experto":15,"Conocimiento de la situación":15,"Desarmar":20,"Despiadado":20,"Entrenado":10,"Especialista en entradas":5,"Esquiva":25,"Explorador":10,"Hombre de Confianza":5,"Inspirador":30,"Nervios de Acero":15,"Primeros Auxilios":10,"Puntería":30,"Reacción rápida":10,"Táctico":10,"Vista de águila":10 },
      flaws: { "Adicción":10,"Bajo de Forma":15,"Corto de vista":10,"Depresivo":10,"Egoísta":30,"Gafe":10,"Imprudente":10,"Manco":20,"Miedoso":15,"Rencoroso":20,"Lobo Solitario":10 },
      armor: { "Blindaje I":15,"Blindaje II":25 },
      weapons: { "Arma CC Ligera":1,"Arma CC Pesada":3,"Pistola Ligera":8,"Pistola Ametralladora":8,"Subfusil":10,"Carabina":14,"Fusil de Asalto":18,"Lanzallamas":12 },
      gear: { "Linterna":1,"Linterna Manos libres":2,"Foco halógeno":3,"Visión Nocturna":10,"Botiquín":2,"Silenciador":5,"Visor Óptico":5,"Mochila grande":2 }
    },
    carroneros: {
      name: "Carroñeros",
      profiles: {
        "Alfa": { max: 1, leader: true, stats: [6,4,5,5,5,4,5], cost: 55 },
        "Omega": { max: 2, stats: [5,3,4,4,5,4,5], cost: 40 },
        "Beta": { max: 4, stats: [4,2,4,3,4,4,4], cost: 20 },
        "Perro": { max: 2, dog: true, stats: [4,"-",4,6,4,6,2], cost: 15 }
      },
      traits: { "Acechante Nocturno":5,"Artes Marciales":30,"Atleta":15,"Ave de Carroña":5,"Berserker":5,"Cazador de Zombis":5,"Conocimiento de la situación":15,"Desarmar":20,"Despiadado":20,"Duro de Pelar":20,"Emboscador":10,"Escurridizo":5,"Especialista en entradas":5,"Esquiva":25,"Explorador":5,"Fanático":10,"Furtivo":10,"Hombre de Confianza":10,"Matador de Zombis":10,"Nervios de Acero":15,"Reacción rápida":10,"Sigiloso":10 },
      flaws: { "Alucinaciones":40,"Corto de vista":5,"Depresivo":10,"Egoísta":30,"Gafe":10,"Honorable":20,"Imprudente":10,"Miedoso":15,"Paranoico":20,"Rencoroso":20,"Suicida":30,"Lobo Solitario":10 },
      armor: { "Protección ligera":2,"Armadura primitiva":5,"Escudo de Mano":4 },
      weapons: { "Arma CC Ligera":1,"Arma CC Pesada":2,"Arma a dos manos":4,"Katana o Mandoble":7,"Lanza":2,"Pistola .22":8,"Pistola Ligera":8,"Honda":1,"Pistola de Clavos":8,"Escopeta Recortada":10,"Arco de Caza":3 },
      gear: { "Linterna":1,"Cuerda y gancho":2,"Mochila grande":2 }
    }
  }
};
