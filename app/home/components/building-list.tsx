import BuildingIcon from "@/components/building-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectBuilding } from "@/db/schema";
import Link from "next/link";
import ViewButton from "./view-button";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteButton from "./delete-button";

export default function BuildingList({
  buildings,
}: {
  buildings: SelectBuilding[];
}) {
  return (
    <>
      <h2 className="mb-3.5 text-2xl font-semibold">My buildings</h2>
      <ScrollArea className="flex max-h-96 flex-col gap-6 pr-6">
        {buildings.map((building, index) => (
          <div
            className="group mb-2 flex justify-between"
            key={`${index},${building.lat}`}
          >
            <Link href={`/building/${building.id}`}>
              <div className="flex items-center gap-4">
                <BuildingIcon icon={building.type} />
                <p className="font-medium">
                  {building.name}
                  <span className="block text-xs opacity-40">
                    {building.lat}&#176;&#44; {building.lon}&#176;
                  </span>
                </p>
              </div>
            </Link>
            <ViewButton lat={building.lat} lon={building.lon} />
          </div>
        ))}
      </ScrollArea>
    </>
  );
}

{
  /* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical className="opacity-0 transition duration-300 group-hover:opacity-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-0 space-x-2">
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <ViewButton lat={building.lat} lon={building.lon} />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <DeleteButton id={building.id} />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu> */
}
