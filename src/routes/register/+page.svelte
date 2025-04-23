<script lang="ts">
	import { onMount, tick } from 'svelte';

	export let form: {
		fieldErrors?: {
			username?: string;
			email?: string;
			password?: string;
			default?: string;
		};
		values?: {
			username?: string;
			email?: string;
		};
	};

	let username = form?.values?.username ?? '';
	let email = form?.values?.email ?? '';

	let password = '';
	let passwordConfirm = '';

	let passwordMatchMsg = '';
	let passwordMatched = false;

	let usernameRef: HTMLInputElement;
	let emailRef: HTMLInputElement;
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
		} else if (form?.fieldErrors?.email && emailRef) {
			emailRef.focus();
			emailRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
		} else if (form?.fieldErrors?.password && passwordRef) {
			passwordRef.focus();
			passwordRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	});

	// 비밀번호 확인 검사
	$: {
		if (!passwordConfirm) {
			passwordMatchMsg = '';
			passwordMatched = false;
		} else if (password !== passwordConfirm) {
			passwordMatchMsg = '비밀번호가 일치하지 않습니다.';
			passwordMatched = false;
		} else {
			passwordMatchMsg = '비밀번호가 일치합니다.';
			passwordMatched = true;
		}
	}
</script>

<div class="min-h-full w-full flex items-center justify-center bg-main">
	<div class="w-full max-w-xl bg-white rounded-lg p-8 line my-4 mx-8">
		<h2 class="text-xl font-semibold text-gray-900 mb-6 text-center">회원가입</h2>

		<form method="POST" on:submit|preventDefault={handleSubmit} class="space-y-8 ">
			<!-- 아이디 -->
			<div>
				<label for="username" class="block mb-1 text-sm font-medium text-gray-900">아이디</label>
				<input
					id="username"
					bind:this={usernameRef}
					name="username"
					bind:value={username}
					placeholder="영문+숫자, 최소 6자"
					required
					type="text"
					class="input-basic w-full h-[46px] focus:ring-color-blue-500 focus:border-color-blue-500"
				/>
				{#if form?.fieldErrors?.username}
					<p class="mt-1 text-sm text-red-600">{form.fieldErrors.username}</p>
				{/if}
			</div>

			<!-- 이메일 -->
			<div>
				<label for="email" class="block mb-1 text-sm font-medium text-gray-900">이메일</label>
				<input
					id="email"
					bind:this={emailRef}
					name="email"
					bind:value={email}
					placeholder="example@domain.com"
					type="email"
					required
					class="input-basic w-full h-[46px] focus:ring-color-blue-500 focus:border-color-blue-500"
				/>
				{#if form?.fieldErrors?.email}
					<p class="mt-1 text-sm text-red-600">{form.fieldErrors.email}</p>
				{/if}
			</div>

			<!-- 비밀번호 -->
			<div>
				<label for="password" class="block mb-1 text-sm font-medium text-gray-900">비밀번호</label>
				<input
					id="password"
					bind:this={passwordRef}
					type="password"
					name="password"
					bind:value={password}
					placeholder="영문·숫자·특수문자 포함, 최소 10자"
					required
					class="input-basic w-full h-[46px] focus:ring-color-blue-500 focus:border-color-blue-500"
				/>
				{#if form?.fieldErrors?.password}
					<p class="mt-1 text-sm text-red-600">{form.fieldErrors.password}</p>
				{/if}
			</div>

			<!-- 비밀번호 확인 -->
			<div>
				<label for="passwordConfirm" class="block mb-1 text-sm font-medium text-gray-900">비밀번호 재입력</label>
				<input
					id="passwordConfirm"
					type="password"
					bind:value={passwordConfirm}
					placeholder="비밀번호를 다시 입력해주세요"
					required
					class="input-basic w-full h-[46px] focus:ring-color-blue-500 focus:border-color-blue-500"
				/>
				{#if passwordMatchMsg}
					<p class="mt-1 text-sm" style="color: {passwordMatched ? 'green' : 'red'}">{passwordMatchMsg}</p>
				{/if}
			</div>

			<div class="text-right">
				<button type="submit" class="color-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5">
					가입하기
				</button>
			</div>

			{#if form?.fieldErrors?.default}
				<p class="mt-2 text-sm text-red-600 text-center">{form.fieldErrors.default}</p>
			{/if}
		</form>
	</div>
</div>

<!-- TODO: 이메일 인증코드 발송 및 검증 추가 -->