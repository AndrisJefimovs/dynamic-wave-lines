/*
 * waves
 *
 * © bouvanni 2021
*/

const config = {
	bgColor: "#222",
		lineColor: "#ddd",
		lineWeight: 4,
		lineHeight: 50,
		noiseHeight: 45,
		speedX: 0.01,
		speedY: 0.01,
		noiseMultiplier: 0.002
}

// ↓ actual script ↓

const canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d"),
	Noise = noise;

let w,
	h,
	circles = [],
	moveX = 1,
	moveY = 1,
	growX = 0,
	growY = 0,
	count = 0;

w = canvas.width = innerWidth;
h = canvas.height = innerHeight;

document.querySelector("body").appendChild(canvas);

window.onresize = () => {
	w = canvas.width = innerWidth;
	h = canvas.height = innerHeight;
};

function draw() {
	moveX += config.speedX;
	moveY += config.speedY;
	clearCanvas();
	ctx.strokeStyle = config.lineColor;
	ctx.lineWidth = config.lineWeight;
	for (
		let y = -config.noiseHeight;
		y < canvas.height + config.noiseHeight;
		y += config.lineHeight
	) {
		ctx.beginPath();
		for (let x = 0 - config.lineWeight; x < canvas.width + config.lineWeight; x++) {
			let n =
				Noise.simplex2(
					x * config.noiseMultiplier + moveX,
					y * config.noiseMultiplier + moveY
				) * config.noiseHeight;
			ctx.lineTo(x, y + n);
		}
		ctx.stroke();
		ctx.closePath();
	}
	requestAnimationFrame(draw);
}

draw();

function clearCanvas() {
	ctx.fillStyle = config.bgColor;
	ctx.fillRect(0, 0, w, h);
}
