function updateTime() {
  const now = new Date();

  // Hora con formato bonito
  const time = now.toLocaleTimeString('es-MX');
  document.getElementById("time").textContent = time;

  // Fecha elegante
  const date = now.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  document.getElementById("date").textContent = date;
}

setInterval(updateTime, 1000);
updateTime();

// Ubicación
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data = await response.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "Ciudad desconocida";

        const country = data.address.country;

        document.getElementById("location").textContent = `${city}, ${country}`;
      } catch (error) {
        document.getElementById("location").textContent =
          "Error al obtener ubicación";
      }
    }, () => {
      document.getElementById("location").textContent =
        "Permiso denegado";
    });
  } else {
    document.getElementById("location").textContent =
      "No soportado";
  }
}

getLocation();