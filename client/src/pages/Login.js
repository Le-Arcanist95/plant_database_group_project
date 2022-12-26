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

    return (
        <section>
            {/* Error message display */}
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> 
                {errMsg} 
            </p>
        </section>
    );
}

export default Login;