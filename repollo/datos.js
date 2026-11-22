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
    horarios: ["Mañana: 8:30 a 13:30 h", "Tarde: 17:30 a 21:30 h"],

    // Lo que se busca en Google Maps con el botón "Cómo llegar"
    mapa: "Saúl Moyano y General Cabrera, La Calera, Córdoba, Argentina"
  },

  /* ---------- Planilla de precios (Google Sheets) ----------
     Pegá acá el link CSV de la pestaña "web" publicada.
     Vacío = se usan los precios de este archivo.                      */
  planillaPrecios: "",

  /* ---------- Formas de pago ---------- */
  pagos: {
    recargoCredito: 10,   // % de recargo con tarjeta de crédito (débito sin recargo)
    // Se muestra cuando el cliente elige transferencia
    textoTransferencia: "Te pasamos el alias por WhatsApp cuando confirmemos el total."
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
    logo: "assets/logo.png",             // logo con fondo transparente
    local: "assets/local.jpg"
  },

  /* ---------- Carrusel de "¿Por qué nos eligen?" ----------
     Se muestran en este orden y pasan solas. Sumá o sacá fotos acá.   */
  nosotros: [
    { foto: "assets/nosotros/1-pregunta.jpg", alt: "¿Por qué cada vez más vecinos eligen comprar en Repollo?" },
    { foto: "assets/nosotros/2-fresca.jpg",   alt: "Porque siempre encuentran mercadería fresca." },
    { foto: "assets/nosotros/3-vecino.jpg",   alt: "Porque acá te atendemos como un vecino." },
    { foto: "assets/nosotros/4-historia.jpg", alt: "Porque ustedes son parte de nuestra historia." },
    { foto: "assets/nosotros/5-gracias.jpg",  alt: "Gracias por elegir a Repollo." }
  ],

  /* ---------- Video ----------
     Copiá el video en assets/video/ con este nombre (.mp4).
     poster: imagen que se ve mientras carga (opcional).            */
  video: {
    archivo: "assets/video/repollo.mp4",
    poster: "assets/video/poster.jpg",
    titulo: "Así trabajamos en Repollo"
  },

  /* ---------- BOLSONES ----------
     Se muestran en este orden. El que tenga destacado: true es la
     tarjeta grande (y el de la animación de la bolsa).
     foto: opcional. Si no se pone, se busca assets/bolsones/<id>.jpg
     etiqueta: el cartelito de arriba ("" para no mostrar ninguno).     */
  bolsones: [
    {
      id: "completo",
      descuento: 10,       // % de descuento que se muestra (precio anterior tachado)
      color: "negro",          // color de la cinta: negro, rojo, verde, naranja o amarillo
      nombre: "Bolsón Completo",
      precio: 34900,
      etiqueta: "Más pedido",
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
      descuento: 8,       // % de descuento que se muestra (precio anterior tachado)
      color: "rojo",          // color de la cinta: negro, rojo, verde, naranja o amarillo
      nombre: "Bolsón Express",
      precio: 19900,
      etiqueta: "Para arrancar",
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
      descuento: 10,       // % de descuento que se muestra (precio anterior tachado)
      color: "verde",          // color de la cinta: negro, rojo, verde, naranja o amarillo
      nombre: "Bolsón de Verduras",
      precio: 24900,
      etiqueta: "Para la semana",
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
      descuento: 8,       // % de descuento que se muestra (precio anterior tachado)
      color: "naranja",          // color de la cinta: negro, rojo, verde, naranja o amarillo
      nombre: "Bolsón de Frutas",
      precio: 11900,
      etiqueta: "Rico y sano",
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
      descuento: 10,       // % de descuento que se muestra (precio anterior tachado)
      color: "amarillo",          // color de la cinta: negro, rojo, verde, naranja o amarillo
      nombre: "Completo de Frutas",
      precio: 38900,
      etiqueta: "Tropical",
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

  /* ---------- MENÚ DEL DÍA ----------
     Combos que se muestran arriba de todo, en la portada.
     Mientras la lista esté vacía se ven espacios reservados.
     Ejemplo:
     { id: "milanesas-pure", nombre: "Milanesas con puré", precio: 13400,
       foto: "assets/menus/milanesas-pure.jpg",
       contenido: [ { emoji: "🥩", texto: "Milanesas 1 kg" }, { emoji: "🥔", texto: "Papa 1 kg" } ] },  */
  menuDelDia: [
    { id: "pollo-pasta", foto: "assets/menus/pollo-pasta.jpg", nombre: "Pollo con ravioles", precio: 8500,
      contenido: ["1 kg de pollo trozado", "1 paquete de ravioles"], resumen: "+ ravioles" },
    { id: "albondigas-papas", foto: "assets/menus/albondigas-papas.jpg", nombre: "Albóndigas con papas", precio: 8500,
      contenido: ["1 kg de albóndigas", "1 kg de papas"] },
    { id: "milanesas-ensalada", foto: "assets/menus/milanesas-ensalada.jpg", nombre: "Milanesas con ensalada", precio: 13500,
      contenido: ["1 kg de milanesas", "1 ensalada"] },
    { id: "tortilla", foto: "assets/menus/tortilla.jpg", nombre: "Tortilla de papas", precio: 5600,
      contenido: ["6 huevos", "1 kg de papas", "½ cebolla"] },
    { id: "medallones-espinaca", foto: "assets/menus/medallones-espinaca.jpg", nombre: "Medallones de espinaca", precio: 8000,
      contenido: ["½ kg de medallones de espinaca", "1 ensalada"] },
    { id: "filet-merluza", foto: "assets/menus/filet-merluza.jpg", nombre: "Filet de merluza", precio: 10500,
      contenido: ["½ kg de filet de merluza", "1 ensalada"] },
    { id: "patitas-pollo", foto: "assets/menus/patitas-pollo.jpg", nombre: "Patitas de pollo", precio: 7500,
      contenido: ["½ kg de patitas de pollo", "1 ensalada"] }
  ],

  /* ---------- OFERTAS ----------
     Si la lista queda vacía ( ofertas: [] ), la sección no se muestra.
     foto: opcional. Si no se pone, se busca assets/promos/<id>.jpg      */
  ofertas: [
    {
      id: "pollo-al-disco",
      nombre: "Pollo al disco",
      emoji: "🔥",
      precio: 29900,
      etiqueta: "Pack del finde",
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
     emoji: se usa en el mensaje de WhatsApp. icono: el dibujo de la página.
     foto: se busca assets/productos/<id>.jpg para el resumen de arriba.  */
  categorias: [
    { id: "verduras",  nombre: "Verduras",  emoji: "🥕", icono: "carrot",      unidades: ["kg", "unidad"] },
    { id: "hojas",     nombre: "Hojas y hortalizas", emoji: "🥬", icono: "leafy-green", unidades: ["kg", "unidad"] },
    { id: "frutas",    nombre: "Frutas",    emoji: "🍎", icono: "apple",       unidades: ["kg", "unidad"] },
    { id: "pollo",     nombre: "Pollo",     emoji: "🍗", icono: "drumstick",   unidades: ["kg", "unidad"] },
    { id: "rebozados", nombre: "Rebozados", emoji: "🍤", icono: "chef-hat",    unidades: ["kg", "unidad"] },
    { id: "pastas",    nombre: "Pastas",    emoji: "🍝", icono: "wheat",       unidades: ["paquete"] },
    { id: "huevos",    nombre: "Huevos",    emoji: "🥚", icono: "egg",         unidades: ["x"] },
    { id: "condimentos", nombre: "Condimentos", emoji: "🧂", icono: "salad",   unidades: ["g100"] },
    { id: "lena",      nombre: "Leña y carbón", emoji: "🔥", icono: "flame",   unidades: ["bolsa"] }
  ],

  // ---------- Cantidades ----------
  // Al elegir un producto el cliente marca la unidad (kilos o unidades),
  // la cantidad (1, 2, 3) o escribe otra ("Otra": 500 g, 1 atado…).
  // Cada categoría dice qué unidades ofrece (la primera es la que viene marcada).
  // Un producto puede arrancar en otra unidad con  unidad: "unidad".
  cantidades: [1, 2, 3],
  // En kilos también se ofrece ½ kg. Su precio = mitad del kilo + este recargo.
  medioKilo: true,
  recargoMedioKilo: 1000,
  unidades: {
    kg:     { boton: "Kilos",    uno: "kg",     varios: "kg" },
    unidad: { boton: "Unidades", uno: "unidad", varios: "unidades" },
    x:      { boton: "Cantidad", formato: "x{n}" },
    g100:   { boton: "Gramos",   factor: 100, sufijo: " g" },
    paquete:{ boton: "Paquetes", uno: "paquete", varios: "paquetes" },
    bolsa:  { boton: "Bolsas",   uno: "bolsa",   varios: "bolsas" },
    bandeja:{ boton: "Bandejas", uno: "bandeja", varios: "bandejas" }
  },
  // Texto para los productos que no tienen precio cargado
  textoPrecio: "Precio a consultar",

  /* ---------- PRECIOS DE LOS PRODUCTOS ----------
     En cada producto se puede cargar:
       precio: 5500        → precio por la unidad de "por"
       por: "kg"           → "kg", "unidad", "paquete", "bolsa", "g100" (cada 100 g) o "x" (maple)
       promos: { 2: 10000, 3: 14000 }  → precio especial por 2 o 3 de esa unidad
       oferta: true        → muestra la etiqueta verde OFERTA con la promo en la lista
       pesoUnidad: 150     → (solo en productos por kg) gramos promedio de una unidad.
                             Permite pedir por unidad: precio del kilo × peso,
                             redondeado hacia arriba a los $100.
     Si un producto no tiene precio, se muestra "Precio a consultar".   */

  productos: [
    // 🥕 Verduras
    { nombre: "papa", emoji: "🥔", categoria: "verduras", precio: 2500, por: "kg", pesoUnidad: 200, promos: { 2: 3900 }, oferta: true },
    { nombre: "cebolla", emoji: "🧅", categoria: "verduras", precio: 2500, por: "kg", pesoUnidad: 150, promos: { 2: 3900 }, oferta: true },
    { nombre: "cebolla morada", emoji: "🧅", categoria: "verduras", precio: 4900, por: "kg", pesoUnidad: 150 },
    { nombre: "zanahoria", emoji: "🥕", categoria: "verduras", precio: 2900, por: "kg", pesoUnidad: 100 },
    { nombre: "tomate perita", emoji: "🍅", categoria: "verduras", precio: 4900, por: "kg", pesoUnidad: 100 },
    { nombre: "tomate redondo", emoji: "🍅", categoria: "verduras", precio: 4900, por: "kg", pesoUnidad: 180 },
    { nombre: "tomate cherry", emoji: "🍅", categoria: "verduras", precio: 12000, por: "kg" },
    { nombre: "limón", emoji: "🍋", categoria: "verduras", precio: 2900, por: "kg", pesoUnidad: 120 },
    { nombre: "batata", emoji: "🍠", categoria: "verduras", precio: 3900, por: "kg", pesoUnidad: 300 },
    { nombre: "boñato", emoji: "🍠", categoria: "verduras", precio: 4900, por: "kg", pesoUnidad: 300 },
    { nombre: "zapallo negro", emoji: "🎃", categoria: "verduras", precio: 4900, por: "kg", pesoUnidad: 1200 },
    { nombre: "zapallo criollo", emoji: "🎃", categoria: "verduras", precio: 3900, por: "kg", pesoUnidad: 2000 },
    { nombre: "calabacín", emoji: "🎃", categoria: "verduras", precio: 4900, por: "kg", pesoUnidad: 1000 },
    { nombre: "calabaza", emoji: "🎃", categoria: "verduras" },
    { nombre: "ajo", emoji: "🧄", categoria: "verduras", precio: 2000, por: "unidad" },
    { nombre: "chaucha rolliza", emoji: "🫛", categoria: "verduras", precio: 10000, por: "kg" },
    { nombre: "chaucha manteca", emoji: "🫛", categoria: "verduras", precio: 10000, por: "kg" },
    { nombre: "choclo", emoji: "🌽", categoria: "verduras", precio: 1500, por: "unidad", promos: { 3: 2900 }, oferta: true },
    { nombre: "zapallito verde", emoji: "🥒", categoria: "verduras", precio: 2000, por: "kg", pesoUnidad: 200, promos: { 2: 3500 }, oferta: true },
    { nombre: "cuzza", emoji: "🥒", categoria: "verduras", precio: 2900, por: "kg", pesoUnidad: 300 },
    { nombre: "berenjena", emoji: "🍆", categoria: "verduras", precio: 4900, por: "kg", pesoUnidad: 300 },
    { nombre: "pimiento rojo", emoji: "🫑", categoria: "verduras", precio: 6900, por: "kg", pesoUnidad: 200 },
    { nombre: "pimiento verde", emoji: "🫑", categoria: "verduras", precio: 6900, por: "kg", pesoUnidad: 200 },
    { nombre: "pimiento amarillo", emoji: "🫑", categoria: "verduras", precio: 6900, por: "kg", pesoUnidad: 200 },
    { nombre: "pepino", emoji: "🥒", categoria: "verduras", precio: 3900, por: "kg", pesoUnidad: 250 },

    // 🥬 Hojas y hortalizas
    { nombre: "lechuga", emoji: "🥬", categoria: "hojas", precio: 4900, por: "kg", pesoUnidad: 350 },
    { nombre: "lechuga manteca", emoji: "🥬", categoria: "hojas", precio: 4900, por: "kg", pesoUnidad: 250 },
    { nombre: "lechuga arrepollada", emoji: "🥬", categoria: "hojas", precio: 4900, por: "kg", pesoUnidad: 400 },
    { nombre: "lechuguín", emoji: "🥬", categoria: "hojas", precio: 1800, por: "unidad" },
    { nombre: "lechuguín morado", emoji: "🥬", categoria: "hojas", precio: 2000, por: "unidad" },
    { nombre: "acelga", emoji: "🥬", categoria: "hojas", precio: 1500, por: "unidad", promos: { 2: 1800 }, oferta: true },
    { nombre: "espinaca", emoji: "🍃", categoria: "hojas", precio: 1800, por: "unidad", promos: { 2: 3000 }, oferta: true },
    { nombre: "rúcula", emoji: "🌿", categoria: "hojas", precio: 1900, por: "unidad" },
    { nombre: "achicoria", emoji: "🌿", categoria: "hojas", precio: 1900, por: "unidad" },
    { nombre: "apio", emoji: "🌿", categoria: "hojas", precio: 9000, por: "kg", pesoUnidad: 500 },
    { nombre: "verdeo", emoji: "🌿", categoria: "hojas", precio: 9000, por: "kg", pesoUnidad: 150 },
    { nombre: "puerro", emoji: "🌿", categoria: "hojas", precio: 9000, por: "kg", pesoUnidad: 200 },
    { nombre: "albahaca", emoji: "🌿", categoria: "hojas", precio: 3900, por: "unidad" },
    { nombre: "menta", emoji: "🌿", categoria: "hojas", precio: 3900, por: "unidad" },
    { nombre: "cilantro", emoji: "🌿", categoria: "hojas", precio: 6000, por: "kg", pesoUnidad: 100 },
    { nombre: "ciboulette", emoji: "🌿", categoria: "hojas", precio: 2000, por: "unidad" },
    { nombre: "brócoli", emoji: "🥦", categoria: "hojas", precio: 3500, por: "unidad", promos: { 2: 5500 }, oferta: true },
    { nombre: "coliflor", emoji: "🥦", categoria: "hojas", precio: 3900, por: "unidad" },
    { nombre: "remolacha", emoji: "🟣", categoria: "hojas", precio: 2900, por: "kg", pesoUnidad: 200 },
    { nombre: "repollo blanco", emoji: "🥬", categoria: "hojas", precio: 3500, por: "kg", pesoUnidad: 1200 },
    { nombre: "repollo morado", emoji: "🥬", categoria: "hojas", precio: 3500, por: "kg", pesoUnidad: 1200 },
    { nombre: "perejil", emoji: "🌿", categoria: "hojas", precio: 6000, por: "kg", pesoUnidad: 100 },

    // 🍎 Frutas
    { nombre: "naranja de jugo", emoji: "🍊", categoria: "frutas", precio: 1900, por: "kg", pesoUnidad: 200, promos: { 3: 3000 }, oferta: true },
    { nombre: "naranja de ombligo", emoji: "🍊", categoria: "frutas", precio: 2900, por: "kg", pesoUnidad: 220 },
    { nombre: "pomelo", emoji: "🍊", categoria: "frutas", precio: 3900, por: "kg", pesoUnidad: 350 },
    { nombre: "pera", emoji: "🍐", categoria: "frutas", precio: 3500, por: "kg", pesoUnidad: 180 },
    { nombre: "banana ecuador", emoji: "🍌", categoria: "frutas", precio: 4500, por: "kg", pesoUnidad: 160 },
    { nombre: "banana boliviana", emoji: "🍌", categoria: "frutas", precio: 3500, por: "kg", pesoUnidad: 150 },
    { nombre: "manzana verde", emoji: "🍏", categoria: "frutas", precio: 5900, por: "kg", pesoUnidad: 180 },
    { nombre: "manzana roja moño azul", emoji: "🍎", categoria: "frutas", precio: 6900, por: "kg", pesoUnidad: 180 },
    { nombre: "manzana roja", emoji: "🍎", categoria: "frutas", precio: 3500, por: "kg", pesoUnidad: 180 },
    { nombre: "uva blanca", emoji: "🍇", categoria: "frutas", precio: 14000, por: "kg" },
    { nombre: "uva red globe", emoji: "🍇", categoria: "frutas", precio: 14000, por: "kg" },
    { nombre: "uva negra", emoji: "🍇", categoria: "frutas", precio: 14000, por: "kg" },
    { nombre: "kiwi", emoji: "🥝", categoria: "frutas", precio: 12000, por: "kg", pesoUnidad: 80 },
    { nombre: "mandarina criolla", emoji: "🍊", categoria: "frutas", precio: 2900, por: "kg", pesoUnidad: 120 },
    { nombre: "mandarina dancy", emoji: "🍊", categoria: "frutas", precio: 2900, por: "kg", pesoUnidad: 120 },
    { nombre: "mandarina murcott", emoji: "🍊", categoria: "frutas", precio: 2900, por: "kg", pesoUnidad: 120 },
    { nombre: "mandarina afourer", emoji: "🍊", categoria: "frutas", precio: 2900, por: "kg", pesoUnidad: 120 },
    { nombre: "mandarina ellendale", emoji: "🍊", categoria: "frutas", precio: 2900, por: "kg", pesoUnidad: 120 },
    { nombre: "frutilla", emoji: "🍓", categoria: "frutas", precio: 14000, por: "kg" },
    { nombre: "mango", emoji: "🥭", categoria: "frutas", precio: 2500, por: "unidad", promos: { 2: 4000 }, oferta: true },
    { nombre: "palta", emoji: "🥑", categoria: "frutas", precio: 1500, por: "unidad", promos: { 2: 2800 }, oferta: true },
    { nombre: "ciruela", emoji: "🟣", categoria: "frutas", precio: 14000, por: "kg", pesoUnidad: 70 },
    { nombre: "quinotos", emoji: "🍊", categoria: "frutas", precio: 6000, por: "kg" },
    { nombre: "sandía", emoji: "🍉", categoria: "frutas", precio: 1500, por: "kg" },
    { nombre: "melón", emoji: "🍈", categoria: "frutas", precio: 4900, por: "unidad" },
    { nombre: "arándanos", emoji: "🫐", categoria: "frutas", precio: 3500, por: "bandeja" },
    { nombre: "cereza", emoji: "🍒", categoria: "frutas" },
    { nombre: "kaki", emoji: "🟠", categoria: "frutas" },
    { nombre: "ananá", emoji: "🍍", categoria: "frutas" },

    // 🍗 Pollo (precios por kg)
    { nombre: "pollo entero",         emoji: "🐔", categoria: "pollo", precio: 6000, por: "kg", pesoUnidad: 3000 },
    { nombre: "brochetas de pollo",   emoji: "🍢", categoria: "pollo", precio: 15000, por: "kg", pesoUnidad: 200 },
    { nombre: "pechuga",              emoji: "🍗", categoria: "pollo", precio: 12600, por: "kg" },
    { nombre: "patamuslo",            emoji: "🍗", categoria: "pollo", precio: 5500, por: "kg", promos: { 2: 10000, 3: 14000 }, oferta: true },
    { nombre: "alitas sin rancho",    emoji: "🍗", categoria: "pollo", precio: 5000, por: "kg", promos: { 2: 8000 }, oferta: true },
    { nombre: "alitas con rancho",    emoji: "🍗", categoria: "pollo", precio: 3900, por: "kg", promos: { 2: 7000 }, oferta: true },
    { nombre: "alitas rebozadas",     emoji: "🍗", categoria: "pollo", precio: 8000, por: "kg", promos: { 2: 15000 }, oferta: true },
    { nombre: "milanesas",            emoji: "🥩", categoria: "pollo", precio: 11500, por: "kg", promos: { 2: 19900 }, oferta: true },
    { nombre: "milanesas rellenas",   emoji: "🧀", categoria: "pollo", precio: 13000, por: "kg" },
    { nombre: "trozado",              emoji: "🔪", categoria: "pollo", precio: 5500, por: "kg", promos: { 2: 10000 }, oferta: true },
    { nombre: "bife de pollo",        emoji: "🥩", categoria: "pollo", precio: 13000, por: "kg" },
    { nombre: "menudos",              emoji: "🍲", categoria: "pollo", precio: 1000, por: "kg" },
    { nombre: "canino (huesos y carcasa)", emoji: "🦴", categoria: "pollo", precio: 500, por: "kg" },
    { nombre: "albóndigas",           emoji: "🧆", categoria: "pollo", precio: 5000, por: "kg", promos: { 2: 9000 }, oferta: true },
    { nombre: "hamburguesas caseras", emoji: "🍔", categoria: "pollo", precio: 5000, por: "kg", promos: { 2: 9000 }, oferta: true },

    // 🍤 Rebozados (precios por kg)
    { nombre: "medallón de pollo",                 emoji: "🐔", categoria: "rebozados", precio: 9600, por: "kg" },
    { nombre: "medallón de pollo jamón y queso",   emoji: "🧀", categoria: "rebozados", precio: 11200, por: "kg" },
    { nombre: "medallón de espinaca y queso",      emoji: "🥬", categoria: "rebozados", precio: 8300, por: "kg" },
    { nombre: "patitas de pollo",                  emoji: "🍗", categoria: "rebozados", precio: 9600, por: "kg" },
    { nombre: "patitas de jamón y queso",          emoji: "🧀", categoria: "rebozados", precio: 11200, por: "kg" },
    { nombre: "filet de merluza rebozada",         emoji: "🐠", categoria: "rebozados", precio: 12800, por: "kg" },
    { nombre: "barritas de muzza",                 emoji: "🧀", categoria: "rebozados", precio: 18900, por: "kg" },
    { nombre: "nuggets",                           emoji: "🍤", categoria: "rebozados", precio: 12600, por: "kg" },

    // 🍝 Pastas (precio por paquete)
    { nombre: "ravioles 1 kg",      emoji: "🥟", categoria: "pastas", precio: 4700, por: "paquete" },
    { nombre: "ravioles 500 g",     emoji: "🥟", categoria: "pastas", precio: 2900, por: "paquete" },
    { nombre: "ñoquis 500 g",       emoji: "🥔", categoria: "pastas", precio: 2900, por: "paquete" },
    { nombre: "capelettis 500 g",   emoji: "🥟", categoria: "pastas", precio: 3000, por: "paquete" },
    { nombre: "fideos frescos",     emoji: "🍝", categoria: "pastas", precio: 2700, por: "paquete" },
    { nombre: "sorrentinos",        emoji: "🥟", categoria: "pastas" },

    // 🥚 Huevos
    { nombre: "maple de 30",  emoji: "🥚", categoria: "huevos", precio: 5500, por: "x", promos: { 2: 9000 }, oferta: true },
    { nombre: "docena",       emoji: "🥚", categoria: "huevos", precio: 3500, por: "x" },
    { nombre: "media docena", emoji: "🥚", categoria: "huevos", precio: 1800, por: "x" },
    { nombre: "huevo suelto", emoji: "🥚", categoria: "huevos", precio: 300, por: "unidad" },

    // 🧂 Condimentos (precio cada 100 g)
    { nombre: "chimichurri",            emoji: "🌿", categoria: "condimentos", precio: 1700, por: "g100" },
    { nombre: "ají",                    emoji: "🌶️", categoria: "condimentos", precio: 1500, por: "g100" },
    { nombre: "orégano",                emoji: "🌿", categoria: "condimentos", precio: 1800, por: "g100" },
    { nombre: "condimento para pizza",  emoji: "🍕", categoria: "condimentos", precio: 1500, por: "g100" },
    { nombre: "comino",                 emoji: "🌰", categoria: "condimentos", precio: 1600, por: "g100" },
    { nombre: "provenzal",              emoji: "🧄", categoria: "condimentos", precio: 1900, por: "g100" },
    { nombre: "pimentón",               emoji: "🌶️", categoria: "condimentos", precio: 1700, por: "g100" },

    // 🔥 Leña y carbón (precio por bolsa)
    { nombre: "carbón",  emoji: "🔥", categoria: "lena", precio: 4500, por: "bolsa" },
    { nombre: "leña",    emoji: "🪵", categoria: "lena", precio: 5000, por: "bolsa" }
  ]
};
