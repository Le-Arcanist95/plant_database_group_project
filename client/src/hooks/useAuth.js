import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Custom hook that returns the auth context
const useAuth = () => {
    return useContext(AuthContext);
}; 

export default useAuth;