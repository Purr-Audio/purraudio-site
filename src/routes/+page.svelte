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

		const handleMove = (e: MouseEvent) => {
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

	const homeLink =
		'link inline-flex min-h-8 translate-y-2 border-b border-current text-center font-sans text-home-link tracking-home-link text-home-text/80 no-underline opacity-0 underline-offset-4 transition hover:-translate-y-0.5 hover:text-home-text hover:drop-shadow-link-glow focus-visible:-translate-y-0.5 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-home-text/75 motion-reduce:translate-y-0 motion-reduce:opacity-100';
</script>

<div class="fixed inset-0 bg-bg">
	<div
		class="pointer-events-none absolute h-home-glow-large w-home-glow-large -translate-x-1/2 -translate-y-1/2 rounded-full blur-glow-large"
		style="left: {mouseX}%; top: {mouseY}%; background: radial-gradient(circle, rgba(147, 51, 234, {primaryAlpha}) 0%, rgba(147, 51, 234, {primaryMidAlpha}) 30%, transparent 60%);"
	></div>
	<div
		class="pointer-events-none absolute h-home-glow-medium w-home-glow-medium -translate-x-1/2 -translate-y-1/2 rounded-full blur-glow-medium"
		style="left: {100 - mouseX}%; top: {100 - mouseY}%; background: radial-gradient(circle, rgba(236, 72, 153, {secondaryAlpha}) 0%, rgba(236, 72, 153, {secondaryMidAlpha}) 35%, transparent 65%);"
	></div>
	<div class="noise pointer-events-none fixed inset-0 bg-repeat opacity-10"></div>
	<div class="pointer-events-none fixed inset-0 bg-radial-[ellipse_80%_80%_at_50%_50%] from-transparent from-30% to-black/70"></div>

	<main
		class="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center"
	>
		<h1
			class="animate-logo-in font-sans text-home-logo font-bold tracking-logo text-home-text"
			style="text-shadow: 0 0 60px rgba(147, 51, 234, {textGlow1}), 0 0 120px rgba(147, 51, 234, {textGlow2}), 0 0 200px rgba(147, 51, 234, {textGlow3}); filter: drop-shadow(0 0 40px rgba(192, 132, 252, {dropGlow}));"
		>
			PURR AUDIO
		</h1>
		<nav class="flex flex-col items-center gap-3" aria-label="Purr Audio products">
			<a
				href="/cosmo"
				class={`${homeLink} animate-link-in-one`}
			>
				Cosmo PD-101 Synthesizer
			</a>
			<a
				href="/cz-explorer"
				class={`${homeLink} animate-link-in-two`}
			>
				CZ Explorer
			</a>
		</nav>
	</main>
</div>
