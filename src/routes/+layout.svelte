<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '../app.css';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve(undefined);
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&display=swap" rel="stylesheet">
	<script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
</svelte:head>

{@render children()}
