import { json, type RequestHandler } from "@sveltejs/kit";
import { prismaClient } from "$lib/server/prisma";

export const GET: RequestHandler = async ({ url }) => {
  const username = url.searchParams.get("username")?.trim();

  const existing = await prismaClient.user.findUnique({
    where: { username }
  });

  if (existing) {
    return json({ available: false });
  }

  return json({ available: true });
};
