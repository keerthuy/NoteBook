import React, { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

const authContext = createContext();

const ContextProvider = ({children}) => {
const [user,setUser] = useState("");
const login = (user) => {
    setUser(user)
}

    return(
        <div>
<authContext.Provider value={{user,login}}>
{children}
</authContext.Provider>
        </div>
    )
}
export const useAuth = () => useContext(authContext)
export default ContextProvider;