import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, getMarketValue } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function PropertyScore({
  className,
  longitude,
  latitude,
  width,
  height,
  length,
}: Building & { className?: string }) {
  const marketValue = getMarketValue({
    longitude,
    latitude,
    width,
    height,
    length,
  });

  return (
    <Card className={cn("flex items-center", className)}>
      <CardHeader>
        <CardTitle className="text-4xl">Property value.</CardTitle>
        <CardDescription>Based on your location and size of property.</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <h2 className="text-7xl font-bold">${marketValue.toFixed(2)}</h2>
      </CardContent>
    </Card>
  );
}
