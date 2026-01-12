const telefono = "50683674466";
let filtroTipoActivo = "Todos";
let perfumes = [];

fetch("perfumes.json")
  .then(res => res.json())
  .then(data => {
    perfumes = data;
    renderizarCatalogo(perfumes);
  });

function renderizarCatalogo(lista) {
  const contenedor = document.getElementById("catalogo");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="card" data-nombre="${p.nombre}" data-tipo="${p.tipo}">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p class="precio">${p.precio}</p>
        <div class="card-buttons">
          <button class="consultar-btn" onclick="consultarPerfume('${p.nombre}')">Consultar</button>
        </div>
      </div>
    `;
  });
}

// WhatsApp perfume
function consultarPerfume(nombre) {
  const mensaje = `Hola, me gustaría recibir información detallada sobre el perfume "${nombre}", incluyendo disponibilidad y precio.`;
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

// WhatsApp general
function consultarGeneral() {
  const mensaje = "Me gustaría recibir información sobre sus perfumes, disponibilidad y precios.";
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

// Filtro texto + tipo
function filtrarPerfumes() {
  const texto = document.getElementById("buscador").value.toLowerCase();

  const filtrados = perfumes.filter(p => {
    const coincideTexto = p.nombre.toLowerCase().includes(texto);
    const coincideTipo = (filtroTipoActivo === "Todos" || p.tipo === filtroTipoActivo);
    return coincideTexto && coincideTipo;
  });

  renderizarCatalogo(filtrados);
}

// Filtro botones
function filtrarTipo(tipo, event) {
  filtroTipoActivo = tipo;
  document.querySelectorAll(".filter-buttons button").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
  filtrarPerfumes();
}
