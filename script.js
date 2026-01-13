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

/* ======================
   FICHA MODAL PERFUME
====================== */

// Abrir ficha con info de la card
function verFicha(perfume) {
  document.getElementById("fichaImagen").src = perfume.imagen;
  document.getElementById("fichaImagen").alt = perfume.nombre;
  document.getElementById("fichaNombre").textContent = perfume.nombre;
  document.getElementById("fichaPrecio").textContent = "Precio: " + (perfume.precio || "Consultar");
  document.getElementById("fichaNotas").textContent = "Notas: " + (perfume.notas || "No especificadas");
  document.getElementById("fichaTamaño").textContent = "Tamaño: " + (perfume.tamaño || "No especificado");
  document.getElementById("fichaFamilia").textContent = "Familia: " + (perfume.familia || "No especificada");
  document.getElementById("fichaDescripcion").textContent = perfume.descripcion || "";

  const btnWhats = document.getElementById("fichaWhatsApp");
  btnWhats.onclick = () => consultarPerfume(perfume.nombre);

  document.getElementById("fichaModal").style.display = "flex";
}

// Cerrar ficha
function cerrarFicha() {
  document.getElementById("fichaModal").style.display = "none";
}

// Modificar los botones “Consultar” de las cards para abrir la ficha
document.querySelectorAll(".card .consultar-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = btn.closest(".card");
    const perfume = {
      nombre: card.dataset.nombre,
      precio: card.querySelector(".precio")?.textContent || "",
      imagen: card.querySelector("img")?.src || "",
      notas: card.dataset.notas || "",
      tamaño: card.dataset.tamaño || "",
      familia: card.dataset.familia || "",
      descripcion: card.dataset.descripcion || ""
    };
    verFicha(perfume);
  });
});

// Datos extra de ejemplo para la ficha (puedes completarlos)
const detallesPerfumes = {
  "Dior Sauvage": {
    notas: "Notas frescas y amaderadas",
    tamaño: "100ml",
    familia: "Aromático Fougère",
    descripcion: "Un perfume potente y elegante para el hombre moderno."
  },
  "Bleu de Chanel": {
    notas: "Notas cítricas y amaderadas",
    tamaño: "100ml",
    familia: "Amaderado Aromático",
    descripcion: "Elegancia y sofisticación en cada gota."
  },
  // Agrega aquí los demás perfumes...
};

// Función para abrir la ficha modal
function abrirFicha(nombre) {
  const modal = document.getElementById("fichaModal");
  const ficha = detallesPerfumes[nombre] || {};

  document.getElementById("fichaNombre").textContent = nombre;
  document.getElementById("fichaPrecio").textContent = document.querySelector(`.card[data-nombre="${nombre}"] .precio`).textContent;
  document.getElementById("fichaNotas").textContent = ficha.notas || "";
  document.getElementById("fichaTamaño").textContent = ficha.tamaño || "";
  document.getElementById("fichaFamilia").textContent = ficha.familia || "";
  document.getElementById("fichaDescripcion").textContent = ficha.descripcion || "";
  document.getElementById("fichaImagen").src = document.querySelector(`.card[data-nombre="${nombre}"] img`).src;

  // Actualiza el botón de WhatsApp dentro de la ficha
  const fichaBtn = document.getElementById("fichaWhatsApp");
  fichaBtn.onclick = () => consultarPerfume(nombre);

  modal.style.display = "flex";
}

// Función para cerrar la ficha
function cerrarFicha() {
  document.getElementById("fichaModal").style.display = "none";
}

// Cambia los botones de consultar de las cards para abrir el modal
document.querySelectorAll(".card .consultar-btn").forEach(btn => {
  btn.onclick = function() {
    const nombre = this.closest(".card").dataset.nombre;
    abrirFicha(nombre);
  };
});
