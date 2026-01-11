const telefono = "50683674466";

function consultarPerfume(nombre) {
  const mensaje = `Estimados, me gustaría recibir información detallada sobre el perfume "${nombre}", ` +
                  `incluyendo disponibilidad y precio. Quedo atento a su respuesta. Muchas gracias.`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

function consultarGeneral() {
  const mensaje =
    "Me gustaría recibir información sobre sus perfumes, disponibilidad y precios.\n\n" +
    "Quedo atento. Muchas gracias.";

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

let filtroTipoActivo = "Todos";

function filtrarPerfumes() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  const secciones = document.querySelectorAll(".catalogo");

  cards.forEach(card => {
    const nombre = card.getAttribute("data-nombre").toLowerCase();
    const tipo = card.getAttribute("data-tipo");

    const coincideTexto = nombre.includes(texto);
    const coincideTipo = (filtroTipoActivo === "Todos" || tipo === filtroTipoActivo);

    if (coincideTexto && coincideTipo) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  secciones.forEach(seccion => {
    const visibles = seccion.querySelectorAll(".card:not([style*='display: none'])");

    if (visibles.length > 0) {
      seccion.style.display = "block";
    } else {
      seccion.style.display = "none";
    }
  });
  
}

function filtrarTipo(tipo, event) {
  filtroTipoActivo = tipo;

  const botones = document.querySelectorAll(".filter-buttons button");
  botones.forEach(boton => boton.classList.remove("active"));

  event.target.classList.add("active");

  filtrarPerfumes();
}
// Seleccionamos elementos
const modal = document.getElementById("modal");
const modalNombre = document.getElementById("modal-nombre");
const modalNotas = document.getElementById("modal-notas");
const modalTamano = document.getElementById("modal-tamano");
const modalDuracion = document.getElementById("modal-duracion");
const modalWhatsapp = document.getElementById("modal-whatsapp");
const closeBtn = document.querySelector(".close");

// Abrir modal al hacer clic en "Más info"
document.querySelectorAll(".info-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    modalNombre.textContent = card.dataset.nombre;
    modalNotas.textContent = card.dataset.notas;
    modalTamano.textContent = card.dataset.tamano;
    modalDuracion.textContent = card.dataset.duracion;

   const mensaje = `Estimados, me gustaría recibir información detallada sobre el perfume "${card.dataset.nombre}", incluyendo disponibilidad y precio. Quedo atento a su respuesta. Muchas gracias.`;
modalWhatsapp.href = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    modal.style.display = "block";
  });
});

// Cerrar modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar al hacer clic fuera del modal
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
