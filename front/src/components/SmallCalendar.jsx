import { Datepicker } from "flowbite-react"
import { useState } from "react"

export default function SmallCalendar() {
  const [selectedDate, setSelectedDate] = useState("")

  const handleDatePickerChange = (date) => {
    const options = { weekday: "long", day: "2-digit", month: "long" }
    const formattedDate = date.toLocaleDateString("fr-FR", options)
    setSelectedDate(formattedDate)
    console.log(formattedDate)
  }

  return (
    <div className="p-2">
      <Datepicker
        weekStart={1}
        labelTodayButton="Aujourd'hui"
        showClearButton={false}
        language="fr-FR"
        onSelectedDateChanged={handleDatePickerChange}
        value={selectedDate}
      />
    </div>
  )
}
