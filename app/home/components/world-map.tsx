"use client";

import Map, { Layer, LayerProps, MapRef, Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import BuildingIcon from "@/components/building-icon";
import { LngLat, MapMouseEvent } from "mapbox-gl";
import { useContext, useEffect, useRef } from "react";
import { BuildingContext } from "@/context/buildingContext";
import { MapPinHouse } from "lucide-react";

const layer: LayerProps = {
  id: "add-3d-buildings",
  source: "composite",
  "source-layer": "building",
  filter: ["==", "extrude", "true"],
  type: "fill-extrusion",
  minzoom: 15,
  paint: {
    "fill-extrusion-color": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      "#aaa",
      18,
      "#f00"
    ],
    "fill-extrusion-height": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      0,
      15.05,
      ["get", "height"]
    ],
    "fill-extrusion-base": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      0,
      15.05,
      ["get", "min_height"]
    ],
    "fill-extrusion-opacity": 0.6
  }
};

import { useState } from "react";

export default function WorldMap({
  markers,
}: {
  markers: { lat: number; lon: number; type: string; id: number }[];
}) {
  const mapRef = useRef<MapRef>(null);
  const { setLon, setLat, lon, lat } = useContext(BuildingContext);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    mapRef.current?.flyTo({ center: [lon, lat], duration: 2000 });
  }, [lat, lon]);

  const handleClick = (lngLat: LngLat) => {
    setLon(lngLat.lng);
    setLat(lngLat.lat);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchQuery
      )}.json?access_token=pk.eyJ1Ijoic3Jpbmk0MSIsImEiOiJjbHpkb3FmMmkwcGRzMnJvYTkzaDBleHltIn0.xKlqzZg4eski9OSSnUATww`
    );
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].center;
      mapRef.current?.flyTo({ center: [lon, lat], duration: 2000 });
    }
  };

  return (
    <>
      <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1 }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search location"
          style={{
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            color: "#000",
          }}
        />
        <button onClick={handleSearch} style={{ marginLeft: "0.5rem", padding: "0.5rem", borderRadius: "0.5rem", backgroundColor: "#007bff", color: "#fff" }}>
          Search
        </button>
      </div>
      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1Ijoic3Jpbmk0MSIsImEiOiJjbHpkb3FmMmkwcGRzMnJvYTkzaDBleHltIn0.xKlqzZg4eski9OSSnUATww"
        renderWorldCopies={true}
        initialViewState={{
          longitude: -79.378129,
          latitude: 43.656992,
          zoom: 18,
          pitch: 60,
          bearing: -17.6
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          borderRadius: "1rem",
        }}
        projection={{ name: "globe" }}
        attributionControl={false}
        onClick={(e: MapMouseEvent) => handleClick(e.lngLat)}
      >
        <Marker longitude={lon} latitude={lat}>
          <MapPinHouse className="size-10 text-violet-500" />
        </Marker>

        {markers.map((marker, index) => (
          <Link
            href={`/building/${marker.id}`}
            key={`${index},${marker.lat},${marker.lon}`}
          >
            <Marker longitude={marker.lon} latitude={marker.lat}>
              <BuildingIcon icon={marker.type} />
            </Marker>
          </Link>
        ))}
        <Layer {...layer} />
      </Map>
    </>
  );
}
