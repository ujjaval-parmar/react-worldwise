import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './cityItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesProvider';



const CityList = () => {

  const { cities, loading } = useCities();
  
  if(loading) return <Spinner />

  if(!cities.length) return <Message message='Add your first city by clicking on the Map!'/>


  return (
    <ul className={styles.cityList}>

       { cities.map(city=><CityItem city={city} key={city.id}/>)}

    </ul>
  )
}

export default CityList