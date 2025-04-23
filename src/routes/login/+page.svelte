<script lang="ts">
	import { onMount, tick } from 'svelte';

	export let form: {
		fieldErrors?: {
			username?: string;
			password?: string;
			default?: string;
		};
		values?: {
			username?: string;
		};
	};

	let username = form?.values?.username ?? '';
	let password = '';

	let usernameRef: HTMLInputElement;
	let passwordRef: HTMLInputElement;

	const handleSubmit = () => {
		const formEl = document.querySelector('form') as HTMLFormElement;
		formEl?.submit();
	};

	onMount(async () => {
		await tick();
		if (form?.fieldErrors?.username && usernameRef) {
			usernameRef.focus();
			usernameRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
		} else if (form?.fieldErrors?.password && passwordRef) {
			passwordRef.focus();
			passwordRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	});
</script>

<div class="bg-main flex min-h-full w-full items-center justify-center">
	<div class="line mx-8 my-4 w-full max-w-md rounded-lg bg-white p-8">
		<h2 class="mb-6 text-center text-xl font-semibold text-gray-900">로그인</h2>

		<form method="POST" on:submit|preventDefault={handleSubmit} class="space-y-4">
			<!-- 아이디 -->
			<div class="mb-6">
				<label for="username" class="mb-1 block text-sm font-medium text-gray-900">아이디</label>
				<input
					id="username"
					bind:this={usernameRef}
					name="username"
					bind:value={username}
					required
					type="text"
					class="input-basic focus:ring-color-blue-500 focus:border-color-blue-500 h-[46px] w-full"
				/>
				{#if form?.fieldErrors?.username}
					<p class="mt-1 text-sm text-red-600">{form.fieldErrors.username}</p>
				{/if}
			</div>

			<!-- 비밀번호 -->
			<div>
				<label for="password" class="mb-1 block text-sm font-medium text-gray-900">비밀번호</label>
				<input
					id="password"
					bind:this={passwordRef}
					type="password"
					name="password"
					bind:value={password}
					required
					class="input-basic focus:ring-color-blue-500 focus:border-color-blue-500 h-[46px] w-full"
				/>
				{#if form?.fieldErrors?.password}
					<p class="mt-1 text-sm text-red-600">{form.fieldErrors.password}</p>
				{/if}
			</div>

			{#if form?.fieldErrors?.default}
				<p class="text-center text-sm text-red-600">{form.fieldErrors.default}</p>
			{/if}

			<!-- 로그인 버튼 -->
			<div class="mt-2 w-full text-right">
				<button
					type="submit"
					class="color-blue-600 h-[46px] w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
				>
					로그인
				</button>
			</div>
		</form>
		<div class="mt-8 space-y-6">
			<!-- Divider -->
			<div class="relative flex items-center">
				<div class="flex-grow border-t border-gray-300"></div>
				<span class="mx-4 text-sm text-gray-500">또는</span>
				<div class="flex-grow border-t border-gray-300"></div>
			</div>
			<!-- OAuth 로그인 -->
			<div class="flex justify-center space-x-4">
				<!-- Google -->
				<button
					disabled
					aria-label="Google로 로그인"
					class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:bg-white disabled:text-gray-700 disabled:cursor-not-allowed"
				>
					<svg class="h-6 w-6" viewBox="0 0 48 48">
						<path
							fill="#EA4335"
							d="M24 9.5c3.15 0 5.9 1.08 8.1 2.85l6.05-6.05C34.7 2.6 29.7 0 24 0 14.6 0 6.6 5.85 2.7 14.3l7.8 6.05C12 13.4 17.5 9.5 24 9.5z"
						/>
						<path
							fill="#4285F4"
							d="M46.5 24.5c0-1.65-.15-3.2-.45-4.7H24v9h12.75c-.55 3-2.3 5.45-4.8 7.1v5.95h7.75c4.55-4.2 7.25-10.4 7.25-17.35z"
						/>
						<path
							fill="#FBBC05"
							d="M10.5 28.15c-.75-2.2-1.15-4.55-1.15-7s.4-4.8 1.15-7l-7.8-6.05C1.05 12.2 0 17 0 21.15c0 4.15 1.05 8.95 2.7 13.05l7.8-6.05z"
						/>
						<path
							fill="#34A853"
							d="M24 48c5.7 0 10.7-1.9 14.25-5.15l-7.75-5.95c-2 1.35-4.55 2.1-7.5 2.1-6.45 0-12-3.95-14.05-9.5L2.7 34.2C6.6 42.65 14.6 48 24 48z"
						/>
					</svg>
				</button>

				<!-- GitHub -->
				<button
					disabled
					aria-label="GitHub로 로그인"
					class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:bg-white disabled:text-gray-700 disabled:cursor-not-allowed"
				>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 0.5C5.73 0.5.5 5.73.5 12c0 5.1 3.29 9.43 7.86 10.96.57.11.78-.25.78-.55v-1.93c-3.2.7-3.87-1.55-3.87-1.55-.52-1.3-1.27-1.64-1.27-1.64-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.02 1.74 2.68 1.23 3.33.94.1-.74.4-1.23.72-1.52-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.2-3.07-.12-.3-.52-1.53.12-3.2 0 0 .98-.32 3.2 1.2a11.12 11.12 0 012.92-.4c.99 0 1.98.13 2.92.4 2.22-1.52 3.2-1.2 3.2-1.2.64 1.67.24 2.9.12 3.2.75.8 1.2 1.82 1.2 3.07 0 4.4-2.68 5.36-5.24 5.65.42.36.78 1.08.78 2.2v3.26c0 .3.21.66.79.55A11.52 11.52 0 0023.5 12c0-6.27-5.23-11.5-11.5-11.5z"
						/>
					</svg>
				</button>

				<!-- Kakao -->
				<button
					disabled
					aria-label="Kakao로 로그인"
					class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-yellow-300 text-black hover:bg-yellow-400 transition disabled:bg-yellow-300 disabled:text-black disabled:cursor-not-allowed"
				>
					<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M12.01 2C6.49 2 2 5.84 2 10.5c0 2.78 1.78 5.24 4.45 6.75-.17.63-.94 3.42-1.02 3.77 0 0-.02.17.09.24.12.08.26 0 .26 0 .35-.05 3.85-2.56 4.48-3.01.75.11 1.52.17 2.3.17 5.52 0 10.01-3.84 10.01-8.5S17.53 2 12.01 2z"
						/>
					</svg>
				</button>
			</div>

			<!-- 회원가입 링크 -->
			<p class="text-center text-sm text-gray-700">
				계정이 없으신가요?
				<a href="/register" class="font-medium text-blue-600 hover:underline">회원가입</a>
			</p>
		</div>
	</div>
</div>
