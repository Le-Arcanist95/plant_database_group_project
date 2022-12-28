import { useState, useEffect } from 'react';

// Custom hook to get localStorage value
const getLocalValue = (key, initialValue) => {
    // SSR Check
    if (typeof window === 'undefined') return initialValue;

    // If key exists in localStorage, return it, otherwise return initialValue
    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue !== null) return localValue;

    // If initialValue is a function, call it and return the result
    if (typeof initialValue === 'function') return initialValue();

    // Otherwise, return initialValue
    return initialValue;
}
// Custom hook to use localStorage
const useLocalStorage = (key, initialValue) => {
    // State to store value
    const [value, setValue] = useState(() => getLocalValue(key, initialValue));

    // Update localStorage when value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    return [value, setValue]
};

export default useLocalStorage;