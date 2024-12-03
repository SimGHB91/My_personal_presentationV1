var main = document.querySelector('main'),
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    vcrCanvas = document.createElement('canvas'), // Canvas per il rumore VCR
    vcrCtx = vcrCanvas.getContext('2d'),
    text = document.querySelector('.text'),
    ww = window.innerWidth,
    menu = document.querySelector('.menu'),
    footer = menu.querySelector('footer'),
    idx = 0,
    count = footer.childElementCount - 1,
    toggle = true,
    frame;

// Set canvas size
canvas.width = ww / 3;
canvas.height = (ww * 0.5625) / 3;

vcrCanvas.width = canvas.width; // Stessa dimensione del canvas principale
vcrCanvas.height = canvas.height;
vcrCanvas.style.position = "absolute";
vcrCanvas.style.top = "0";
vcrCanvas.style.left = "0";
vcrCanvas.style.pointerEvents = "none";
vcrCanvas.style.opacity = "0.5"; // Trasparenza per miscelare con il contenuto
main.appendChild(vcrCanvas); // Aggiunge il canvas per il rumore

// Funzione per generare il rumore VCR a righe orizzontali
function renderTrackingNoise(ctx) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        num = 20, // Numero di righe orizzontali
        lineHeight = 0.5; // spessore righe orizzontali

    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < num; i++) {
        var y = (Math.random() * h) | 0; // Posizione verticale casuale
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`; // Trasparenza variabile
        ctx.fillRect(0, y, w, lineHeight); // Disegna una linea orizzontale
    }
}


// Funzione per il "rumore neve" (già esistente)
function snow(ctx) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        d = ctx.createImageData(w, h),
        b = new Uint32Array(d.data.buffer),
        len = b.length;

    for (var i = 0; i < len; i++) {
        b[i] = ((255 * Math.random()) | 0) << 24;
    }

    ctx.putImageData(d, 0, 0);
}

// Funzione di animazione neve
function animateSnow() {
    snow(ctx); // Neve sul canvas principale
    frame = requestAnimationFrame(animateSnow);
}

// Funzione di animazione Rumore VCR
function animateVCR() {
    renderTrackingNoise(vcrCtx); // Rumore VCR sul canvas secondario
    frame = requestAnimationFrame(animateVCR);
}

// Glitch
for (i = 0; i < 4; i++) {
    var span = text.firstElementChild.cloneNode(true);
    text.appendChild(span);
}

// Timer
var seconds = 0, minutes = 0, hours = 0;
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    let formattedTime = 
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;

    document.getElementById("timer").textContent = formattedTime;  // Modifica solo il testo
    setTimeout(updateTimer, 1000);  // Chiama se stessa ogni secondo
}

// Avvia animazione alla fine dell'animazione iniziale
window.addEventListener('DOMContentLoaded', function (e) {
    setTimeout(function () {
        main.classList.add('on');
        main.classList.remove('off');
        animateSnow(); // Avvia animazione neve

		setTimeout(function () {
			const imgphoto = document.querySelector('.imgphoto');
			imgphoto.style.zIndex = '0'; // Porta l'immagine in primo piano
			imgphoto.style.opacity = '0.7'; // Rendi visibile l'immagine
			// Avvia animazione Rumore VCR
			animateVCR();
            // Avvia il timer
            updateTimer();  // Avvia il timer senza alterare il design
		}, 3000);		
        
        setTimeout(function () {
            const menu = document.querySelector('.menu');
            menu.style.opacity = '1'; // Rendi visibile il menu
            menu.style.filter = 'blur(1px)'; // Rimuovi il blur
        }, 5000);
        
    }, 1000);
});
