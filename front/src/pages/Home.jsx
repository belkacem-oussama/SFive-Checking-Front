import React from "react"
import FieldCalendar from "../components/FieldCalendar.jsx"
import SmallCalendar from "../components/SmallCalendar.jsx"

export default function Home() {
  return (
    <div>
      <div className="text-center py-4 border-b mx-2 border-gray-900/10 pb-3 md:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:ml-2"></h2>
        <SmallCalendar />
      </div>
      <div>
        <FieldCalendar />
      </div>
    </div>
  )
}
