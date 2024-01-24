import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FackAuth"
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {

    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();


    useEffect(() => {

        if (!isAuthenticated) navigate('/', { replace: true });

    }, [isAuthenticated, navigate]);

    

    return (
       isAuthenticated ?  children : null
    )
}

export default ProtectedRoute