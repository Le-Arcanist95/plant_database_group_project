import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { serverClient } from './api/axios.js';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = pwd === matchPwd;

        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await serverClient.post(REGISTER_URL, 
            JSON.stringify({ username: user, password: pwd }),
            { 
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true 
            });
            console.log(response.data);
            console.log(response.status);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true); setUser(''); setValidName(false); setUserFocus(false); setPwd(''); setValidPwd(false); setPwdFocus(false); setMatchPwd(''); setValidMatch(false); setMatchFocus(false);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 500) {
                setErrMsg("Server Error");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else if (err.response?.status === 400) {
                setErrMsg("Invalid Entry");
            } else {
                setErrMsg('Registration Failed');
            };
            errRef.current.focus();
        };
    };

    return (
        <div>

        </div>
    );
};

export default Register;