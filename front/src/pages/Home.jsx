import React from "react"
import FieldCalendar from "../components/FieldCalendar.jsx"

export default function Home() {
  // const currentDate = new Date().toLocaleDateString("fr-FR", {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long",
  // })

  // const capitalizeFirstLetter = (string) => {
  //   return string.charAt(0).toUpperCase() + string.slice(1)
  // }

  // const formattedDate = currentDate.replace(/\w+/, capitalizeFirstLetter)

  return (
    <div>
      {/* <div className="text-center py-4 border-b mx-2 border-gray-900/10 pb-3 md:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:ml-2">
          {formattedDate}
        </h2>
        <p className="mt-2 md:ml-4 text-lg leading-8 text-gray-600">
          Réservations du jour.
        </p>
      </div> */}
      <div>
        <FieldCalendar />
      </div>
    </div>
  )
}
