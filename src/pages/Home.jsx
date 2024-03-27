import React, { useState } from "react"

import FieldCalendar from "../components/FieldCalendar.jsx"
import SmallCalendar from "../components/SmallCalendar.jsx"

export default function Home() {
  //Date
  const options = { weekday: "long", day: "2-digit", month: "long" }
  const currentDate = new Date().toLocaleDateString("fr-FR", options)

  const handleDatePickerChange = (date) => {
    const formattedDate = date.toLocaleDateString("fr-FR", options)
    setSelectedDateHome(formattedDate)
  }

  const [selectedDateHome, setSelectedDateHome] = useState(currentDate)

  return (
    <div>
      <div className="text-center py-4 border-b mx-2 border-gray-900/10 pb-3 md:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:ml-2"></h2>
        <SmallCalendar
          selectedDateHome={selectedDateHome}
          handleDatePickerChange={handleDatePickerChange}
        />
      </div>
      <div>
        <FieldCalendar />
      </div>
    </div>
  )
}
