/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();
function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const BASE_URL = `http://localhost:8000`;
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      try {
        await delay(500);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch (error) {
        alert(`Something went wrong getting data, ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, [BASE_URL]);

  const getCity = async (id) => {
    setIsLoading(true);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await delay(500);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert(`Something went wrong getting data, ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CityContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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
