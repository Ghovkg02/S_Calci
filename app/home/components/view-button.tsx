"use client";

import { Button } from "@/components/ui/button";
import { BuildingContext } from "@/context/buildingContext";
import { useContext } from "react";
import { Eye } from "lucide-react";

export default function ViewButton({ lat, lon }: { lat: number; lon: number }) {
  const { setLat, setLon } = useContext(BuildingContext);

  const handleClick = () => {
    setLat(lat);
    setLon(lon);
  };
  
  return (
    <Button variant="ghost" size="icon" className="p-2" onClick={handleClick}>
      <Eye className="opacity-40" />
    </Button>
  );
}
