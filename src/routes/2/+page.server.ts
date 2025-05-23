import type { PageServerLoad } from "./$types";
import { redirect }             from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session) {
    throw redirect(302, "/login");
  }
  return { user: locals.user };
};
