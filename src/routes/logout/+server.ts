// src/routes/logout/+server.ts
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get(auth.sessionCookieName);
	if (sessionId) {
		await auth.invalidateSession(sessionId);

		const blank = auth.createBlankSessionCookie();
		cookies.set(blank.name, blank.value, {
			path: blank.attributes.path ?? '/',
			...blank.attributes,
			maxAge: 0
		});
	}

	throw redirect(302, '/login');
};
