"use client";

import { createContext, ReactNode, useState } from "react";

export type BuildingContextType = {
  lon: number;
  setLon: (lon: number) => void;

  lat: number;
  setLat: (lat: number) => void;

  width: number;
  setWidth: (width: number) => void;

  length: number;
  setLength: (length: number) => void;

  height: number;
  setHeight: (height: number) => void;
};

const initialState: BuildingContextType = {
  lon: -79.378131,
  lat: 43.657004,
  width: 0,
  length: 0,
  height: 0,
  setLon: (lon: number) => {},
  setLat: (lat: number) => {},
  setWidth: (width: number) => {},
  setLength: (length: number) => {},
  setHeight: (height: number) => {},
};

export const BuildingContext = createContext<BuildingContextType>(initialState);

function BuildingProvider({ children }: { children: ReactNode }) {
  const [lon, setLon] = useState(initialState.lon);
  const [lat, setLat] = useState(initialState.lat);
  const [width, setWidth] = useState(initialState.width);
  const [length, setLength] = useState(initialState.length);
  const [height, setHeight] = useState(initialState.height);

  const value: BuildingContextType = {
    lon,
    setLon,
    lat,
    setLat,
    width,
    setWidth,
    length,
    setLength,
    height,
    setHeight,
  };

  return (
    <BuildingContext.Provider value={value}>
      {children}
    </BuildingContext.Provider>
  );
}

export default BuildingProvider;
