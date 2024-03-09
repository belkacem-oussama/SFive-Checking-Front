import { Datepicker } from "flowbite-react"
import { useState } from "react"

export default function SmallCalendar() {
  // Obtention de la date du jour avec le même format que formattedDate
  const options = { weekday: "long", day: "2-digit", month: "long" }
  const currentDate = new Date().toLocaleDateString("fr-FR", options)

  const [selectedDate, setSelectedDate] = useState(currentDate)

  const handleDatePickerChange = (date) => {
    const formattedDate = date.toLocaleDateString("fr-FR", options)
    setSelectedDate(formattedDate)
    console.log(formattedDate)
  }

  return (
    <div className="p-2">
      <Datepicker
        defaultDate={new Date()}
        weekStart={1}
        labelTodayButton="Aujourd'hui"
        showClearButton={true}
        labelClearButton="Fermer"
        language="fr-FR"
        onSelectedDateChanged={handleDatePickerChange}
        value={selectedDate}
      />
    </div>
  )
}
