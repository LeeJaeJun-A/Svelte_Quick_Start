import { Lucia, TimeSpan } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prismaClient } from "./prisma";

const adapter = new PrismaAdapter(
  prismaClient.session,
  prismaClient.user
);

export const auth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(6, "h"),

  sessionCookie: {
    attributes: {
      secure: false // 배포 시 true
    }
  },

  getUserAttributes: (user) => ({
    username: user.username,
    role: user.role as "ADMIN" | "USER"
  })
});

