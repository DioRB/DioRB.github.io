document.addEventListener("DOMContentLoaded", function () {
  const username = "robddg"; 
  const apiKey = "e45decf0424dbf78f0854b9fdc14c9cc";
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`;

  function actualizarTrack() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.recenttracks && data.recenttracks.track.length > 0) {
          const track = data.recenttracks.track[0];

          // Obtener información de la canción
          const artist = track.artist["#text"];
          const song = track.name;
          const artwork = track.image[3]["#text"] || "default-cover.jpg";
          const link = track.url;

          // Mostrar en HTML
          document.getElementById("artwork").src = artwork;
          document.getElementById("track").innerHTML = `${song} - ${artist}`;
          document.getElementById("artworklink").href = link;

          // Verificar si está sonando actualmente
          if (track["@attr"] && track["@attr"].nowplaying === "true") {
            document.getElementById("listen").innerHTML = "Escuchando ahora:";
            document.getElementById("status").innerHTML = "🟢 Online";
          } else {
            document.getElementById("listen").innerHTML = "Última reproducción:";
            document.getElementById("status").innerHTML = "🔴 Offline";
          }
        } else {
          document.getElementById("track").textContent = "No hay canciones recientes";
        }
      })
      .catch(error => {
        console.error("Error al obtener datos de Last.fm:", error);
        document.getElementById("track").textContent = "Error al obtener datos";
      });
  }

  // Ejecutar la función inmediatamente al cargar la página
  actualizarTrack();

  // Configurar la actualización automática cada 30 segundos
  setInterval(actualizarTrack, 5000);
});
