import { createContext, useState, useEffect } from "react"
import { BASE_URL } from "../variables/variables";

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

  const fetchUser = async (email) => {
    const url = `${BASE_URL}users.json?orderBy="email"&equalTo="${email}"`
    const response = await fetch(url)

    if (!response.ok) throw new Error("algo salio mal")
    return response.json()
  }

  const loginHandler = async(email, callback) => {
    try {
      const user = await fetchUser(email)
      const userId = Object.keys(user)[0]

      if (!userId) throw new Error('Correo invalido')

      localStorage.setItem('isLoggedIn', '1')
      localStorage.setItem('userId', userId)
      setIsLoggedIn(true);

      return callback(userId)

    } catch(error) {
      console.log('Error', error.message)
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userId')
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
