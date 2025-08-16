import { createContext, useState, useEffect } from "react"

const AuthContext = createContext({
  isLoggedIn: false,
  onLogOut: () => {},
  onLogin: () => {}
})

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedIn')

    if (isAuthenticated === '1') setIsLoggedIn(true)
  }, [])

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogOut: logoutHandler,
        onLogin: loginHandler
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext
