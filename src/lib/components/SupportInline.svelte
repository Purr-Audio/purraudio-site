<script lang="ts">
	let {
		description,
		checkoutUrl,
		ctaLabel
	}: {
		description: string;
		checkoutUrl: string;
		ctaLabel: string;
	} = $props();
</script>

<div class="mx-auto mt-5 max-w-2xl text-sm leading-6 text-base-content/50">
	<span>{description}</span>
	{#if checkoutUrl}
		<a href={checkoutUrl} class="lemonsqueezy-button ml-2 font-semibold text-primary underline decoration-primary/25 underline-offset-4 transition hover:decoration-primary">
			{ctaLabel}
		</a>
	{:else}
		<span class="ml-2 font-semibold text-base-content/35">{ctaLabel}</span>
	{/if}
</div>
