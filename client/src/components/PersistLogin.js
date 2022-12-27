import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();  
            } 
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }

        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [auth.accessToken, refresh]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading, auth.accessToken]);

    return (
        <>
            {!persist 
                ? <Outlet />
                : isLoading 
                    ? <Loader />
                    : <Outlet />}
        </>
    );
}

export default PersistLogin;