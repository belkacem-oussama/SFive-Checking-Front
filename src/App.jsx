import React, { useEffect, useState } from "react"
import "./assets/styles/index.css"
import Home from "./pages/Home.jsx"
import Header from "./layouts/Header.jsx"
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"
import Booking from "./pages/Booking.jsx"
import ItemsDetails from "./pages/ItemsDetails.jsx"
import Customers from "./pages/Customers.jsx"
import Profile from "./pages/Profile.jsx"
import BookingForm from "./pages/BookingForm.jsx"
import Fields from "./pages/Fields.jsx"
import LoginPage from "./pages/Login.jsx"
import Cookies from "js-cookie"

export default function App() {
  const [inputLogin, setInputLogin] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [showLoader, setShowLoader] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const [listCustomer, setListCustomer] = useState([])
  const [listBooking, setListBooking] = useState([])
  const [listFields, setListFields] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  let currentUrl = useLocation().pathname
  const navigate = useNavigate()

  const handleAuth = async (e) => {
    e.preventDefault()
    setShowLoader(true)
    setShowMessage(false)

    let token

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputLogin,
            password: inputPassword,
          }),
        }
      )

      if (response.ok) {
        const jsonData = await response.json()
        token = jsonData.token
        Cookies.set("token", token, { expires: 7, secure: true })
        setShowLoader(false)
      } else {
        console.error("Erreur lors de la requête:", response.status)
        setShowLoader(false)
        setShowMessage(true)
      }
    } catch (error) {
      console.error("Erreur inattendue:", error)
      setShowLoader(false)
      setShowMessage(true)
    }
  }

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsLogged(true)
      navigate("/")
    } else {
      setIsLogged(false)
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${Cookies.get("token")}`,
        }

        let response
        let data

        switch (currentUrl) {
          case "/customers":
            response = await fetch(
              `${import.meta.env.VITE_APP_API_URL}/customers`,
              { headers }
            )

            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des données")
            }

            data = await response.json()
            setListCustomer(data)
            setTotalPage(Math.ceil(data.length / 10))
            break

          case "/booking":
            response = await fetch(
              `${import.meta.env.VITE_APP_API_URL}/checkings`,
              { headers }
            )
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des données")
            }

            data = await response.json()
            setListBooking(data)
            break

          case "/book":
            response = await fetch(
              `${import.meta.env.VITE_APP_API_URL}/customers`,
              { headers }
            )
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des données")
            }

            data = await response.json()
            setListCustomer(data)

            // Récupérer les champs
            response = await fetch(
              `${import.meta.env.VITE_APP_API_URL}/fields`,
              { headers }
            )

            if (!response.ok) {
              throw new Error(
                "Erreur lors de la récupération des données des champs"
              )
            }

            const fieldsData = await response.json()
            setListFields(fieldsData)
            break

          default:
            break
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
      }
    }

    fetchData()
  }, [currentUrl])

  return (
    <React.Fragment>
      {isLogged ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/booking"
              element={
                <Booking
                  listBooking={listBooking}
                  setListBooking={setListBooking}
                />
              }
            />
            <Route
              path="/customers"
              element={
                <Customers
                  listCustomer={listCustomer}
                  setListCustomer={setListCustomer}
                  page={page}
                  setPage={setPage}
                  totalPage={totalPage}
                  setTotalPage={setTotalPage}
                />
              }
            />
            <Route
              path="/customers/:id"
              element={
                <ItemsDetails
                  listCustomer={listCustomer}
                  setListCustomer={setListCustomer}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/book"
              element={
                <BookingForm
                  listCustomer={listCustomer}
                  setListCustomer={setListCustomer}
                  listFields={listFields}
                  setListFields={setListFields}
                />
              }
            />
            <Route path="/fields" element={<Fields />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <LoginPage
                inputLogin={inputLogin}
                inputPassword={inputPassword}
                setInputLogin={setInputLogin}
                setInputPassword={setInputPassword}
                handleAuth={handleAuth}
                showLoader={showLoader}
                setShowLoader={setShowLoader}
                showMessage={showMessage}
                setShowMessage={setShowMessage}
              />
            }
          />
        </Routes>
      )}
    </React.Fragment>
  )
}
