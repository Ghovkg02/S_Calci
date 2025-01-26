"use client";

import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { insertBuildingFormSchema } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { BuildingContext } from "@/context/buildingContext";
import { createBuilding, getCurrentUser } from "../actions";
import { useRouter } from "next/navigation";
import BuildingIcon from "@/components/building-icon";
import { BuildingType } from "@/lib/types";

export default function BuildingForm() {
  const { push } = useRouter();
  const { lon, lat } = useContext(BuildingContext);

  const form = useForm<z.infer<typeof insertBuildingFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(insertBuildingFormSchema),
    defaultValues: {
      name: "",
      type: "residential",
      lon: lon,
      lat: lat,
      occupancy: 0,
      height: 0,
      length: 0,
      width: 0,
    },
  });

  useEffect(() => {
    form.setValue("lon", lon);
    form.setValue("lat", lat);
  }, [lon, lat]);

  function onSubmit(values: z.infer<typeof insertBuildingFormSchema>) {
    getCurrentUser().then((result) => {
      if (!result) return push("/auth");
      createBuilding({ ...values, userId: result.id }).then((result) => {
        push(`/building/${result.id}`);
      });
      form.reset();
    });
  }

  return (
    <>
      <h1 className="mb-3.5 bg-gradient-to-b from-primary to-primary/40 bg-clip-text text-2xl font-bold text-transparent lg:mb-7 lg:text-4xl">
        Create your building.
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3.5 xl:grid-cols-12">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="xl:col-span-7">
                  <FormLabel>Building name</FormLabel>
                  <FormControl>
                    <Input placeholder="DCC..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="xl:col-span-5">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormLabel>Building type</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a building" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {buildings.map((building) => (
                        <SelectItem value={building.value} key={building.value}>
                          <div className="flex items-center gap-2.5">
                            <div className="hidden lg:inline-block">
                              <BuildingIcon icon={building.value} />
                            </div>
                            <p className="truncate">{building.label}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name="lon"
              control={form.control}
              render={({ field }) => (
                <FormItem className="xl:col-span-3">
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="lat"
              control={form.control}
              render={({ field }) => (
                <FormItem className="xl:col-span-3">
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="occupancy"
              control={form.control}
              render={({ field }) => (
                <FormItem className="xl:col-span-6">
                  <FormLabel>Occupancy</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mt-7 xl:col-span-12">
              <h2 className="text-2xl font-semibold">
                Dimensions{" "}
                <span className="text-sm text-primary/60">&#40;ft.&#41;</span>
              </h2>
            </div>

            <FormField
              name="height"
              control={form.control}
              render={({ field }) => (
                <FormItem className="xl:col-span-4">
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="length"
              control={form.control}
              render={({ field }) => (
                <FormItem className="xl:col-span-4">
                  <FormLabel>Length</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="width"
              control={form.control}
              render={({ field }) => (
                <FormItem className="xl:col-span-4">
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-3.5">
            <Button type="submit" className="w-full">
              Create building
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

const buildings: { label: string; value: BuildingType }[] = [
  { value: "residential", label: "Residential" },
  { value: "apartment", label: "Apartment" },
  { value: "office", label: "Office" },
  { value: "shop", label: "Shop" },
  { value: "commercial", label: "Commercial" },
];
