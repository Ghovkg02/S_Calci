import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Footprints } from "lucide-react";

export default function WalkScore({
  walkscore,
  description,
  className,
}: {
  walkscore: number;
  description: string;
  className?: string;
}) {
  const score = walkscore ?? 0;
  const newDescription = description ?? "Information not available";
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>Walk score.</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-7xl">
          <span className="font-semibold">{score}</span>
          <span className="text-base text-primary/30">/100</span>
        </h2>
      </CardContent>
      <CardFooter>
        <CardDescription>{newDescription}</CardDescription>
      </CardFooter>
      <Footprints className="absolute -bottom-4 -right-4 size-64 opacity-15" />
    </Card>
  );
}
