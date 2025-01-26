import {
  Building,
  Building2,
  Hotel,
  House,
  Store,
  Warehouse,
} from "lucide-react";

export default function BuildingIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "residential":
      return <House />;
    case "apartment":
      return <Hotel />;
    case "office":
      return <Building2 />;
    case "shop":
      return <Store />;
    case "commercial":
      return <Warehouse />;
    default:
      return <Building />;
  }
}
