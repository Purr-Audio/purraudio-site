<script lang="ts">
	import { onMount } from 'svelte';

	let mouseX = $state(50);
	let mouseY = $state(50);
	let targetX = 50;
	let targetY = 50;

	function lerp(a: number, b: number, t: number): number {
		return a + (b - a) * t;
	}

	onMount(() => {
		let animFrame = 0;
		const animate = () => {
			mouseX = lerp(mouseX, targetX, 0.06);
			mouseY = lerp(mouseY, targetY, 0.06);
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
</script>

<div class="scene">
	<div
		class="glow-primary"
		style="left: {mouseX}%; top: {mouseY}%;"
	></div>
	<div
		class="glow-secondary"
		style="left: {100 - mouseX}%; top: {100 - mouseY}%;"
	></div>
	<div class="noise"></div>
	<div class="vignette"></div>

	<div class="relative z-10">
		<!-- Nav -->
		<nav class="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
			<a href="/" class="font-['Outfit'] font-bold text-[#e9d5ff] text-lg tracking-[0.15em] hover:opacity-80 transition-opacity">
				PURR AUDIO
			</a>
			<div class="flex items-center gap-4">
				<a
					href="https://cosmo-docs.purraudio.dev/"
					target="_blank"
					class="font-['Outfit'] text-sm text-[#e9d5ff]/50 tracking-widest hover:text-[#e9d5ff] transition-colors"
				>
					Manual
				</a>
				<a
					href="https://cosmo.purraudio.dev/lab"
					target="_blank"
					class="font-['Outfit'] text-sm text-[#e9d5ff]/60 tracking-widest hover:text-[#e9d5ff] transition-colors px-4 py-2 rounded-full border border-[#e9d5ff]/20 hover:border-[#e9d5ff]/40"
				>
					Open Web Synth
				</a>
			</div>
		</nav>

		<!-- Hero -->
		<section class="min-h-screen flex flex-col items-center justify-center px-6 text-center">
			<div class="mb-6">
			<h1 class="font-['Outfit'] font-bold text-[#e9d5ff] text-5xl md:text-7xl tracking-widest mb-4">
				Cosmo <span class="text-[#c084fc]">PD-101</span>
			</h1>
			<p class="font-['Outfit'] text-[#e9d5ff]/50 text-lg md:text-xl tracking-wide max-w-xl mx-auto mb-10 leading-relaxed">
				A phase distortion synthesizer inspired by the legendary Casio CZ-101. 
				Play it in your browser, on your desktop, or inside your DAW.
			</p>
			<div class="flex flex-wrap gap-4 justify-center">
				<a
					href="https://cosmo.purraudio.dev/lab"
					target="_blank"
					class="font-['Outfit'] font-bold text-sm bg-[#7c3aed] text-white px-8 py-3.5 rounded-full tracking-widest hover:bg-[#6d28d9] transition-colors shadow-lg shadow-purple-900/30"
				>
					TRY IT NOW
				</a>
				<a
					href="https://cosmo-docs.purraudio.dev/"
					target="_blank"
					class="font-['Outfit'] text-sm text-[#e9d5ff]/70 px-8 py-3.5 rounded-full tracking-widest border border-[#e9d5ff]/20 hover:border-[#e9d5ff]/40 hover:text-[#e9d5ff] transition-all"
				>
					READ THE MANUAL
				</a>
				<a
					href="https://github.com/fpbrault/cosmo-pd"
					target="_blank"
					class="font-['Outfit'] text-sm text-[#e9d5ff]/70 px-8 py-3.5 rounded-full tracking-widest border border-[#e9d5ff]/20 hover:border-[#e9d5ff]/40 hover:text-[#e9d5ff] transition-all"
				>
					VIEW ON GITHUB
				</a>
			</div>
		</section>

		<!-- Features -->
		<section class="py-24 px-6 max-w-6xl mx-auto">
			<div class="grid md:grid-cols-2 gap-12 md:gap-16">
				<div class="space-y-16">
					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#7c3aed]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v4"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">Phase Distortion Sound</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							The unmistakable digital character of phase distortion synthesis. 
							Warm, punchy basses, glassy digital pads, and sharp resonant leads 
							that cut through any mix.
						</p>
					</div>

					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#7c3aed]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">Deep Sound Design</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Two phase distortion oscillators with eight selectable waveforms each. 
							Eight-stage envelopes for precise control over every sonic detail. 
							Ring modulation and noise generator for extra texture.
						</p>
					</div>

					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#7c3aed]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">SysEx Compatible</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Import and export CZ-101 SysEx patches. Load your vintage patch libraries 
							or share your creations with the original hardware.
						</p>
					</div>
				</div>

				<div class="space-y-16 md:mt-24">
					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#7c3aed]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">Preset Library</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Organize your sounds into setlists. Browse, search, and instantly load 
							patches. Your entire sound catalog, always one click away.
						</p>
					</div>

					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#7c3aed]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" x2="22" y1="20" y2="20"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">Multi-Platform</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Play in the browser, run as a standalone desktop app, or drop it into 
							your DAW as a VST3, CLAP, or AUv2 plugin. The same engine, everywhere you work.
						</p>
					</div>

					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#7c3aed]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">Rust-Powered Engine</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Built in Rust and compiled to WebAssembly for rock-solid performance. 
							Low latency, polyphonic voices, and smooth real-time parameter changes.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="py-24 px-6 text-center">
			<div class="max-w-2xl mx-auto">
				<h2 class="font-['Outfit'] font-bold text-[#e9d5ff] text-3xl md:text-4xl tracking-wide mb-6">
					Ready to explore?
				</h2>
				<p class="font-['Outfit'] text-[#e9d5ff]/50 text-lg mb-10 leading-relaxed">
					Open the Cosmo Web Synth in your browser and start making sounds. 
					No install required.
				</p>
				<a
					href="https://cosmo.purraudio.dev/lab"
					target="_blank"
					class="inline-block font-['Outfit'] font-bold text-sm bg-[#7c3aed] text-white px-10 py-4 rounded-full tracking-widest hover:bg-[#6d28d9] transition-colors shadow-lg shadow-purple-900/30"
				>
					OPEN WEB SYNTH
				</a>
			</div>
		</section>

		<!-- Footer -->
		<footer class="py-8 px-6 text-center border-t border-[#e9d5ff]/10">
			<p class="font-['Outfit'] text-[#e9d5ff]/30 text-sm tracking-wide">
				Purr Audio — Cosmo PD-101
			</p>
		</footer>
	</div>
</div>

<style lang="css">
	.scene {
		position: relative;
		min-height: 100vh;
		background: #07070d;
		overflow-x: hidden;
	}

	.glow-primary {
		position: fixed;
		width: 70vmax;
		height: 70vmax;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, rgba(147, 51, 234, 0.04) 30%, transparent 60%);
		filter: blur(60px);
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 0;
	}

	.glow-secondary {
		position: fixed;
		width: 50vmax;
		height: 50vmax;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, rgba(236, 72, 153, 0.03) 35%, transparent 65%);
		filter: blur(70px);
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 0;
	}

	.noise {
		position: fixed;
		inset: 0;
		opacity: 0.11;
		pointer-events: none;
		background-repeat: repeat;
		z-index: 1;
	}

	.vignette {
		position: fixed;
		inset: 0;
		background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.7) 100%);
		pointer-events: none;
		z-index: 1;
	}
</style>
