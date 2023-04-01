// This code is an adaptation of https://codepen.io/Pillowfication/pen/PNEJbY
// Markus Tran deserves all the credit!!!

const random = Math.random;
const cos = Math.cos;
const sin = Math.sin;
const PI = Math.PI;
const PI2 = PI * 2;
const spread = 40;
const sizeMin = 3;
const sizeMax = 12 - sizeMin;
const eccentricity = 10;
const deviation = 100;
const dxThetaMin = -0.1;
const dxThetaMax = -dxThetaMin - dxThetaMin;
const dyMin = 0.13;
const dyMax = 0.18;
const dThetaMin = 0.4;
const dThetaMax = 0.7 - dThetaMin;
let timer: number | undefined;
let frame: number | undefined;

interface Confetti {
	outer: HTMLElement
	update: (height: number, delta: number) => boolean
}
const confetti: Confetti[] = [];

// GitHub themed color palette
const colors = ['#6a737d', '#0366d6', '#28a745', '#ffd33d', '#f66a0a', '#6f42c1', '#ea4aaa'];

function colorTheme() {
	const idx = Math.floor(Math.random() * colors.length);
	return colors[idx];
}

// Cosine interpolation
function interpolation(a: number, b: number, t: number) {
	return ((1 - cos(PI * t)) / 2) * (b - a) + a;
}

// Create a 1D Maximal Poisson Disc over [0, 1]
const radius = 1 / eccentricity;
const radius2 = radius + radius;
function createPoisson() {
	const domain = [radius, 1 - radius];
	let measure = 1 - radius2;
	const spline = [0, 1];
	while (measure) {
		let dart = measure * random();
		let i;
		let l;
		let interval;
		let a;
		let b;

		// Find where dart lies
		for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
			a = domain[i];
			b = domain[i + 1];
			interval = b - a;
			if (dart < measure + interval) {
				const newDart = dart + a - measure;
				spline.push(newDart);
				dart = newDart;
				break;
			}
			measure += interval;
		}

		const c = dart - radius;
		const d = dart + radius;

		// Update the domain
		for (i = domain.length - 1; i > 0; i -= 2) {
			l = i - 1;
			a = domain[l];
			b = domain[i];

			if (a >= c && a < d)
				if (b > d) domain[l] = d;
				else domain.splice(l, 2);
			else if (a < c && b > c)
				if (b <= d) domain[i] = c;
				else domain.splice(i, 0, c, d);
		}

		// Re-measure the domain
		for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
			measure += domain[i + 1] - domain[i];
		}
	}

	return spline.sort();
}

// Create the overarching container
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.top = '0';
container.style.left = '0';
container.style.width = '100%';
container.style.height = '0';
container.style.overflow = 'visible';
container.style.zIndex = '9999';

class Confetto {
	y: number;
	x: number;
	theta: number;
	axis: string;
	splineX: number[];
	splineY: number[];
	frame: number;
	dTheta: number;
	dx: number;
	dy: number;
	inner: HTMLElement;
	outer: HTMLElement;

	constructor(theme: () => string) {
		this.frame = 0;
		this.outer = document.createElement('div');
		this.inner = document.createElement('div');
		this.outer.appendChild(this.inner);

		this.outer.style.position = 'absolute';
		this.outer.style.width = `${sizeMin + sizeMax * random()}px`;
		this.outer.style.height = `${sizeMin + sizeMax * random()}px`;
		this.inner.style.width = '100%';
		this.inner.style.height = '100%';
		this.inner.style.backgroundColor = theme();

		this.outer.style.perspective = '50px';
		this.outer.style.transform = `rotate(${360 * random()}deg)`;
		this.theta = 360 * random();
		this.axis = `rotate3D(${cos(360 * random())},${cos(360 * random())},0,`;
		this.inner.style.transform = `${this.axis}${this.theta}deg)`;

		this.dTheta = dThetaMin + dThetaMax * random();

		this.x = window.innerWidth * random();
		this.y = -deviation;
		this.dx = sin(dxThetaMin + dxThetaMax * random());
		this.dy = dyMin + dyMax * random();
		this.outer.style.left = `${this.x}px`;
		this.outer.style.top = `${this.y}px`;

		// Create the periodic spline
		this.splineX = createPoisson();
		this.splineY = [];
		const l = this.splineX.length - 1;
		for (let i = 1; i < l; ++i) {
			this.splineY[i] = deviation * random();
		}
		this.splineY[0] = this.splineY[l] = deviation * random();
	}

	update(height: number, delta: number) {
		this.frame += delta;
		this.x += this.dx * delta;
		this.y += this.dy * delta;
		this.theta += this.dTheta * delta;

		let phi = (this.frame % 7777) / 7777;
		let i = 0;
		let j = 1;
		while (phi >= this.splineX[j]) {
			i = j++;
		}
		const rho = interpolation(
			this.splineY[i],
			this.splineY[j],
			(phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
		);
		phi *= PI2;

		this.inner.style.transform = `${this.axis}${this.theta}deg)`;
		this.outer.style.left = `${this.x + rho * cos(phi)}px`;
		this.outer.style.top = `${this.y + rho * sin(phi)}px`;
		return this.y > height + deviation;
	}
}

export default function poof(duration?: number) {
	// 5s default
	const ttl = duration == null ? 5000 : duration;

	if (!frame) {
		document.body.appendChild(container);

		const addConfetto = () => {
			const confetto = new Confetto(colorTheme);
			confetti.push(confetto);
			container.appendChild(confetto.outer);
			timer = window.setTimeout(addConfetto, spread * random());
		};
		addConfetto();

		let prev: number | null;

		const loop = (timestamp: number) => {
			const delta = prev ? timestamp - prev : 0;
			prev = timestamp;
			const height = window.innerHeight;

			for (let i = confetti.length - 1; i >= 0; --i) {
				if (confetti[i].update(height, delta)) {
					container.removeChild(confetti[i].outer);
					confetti.splice(i, 1);
				}
			}

			if (timer || confetti.length) {
				frame = requestAnimationFrame(loop);
				return;
			}

			document.body.removeChild(container);
			frame = undefined;
		};

		window.setTimeout(function() {
			clearTimeout(timer);
			timer = undefined;
		}, ttl);

		requestAnimationFrame(loop);
	}
}
