document.addEventListener('DOMContentLoaded', function() {
  const stationsList = [
    { name: 'Radio Oxígeno', url: 'https://mdstrm.com/audio/5fab0687bcd6c2389ee9480c/icecast.audio' },
    { name: "Radio Magica", url: 'https://mdstrm.com/audio/6839e28eb3fdc597ac2e2e43/icecast.audio?property=aiir&_=224873' },
    { name: 'Radio Felicidad', url: 'https://mdstrm.com/audio/5fad731fcf097a068af3c8f7/icecast.audio' },
    { name: 'Radio RPP', url: 'https://mdstrm.com/audio/5fab3416b5f9ef165cfab6e9/icecast.audio' },
    { name: 'Radio Exitosa', url: 'https://stream.zeno.fm/csy4vzackf9uv' },
    { name: 'Radio La Inolvidable', url: 'https://27263.live.streamtheworld.com/CRP_LI_SC?csegid=30008&dist=30008' },
    { name: 'Radio Panamericana', url: 'https://mdstrm.com/audio/6598b62dded1380470f4e539/icecast.audio' },
    { name: 'Radio Ritmo Romántica', url: 'https://23113.live.streamtheworld.com/CRP_RIT_SC?csegid=30008&dist=30008' },
    { name: 'Radio Corazón', url: 'https://mdstrm.com/audio/5fada514fc16c006bd63370f/icecast.audio' },
    { name: 'Radio Radiomar', url: 'https://23113.live.streamtheworld.com/CRP_MARAAC_SC' },
    { name: 'Radio Nueva Q', url: 'https://27163.live.streamtheworld.com/CRP_NQ_SC?csegid=30008&dist=30008' }, 
    { name: 'Radio Planeta', url: 'https://mdstrm.com/audio/6839e274f40e6b9832e37633/icecast.audio?property=aiir&_=481938' },
    { name: 'Radio Onda Cero', url: 'https://mdstrm.com/audio/6598b65ab398c90871aff8cc/icecast.audio' },
    { name: 'Radio Z Rock & Pop', url: 'https://radioz.egostreaming.pe/radio/3e4f6a1b2c3d4e567890abcd/' },
    { name: 'Radio Studio 92', url: 'https://gcdn.2mdn.net/videoplayback/id/0751c120d4c7c8a1/itag/345/source/web_video_ads/xpc/EgVovf3BOg%3D%3D/ctier/L/acao/yes/ip/0.0.0.0/ipbits/0/expire/1752812287/sparams/ip,ipbits,expire,id,itag,source,xpc,ctier,acao/signature/36B65E93093AE4B3E88C9C65B223187B837A084D.3E4DFCA2EC3288AF4DF879EDD389CCBEBE88331C/key/ck2/file/file.mp4' },
    { name: 'Radio Moda', url: 'https://14613.live.streamtheworld.com/CRP_MOD_SC?csegid=30008&dist=30008' },
    { name: 'Radio Exitoso', url: 'https://neptuno-2-audio.mediaserver.digital/79525baf-b0f5-4013-a8bd-3c5c293c6561' },
    { name: 'Radio Oasis', url: 'https://stream.zeno.fm/3bhmjhlsl0wvv' },
    { name: 'Radio las Quenas', url: 'https://radio.lnx.pe:7000/stream' },
    { name: 'Radio Salkantay', url: 'http://167.114.118.119:7662/stream' },
    { name: 'Radio Mega Stereo', url: 'https://cast1.my-control-panel.com/proxy/megaestereo/stream' },
    { name: 'Radio Coca Raymi', url: 'https://stream.zeno.fm/di4yvkfirz0vv' },
    { name: 'Radio Naranjal', url: 'https://encrypted-vtbn0.gstatic.com/video?q=tbn1GcQWpGaVlXuYDfjm5y3PdJCtZ-eZN_LOlDelgA' },
    { name: 'Radio 1', url: 'https' },
    { name: 'Radio 2', url: 'https' },
    { name: 'Radio 1', url: 'https://rugby-mad-nokia-admitted.trycloudflare.com/stream?1718287105538' },
    { name: 'Radio 2', url: 'https://panelautodj.innovatestream.pe:10951' },
  ];

  const stationsContainer = document.getElementById('stations-list');
  const stationNameElement = document.getElementById('station-name');
  const audioSourceElement = document.getElementById('audio-source');
  const audioPlayerElement = document.getElementById('audio-player');
  const canvas = document.getElementById('audio-spectrum');
  const canvasCtx = canvas.getContext('2d');
  let isPlaying = false;
  const barCount = 32;
  const barHeights = new Array(barCount).fill(0);

  function drawSpectrum() {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;
    const barWidth = (Math.PI * 2) / barCount;

    canvasCtx.clearRect(0, 0, width, height);

    if (isPlaying) {
      // Actualizar alturas de las barras aleatoriamente para simular movimiento
      for (let i = 0; i < barCount; i++) {
        barHeights[i] = Math.max(10, barHeights[i] + (Math.random() - 0.5) * 10);
        barHeights[i] = Math.min(barHeights[i], radius * 0.5);
      }
    } else {
      // Reducir alturas gradualmente cuando no está reproduciendo
      for (let i = 0; i < barCount; i++) {
        barHeights[i] = Math.max(0, barHeights[i] * 0.9);
      }
    }

    // Dibujar barras circulares
    for (let i = 0; i < barCount; i++) {
      const radians = barWidth * i;
      const barHeight = barHeights[i];
      const x1 = centerX + Math.cos(radians) * radius;
      const y1 = centerY + Math.sin(radians) * radius;
      const x2 = centerX + Math.cos(radians) * (radius + barHeight);
      const y2 = centerY + Math.sin(radians) * (radius + barHeight);

      canvasCtx.beginPath();
      canvasCtx.strokeStyle = document.body.classList.contains('dark-theme') ? '#66b0ff' : '#007bff';
      canvasCtx.lineWidth = 2;
      canvasCtx.moveTo(x1, y1);
      canvasCtx.lineTo(x2, y2);
      canvasCtx.stroke();
    }

    requestAnimationFrame(drawSpectrum);
  }

  stationsList.forEach((station, index) => {
    const stationElement = document.createElement('div');
    stationElement.innerHTML = `
      <h3>${station.name}</h3>
      <button onclick="playStation('${station.name}', '${station.url}')"></button>
    `;
    stationElement.classList.add('fade-in');
    stationElement.style.animationDelay = `${index * 0.1}s`;
    stationsContainer.appendChild(stationElement);
  });

  window.playStation = function(name, url) {
    const playerContainer = document.getElementById('player-container');
    playerContainer.classList.add('loading');
    stationNameElement.innerText = 'Cargando...';
    audioSourceElement.src = url;
    audioPlayerElement.load();
    audioPlayerElement.play().then(() => {
      playerContainer.classList.remove('loading');
      stationNameElement.innerText = name;
      stationNameElement.classList.add('playing');
      isPlaying = true;
    }).catch(error => {
      console.error('Error al reproducir:', error);
      playerContainer.classList.remove('loading');
      stationNameElement.innerText = 'Error al cargar';
      isPlaying = false;
    });
  };

  // Detectar cambios en el estado de reproducción
  audioPlayerElement.addEventListener('play', () => {
    isPlaying = true;
    stationNameElement.classList.add('playing');
  });

  audioPlayerElement.addEventListener('pause', () => {
    isPlaying = false;
    stationNameElement.classList.remove('playing');
  });

  audioPlayerElement.addEventListener('ended', () => {
    isPlaying = false;
    stationNameElement.classList.remove('playing');
  });

  // Ajustar tamaño del canvas dinámicamente
  function resizeCanvas() {
    const playerWidth = audioPlayerElement.offsetWidth;
    canvas.width = playerWidth;
    canvas.height = playerWidth;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Iniciar animación del espectro
  drawSpectrum();

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.querySelector('.theme-icon').textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
  });
});
