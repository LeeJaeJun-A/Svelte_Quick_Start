import { auth } from "$lib/server/auth";

declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: {
			username: string;
			role: 'ADMIN' | 'USER';
		};
	}
}
