<script lang="ts">
	type GalleryImage = {
		src: string;
		alt: string;
		label: string;
	};

	let {
		gallery,
		idPrefix,
		aspectClass = 'aspect-product',
		thumbnailColumns = 'grid-cols-4 max-sm:grid-cols-2',
		thumbnailWidth = 'max-w-3xl'
	}: {
		gallery: GalleryImage[];
		idPrefix: string;
		aspectClass?: string;
		thumbnailColumns?: string;
		thumbnailWidth?: string;
	} = $props();

	let activeSlide = $state(0);

	function showSlide(index: number) {
		activeSlide = (index + gallery.length) % gallery.length;
		requestAnimationFrame(() => {
			document.getElementById(`${idPrefix}-slide-${activeSlide}`)?.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start'
			});
		});
	}
</script>

<div class="mx-auto mt-8 max-w-4xl">
	<div class={`carousel ${aspectClass} w-full overflow-hidden rounded-3xl bg-black shadow-product`}>
		{#each gallery as image, index}
			<div id={`${idPrefix}-slide-${index}`} class="carousel-item relative w-full">
				<img src={image.src} alt={image.alt} class="h-full w-full object-contain" />
			</div>
		{/each}
	</div>

	<div class="mt-4 flex items-center justify-center gap-2 sm:hidden" aria-label="Select screenshot">
		{#each gallery as image, index}
			<button
				type="button"
				onclick={() => showSlide(index)}
				class={`h-2.5 rounded-full transition-all ${activeSlide === index ? 'w-8 bg-primary' : 'w-2.5 bg-base-content/20 hover:bg-base-content/35'}`}
				aria-label={`Show ${image.label} screenshot`}
			></button>
		{/each}
	</div>

	<div class={`mx-auto mt-5 hidden ${thumbnailWidth} ${thumbnailColumns} gap-3 sm:grid`} aria-label="Product screenshots">
		{#each gallery as image, index}
			<button type="button" class={`group rounded-2xl p-1 text-left transition ${activeSlide === index ? 'bg-primary' : 'bg-base-100 shadow-control hover:bg-primary/8'}`} onclick={() => showSlide(index)}>
				<div class={`${aspectClass} overflow-hidden rounded-xl bg-black`}>
					<img src={image.src} alt={image.alt} class="h-full w-full object-cover transition group-hover:scale-105" />
				</div>
				<p class={`m-0 px-2 pb-1 pt-2 text-center text-xs font-medium ${activeSlide === index ? 'text-primary-content' : 'text-base-content/50'}`}>{image.label}</p>
			</button>
		{/each}
	</div>
</div>
