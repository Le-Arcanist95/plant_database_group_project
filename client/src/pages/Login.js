import React, { useRef, useState, useEffect } from 'react';
import { serverClient } from '../api/axios.js';
import useAuth from '../hooks/useAuth.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// URL for login request -- outside of component so it doesn't get redefined on every render
const LOGIN_URL = '/auth';

// Login component
const Login = () => {
    // Context
    const { setAuth } = useAuth();

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // Refs
    const userRef = useRef();
    const errRef = useRef();
    
    // State
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // Set focus on user input when page loads
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // Clear error message when user or pwd changes
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to server
            const response = await serverClient.post(
                LOGIN_URL, 
                JSON.stringify({ username: user, password: pwd }),
                { 
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }    
            );
            // Get access token and roles from response
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            // Set auth context
            setAuth({ user, pwd, roles, accessToken });

            // Clear form
            setUser('');
            setPwd('');

            // Navigate back to redirect location or home
            navigate(from, {replace: true});

        } catch (err) {
            // Handle error response
            if (!err?.response) {
                setErrMsg('Server is not responding');
            } else if (err.response?.status === 400) {
                setErrMsg('Please enter all fields');
            } else if (err.response?.status === 401) {
                setErrMsg('Invalid credentials');
            } else if (err.response?.status === 500) {
                setErrMsg('Server error');
            } else {
                setErrMsg('Unknown error');
            }
            // Set focus on error message for screen reader
            errRef.current.focus();
        };
    };

    return (
        <section>
            {/* Error message display */}
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> 
                {errMsg} 
            </p>
            <h1> Sign In </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username"> Username: </label>
                <input 
                    type="text" 
                    id="username" 
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password"> Password: </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                
                <button> Sign In </button>
            </form>
            <p>
                Don't have an account? <br />
                <a href="/register">Register</a>
            </p>
        </section>
    );
}

export default Login;