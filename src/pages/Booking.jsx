import Button from "../components/Button.jsx"
import { useState } from "react"
import Popup from "../components/Popup.jsx"

export default function Booking({ listBooking, setListBooking }) {
  const [showPopUp, setShowPopUp] = useState(false)
  const [bookingId, setBookingId] = useState(null)

  const handleDropBooking = (id) => {
    setShowPopUp(true)
    setBookingId(id)
  }

  const handleConfirmCancellation = () => {
    console.log("Réservation annulée :", bookingId)
    setShowPopUp(false)
  }

  const handleCancel = () => {
    setShowPopUp(false)
  }

  function formatDateFromString(dateString) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("fr-FR", options)
    return formattedDate.charAt(0) + formattedDate.slice(1)
  }

  function formatTimeFromString(dateString) {
    const date = new Date(dateString)
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }

  return (
    <>
      {showPopUp && (
        <Popup
          bookingId={bookingId}
          handleConfirmCancellation={handleConfirmCancellation}
          handleCancel={handleCancel}
        />
      )}
      <ul role="list" className="divide-y divide-gray-100">
        {listBooking.map((checking) => (
          <li
            key={checking.id}
            className="flex flex-col sm:flex-row justify-between gap-x-6 px-4 py-5 border-solid border-b-2 hover:bg-gray-100"
          >
            <div className="flex flex-col sm:flex-row gap-x-4 items-start sm:items-center w-full">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-800">
                  #{checking.id} - {checking.customer.customer_surname}{" "}
                  {checking.customer.customer_firstname}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <span className="font-bold">Tél : </span>
                  {checking.customer.customer_phone}
                </p>
                <br />
                {checking.checking_start && (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    <span className="font-bold">Date : </span>
                    {formatDateFromString(checking.checking_start)}
                  </p>
                )}
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <span className="font-bold">Créneau : </span>
                  {formatTimeFromString(checking.checking_start)} -{" "}
                  {formatTimeFromString(checking.checking_end)}
                </p>
                {checking.field && (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    <span className="font-bold">Terrain : </span>
                    {checking.field.id}
                  </p>
                )}
                {checking.checking_price && (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    <span className="font-bold">Prix : </span>
                    {checking.checking_price} €
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-evenly w-auto md:items-center md:p-2 mt-6 md:flex-col md:w-26 ">
              <button
                onClick={handleCancel}
                className="font-bold px-4 py-2 bg-green-500 text-white rounded-md mr-4 hover:bg-green-600 md:mr-0 "
              >
                Terminer
              </button>
              <button
                onClick={() => handleDropBooking(checking.id)}
                className="font-bold px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Annuler
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
