<script lang="ts">
import { onMount } from "svelte";
import ProductActions from "$lib/components/ProductActions.svelte";
import ProductCard from "$lib/components/ProductCard.svelte";
import ProductCarousel from "$lib/components/ProductCarousel.svelte";
import ProductFooter from "$lib/components/ProductFooter.svelte";
import ProductNav from "$lib/components/ProductNav.svelte";
import SupportInline from "$lib/components/SupportInline.svelte";
import {
	bodyCopy,
	eyebrow,
	heroGlow,
	heroSection,
	heroText,
	heroTitle,
	introText,
	mutedCopy,
	pageShell,
	sectionEyebrow,
	sectionGrid,
	sectionTitle,
} from "$lib/product-page-classes";
import { cosmoCommerce, supportCommerce } from "$lib/site-config";

onMount(() => {
	(
		window as Window & { createLemonSqueezy?: () => void }
	).createLemonSqueezy?.();
});

const gallery = [
	{
		src: "/products/cosmo/cosmo-main.webp",
		alt: "Cosmo PD-101 main interface",
		label: "Main",
	},
	{
		src: "/products/cosmo/cosmo-mod.webp",
		alt: "Cosmo PD-101 modulation panel",
		label: "Mod",
	},
	{
		src: "/products/cosmo/cosmo-fx.webp",
		alt: "Cosmo PD-101 effects panel",
		label: "FX",
	},
	{
		src: "/products/cosmo/cosmo-viz.webp",
		alt: "Cosmo PD-101 visualizer and display panel",
		label: "Viz",
	},
];
const formats = ["VST3", "AUv2", "CLAP", "macOS", "Linux", "Windows"];
const navLinks = [
	{ label: "CZ Explorer", href: "/cz-explorer" },
	{
		label: "Manual",
		href: "https://cosmo-docs.purraudio.dev/",
		target: "_blank",
	},
	{
		label: "GitHub",
		href: "https://github.com/fpbrault/cosmo-pd",
		target: "_blank",
	},
];
const actions = [
	{
		label: cosmoCommerce.ctaLabel,
		href: cosmoCommerce.checkoutUrl,
		lemonSqueezy: true,
		disabled: !cosmoCommerce.checkoutUrl,
	},
	{
		label: "Try it in the browser",
		href: "https://cosmo.purraudio.dev",
		target: "_blank",
		variant: "secondary" as const,
	},
	{
		label: "GitHub",
		href: "https://github.com/fpbrault/cosmo-pd",
		target: "_blank",
		variant: "secondary" as const,
	},
];
const algorithmItems = [
	"Classic CZ-101: The base phase distortion synthesis.",
	"Waveshaping & Distortion: Includes bend, clip, fold, mirror, pinch, quantize, and twist algorithms.",
	"Complex Generators: Features fof (Function of Formants), karpunk (Karplus-Strong variations), ripple, sine, skew, and sync.",
];
const architectureItems = [
	"Line-Based Processing: The interface supports a Phase Lines Section, enabling the use of two algorithms per line.",
	"Modulation Matrix: A dedicated Mod Matrix Panel manages complex routing between sources and destinations.",
	"LFOs and Envelopes: Includes dedicated modules for LFOs, Random generators, and Step Envelopes for rhythmic modulation.",
];
const effectsItems = [
	"Time and Space: delay, grain_delay, reverb, and shimmer verb.",
	"Modulation FX: chorus, juno_chorus, phaser, tremolo, vibrato, and ring mod.",
	"Dynamic and Tonal Shaping: bitcrusher, compressor, distortion, eq, lofi, and wavefolder.",
	"Phase Modulation: A specialized phase_mod effect for additional harmonic complexity.",
];
</script>

<svelte:head>
	<title>Cosmo PD-101 | Purr Audio</title>
</svelte:head>

<div class={pageShell} data-theme="purr">
	<ProductNav links={navLinks} />

	<main>
		<section class={heroSection}>
			<div class={heroGlow}></div>

			<div class={heroText}>
				<p class={eyebrow}>{cosmoCommerce.eyebrow}</p>
				<h1 class={heroTitle}>{cosmoCommerce.productName}</h1>
				<p class={introText}>
					Cosmo PD-101 is a virtual synthesizer plugin inspired by the legendary Phase Distortion (PD) synthesis of the 1980s.
				</p>

			</div>

			<ProductCarousel {gallery} idPrefix="cosmo" aspectClass="aspect-cosmo" />

			<div class="mx-auto mt-8 max-w-3xl text-center">
				<div class="flex flex-wrap justify-center gap-2" aria-label="Available formats">
					{#each formats as format}
						<span class="badge badge-outline rounded-full border-base-content/10 bg-base-100 px-3 py-3 text-xs font-medium text-base-content/60 shadow-pill">{format}</span>
					{/each}
				</div>

				<ProductActions {actions} ariaLabel="Cosmo actions" />

				<SupportInline description={supportCommerce.description} checkoutUrl={supportCommerce.checkoutUrl} ctaLabel={supportCommerce.ctaLabel} />
			</div>
		</section>

		<section class="mx-auto w-full max-w-6xl px-6 py-8">
			<ProductCard eyebrow="Beta notice" bodyClass="p-6 sm:p-8">
				<p class={`m-0 ${bodyCopy}`}>
					This software is currently in beta, so bugs are possible, and features might change or be removed at any point. I'll try my best to avoid breaking changes but some might happen. Once V1 is released, future updates will include automatic migration of presets when needed.
				</p>
			</ProductCard>
		</section>

		<section class={sectionGrid}>
			<div>
				<p class={sectionEyebrow}>Official installers</p>
				<h2 class={sectionTitle}>Packaged builds for macOS, Linux, and Windows.</h2>
			</div>
			<div class={`space-y-5 ${bodyCopy}`}>
				<p class="m-0">This official release provides pre-compiled, code-signed, and fully packaged desktop installers (VST3/AUv2/CLAP) for macOS, Linux, and Windows.</p>
				<p class="m-0"><strong class="text-base-content">Pay-What-You-Want:</strong> This installer is available starting at $0. If you have the means, entering a contribution directly supports independent DSP development, brand overhead, and future updates for Purr Audio!</p>
				<p class="m-0"><strong class="text-base-content">Open-Core Philosophy:</strong> Prefer to compile it yourself? The raw source code is fully open-source under the GPLv3. You can clone the repository and build the binaries directly from source via <code class="rounded-md bg-base-content/5 px-1.5 py-0.5 text-sm">cargo build</code>.</p>
				<p class={`m-0 ${mutedCopy}`}>Note: By downloading this pre-compiled package, you agree to a standard End-User License Agreement (EULA) for personal/commercial music production. Official installer binaries may not be hosted, mirrored, or re-distributed.</p>
			</div>
		</section>

		<section class="mx-auto grid w-full max-w-6xl grid-cols-3 gap-4 px-6 py-8 max-lg:grid-cols-1">
			<ProductCard eyebrow="Expanded Algorithm Suite" title="Generator algorithms beyond standard Phase Distortion.">
				<ul class="m-0 list-none space-y-3 p-0 text-sm leading-6 text-base-content/60">
					{#each algorithmItems as item}
						<li>{item}</li>
					{/each}
				</ul>
			</ProductCard>

			<ProductCard eyebrow="Architecture and Modulation" title="A multi-line architecture for complex sound layering.">
				<ul class="m-0 list-none space-y-3 p-0 text-sm leading-6 text-base-content/60">
					{#each architectureItems as item}
						<li>{item}</li>
					{/each}
				</ul>
			</ProductCard>

			<ProductCard eyebrow="Integrated Effects Suite" title="FX slots for space, modulation, tone, and motion.">
				<ul class="m-0 list-none space-y-3 p-0 text-sm leading-6 text-base-content/60">
					{#each effectsItems as item}
						<li>{item}</li>
					{/each}
				</ul>
			</ProductCard>
		</section>
	</main>

	<ProductFooter productName="Cosmo PD-101" supportUrl={supportCommerce.checkoutUrl} />
</div>
