import React, { useEffect, useState } from "react"

import FieldCalendar from "../components/FieldCalendar.jsx"
import SmallCalendar from "../components/SmallCalendar.jsx"

import Cookies from "js-cookie"
import moment from "moment/moment.js"

export default function Home() {
  //Date for HomePage
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }

  const currentDate = new Date().toLocaleDateString("fr-FR", options)
  let backDate = moment().format("YYYY-MM-DD")

  const handleDatePickerChange = (date) => {
    setApiDate(moment(date).format("YYYY-MM-DD"))
    const homePageDate = date.toLocaleDateString("fr-FR", options)
    setSelectedDateHome(homePageDate)
  }

  const [selectedDateHome, setSelectedDateHome] = useState(currentDate)
  const [apiDate, setApiDate] = useState(backDate)
  const [todaysBooking, setTodaysBookings] = useState()

  let tokenCookie = Cookies.get("token")

  useEffect(() => {
    const fetchData = async () => {
      let response
      let data

      try {
        response = await fetch(
          `${
            import.meta.env.VITE_APP_API_URL
          }/checkings?checking_start=${apiDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenCookie}`,
            },
          }
        )
        data = await response.json()
        setTodaysBookings(data)
      } catch (error) {
        console.log("hehe")
      }
    }
    fetchData()
  }, [selectedDateHome])

  return (
    <div>
      <div className="text-center py-4 border-b mx-2 border-gray-900/10 pb-3 md:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:ml-2"></h2>
        <SmallCalendar
          selectedDateHome={selectedDateHome}
          handleDatePickerChange={handleDatePickerChange}
        />
      </div>
      <div>
        <FieldCalendar
          todaysBooking={todaysBooking}
          setTodaysBookings={setTodaysBookings}
        />
      </div>
    </div>
  )
}
