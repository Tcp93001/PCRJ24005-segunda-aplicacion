import { useContext } from "react"
import { useLocation, Navigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

function RequireAuth({ children }) {
  const {isLoggedIn} = useContext(AuthContext)
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
