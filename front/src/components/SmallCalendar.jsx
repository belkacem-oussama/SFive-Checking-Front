import { Datepicker } from "flowbite-react"

export default function SmallCalendar({
  selectedDate,
  handleDatePickerChange,
}) {
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
