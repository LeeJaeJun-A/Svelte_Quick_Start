import { prismaClient } from '$lib/server/prisma';
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		throw redirect(302, '/');
	}

	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const username = form.get('username')?.toString().trim() ?? '';
		const email = form.get('email')?.toString().trim() ?? '';
		const password = form.get('password')?.toString() ?? '';

		const fieldErrors: Record<string, string> = {};

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const usernameRegex = /^[a-zA-Z0-9]+$/;

		if (!username) {
			fieldErrors.username = '아이디를 입력해주세요.';
		} else if (!usernameRegex.test(username)) {
			fieldErrors.username = '아이디는 영문과 숫자만 사용할 수 있습니다.';
		} else if (username.length < 6) {
			fieldErrors.username = '아이디는 6자 이상이어야 합니다.';
		}
		if (!email || !emailRegex.test(email)) {
			fieldErrors.email = '올바른 이메일 형식이 아닙니다.';
		}

		const passwordValid =
			password.length >= 10 &&
			/[a-zA-Z]/.test(password) &&
			/[0-9]/.test(password) &&
			/[^a-zA-Z0-9]/.test(password);

		if (!passwordValid) {
			fieldErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함한 10자 이상이어야 합니다.';
		}

		const values = { username, email };

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, {
				fieldErrors,
				values
			});
		}

		const existingUser = await prismaClient.user.findUnique({ where: { username } });
		if (existingUser) {
			fieldErrors.username = '이미 사용 중인 아이디입니다.';
		}

		const existingEmail = await prismaClient.user.findUnique({ where: { email } });
		if (existingEmail) {
			fieldErrors.email = '이미 가입된 이메일입니다.';
		}

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, {
				fieldErrors,
				values
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await prismaClient.user.create({
			data: {
				username,
				email,
				role: 'USER',
				authKeys: {
					create: {
						id: `email:${username}`,
						hashed_password: hashedPassword
					}
				}
			}
		});

		throw redirect(302, '/login');
	}
};
