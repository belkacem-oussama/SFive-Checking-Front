import React from "react"
import "./assets/styles/index.css"
import Home from "./pages/Home.tsx"
import Header from "./layouts/Header.tsx"
import { Route, Routes } from "react-router-dom"
import Booking from "./pages/Booking.tsx"
import ItemsDetails from "./pages/ItemsDetails.tsx"

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/:id" element={<ItemsDetails />} />
      </Routes>
    </React.Fragment>
  )
}
