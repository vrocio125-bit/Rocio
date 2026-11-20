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
  var VISIBLES = D.productosVisibles || 10;

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
    return '<div class="media ' + (o.clase || '') + '"' + (o.tono ? ' style="--tono:' + o.tono + '"' : '') + '>' +
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
    equipo: { alt: 'El equipo de Repollo saludando detrás del mostrador', icono: 'heart' },
    local2: { alt: 'Vecinos comprando en Repollo', icono: 'store' }
  };
  $$('[data-media]').forEach(function (el) {
    var k = el.getAttribute('data-media');
    el.innerHTML = mediaHTML({
      foto: (D.imagenes || {})[k], alt: fotos[k].alt, icono: fotos[k].icono,
      eager: k === 'local', sizes: k === 'local' ? '100vw' : '(min-width: 900px) 560px, 100vw'
    });
  });

  // Enlaces fijos de WhatsApp
  var MSJ = { hola: 'Hola Repollo! 👋 Quiero hacer un pedido.', clave: D.palabraClaveBolson || 'BOLSÓN' };
  $$('[data-wa]').forEach(function (a) { a.href = waLink(MSJ[a.getAttribute('data-wa')] || MSJ.hola); });

  // Cinta en movimiento
  var cintaItems = categorias.map(function (c) { return c.nombre; }).concat(['Envío gratis', 'Bolsones']);
  var cintaHTML = '<span>' + cintaItems.map(function (t, i) {
    return (i % 2 ? '<em>' + esc(t) + '</em>' : esc(t)) + ico('sparkles');
  }).join('') + '</span>';
  $('#cinta').innerHTML = cintaHTML + cintaHTML;

  /* ---------- Estado del pedido ---------- */
  var KEY = 'repollo-pedido-v1';
  var pedido = { bolsones: {}, ofertas: {}, productos: [], otros: [], nota: '', nombre: '', direccion: '' };
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
  })();

  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(pedido)); } catch (e) { /* nada */ } }
  function sumar(obj) { return Object.keys(obj).reduce(function (t, k) { return t + obj[k]; }, 0); }
  function cantidadTotal() { return sumar(pedido.bolsones) + sumar(pedido.ofertas) + pedido.productos.length + pedido.otros.length; }
  function totalConPrecio() {
    var t = 0;
    bolsones.forEach(function (b) { t += (pedido.bolsones[b.id] || 0) * b.precio; });
    ofertas.forEach(function (o) { t += (pedido.ofertas[o.id] || 0) * o.precio; });
    return t;
  }

  /* ---------- Mensajes de WhatsApp ---------- */
  function lineaPack(item, cant, emoji) {
    return emoji + ' ' + item.nombre + ' x' + cant + ' (' + precio(item.precio) + (cant > 1 ? ' c/u' : '') + ')';
  }
  function mensajePedido() {
    var l = ['Hola Repollo! 👋 Quiero hacer este pedido:'];
    bolsones.forEach(function (b) { if (pedido.bolsones[b.id]) l.push(lineaPack(b, pedido.bolsones[b.id], '🧺')); });
    ofertas.forEach(function (o) { if (pedido.ofertas[o.id]) l.push(lineaPack(o, pedido.ofertas[o.id], o.emoji || '🔥')); });
    categorias.forEach(function (c) {
      var el = productos.filter(function (p) { return p.categoria === c.id && pedido.productos.indexOf(claveProd(p)) >= 0; })
        .map(function (p) { return p.nombre; });
      if (el.length) l.push(c.emoji + ' ' + c.nombre + ': ' + el.join(', '));
    });
    if (pedido.otros.length) l.push('🛍️ Otros: ' + pedido.otros.join(', '));
    var total = totalConPrecio();
    if (total) l.push('💰 Bolsones y ofertas: ' + precio(total) + ' · Envío gratis 🛵');
    if (pedido.nota.trim()) l.push('📝 Aclaraciones: ' + pedido.nota.trim());
    if (pedido.nombre.trim()) l.push('🙋 A nombre de: ' + pedido.nombre.trim());
    if (pedido.direccion.trim()) l.push('📍 Entregar en: ' + pedido.direccion.trim());
    l.push('¿Me confirmás el total y cuándo me lo traen? ¡Gracias! 😊');
    return l.join('\n');
  }
  function mensajeUno(item, emoji) {
    return ['Hola Repollo! 👋 Quiero pedir:', lineaPack(item, 1, emoji), '🛵 Con envío gratis',
      '¿Me confirmás cuándo me lo traen? ¡Gracias! 😊'].join('\n');
  }

  /* ---------- Tarjetas de bolsones y ofertas ---------- */
  var TONOS = ['255, 216, 74', '76, 240, 138', '255, 160, 110', '140, 220, 255', '255, 216, 74'];

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
          clase: esBolson ? 'media-neon' : 'media-neon media-fuego',
          tono: esBolson ? TONOS[i % TONOS.length] : null,
          sizes: estrella ? '(min-width: 900px) 520px, 100vw' : '(min-width: 900px) 360px, 82vw'
        }) +
        (item.etiqueta ? '<span class="etiqueta' + (estrella || !esBolson ? ' etiqueta-hot' : '') + '">' +
          ico(estrella || !esBolson ? 'flame' : 'sparkles') + esc(item.etiqueta) + '</span>' : '') +
      '</div>' +
      '<div class="bolson-body">' +
        '<h3>' + esc(item.nombre) + '</h3>' +
        '<p class="' + (item.bajada ? 'bajada' : 'bolson-sub') + '">' + esc(item.bajada || 'Lo que trae') + '</p>' +
        '<ul class="contenido">' +
          item.contenido.map(function (c) { return '<li>' + ico('check') + '<span>' + esc(c.texto) + '</span></li>'; }).join('') +
        '</ul>' +
        '<div class="precio-row">' +
          '<p class="precio">' + precio(item.precio) + '<small>Precio final</small></p>' +
          '<span class="tag-envio">' + ico('truck') + 'Envío gratis</span>' +
        '</div>' +
        '<div class="acciones">' +
          '<a class="btn btn-rojo btn-lg" href="' + waLink(mensajeUno(item, esBolson ? '🧺' : (item.emoji || '🔥'))) + '" target="_blank" rel="noopener">' +
            'Pedir ahora<span class="btn-ico">' + ico('arrow-right') + '</span></a>' +
          '<button type="button" class="btn ' + (esBolson ? 'btn-glass' : 'btn-claro') + ' btn-lg" data-sumar="' + tipo + '" data-id="' + esc(item.id) + '">' +
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

  /* ---------- Lo que vendemos ---------- */
  var resumen = [
    { id: 'verduras', txt: 'Verduras y frutas', icono: 'leafy-green', foto: 'assets/productos/verduras-y-frutas' },
    { id: 'pollo', txt: 'Pollo', icono: 'drumstick', foto: 'assets/productos/pollo' },
    { id: 'rebozados', txt: 'Rebozados', icono: 'chef-hat', foto: 'assets/productos/rebozados' },
    { id: 'pastas', txt: 'Pastas', icono: 'wheat', foto: 'assets/productos/pastas' },
    { id: 'huevos', txt: 'Huevos', icono: 'egg', foto: 'assets/productos/huevos' }
  ];
  $('#vendemos').innerHTML = resumen.map(function (r, i) {
    return '<li class="reveal" style="transition-delay:' + (i * 70) + 'ms"><a class="vende" href="#cat-' + r.id + '">' +
      mediaHTML({ foto: r.foto, alt: r.txt, icono: r.icono, sizes: '(min-width: 900px) 220px, 50vw' }) +
      '<span class="vende-txt"><span>' + r.txt + '</span><span class="vende-flecha">' + ico('arrow-right') + '</span></span>' +
      '</a></li>';
  }).join('');

  /* ---------- Galería ---------- */
  var galeria = D.galeria || [];
  if (galeria.length) {
    $('#galeria').innerHTML = galeria.map(function (g) {
      return '<li class="galeria-item">' +
        mediaHTML({ foto: g.foto, alt: g.texto, icono: 'camera', sizes: '(min-width: 900px) 280px, 66vw' }) +
        '<p>' + esc(g.texto) + '</p></li>';
    }).join('');
  } else {
    $('.galeria-wrap').hidden = true;
  }

  /* ---------- Catálogo ---------- */
  var contCats = $('#categorias');
  contCats.innerHTML = categorias.map(function (c) {
    var prods = productos.filter(function (p) { return p.categoria === c.id; });
    if (!prods.length) return '';
    var chip = function (p) {
      return '<button type="button" class="chip" aria-pressed="false" data-key="' + esc(claveProd(p)) + '" data-busca="' + esc(norm(p.nombre + ' ' + c.nombre)) + '">' +
        '<span class="chip-txt">' + esc(capital(p.nombre)) + '</span>' +
        '<span class="chip-check">' + ico('plus') + '</span></button>';
    };
    var primeros = prods.slice(0, VISIBLES), extra = prods.slice(VISIBLES);
    return '<section class="categoria" id="cat-' + c.id + '" data-cat="' + c.id + '" aria-labelledby="h-' + c.id + '">' +
      '<div class="cat-head"><span class="cat-ico">' + ico(c.icono || 'leaf') + '</span>' +
      '<h3 id="h-' + c.id + '">' + esc(c.nombre) + '<small>' + plural(prods.length, 'opción', 'opciones') + ' · tocá para sumar</small></h3></div>' +
      '<div class="chips">' + primeros.map(chip).join('') + '</div>' +
      (extra.length ?
        '<div class="mas" id="mas-' + c.id + '" inert><div><div class="chips">' + extra.map(chip).join('') + '</div></div></div>' +
        '<button type="button" class="ver-mas" aria-expanded="false" aria-controls="mas-' + c.id + '" data-total="' + prods.length + '">' +
          '<span class="ver-mas-txt">Ver toda la lista (' + prods.length + ')</span>' + ico('chevron-down') + '</button>'
        : '') +
      '</section>';
  }).join('');

  var navIn = $('#cat-nav-in');
  navIn.innerHTML = categorias.filter(function (c) {
    return productos.some(function (p) { return p.categoria === c.id; });
  }).map(function (c) {
    return '<a class="cat-pill" href="#cat-' + c.id + '" data-nav="' + c.id + '">' + ico(c.icono || 'leaf') + esc(c.nombre) +
      '<span class="cuenta" hidden></span></a>';
  }).join('');

  function abrirMas(boton, abrir) {
    var mas = document.getElementById(boton.getAttribute('aria-controls'));
    boton.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    mas.classList.toggle('is-open', abrir);
    if (abrir) mas.removeAttribute('inert'); else mas.setAttribute('inert', '');
    $('.ver-mas-txt', boton).textContent = abrir ? 'Ver menos' : 'Ver toda la lista (' + boton.getAttribute('data-total') + ')';
  }

  contCats.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (chip) {
      var key = chip.getAttribute('data-key');
      var idx = pedido.productos.indexOf(key);
      if (idx >= 0) pedido.productos.splice(idx, 1);
      else {
        pedido.productos.push(key);
        chip.classList.remove('pop'); void chip.offsetWidth; chip.classList.add('pop');
      }
      actualizar(idx < 0);
      return;
    }
    var vm = e.target.closest('.ver-mas');
    if (vm) {
      var abrir = vm.getAttribute('aria-expanded') !== 'true';
      abrirMas(vm, abrir);
      if (!abrir) {
        var sec = vm.closest('.categoria');
        if (sec.getBoundingClientRect().top < 0) sec.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
  });

  /* ---------- Buscador ---------- */
  var buscar = $('#buscar'), buscarX = $('#buscar-x');
  function filtrar() {
    var q = norm(buscar.value);
    buscarX.hidden = !q;
    var total = 0;
    $$('.categoria', contCats).forEach(function (sec) {
      var visibles = 0;
      $$('.chip', sec).forEach(function (ch) {
        var ok = !q || ch.getAttribute('data-busca').indexOf(q) >= 0;
        ch.hidden = !ok;
        if (ok) visibles++;
      });
      total += visibles;
      sec.hidden = !!q && !visibles;
      var vm = $('.ver-mas', sec);
      if (vm) { vm.hidden = !!q; abrirMas(vm, !!q); }
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
    if (e.target.closest('[data-abrir-pedido]')) { abrirPanel(); return; }
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

  function refrescarLinks() {
    var url = waLink(mensajePedido());
    $('#barra-enviar').href = url;
    $('#panel-enviar').href = url;
    var pre = $('#p-pre'); if (pre) pre.textContent = mensajePedido();
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

    $$('.chip', contCats).forEach(function (ch) {
      var on = pedido.productos.indexOf(ch.getAttribute('data-key')) >= 0;
      if (ch.getAttribute('aria-pressed') !== String(on)) {
        ch.setAttribute('aria-pressed', on ? 'true' : 'false');
        $('.chip-check', ch).innerHTML = ico(on ? 'check' : 'plus');
      }
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

  function pintarPanel() {
    var n = cantidadTotal();
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
          esc(capital(p.nombre)) + '<span class="x">' + ico('x') + '</span></button>';
      }).join('') + '</div></div>';
    });
    if (pedido.otros.length) {
      h += '<div class="p-grupo"><h3>' + ico('plus') + 'Otros</h3><div class="p-chips">' + pedido.otros.map(function (o, i) {
        return '<button type="button" class="p-chip" data-quitar-otro="' + i + '" aria-label="Quitar ' + esc(o) + '">' + esc(o) + '<span class="x">' + ico('x') + '</span></button>';
      }).join('') + '</div></div>';
    }
    var total = totalConPrecio();
    var hayProductos = pedido.productos.length + pedido.otros.length > 0;
    if (total) {
      h += '<div class="p-total"><span>Bolsones y ofertas</span><span class="precio">' + precio(total) + '</span>' +
        '<small>' + (hayProductos ? 'Los productos sueltos te los cotizamos con el precio del día. ' : '') + 'Envío gratis.</small></div>';
    } else {
      h += '<div class="p-total"><span>Envío gratis</span><small>Te respondemos con los precios del día y el total.</small></div>';
    }
    h += '<div class="p-campos">' +
      '<div><label for="p-nota">¿Alguna aclaración? <small>(opcional)</small></label>' +
      '<textarea id="p-nota" placeholder="Ej: 2 kg de papa, bananas no tan maduras…">' + esc(pedido.nota) + '</textarea></div>' +
      '<div><label for="p-nombre">Tu nombre <small>(opcional)</small></label>' +
      '<input id="p-nombre" autocomplete="name" value="' + esc(pedido.nombre) + '"></div>' +
      '<div><label for="p-dir">Dirección de entrega <small>(opcional)</small></label>' +
      '<input id="p-dir" autocomplete="street-address" value="' + esc(pedido.direccion) + '"></div>' +
      '</div>' +
      '<details class="p-preview"><summary>Ver cómo le llega el mensaje a Repollo</summary><pre id="p-pre"></pre></details>' +
      '<button type="button" class="p-vaciar" id="p-vaciar">Vaciar pedido</button>';
    panelBody.innerHTML = h;
    $('#p-pre').textContent = mensajePedido();
  }

  panelBody.addEventListener('click', function (e) {
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
      actualizar(false); enfocarDespues(null);
      return;
    }
    var qo = e.target.closest('[data-quitar-otro]');
    if (qo) {
      pedido.otros.splice(Number(qo.getAttribute('data-quitar-otro')), 1);
      actualizar(false); enfocarDespues(null);
      return;
    }
    if (e.target.closest('#p-vaciar') && window.confirm('¿Vaciamos el pedido?')) {
      pedido.bolsones = {}; pedido.ofertas = {}; pedido.productos = []; pedido.otros = []; pedido.nota = '';
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
    else return;
    guardar();
    refrescarLinks();
  });

  function abrirPanel() {
    pintarPanel();
    if (typeof panel.showModal === 'function') panel.showModal();
    else panel.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';
  }
  function cerrarPanel() {
    if (panel.open) { if (typeof panel.close === 'function') panel.close(); else panel.removeAttribute('open'); }
  }
  panel.addEventListener('close', function () { document.documentElement.style.overflow = ''; });
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
