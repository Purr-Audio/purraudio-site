<script lang="ts">
	import { onMount } from 'svelte';

	let mouseX = $state(50);
	let mouseY = $state(50);
	let targetX = 50;
	let targetY = 50;

	function lerp(a: number, b: number, t: number): number {
		return a + (b - a) * t;
	}

	function getDistance(x1: number, y1: number, x2: number, y2: number): number {
		return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
	}

	onMount(() => {
		let animFrame: number;

		const animate = () => {
			const nextX = lerp(mouseX, targetX, 0.06);
			const nextY = lerp(mouseY, targetY, 0.06);
			if (Math.abs(nextX - mouseX) > 0.01 || Math.abs(nextY - mouseY) > 0.01) {
				mouseX = nextX;
				mouseY = nextY;
			}
			animFrame = requestAnimationFrame(animate);
		};

		const handleMove = (e) => {
			targetX = (e.clientX / window.innerWidth) * 100;
			targetY = (e.clientY / window.innerHeight) * 100;
		};

		window.addEventListener('mousemove', handleMove);
		animFrame = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener('mousemove', handleMove);
			cancelAnimationFrame(animFrame);
		};
	});

	let dist = $derived(getDistance(mouseX, mouseY, 50, 50));
	let intensity = $derived(Math.max(0, 1 - dist / 50));

	let primaryAlpha = $derived(0.2 + intensity * 0.4);
	let primaryMidAlpha = $derived(0.06 + intensity * 0.1);
	let secondaryAlpha = $derived(0.12 + intensity * 0.25);
	let secondaryMidAlpha = $derived(0.04 + intensity * 0.08);
	let textGlow1 = $derived(0.3 + intensity * 0.5);
	let textGlow2 = $derived(0.15 + intensity * 0.3);
	let textGlow3 = $derived(0.08 + intensity * 0.15);
	let dropGlow = $derived(0.2 + intensity * 0.4);
</script>

<div class="scene">
	<div
		class="glow-primary"
		style="left: {mouseX}%; top: {mouseY}%; --primary-alpha: {primaryAlpha}; --primary-mid-alpha: {primaryMidAlpha};"
	></div>
	<div
		class="glow-secondary"
		style="left: {100 - mouseX}%; top: {100 - mouseY}%; --secondary-alpha: {secondaryAlpha}; --secondary-mid-alpha: {secondaryMidAlpha};"
	></div>
	<div class="noise"></div>
	<div class="vignette"></div>

	<main
		class="relative z-10 flex flex-col items-center justify-center min-h-screen gap-2"
		style="--text-glow-1: {textGlow1}; --text-glow-2: {textGlow2}; --text-glow-3: {textGlow3}; --drop-glow: {dropGlow};"
	>
		<h1 class="font-['Outfit'] font-bold text-[#e9d5ff] tracking-[0.25em]">PURR AUDIO</h1>
		<a
			href="/cosmo"
			class="font-['Outfit'] text-lg text-[#e9d5ff]/50 tracking-[0.2em] hover:underline transition-all duration-300 hover:text-[#e9d5ff]/90"
		>
			Cosmo PD-101 Synthesizer
		</a>
		<a
			href="/cz-explorer"
			class="font-['Outfit'] text-lg text-[#e9d5ff]/35 tracking-[0.2em] hover:underline transition-all duration-300 hover:text-[#e9d5ff]/70"
		>
			CZ Explorer
		</a>
	</main>
</div>

<style lang="css">
	.scene {
		position: fixed;
		inset: 0;
		background: #07070d;
	}

	.glow-primary {
		position: absolute;
		width: 70vmax;
		height: 70vmax;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(147, 51, 234, var(--primary-alpha)) 0%, rgba(147, 51, 234, var(--primary-mid-alpha)) 30%, transparent 60%);
		filter: blur(60px);
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.glow-secondary {
		position: absolute;
		width: 50vmax;
		height: 50vmax;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(236, 72, 153, var(--secondary-alpha)) 0%, rgba(236, 72, 153, var(--secondary-mid-alpha)) 35%, transparent 65%);
		filter: blur(70px);
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.noise {
		position: fixed;
		inset: 0;
		/* background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.77' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); */
		opacity: 0.11;
		pointer-events: none;
		background-repeat: repeat;
	}

	@keyframes grain {
		0%, 100% { transform: translate(0, 0); }
	}

	.vignette {
		position: fixed;
		inset: 0;
		background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.7) 100%);
		pointer-events: none;
	}

	h1 {
		font-size: clamp(2rem, 10vw, 6rem);
		text-shadow:
			0 0 60px rgba(147, 51, 234, var(--text-glow-1)),
			0 0 120px rgba(147, 51, 234, var(--text-glow-2)),
			0 0 200px rgba(147, 51, 234, var(--text-glow-3));
		filter: drop-shadow(0 0 40px rgba(192, 132, 252, var(--drop-glow)));
	}
</style>