import { useContext } from 'react';
import AuthContext from '../context/AuthProvider.js';

// Custom hook that returns the auth context
const useAuth = () => {
    return useContext(AuthContext);
}; 

export default useAuth;