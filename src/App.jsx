import React, { useEffect, useState } from "react"
import "./assets/styles/index.css"
import Home from "./pages/Home.jsx"
import Header from "./layouts/Header.jsx"
import { Route, Routes } from "react-router-dom"
import Booking from "./pages/Booking.jsx"
import ItemsDetails from "./pages/ItemsDetails.jsx"
import Customers from "./pages/Customers.jsx"
import Profile from "./pages/Profile.jsx"
import BookingForm from "./pages/BookingForm.jsx"
import Fields from "./pages/Fields.jsx"

export default function App() {
  const [listCustomer, setListCustomer] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
        }
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/customers`,
          { headers }
        )

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données")
        }

        const data = await response.json()
        console.log(data)
        setListCustomer(data)
        setTotalPage(Math.ceil(data.length / 10))
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
      }
    }

    fetchData()
  }, [])
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
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
        <Route path="/book" element={<BookingForm />} />
        <Route path="/fields" element={<Fields />} />
      </Routes>
    </React.Fragment>
  )
}
