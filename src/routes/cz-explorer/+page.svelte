<script lang="ts">
	import { onMount } from 'svelte';
	import ProductActions from '$lib/components/ProductActions.svelte';
	import ProductCarousel from '$lib/components/ProductCarousel.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import ProductFooter from '$lib/components/ProductFooter.svelte';
	import ProductNav from '$lib/components/ProductNav.svelte';
	import SupportInline from '$lib/components/SupportInline.svelte';
	import { bodyCopy, eyebrow, heroGlow, heroSection, heroText, heroTitle, introText, pageShell, sectionEyebrow, sectionGrid, sectionTitle } from '$lib/product-page-classes';
	import { supportCommerce } from '$lib/site-config';

	onMount(() => {
		(window as Window & { createLemonSqueezy?: () => void }).createLemonSqueezy?.();
	});

	const features = [
		{
			title: 'Patch library',
			text: 'Browse, search, tag, and organize CZ-101 patches in a clean browser workspace.'
		},
		{
			title: 'SysEx import and export',
			text: 'Move classic patch dumps in and out of the app so old libraries stay usable.'
		},
		{
			title: 'WebMIDI transfer',
			text: 'Connect supported browsers directly to hardware and send patches without a native install.'
		},
		{
			title: 'Always free',
			text: 'CZ Explorer is a free utility for musicians keeping vintage CZ workflows alive.'
		}
	];

	const gallery = [
		{ src: '/products/cz-explorer/czx-library.jpg', alt: 'CZ Explorer library view', label: 'Library' },
		{ src: '/products/cz-explorer/czx-performance-mode.jpg', alt: 'CZ Explorer performance mode', label: 'Performance' },
		{ src: '/products/cz-explorer/czx-backups.jpg', alt: 'CZ Explorer backup management', label: 'Backups' }
	];
	const navLinks = [
		{ label: 'Cosmo PD-101', href: '/cosmo' },
		{ label: 'GitHub', href: 'https://github.com/fpbrault/cz-explorer', target: '_blank' },
		{ label: 'Open app', href: 'https://cz-explorer.purraudio.dev/', target: '_blank' }
	];
	const actions = [
		{ label: 'Try it in the browser', href: 'https://cz-explorer.purraudio.dev/', target: '_blank' },
		{ label: 'GitHub', href: 'https://github.com/fpbrault/cz-explorer', target: '_blank', variant: 'secondary' as const }
	];
</script>

<svelte:head>
	<title>CZ Explorer | Purr Audio</title>
</svelte:head>

<div class={pageShell} data-theme="purr">
	<ProductNav links={navLinks} />

	<main>
		<section class={heroSection}>
			<div class={heroGlow}></div>

			<div class={heroText}>
				<p class={eyebrow}>Free browser tool for Casio CZ-101 patches</p>
				<h1 class={heroTitle}>CZ Explorer</h1>
				<p class={introText}>
					A modern preset librarian for the Casio CZ-101. Organize, edit, import, export, and transfer patches between your browser and your hardware.
				</p>

			</div>

			<ProductCarousel {gallery} idPrefix="cz" thumbnailColumns="grid-cols-3 max-sm:grid-cols-1" thumbnailWidth="max-w-2xl" />

			<div class="mx-auto mt-8 max-w-3xl text-center">
				<ProductActions {actions} ariaLabel="CZ Explorer actions" />

				<SupportInline description={supportCommerce.description} checkoutUrl={supportCommerce.checkoutUrl} ctaLabel={supportCommerce.ctaLabel} />
			</div>
		</section>

		<section class={sectionGrid}>
			<div>
				<p class={sectionEyebrow}>What it is</p>
				<h2 class={sectionTitle}>A browser-first workspace for vintage CZ patch management.</h2>
			</div>
			<p class={`m-0 ${bodyCopy}`}>
				CZ Explorer is for musicians who want to keep hardware patch libraries organized without adding another desktop utility. It focuses on the real workflow: finding sounds, grouping sounds, and moving SysEx data where it needs to go.
			</p>
		</section>

		<section class="mx-auto grid w-full max-w-6xl grid-cols-4 gap-4 px-6 py-8 max-lg:grid-cols-2 max-sm:grid-cols-1" aria-label="CZ Explorer features">
			{#each features as feature}
				<ProductCard title={feature.title} titleClass="card-title m-0 mb-3 text-lg font-bold tracking-tight">
					<p class="m-0 leading-7 text-base-content/60">{feature.text}</p>
				</ProductCard>
			{/each}
		</section>

		<section class="mx-auto w-full max-w-6xl px-6 py-16">
			<ProductCard eyebrow="No checkout required" bodyClass="p-8 sm:p-10">
					<div class="grid grid-cols-note gap-10 max-lg:grid-cols-1">
						<h2 class="m-0 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Open it and start organizing patches.</h2>
						<p class={`m-0 ${bodyCopy}`}>
							CZ Explorer stays free. The support checkout is separate and optional, for people who want to help fund the surrounding Purr Audio work.
						</p>
					</div>
			</ProductCard>
		</section>
	</main>

	<ProductFooter productName="CZ Explorer" supportUrl={supportCommerce.checkoutUrl} />
</div>
