import React, { useRef, useState, useEffect } from 'react';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    return (
        <div>
            <h1>Login</h1>
        </div>
    );
}

export default Login;