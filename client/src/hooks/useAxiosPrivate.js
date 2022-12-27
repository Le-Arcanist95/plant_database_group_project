import { backendPrivateServer } from '../api/axios.js';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken.js';
import useAuth from './useAuth.js';

// Custom hook that returns the backendPrivateServer axios instance after adding the access token to the request header and refreshing the access token if it is expired
const useAxiosPrivate = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        // Add access token to request header
        const requestIntercept = backendPrivateServer.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                };
                return config;
                
            }, (error) => Promise.reject(error)
        );
        
        // Refresh access token if it is expired
        const responseIntercept = backendPrivateServer.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error?.config;
                if (error?.response?.status === 403 && !originalRequest?._retry) {
                    originalRequest._retry = true;
                    const newAccessToken = await refresh();
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return backendPrivateServer(originalRequest);
                }
                // If the error is not a 403 error, reject the error
                return Promise.reject(error);
            }
        );

        // Remove interceptors when component unmounts
        return () => {
            backendPrivateServer.interceptors.request.eject(requestIntercept);
            backendPrivateServer.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return backendPrivateServer;
};

export default useAxiosPrivate;