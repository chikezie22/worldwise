/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import cityReducer from "../reducer/cityReducer";

const CityContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
};

function CityProvider({ children }) {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    cityReducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState([]);
  // const [currentCity, setCurrentCity] = useState({});
  const BASE_URL = `http://localhost:8000`;
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      try {
        await delay(500);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Failed to fetch cities" });
      }
    };
    fetchCities();
  }, [BASE_URL]);

  const getCity = async (id) => {
    dispatch({ type: "loading" });
    console.log(id, currentCity.id, currentCity);
    if (Number(id) === currentCity.id) return;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await delay(500);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Failed to get city" });
    }
  };

  const createCity = async (newCity) => {
    dispatch({ type: "loading" });
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await delay(500);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Failed to create city" });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "loading" });
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await delay(300);
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Object could not be deleted");

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "Failed to delete city" });
    }
  };

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const value = useContext(CityContext);
  if (value === undefined)
    throw new Error(`Context is used outside its Provider`);
  return value;
}

export { CityProvider, useCities };
