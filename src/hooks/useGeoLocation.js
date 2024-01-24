import { useState } from "react";

export function useGeoLocation(defualtPosition = null) {
    const [isLoading, setIsLaoding] = useState('');
    const [position, setPosition] = useState(defualtPosition);
    const [error, setError] = useState(null);

    function getPosition() {

        setError(() => '');

        if (!navigator.geolocation)
            return setError(() => 'Your broweser does not support geolocation!');

        setIsLaoding(() => true);
        navigator.geolocation.getCurrentPosition(
            pos => {
                setPosition(() => {
                    return {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                });
                setIsLaoding(false);
            },
            error => {
                setError(error.message);
                setIsLaoding(false);
            }
        )
    }

    return {isLoading, error, position, getPosition};

}