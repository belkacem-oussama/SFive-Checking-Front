import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import SearchInput from "../components/SearchInput.jsx"
import Select from "../components/Select.jsx"
import SmallCalendar from "../components/SmallCalendar.jsx"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import moment from "moment/moment.js"

export default function BookingForm({
  listCustomer,
  setListCustomer,
  listFields,
  setListFields,
}) {
  const bookingType = [
    { id: 1, name: "Classique" },
    { id: 2, name: "Anniversaire" },
  ]

  const fieldAvailability = [
    { start: "09:00", end: "09:30" },
    { start: "09:30", end: "10:00" },
    { start: "10:00", end: "10:30" },
    { start: "10:30", end: "11:00" },
    { start: "11:00", end: "11:30" },
    { start: "11:30", end: "12:00" },
    { start: "12:00", end: "12:30" },
    { start: "12:30", end: "13:00" },
    { start: "13:00", end: "13:30" },
    { start: "13:30", end: "14:00" },
    { start: "14:00", end: "14:30" },
    { start: "14:30", end: "15:00" },
    { start: "15:00", end: "15:30" },
    { start: "15:30", end: "16:00" },
    { start: "16:00", end: "16:30" },
    { start: "16:30", end: "17:00" },
    { start: "17:00", end: "17:30" },
    { start: "17:30", end: "18:00" },
    { start: "18:00", end: "18:30" },
    { start: "18:30", end: "19:00" },
    { start: "19:00", end: "19:30" },
    { start: "19:30", end: "20:00" },
    { start: "20:00", end: "20:30" },
    { start: "20:30", end: "21:00" },
    { start: "21:00", end: "21:30" },
    { start: "21:30", end: "22:00" },
    { start: "22:00", end: "22:30" },
    { start: "22:30", end: "23:00" },
    { start: "23:00", end: "23:30" },
    { start: "23:30", end: "00:00" },
    { start: "00:00", end: "00:30" },
    { start: "00:30", end: "01:00" },
    { start: "01:00", end: "01:30" },
    { start: "01:30", end: "02:00" },
    { start: "02:00", end: "02:30" },
    { start: "02:30", end: "03:00" },
  ]

  // Obtention de la date du jour avec le même format que formattedDate
  const options = { weekday: "long", day: "2-digit", month: "long" }
  const currentDate = new Date().toLocaleDateString("fr-FR", options)

  const handleDatePickerChange = (date) => {
    let backDate = moment(date).format("YYYY-MM-DD")
    const formattedDate = date.toLocaleDateString("fr-FR", options)
    setSelectedDate(formattedDate)
    setApiDate(backDate)
  }

  //States for booking
  const [selectedType, setSelectedType] = useState(1)
  const [selectedField, setSelectedField] = useState(9)
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [apiDate, setApiDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  )
  const [selectedUser, setSelectedUser] = useState(null)
  const [textValue, setTextValue] = useState("")
  const [selectedHours, setSelectedHours] = useState([])
  const [availableSLot, setAvailableSlot] = useState(true)
  const [bookingDayArray, setBookingDayArray] = useState([])

  let bookingData = [
    selectedType,
    selectedField,
    selectedDate,
    selectedHours,
    selectedUser,
    textValue,
  ]

  const handleReset = () => {
    setSelectedType(1)
    setSelectedField(9)
    setSelectedDate(currentDate)
    setSelectedUser(0)
    setTextValue("")
    setSelectedHours([])
  }

  const handleSendData = () => {
    console.log(bookingData)
    handleReset()
  }

  useEffect(() => {
    const handleFieldHours = async () => {
      try {
        const token = Cookies.get("token")
        if (token) {
          const decodedToken = jwtDecode(token)
          if (decodedToken.exp < Date.now() / 1000) {
            // Si le token est expiré, déconnecter l'utilisateur
            Cookies.remove("token")
            navigate("/login")
            return
          }
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Ajoutez l'en-tête Content-Type ici
        }

        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_URL
          }/checkings?checking_start=${apiDate}&field=${selectedField}&checking_status=1`,
          {
            method: "GET",
            headers: headers, // Utilisez le même objet headers ici
          }
        )

        if (response.ok) {
          const jsonData = await response.json()

          // Convertir les chaînes de date en objets moment
          let bookingDayArray = []

          jsonData.map((item, index) => {
            const checking_start = moment(jsonData[index].checking_start)
            const checking_end = moment(jsonData[index].checking_end)

            // Soustraire 2 heures de checking_start et checking_end
            bookingDayArray.push({
              start: checking_start.subtract(2, "hours").format("HH:mm"),
              end: checking_end.subtract(2, "hours").format("HH:mm"),
            })
          })

          setBookingDayArray(bookingDayArray)
        } else {
          console.error("Erreur lors de la requête:", response.status)
        }
      } catch (error) {
        console.error("Erreur inattendue:", error)
      }
    }

    handleFieldHours()
  }, [selectedField, selectedDate, apiDate])

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
              data={listFields}
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
              key={index}
              className={`rounded-md p-2 border-2 text-center flex items-center justify-center focus-visible:outline-gray-900 ${
                bookingDayArray.some(
                  (bookingSlot) =>
                    bookingSlot.start === slot.start ||
                    bookingSlot.end === slot.end
                )
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : selectedHours.some(
                      ([start, end]) => start === slot.start && end === slot.end
                    )
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-900 hover:text-white"
              }`}
              onClick={() => {
                const isBooked = bookingDayArray.some(
                  (bookingSlot) => bookingSlot.start === slot.start
                )
                const isSlotEnd = bookingDayArray.some(
                  (bookingSlot) => bookingSlot.end === slot.end
                )

                if (
                  availableSLot &&
                  !isBooked &&
                  !isSlotEnd &&
                  !selectedHours.some(
                    ([start, end]) => start === slot.start && end === slot.end
                  )
                ) {
                  setSelectedHours((selectedHours) => [
                    ...selectedHours,
                    [slot.start, slot.end],
                  ])
                }
              }}
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
            listCustomer={listCustomer}
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
