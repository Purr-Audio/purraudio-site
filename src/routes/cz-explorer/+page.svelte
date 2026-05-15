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
					href="https://github.com/fpbrault/cz-explorer"
					target="_blank"
					class="font-['Outfit'] text-sm text-[#e9d5ff]/50 tracking-widest hover:text-[#e9d5ff] transition-colors"
				>
					GitHub
				</a>
				<a
					href="https://cz-explorer.purraudio.dev/"
					target="_blank"
					class="font-['Outfit'] text-sm text-[#e9d5ff]/60 tracking-widest hover:text-[#e9d5ff] transition-colors px-4 py-2 rounded-full border border-[#e9d5ff]/20 hover:border-[#e9d5ff]/40"
				>
					Open CZ Explorer
				</a>
			</div>
		</nav>

		<!-- Hero -->
		<section class="min-h-screen flex flex-col items-center justify-center px-6 text-center">
			<div class="mb-6">
			<h1 class="font-['Outfit'] font-bold text-[#e9d5ff] text-5xl md:text-7xl tracking-widest mb-4">
				CZ101 <span class="text-[#2dd4bf]">Explorer</span>
			</h1>
			<p class="font-['Outfit'] text-[#e9d5ff]/50 text-lg md:text-xl tracking-wide max-w-xl mx-auto mb-10 leading-relaxed">
				A modern preset librarian for the Casio CZ-101. Organize, edit, and transfer 
				patches between your browser and your hardware.
			</p>
			<div class="flex flex-wrap gap-4 justify-center">
				<a
					href="https://cz-explorer.purraudio.dev/"
					target="_blank"
					class="font-['Outfit'] font-bold text-sm bg-[#0d9488] text-white px-8 py-3.5 rounded-full tracking-widest hover:bg-[#0f766e] transition-colors shadow-lg shadow-teal-900/30"
				>
					TRY IT NOW
				</a>
				<a
					href="https://github.com/fpbrault/cz-explorer"
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
						<div class="w-12 h-12 rounded-2xl bg-[#0d9488]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">Preset Library</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Browse, search, and organize your entire CZ-101 sound collection. 
							Instantly load patches with a click. Your sounds, always within reach.
						</p>
					</div>

					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#0d9488]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M8 6v12"/><path d="M12 12v6"/><path d="M16 4v14"/><path d="M4 14v4"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">Setlists</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Build performance setlists for gigs and studio sessions. Organize presets 
							into ordered collections and switch between them effortlessly.
						</p>
					</div>

					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#0d9488]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">SysEx Compatible</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Import and export CZ-101 SysEx patch dumps. Load vintage libraries 
							from the web or backup your hardware's memory with ease.
						</p>
					</div>
				</div>

				<div class="space-y-16 md:mt-24">
					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#0d9488]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="m8 14-4 4"/><path d="m4 10 4 4"/><path d="M12 12h.01"/><path d="M20 12h.01"/><path d="M12 20h.01"/><path d="M20 20h.01"/><path d="M4 20h.01"/><circle cx="12" cy="12" r="2"/><circle cx="20" cy="12" r="2"/><circle cx="4" cy="12" r="2"/><circle cx="12" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><circle cx="4" cy="20" r="2"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">MIDI Integration</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Connect directly to your CZ-101 via WebMIDI. Send and receive patches 
							in real time, no software installation required.
						</p>
					</div>

					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#0d9488]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">Tag Manager</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Categorize presets with custom tags for lightning-fast filtering. 
							Find the perfect bass, pad, or lead in seconds.
						</p>
					</div>

					<div>
						<div class="w-12 h-12 rounded-2xl bg-[#0d9488]/20 flex items-center justify-center mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M10 16h5"/><path d="m18 21-4-1.7a2 2 0 0 0-1.56 0L8 21V3h10z"/><path d="M4 21V3h4"/>
							</svg>
						</div>
						<h3 class="font-['Outfit'] font-bold text-[#e9d5ff] text-2xl mb-3">Duplicate Finder</h3>
						<p class="font-['Outfit'] text-[#e9d5ff]/50 leading-relaxed">
							Automatically detect duplicate patches in your library. Clean up 
							redundant sounds and keep your collection lean and organized.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="py-24 px-6 text-center">
			<div class="max-w-2xl mx-auto">
				<h2 class="font-['Outfit'] font-bold text-[#e9d5ff] text-3xl md:text-4xl tracking-wide mb-6">
					Ready to organize your CZ-101?
				</h2>
				<p class="font-['Outfit'] text-[#e9d5ff]/50 text-lg mb-10 leading-relaxed">
					Open CZ101 Explorer in your browser and start managing your patches. 
					No install required.
				</p>
				<a
					href="https://cz-explorer.purraudio.dev/"
					target="_blank"
					class="inline-block font-['Outfit'] font-bold text-sm bg-[#0d9488] text-white px-10 py-4 rounded-full tracking-widest hover:bg-[#0f766e] transition-colors shadow-lg shadow-teal-900/30"
				>
					OPEN CZ EXPLORER
				</a>
			</div>
		</section>

		<!-- Footer -->
		<footer class="py-8 px-6 text-center border-t border-[#e9d5ff]/10">
			<p class="font-['Outfit'] text-[#e9d5ff]/30 text-sm tracking-wide">
				Purr Audio — CZ101 Explorer
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
		background: radial-gradient(circle, rgba(13, 148, 136, 0.12) 0%, rgba(13, 148, 136, 0.04) 30%, transparent 60%);
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
		background: radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, rgba(45, 212, 191, 0.03) 35%, transparent 65%);
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
