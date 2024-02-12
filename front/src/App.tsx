import React from "react"
import "./assets/styles/index.css"
import Home from "./pages/Home.tsx"
import Header from "./layouts/Header.tsx"

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <Home />
    </React.Fragment>
  )
}
