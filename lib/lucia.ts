import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/db";
import { sessionTable, userTable } from "@/db/schema";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { getUserById } from "@/db/queries";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
  }
}

export async function getUser() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return null;

  const { session, user } = await lucia.validateSession(sessionId);

  try {
    if (session && session.fresh) {
      const newSessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(
        newSessionCookie.name,
        newSessionCookie.value,
        newSessionCookie.attributes,
      );
    }
    if (!session) {
      const newSessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(
        newSessionCookie.name,
        newSessionCookie.value,
        newSessionCookie.attributes,
      );
    }
  } catch (error) {
    throw new Error("Error has occured");
  }

  if (!user?.id) return;
  return await getUserById(user.id);
}
