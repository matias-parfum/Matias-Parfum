const telefono = "50683674466";
let filtroTipoActivo = "Todos";
let perfumes = [];

// Cargar perfumes desde JSON
fetch('perfumes.json')
  .then(res => res.json())
  .then(data => {
    perfumes = data;
    renderizarPerfumes();
  });

// Renderizar perfumes según filtros
function renderizarPerfumes() {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  perfumes.forEach(perfume => {
    if(filtroTipoActivo !== "Todos" && perfume.tipo !== filtroTipoActivo) return;

    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.nombre = perfume.nombre;
    card.innerHTML = `
      <img src="${perfume.imagen}" alt="${perfume.nombre}" onclick="abrirFicha('${perfume.nombre}')">
      <h3>${perfume.nombre}</h3>
      <p class="precio">${perfume.precio}</p>
      <div class="card-buttons">
        <button class="consultar-btn" onclick="consultarPerfume('${perfume.nombre}')">Consultar</button>
      </div>
    `;
    catalogo.appendChild(card);
  });
}

// Filtro por tipo
function filtrarTipo(tipo, event) {
  filtroTipoActivo = tipo;
  document.querySelectorAll(".filter-buttons button").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderizarPerfumes();
}

// Filtro por búsqueda
document.getElementById("buscador").addEventListener("keyup", () => {
  const texto = document.getElementById("buscador").value.toLowerCase();
  perfumes.forEach(p => {
    const card = document.querySelector(`.card[data-nombre='${p.nombre}']`);
    if(card) card.style.display = p.nombre.toLowerCase().includes(texto) ? "block" : "none";
  });
});

// WhatsApp
function consultarPerfume(nombre) {
  const mensaje = `Hola, me gustaría recibir información sobre el perfume "${nombre}". Gracias.`;
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

function consultarGeneral() {
  const mensaje = "Me gustaría recibir información sobre sus perfumes. Gracias.";
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

// MODAL FICHA
const modal = document.getElementById("fichaModal");
function abrirFicha(nombre) {
  const perfume = perfumes.find(p => p.nombre === nombre);
  if(!perfume) return;

  document.getElementById("fichaImagen").src = perfume.imagen;
  document.getElementById("fichaNombre").textContent = perfume.nombre;
  document.getElementById("fichaTipo").textContent = perfume.tipo;
  document.getElementById("fichaAroma").textContent = perfume.aroma;
  document.getElementById("fichaNotas").textContent = perfume.notas;
  document.getElementById("fichaIntensidad").textContent = perfume.intensidad;
  document.getElementById("fichaDuracion").textContent = perfume.duracion;
  document.getElementById("fichaOcasión").textContent = perfume.ocasion;

  document.getElementById("fichaWhatsBtn").onclick = () => consultarPerfume(perfume.nombre);

  modal.style.display = "block";
}

function cerrarFicha() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.onclick = function(event) {
  const modal = document.getElementById("modalPerfume");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
