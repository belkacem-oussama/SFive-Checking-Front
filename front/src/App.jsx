import React from "react"
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
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<ItemsDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/fields" element={<Fields />} />
      </Routes>
    </React.Fragment>
  )
}
