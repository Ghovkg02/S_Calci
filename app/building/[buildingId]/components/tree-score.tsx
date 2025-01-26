import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTreeRating } from "@/lib/api";
import { cn } from "@/lib/utils";
import { TreePine } from "lucide-react";

export default function TreeScore({
  length,
  width,
  className,
}: {
  length: number;
  width: number;
  className?: string;
}) {
  const amountOfTreesDestroyed = getTreeRating(length, width);
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>Amount of trees destroyed.</CardTitle>
        <CardDescription>
          This is the amount of trees that could have been planted in that area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-7xl font-semibold">{amountOfTreesDestroyed} trees</h2>
      </CardContent>
      <TreePine className="absolute -bottom-4 right-0 size-48 translate-x-1/2 opacity-15" />
      <TreePine className="absolute -bottom-4 right-20 size-48 opacity-15" />
    </Card>
  );
}
