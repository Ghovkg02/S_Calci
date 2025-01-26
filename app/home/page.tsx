import WorldMap from "./components/world-map";
import BuildingForm from "./components/building-form";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import BuildingProvider from "@/context/buildingContext";
import { findAllBuildings, findAllBuildingsByUser } from "./actions";
import { Separator } from "@/components/ui/separator";
import BuildingList from "./components/building-list";
import SignOutButton from "@/components/signout-button";

export default async function HomePage() {
  const user = await getUser();
  if (!user) return redirect("/auth");

  const allMarkers = await findAllBuildings();
  const allBuildings = await findAllBuildingsByUser(user.id);

  const [markers, buildings] = await Promise.all([allMarkers, allBuildings]);

  return (
    <BuildingProvider>
      <div className="grid max-h-dvh min-h-dvh grid-cols-12 gap-2 overflow-y-scroll p-2">
        <section className="col-span-6 flex flex-col p-4 pt-8 md:col-span-3">
          <BuildingForm />
          <Separator className="my-6" />
          <BuildingList buildings={buildings} />
          <Separator className="mb-3 mt-auto" />
          <div className="flex items-center justify-between">
            <p>{user.username}</p>
            <SignOutButton />
          </div>
        </section>
        <section className="relative col-span-6 rounded-lg md:col-span-9">
          <WorldMap markers={markers} />
        </section>
      </div>
    </BuildingProvider>
  );
}
