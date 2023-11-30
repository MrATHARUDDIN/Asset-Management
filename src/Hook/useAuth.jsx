import { useContext } from "react";
import { AuthContext } from "../Components/firebase config/Private";


const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;