import React, { useEffect, useState } from "react"
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"

import "./assets/styles/index.css"

import Home from "./pages/Home.jsx"
import Header from "./layouts/Header.jsx"
import Booking from "./pages/Booking.jsx"
import ItemsDetails from "./pages/ItemsDetails.jsx"
import Customers from "./pages/Customers.jsx"
import Profile from "./pages/Profile.jsx"
import BookingForm from "./pages/BookingForm.jsx"
import LoginPage from "./pages/Login.jsx"
import CustomerForm from "./components/CustomerForm.jsx"
import Price from "./pages/Price.jsx"

import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import UpdateChecking from "./pages/UpdateChecking.jsx"

export default function App() {
  //States
  const [showAlert, setShowAlert] = useState(false)
  const [listCustomer, setListCustomer] = useState([])
  const [listFields, setListFields] = useState([])
  const [prices, setPrices] = useState({
    field_price_1: "",
    field_price_2: "",
    field_price_3: "",
    field_price_4: "",
  })
  const [page, setPage] = useState(1)
  const [clickField, setClickField] = useState("")
  const [clickHours, setClickHours] = useState("")
  const [clickDate, setClickDate] = useState("")
  const [totalPage, setTotalPage] = useState(0)

  let currentUrl = useLocation().pathname
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token")
        if (token) {
          const decodedToken = jwtDecode(token)
          if (decodedToken.exp < Date.now() / 1000) {
            // Si le token est expiré, déconnecter l'utilisateur
            Cookies.remove("token")
            navigate("/login")
            return
          }

          const headers = {
            Authorization: `${token}`,
          }

          let response
          let data

          switch (currentUrl) {
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

            case "/":
              response = await fetch(
                `${import.meta.env.VITE_APP_API_URL}/fields`,
                { headers }
              )

              if (response.ok) {
                const fields = await response.json()

                if (fields && fields.length > 0) {
                  const field = fields[0]

                  setPrices({
                    field_price_1: field.field_price_1,
                    field_price_2: field.field_price_2,
                    field_price_3: field.field_price_3,
                    field_price_4: field.field_price_4,
                  })
                }
              }

            default:
              break
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
      }
    }

    fetchData()
  }, [currentUrl])

  useEffect(() => {
    if (currentUrl === "/") {
      window.scrollTo(0, 0)
    }
  }, [currentUrl])

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              clickHours={clickHours}
              setClickHours={setClickHours}
              clickField={clickField}
              setClickField={setClickField}
              clickDate={clickDate}
              setClickDate={setClickDate}
            />
          }
        />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/:id" element={<UpdateChecking />} />
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
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          }
        />
        <Route
          path="/customers/add"
          element={
            <CustomerForm showAlert={showAlert} setShowAlert={setShowAlert} />
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
          path="/price"
          element={<Price prices={prices} setPrices={setPrices} />}
        />
        <Route
          path="/book"
          element={
            <BookingForm
              listCustomer={listCustomer}
              setListCustomer={setListCustomer}
              listFields={listFields}
              setListFields={setListFields}
              prices={prices}
              setPrices={setPrices}
              clickHours={clickHours}
              setClickHours={setClickHours}
              clickField={clickField}
              setClickField={setClickField}
              clickDate={clickDate}
              setClickDate={setClickDate}
            />
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Fragment>
  )
}
