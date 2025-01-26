import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BusFront } from "lucide-react";

export default function TransitScore({
  transit,
  className,
}: {
  transit: {
    description: string;
    summary: string;
    score: number;
  };
  className?: string;
}) {
  const description = transit?.description ?? "Information not available";
  const score = transit?.score ?? 0;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>Transit score.</CardTitle>
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
      <BusFront className="absolute -bottom-4 -right-4 size-64 opacity-15" />
    </Card>
  );
}
