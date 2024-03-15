import { Datepicker } from "flowbite-react"
import { useLocation } from "react-router-dom"

export default function SmallCalendar({
  selectedDate,
  handleDatePickerChange,
  selectedDateHome,
}) {
  const location = useLocation()

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
        value={location.pathname === "/" ? selectedDateHome : selectedDate}
      />
    </div>
  )
}
