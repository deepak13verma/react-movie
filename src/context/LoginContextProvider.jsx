import React, { createContext, useState } from 'react'
export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(12345);
    return (
        <LoginContext.Provider value={userDetails}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider
