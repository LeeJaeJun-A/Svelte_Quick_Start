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
			<div class="mb-3">
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
					class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-700"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="28"
						height="28"
						viewBox="0 0 48 48"
					>
						<path
							fill="#FFC107"
							d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
						></path><path
							fill="#FF3D00"
							d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
						></path><path
							fill="#4CAF50"
							d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
						></path><path
							fill="#1976D2"
							d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
						></path>
					</svg>
				</button>

				<!-- GitHub -->
				<button
					disabled
					aria-label="GitHub로 로그인"
					class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-700"
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
					class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-yellow-300 text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:bg-yellow-300 disabled:text-black"
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
