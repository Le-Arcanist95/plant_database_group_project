import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initialValue) => {
    // State to store value
    const [value, setValue] = useLocalStorage(key, initialValue);

    // Return a wrapped version of useState's setter function that toggles the value
    const toggle = (value) => {
        setValue(prevValue => {
            return typeof value === 'boolean' ? value : !prevValue; // If value is boolean, return it, otherwise toggle it
        })
    };

    // Return value and wrapped setter function
    return [value, toggle];
};

export default useToggle;