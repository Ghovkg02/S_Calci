"use server";

import { getUserByUsername, insertUser } from "@/db/queries";
import { loginFormSchema, signupFormSchema } from "@/db/schema";
import { lucia } from "@/lib/lucia";
import { FormResponse } from "@/lib/types";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { z } from "zod";
import { redirect } from "next/navigation";

export async function login(
  values: z.infer<typeof loginFormSchema>,
): Promise<FormResponse> {
  const existingUser = await getUserByUsername(values.username);
  if (!existingUser) return { error: "No user found with this username" };

  const passwordMath = await new Argon2id().verify(
    existingUser.password,
    values.password,
  );

  if (!passwordMath) return { error: "Password or username does not match" };

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return { success: "Logged in successfully" };
}

export async function signup(
  values: z.infer<typeof signupFormSchema>,
): Promise<FormResponse> {
  try {
    const existingUser = await getUserByUsername(values.username);
    console.log(existingUser);
    if (existingUser)
      return { error: "User already exists with that username" };
    const hashedPassword = await new Argon2id().hash(values.password);

    const newUser = await insertUser({
      ...values,
      password: hashedPassword,
    });

    const session = await lucia.createSession(newUser[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: "Created user successfully" };
  } catch (error) {
    return { error: "Error inserting user in the database" };
  }
}

export async function logout() {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect('/auth')
}
