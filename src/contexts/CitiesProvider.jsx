import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: ''
}
function reducer(state, action) {

  switch (action.type) {

    case 'loading':
      return {
        ...state,
        loading: true
      };

    case 'cities/loaded':
      return {
        ...state,
        loading: false,
        cities: action.payload
      };

    case 'city/loaded':
      return {
        ...state,
        loading: false,
        currentCity: action.payload
      };


    case 'city/created':
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      };


    case 'city/deleted':
      return {
        ...state,
        loading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {}
      };

    case 'rejected':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      throw new Error('Unknown Action Type!');

  }


}

const CitiesProvider = ({ children }) => {

  const [{ cities, loading, currentCity }, dispatch] = useReducer(reducer, initialState);




  useEffect(() => {

    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch('../../data/cities.json');

        const citiesData = await res.json();

        dispatch({ type: 'cities/loaded', payload: citiesData.cities })

      } catch (e) {
        dispatch({ type: 'rejected', payload: e });
      }

    }

    fetchCities();

  }, [])


  const getCity = useCallback(async function getCity(id) {

    if(currentCity.id === Number(id)) return;

    dispatch({ type: 'loading' });
    try {

      const res = await fetch('../../data/cities.json');

      const citiesData = await res.json();
      // console.log(citiesData.cities);

      const city = citiesData.cities.filter(city => city.id ===  Number(id));

      dispatch({ type: 'city/loaded', payload: city[0] })

    } catch (e) {
      dispatch({ type: 'rejected', payload: e });
    }

  }, [currentCity.id]);

  async function createCity(newCity) {

    dispatch({ type: 'loading' });
    try {

      const res = await fetch(' http://localhost:9000/cities', {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();


      dispatch({ type: 'city/created', payload: data })


    } catch (e) {
      dispatch({ type: 'rejected', payload: e });
    }

  }

  async function deleteCity(id) {

    dispatch({ type: 'loading' });
    try {

      const res = await fetch(`http://localhost:9000/cities/${id}`, {
        method: 'DELETE'
      });

      dispatch({ type: 'city/deleted', payload: id })


    } catch (e) {
      dispatch({ type: 'rejected', payload: e });
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

export { CitiesProvider, useCities };