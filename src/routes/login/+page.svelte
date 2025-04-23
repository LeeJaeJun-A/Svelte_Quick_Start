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

<div class="bg-main flex h-full items-center justify-center">
	<div class="line w-full max-w-md rounded-lg bg-white p-8">
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
					placeholder="아이디를 입력해주세요."
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
					placeholder="비밀번호를 입력해주세요."
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
			<div class="text-right">
				<button
					type="submit"
					class="color-blue-600 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
				>
					로그인
				</button>
			</div>
		</form>
	</div>
</div>
