import { backendPrivateServer } from '../api/axios.js';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken.js';
import useAuth from './useAuth.js';

const useAxiosPrivate = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = backendPrivateServer.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                };
                return config;
            }, (error) => Promise.reject(error
        );
        
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
                return Promise.reject(error);
            }
        );

        return () => {
            backendPrivateServer.interceptors.request.eject(requestIntercept);
            backendPrivateServer.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return useAxiosPrivate;
}