import React, { useEffect, useState } from "react"

import FieldCalendar from "../components/FieldCalendar.jsx"
import SmallCalendar from "../components/SmallCalendar.jsx"

import Cookies from "js-cookie"
import moment from "moment/moment.js"

export default function Home({
  clickHours,
  setClickHours,
  clickField,
  setClickField,
}) {
  // Options pour formater la date
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }

  const currentDate = new Date()

  // Formater la date au format français avec les options fournies
  const formattedCurrentDate = currentDate.toLocaleDateString("fr-FR", options)

  let backDate = moment().format("YYYY-MM-DD")

  const handleDatePickerChange = (date) => {
    setApiDate(moment(date).format("YYYY-MM-DD"))
    const homePageDate = date.toLocaleDateString("fr-FR", options)
    setSelectedDateHome(homePageDate)
  }

  const [selectedDateHome, setSelectedDateHome] = useState(formattedCurrentDate)
  const [apiDate, setApiDate] = useState(backDate)
  const [todaysBooking, setTodaysBookings] = useState()
  const [showLoader, setShowLoader] = useState(false)

  let tokenCookie = Cookies.get("token")

  useEffect(() => {
    const fetchData = async () => {
      let response
      let data

      try {
        setShowLoader(true)
        response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/checkings/date/${apiDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenCookie,
            },
          }
        )
        if (response.ok) {
          data = await response.json()
          setTodaysBookings(data)
        }

        setShowLoader(false)
      } catch (error) {
        setShowLoader(false)
        console.log(error)
      }
    }
    fetchData()
  }, [selectedDateHome])

  const handlePrevDate = () => {
    const selectedDateObj = new Date(apiDate)
    // Soustraire un jour
    selectedDateObj.setDate(selectedDateObj.getDate() - 1)
    // Formater la date précédente
    const previousDate = selectedDateObj.toLocaleDateString("fr-FR", options)
    // Mettre à jour les états
    setSelectedDateHome(previousDate)
    setApiDate(moment(selectedDateObj).format("YYYY-MM-DD"))
  }

  const handleNextDate = () => {
    const selectedDateObj = new Date(apiDate)
    // Ajouter un jour
    selectedDateObj.setDate(selectedDateObj.getDate() + 1)
    // Formater la date suivante
    const nextDate = selectedDateObj.toLocaleDateString("fr-FR", options)
    // Mettre à jour les états
    setSelectedDateHome(nextDate)
    setApiDate(moment(selectedDateObj).format("YYYY-MM-DD"))
  }

  return (
    <div>
      <div className="text-center py-4 border-b mx-2 border-gray-900/10 pb-3 md:text-left">
        <div className="flex justify-center items-center ">
          <span className="mr-4 flex-grow ">
            <SmallCalendar
              selectedDateHome={selectedDateHome}
              handleDatePickerChange={handleDatePickerChange}
            />
          </span>
          <span className="mr-2" onClick={handlePrevDate}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span className="ml-2" onClick={handleNextDate}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </div>
        {todaysBooking && (
          <div className="mt-1 text-gray-500 p-1 text-center ">
            {todaysBooking.length === 0 ? (
              <p>Aucune réservation.</p>
            ) : (
              <p>
                Vous avez {todaysBooking.length}{" "}
                {todaysBooking.length > 1 ? "réservations" : "réservation"}{" "}
                aujourd'hui.
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        <FieldCalendar
          clickHours={clickHours}
          setClickHours={setClickHours}
          todaysBooking={todaysBooking}
          setTodaysBookings={setTodaysBookings}
          showLoader={showLoader}
          setShowLoader={setShowLoader}
          clickField={clickField}
          setClickField={setClickField}
        />
      </div>
    </div>
  )
}
