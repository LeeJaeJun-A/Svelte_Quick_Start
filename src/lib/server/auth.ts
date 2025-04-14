import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prismaClient } from "./prisma";

const adapter = new PrismaAdapter(prismaClient.session, prismaClient.user);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: false
    }
  },
  getUserAttributes: (user) => ({
    email: user.email,
    role: user.role
  })
});

declare module "lucia" {
  interface Register {
    Auth: typeof auth;
    DatabaseUserAttributes: {
      email: string;
      role: "ADMIN" | "USER";
    };
  }
}
