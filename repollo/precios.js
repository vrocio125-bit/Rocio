/* ============================================================
   REPOLLO · Precios desde la planilla de Google
   ------------------------------------------------------------
   Si en datos.js está cargado "planillaPrecios" (el link CSV de la
   pestaña publicada), la página toma de ahí los precios cada vez
   que alguien la abre. Si la planilla no responde, usa los precios
   de datos.js. No hace falta tocar este archivo.

   Columnas de la planilla (fila 1 = títulos):
   tipo | categoria | producto | precio | por | oferta | promo | disponible
   ============================================================ */
(function () {
  'use strict';
  var D = window.REPOLLO;
  if (!D) return;

  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
  }
  function num(v) {
    var n = String(v || '').replace(/[^0-9]/g, '');
    return n ? Number(n) : null;
  }
  function si(v) { return /^(si|sí|s|x|1|true|verdadero)$/i.test(String(v || '').trim()); }

  // CSV simple con comillas
  function parseCSV(txt) {
    var filas = [], fila = [], campo = '', q = false;
    for (var i = 0; i < txt.length; i++) {
      var c = txt[i];
      if (q) {
        if (c === '"') { if (txt[i + 1] === '"') { campo += '"'; i++; } else q = false; }
        else campo += c;
      } else if (c === '"') q = true;
      else if (c === ',') { fila.push(campo); campo = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && txt[i + 1] === '\n') i++;
        fila.push(campo); filas.push(fila); fila = []; campo = '';
      } else campo += c;
    }
    if (campo || fila.length) { fila.push(campo); filas.push(fila); }
    return filas.filter(function (f) { return f.some(function (x) { return String(x).trim(); }); });
  }

  // "2 kg: 3900; 3 kg: 14000"  ->  { 2: 3900, 3: 14000 }
  function parsePromo(v) {
    var out = {}, hay = false;
    String(v || '').split(/[;\n|]/).forEach(function (parte) {
      var m = parte.match(/(\d+(?:[.,]\d+)?)\s*(?:kg|u|unid\w*|x)?\s*[:=x\-]\s*\$?\s*([\d.]+)/i);
      if (m) { out[Number(m[1].replace(',', '.'))] = num(m[2]); hay = true; }
    });
    return hay ? out : null;
  }

  var POR = { kg: 'kg', kilo: 'kg', kilos: 'kg', unidad: 'unidad', unidades: 'unidad', u: 'unidad', 'c/u': 'unidad',
    paquete: 'paquete', bolsa: 'bolsa', bandeja: 'bandeja', '100 g': 'g100', '100g': 'g100', g100: 'g100',
    maple: 'x', pack: 'x', x: 'x' };

  function aplicar(filas) {
    var tit = filas[0].map(norm);
    var col = function (n) { return tit.indexOf(n); };
    var iT = col('tipo'), iC = col('categoria'), iP = col('producto'), iPr = col('precio'), iPor = col('por'),
        iO = col('oferta'), iPromo = col('promo'), iD = col('disponible'), iPeso = col('peso unidad (g)');
    if (iP < 0 || iPr < 0) throw new Error('La planilla no tiene las columnas "producto" y "precio"');
    var cats = (D.categorias || []).map(function (c) { return c; });
    var catPorNombre = {};
    cats.forEach(function (c) { catPorNombre[norm(c.nombre)] = c.id; catPorNombre[norm(c.id)] = c.id; });
    var cambios = 0;

    filas.slice(1).forEach(function (f) {
      var tipo = norm(iT >= 0 ? f[iT] : 'producto') || 'producto';
      var nombre = String(f[iP] || '').trim();
      if (!nombre) return;
      var precio = num(f[iPr]);
      var visible = iD < 0 || !String(f[iD] || '').trim() || si(f[iD]);

      if (tipo.indexOf('bols') === 0 || tipo.indexOf('menu') === 0 || tipo.indexOf('ofert') === 0) {
        var lista = tipo.indexOf('bols') === 0 ? D.bolsones : tipo.indexOf('menu') === 0 ? D.menuDelDia : D.ofertas;
        (lista || []).forEach(function (it, idx) {
          if (norm(it.nombre) === norm(nombre)) {
            if (precio) { it.precio = precio; cambios++; }
            if (!visible) it._oculto = true;
          }
        });
        return;
      }

      var cat = catPorNombre[norm(f[iC])] || null;
      var p = (D.productos || []).filter(function (x) {
        return norm(x.nombre) === norm(nombre) && (!cat || x.categoria === cat);
      })[0];
      if (!p) {
        if (!cat) return;
        p = { nombre: nombre.toLowerCase(), emoji: (cats.filter(function (c) { return c.id === cat; })[0] || {}).emoji || '🛒', categoria: cat };
        D.productos.push(p);
      }
      if (precio) {
        p.precio = precio;
        p.por = POR[norm(f[iPor])] || p.por || 'kg';
      } else {
        delete p.precio; delete p.por;
      }
      if (iPeso >= 0 && num(f[iPeso])) p.pesoUnidad = num(f[iPeso]);
      if (iPromo >= 0) { var pr = parsePromo(f[iPromo]); if (pr) p.promos = pr; else delete p.promos; }
      if (iO >= 0) p.oferta = si(f[iO]) && !!p.promos;
      p._oculto = !visible;
      cambios++;
    });

    D.productos = D.productos.filter(function (p) { return !p._oculto; });
    ['bolsones', 'menuDelDia', 'ofertas'].forEach(function (k) {
      if (D[k]) D[k] = D[k].filter(function (x) { return !x._oculto; });
    });
    return cambios;
  }

  window.cargarPreciosRepollo = function (listo) {
    var url = D.planillaPrecios;
    if (!url) { listo(); return; }
    var hecho = false;
    var fin = function () { if (!hecho) { hecho = true; listo(); } };
    var t = setTimeout(function () { console.warn('Planilla de precios: tardó demasiado, uso datos.js'); fin(); }, 4000);
    fetch(url + (url.indexOf('?') < 0 ? '?' : '&') + '_=' + Math.floor(Date.now() / 60000), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (txt) {
        if (hecho) return;
        var n = aplicar(parseCSV(txt));
        console.info('Planilla de precios: ' + n + ' filas aplicadas');
      })
      .catch(function (e) { console.warn('Planilla de precios: no se pudo leer (' + e.message + '), uso datos.js'); })
      .then(function () { clearTimeout(t); fin(); });
  };
})();
