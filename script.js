const telefono = "50683674466";
let perfumes = [];
let filtroTipoActivo = "Todos";

fetch("perfumes.json")
  .then(res => res.json())
  .then(data => {
    perfumes = data.sort((a,b) => b.buscado - a.buscado);
    renderizarCatalogo(perfumes);
  });

function renderizarCatalogo(lista) {
  const contenedor = document.getElementById("catalogo");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.dataset.nombre = p.nombre;
    div.dataset.tipo = p.tipo;

    div.innerHTML = `
      ${p.buscado ? `<div class="badge">Lo más buscado</div>` : ""}
      <img src="${p.imagen}">
      <h3>${p.nombre}</h3>
      <p class="precio">${p.precio}</p>
      <div class="card-buttons">
        <button onclick="consultarPerfume('${p.nombre}')">Consultar</button>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

function consultarPerfume(nombre) {
  const mensaje = `Hola, me interesa el perfume "${nombre}". ¿Me indica precio y disponibilidad?`;
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`);
}

function consultarGeneral() {
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent("Hola, me gustaría información sobre sus perfumes.")}`);
}

function filtrarTipo(tipo, e) {
  filtroTipoActivo = tipo;
  document.querySelectorAll(".filter-buttons button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  filtrarPerfumes();
}

function filtrarPerfumes() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const filtrados = perfumes.filter(p =>
    p.nombre.toLowerCase().includes(texto) &&
    (filtroTipoActivo === "Todos" || p.tipo === filtroTipoActivo)
  );
  renderizarCatalogo(filtrados);
}
