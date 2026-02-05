const telefono = "50683674466";
let filtroTipoActivo = "Todos";

// Función para abrir WhatsApp con mensaje de perfume específico
function consultarPerfume(nombre) {
  const mensaje = `Hola, me gustaría recibir información detallada sobre el perfume "${nombre}", incluyendo disponibilidad y precio. Quedo atento a su respuesta. Muchas gracias.`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// Función para abrir WhatsApp con mensaje general
function consultarGeneral() {
  const mensaje = "Me gustaría recibir información sobre sus perfumes, disponibilidad y precios.\n\nQuedo atento. Muchas gracias.";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// Función de filtrado de perfumes por texto y tipo
function filtrarPerfumes() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  const secciones = document.querySelectorAll(".catalogo");

  cards.forEach(card => {
    const nombre = card.dataset.nombre.toLowerCase();
    const tipo = card.dataset.tipo;
    const coincideTexto = nombre.includes(texto);
    const coincideTipo = (filtroTipoActivo === "Todos" || tipo === filtroTipoActivo);
    card.style.display = (coincideTexto && coincideTipo) ? "block" : "none";
  });

  secciones.forEach(seccion => {
    const visibles = seccion.querySelectorAll(".card:not([style*='display: none'])");
    seccion.style.display = (visibles.length > 0) ? "block" : "none";
  });
}

// Función para cambiar filtro activo
function filtrarTipo(tipo, event) {
  filtroTipoActivo = tipo;

  const botones = document.querySelectorAll(".filter-buttons button");
  botones.forEach(boton => boton.classList.remove("active"));
  event.target.classList.add("active");

  filtrarPerfumes();
}

// ====== FILTROS EXTRA (Marca + Precio) ======
let tipoSeleccionado = "Todos";
let marcaSeleccionada = "Todos";
let precioSeleccionado = "Todos";

function normalizarTexto(t=""){
  return t.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}

function obtenerPrecio(card){
  const p = card.querySelector(".precio");
  if(!p) return null;
  const soloNums = (p.textContent || "").replace(/[^\d]/g, "");
  if(!soloNums) return null; // si dice "Consultar" o está vacío
  return parseInt(soloNums, 10);
}

function obtenerMarca(card){
  // 1) si algún día querés poner data-marca, ya queda soportado:
  if(card.dataset.marca) return card.dataset.marca.trim();

  // 2) inferir desde el nombre (h3 o data-nombre)
  const nombre = card.dataset.nombre || (card.querySelector("h3")?.textContent || "");
  const n = normalizarTexto(nombre);

  // Mapeos para marcas de varias palabras
  const mapas = [
    { key: "jean paul gaultier", marca: "Jean Paul Gaultier" },
    { key: "yves saint laurent", marca: "Yves Saint Laurent" },
    { key: "bleu de chanel", marca: "Chanel" },
    { key: "coco mademoiselle", marca: "Chanel" },
    { key: "dior", marca: "Dior" },
    { key: "versace", marca: "Versace" },
    { key: "azzaro", marca: "Azzaro" },
    { key: "valentino", marca: "Valentino" },
    { key: "armani", marca: "Giorgio Armani" },
    { key: "calvin klein", marca: "Calvin Klein" },
    { key: "ck", marca: "Calvin Klein" },
    { key: "tommy", marca: "Tommy Hilfiger" },
    { key: "carolina herrera", marca: "Carolina Herrera" }
  ];

  for (const m of mapas){
    if(n.includes(m.key)) return m.marca;
  }

  // fallback: primera palabra capitalizada
  const primera = nombre.trim().split(" ")[0] || "Otra";
  return primera;
}

function aplicarFiltros(){
  const query = normalizarTexto(document.getElementById("buscador")?.value || "");
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const nombre = normalizarTexto(card.dataset.nombre || card.querySelector("h3")?.textContent || "");
    const tipo = (card.dataset.tipo || "Todos").trim();
    const marca = obtenerMarca(card);

    // filtro por buscador
    const pasaBusqueda = !query || nombre.includes(query);

    // filtro por tipo
    const pasaTipo = (tipoSeleccionado === "Todos") || (tipo === tipoSeleccionado);

    // filtro por marca
    const pasaMarca = (marcaSeleccionada === "Todos") || (marca === marcaSeleccionada);

    // filtro por precio
    let pasaPrecio = true;
    if(precioSeleccionado !== "Todos"){
      const precio = obtenerPrecio(card);
      if(precio === null){
        // si no hay precio numérico, lo ocultamos cuando hay filtro de precio activo
        pasaPrecio = false;
      } else {
        const [min,max] = precioSeleccionado.split("-").map(x => parseInt(x,10));
        pasaPrecio = precio >= min && precio <= max;
      }
    }

    card.style.display = (pasaBusqueda && pasaTipo && pasaMarca && pasaPrecio) ? "" : "none";
  });
}

// Hooks: conectar con tus filtros actuales (sin cambiar tu HTML)
function filtrarTipo(tipo, event){
  tipoSeleccionado = tipo;
  // si tenías estilos "activo" en botones, dejalos como los tengas (no lo toco)
  aplicarFiltros();
}

function filtrarPerfumes(){
  aplicarFiltros();
}

function filtrarMarca(valor){
  marcaSeleccionada = valor;
  aplicarFiltros();
}

function filtrarPrecio(valor){
  precioSeleccionado = valor;
  aplicarFiltros();
}

function limpiarFiltrosExtra(){
  // Reset marca y precio
  marcaSeleccionada = "Todos";
  precioSeleccionado = "Todos";

  const selMarca = document.getElementById("filtroMarca");
  const selPrecio = document.getElementById("filtroPrecio");
  if (selMarca) selMarca.value = "Todos";
  if (selPrecio) selPrecio.value = "Todos";

  // Reset buscador
  const buscador = document.getElementById("buscador");
  if (buscador) buscador.value = "";

  // Reset tipo (ajustá el nombre si tu variable se llama diferente)
  if (typeof tipoSeleccionado !== "undefined") tipoSeleccionado = "Todos";
  if (typeof filtroTipo !== "undefined") filtroTipo = "Todos";

  // Quitar estados visuales de botones
  const botones = document.querySelectorAll(".filter-buttons button");
  botones.forEach(btn => {
    btn.classList.remove("active", "selected", "current");
    btn.blur(); // ✅ evita que quede “pegado” por focus
  });

  // ✅ Quitar focus general (por si el foco quedó en “Todos”)
  if (document.activeElement) document.activeElement.blur();

  aplicarFiltros();
}

// Llenar marcas al cargar
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("filtroMarca");
  if(!select) return;

  const cards = document.querySelectorAll(".card");
  const marcas = new Set();

  cards.forEach(card => marcas.add(obtenerMarca(card)));

  // Orden alfabético
  [...marcas].sort((a,b) => a.localeCompare(b)).forEach(marca => {
    const opt = document.createElement("option");
    opt.value = marca;
    opt.textContent = marca;
    select.appendChild(opt);
  });

  // aplicar estado inicial
  aplicarFiltros();
});

function entrarCategoria(tipo){
  // ocultar pantalla de elección
  const entry = document.getElementById('entrySelect');
  if(entry) entry.style.display = 'none';

  // ocultar todos los catálogos
  document.querySelectorAll('.catalogo').forEach(sec => {
    sec.style.display = 'none';
  });

  // mostrar solo el seleccionado
  const seccion = document.querySelector(
    `.catalogo[data-seccion="${tipo}"]`
  );

  if(seccion){
    seccion.style.display = 'block';
    seccion.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

