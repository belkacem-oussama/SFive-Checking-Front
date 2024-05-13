import React, { useState } from "react"
import Cookies from "js-cookie"

import moment from "moment"
import "moment/dist/locale/fr"

import Alert from "../components/Alert.jsx"

export default function Bills({ listBooking, bookingId }) {
  const [showAlert, setShowAlert] = useState(false)

  const booking = listBooking.find((booking) => booking.id === bookingId)

  const invoiceNumber = moment(booking.checking_end).format("DDMMYY")
  const customerFirstname = booking.customer.customer_firstname
  const customerSurname = booking.customer.customer_surname
  const customerId = booking.customer.id
  const checkingId = booking.id

  const handleSendBills = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/bills`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bills_ref: `${invoiceNumber}.pdf`,
            customer_id: customerId,
            checking_id: checkingId,
            customer_firstname: customerFirstname,
            customer_surname: customerSurname,
          }),
        }
      )

      if (response.ok) {
        setShowAlert(true)

        setTimeout(() => {
          setShowAlert(false)
        }, 2000)

        window.scrollTo(0, 0)
        const jsonData = await response.json()

        if (jsonData && jsonData.id) {
          const updateResponse = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/checkings/${checkingId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `${Cookies.get("token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                bills_id: jsonData.id,
              }),
            }
          )
          if (!updateResponse.ok) {
            console.log("error")
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {showAlert && <Alert alertMessage="Facture générée." />}
      <button
        className=" px-4 py-2 flex items-center space-x-2 rounded-md bg-gray-800 text-white hover:bg-gray-900 "
        onClick={handleSendBills}
      >
        <p className="font-bold">Générer une facture</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </button>
    </>
  )
}
