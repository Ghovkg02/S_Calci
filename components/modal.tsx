"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleChange}>
      <DialogOverlay>
        <DialogContent className="max-w-screen-2xl">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
