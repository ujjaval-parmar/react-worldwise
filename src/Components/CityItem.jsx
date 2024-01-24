import { Link } from 'react-router-dom';
import styles from './cityItem.module.css';
import { useCities } from '../contexts/CitiesProvider';


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));


const CityItem = ({ city }) => {

  

  const { currentCity, deleteCity } = useCities();

  
  const { cityName, date, emoji, id, position } = city;

  const URL = `${id}?lat=${position.lat}&lng=${position.lng}`;

  function handleDelete(e, id){
      
      e.preventDefault();
      deleteCity(id);
    
  }

  return (
    <li >
      <Link
        className={`${styles.cityItem}  ${currentCity.id === id ? styles['cityItem--active'] : ''}`}
        to={URL}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={(e)=> handleDelete(e, id)}>&times;</button>
      </Link>
    </li>
  )
}

export default CityItem