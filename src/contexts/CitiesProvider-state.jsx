import React, { createContext, useContext, useEffect, useState } from 'react';

const CitiesContext = createContext();


const CitiesProvider = ({ children }) => {

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {

    async function fetchCities() {
      setLoading(() => true);
      try {
        const res = await fetch('../../data/cities.json');

        const citiesData = await res.json();
        setCities(() => citiesData.cities);
        setLoading(() => false);

      } catch (e) {
        setLoading(() => false)
      }

    }

    fetchCities();

  }, [])


  async function getCity(id) {

    setLoading(() => true);
    try {

      const res = await fetch('../../data/cities.json');

      const citiesData = await res.json();
      // console.log(citiesData.cities);

      const country = citiesData.cities.filter(city=> city.id == id);

      setCurrentCity(()=> country[0]);
      setLoading(()=> false);

    } catch (e) {
      setLoading(() => false)
    }

  }

  async function createCity(newCity) {

    setLoading(() => true);
    try {

      const res = await fetch(' http://localhost:9000/cities',{
        method: 'POST',
        body: JSON.stringify(newCity),
        headers:{
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      
      setLoading(()=> false)
      setCities(curVal=> [...curVal, data]);


    } catch (e) {
      setLoading(() => false)
    }

  }

  async function deleteCity(id) {

    setLoading(() => true);
    try {

      const res = await fetch(`http://localhost:9000/cities/${id}`,{
        method: 'DELETE'
      });

      setLoading(()=> false)
      setCities(curVal=> curVal.filter(city=> city.id !== id));


    } catch (e) {
      setLoading(() => false)
    }

  }


  return (
    <CitiesContext.Provider value={
      {
        cities,
        loading, 
        currentCity,
        getCity,
        createCity,
        deleteCity
      }
    }>
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('PostContext was used outside of PostProvider!');

  return context;

}

export  { CitiesProvider, useCities };