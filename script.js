<script>
const telefono = "50683674466";
let filtroTipoActivo = "Todos";

// WhatsApp por perfume específico
function consultarPerfume(nombre) {
  const mensaje = `Hola, me gustaría recibir información detallada sobre el perfume "${nombre}", incluyendo disponibilidad y precio. Quedo atento a su respuesta. Muchas gracias.`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// WhatsApp general
function consultarGeneral() {
  const mensaje = "Me gustaría recibir información sobre sus perfumes, disponibilidad y precios.\n\nQuedo atento. Muchas gracias.";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// Filtrar perfumes por texto y tipo
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

// Cambiar filtro activo
function filtrarTipo(tipo, event) {
  filtroTipoActivo = tipo;
  const botones = document.querySelectorAll(".filter-buttons button");
  botones.forEach(boton => boton.classList.remove("active"));
  event.target.classList.add("active");
  filtrarPerfumes();
}

// Modal clásico (alternativo)
function abrirModal(nombre) {
  const perfume = perfumes.find(p => p.nombre === nombre);
  if (!perfume) return;

  let modal = document.getElementById("modalPerfume");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modalPerfume";
    modal.style.position = "fixed";
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.8)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = 9999;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="background:#111;padding:20px;border:1px solid #d4af37;max-width:400px;width:90%;text-align:center;position:relative;">
      <span onclick="cerrarModal()" style="position:absolute;top:10px;right:15px;cursor:pointer;color:#d4af37;font-size:20px;">&times;</span>
      <img src="${perfume.imagen}" alt="${perfume.nombre}" style="width:100%;height:250px;object-fit:contain;margin-bottom:15px;">
      <h3>${perfume.nombre}</h3>
      <p class="precio">${perfume.precio}</p>
      <p><strong>Notas:</strong> ${perfume.notas}</p>
      <p><strong>Tamaño:</strong> ${perfume.tamaño || 'No especificado'}</p>
      <p><strong>Familia:</strong> ${perfume.familia || 'No especificado'}</p>
      <p><strong>Intensidad/Descripción:</strong> ${perfume.intensidad || perfume.descripcion || 'No especificado'}</p>
      <button onclick="consultarPerfume('${perfume.nombre}')" class="consultar-btn">Consultar WhatsApp</button>
    </div>
  `;

  modal.style.display = "flex";
}

function cerrarModal() {
  const modal = document.getElementById("modalPerfume");
  if (modal) modal.style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("modalPerfume");
  if (event.target == modal) modal.style.display = "none";
}

// Modal ficha moderna
function verFicha(perfume) {
  document.getElementById("fichaImagen").src = perfume.imagen;
  document.getElementById("fichaImagen").alt = perfume.nombre;
  document.getElementById("fichaNombre").textContent = perfume.nombre;
  document.getElementById("fichaPrecio").textContent = "Precio: " + perfume.precio;
  document.getElementById("fichaNotas").textContent = "Notas: " + perfume.notas;
  document.getElementById("fichaTamaño").textContent = "Tamaño: " + (perfume.tamaño || "No especificado");
  document.getElementById("fichaFamilia").textContent = "Familia: " + (perfume.familia || "No especificado");
  document.getElementById("fichaDescripcion").textContent = perfume.descripcion || "";
  
  const btnWhats = document.getElementById("fichaWhatsApp");
  btnWhats.onclick = () => consultarPerfume(perfume.nombre);

  document.getElementById("fichaModal").style.display = "flex";
}

function cerrarFicha() {
  document.getElementById("fichaModal").style.display = "none";
}
</script>
