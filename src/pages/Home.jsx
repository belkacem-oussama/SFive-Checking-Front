import React, { useEffect, useState } from "react"

import FieldCalendar from "../components/FieldCalendar.jsx"
import SmallCalendar from "../components/SmallCalendar.jsx"

import Cookies from "js-cookie"

export default function Home() {
  //Date for HomePage
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }
  const currentDate = new Date().toLocaleDateString("fr-FR", options)

  const handleDatePickerChange = (date) => {
    const homePageDate = date.toLocaleDateString("fr-FR", options)
    setSelectedDateHome(homePageDate)
  }

  const [selectedDateHome, setSelectedDateHome] = useState(currentDate)
  const [todaysBooking, setTodaysBookings] = useState()

  //Date for API Call
  let dateApi = new Date(selectedDateHome)
  const year = dateApi.getFullYear()
  let month = dateApi.getMonth() + 1
  month = month < 10 ? "0" + month : month
  let day = dateApi.getDate()
  day = day < 10 ? "0" + day : day

  let backDate = `${year}-${month}-${day}`

  let tokenCookie = Cookies.get("token")

  useEffect(() => {
    const fetchData = async () => {
      let response
      let data

      try {
        response = await fetch(
          `${
            import.meta.env.VITE_APP_API_URL
          }/checkings?checking_start=${backDate}`,
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
