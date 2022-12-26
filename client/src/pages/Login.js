import React, { useRef, useState, useEffect } from 'react';

const Login = () => {
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

        
    }

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