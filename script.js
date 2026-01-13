const telefono = "50683674466";
let filtroTipoActivo = "Todos";

/* ======================
   WHATSAPP
====================== */

function consultarPerfume(nombre) {
  const mensaje = `Hola, me gustaría recibir información detallada sobre el perfume "${nombre}", incluyendo disponibilidad y precio. Quedo atento a su respuesta. Muchas gracias.`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

function consultarGeneral() {
  const mensaje = "Me gustaría recibir información sobre sus perfumes, disponibilidad y precios.\n\nQuedo atento. Muchas gracias.";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

/* ======================
   FILTROS
====================== */

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

function filtrarTipo(tipo, event) {
  filtroTipoActivo = tipo;
  const botones = document.querySelectorAll(".filter-buttons button");
  botones.forEach(boton => boton.classList.remove("active"));
  event.target.classList.add("active");
  filtrarPerfumes();
}

/* ======================
   FICHA PERFUME (MODAL)
====================== */

function abrirFichaDesdeCard(card) {
  document.getElementById("fichaImagen").src = card.querySelector("img").src;
  document.getElementById("fichaImagen").alt = card.dataset.nombre;
  document.getElementById("fichaNombre").textContent = card.dataset.nombre;
  document.getElementById("fichaPrecio").textContent = "Precio: " + (card.querySelector(".precio")?.textContent || "Consultar");
  document.getElementById("fichaNotas").textContent = "Notas: " + (card.dataset.notas || "No especificadas");
  document.getElementById("fichaTamaño").textContent = "Tamaño: " + (card.dataset.tamaño || "No especificado");
  document.getElementById("fichaFamilia").textContent = "Familia: " + (card.dataset.familia || "No especificada");
  document.getElementById("fichaDescripcion").textContent = card.dataset.descripcion || "";

  document.getElementById("fichaWhatsApp").onclick = () => {
    consultarPerfume(card.dataset.nombre);
  };

  document.getElementById("fichaModal").style.display = "flex";
}

function cerrarFicha() {
  document.getElementById("fichaModal").style.display = "none";
}

/* ======================
   ACTIVAR BOTONES DE LAS CARDS
====================== */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card .consultar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      abrirFichaDesdeCard(card);
    });
  });
});
