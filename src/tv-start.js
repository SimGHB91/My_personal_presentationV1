(function () {
  var SELECTOR_SCREEN_ELEMENT = '.schermotv';
  var SELECTOR_SWITCHER_TV = '#switcher-tv';

  var isTurnedOn = false; // Stato iniziale: spento
  var timeline;

  function buildTimeline() {
    // Crea la timeline
    timeline = new TimelineMax({
      paused: true,
    });
    
    timeline
      // Effetto iniziale: una linea bianca sottile che appare al centro
      .to(SELECTOR_SCREEN_ELEMENT, 0.2, {
        width: '100vw',
        height: '3px',
        backgroundColor: 'rgba(255, 255, 200, 1)', // Luce gialla intensa
        boxShadow: `
          0 0 5px #fff,
          0 0 10px #fff,
          0 0 20px #fff,
          0 0 40px #0ff,
          0 0 80px #0ff,
          0 0 90px rgb(0, 81, 255),
          0 0 100px rgb(0, 81, 255),
          0 0 150px rgb(0, 81, 255)
        `,
        ease: Power2.easeOut,
      })
      // Sfarfallio: luce intermittente
      .to(SELECTOR_SCREEN_ELEMENT, 0.1, {
        backgroundColor: '#000', // Nero
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)', // Luce spenta
        repeat: 2, // Lampeggia 2 volte
        yoyo: true, // Torna allo stato originale dopo ogni lampeggio
      })
      // Schermo pieno con luce intensa
      .to(SELECTOR_SCREEN_ELEMENT, 0.2, {
        width: '100vw',
        height: '100vh',
        ease: Power2.easeOut,
      });

    // Accende automaticamente al caricamento
    if (!isTurnedOn) {
      toggleSwitcherTV(); // Chiamata per accendere
    }
  }

  function toggleSwitcherTV() {
    var screen = document.querySelector(SELECTOR_SCREEN_ELEMENT);

    if (isTurnedOn) {
      timeline.reverse(); // Spegne il televisore
    } else {
      timeline.restart(); // Accende il televisore
    }

    isTurnedOn = !isTurnedOn; // Aggiorna stato
  }

  // Inizializza la timeline e riproduci il suono all'apertura della pagina
  $(document).ready(function () {
    buildTimeline();
  });

  // Associa il click al pulsante per alternare accensione/spegnimento
  $(document).on('click', SELECTOR_SWITCHER_TV, function () {
    toggleSwitcherTV();
    // Riproduci il file audio
    //const audioremote = new Audio('./sounds/AudioTv-2.mp3');
    //audioremote.play();
  });
})();
