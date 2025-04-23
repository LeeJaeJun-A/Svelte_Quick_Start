<script lang="ts">
	import '../app.css';
	import '$lib/styles/colors.css';
	import '$lib/styles/components.css';
	import '$lib/styles/typography.css';
	import NavBar from '$lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex flex-col h-screen">
	<NavBar />
	<main class="flex-1 overflow-y-auto">
		{@render children()}
	</main>
</div>
