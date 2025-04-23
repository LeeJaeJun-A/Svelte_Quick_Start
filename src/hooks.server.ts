// src/hooks.server.ts
import type { Handle } from "@sveltejs/kit";
import { sequence }    from "@sveltejs/kit/hooks";
import { auth }        from "$lib/server/auth";

/**
 * 요청마다 실행되는 세션 핸들러
 */
const sessionHandler: Handle = async ({ event, resolve }) => {
  // 1) 세션 쿠키에서 세션 ID 가져오기
  console.log("cookie names available:", event.cookies.getAll().map(c => c.name));
  console.log("auth.sessionCookieName:", auth.sessionCookieName);

  const sessionId = event.cookies.get(auth.sessionCookieName);
  console.log("sessionId", sessionId);
  if (!sessionId) {
    event.locals.user    = null;
    event.locals.session = null;
    return resolve(event);
  }

  // 2) 세션 유효성 검사
  const { session, user } = await auth.validateSession(sessionId);

  console.log("session", session);
  console.log("user", user);

  if (!session) {
    const blank = auth.createBlankSessionCookie();
    event.cookies.set(blank.name, blank.value, {
      path: blank.attributes.path ?? "/",
      ...blank.attributes,
      maxAge: 0
    });
    event.locals.user    = null;
    event.locals.session = null;
    return resolve(event);
  }

  // 3) TTL 슬라이딩: fresh 플래그가 true면 쿠키 갱신
  if (session.fresh) {
    const rotated = auth.createSessionCookie(session.id);
    event.cookies.set(rotated.name, rotated.value, {
      path: rotated.attributes.path ?? "/",
      ...rotated.attributes
    });
  }

  event.locals.user    = user;
  event.locals.session = session;
  return resolve(event);
};

export const handle = sequence(sessionHandler);
