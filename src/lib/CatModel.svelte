<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let container: HTMLDivElement;
	let renderer: THREE.WebGLRenderer;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let catGroup: THREE.Group;
	let animId: number;
	let mouseX = 0, mouseY = 0;

	onMount(() => {
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.3;
		container.appendChild(renderer.domElement);

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
		camera.position.set(0, 0, 16);

		catGroup = new THREE.Group();

		const material = new THREE.MeshPhysicalMaterial({
			color: 0x7c3aed,
			transparent: true,
			opacity: 0.55,
			roughness: 0.35,
			metalness: 0.1,
			transmission: 0.15,
			thickness: 1.0,
			clearcoat: 0.6,
			clearcoatRoughness: 0.3,
			side: THREE.DoubleSide,
		});

		const glowMat = new THREE.MeshBasicMaterial({
			color: 0xa855f7,
			transparent: true,
			opacity: 0.04,
			side: THREE.BackSide,
		});

		// --- HEAD ---
		// Main cranium: slightly squashed sphere
		const headGeo = new THREE.SphereGeometry(2.4, 32, 32);
		const headMesh = new THREE.Mesh(headGeo, material);
		headMesh.scale.set(1.05, 0.95, 1.0);
		catGroup.add(headMesh);

		const headGlow = new THREE.Mesh(headGeo, glowMat);
		headGlow.scale.set(0.98, 0.88, 0.93);
		catGroup.add(headGlow);

		// --- EARS ---
		// Low-poly cone ears, 4 segments for faceted look
		const earGeo = new THREE.ConeGeometry(0.85, 2.2, 4);

		// Left ear
		const leftEar = new THREE.Mesh(earGeo, material);
		leftEar.position.set(-1.5, 2.0, 0.3);
		leftEar.rotation.set(0.15, 0, 0.45);
		catGroup.add(leftEar);

		const leftEarGlow = new THREE.Mesh(earGeo, glowMat);
		leftEarGlow.position.copy(leftEar.position);
		leftEarGlow.rotation.copy(leftEar.rotation);
		leftEarGlow.scale.setScalar(0.92);
		catGroup.add(leftEarGlow);

		// Right ear
		const rightEar = new THREE.Mesh(earGeo, material);
		rightEar.position.set(1.5, 2.0, 0.3);
		rightEar.rotation.set(0.15, 0, -0.45);
		catGroup.add(rightEar);

		const rightEarGlow = new THREE.Mesh(earGeo, glowMat);
		rightEarGlow.position.copy(rightEar.position);
		rightEarGlow.rotation.copy(rightEar.rotation);
		rightEarGlow.scale.setScalar(0.92);
		catGroup.add(rightEarGlow);

		// --- MUZZLE / SNOUT ---
		const snoutGeo = new THREE.SphereGeometry(0.9, 24, 24);
		const snout = new THREE.Mesh(snoutGeo, material);
		snout.position.set(0, -0.45, 2.0);
		snout.scale.set(1.15, 0.75, 0.85);
		catGroup.add(snout);

		const snoutGlow = new THREE.Mesh(snoutGeo, glowMat);
		snoutGlow.position.copy(snout.position);
		snoutGlow.scale.set(1.05, 0.68, 0.78);
		catGroup.add(snoutGlow);

		// --- CHEEKS (fill the sides so it doesn't look like a floating sphere) ---
		const cheekGeo = new THREE.SphereGeometry(1.1, 24, 24);

		const leftCheek = new THREE.Mesh(cheekGeo, material);
		leftCheek.position.set(-1.6, -0.3, 1.0);
		leftCheek.scale.set(1.0, 0.9, 0.8);
		catGroup.add(leftCheek);

		const rightCheek = new THREE.Mesh(cheekGeo, material);
		rightCheek.position.set(1.6, -0.3, 1.0);
		rightCheek.scale.set(1.0, 0.9, 0.8);
		catGroup.add(rightCheek);

		// --- NECK / BODY ---
		const neckGeo = new THREE.CylinderGeometry(1.3, 1.6, 2.5, 24);
		const neck = new THREE.Mesh(neckGeo, material);
		neck.position.set(0, -2.6, -0.3);
		catGroup.add(neck);

		const neckGlow = new THREE.Mesh(neckGeo, glowMat);
		neckGlow.position.copy(neck.position);
		neckGlow.scale.setScalar(0.94);
		catGroup.add(neckGlow);

		// --- SHOULDER BASE ---
		const shoulderGeo = new THREE.SphereGeometry(2.0, 24, 24);
		const shoulder = new THREE.Mesh(shoulderGeo, material);
		shoulder.position.set(0, -3.8, -0.5);
		shoulder.scale.set(1.3, 0.7, 1.0);
		catGroup.add(shoulder);

		scene.add(catGroup);

		// --- LIGHTS ---
		const ambient = new THREE.AmbientLight(0x4c1d95, 1.2);
		scene.add(ambient);

		const p1 = new THREE.PointLight(0xa855f7, 6, 20);
		p1.position.set(4, 3, 5);
		scene.add(p1);

		const p2 = new THREE.PointLight(0xc084fc, 4, 20);
		p2.position.set(-4, 2, 4);
		scene.add(p2);

		const p3 = new THREE.PointLight(0x7c3aed, 5, 20);
		p3.position.set(0, -3, 6);
		scene.add(p3);

		// Back glow disc
		const discGeo = new THREE.CircleGeometry(6, 64);
		const discMat = new THREE.MeshBasicMaterial({
			color: 0x7c3aed,
			transparent: true,
			opacity: 0.05,
			side: THREE.DoubleSide,
		});
		const disc = new THREE.Mesh(discGeo, discMat);
		disc.position.z = -3;
		scene.add(disc);

		// Mouse
		const handleMove = (e: MouseEvent) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};
		window.addEventListener('mousemove', handleMove);

		const handleResize = () => {
			if (!container) return;
			const w = container.clientWidth;
			const h = container.clientHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};
		window.addEventListener('resize', handleResize);

		let time = 0;
		const animate = () => {
			animId = requestAnimationFrame(animate);
			time += 0.004;

			const targetRotY = mouseX * 0.3;
			const targetRotX = -mouseY * 0.18;

			if (catGroup) {
				catGroup.rotation.y += (targetRotY - catGroup.rotation.y) * 0.04;
				catGroup.rotation.x += (targetRotX - catGroup.rotation.x) * 0.04;
				catGroup.rotation.z = Math.sin(time) * 0.015;
				catGroup.position.y = Math.sin(time * 1.5) * 0.08;
			}

			renderer.render(scene, camera);
		};
		animate();

		return () => {
			window.removeEventListener('mousemove', handleMove);
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animId);
			renderer.dispose();
			if (container && renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div bind:this={container} class="cat-3d-container"></div>

<style>
	.cat-3d-container {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: min(90vw, 800px);
		height: min(90vw, 800px);
		z-index: 1;
		pointer-events: none;
	}
	.cat-3d-container :global(canvas) {
		width: 100% !important;
		height: 100% !important;
	}
</style>
