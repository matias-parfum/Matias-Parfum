const telefono = "50683674466";
let filtroTipoActivo = "Todos";

// Abrir WhatsApp para perfume específico
function consultarPerfume(nombre) {
  const mensaje = `Hola, me gustaría recibir información sobre el perfume "${nombre}". Gracias.`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// Abrir WhatsApp general
function consultarGeneral() {
  const mensaje = "Me gustaría recibir información sobre sus perfumes. Gracias.";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// Filtro por texto
function filtrarPerfumes() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const nombre = card.dataset.nombre.toLowerCase();
    const tipo = card.dataset.tipo;
    const coincideTexto = nombre.includes(texto);
    const coincideTipo = filtroTipoActivo === "Todos" || tipo === filtroTipoActivo;
    card.style.display = (coincideTexto && coincideTipo) ? "block" : "none";
  });
}

// Cambiar filtro por tipo
function filtrarTipo(tipo, event) {
  filtroTipoActivo = tipo;
  const botones = document.querySelectorAll(".filter-buttons button");
  botones.forEach(boton => boton.classList.remove("active"));
  event.target.classList.add("active");
  filtrarPerfumes();
}

// Modal
function mostrarModal(perfume) {
  const modal = document.getElementById("modalPerfume");
  const body = document.getElementById("modal-body");

  body.innerHTML = `
    <img src="${perfume.imagen}" alt="${perfume.nombre}" style="width:100%; margin-bottom:15px;">
    <h2>${perfume.nombre}</h2>
    <p><strong>Tipo:</strong> ${perfume.tipo}</p>
    <p><strong>Precio:</strong> ${perfume.precio}</p>
    <p><strong>Notas:</strong> Top, Medio, Base</p>
    <button onclick="consultarPerfume('${perfume.nombre}')">Consultar</button>
  `;

  modal.style.display = "block";
}

function cerrarModal() {
  document.getElementById("modalPerfume").style.display = "none";
}

// Cerrar tocando fuera del modal
window.onclick = function(event) {
  const modal = document.getElementById("modalPerfume");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Generar catálogo dinámico
async function cargarCatalogo() {
  const res = await fetch("perfumes.json");
  const perfumes = await res.json();
  const catalogo = document.getElementById("catalogo");

  perfumes.forEach(perfume => {
    const card = document.createElement("div");
    card.className = "card";
    if (perfume.buscado) card.classList.add("buscado");
    card.dataset.nombre = perfume.nombre;
    card.dataset.tipo = perfume.tipo;

    card.innerHTML = `
      <img src="${perfume.imagen}" alt="${perfume.nombre}">
      <h3>${perfume.nombre}</h3>
      <p class="precio">${perfume.precio}</p>
      <div class="card-buttons">
        <button onclick="mostrarModal(${JSON.stringify(perfume)})">Ver detalles</button>
      </div>
    `;
    catalogo.appendChild(card);
  });
}

// Cargar catálogo al inicio
window.onload = cargarCatalogo;
