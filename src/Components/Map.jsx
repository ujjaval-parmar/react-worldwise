import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useCities } from '../contexts/CitiesProvider';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { useUrlPosition } from '../hooks/useUrlPostition';

import Button from './Button';

const Map = () => {



  const { cities } = useCities();


  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { isLoading, error, position: geolocationPosition, getPosition } = useGeoLocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {

    if (mapLat && mapLng) setMapPosition(() => [mapLat, mapLng]);

  }, [mapLat, mapLng]);

  useEffect(() => {

    if (geolocationPosition) setMapPosition(() => [geolocationPosition.lat, geolocationPosition.lng]);


  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer}>

      {!geolocationPosition && <Button
        type='position'
        onClick={getPosition}
      >
        {isLoading ? 'Loading....' : 'Use your Position'}
      </Button>
      }

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map(city => {

          return (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          )
        })}

        <ChangeCenter position={mapPosition} />

        <DetectClick />

      </MapContainer>



    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;

}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      // console.log(e.latlng.lat);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}




export default Map