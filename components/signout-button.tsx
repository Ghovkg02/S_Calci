"use client";

import { Button } from "./ui/button";
import { logout } from "@/app/auth/actions";

export default function SignOutButton() {
  return (
    <Button
      onClick={() => {
        logout();
      }}
      size="sm"
      variant="link"
      className="opacity-40"
    >
      Log out
    </Button>
  );
}
