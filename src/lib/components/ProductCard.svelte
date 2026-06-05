<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow,
		title,
		bodyClass = 'p-6',
		titleClass = 'card-title m-0 mb-5 text-2xl font-bold tracking-tight',
		children
	}: {
		eyebrow?: string;
		title?: string;
		bodyClass?: string;
		titleClass?: string;
		children?: Snippet;
	} = $props();
</script>

<article class="card bg-base-100 shadow-card">
	<div class={`card-body ${bodyClass}`}>
		{#if eyebrow}
			<p class="mb-3 text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
		{/if}
		{#if title}
			<h2 class={titleClass}>{title}</h2>
		{/if}
		{@render children?.()}
	</div>
</article>
