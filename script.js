const telefono = "50683674466";
let filtroTipoActivo = "Todos";

// JSON completo de perfumes
const perfumes = [
  // HOMBRES
  { "nombre": "Dior Sauvage", "tipo": "Hombre", "precio": "₡55,000", "imagen": "Dior Sauvage.jpg", "notas": "Bergamota, Pimienta, Ambroxan", "duracion": "8-10 horas", "familia": "Aromático Fougère", "intensidad": "Alta", "buscado": true },
  { "nombre": "Bleu de Chanel", "tipo": "Hombre", "precio": "₡60,000", "imagen": "Bleu.png", "notas": "Limón, Incienso, Cedro", "duracion": "7-9 horas", "familia": "Amaderado Aromático", "intensidad": "Alta", "buscado": true },
  { "nombre": "Yves Saint Laurent", "tipo": "Hombre", "precio": "₡50,000", "imagen": "Yves.jpg", "notas": "Limón, Menta, Jengibre", "duracion": "6-8 horas", "familia": "Amaderado Especiado", "intensidad": "Media", "buscado": false },
  { "nombre": "Jean Paul Gaultier Le Male Le Parfum", "tipo": "Hombre", "precio": "₡58,000", "imagen": "img/lemale.jpg", "notas": "Lavanda, Vainilla, Menta", "duracion": "8 horas", "familia": "Oriental Especiado", "intensidad": "Alta", "buscado": true },
  { "nombre": "Jean Paul Gaultier Ultra Male", "tipo": "Hombre", "precio": "₡55,000", "imagen": "img/ultramale.jpg", "notas": "Pera, Lavanda, Miel", "duracion": "7-8 horas", "familia": "Oriental Especiado", "intensidad": "Alta", "buscado": true },
  { "nombre": "Jean Paul Gaultier Le Male Elixir Eau de Parfum", "tipo": "Hombre", "precio": "₡60,000", "imagen": "img/elixir.jpg", "notas": "Canela, Vainilla, Lavanda", "duracion": "9 horas", "familia": "Oriental Especiado", "intensidad": "Alta", "buscado": true },
  { "nombre": "Jean Paul Gaultier Le Beau", "tipo": "Hombre", "precio": "₡54,000", "imagen": "img/lebeau.jpg", "notas": "Bergamota, Vainilla, Cedro", "duracion": "7 horas", "familia": "Amaderado Floral", "intensidad": "Media", "buscado": true },
  { "nombre": "Jean Paul Gaultier Le Beau Le Parfum", "tipo": "Hombre", "precio": "₡57,000", "imagen": "img/parfum.jpg", "notas": "Bergamota, Madera, Almizcle", "duracion": "8 horas", "familia": "Amaderado Aromático", "intensidad": "Alta", "buscado": true },
  { "nombre": "Jean Paul Gaultier Scandal Pour Homme", "tipo": "Hombre", "precio": "₡56,000", "imagen": "img/scandalpourhomme.jpg", "notas": "Cardamomo, Miel, Pachulí", "duracion": "8 horas", "familia": "Oriental Especiado", "intensidad": "Alta", "buscado": true },
  { "nombre": "Versace Eros", "tipo": "Hombre", "precio": "₡52,000", "imagen": "img/eros.png", "notas": "Menta, Manzana Verde, Vainilla", "duracion": "7-9 horas", "familia": "Oriental Fresco", "intensidad": "Alta", "buscado": true },
  { "nombre": "Versace Eros Flame", "tipo": "Hombre", "precio": "₡53,000", "imagen": "img/flame.png", "notas": "Pomelo, Canela, Vainilla", "duracion": "7-8 horas", "familia": "Oriental Fresco", "intensidad": "Alta", "buscado": true },
  { "nombre": "Versace Dylan Blue", "tipo": "Hombre", "precio": "₡50,000", "imagen": "img/blue.png", "notas": "Bergamota, Pomelo, Almizcle", "duracion": "6-8 horas", "familia": "Amaderado Aromático", "intensidad": "Alta", "buscado": true },
  { "nombre": "Versace Pour Homme", "tipo": "Hombre", "precio": "₡48,000", "imagen": "img/homme.png", "notas": "Limón, Neroli, Cedro", "duracion": "6-7 horas", "familia": "Cítrico Aromático", "intensidad": "Media", "buscado": true },
  { "nombre": "Versace Oud Noir", "tipo": "Hombre", "precio": "₡60,000", "imagen": "img/noir.png", "notas": "Aguja de Oud, Sándalo, Vainilla", "duracion": "8-9 horas", "familia": "Amaderado Oriental", "intensidad": "Alta", "buscado": true },

  // MUJERES
  { "nombre": "Libre Yves Saint Laurent", "tipo": "Mujer", "precio": "₡65,000", "imagen": "Libres.jpg", "notas": "Lavanda, Flor de Azahar, Vainilla", "duracion": "8-10 horas", "familia": "Floral Aromático", "intensidad": "Alta", "buscado": true },
  { "nombre": "Coco Mademoiselle", "tipo": "Mujer", "precio": "₡60,000", "imagen": "cocos.png", "notas": "Naranja, Jazmín, Pachulí", "duracion": "7-9 horas", "familia": "Oriental Floral", "intensidad": "Alta", "buscado": false },
  { "nombre": "Good Girl Carolina Herrera", "tipo": "Mujer", "precio": "₡55,000", "imagen": "carolina.jpg", "notas": "Almendra, Café, Jazmín", "duracion": "7-9 horas", "familia": "Oriental Floral", "intensidad": "Alta", "buscado": true },
  { "nombre": "Jean Paul Gaultier Scandal", "tipo": "Mujer", "precio": "₡58,000", "imagen": "img/scandaleau.jpg", "notas": "Gardenia, Naranja, Caramelo", "duracion": "8 horas", "familia": "Floral Dulce", "intensidad": "Alta", "buscado": true },
  { "nombre": "Jean Paul Gaultier Scandal Le Parfum", "tipo": "Mujer", "precio": "₡60,000", "imagen": "img/scandaledp.jpg", "notas": "Gardenia, Naranja, Caramelo", "duracion": "9 horas", "familia": "Floral Dulce", "intensidad": "Alta", "buscado": true },
  { "nombre": "Versace Bright Crystal", "tipo": "Mujer", "precio": "₡52,000", "imagen": "img/Crystal.jpg", "notas": "Granada, Peonía, Almizcle", "duracion": "6-8 horas", "familia": "Floral Frutal", "intensidad": "Media", "buscado": true },
  { "nombre": "Versace Bright Crystal Absolu", "tipo": "Mujer", "precio": "₡55,000", "imagen": "img/CrystalAbsolu.jpg", "notas": "Granada, Peonía, Almizcle", "duracion": "7-8 horas", "familia": "Floral Frutal", "intensidad": "Alta", "buscado": true },
  { "nombre": "Versace Crystal Noir", "tipo": "Mujer", "precio": "₡50,000", "imagen": "img/CrystalNoir.jpg", "notas": "Naranja, Jazmín, Almizcle", "duracion": "6-7 horas", "familia": "Oriental Floral", "intensidad": "Media", "buscado": true },
  { "nombre": "Versace Dylan Blue Pour Femme", "tipo": "Mujer", "precio": "₡53,000", "imagen": "img/BlueFemme.jpg", "notas": "Pomelo, Jazmín, Almizcle", "duracion": "7-8 horas", "familia": "Floral Frutal", "intensidad": "Alta", "buscado": true },

  // UNISEX
  { "nombre": "CK One", "tipo": "Unisex", "precio": "₡40,000", "imagen": "CK.jpg", "notas": "Bergamota, Cardamomo, Nuez Moscada", "duracion": "5-7 horas", "familia": "Cítrico Aromático", "intensidad": "Media", "buscado": true },
  { "nombre": "Tommy Girl & Boy", "tipo": "Unisex", "precio": "₡38,000", "imagen": "Tommy.jpg", "notas": "Frutas, Flores, Almizcle", "duracion": "4-6 horas", "familia": "Cítrico Floral", "intensidad": "Media", "buscado": false }
];

// Funciones de catálogo dinámico, filtros, búsqueda y modal (igual que antes)
function mostrarCatalogo() {
  const contenedor = document.getElementById("catalogo");
  contenedor.innerHTML = "";

  perfumes.forEach(perfume => {
    if (filtroTipoActivo === "Todos" || perfume.tipo === filtroTipoActivo) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${perfume.imagen}" alt="${perfume.nombre}">
        <h3>${perfume.nombre}</h3>
        <p class="precio">${perfume.precio}</p>
        <div class="card-buttons">
          <button onclick="consultarPerfume('${perfume.nombre}')">Consultar</button>
          <button onclick="abrirModal('${perfume.nombre}')">Ver ficha</button>
        </div>
      `;
      contenedor.appendChild(card);
    }
  });
}

function filtrarTipo(tipo, event) {
  filtroTipoActivo = tipo;
  const botones = document.querySelectorAll(".filter-buttons button");
  botones.forEach(boton => boton.classList.remove("active"));
  event.target.classList.add("active");
  mostrarCatalogo();
}

function filtrarPerfumes() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const contenedor = document.getElementById("catalogo");
  contenedor.innerHTML = "";

  perfumes.forEach(perfume => {
    const coincideTipo = filtroTipoActivo === "Todos" || perfume.tipo === filtroTipoActivo;
    const coincideTexto = perfume.nombre.toLowerCase().includes(texto);
    if (coincideTipo && coincideTexto) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${perfume.imagen}" alt="${perfume.nombre}">
        <h3>${perfume.nombre}</h3>
        <p class="precio">${perfume.precio}</p>
        <div class="card-buttons">
          <button onclick="consultarPerfume('${perfume.nombre}')">Consultar</button>
          <button onclick="abrirModal('${perfume.nombre}')">Ver ficha</button>
        </div>
      `;
      contenedor.appendChild(card);
    }
  });
}

function consultarPerfume(nombre) {
  const mensaje = `Hola, me gustaría recibir información sobre "${nombre}", incluyendo disponibilidad y precio. Muchas gracias.`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

function consultarGeneral() {
  const mensaje = "Me gustaría recibir información sobre sus perfumes, disponibilidad y precios. Muchas gracias.";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

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
      <p><strong>Duración:</strong> ${perfume.duracion}</p>
      <p><strong>Familia:</strong> ${perfume.familia}</p>
      <p><strong>Intensidad:</strong> ${perfume.intensidad}</p>
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
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", mostrarCatalogo);
