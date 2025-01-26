import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Bike } from "lucide-react";

export default function BikeScore({
  className,
  bike,
}: {
  className?: string;
  bike: { score: number; description: string };
}) {
  const score = bike?.score ?? 0;
  const description = bike?.description ?? "Information not available";
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <Bike className="absolute -bottom-6 left-0 size-36 translate-x-1/4 opacity-15" />
      <CardHeader>
        <CardTitle>Bike score.</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-7xl">
          <span className="font-semibold">{score}</span>
          <span className="text-base text-primary/30">/100</span>
        </h2>
      </CardContent>
      <CardFooter>
        <CardDescription>{description}</CardDescription>
      </CardFooter>
    </Card>
  );
}
