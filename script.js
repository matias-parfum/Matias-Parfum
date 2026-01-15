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

// INFORMACIÓN DE PERFUMES
const infoPerfumes = {
  "Dior Sauvage": {
    familia: "Aromática Fougère",
    duracion: "8 – 10 horas",
    notas: {
      salida: "Bergamota de Calabria",
      corazon: "Lavanda, pimienta",
      fondo: "Ambroxan, cedro"
    }
  },

  "Bleu de Chanel": {
    familia: "Amaderada Aromática",
    duracion: "7 – 9 horas",
    notas: {
      salida: "Pomelo, limón",
      corazon: "Jengibre, nuez moscada",
      fondo: "Incienso, sándalo"
    }
  }
};
