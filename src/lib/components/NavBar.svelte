<script lang="ts">
	import { goto } from '$app/navigation';
	import type { User } from 'lucia';
	import { page } from '$app/state';

	export let user: User | null;

	const currentPath = page.url.pathname;

  const links = [
		{ href: '/', label: '홈' },
		{ href: '/1', label: '1' },
		{ href: '/2', label: '2' },
		{ href: '/3', label: '3' }
	];

	const goHome = () => goto('/');
	const goLogin = () => goto('/login');
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
					<a
						{href}
						class="hover:text-black {currentPath === href
							? 'font-bold text-black'
							: 'text-gray-400'}"
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<div class="flex items-center space-x-3">
		{#if user}
			<!-- 로그인 상태 -->
			<div class="flex items-center space-x-1.5">
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
				<!-- 실제 사용자 이름 -->
				<span class="text-sm text-gray-700">{user.username}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
			<!-- 알림 버튼 -->
			<button
				class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200"
				aria-label="알림"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
               a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341
               C7.67 6.165 6 8.388 6 11v3.159
               c0 .538-.214 1.055-.595 1.436L4 17h5
               m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
			</button>
		{:else}
			<!-- 비로그인 상태 -->
			<button
				on:click={goLogin}
				class="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
			>
				로그인 필요
			</button>
		{/if}
	</div>
</nav>
