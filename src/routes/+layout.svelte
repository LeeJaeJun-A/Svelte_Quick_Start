<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import '$lib/styles/colors.css';
	import '$lib/styles/components.css';
	import '$lib/styles/typography.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import type { User } from 'lucia';

	export let data: {
		user: User | null;
		session: import('lucia').Session | null;
	};

	const { user } = data;
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex h-screen flex-col">
	<NavBar {user} />
	<main class="h-full min-h-[calc(100vh-56px)] flex-1 overflow-y-auto">
		<slot />
	</main>
</div>
