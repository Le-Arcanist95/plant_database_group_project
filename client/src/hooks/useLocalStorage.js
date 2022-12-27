import { useState, useEffect } from 'react';

// Custom hook to get value from localStorage
const getLocalValue = (key, initialValue) => {
    // Server-Side Rendering (SSR) check
    if (typeof window === 'undefined') return initialValue;

    // If value is already in localStorage, return it
    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    // If value is function, call it and return the result
    if (initialValue instanceof Function) return initialValue();
};

// Custom hook to use localStorage
const useLocalStorage = (key, initialValue) => {
    // State to store value
    const [storedValue, setStoredValue] = useState(() => {
        return getLocalValue(key, initialValue); // Get value from localStorage
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);
    
    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    return [storedValue, setStoredValue]
};

export default useLocalStorage;