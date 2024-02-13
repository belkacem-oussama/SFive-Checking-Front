import React from "react"
import "./assets/styles/index.css"
import Home from "./pages/Home.tsx"
import Header from "./layouts/Header.tsx"
import { Route, Routes } from "react-router-dom"

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </React.Fragment>
  )
}
