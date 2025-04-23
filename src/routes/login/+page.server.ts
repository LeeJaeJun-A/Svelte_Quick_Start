import { prismaClient } from '$lib/server/prisma';
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		throw redirect(302, '/');
	}

	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();

		const username = form.get('username')?.toString().trim() ?? '';
		const password = form.get('password')?.toString() ?? '';

		const fieldErrors: Record<string, string> = {};
		const values = { username };

		if (!username) {
			fieldErrors.username = '아이디를 입력해주세요.';
		}

		if (!password) {
			fieldErrors.password = '비밀번호를 입력해주세요.';
		}

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, { fieldErrors, values });
		}

		const user = await prismaClient.user.findUnique({
			where: { username },
			include: { authKeys: true }
		});

		if (!user || !user.authKeys[0]?.hashed_password) {
			return fail(400, {
				fieldErrors: { default: '아이디 또는 비밀번호가 잘못되었습니다.' },
				values
			});
		}

		const passwordMatch = await bcrypt.compare(password, user.authKeys[0].hashed_password);

		if (!passwordMatch) {
			return fail(400, {
				fieldErrors: { default: '아이디 또는 비밀번호가 잘못되었습니다.' },
				values
			});
		}

		const session = await auth.createSession(user.id, {});
		const sessionCookie = auth.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			...sessionCookie.attributes,
			path: sessionCookie.attributes.path ?? '/'
		});

		throw redirect(302, '/');
	}
};
