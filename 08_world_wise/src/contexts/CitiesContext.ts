import { createContext, useContext } from "react";
import { iCity } from "../types";

export const CitiesContext = createContext<{
  cities: iCity[];
  isLoading: boolean;
  currentCity: iCity | null;
  error: string;
  getCity?(id: number): Promise<void>;
  createCity?(newCity: Exclude<iCity, "id">): Promise<void>;
  deleteCity?(id: number): Promise<void>;
}>({ cities: [], isLoading: false, currentCity: null, error: "" });

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
}
