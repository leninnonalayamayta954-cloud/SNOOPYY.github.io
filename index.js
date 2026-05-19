const canvas = document.getElementById("galaxy");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


/* =========================
   IMAGENES
========================= */

// AGREGA ESTAS IMAGENES EN TU CARPETA

const imgs = [];

const img1 = new Image();
img1.src = "Snoopy-removebg-preview.png";

const img2 = new Image();
img2.src = "Snoopydino.png";

const img3 = new Image();
img3.src = "Snoopypiloto.png";

const img4 = new Image();
img4.src = "Snoopylove.png";

const img5 = new Image();
img5.src = "Snoopycasa.png";

imgs.push(img1);
imgs.push(img2);
imgs.push(img3);
imgs.push(img4);
imgs.push(img5);


/* =========================
   PARTICULAS GALAXIA
========================= */

const particles = [];

// MENOS PARTICULAS PARA MAS FLUIDEZ

const total = 450;

for(let i = 0; i < total; i++){

    const angle = Math.random() * Math.PI * 2;

    // MUCHO MAS DISPERSAS

    const radius =
    Math.random() * 700 + 80;

    const height =
    (Math.random() - 0.5) * 220;

    particles.push({

        x: Math.cos(angle) * radius,

        y: height,

        z: Math.sin(angle) * radius,

        // DIFERENTES TAMAÑOS

        size:
        Math.random() * 50 + 8,

        // IMAGEN ALEATORIA

        img:
        imgs[Math.floor(Math.random() * imgs.length)]

    });
}


/* =========================
   CAMARA
========================= */

let cameraDistance = 1000;

let targetZoom = 1000;

const minZoom = 120;

const maxZoom = 2200;


/* =========================
   ROTACION
========================= */

let rotX = 0;

let rotY = 0;

let mouseDown = false;

let lastX = 0;

let lastY = 0;


/* =========================
   CONTROLES
========================= */

canvas.addEventListener("mousedown", (e) => {

    mouseDown = true;

    lastX = e.clientX;

    lastY = e.clientY;

    canvas.style.cursor = "grabbing";

});


canvas.addEventListener("mouseup", () => {

    mouseDown = false;

    canvas.style.cursor = "grab";

});


canvas.addEventListener("mousemove", (e) => {

    if(mouseDown){

        const dx = e.clientX - lastX;

        const dy = e.clientY - lastY;

        rotY += dx * 0.004;

        rotX += dy * 0.004;

        lastX = e.clientX;

        lastY = e.clientY;
    }

});


/* =========================
   ZOOM
========================= */

canvas.addEventListener("wheel", (e) => {

    e.preventDefault();

    targetZoom += e.deltaY * 0.4;

    if(targetZoom < minZoom){

        targetZoom = minZoom;
    }

    if(targetZoom > maxZoom){

        targetZoom = maxZoom;
    }

});


/* =========================
   ESTRELLAS FONDO
========================= */

const stars = [];

for(let i = 0; i < 180; i++){

    stars.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        size: Math.random() * 2

    });
}


/* =========================
   ANIMACION
========================= */

function animate(){

    ctx.fillStyle = "black";

    ctx.fillRect(0,0,canvas.width,canvas.height);


    /* =========================
       ESTRELLAS
    ========================= */

    ctx.fillStyle = "white";

    for(let star of stars){

        ctx.beginPath();

        ctx.arc(

            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2

        );

        ctx.fill();
    }


    /* =========================
       GALAXIA
    ========================= */

    for(let p of particles){

        // ROTACION Y

        let x =
        p.x * Math.cos(rotY) -
        p.z * Math.sin(rotY);

        let z =
        p.x * Math.sin(rotY) +
        p.z * Math.cos(rotY);

        // ROTACION X

        let y =
        p.y * Math.cos(rotX) -
        z * Math.sin(rotX);

        z =
        p.y * Math.sin(rotX) +
        z * Math.cos(rotX);

        // EVITAR BUG

        if(z < -cameraDistance + 5){

            continue;
        }

        // PERSPECTIVA

        const scale =
        cameraDistance /
        (cameraDistance + z);

        if(scale > 10){

            continue;
        }

        const px =
        x * scale + canvas.width / 2;

        const py =
        y * scale + canvas.height / 2;

        const size =
        p.size * scale;

        // LIMITAR TAMAÑO

        if(size > 140){

            continue;
        }

        // DIBUJAR IMAGEN

        ctx.drawImage(

            p.img,

            px - size / 2,

            py - size / 2,

            size,

            size

        );

    }


    /* =========================
       NUCLEO
    ========================= */

    const gradient =
    ctx.createRadialGradient(

        canvas.width / 2,
        canvas.height / 2,
        5,

        canvas.width / 2,
        canvas.height / 2,
        90

    );

    gradient.addColorStop(0,"white");

    gradient.addColorStop(0.5,"#ffe066");

    gradient.addColorStop(1,"transparent");

    ctx.beginPath();

    ctx.arc(

        canvas.width / 2,
        canvas.height / 2,
        90,
        0,
        Math.PI * 2

    );

    ctx.fillStyle = gradient;

    ctx.fill();


    /* =========================
       ZOOM SUAVE
    ========================= */

    cameraDistance +=
    (targetZoom - cameraDistance) * 0.06;


    /* =========================
       ROTACION AUTOMATICA
    ========================= */

    rotY += 0.00035;

    requestAnimationFrame(animate);
}

animate();


/* =========================
   RESPONSIVE
========================= */

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

});


console.log("🌌 Galaxia con 5 imágenes dispersas cargada");


/* =====================================
   PANTALLA EMERGENTE
===================================== */

// CREAR VENTANA

const popup = document.createElement("div");

popup.style.position = "fixed";
popup.style.top = "50%";
popup.style.left = "50%";
popup.style.transform = "translate(-50%, -50%)";

popup.style.width = "400px";
popup.style.padding = "30px";

popup.style.background = "rgba(0,0,0,0.9)";

popup.style.border = "2px solid white";

popup.style.borderRadius = "20px";

popup.style.color = "white";

popup.style.fontSize = "25px";

popup.style.textAlign = "center";

popup.style.fontFamily = "Arial";

popup.style.display = "none";

popup.style.zIndex = "9999";

popup.style.boxShadow =
"0 0 30px #00d4ff";

document.body.appendChild(popup);


// TEXTO

popup.innerHTML = `
    <h2></h2>

    <p id="popupText">
        Texto
    </p>

    <button id="closePopup">
        Cerrar
    </button>
`;


// BOTON

document.getElementById("closePopup")
.onclick = () => {

    popup.style.display = "none";

};


/* =====================================
   TEXTOS ALEATORIOS
===================================== */

const texts = [

    "A veces no ves lo fuerte que eres porque estás ocupada luchando tus batallas. Sigue adelante, porque incluso en tus peores días sigues brillando más de lo que imaginas ✨🤍",

    "🪐 Planeta desconocido detectado.",

    "☄️ Meteorito viajando por la galaxia.",

    "🌙 Luna brillante encontrada.",

    "💫 Energía cósmica detectada.",

    "🚀 Señal extraterrestre recibida.",

    "🌌 Zona misteriosa del universo."

];


/* =====================================
   CLICK EN IMAGENES
===================================== */

canvas.addEventListener("click", (e) => {

    const mouseX = e.clientX;

    const mouseY = e.clientY;


    for(let p of particles){

        // ROTACION Y

        let x =
        p.x * Math.cos(rotY) -
        p.z * Math.sin(rotY);

        let z =
        p.x * Math.sin(rotY) +
        p.z * Math.cos(rotY);

        // ROTACION X

        let y =
        p.y * Math.cos(rotX) -
        z * Math.sin(rotX);

        z =
        p.y * Math.sin(rotX) +
        z * Math.cos(rotX);

        // PERSPECTIVA

        const scale =
        cameraDistance /
        (cameraDistance + z);

        const px =
        x * scale + canvas.width / 2;

        const py =
        y * scale + canvas.height / 2;

        const size =
        p.size * scale;


        // DETECTAR CLICK

        if(

            mouseX > px - size/2 &&
            mouseX < px + size/2 &&

            mouseY > py - size/2 &&
            mouseY < py + size/2

        ){

            // TEXTO ALEATORIO

            const randomText =
            texts[
                Math.floor(
                    Math.random() * texts.length
                )
            ];

            document.getElementById(
                "popupText"
            ).innerText = randomText;

            popup.style.display = "block";

            break;
        }
    }

});
// =========================
// MUSICA AUTOMATICA
// =========================

const music =
document.getElementById("music");

music.volume = 0.3;


// INTENTAR REPRODUCIR

async function startMusic(){

    try{

        await music.play();

        console.log("🎵 Música reproduciéndose");

    }catch(error){

        console.log(
            "El navegador bloqueó el autoplay"
        );
    }
}


// CUANDO EL USUARIO TOQUE ALGO

document.addEventListener(
    "click",
    startMusic,
    { once:true }
);

document.addEventListener(
    "mousemove",
    startMusic,
    { once:true }
);

document.addEventListener(
    "keydown",
    startMusic,
    { once:true }
);