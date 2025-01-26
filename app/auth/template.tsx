import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUser();
  // if (user) return redirect("/home");
  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex min-h-dvh flex-col items-center justify-center gap-3.5">
        <Image width={48} height={48} alt="logo" src="/enfra.svg" />
        <h1 className="text-3xl font-semibold">Planify</h1>
        {children}
      </section>
      <section className="hidden p-4 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-lg brightness-75">
          <iframe
            src="https://api.mapbox.com/styles/v1/srini41/clzepfoyk000h01paav8l4v3k.html?title=false&access_token=pk.eyJ1Ijoic3Jpbmk0MSIsImEiOiJjbHpkb3FmMmkwcGRzMnJvYTkzaDBleHltIn0.xKlqzZg4eski9OSSnUATww&zoomwheel=false#17.67/43.658453/-79.378556/312.1/57"
            title="Monochrome"
            className="absolute left-0 top-0 block h-full w-full border-0"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
