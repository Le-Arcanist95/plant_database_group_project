import React, { useState, useEffect } from "react";
const InputContext = React.createContext();

// This context file holds the userinput in one place prior to them hitting either search or update results
// I separated this part out both to store this information in one place and also to improve the UX (when user types a search and adds filters they should be able to hit either button and see results.)

export const InputProvider = ({ children }) => {
    const [inputValue, setInputValue] = useState({search: ""});
    const [userInput, setUserInput] = useState({
        // TO DO - state should get automatically updated with the userName 
    })
    
    function addNewComment() {
        // TO DO - this func should take from the user, add the timestamp and save it to our database
     // these values will need to be captured dynamically and could be saved like this. 
    // const userObject =  
    // {userName: username
    // timeStamp: currenttime
    // plantId: plantId 
    // userId:
    // commentId:} 
    // 
    }
    
    return (
        <InputContext.Provider value={{
            inputValue: inputValue,
            setInputValue: setInputValue
        }}>
            {children}
        </InputContext.Provider>    
    )
}

export default InputContext;