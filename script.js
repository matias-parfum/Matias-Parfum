const telefono = "50683674466";

function consultarPerfume(nombre) {
  const mensaje =
    `Me gustaría recibir información detallada sobre el perfume *${nombre}*, ` +
    `incluyendo disponibilidad y precio.`;

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

function consultarGeneral() {
  const mensaje =
    "Me gustaría recibir información sobre sus perfumes, disponibilidad y precios.";

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
