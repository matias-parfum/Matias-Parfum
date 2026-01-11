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

function filtrarPerfumes() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const nombre = card.getAttribute("data-nombre").toLowerCase();

    if (nombre.includes(texto)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function filtrarTipo(tipo) {
  const cards = document.querySelectorAll(".card");
  const secciones = document.querySelectorAll(".catalogo");

  cards.forEach(card => {
    const cardTipo = card.getAttribute("data-tipo");

    if (tipo === "Todos" || cardTipo === tipo) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  secciones.forEach(seccion => {
    const seccionTipo = seccion.getAttribute("data-seccion");

    if (tipo === "Todos" || seccionTipo === tipo) {
      seccion.style.display = "block";
    } else {
      seccion.style.display = "none";
    }
  });
}

