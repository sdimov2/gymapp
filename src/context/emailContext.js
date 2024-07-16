import {useContext, useState, createContext} from 'react';

const CurrEmailContext = createContext();

import { auth, onAuthStateChanged } from "@/config/firebase.config";


export function useCurrEmail() {
    return useContext(CurrEmailContext)
}

export function CurrEmailProvider({children}) {
    const [currEmail, setCurrEmail] = useState(null)

    onAuthStateChanged(auth, (user) => {
        setCurrEmail(user?.email)
    })

  return (
    <CurrEmailContext.Provider value={{currEmail}}>
      {children}
    </CurrEmailContext.Provider>
  );
}