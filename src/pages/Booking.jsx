import Button from "../components/Button.jsx"
import booking from "../assets/json/booking.json"
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
                {checking.created_at && (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    <span className="font-bold">Date : </span>
                    {checking.created_at}
                  </p>
                )}
                {checking.checking_started && checking.checking_end && (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    <span className="font-bold">Créneau : </span>
                    {checking.checking_start}h - {checking.checking_end}h
                  </p>
                )}
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
            <Button
              text={"Annuler"}
              onClick={() => handleDropBooking(checking.id)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
