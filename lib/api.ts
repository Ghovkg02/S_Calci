import { env } from "@/env";
import { BuildingType } from "./types";

type WalkScoreApiResponse = {
  status: number;
  walkscore: number;
  description: string;
  updated: string;
  logo_url: string;
  more_info_icon: string;
  more_info_link: string;
  ws_link: string;
  help_link: string;
  snapped_lat: number;
  snapped_lon: number;
  transit: {
    description: string;
    summary: string;
    score: number;
  };
  bike: {
    description: string;
    score: number;
  };
};

export async function getWalkScore(lat: number, lon: number) {
  const response = await fetch(
    `https://api.walkscore.com/score?format=json&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=${env.WALKSCORE_API_KEY}`,
  );
  const data: WalkScoreApiResponse = await response.json();
  const { transit, bike, walkscore, description } = data;
  return { transit, bike, walk: { walkscore, description } };
}

type CrimeRating = {
  rating: number;
  description: string;
};

export function getCrimeRating(): CrimeRating {
  //randomizes from 0-6
  const crimes = Math.floor(Math.random() * 7);
  let rating: number;
  let description: string;

  switch (true) {
    // error handling
    case crimes < 0:
      rating = 0;
      description = "No data available";
      break;
    // 0
    case crimes === 0:
      rating = 10;
      description = "Very safe";
      break;
    // 1-2
    case crimes >= 1 && crimes <= 2:
      rating = 20;
      description = "Safe";
      break;
    // 3-5
    case crimes >= 3 && crimes <= 5:
      rating = 40;
      description = "Risky";
      break;
    default:
      // 5+
      rating = 60;
      description = "Very risky";
  }

  return { rating, description };
}

export function getTreeRating(length: number, width: number) {
  const totalArea = length * width;
  const treesDestroyed = Math.floor(totalArea / 250);

  return treesDestroyed;
}

export function getCarbonEmissions(
  length: number,
  width: number,
  height: number,
  buildingType: BuildingType | string,
): number {
  const volume = length * width * height;
  let emissionFactor: number;

  switch (buildingType) {
    case "residential":
      emissionFactor = 0.00015;
      break;
    case "apartment":
      emissionFactor = 0.00008;
      break;
    case "office":
      emissionFactor = 0.0003;
      break;
    case "shop":
      emissionFactor = 0.0004;
      break;
    case "commercial":
      emissionFactor = 0.0006;
      break;
    default:
      emissionFactor = 0.00025;
  }
  const carbonEmissions = volume * emissionFactor;
  return carbonEmissions;
}

export type Building = {
  longitude: number;
  latitude: number;
  length: number;
  width: number;
  height: number;
};

export function getMarketValue(building: Building): number {
  // hypothetical coefficients for the model
  const baseValue = 100000;
  const lengthCoefficient = 1000;
  const widthCoefficient = 1000;
  const heightCoefficient = 500;
  const locationCoefficient = 2000;

  // calculating the market value
  const sizeValue =
    building.length * lengthCoefficient +
    building.width * widthCoefficient +
    building.height * heightCoefficient;
  const locationValue =
    locationCoefficient *
    (Math.abs(building.longitude) + Math.abs(building.latitude));
  const marketValue = baseValue + sizeValue + locationValue;

  return marketValue;
}

export async function getGrokData(lat: number, lon: number): Promise<any> {
  const apiKey = process.env.GROK_API_KEY;  // Store API key securely

  const response = await fetch(`https://api.grok.com/data?lat=${lat}&lon=${lon}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch data from Grok API: ${error}`);
  }

  return await response.json();
}
