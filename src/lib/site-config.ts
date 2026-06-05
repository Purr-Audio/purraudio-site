import { env } from '$env/dynamic/public';

export const cosmoCommerce = {
	checkoutUrl: env.PUBLIC_LEMON_SQUEEZY_COSMO_URL || 'https://store.purraudio.dev/',
	productName: 'Cosmo PD-101',
	ctaLabel: 'Add to cart',
	eyebrow: 'Free and open source',
	suggestedPrice: '$5',
	pricingRule: '$0 is welcome. Contributions support the work.',
	description:
		'A free and open-source phase distortion synthesizer inspired by the Casio CZ-101, available in the browser, on the desktop, and inside your DAW.'
} as const;

export const supportCommerce = {
	checkoutUrl: env.PUBLIC_LEMON_SQUEEZY_SUPPORT_URL ?? '',
	ctaLabel: 'Support my work',
	description:
		'Contributions support independent DSP development, packaged installers, hosting, and future Purr Audio updates.'
} as const;
