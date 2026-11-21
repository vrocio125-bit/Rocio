/* ============================================================
   REPOLLO · Lógica de la página
   No hace falta tocar este archivo para cambiar precios,
   productos u horarios: todo eso está en datos.js.
   ============================================================ */
(function () {
  'use strict';

  var D = window.REPOLLO;
  if (!D) { console.error('Falta datos.js'); return; }

  document.documentElement.classList.add('js');

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EXT = ['jpg', 'webp', 'png'];

  var N = D.negocio;
  var bolsones = D.bolsones || [];
  var ofertas = D.ofertas || [];
  var categorias = D.categorias || [];
  var productos = D.productos || [];

  /* ---------- Utilidades ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function ico(nombre, clase) {
    return '<svg class="ico' + (clase ? ' ' + clase : '') + '" aria-hidden="true"><use href="#i-' + nombre + '"/></svg>';
  }
  function precio(n) {
    return '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function norm(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  }
  function waLink(texto) {
    return 'https://wa.me/' + N.whatsapp + '?text=' + encodeURIComponent(texto);
  }
  function plural(n, uno, varios) { return n + ' ' + (n === 1 ? uno : varios); }
  function capital(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- Imágenes con respaldo ----------
     Si la ruta no tiene extensión, prueba .jpg, .webp y .png.
     Si no hay foto, queda un fondo con ícono.                 */
  function fuentes(base) {
    if (!base) return [];
    if (/\.(jpe?g|png|webp|avif|gif|svg)$/i.test(base) || /^data:/.test(base)) return [base];
    return EXT.map(function (e) { return base + '.' + e; });
  }

  function mediaHTML(o) {
    var srcs = fuentes(o.foto);
    var patron = (o.patron || []).map(function (n, i) { return '<span class="pat pat-' + (i + 1) + '">' + ico(n) + '</span>'; }).join('');
    return '<div class="media ' + (o.clase || '') + '"' + (o.fondo ? ' style="--fondo-media:' + esc(o.fondo) + '"' : '') + '>' +
      (patron ? '<div class="patron" aria-hidden="true">' + patron + '</div>' : '') +
      '<div class="media-ph" role="img" aria-label="' + esc(o.alt) + '">' +
        '<span class="ph-ico">' + ico(o.icono || 'leaf') + '</span>' +
        (o.texto ? '<small>' + esc(o.texto) + '</small>' : '') +
      '</div>' +
      (srcs.length ? '<img alt="' + esc(o.alt) + '" loading="' + (o.eager ? 'eager' : 'lazy') + '" decoding="async"' +
        (o.eager ? ' fetchpriority="high"' : '') + ' sizes="' + (o.sizes || '100vw') + '" data-srcs="' + esc(srcs.join('|')) + '">' : '') +
      '</div>';
  }

  function activarImagenes(raiz) {
    $$('img[data-srcs]', raiz).forEach(function (img) {
      var lista = img.getAttribute('data-srcs').split('|');
      img.removeAttribute('data-srcs');
      var i = 0, caja = img.parentNode;
      img.onload = function () {
        caja.classList.add('has-photo');
        var ph = $('.media-ph', caja);
        if (ph) { ph.setAttribute('aria-hidden', 'true'); ph.removeAttribute('role'); ph.removeAttribute('aria-label'); }
      };
      img.onerror = function () {
        i++;
        if (i < lista.length) img.src = lista[i];
        else img.remove();
      };
      img.src = lista[0];
    });
  }

  /* ---------- Textos del negocio ---------- */
  $$('[data-negocio]').forEach(function (el) {
    var v = N[el.getAttribute('data-negocio')];
    if (v) el.textContent = v;
  });
  $$('[data-clave]').forEach(function (el) { el.textContent = D.palabraClaveBolson || 'BOLSÓN'; });
  $('#anio').textContent = new Date().getFullYear();

  var hor = $('#horarios');
  if (N.horarios && N.horarios.length) {
    var lista = Array.isArray(N.horarios) ? N.horarios : [N.horarios];
    hor.innerHTML = lista.map(esc).join('<br>');
  } else {
    hor.innerHTML = 'Consultanos por <a class="link" href="' + waLink('Hola Repollo! 👋 ¿Qué horarios tienen?') + '" target="_blank" rel="noopener">WhatsApp</a>';
  }

  var envio = D.envio || {};
  var detEnvio = ['En todos los pedidos'];
  if (envio.zonas && envio.zonas.length) detEnvio.push('Zonas: ' + envio.zonas.join(', '));
  if (envio.montoMinimo) detEnvio.push('Pedido mínimo: ' + precio(envio.montoMinimo));
  $('#envio-detalle').innerHTML = detEnvio.map(esc).join('<br>');

  $('#como-llegar').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(N.mapa || (N.direccion + ', ' + N.ciudad));

  // Logo (si no carga, queda un círculo amarillo)
  var logoSrc = (D.imagenes || {}).logo;
  $$('[data-logo], [data-logo-grande]').forEach(function (el) {
    if (!logoSrc) return;
    var img = new Image();
    img.alt = el.hasAttribute('data-logo-grande') ? '' : 'Logo de Repollo';
    img.decoding = 'async';
    img.onload = function () { el.innerHTML = ''; el.appendChild(img); el.classList.add('has-photo'); };
    img.src = logoSrc;
  });

  // Fotos generales
  var fotos = {
    local: { alt: 'Frente del puesto de Repollo en La Calera', icono: 'store' },
    equipo: { alt: 'El equipo de Repollo saludando detrás del mostrador', icono: 'heart' }
  };
  $$('[data-media]').forEach(function (el) {
    var k = el.getAttribute('data-media');
    el.innerHTML = mediaHTML({
      foto: (D.imagenes || {})[k], alt: fotos[k].alt, icono: fotos[k].icono,
      eager: false, sizes: false ? '(min-width: 900px) 520px, 100vw' : '(min-width: 900px) 560px, 100vw'
    });
  });

  // Enlaces fijos de WhatsApp
  var MSJ = { hola: 'Hola Repollo! 👋 Quiero hacer un pedido.', clave: D.palabraClaveBolson || 'BOLSÓN' };
  $$('[data-wa]').forEach(function (a) { a.href = waLink(MSJ[a.getAttribute('data-wa')] || MSJ.hola); });

  // Cinta en movimiento
  var frase = '<span>Envíos a todas las zonas de La Calera <b>gratis</b></span>';
  var tramo = '<span class="cinta-tramo" aria-hidden="true">' + frase + frase + frase + '</span>';
  $('#cinta').innerHTML = tramo + tramo;

  /* ---------- Estado del pedido ---------- */
  var KEY = 'repollo-pedido-v1';
  var pedido = { bolsones: {}, ofertas: {}, productos: [], cant: {}, otros: [], nota: '', nombre: '', direccion: '', pago: '', abono: '', pagoJusto: false };
  try {
    var guardado = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (guardado) for (var k in pedido) if (guardado[k] !== undefined) pedido[k] = guardado[k];
  } catch (e) { /* sin almacenamiento */ }

  function claveProd(p) { return p.categoria + '|' + p.nombre; }
  (function limpiar() {
    var idsB = bolsones.map(function (b) { return b.id; });
    var idsO = ofertas.map(function (o) { return o.id; });
    Object.keys(pedido.bolsones).forEach(function (id) { if (idsB.indexOf(id) < 0 || !(pedido.bolsones[id] > 0)) delete pedido.bolsones[id]; });
    Object.keys(pedido.ofertas).forEach(function (id) { if (idsO.indexOf(id) < 0 || !(pedido.ofertas[id] > 0)) delete pedido.ofertas[id]; });
    var claves = productos.map(claveProd);
    pedido.productos = pedido.productos.filter(function (c) { return claves.indexOf(c) >= 0; });
    if (!pedido.cant || typeof pedido.cant !== 'object') pedido.cant = {};
    Object.keys(pedido.cant).forEach(function (k) {
      var c = pedido.cant[k];
      if (typeof c === 'string') pedido.cant[k] = c.trim() ? { otra: c } : null;
      if (!pedido.cant[k]) delete pedido.cant[k];
    });
  })();

  /* ---------- Cantidades y unidades ---------- */
  var UNIDADES = D.unidades || {
    kg: { boton: 'Kilos', uno: 'kg', varios: 'kg' },
    unidad: { boton: 'Unidades', uno: 'unidad', varios: 'unidades' }
  };
  var NUMS = D.cantidades && typeof D.cantidades[0] === 'number' ? D.cantidades : [1, 2, 3];
  var MEDIO = D.medioKilo !== false, RECARGO = D.recargoMedioKilo || 0;
  function unidadesDe(cat) { return (cat && cat.unidades) || ['kg', 'unidad']; }
  function textoCant(c) {
    if (!c) return '';
    if (c.otra !== undefined) return String(c.otra).trim();
    var u = UNIDADES[c.u] || {};
    if (c.n === 0.5 && c.u === 'kg') return '½ kg';
    if (u.factor) return (c.n * u.factor) + (u.sufijo || '');
    if (u.formato) return u.formato.replace('{n}', c.n);
    return c.n + ' ' + (c.n === 1 ? u.uno : u.varios);
  }
  // Unidades que ofrece cada producto
  function unidadesProd(p) {
    if (p.precio) {
      if (p.por === 'kg') return p.pesoUnidad ? ['kg', 'unidad'] : ['kg'];
      return [p.por];
    }
    return unidadesDe(catDe(p.categoria));
  }
  // Precio de una unidad en productos por kilo: kilo × peso promedio, redondeado hacia arriba a $100
  function precioUnidad(p) { return Math.ceil(p.precio * p.pesoUnidad / 1000 / 100) * 100; }
  // Aplica las promos (2x, 3x…) y cobra el resto a precio normal
  function conPromos(n, base, promos) {
    if (!promos) return n * base;
    var t = 0, r = n;
    Object.keys(promos).map(Number).sort(function (a, b) { return b - a; }).forEach(function (k) {
      if (r >= k) { var q = Math.floor(r / k); t += q * promos[k]; r -= q * k; }
    });
    return t + r * base;
  }
  function precioItem(p) {
    var c = pedido.cant[claveProd(p)];
    if (!p.precio || !c || c.otra !== undefined) return null;
    if (c.u === p.por) {
      if (c.n === 0.5) return Math.round(p.precio / 2) + RECARGO;
      return conPromos(c.n, p.precio, p.promos);
    }
    if (c.u === 'unidad' && p.por === 'kg' && p.pesoUnidad) return c.n * precioUnidad(p);
    return null;
  }
  var POR_CORTO = { kg: '/kg', unidad: 'c/u', paquete: 'c/u', bolsa: 'c/u', g100: '/100 g', x: 'c/u' };
  function promoTxt(p) {
    return Object.keys(p.promos || {}).map(function (n) {
      return (p.por === 'kg' ? n + ' kg ' : n + ' x ') + precio(p.promos[n]);
    }).join(' · ');
  }
  function conCant(p) {
    var t = textoCant(pedido.cant[claveProd(p)]);
    var pr = precioItem(p);
    return p.nombre + (t ? ' (' + t + (pr ? ' · ' + precio(pr) : '') + ')' : '');
  }

  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(pedido)); } catch (e) { /* nada */ } }
  function sumar(obj) { return Object.keys(obj).reduce(function (t, k) { return t + obj[k]; }, 0); }
  function cantidadTotal() { return sumar(pedido.bolsones) + sumar(pedido.ofertas) + pedido.productos.length + pedido.otros.length; }
  function prodsElegidos() {
    return productos.filter(function (p) { return pedido.productos.indexOf(claveProd(p)) >= 0; });
  }
  function sinPrecio() {
    return prodsElegidos().filter(function (p) { return precioItem(p) === null; }).length + pedido.otros.length;
  }
  function totalConPrecio() {
    var t = 0;
    prodsElegidos().forEach(function (p) { t += precioItem(p) || 0; });
    bolsones.forEach(function (b) { t += (pedido.bolsones[b.id] || 0) * b.precio; });
    ofertas.forEach(function (o) { t += (pedido.ofertas[o.id] || 0) * o.precio; });
    return t;
  }

  /* ---------- Mensajes de WhatsApp ---------- */
  /* ---------- Mensaje de WhatsApp (formato por secciones) ---------- */
  var SEP = '━━━━━━━━━━━━━━';
  function lineaPack(item, cant) {
    return '• ' + item.nombre + ' x' + cant + ' — ' + precio(item.precio * cant) +
      (cant > 1 ? ' (' + precio(item.precio) + ' c/u)' : '');
  }
  function lineaProd(p, todoAConsultar) {
    var t = textoCant(pedido.cant[claveProd(p)]);
    var pr = precioItem(p);
    return '• ' + capital(p.nombre) + (t ? ' · ' + t : '') +
      (pr ? ' — ' + precio(pr) : (todoAConsultar ? '' : ' — a consultar'));
  }
  var PAGOS = D.pagos || {};
  var RECARGO_CRED = PAGOS.recargoCredito || 0;
  var PAGO_TXT = { efectivo: 'Efectivo', transferencia: 'Transferencia', debito: 'Débito', credito: 'Tarjeta de crédito' };
  function conRecargo(t) { return Math.round(t * (1 + RECARGO_CRED / 100)); }
  function soloNumero(v) { return String(v || '').replace(/[^0-9]/g, ''); }
  function lineaPago() {
    if (!pedido.pago) return null;
    var t = '• ' + PAGO_TXT[pedido.pago];
    if (pedido.pago === 'efectivo') {
      var m = soloNumero(pedido.abono);
      if (pedido.pagoJusto) t += ' — pago justo';
      else if (m) t += ' — abono con ' + precio(Number(m));
    }
    if (pedido.pago === 'transferencia') t += ' — pasame el alias, por favor';
    if (pedido.pago === 'credito' && RECARGO_CRED) t += ' (+' + RECARGO_CRED + '% de recargo)';
    return t;
  }
  function cierreMensaje(l, total, faltan, final) {
    l.push('', SEP);
    var cred = pedido.pago === 'credito' && RECARGO_CRED;
    var etq = faltan ? 'Total estimado' : 'Total';
    if (total && cred) {
      l.push('💰 *' + etq + ' con crédito: ' + precio(conRecargo(total)) + '*');
      l.push('(' + precio(total) + ' + ' + RECARGO_CRED + '% de recargo)');
    } else if (total) {
      l.push('💰 *' + etq + ': ' + precio(total) + '*');
    } else {
      l.push('💲 Precios a consultar');
    }
    if (total && faltan) l.push('➕ Falta sumar lo que tiene precio a consultar');
    l.push('🛵 Envío gratis');
    var lp = lineaPago();
    if (lp) l.push('', '💳 *PAGO*', lp);
    var extra = [];
    if (pedido.direccion.trim()) extra.push('📍 Dirección: ' + pedido.direccion.trim());
    if (pedido.nombre.trim()) extra.push('🙋 Nombre: ' + pedido.nombre.trim());
    if (pedido.nota.trim()) extra.push('📝 Aclaraciones: ' + pedido.nota.trim());
    if (extra.length) l.push('', extra.join('\n'));
    l.push('', final);
    return l.join('\n');
  }
  function mensajePedido() {
    var l = ['🛒 *NUEVO PEDIDO · REPOLLO*'];
    var packs = [];
    bolsones.forEach(function (b) { if (pedido.bolsones[b.id]) packs.push(lineaPack(b, pedido.bolsones[b.id])); });
    ofertas.forEach(function (o) { if (pedido.ofertas[o.id]) packs.push(lineaPack(o, pedido.ofertas[o.id])); });
    if (packs.length) l.push('', '🧺 *BOLSONES Y OFERTAS*', packs.join('\n'));
    categorias.forEach(function (c) {
      var el = productos.filter(function (p) { return p.categoria === c.id && pedido.productos.indexOf(claveProd(p)) >= 0; });
      if (!el.length) return;
      var todoAConsultar = el.every(function (p) { return precioItem(p) === null; });
      l.push('', c.emoji + ' *' + c.nombre.toUpperCase() + '*' + (todoAConsultar ? ' (precio a consultar)' : ''),
        el.map(function (p) { return lineaProd(p, todoAConsultar); }).join('\n'));
    });
    if (pedido.otros.length) {
      l.push('', '🛍️ *OTROS* (precio a consultar)', pedido.otros.map(function (o) { return '• ' + capital(o); }).join('\n'));
    }
    return cierreMensaje(l, totalConPrecio(), sinPrecio() > 0, '¿Me confirmás el total y el horario de entrega? ¡Gracias! 😊');
  }
  var opcionMenu = '';
  function mensajeUno(item) {
    var esMenu = (D.menuDelDia || []).indexOf(item) >= 0;
    var l = ['🛒 *NUEVO PEDIDO · REPOLLO*', '', esMenu ? '🍽️ *MENÚ DEL DÍA*' : '🧺 *BOLSONES Y OFERTAS*', lineaPack(item, 1)];
    if (esMenu) {
      (item.contenido || []).forEach(function (c) { l.push('   ◦ ' + (typeof c === 'string' ? c : c.texto)); });
      if (item.opciones) l.push('   ◦ ' + capital(item.opciones.titulo.replace(/^Eleg[ií] (la |el |los |las )?/i, '')) + ': ' + (opcionMenu || 'a elegir'));
    }
    return cierreMensaje(l, item.precio, false, '¿Me confirmás el horario de entrega? ¡Gracias! 😊');
  }

  /* ---------- Tarjetas de bolsones y ofertas ---------- */
  // Íconos decorativos según lo que trae cada bolsón (para cuando no hay foto)
  var ICONOS_PROD = [
    [/zanahoria/, 'carrot'], [/manzana/, 'apple'], [/lechuga|acelga|perejil/, 'leafy-green'],
    [/lim[oó]n|naranja|mandarina/, 'citrus'], [/huevo/, 'egg'], [/banana/, 'banana'], [/uva/, 'grape'],
    [/ar[aá]ndano|kiwi|pera|mango|anan[aá]|palta/, 'cherry'], [/tomate|pimiento|choclo|papa|cebolla/, 'salad'],
    [/pata|muslo|pollo/, 'drumstick']
  ];
  function patronDe(item) {
    var out = [];
    item.contenido.forEach(function (c) {
      var t = norm(c.texto);
      ICONOS_PROD.forEach(function (r) { if (r[0].test(t) && out.indexOf(r[1]) < 0) out.push(r[1]); });
    });
    ['leafy-green', 'apple', 'carrot', 'citrus', 'cherry', 'salad'].forEach(function (n) { if (out.length < 8 && out.indexOf(n) < 0) out.push(n); });
    return out.slice(0, 8);
  }

  // Precio "anterior" para mostrar el descuento: precio / (1 - descuento), redondeado hacia arriba a $100
  function precioAntes(item) { return Math.ceil(item.precio / (1 - item.descuento / 100) / 100) * 100; }
  var VISIBLES_BOLSON = 6;
  function tarjetaHTML(item, tipo, i, estrella) {
    var esBolson = tipo === 'bolson';
    var carpeta = esBolson ? 'assets/bolsones/' : 'assets/promos/';
    var n = item.contenido.length;
    return '<article class="' + (esBolson ? 'bolson-card' : 'oferta-card') + (estrella ? ' is-star' : '') + ' reveal" id="' + tipo + '-' + esc(item.id) + '">' +
      '<div class="bolson-media">' +
        mediaHTML({
          foto: item.foto || (carpeta + item.id),
          alt: item.nombre + ': ' + item.contenido.map(function (c) { return c.texto; }).join(', '),
          icono: esBolson ? 'shopping-basket' : 'flame',
          texto: plural(n, 'producto', 'productos'),
          clase: 'media-ilus' + (esBolson ? '' : ' media-oferta'),
          fondo: item.fondo,
          patron: patronDe(item),
          sizes: estrella ? '(min-width: 900px) 520px, 100vw' : '(min-width: 900px) 360px, 82vw'
        }) +
        (item.etiqueta ? (esBolson
          ? '<span class="cinta-bolson cinta-' + esc(item.color || 'verde') + '">' + esc(item.etiqueta) + '</span>'
          : '<span class="etiqueta etiqueta-hot">' + ico('flame') + esc(item.etiqueta) + '</span>') : '') +
      '</div>' +
      '<div class="bolson-body">' +
        '<h3>' + esc(item.nombre) + '</h3>' +
        '<p class="' + (item.bajada ? 'bajada' : 'bolson-sub') + '">' + esc(item.bajada || 'Lo que trae') + '</p>' +
        '<ul class="contenido">' +
          item.contenido.map(function (c, i) { return '<li' + (i >= VISIBLES_BOLSON ? ' class="extra"' : '') + '>' + ico('check') + '<span>' + esc(c.texto) + '</span></li>'; }).join('') +
        '</ul>' +
        (n > VISIBLES_BOLSON ? '<button type="button" class="ver-todo" aria-expanded="false">Ver los ' + n + ' productos' + ico('chevron-down') + '</button>' : '') +
        '<div class="precio-row">' +
          (item.descuento ? '<p class="precio-antes"><s>' + precio(precioAntes(item)) + '</s><span class="desc-badge">-' + item.descuento + '%</span></p>' : '') +
          '<p class="precio">' + precio(item.precio) + '<small>Precio final</small></p>' +
          '<span class="tag-envio">' + ico('truck') + 'Envío gratis</span>' +
        '</div>' +
        '<div class="acciones">' +
          '<a class="btn btn-rojo btn-lg pedir-uno" data-tipo="' + tipo + '" data-id="' + esc(item.id) + '" href="' + waLink(mensajeUno(item)) + '" target="_blank" rel="noopener">' +
            'Pedir ahora<span class="btn-ico">' + ico('arrow-right') + '</span></a>' +
          '<button type="button" class="btn btn-claro btn-lg" data-sumar="' + tipo + '" data-id="' + esc(item.id) + '">' +
            ico('plus') + (esBolson ? 'Sumarle productos' : 'Sumar al pedido') + '</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  var estrella = bolsones.filter(function (b) { return b.destacado; })[0] || bolsones[0];
  var resto = bolsones.filter(function (b) { return b !== estrella; });
  if (estrella) $('#bolson-estrella').innerHTML = tarjetaHTML(estrella, 'bolson', 0, true);
  var carrusel = $('#carrusel');
  carrusel.innerHTML = resto.map(function (b, i) { return tarjetaHTML(b, 'bolson', i + 1, false); }).join('');
  $('#carrusel-dots').innerHTML = resto.map(function () { return '<span></span>'; }).join('');
  if (!resto.length) $('.carrusel-head').hidden = true;

  if (ofertas.length) {
    $('#ofertas').hidden = false;
    $('#ofertas-lista').innerHTML = ofertas.map(function (o, i) { return tarjetaHTML(o, 'oferta', i, false); }).join('');
  }

  /* ---------- Carrusel de Quiénes somos ---------- */
  (function () {
    var fotosNos = D.nosotros || [];
    var ul = $('#nos-slides'), dots = $('#nos-dots');
    if (!fotosNos.length) { $('.nos-carrusel').hidden = true; return; }
    ul.innerHTML = fotosNos.map(function (f, i) {
      return '<li class="nos-slide' + (f.texto ? ' con-texto' : '') + '" aria-label="Foto ' + (i + 1) + ' de ' + fotosNos.length + '">' +
        mediaHTML({ foto: f.foto, alt: f.alt || f.texto || 'Repollo', icono: 'camera', sizes: '(min-width: 900px) 540px, 100vw' }) +
        (f.texto ? '<p>' + esc(f.texto) + '</p>' : '') + '</li>';
    }).join('');
    dots.innerHTML = fotosNos.length > 1 ? fotosNos.map(function (_, i) {
      return '<button type="button" aria-label="Ver foto ' + (i + 1) + '" data-i="' + i + '"></button>';
    }).join('') : '';
    var slides = $$('.nos-slide', ul), botones = $$('button', dots), actual = 0, timer;
    function marcar(i) { actual = i; botones.forEach(function (b, j) { b.classList.toggle('is-on', i === j); }); }
    function ir(i) { ul.scrollTo({ left: slides[i].offsetLeft - ul.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' }); marcar(i); }
    marcar(0);
    dots.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { ir(+b.getAttribute('data-i')); reiniciar(); } });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { if (en.isIntersecting) marcar(slides.indexOf(en.target)); });
      }, { root: ul, threshold: 0.6 });
      slides.forEach(function (sl) { io.observe(sl); });
    }
    function reiniciar() {
      clearInterval(timer);
      if (reduceMotion || slides.length < 2) return;
      timer = setInterval(function () { ir((actual + 1) % slides.length); }, 4500);
    }
    ul.addEventListener('touchstart', reiniciar, { passive: true });
    reiniciar();
  })();

  /* ---------- Video ---------- */
  (function () {
    var v = D.video, marco = $('#video-marco');
    if (!v || !v.archivo) { $('#video-wrap').hidden = true; return; }
    function placeholder() {
      marco.classList.add('sin-video');
      marco.innerHTML = '<div class="video-ph"><span class="video-play">' + ico('send') + '</span>' +
        '<b>' + esc(v.titulo || 'Video') + '</b><small>Muy pronto</small></div>';
    }
    var vid = document.createElement('video');
    vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = 'none';
    vid.setAttribute('muted', ''); vid.setAttribute('playsinline', '');
    if (v.poster) vid.poster = v.poster;
    vid.setAttribute('aria-label', v.titulo || 'Video de Repollo');
    var sonido = document.createElement('button');
    sonido.type = 'button'; sonido.className = 'video-sonido'; sonido.textContent = 'Activar sonido';
    sonido.addEventListener('click', function () {
      vid.muted = !vid.muted; sonido.textContent = vid.muted ? 'Activar sonido' : 'Silenciar';
      if (vid.paused) vid.play().catch(function () {});
    });
    vid.addEventListener('error', placeholder, true);
    var src = document.createElement('source');
    src.src = v.archivo; src.type = 'video/mp4';
    src.addEventListener('error', placeholder);
    vid.appendChild(src);
    marco.appendChild(vid);
    marco.appendChild(sonido);
    if (v.titulo) { var t = document.createElement('p'); t.className = 'video-tit'; t.textContent = v.titulo; marco.appendChild(t); }
    // Carga y reproduce solo cuando se ve en pantalla
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (en.isIntersecting) {
            if (vid.preload !== 'auto') { vid.preload = 'auto'; vid.load(); }
            if (!reduceMotion) vid.play().catch(function () {});
          } else if (!vid.paused) vid.pause();
        });
      }, { threshold: 0.35 }).observe(marco);
    } else { vid.preload = 'auto'; vid.controls = true; }
  })();

  /* ---------- Catálogo (categorías plegables + cantidad) ---------- */
  var FOTO_CAT = {
    verduras: 'assets/productos/verduras', hojas: 'assets/productos/hojas', frutas: 'assets/productos/frutas', pollo: 'assets/productos/pollo',
    rebozados: 'assets/productos/rebozados', pastas: 'assets/productos/pastas', huevos: 'assets/productos/huevos'
  };
  function catDe(id) { return categorias.filter(function (c) { return c.id === id; })[0] || {}; }
  function prodDe(key) { return productos.filter(function (p) { return claveProd(p) === key; })[0] || {}; }
  function cantInicial(key) {
    var p = prodDe(key), us = unidadesProd(p);
    var u = p.unidad && us.indexOf(p.unidad) >= 0 ? p.unidad : (p.por && us.indexOf(p.por) >= 0 ? p.por : us[0]);
    return { u: u, n: NUMS[0] };
  }
  var TXT_PRECIO = D.textoPrecio || 'Precio a consultar';

  var contCats = $('#categorias');
  contCats.innerHTML = categorias.map(function (c) {
    var prods = productos.filter(function (p) { return p.categoria === c.id; });
    if (!prods.length) return '';
    var fila = function (p) {
      var key = esc(claveProd(p));
      var us = unidadesProd(p);
      var der = p.precio
        ? '<b>' + precio(p.precio) + ' <span>' + (POR_CORTO[p.por] || '') + '</span></b>' +
          (p.oferta && p.promos ? '<small class="prod-of">' + esc(promoTxt(p)) + '</small>' : '')
        : '<small class="prod-cons">' + esc(TXT_PRECIO) + '</small>';
      return '<li class="prod" data-key="' + key + '" data-busca="' + esc(norm(p.nombre + ' ' + c.nombre)) + '">' +
        '<button type="button" class="prod-btn" aria-pressed="false">' +
          '<span class="prod-nom"><span class="prod-n">' + esc(capital(p.nombre)) + '</span>' +
            (p.oferta ? '<span class="tag-oferta">Oferta</span>' : '') + '</span>' +
          '<span class="prod-der">' + der + '</span>' +
          '<span class="chip-check">' + ico('plus') + '</span></button>' +
        '<div class="prod-cant" hidden>' +
          (us.length > 1 ? '<div class="unid" role="group" aria-label="Unidad">' + us.map(function (u) {
            return '<button type="button" class="unid-btn" data-u="' + u + '" aria-pressed="false">' + esc((UNIDADES[u] || {}).boton || u) + '</button>';
          }).join('') + '</div>' : '') +
          '<div class="cant-opts" role="group" aria-label="Cantidad">' + (MEDIO && us.indexOf('kg') >= 0 ? [0.5] : []).concat(NUMS).map(function (n) {
            return '<button type="button" class="cant" data-n="' + n + '" aria-pressed="false"></button>';
          }).join('') + '<button type="button" class="cant" data-n="otra" aria-pressed="false">Otra</button></div>' +
          '<input class="cant-input" type="text" placeholder="Escribí la cantidad: 500 g, 1 atado, 6 unidades…" aria-label="Cantidad de ' + esc(p.nombre) + '" hidden>' +
          (p.promos && !p.oferta ? '<p class="prod-promo">Promo: ' + esc(promoTxt(p)) + '</p>' : '') +
          '<p class="prod-sub" aria-live="polite"></p>' +
        '</div></li>';
    };
    return '<section class="categoria" id="cat-' + c.id + '" data-cat="' + c.id + '">' +
      '<button type="button" class="cat-toggle" aria-expanded="false" aria-controls="cuerpo-' + c.id + '">' +
        '<span class="cat-ico">' + mediaHTML({ foto: FOTO_CAT[c.id], alt: '', icono: c.icono || 'leaf', sizes: '72px' }) + '</span>' +
        '<span class="cat-tit"><b>' + esc(c.nombre) + '</b><small>' + plural(prods.length, 'opción', 'opciones') + '</small></span>' +
        '<span class="cat-sel" hidden></span>' +
        '<span class="cat-flecha">' + ico('chevron-down') + '</span>' +
      '</button>' +
      '<div class="cat-cuerpo" id="cuerpo-' + c.id + '" inert><div><ul class="prods">' + prods.map(fila).join('') + '</ul></div></div>' +
      '</section>';
  }).join('');

  var navIn = $('#cat-nav-in');
  navIn.innerHTML = categorias.filter(function (c) {
    return productos.some(function (p) { return p.categoria === c.id; });
  }).map(function (c) {
    return '<a class="cat-pill" href="#cat-' + c.id + '" data-nav="' + c.id + '">' + ico(c.icono || 'leaf') + esc(c.nombre) +
      '<span class="cuenta" hidden></span></a>';
  }).join('');

  function abrirCat(sec, abrir) {
    var t = $('.cat-toggle', sec), cuerpo = $('.cat-cuerpo', sec);
    t.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    sec.classList.toggle('is-open', abrir);
    if (abrir) cuerpo.removeAttribute('inert'); else cuerpo.setAttribute('inert', '');
  }
  navIn.addEventListener('click', function (e) {
    var a = e.target.closest('[data-nav]');
    if (a) abrirCat(document.getElementById('cat-' + a.getAttribute('data-nav')), true);
  });
  // Menú del día en la portada (espacios reservados si todavía no hay menús)
  var menus = D.menuDelDia || [];
  $('#mini-bolsones').innerHTML = menus.length ? menus.map(function (m) {
    return '<a class="mini" href="#" data-menu="' + esc(m.id) + '">' +
      mediaHTML({ foto: m.foto || ('assets/menus/' + m.id), alt: m.nombre, icono: 'chef-hat', eager: true, sizes: '150px' }) +
      '<span class="mini-txt"><b>' + esc(m.nombre) + '</b><small>' + esc((m.contenido || []).length ? (m.opciones ? '+ ' + m.opciones.items.join(', ').toLowerCase() : (typeof m.contenido[1] === 'string' ? '+ ' + m.contenido.slice(1).join(' + ') : '')) : '') + '</small><span>' + precio(m.precio) + '</span></span></a>';
  }).join('') : [1, 2, 3].map(function () {
    return '<div class="mini mini-vacio" aria-hidden="true"><div class="media"></div><span class="mini-txt"><b>&nbsp;</b><span>&nbsp;</span></span></div>';
  }).join('');
  $('#mini-bolsones').addEventListener('click', function (e) {
    var a = e.target.closest('[data-menu]');
    if (!a) return;
    e.preventDefault();
    modoUno = menus.filter(function (m) { return m.id === a.getAttribute('data-menu'); })[0] || null;
    opcionMenu = modoUno && modoUno.opciones ? modoUno.opciones.items[0] : '';
    if (modoUno) abrirPanel();
  });

  // Accesos rápidos de la portada
  $('#accesos').innerHTML =
    categorias.filter(function (c) { return productos.some(function (p) { return p.categoria === c.id; }); }).map(function (c) {
      return '<a class="acceso" href="#cat-' + c.id + '" data-acceso="' + c.id + '">' + ico(c.icono || 'leaf') + esc(c.nombre) + '</a>';
    }).join('') +
    (ofertas.length ? '<a class="acceso acceso-ofertas" href="#ofertas">' + ico('flame') + 'Ofertas</a>' : '');
  $('#accesos').addEventListener('click', function (e) {
    var a = e.target.closest('[data-acceso]');
    if (!a) return;
    $$('.categoria', contCats).forEach(function (sec) { abrirCat(sec, sec.id === 'cat-' + a.getAttribute('data-acceso')); });
  });

  contCats.addEventListener('click', function (e) {
    var tog = e.target.closest('.cat-toggle');
    if (tog) { var sec = tog.closest('.categoria'); abrirCat(sec, !sec.classList.contains('is-open')); return; }
    var fila = e.target.closest('.prod');
    if (!fila) return;
    var key = fila.getAttribute('data-key');
    var c = pedido.cant[key] || cantInicial(key);
    var ub = e.target.closest('.unid-btn');
    if (ub) {
      c.u = ub.getAttribute('data-u');
      if (c.otra !== undefined) { delete c.otra; c.n = NUMS[0]; }
      if (c.n === 0.5 && c.u !== 'kg') c.n = NUMS[0];
      pedido.cant[key] = c;
      actualizar(false);
      return;
    }
    var cb = e.target.closest('.cant');
    if (cb) {
      var v = cb.getAttribute('data-n');
      if (v === 'otra') {
        c.otra = c.otra || '';
        pedido.cant[key] = c;
        actualizar(false);
        $('.cant-input', fila).focus();
      } else {
        delete c.otra; c.n = Number(v);
        pedido.cant[key] = c;
        actualizar(false);
      }
      return;
    }
    if (e.target.closest('.prod-btn')) {
      var idx = pedido.productos.indexOf(key);
      if (idx >= 0) { pedido.productos.splice(idx, 1); delete pedido.cant[key]; }
      else {
        pedido.productos.push(key);
        if (!pedido.cant[key]) pedido.cant[key] = cantInicial(key);
        fila.classList.remove('pop'); void fila.offsetWidth; fila.classList.add('pop');
      }
      actualizar(idx < 0);
    }
  });
  contCats.addEventListener('input', function (e) {
    if (!e.target.classList.contains('cant-input')) return;
    var fila = e.target.closest('.prod'), key = fila.getAttribute('data-key');
    var c = pedido.cant[key] || cantInicial(key);
    c.otra = e.target.value;
    pedido.cant[key] = c;
    guardar(); refrescarLinks();
    $('.prod-sub', fila).textContent = textoCant(c);
  });

  /* ---------- Buscador ---------- */
  var buscar = $('#buscar'), buscarX = $('#buscar-x');
  function filtrar() {
    var q = norm(buscar.value);
    buscarX.hidden = !q;
    var total = 0;
    $$('.categoria', contCats).forEach(function (sec) {
      var visibles = 0;
      $$('.prod', sec).forEach(function (ch) {
        var ok = !q || ch.getAttribute('data-busca').indexOf(q) >= 0;
        ch.hidden = !ok;
        if (ok) visibles++;
      });
      total += visibles;
      sec.hidden = !!q && !visibles;
      abrirCat(sec, !!q && visibles > 0);
    });
    $('#sin-resultados').hidden = !q || total > 0;
    $('#sin-q').textContent = '“' + buscar.value.trim() + '”';
    $('#buscar-estado').textContent = q ? (total ? plural(total, 'producto encontrado', 'productos encontrados') : 'Sin resultados') : '';
  }
  buscar.addEventListener('input', filtrar);
  buscarX.addEventListener('click', function () { buscar.value = ''; filtrar(); buscar.focus(); });
  $('#sumar-otro').addEventListener('click', function () {
    var t = buscar.value.trim();
    if (!t) return;
    if (pedido.otros.indexOf(t) < 0) pedido.otros.push(t);
    buscar.value = ''; filtrar();
    actualizar(true);
    toast('Sumamos “' + t + '” a tu pedido');
  });

  /* ---------- Clicks generales ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-sumar]');
    if (b) {
      var tipo = b.getAttribute('data-sumar'), id = b.getAttribute('data-id');
      var grupo = tipo === 'bolson' ? pedido.bolsones : pedido.ofertas;
      var item = (tipo === 'bolson' ? bolsones : ofertas).filter(function (x) { return x.id === id; })[0];
      grupo[id] = (grupo[id] || 0) + 1;
      actualizar(true);
      toast(item.nombre + ' sumado. Ahora agregale lo que quieras');
      setTimeout(function () { $('#pedido').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); }, 350);
      return;
    }
    var uno = e.target.closest('.pedir-uno');
    if (uno) {
      e.preventDefault();
      var lista = uno.getAttribute('data-tipo') === 'bolson' ? bolsones : ofertas;
      modoUno = lista.filter(function (x) { return x.id === uno.getAttribute('data-id'); })[0] || null;
      abrirPanel();
      return;
    }
    var env = e.target.closest('#barra-enviar, #panel-enviar');
    if (env && !datosOk()) {
      e.preventDefault();
      if (!panel.open) { modoUno = null; abrirPanel(); }
      validar();
      return;
    }
    if (env) setTimeout(cerrarPanel, 400);
    var vt = e.target.closest('.ver-todo');
    if (vt) {
      var card = vt.closest('article'), abierto = card.classList.toggle('ver-todo-on');
      vt.setAttribute('aria-expanded', String(abierto));
      vt.firstChild.textContent = abierto ? 'Ver menos' : 'Ver los ' + $$('.contenido li', card).length + ' productos';
      return;
    }
    if (e.target.closest('[data-abrir-pedido]')) { modoUno = null; abrirPanel(); return; }
    if (e.target.closest('[data-cerrar-panel]')) cerrarPanel();
  });

  /* ---------- Toast ---------- */
  var toastEl = $('#toast'), toastT;
  function toast(msg) {
    toastEl.innerHTML = '<span class="ok">' + ico('check') + '</span><span></span>';
    toastEl.lastChild.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2600);
  }

  /* ---------- Barra y panel ---------- */
  var panel = $('#panel'), panelBody = $('#panel-body');

  function resumenCorto() {
    var partes = [];
    var nb = sumar(pedido.bolsones), no = sumar(pedido.ofertas), np = pedido.productos.length + pedido.otros.length;
    if (nb) partes.push(plural(nb, 'bolsón', 'bolsones'));
    if (no) partes.push(plural(no, 'oferta', 'ofertas'));
    if (np) partes.push(plural(np, 'producto', 'productos'));
    return partes.join(' · ');
  }

  var modoUno = null;   // bolsón u oferta pedido con "Pedir ahora"
  function datosOk() { return !!(pedido.nombre.trim() && pedido.direccion.trim()); }
  function validar() {
    var faltan = [];
    [['p-nombre', pedido.nombre, 'Escribí tu nombre'], ['p-dir', pedido.direccion, 'Escribí la dirección de entrega']].forEach(function (f) {
      var inp = document.getElementById(f[0]);
      if (!inp) return;
      var err = document.getElementById(f[0] + '-err');
      var mal = !String(f[1]).trim();
      inp.classList.toggle('con-error', mal);
      inp.setAttribute('aria-invalid', mal ? 'true' : 'false');
      if (err) err.textContent = mal ? f[2] : '';
      if (mal) faltan.push(inp);
    });
    if (faltan.length) {
      faltan[0].scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
      faltan[0].focus({ preventScroll: true });
      toast('Completá tu nombre y dirección para enviar el pedido');
    }
    return !faltan.length;
  }
  function refrescarLinks() {
    var msg = modoUno ? mensajeUno(modoUno) : mensajePedido();
    $('#barra-enviar').href = waLink(mensajePedido());
    $('#panel-enviar').href = waLink(msg);
    var pre = $('#p-pre'); if (pre) pre.textContent = msg;
  }

  function actualizar(animar) {
    guardar();
    var n = cantidadTotal();
    document.body.classList.toggle('has-order', n > 0);
    $('#barra-pedido').setAttribute('aria-hidden', n > 0 ? 'false' : 'true');
    $('#barra-n').textContent = n;
    $('#barra-detalle').textContent = resumenCorto() || 'Vacío';
    if (animar) {
      var cesta = $('.barra-cesta');
      cesta.classList.remove('bump'); void cesta.offsetWidth; cesta.classList.add('bump');
    }
    refrescarLinks();
    $$('.barra-pedido a, .barra-pedido button').forEach(function (el) { el.tabIndex = n > 0 ? 0 : -1; });

    $$('.prod', contCats).forEach(function (fila) {
      var key = fila.getAttribute('data-key');
      var on = pedido.productos.indexOf(key) >= 0;
      var btn = $('.prod-btn', fila);
      if (btn.getAttribute('aria-pressed') !== String(on)) {
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        $('.chip-check', btn).innerHTML = ico(on ? 'check' : 'plus');
      }
      fila.classList.toggle('is-on', on);
      $('.prod-cant', fila).hidden = !on;
      var c = on ? (pedido.cant[key] || cantInicial(key)) : null;
      var otra = !!(c && c.otra !== undefined);
      fila.classList.toggle('is-otra', otra);
      var inp = $('.cant-input', fila);
      inp.hidden = !otra;
      if (otra && document.activeElement !== inp) inp.value = c.otra;
      $$('.unid-btn', fila).forEach(function (b) { b.setAttribute('aria-pressed', String(!!c && b.getAttribute('data-u') === c.u)); });
      var usP = unidadesProd(prodDe(key));
      $$('.cant', fila).forEach(function (b) {
        var v = b.getAttribute('data-n');
        var uAct = (c && c.u) || usP[0];
        if (v !== 'otra') { b.textContent = textoCant({ u: uAct, n: Number(v) }); b.hidden = Number(v) === 0.5 && uAct !== 'kg'; }
        b.setAttribute('aria-pressed', String(v === 'otra' ? otra : (!!c && !otra && Number(v) === c.n)));
      });
      var pr = c ? precioItem(prodDe(key)) : null;
      $('.prod-sub', fila).textContent = c ? textoCant(c) + (pr ? ' · ' + precio(pr) : '') : '';
    });
    $$('.categoria', contCats).forEach(function (sec) {
      var id = sec.getAttribute('data-cat');
      var n = pedido.productos.filter(function (k) { return k.indexOf(id + '|') === 0; }).length;
      var b = $('.cat-sel', sec); b.hidden = !n; b.textContent = n + (n === 1 ? ' elegido' : ' elegidos');
    });
    $$('[data-nav]', navIn).forEach(function (a) {
      var id = a.getAttribute('data-nav');
      var c = pedido.productos.filter(function (k) { return k.indexOf(id + '|') === 0; }).length;
      var badge = $('.cuenta', a);
      badge.hidden = !c;
      badge.textContent = c;
    });
    if (panel.open) pintarPanel();
  }

  function camposHTML(total) {
    var h = '<div class="p-seccion"><h3>' + ico('map-pin') + 'Tus datos</h3><div class="p-campos">' +
      '<div><label for="p-nombre">Nombre <small>(obligatorio)</small></label>' +
      '<input id="p-nombre" autocomplete="name" required aria-required="true" aria-describedby="p-nombre-err" value="' + esc(pedido.nombre) + '">' +
      '<span class="p-err" id="p-nombre-err" aria-live="polite"></span></div>' +
      '<div><label for="p-dir">Dirección de entrega <small>(obligatorio)</small></label>' +
      '<input id="p-dir" autocomplete="street-address" required aria-required="true" aria-describedby="p-dir-err" placeholder="Calle, número y barrio" value="' + esc(pedido.direccion) + '">' +
      '<span class="p-err" id="p-dir-err" aria-live="polite"></span></div>' +
      '</div></div>';
    h += '<div class="p-seccion"><h3>' + ico('receipt') + '¿Cómo pagás?</h3><div class="pago-opts" role="group" aria-label="Forma de pago">' +
      ['efectivo', 'transferencia', 'debito', 'credito'].map(function (k) {
        return '<button type="button" class="pago-btn" data-pago="' + k + '" aria-pressed="' + (pedido.pago === k) + '">' +
          (k === 'credito' ? 'Crédito' : PAGO_TXT[k]) + '</button>';
      }).join('') + '</div>';
    if (pedido.pago === 'efectivo') {
      h += '<div class="pago-efectivo"><label for="p-abono">¿Con cuánto abonás?</label><div class="pago-fila">' +
        '<input id="p-abono" inputmode="numeric" placeholder="Ej: 20000" value="' + esc(pedido.abono) + '"' + (pedido.pagoJusto ? ' disabled' : '') + '>' +
        '<button type="button" class="pago-btn pago-justo" aria-pressed="' + !!pedido.pagoJusto + '">Pago justo</button></div></div>';
    }
    if (pedido.pago === 'credito' && RECARGO_CRED) {
      h += '<p class="pago-nota">Con crédito hay un ' + RECARGO_CRED + '% de recargo' + (total ? ': el total queda en <b>' + precio(conRecargo(total)) + '</b>.' : '.') + '</p>';
    }
    if (pedido.pago === 'debito') h += '<p class="pago-nota">Débito sin recargo. Pagás con posnet al recibir.</p>';
    if (pedido.pago === 'transferencia') h += '<p class="pago-nota">' + esc(PAGOS.textoTransferencia || 'Te pasamos el alias por WhatsApp.') + '</p>';
    h += '</div>';
    h += '<div class="p-campos"><div><label for="p-nota">¿Alguna aclaración? <small>(opcional)</small></label>' +
      '<textarea id="p-nota" placeholder="Ej: tocar timbre, bananas no tan maduras…">' + esc(pedido.nota) + '</textarea></div></div>';
    return h;
  }

  function pintarPanel() {
    var n = cantidadTotal();
    $('#t-panel').innerHTML = modoUno ? 'Pedir <em>ahora</em>' : 'Tu <em>pedido</em>';
    if (modoUno) {
      $('#panel-foot').hidden = false;
      panelBody.innerHTML = '<div class="p-grupo"><h3>' + ico('shopping-basket') + 'Vas a pedir</h3>' +
        '<div class="p-item"><span class="p-item-txt"><b>' + esc(modoUno.nombre) + '</b><small>' +
          esc((modoUno.contenido && typeof modoUno.contenido[0] === 'string') ? modoUno.contenido.join(' + ') : 'Envío gratis') + '</small></span>' +
        '<span class="precio p-uno-precio">' + precio(modoUno.precio) + '</span></div>' +
        (modoUno.opciones ? '<div class="p-seccion p-opcion"><h3>' + ico('chef-hat') + esc(modoUno.opciones.titulo) + '</h3><div class="pago-opts">' +
          modoUno.opciones.items.map(function (o) { return '<button type="button" class="pago-btn" data-opcion="' + esc(o) + '" aria-pressed="' + (opcionMenu === o) + '">' + esc(o) + '</button>'; }).join('') +
          '</div></div>' : '') + '</div>' +
        camposHTML(modoUno.precio) +
        '<details class="p-preview"><summary>Ver cómo le llega el mensaje a Repollo</summary><pre id="p-pre"></pre></details>';
      $('#p-pre').textContent = mensajeUno(modoUno);
      return;
    }
    $('#panel-foot').hidden = !n;
    if (!n) {
      panelBody.innerHTML = '<div class="p-vacio"><span class="ph-ico">' + ico('shopping-basket') + '</span>' +
        '<p><b>Tu pedido está vacío.</b><br>Elegí un bolsón o tocá los productos que quieras.</p>' +
        '<a class="btn btn-amarillo btn-lg" href="#bolsones" data-cerrar-panel>Ver bolsones<span class="btn-ico">' + ico('arrow-right') + '</span></a></div>';
      return;
    }
    var h = '', packs = [];
    bolsones.forEach(function (b) { if (pedido.bolsones[b.id]) packs.push({ t: 'bolson', it: b, q: pedido.bolsones[b.id] }); });
    ofertas.forEach(function (o) { if (pedido.ofertas[o.id]) packs.push({ t: 'oferta', it: o, q: pedido.ofertas[o.id] }); });
    if (packs.length) {
      h += '<div class="p-grupo"><h3>' + ico('shopping-basket') + 'Bolsones y ofertas</h3>' + packs.map(function (p) {
        return '<div class="p-item">' +
          '<span class="p-item-txt"><b>' + esc(p.it.nombre) + '</b><small>' + precio(p.it.precio) + ' c/u</small></span>' +
          '<span class="stepper">' +
            '<button type="button" data-paso="-1" data-t="' + p.t + '" data-id="' + esc(p.it.id) + '" aria-label="' + (p.q === 1 ? 'Quitar ' : 'Uno menos de ') + esc(p.it.nombre) + '">' + ico(p.q === 1 ? 'trash-2' : 'minus') + '</button>' +
            '<output aria-label="Cantidad">' + p.q + '</output>' +
            '<button type="button" data-paso="1" data-t="' + p.t + '" data-id="' + esc(p.it.id) + '" aria-label="Uno más de ' + esc(p.it.nombre) + '">' + ico('plus') + '</button>' +
          '</span></div>';
      }).join('') + '</div>';
    }
    categorias.forEach(function (c) {
      var el = productos.filter(function (p) { return p.categoria === c.id && pedido.productos.indexOf(claveProd(p)) >= 0; });
      if (!el.length) return;
      h += '<div class="p-grupo"><h3>' + ico(c.icono || 'leaf') + esc(c.nombre) + '</h3><div class="p-chips">' + el.map(function (p) {
        return '<button type="button" class="p-chip" data-quitar="' + esc(claveProd(p)) + '" aria-label="Quitar ' + esc(p.nombre) + '">' +
          esc(capital(conCant(p))) + '<span class="x">' + ico('x') + '</span></button>';
      }).join('') + '</div></div>';
    });
    if (pedido.otros.length) {
      h += '<div class="p-grupo"><h3>' + ico('plus') + 'Otros</h3><div class="p-chips">' + pedido.otros.map(function (o, i) {
        return '<button type="button" class="p-chip" data-quitar-otro="' + i + '" aria-label="Quitar ' + esc(o) + '">' + esc(o) + '<span class="x">' + ico('x') + '</span></button>';
      }).join('') + '</div></div>';
    }
    var total = totalConPrecio();
    var faltanN = sinPrecio();
    if (total) {
      var cred = pedido.pago === 'credito' && RECARGO_CRED;
      h += '<div class="p-total"><span>' + (faltanN ? 'Total estimado' : 'Total') + (cred ? ' con crédito' : '') + '</span><span class="precio">' + precio(cred ? conRecargo(total) : total) + '</span>' +
        '<small>' + (faltanN ? 'Más ' + plural(faltanN, 'producto', 'productos') + ' con precio a consultar: te pasamos el total final por WhatsApp. ' : '') + 'Envío gratis.</small></div>';
    } else {
      h += '<div class="p-total"><span>Envío gratis</span><small>Te respondemos con los precios del día y el total.</small></div>';
    }
    h += camposHTML(total) +
      '<details class="p-preview"><summary>Ver cómo le llega el mensaje a Repollo</summary><pre id="p-pre"></pre></details>' +
      '<button type="button" class="p-vaciar" id="p-vaciar">Vaciar pedido</button>';
    panelBody.innerHTML = h;
    $('#p-pre').textContent = mensajePedido();
  }

  panelBody.addEventListener('click', function (e) {
    var op = e.target.closest('[data-opcion]');
    if (op) {
      opcionMenu = op.getAttribute('data-opcion');
      pintarPanel(); refrescarLinks();
      var nb = $('[data-opcion="' + opcionMenu + '"]', panelBody); if (nb) nb.focus();
      return;
    }
    var pb = e.target.closest('[data-pago]');
    if (pb) {
      var k = pb.getAttribute('data-pago');
      pedido.pago = pedido.pago === k ? '' : k;
      guardar(); pintarPanel(); refrescarLinks();
      var nuevo = $('[data-pago="' + k + '"]', panelBody); if (nuevo) nuevo.focus();
      if (pedido.pago === 'efectivo' && !pedido.pagoJusto) { var ab = $('#p-abono'); if (ab) ab.focus(); }
      return;
    }
    if (e.target.closest('.pago-justo')) {
      pedido.pagoJusto = !pedido.pagoJusto;
      guardar(); pintarPanel(); refrescarLinks();
      var pj = $('.pago-justo', panelBody); if (pj) pj.focus();
      return;
    }
    var paso = e.target.closest('[data-paso]');
    if (paso) {
      var g = paso.getAttribute('data-t') === 'bolson' ? pedido.bolsones : pedido.ofertas;
      var id = paso.getAttribute('data-id');
      g[id] = (g[id] || 0) + Number(paso.getAttribute('data-paso'));
      if (g[id] <= 0) delete g[id];
      actualizar(false);
      enfocarDespues(paso);
      return;
    }
    var q = e.target.closest('[data-quitar]');
    if (q) {
      var i = pedido.productos.indexOf(q.getAttribute('data-quitar'));
      if (i >= 0) pedido.productos.splice(i, 1);
      delete pedido.cant[q.getAttribute('data-quitar')];
      actualizar(false); enfocarDespues(null);
      return;
    }
    var qo = e.target.closest('[data-quitar-otro]');
    if (qo) {
      pedido.otros.splice(Number(qo.getAttribute('data-quitar-otro')), 1);
      actualizar(false); enfocarDespues(null);
      return;
    }
    var vaciar = e.target.closest('#p-vaciar');
    if (vaciar && !vaciar.classList.contains('confirmar')) {
      vaciar.classList.add('confirmar');
      vaciar.textContent = 'Tocá de nuevo para vaciar el pedido';
      setTimeout(function () { if (vaciar.isConnected) { vaciar.classList.remove('confirmar'); vaciar.textContent = 'Vaciar pedido'; } }, 3500);
      return;
    }
    if (vaciar) {
      pedido.bolsones = {}; pedido.ofertas = {}; pedido.productos = []; pedido.cant = {}; pedido.otros = []; pedido.nota = '';
      actualizar(false);
      toast('Pedido vacío. ¡Arrancamos de nuevo!');
    }
  });

  function enfocarDespues(btn) {
    if (btn) {
      var mismo = $('[data-paso="' + btn.getAttribute('data-paso') + '"][data-id="' + btn.getAttribute('data-id') + '"]', panelBody);
      if (mismo) { mismo.focus(); return; }
    }
    var primero = $('.p-chip, [data-paso], textarea', panelBody) || $('.btn-circ', panel);
    if (primero) primero.focus();
  }

  panelBody.addEventListener('input', function (e) {
    var id = e.target.id;
    if (id === 'p-nota') pedido.nota = e.target.value;
    else if (id === 'p-nombre') pedido.nombre = e.target.value;
    else if (id === 'p-dir') pedido.direccion = e.target.value;
    else if (id === 'p-abono') pedido.abono = e.target.value;
    else return;
    if ((id === 'p-nombre' || id === 'p-dir') && e.target.value.trim()) {
      e.target.classList.remove('con-error'); e.target.setAttribute('aria-invalid', 'false');
      var er = document.getElementById(id + '-err'); if (er) er.textContent = '';
    }
    guardar();
    refrescarLinks();
  });

  function abrirPanel() {
    pintarPanel();
    refrescarLinks();
    if (typeof panel.showModal === 'function') panel.showModal();
    else panel.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';
  }
  function cerrarPanel() {
    if (panel.open) { if (typeof panel.close === 'function') panel.close(); else panel.removeAttribute('open'); }
  }
  panel.addEventListener('close', function () { document.documentElement.style.overflow = ''; modoUno = null; refrescarLinks(); });
  panel.addEventListener('click', function (e) { if (e.target === panel) cerrarPanel(); });

  /* ---------- Carrusel ---------- */
  (function () {
    var cards = $$('.bolson-card', carrusel);
    var dots = $$('span', $('#carrusel-dots'));
    if (!cards.length) return;
    function marcar(i) {
      cards.forEach(function (c, j) { c.classList.toggle('is-active', i === j); });
      dots.forEach(function (d, j) { d.classList.toggle('is-on', i === j); });
    }
    marcar(0);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { if (en.isIntersecting) marcar(cards.indexOf(en.target)); });
      }, { root: carrusel, threshold: 0.6 });
      cards.forEach(function (c) { io.observe(c); });
    }
    $$('[data-carrusel]').forEach(function (b) {
      b.addEventListener('click', function () {
        carrusel.scrollBy({ left: Number(b.getAttribute('data-carrusel')) * (cards[0].offsetWidth + 14), behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  })();

  /* ---------- Navegación pegajosa del catálogo ---------- */
  (function () {
    var nav = $('#cat-nav');
    var pills = $$('[data-nav]', navIn);
    function marcar(id) {
      pills.forEach(function (p) {
        var on = p.getAttribute('data-nav') === id;
        p.classList.toggle('is-on', on);
        if (on) {
          p.setAttribute('aria-current', 'true');
          navIn.scrollTo({ left: p.offsetLeft - (navIn.clientWidth - p.offsetWidth) / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
        } else p.removeAttribute('aria-current');
      });
    }
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) marcar(en.target.getAttribute('data-cat')); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    $$('.categoria', contCats).forEach(function (s) { io.observe(s); });
    var centinela = document.createElement('div');
    nav.parentNode.insertBefore(centinela, nav);
    new IntersectionObserver(function (ents) {
      nav.classList.toggle('is-stuck', !ents[0].isIntersecting && ents[0].boundingClientRect.top < 0);
    }, { rootMargin: '-80px 0px 0px 0px' }).observe(centinela);
  })();

  /* ---------- Barra superior: transparente sobre la portada ---------- */
  var topbar = $('#topbar');
  function revisarTopbar() { topbar.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', revisarTopbar, { passive: true });
  revisarTopbar();

  /* ---------- Aparición al scrollear ---------- */
  activarImagenes(document);
  if ('IntersectionObserver' in window && !reduceMotion) {
    var ioR = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); ioR.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    $$('.reveal').forEach(function (el) { ioR.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  actualizar(false);
})();
