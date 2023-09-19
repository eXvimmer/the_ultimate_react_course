import { useEffect, useReducer, useCallback, Reducer, ReactNode } from "react";
import { iCity } from "../types";
import { CitiesContext } from "./CitiesContext";

const BASE_URL = "http://localhost:9000";

interface State {
  cities: iCity[];
  isLoading: boolean;
  currentCity: null | iCity;
  error: string;
}

enum ActionType {
  LOADING,
  CITIES_LOADED,
  CITY_LOADED,
  CITY_CREATED,
  CITY_DELETED,
  REJECTED,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.CITIES_LOADED; payload: iCity[] }
  | { type: ActionType.CITY_LOADED; payload: iCity }
  | { type: ActionType.CITY_CREATED; payload: iCity }
  | { type: ActionType.CITY_DELETED; payload: number }
  | { type: ActionType.REJECTED; payload: string };

const initialState: State = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.LOADING:
      return { ...state, isLoading: true };

    case ActionType.CITIES_LOADED:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case ActionType.CITY_LOADED:
      return { ...state, isLoading: false, currentCity: action.payload };

    case ActionType.CITY_CREATED:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case ActionType.CITY_DELETED:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: null,
      };

    case ActionType.REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
};

export default function CitiesProvider({ children }: { children: ReactNode }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: ActionType.LOADING });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: ActionType.CITIES_LOADED, payload: data });
      } catch {
        dispatch({
          type: ActionType.REJECTED,
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: number) {
      if (Number(id) === currentCity?.id) return;

      dispatch({ type: ActionType.LOADING });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: ActionType.CITY_LOADED, payload: data });
      } catch {
        dispatch({
          type: ActionType.REJECTED,
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity?.id],
  );

  async function createCity(newCity: Exclude<iCity, "id">) {
    dispatch({ type: ActionType.LOADING });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: ActionType.CITY_CREATED, payload: data });
    } catch {
      dispatch({
        type: ActionType.REJECTED,
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: ActionType.LOADING });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: ActionType.CITY_DELETED, payload: id });
    } catch {
      dispatch({
        type: ActionType.REJECTED,
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
