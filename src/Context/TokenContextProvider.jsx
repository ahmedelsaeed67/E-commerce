import React, { useState, createContext } from 'react';


export let tokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState( localStorage.getItem("token"));


//   useEffect(()=>{
//     if(localStorage.getItem("token")){
//         setToken(localStorage.getItem("token"))
//     }
//   },[])

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}
