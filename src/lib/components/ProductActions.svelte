<script lang="ts">
	type ProductAction = {
		label: string;
		href?: string;
		target?: string;
		variant?: 'primary' | 'secondary';
		lemonSqueezy?: boolean;
		disabled?: boolean;
	};

	let { actions, ariaLabel }: { actions: ProductAction[]; ariaLabel: string } = $props();

	const baseButton = 'btn rounded-full px-7 text-sm font-bold transition hover:-translate-y-0.5';
	const primaryButton = `${baseButton} btn-primary shadow-primary`;
	const secondaryButton = `${baseButton} btn-outline border-black/10 bg-base-100 text-base-content/70 shadow-control hover:border-primary/35 hover:bg-base-100 hover:text-primary`;

	function getHostname(href: string): string | undefined {
		try {
			return new URL(href, 'https://purraudio.dev').hostname;
		} catch {
			return undefined;
		}
	}

	function isStorefrontLink(href: string): boolean {
		return getHostname(href) === 'store.purraudio.dev';
	}

	function getRel(href: string): string | undefined {
		return isStorefrontLink(href) ? 'external' : undefined;
	}

	function getLemonSqueezyClass(action: ProductAction): string {
		if (!action.lemonSqueezy || !action.href || isStorefrontLink(action.href)) {
			return '';
		}

		return 'lemonsqueezy-button';
	}
</script>

<div class="mt-7 flex flex-wrap justify-center gap-3" aria-label={ariaLabel}>
	{#each actions as action}
		{#if action.disabled || !action.href}
			<span class="btn btn-disabled rounded-full px-7 text-sm font-bold" aria-disabled="true">
				{action.label}
			</span>
		{:else}
			<a
				href={action.href}
				target={action.target}
				rel={getRel(action.href)}
				class={`${action.variant === 'secondary' ? secondaryButton : primaryButton} ${getLemonSqueezyClass(action)}`}
			>
				{action.label}
			</a>
		{/if}
	{/each}
</div>
