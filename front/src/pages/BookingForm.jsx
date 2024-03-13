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
    { available: 0, start: "9h", end: "9h30" },
    { available: 0, start: "9h30", end: "10h" },
    { available: 1, start: "10h", end: "10h30" },
    { available: 1, start: "10h30", end: "11h" },
    { available: 1, start: "11h", end: "11h30" },
    { available: 1, start: "11h30", end: "12h" },
    { available: 1, start: "12h", end: "12h30" },
    { available: 1, start: "12h30", end: "13h" },
    { available: 1, start: "13h", end: "13h30" },
    { available: 1, start: "13h30", end: "14h" },
    { available: 0, start: "14h", end: "14h30" },
    { available: 0, start: "14h30", end: "15h" },
    { available: 0, start: "15h", end: "15h30" },
    { available: 1, start: "15h30", end: "16h" },
    { available: 1, start: "16h", end: "16h30" },
    { available: 1, start: "16h30", end: "17h" },
    { available: 1, start: "17h", end: "17h30" },
    { available: 1, start: "17h30", end: "18h" },
    { available: 1, start: "18h", end: "18h30" },
    { available: 0, start: "18h30", end: "19h" },
    { available: 0, start: "19h", end: "19h30" },
    { available: 0, start: "19h30", end: "20h" },
    { available: 1, start: "20h", end: "20h30" },
    { available: 1, start: "20h30", end: "21h" },
    { available: 1, start: "21h", end: "21h30" },
    { available: 1, start: "21h30", end: "22h" },
    { available: 1, start: "22h", end: "22h30" },
    { available: 1, start: "22h30", end: "23h" },
    { available: 1, start: "23h", end: "23h30" },
    { available: 1, start: "23h30", end: "00h" },
    { available: 1, start: "00h", end: "00h30" },
    { available: 1, start: "00h30", end: "01h" },
    { available: 1, start: "01h", end: "01h30" },
    { available: 1, start: "01h30", end: "02h" },
    { available: 0, start: "02h00", end: "02h30" },
    { available: 0, start: "02h30", end: "03h00" },
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
                setSelectedHours((selectedHours) => [
                  ...selectedHours,
                  [slot.start, slot.end],
                ])
              }}
              key={index}
              className={`rounded-md p-2 border-2 text-center flex items-center justify-center focus-visible:outline-gray-900 ${
                slot.available === 0
                  ? "bg-gray-200 text-gray-400 "
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
