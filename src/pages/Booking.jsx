import { useState } from "react"

import Cookies from "js-cookie"

import SearchBar from "../components/Search.jsx"
import Popup from "../components/Popup.jsx"
import Alert from "../components/Alert.jsx"

export default function Booking({ listBooking, setListBooking }) {
  const [showPopUp, setShowPopUp] = useState(false)
  const [bookingId, setBookingId] = useState(null)
  const [checkButton, setCheckButton] = useState(true)
  const [inputSearch, setInputSearch] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  const deleteMessage = `Réservation ${bookingId} annulée.`
  const updateMessage = `Réservation ${bookingId} terminée.`

  const handleDropBooking = (id) => {
    setShowPopUp(true)
    setBookingId(id)
    setCheckButton(false)
  }

  const handleCheckBooking = (id) => {
    setShowPopUp(true)
    setBookingId(id)
    setCheckButton(true)
  }

  const handleUpdateBooking = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/checkings/${bookingId}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: `${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checking_status: 0,
          }),
        }
      )

      if (response.ok) {
        setTimeout(() => {
          setShowAlert(true)
        }, 200)
        setTimeout(() => {
          setShowAlert(false)
        }, 2000)
        window.scrollTo(0, 0)
      }

      setListBooking((prevListBooking) =>
        prevListBooking.filter((booking) => booking.id !== bookingId)
      )
    } catch (error) {
      console.log(error)
    }
    setShowPopUp(false)
  }

  const handleConfirmCancellation = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/checkings/${bookingId}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            Authorization: `${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (response.ok) {
        setTimeout(() => {
          setShowAlert(true)
        }, 200)
        setTimeout(() => {
          setShowAlert(false)
        }, 2000)
        window.scrollTo(0, 0)
      }

      setListBooking((prevListBooking) =>
        prevListBooking.filter((booking) => booking.id !== bookingId)
      )
    } catch (error) {
      ;`Erreur lors de la requête : ${console.error(error)}`
    }

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
      timeZone: "UTC",
    }
    const date = new Date(dateString)

    const formattedDate = new Intl.DateTimeFormat("fr-FR", options).format(date)

    // Mise en majuscule de la première lettre du jour
    const capitalizedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

    return capitalizedDate
  }

  function formatTimeFromString(dateString) {
    const date = new Date(dateString)
    // Ajoute 2 heures au temps
    date.setHours(date.getHours() - 2)
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }

  const handleOnChange = (e) => {
    setInputSearch(e.target.value)
  }

  // Fonction pour filtrer les réservations en fonction de la recherche
  const filteredBookings = listBooking.filter((booking) =>
    `${booking.customer.customer_firstname} ${booking.customer.customer_surname}`
      .toLowerCase()
      .includes(inputSearch.toLowerCase())
  )

  return (
    <>
      {showAlert && (
        <Alert alertMessage={checkButton ? updateMessage : deleteMessage} />
      )}
      <SearchBar inputSearch={inputSearch} onChange={handleOnChange} />
      {showPopUp && (
        <Popup
          listBooking={listBooking}
          checkButton={checkButton}
          bookingId={bookingId}
          handleConfirmCancellation={handleConfirmCancellation}
          handleCancel={handleCancel}
          handleUpdateBooking={handleUpdateBooking}
        />
      )}

      <ul role="list" className="divide-y divide-gray-100">
        {filteredBookings.length === 0 && (
          <p className="flex items-center justify-center h-screen text-gray-500">
            Aucune réservation pour le moment.
          </p>
        )}

        {filteredBookings.map((checking) => (
          <li
            key={checking.id}
            className="flex flex-col sm:flex-row justify-between gap-x-6 px-4 py-5 border-solid border-b-2 hover:bg-gray-100"
          >
            {console.log(checking)}
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
                {checking.checking_type && checking.checking_type === 2 ? (
                  <div>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      <span className="font-bold">Type : </span>
                      {checking.checking_type === 2
                        ? " Anniversaire"
                        : " Classique"}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      <span className="font-bold">Gâteau : </span>
                      {checking.checking_cake == 1 ? " Chocolat" : " Fraise"}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      <span className="font-bold">Âge : </span>
                      {checking.checking_kid_age &&
                        checking.checking_kid_age}{" "}
                      ans
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      <span className="font-bold">Nombre : </span>
                      {checking.checking_kid_number &&
                        checking.checking_kid_number}
                    </p>
                  </div>
                ) : (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    <span className="font-bold">Type : </span>
                    Classique
                  </p>
                )}
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
                {checking.checking_notes && (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    <span className="font-bold">Notes : </span>
                    {checking.checking_notes}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-evenly w-auto md:items-center md:p-2 mt-6 md:flex-col md:w-26 ">
              <button
                value={checkButton}
                onClick={() => handleCheckBooking(checking.id)}
                className="font-bold px-4 py-2 bg-green-600 text-white rounded-md mr-4 hover:bg-green-800 md:mr-0 "
              >
                Terminer
              </button>
              <button
                onClick={() => handleDropBooking(checking.id)}
                className="font-bold px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
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
