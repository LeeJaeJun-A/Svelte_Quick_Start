<script lang="ts">
	import { goto } from '$app/navigation';
	import { getStores } from '$app/stores';
	import type { User } from 'lucia';

	export let user: User | null;

	const { page } = getStores();
	let currentPath = '/';

	page.subscribe((p) => {
		currentPath = p.url.pathname;
	});

	const links = [
		{ href: '/', label: '홈' },
		{ href: '/1', label: '1' },
		{ href: '/2', label: '2' },
		{ href: '/3', label: '3' }
	];

	const goHome = () => goto('/');
	const goLogin = () => goto('/login');
	const logout = () => goto('/logout');
</script>

<nav class="flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-6">
	<!-- 좌측 로고 & 메뉴 -->
	<div class="flex items-center space-x-6">
		<a
			on:click|preventDefault={goHome}
			href="/"
			class="text-2xl font-semibold text-gray-800 hover:opacity-80"
		>
			LOGO
		</a>
		<ul class="flex space-x-4 text-sm font-medium">
			{#each links as { href, label }}
				<li>
					<button
						on:click={() => goto(href)}
						class={currentPath === href
							? 'font-bold text-black hover:text-black'
							: 'text-gray-400 hover:text-black'}
					>
						{label}
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="flex items-center space-x-2">
		{#if user}
			<!-- 로그인 상태 -->
			<div class="flex items-center space-x-1.5 pr-1">
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
					<!-- 사용자 아이콘 -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="h-4 w-4 text-blue-500"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5.121 17.804A4.992 4.992 0 015 15V5a2 2 0 012-2h10a2 2 0 012 2v10
                 a4.992 4.992 0 01-.121 2.804M12 17v2m0 0h-3m3 0h3"
						/>
					</svg>
				</div>
				<span class="text-sm text-gray-700">{user.username}</span>
			</div>
			<button
				on:click|preventDefault={logout}
				class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200"
				aria-label="로그아웃"
			>
				<svg
					class="h-4 w-4 text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
					/>
				</svg>
			</button>
		{:else}
			<!-- 비로그인 상태 -->
			<button
				on:click={goLogin}
				class="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
			>
				로그인
			</button>
		{/if}
	</div>
</nav>
