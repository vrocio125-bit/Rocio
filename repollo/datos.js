/* ============================================================
   REPOLLO · Datos editables de la página
   ------------------------------------------------------------
   Todo lo que cambia seguido está acá: precios, bolsones,
   ofertas, productos, WhatsApp y horarios.
   - Respetá las comas y las comillas.
   - Los precios van sin puntos ni signo $ (ej: 34900).
   - Para cambiar el orden, mové el bloque completo { ... }.
   ============================================================ */

window.REPOLLO = {

  /* ---------- Datos del negocio ---------- */
  negocio: {
    nombre: "Repollo",
    bajada: "Verdulería, frutería y pollería",
    lema: "Calidad y frescura siempre",
    lemaCierre: "Precios y calidad aseguradas",
    direccion: "Saúl Moyano esquina General Cabrera",
    ciudad: "La Calera, Córdoba",

    // WhatsApp con código de país, sin + ni espacios (54 9 + característica + número)
    whatsapp: "5493518064617",
    // Cómo se muestra el número en la página
    whatsappVisible: "351 806-4617",

    // Horarios. Mientras esté vacío ("") se muestra "Consultanos por WhatsApp".
    // Ejemplo: horarios: ["Lunes a sábado: 8 a 13 y 17 a 21 h", "Domingos: 9 a 13 h"],
    horarios: [],

    // Lo que se busca en Google Maps con el botón "Cómo llegar"
    mapa: "Saúl Moyano y General Cabrera, La Calera, Córdoba, Argentina"
  },

  /* ---------- Envío ---------- */
  envio: {
    gratis: true,
    // Opcionales. Mientras estén vacíos no se muestran en la página.
    // Ejemplo: zonas: ["La Calera centro", "Dumesnil", "El Diquecito"],
    zonas: [],
    // Ejemplo: montoMinimo: 15000,
    montoMinimo: null
  },

  /* ---------- Imágenes generales ----------
     Para cambiar una foto, reemplazá el archivo en assets/ con el mismo nombre.
     Si un archivo no está, se muestra una composición con emojis.        */
  imagenes: {
    logo: "assets/logo.png",       // logo con fondo transparente
    local: "assets/local.jpg",     // presentación (arriba de todo)
    equipo: "assets/equipo.jpg",   // "Quiénes somos", foto grande
    local2: "assets/local-2.jpg"   // "Quiénes somos", foto chica
  },

  /* ---------- Galería "Fresquito del día" ----------
     Fotos que se muestran en "Quiénes somos". Podés sumar o sacar.        */
  galeria: [
    { foto: "assets/galeria/atencion.jpg",   texto: "Te tomamos el pedido como a un vecino 📝" },
    { foto: "assets/galeria/milanesas.jpg",  texto: "Milanesas y pollo fresquito 🍗" },
    { foto: "assets/galeria/albondigas.jpg", texto: "Albóndigas caseras con verduras 🧆" },
    { foto: "assets/galeria/medallones.jpg", texto: "Medallones listos para el horno 🔥" }
  ],

  /* ---------- BOLSONES ----------
     Se muestran en este orden. El que tenga destacado: true es la
     tarjeta grande (y el de la animación de la bolsa).
     foto: opcional. Si no se pone, se busca assets/bolsones/<id>.jpg
     etiqueta: el cartelito de arriba ("" para no mostrar ninguno).     */
  bolsones: [
    {
      id: "completo",
      nombre: "Bolsón Completo",
      precio: 34900,
      etiqueta: "Más pedido 🔥",
      destacado: true,
      fondo: "#FFF3C4",
      contenido: [
        { emoji: "🥔", texto: "2 kg papas" },
        { emoji: "🧅", texto: "1 kg cebollas" },
        { emoji: "🥕", texto: "1 kg zanahorias" },
        { emoji: "🍋", texto: "1 kg limones" },
        { emoji: "🍅", texto: "1 kg tomates" },
        { emoji: "🥬", texto: "1 lechuga" },
        { emoji: "🧄", texto: "1 ajo" },
        { emoji: "🌿", texto: "Perejil" },
        { emoji: "🥚", texto: "6 huevos" },
        { emoji: "🥬", texto: "2 acelgas" },
        { emoji: "🍎", texto: "1 kg manzanas" },
        { emoji: "🍊", texto: "1 kg naranjas" },
        { emoji: "🍌", texto: "1 kg bananas" },
        { emoji: "🍐", texto: "1 kg peras" },
        { emoji: "🍊", texto: "1 kg mandarinas" }
      ]
    },
    {
      id: "express",
      nombre: "Bolsón Express",
      precio: 19900,
      etiqueta: "Para arrancar ⚡",
      fondo: "#E3F1E0",
      contenido: [
        { emoji: "🥔", texto: "1 kg papas" },
        { emoji: "🧅", texto: "1 kg cebollas" },
        { emoji: "🍅", texto: "1 kg tomates" },
        { emoji: "🥬", texto: "1 lechuga" },
        { emoji: "🍊", texto: "1 kg naranjas" },
        { emoji: "🍎", texto: "1 kg manzanas" },
        { emoji: "🍌", texto: "1 kg bananas" },
        { emoji: "🥚", texto: "12 huevos" }
      ]
    },
    {
      id: "verduras",
      nombre: "Bolsón de Verduras",
      precio: 24900,
      etiqueta: "Para toda la semana 🍲",
      fondo: "#DDEFD6",
      contenido: [
        { emoji: "🥔", texto: "2 kg papas" },
        { emoji: "🧅", texto: "1 kg cebollas" },
        { emoji: "🥕", texto: "1 kg zanahorias" },
        { emoji: "🍋", texto: "1 kg limones" },
        { emoji: "🍅", texto: "1 kg tomates" },
        { emoji: "🥬", texto: "1 lechuga" },
        { emoji: "🧄", texto: "1 ajo" },
        { emoji: "🌿", texto: "Perejil" },
        { emoji: "🥚", texto: "6 huevos" },
        { emoji: "🥬", texto: "2 acelgas" },
        { emoji: "🌽", texto: "2 choclos" },
        { emoji: "🫑", texto: "2 pimientos" }
      ]
    },
    {
      id: "frutas",
      nombre: "Bolsón de Frutas",
      precio: 11900,
      etiqueta: "Rico y sano 🍎",
      fondo: "#FDE4DF",
      contenido: [
        { emoji: "🍎", texto: "1 kg manzanas" },
        { emoji: "🍌", texto: "1 kg bananas" },
        { emoji: "🍊", texto: "1 kg naranjas" },
        { emoji: "🍐", texto: "1 kg peras" },
        { emoji: "🍊", texto: "1 kg mandarinas" }
      ]
    },
    {
      id: "completo-frutas",
      nombre: "Completo de Frutas",
      precio: 38900,
      etiqueta: "Tropical 🍍",
      fondo: "#FFE9B8",
      contenido: [
        { emoji: "🍍", texto: "1 ananá" },
        { emoji: "🍎", texto: "1 kg manzanas" },
        { emoji: "🍇", texto: "1/2 kg uvas" },
        { emoji: "🍊", texto: "1 kg naranjas" },
        { emoji: "🥝", texto: "1/4 kg kiwis" },
        { emoji: "🍌", texto: "1 kg bananas" },
        { emoji: "🥭", texto: "1 mango" },
        { emoji: "🍐", texto: "1 kg peras" },
        { emoji: "🫐", texto: "1 bandeja de arándanos" },
        { emoji: "🍊", texto: "1 kg mandarinas" },
        { emoji: "🥑", texto: "2 paltas" }
      ]
    }
  ],

  // Palabra que el cliente puede mandar por WhatsApp para pedir bolsones
  palabraClaveBolson: "BOLSÓN",

  /* ---------- OFERTAS ----------
     Si la lista queda vacía ( ofertas: [] ), la sección no se muestra.
     foto: opcional. Si no se pone, se busca assets/promos/<id>.jpg      */
  ofertas: [
    {
      id: "pollo-al-disco",
      nombre: "Pollo al disco",
      emoji: "🔥",
      precio: 29900,
      etiqueta: "Pack del finde 🔥",
      bajada: "Todo lo que necesitás para un disco de campeonato",
      fondo: "#FDE4DF",
      contenido: [
        { emoji: "🍗", texto: "3 kg pata muslo" },
        { emoji: "🍅", texto: "1 kg tomates" },
        { emoji: "🧅", texto: "1 kg cebollas" },
        { emoji: "🥕", texto: "1 kg zanahorias" },
        { emoji: "🌶️", texto: "1 pimiento rojo" },
        { emoji: "🫑", texto: "1 pimiento amarillo" },
        { emoji: "🫑", texto: "1 pimiento verde" }
      ]
    }
  ],

  /* ---------- CATÁLOGO (sin precios) ----------
     Categorías en el orden en que se muestran.
     foto: se busca assets/productos/<id>.jpg para el resumen de arriba.  */
  categorias: [
    { id: "verduras",  nombre: "Verduras",  emoji: "🥬" },
    { id: "frutas",    nombre: "Frutas",    emoji: "🍎" },
    { id: "pollo",     nombre: "Pollo",     emoji: "🍗" },
    { id: "rebozados", nombre: "Rebozados", emoji: "🍤" },
    { id: "pastas",    nombre: "Pastas",    emoji: "🍝" },
    { id: "huevos",    nombre: "Huevos",    emoji: "🥚" }
  ],

  // Cada categoría muestra los primeros 10 y un botón "Ver toda la lista".
  productosVisibles: 10,

  productos: [
    // 🥬 Verduras
    { nombre: "papa",                 emoji: "🥔", categoria: "verduras" },
    { nombre: "batata",               emoji: "🍠", categoria: "verduras" },
    { nombre: "zanahoria",            emoji: "🥕", categoria: "verduras" },
    { nombre: "cebolla",              emoji: "🧅", categoria: "verduras" },
    { nombre: "lechuga",              emoji: "🥬", categoria: "verduras" },
    { nombre: "acelga",               emoji: "🥬", categoria: "verduras" },
    { nombre: "espinaca",             emoji: "🍃", categoria: "verduras" },
    { nombre: "repollo",              emoji: "🥬", categoria: "verduras" },
    { nombre: "tomate",               emoji: "🍅", categoria: "verduras" },
    { nombre: "morrón (pimiento)",    emoji: "🫑", categoria: "verduras" },
    { nombre: "zapallito",            emoji: "🥒", categoria: "verduras" },
    { nombre: "zapallo",              emoji: "🎃", categoria: "verduras" },
    { nombre: "choclo",               emoji: "🌽", categoria: "verduras" },
    { nombre: "brócoli",              emoji: "🥦", categoria: "verduras" },
    { nombre: "pepino",               emoji: "🥒", categoria: "verduras" },
    { nombre: "remolacha",            emoji: "🟣", categoria: "verduras" },
    { nombre: "ajo",                  emoji: "🧄", categoria: "verduras" },
    { nombre: "berenjena",            emoji: "🍆", categoria: "verduras" },
    { nombre: "perejil y aromáticas", emoji: "🌿", categoria: "verduras" },
    { nombre: "coliflor",             emoji: "🥦", categoria: "verduras" },

    // 🍎 Frutas
    { nombre: "banana",    emoji: "🍌", categoria: "frutas" },
    { nombre: "manzana",   emoji: "🍎", categoria: "frutas" },
    { nombre: "naranja",   emoji: "🍊", categoria: "frutas" },
    { nombre: "limón",     emoji: "🍋", categoria: "frutas" },
    { nombre: "pera",      emoji: "🍐", categoria: "frutas" },
    { nombre: "frutilla",  emoji: "🍓", categoria: "frutas" },
    { nombre: "mandarina", emoji: "🍊", categoria: "frutas" },
    { nombre: "uva",       emoji: "🍇", categoria: "frutas" },
    { nombre: "ananá",     emoji: "🍍", categoria: "frutas" },
    { nombre: "kiwi",      emoji: "🥝", categoria: "frutas" },
    { nombre: "mango",     emoji: "🥭", categoria: "frutas" },
    { nombre: "palta",     emoji: "🥑", categoria: "frutas" },
    { nombre: "arándanos", emoji: "🫐", categoria: "frutas" },

    // 🍗 Pollo
    { nombre: "pollo entero",         emoji: "🐔", categoria: "pollo" },
    { nombre: "pechuga",              emoji: "🍗", categoria: "pollo" },
    { nombre: "pechuga deshuesada",   emoji: "🥩", categoria: "pollo" },
    { nombre: "patamuslo",            emoji: "🍗", categoria: "pollo" },
    { nombre: "muslos",               emoji: "🍗", categoria: "pollo" },
    { nombre: "alitas",               emoji: "🍗", categoria: "pollo" },
    { nombre: "suprema",              emoji: "🥩", categoria: "pollo" },
    { nombre: "trozado",              emoji: "🔪", categoria: "pollo" },
    { nombre: "bife de pollo",        emoji: "🥩", categoria: "pollo" },
    { nombre: "menudo",               emoji: "🍲", categoria: "pollo" },
    { nombre: "carcasa",              emoji: "🦴", categoria: "pollo" },
    { nombre: "albóndigas",           emoji: "🧆", categoria: "pollo" },
    { nombre: "hamburguesas caseras", emoji: "🍔", categoria: "pollo" },

    // 🍤 Rebozados
    { nombre: "medallón de pollo",                emoji: "🐔", categoria: "rebozados" },
    { nombre: "medallón de pollo jamón y queso",  emoji: "🧀", categoria: "rebozados" },
    { nombre: "medallones de merluza",            emoji: "🐟", categoria: "rebozados" },
    { nombre: "patitas de pollo",                 emoji: "🍗", categoria: "rebozados" },
    { nombre: "patitas de jamón y queso",         emoji: "🧀", categoria: "rebozados" },
    { nombre: "filet de merluza rebozada",        emoji: "🐠", categoria: "rebozados" },
    { nombre: "nuggets",                          emoji: "🍤", categoria: "rebozados" },
    { nombre: "papas bastón",                     emoji: "🍟", categoria: "rebozados" },
    { nombre: "bastoncillos de muzzarella",       emoji: "🧀", categoria: "rebozados" },

    // 🍝 Pastas
    { nombre: "ravioles",       emoji: "🥟", categoria: "pastas" },
    { nombre: "sorrentinos",    emoji: "🥟", categoria: "pastas" },
    { nombre: "fideos frescos", emoji: "🍝", categoria: "pastas" },
    { nombre: "capelletis",     emoji: "🥟", categoria: "pastas" },

    // 🥚 Huevos
    { nombre: "media docena", emoji: "🥚", categoria: "huevos" },
    { nombre: "docena",       emoji: "🥚", categoria: "huevos" },
    { nombre: "maple (30)",   emoji: "🥚", categoria: "huevos" }
  ]
};
