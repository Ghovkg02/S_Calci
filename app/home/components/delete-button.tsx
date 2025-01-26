"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteBuilding } from "../actions";

//error with deleting
export default function DeleteButton({ id }: { id: number }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="p-2"
      type="submit"
      onClick={() => {
        deleteBuilding(id);
      }}
    >
      <Trash className="opacity-40" />
    </Button>
  );
}
