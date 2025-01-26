import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCarbonEmissions } from "@/lib/api";
import { BuildingType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Factory } from "lucide-react";

export default function CarbonScore({
  length,
  width,
  height,
  buildingType,
  className,
}: {
  length: number;
  width: number;
  height: number;
  buildingType: BuildingType | string;
  className?: string;
}) {
  const carbonEmissions = getCarbonEmissions(
    length,
    width,
    height,
    buildingType,
  );

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="mb-3.5 items-center">
        <Factory className="size-64 opacity-15" />
      </CardHeader>
      <CardContent className="text-center">
        <h2 className="bg-gradient-to-b from-primary to-primary/40 bg-clip-text text-8xl font-bold text-transparent">
          {carbonEmissions.toFixed(1)}kt
        </h2>
      </CardContent>
      <CardFooter className="justify-center">
        <CardTitle className="text-4xl text-primary/40">
          Carbon footprint.
        </CardTitle>
      </CardFooter>
    </Card>
  );
}
