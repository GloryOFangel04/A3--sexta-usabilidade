const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let mouseMovimento = false;

const pointer = {
    x: 0.5 * window.innerWidth,
    y: 0.5 * window.innerHeight,
};

const params = {
    pointsNumbers: 40,
    widthFactor: 10,
    mouseThreshold: 0.5,
    spring: 0.25,
    friction: 0.5,
};

const trail = new Array(params.pointsNumbers);
for (let i = 0; i < params.pointsNumbers; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    };
}

window.addEventListener("click", (e) => {
    updadeMousePosition(e.pageX, e.pageY);
});

window.addEventListener("mousemove", (e) => {
    mouseMovimento = true;
    updadeMousePosition(e.pageX, e.pageY);
});

window.addEventListener("touchmove", (e) => {
    mouseMovimento = true;
    updadeMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updadeMousePosition(eX, eY) {
    pointer.x = eX;
    pointer.y = eY;
}

setupCanvas();
updade(0);
window.addEventListener("resize", setupCanvas);

function updade(t) {
    if (!mouseMovimento) {
        pointer.x = (0.5 + 0.3 * Math.cos(0.002 * t) + 0.1 * Math.cos(0.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });
    
    var gradiente = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradiente.addColorStop(0, "rgba(160,93,134,1)");
    gradiente.addColorStop(1, "rgba(57,34,115,1)");
    ctx.strokeStyle = gradiente;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);

        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);

        ctx.lineWidth = params.widthFactor * (params.pointsNumbers - i);
        ctx.stroke();
    }

    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();
    window.requestAnimationFrame(updade);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


// novo canva

/*const canvas2 = document.querySelector(".canvas2");
const ctx2= canvas2.getContext("2d");

let mouseMoved = false;

const ponteiro ={
    x:0.5 = window.innerWidth,
    y:0.5= window.innerHeight,
};

const params2 ={
    pointsNumbers: 40,
    widthFactor: 10,
    mouseThreshold: 0.5,
    spring: 0.25,
    friction: 0.5,
}

const trail2 = new Array(params2.pointsNumbers);
for (let i = 0; i < params2.pointsNumbers; i++) {
    trail2[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    };
}*/