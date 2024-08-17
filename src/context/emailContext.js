import { useContext, useState, createContext } from 'react';

import { auth, onAuthStateChanged } from "@/config/firebase.config";


const CurrEmailContext = createContext();

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