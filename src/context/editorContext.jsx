// MyContext.js
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState('Initial Shared Data');

    return (
        <MyContext.Provider value={{ sharedData, setSharedData }}>
            {children}
        </MyContext.Provider>
    );
};