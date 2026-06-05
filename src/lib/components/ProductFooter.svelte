<script lang="ts">
	let {
		productName,
		supportUrl
	}: {
		productName: string;
		supportUrl: string;
	} = $props();

	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-base-content/8 bg-base-100/80">
	<div class="mx-auto grid w-full max-w-7xl gap-4 px-6 py-8 sm:grid-cols-[1fr_auto] sm:items-center">
		<div>
			<p class="m-0 text-xs font-bold uppercase tracking-home-link text-base-content/45">Purr Audio</p>
			<p class="m-0 mt-2 text-sm font-medium text-base-content/70">{productName}</p>
		</div>

		<div class="flex flex-wrap items-center gap-2 sm:justify-end">
			<a href="/" class="btn btn-ghost btn-sm rounded-full px-3 text-sm font-medium text-base-content/60 no-underline hover:bg-primary/8 hover:text-primary">Home</a>
			<a href="https://github.com/Purr-Audio" target="_blank" class="btn btn-ghost btn-sm rounded-full px-3 text-sm font-medium text-base-content/60 no-underline hover:bg-primary/8 hover:text-primary">GitHub</a>
			{#if supportUrl}
				<a href={supportUrl} class="lemonsqueezy-button btn btn-primary btn-sm rounded-full px-4 shadow-primary">Support</a>
			{/if}
		</div>

		<p class="m-0 text-xs text-base-content/40 sm:col-span-2">© {currentYear} Purr Audio. For 🐱Basil, 🐱Lola and 🐱Latte</p>
	</div>
</footer>
