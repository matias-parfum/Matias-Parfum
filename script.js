const telefono = "50683674466";

function consultarPerfume(nombre) {
  const mensaje =
    `Me gustaría recibir información detallada sobre el perfume *${nombre}*, ` +
    `incluyendo disponibilidad y precio.\n\n` +
    `Quedo atento. Muchas gracias.`;

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
