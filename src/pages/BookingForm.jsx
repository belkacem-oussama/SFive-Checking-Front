import SearchInput from "../components/SearchInput.jsx"
import Select from "../components/Select.jsx"
import SmallCalendar from "../components/SmallCalendar.jsx"
import customers from "../assets/json/customers.json"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function BookingForm() {
  const bookingType = [
    { id: 1, name: "Classique" },
    { id: 2, name: "Anniversaire" },
  ]

  const fieldLocation = [
    { id: 1, name: "Terrain 1" },
    { id: 2, name: "Terrain 2" },
  ]

  const fieldAvailability = [
    { available: 0, start: "09:00", end: "09:30" },
    { available: 0, start: "09:30", end: "10:00" },
    { available: 1, start: "10:00", end: "10:30" },
    { available: 1, start: "10:30", end: "11:00" },
    { available: 1, start: "11:00", end: "11:30" },
    { available: 1, start: "11:30", end: "12:00" },
    { available: 1, start: "12:00", end: "12:30" },
    { available: 1, start: "12:30", end: "13:00" },
    { available: 1, start: "13:00", end: "13:30" },
    { available: 1, start: "13:30", end: "14:00" },
    { available: 0, start: "14:00", end: "14:30" },
    { available: 0, start: "14:30", end: "15:00" },
    { available: 0, start: "15:00", end: "15:30" },
    { available: 1, start: "15:30", end: "16:00" },
    { available: 1, start: "16:00", end: "16:30" },
    { available: 1, start: "16:30", end: "17:00" },
    { available: 1, start: "17:00", end: "17:30" },
    { available: 1, start: "17:30", end: "18:00" },
    { available: 1, start: "18:00", end: "18:30" },
    { available: 0, start: "18:30", end: "19:00" },
    { available: 0, start: "19:00", end: "19:30" },
    { available: 0, start: "19:30", end: "20:00" },
    { available: 1, start: "20:00", end: "20:30" },
    { available: 1, start: "20:30", end: "21:00" },
    { available: 1, start: "21:00", end: "21:30" },
    { available: 1, start: "21:30", end: "22:00" },
    { available: 1, start: "22:00", end: "22:30" },
    { available: 1, start: "22:30", end: "23:00" },
    { available: 1, start: "23:00", end: "23:30" },
    { available: 1, start: "23:30", end: "00:00" },
    { available: 1, start: "00:00", end: "00:30" },
    { available: 1, start: "00:30", end: "01:00" },
    { available: 1, start: "01:00", end: "01:30" },
    { available: 1, start: "01:30", end: "02:00" },
    { available: 0, start: "02:00", end: "02:30" },
    { available: 0, start: "02:30", end: "03:00" },
  ]

  // Obtention de la date du jour avec le même format que formattedDate
  const options = { weekday: "long", day: "2-digit", month: "long" }
  const currentDate = new Date().toLocaleDateString("fr-FR", options)

  const handleDatePickerChange = (date) => {
    const formattedDate = date.toLocaleDateString("fr-FR", options)
    setSelectedDate(formattedDate)
  }

  //States for booking
  const [selectedType, setSelectedType] = useState("Classique")
  const [selectedField, setSelectedField] = useState("Terrain 1")
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [selectedUser, setSelectedUser] = useState(0)
  const [textValue, setTextValue] = useState("")
  const [selectedHours, setSelectedHours] = useState([])
  console.log(selectedHours)
  let bookingData = [
    selectedType,
    selectedField,
    selectedDate,
    selectedHours,
    selectedUser,
    textValue,
  ]

  const handleReset = () => {
    setSelectedType("Classique")
    setSelectedField("Terrain 1")
    setSelectedDate(currentDate)
    setSelectedUser(0)
    setTextValue("")
    setSelectedHours([])
  }

  const handleSendData = () => {
    console.log(bookingData)
    handleReset()
  }

  return (
    <div className="space-y-12">
      <div className="mx-2 mt-2 lg:mx-0 border-b border-gray-900/10q pb-3">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:ml-2">
          Booking
        </h2>
        <p className="mt-2 md:ml-4 text-lg leading-8 text-gray-600">
          Nouvelle réservation.
        </p>
      </div>
      <div className="mt-6">
        <h1 className="ml-2 font-semibold">Type de réservation</h1>
        <span className="p-2">
          <Select
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            data={bookingType}
            isField={false}
          />
        </span>
        <span className="p-2">
          <h1 className="ml-2 font-semibold">Emplacement</h1>
          <span className="p-2">
            <Select
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              data={fieldLocation}
              isField={true}
            />
          </span>
        </span>
        <span className="">
          <h1 className="ml-2 font-semibold">Jour</h1>
          <span className="p-2">
            <SmallCalendar
              selectedDate={selectedDate}
              setSelectedDate={selectedDate}
              handleDatePickerChange={handleDatePickerChange}
            />
          </span>
        </span>
        <h1 className="ml-2 font-semibold">Disponibilité</h1>
        <span className="p-2 grid grid-cols-2 md:grid-cols-4 gap-4 ">
          {fieldAvailability.map((slot, index) => (
            <span
              onClick={() => {
                slot.available === 1
                  ? setSelectedHours((selectedHours) => [
                      ...selectedHours,
                      [slot.start, slot.end],
                    ])
                  : null
              }}
              key={index}
              className={`rounded-md p-2 border-2 text-center flex items-center justify-center focus-visible:outline-gray-900 ${
                slot.available === 0
                  ? "bg-gray-200 text-gray-400 "
                  : selectedHours.some(
                      ([start, end]) => start === slot.start && end === slot.end
                    )
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-900 hover:text-white"
              }`}
            >
              {slot.start}
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4 mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </span>
              {slot.end}
            </span>
          ))}
        </span>

        <h1 className="ml-2 font-semibold mt-4">Organisateur</h1>
        <span className="p-2">
          <SearchInput
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            data={customers}
          />
        </span>
        <div className="mt-4">
          <h1 className="ml-2 font-semibold">Notes</h1>
          <span className="flex">
            <textarea
              className="mt-6 p-2 block w-full rounded-md border border-gray-300 sm:text-sm focus:outline-none mx-2 resize-none"
              placeholder="Ajoutez des informations supplémentaires..."
              rows={3}
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value)
              }}
            />
          </span>
        </div>

        <div className="mt-6 mb-4 flex items-center justify-end gap-x-6 mr-2 sm:col-span-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Annuler
          </button>
          <Link to="/">
            <button
              type="submit"
              onClick={handleSendData}
              className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Valider
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}