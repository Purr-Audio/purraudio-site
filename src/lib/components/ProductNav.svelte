<script lang="ts">
	type NavLink = {
		label: string;
		href: string;
		target?: string;
	};

	let { links }: { links: NavLink[] } = $props();

	const navLink =
		'btn btn-ghost btn-sm rounded-full px-3 text-sm font-medium text-base-content/60 no-underline hover:bg-primary/8 hover:text-primary';
</script>

<header class="navbar mx-auto w-full max-w-7xl items-center justify-between gap-3 px-6 py-5">
	<a href="/" class="btn btn-ghost btn-sm rounded-full px-3 text-sm font-bold uppercase tracking-widest text-base-content no-underline hover:bg-primary/8 hover:text-primary">Purr Audio</a>
	<nav class="hidden justify-end gap-2 sm:flex" aria-label="Product navigation">
		{#each links as link}
			<a href={link.href} target={link.target} class={navLink}>{link.label}</a>
		{/each}
	</nav>

	<details class="dropdown dropdown-end sm:hidden">
		<summary class="btn btn-ghost btn-sm rounded-full px-3 text-sm font-semibold text-base-content/70 list-none">Menu +</summary>
		<ul class="menu dropdown-content z-20 mt-2 w-56 rounded-2xl border border-base-content/10 bg-base-100 p-2 shadow-card">
			{#each links as link}
				<li>
					<a href={link.href} target={link.target} class="rounded-xl px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-primary/8 hover:text-primary">{link.label}</a>
				</li>
			{/each}
		</ul>
	</details>
</header>
