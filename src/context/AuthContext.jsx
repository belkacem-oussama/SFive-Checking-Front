import React, { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [isLogged, setIsLogged] = useState(false)
  const [tokenCookie, setTokenCookie] = useState(Cookies.get("token") || "")

  useEffect(() => {
    const checkToken = () => {
      if (tokenCookie) {
        try {
          const decodedToken = jwtDecode(tokenCookie)
          if (decodedToken.exp < Date.now() / 1000) {
            setIsLogged(false)
            Cookies.remove("token")
            navigate("/login")
          } else {
            setIsLogged(true)
            navigate("/")
          }
        } catch (error) {
          console.error("Erreur lors du décodage du token :", error)
          setIsLogged(false)
          Cookies.remove("token")
          navigate("/login")
        }
      } else {
        setIsLogged(false)
        navigate("/login")
      }
    }

    checkToken()
  }, [tokenCookie])

  return (
    <AuthContext.Provider value={{ isLogged }}>{children}</AuthContext.Provider>
  )
}
