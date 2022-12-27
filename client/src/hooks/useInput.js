import useLocalStorage from './useLocalStorage';

const useInput = (key, initialValue) => {
    // State to store value
    const [value, setValue] = useLocalStorage(key, initialValue);

    // Return a wrapped version of useState's setter function that resets the value
    const reset = () => setValue(initialValue);

    // Return value and wrapped setter function
    const attributes = {
        value,
        onChange: (e) => setValue(e.target.value)
    };
    
    // Return value, reset function, and attributes
    return [value, reset, attributes];
}

export default useInput;