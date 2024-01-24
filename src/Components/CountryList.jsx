import React from 'react';
import styles from './CountryList.module.css';

import Spinner from './Spinner';
import CounttryItem from './CountryItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesProvider';



const CountryList = () => {

    const { cities, loading } = useCities();


    if (loading) return <Spinner />

    if (!cities.length) return <Message message='Add your first city by clicking on the Map!' />



    //   const setOfCountry = new Set(cities.map(city=> city.country));

    //   const countryArr = [...setOfCountry];

    const countries = cities.reduce(( arr, city)=>{
        if(!arr.map(el=> el.country).includes(city.country)){
            return [...arr, { country: city.country, emoji: city.emoji}]
        }else{
            return arr;
        }
    }, []);


    return (
        <ul className={styles.countryList}>

            {countries.map(country => <CounttryItem country={country} key={country.country} />)}

        </ul>
    )
}

export default CountryList;