import { useEffect, useState } from "react"

import LoaderComponent from "../components/Loader.jsx"

import moment from "moment/moment.js"

const hoursData = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
]

export default function FieldCalendar({
  todaysBooking,
  setTodaysBooking,
  showLoader,
  setShowLoader,
}) {
  const [isBooked, setIsBooked] = useState([])

  useEffect(() => {
    if (todaysBooking && Array.isArray(todaysBooking)) {
      const bookingsByField = todaysBooking.reduce((acc, booking) => {
        const fieldId = booking.field.id
        const fieldName = booking.field.field_name
        //Décalage horaire ici !!!

        const startDateTime = moment(booking.checking_start)
        const endDateTime = moment(booking.checking_end)

        let startHour = startDateTime.utc().hour()
        if (startHour < 0) {
          startHour = 23
        }

        const startTime = `${String(startHour).padStart(2, "0")}:${String(
          startDateTime.minutes()
        ).padStart(2, "0")}`

        let endHour = endDateTime.utc().hour()
        if (endHour < 0) {
          endHour = 23
        }

        const endTime = `${String(endHour).padStart(2, "0")}:${String(
          endDateTime.minutes()
        ).padStart(2, "0")}`

        const checking_cake = booking.checking_cake == 1 ? "Chocolat" : "Fraise"

        const checking_kid_age = booking.checking_kid_age

        const checking_kid_number = booking.checking_kid_number

        if (!acc[fieldId]) {
          acc[fieldId] = {
            field: fieldName,
            bookings: [],
          }
        }

        acc[fieldId].bookings.push({
          startTime: startTime,
          endTime: endTime,
          customer: `${booking.customer.customer_firstname} ${booking.customer.customer_surname}`,
          price: booking.checking_price,
          type: booking.checking_type,
          checking_cake: checking_cake,
          checking_kid_age: checking_kid_age,
          checking_kid_number: checking_kid_number,
        })

        return acc
      }, {})
      const newBookings = Object.values(bookingsByField)
      setIsBooked(newBookings)
    } else {
      setIsBooked([])
    }
  }, [todaysBooking])

  const isBookedTime = (time, field) => {
    const fieldBookings = isBooked.find((booking) => booking.field === field)

    if (!fieldBookings) return false

    return fieldBookings.bookings.some((booking) => {
      const [bookingHour, bookingMinute] = booking.startTime.split(":")
      const [bookingEndHour, bookingEndMinute] = booking.endTime.split(":")
      const [currentTimeHour, currentTimeMinute] = time.split(":")

      const currentTimeInMinutes =
        parseInt(currentTimeHour) * 60 + parseInt(currentTimeMinute)
      const bookingStartInMinutes =
        parseInt(bookingHour) * 60 + parseInt(bookingMinute)
      const bookingEndInMinutes =
        parseInt(bookingEndHour) * 60 + parseInt(bookingEndMinute)

      if (bookingStartInMinutes > bookingEndInMinutes) {
        return (
          currentTimeInMinutes >= bookingStartInMinutes ||
          currentTimeInMinutes < bookingEndInMinutes
        )
      } else {
        return (
          currentTimeInMinutes >= bookingStartInMinutes &&
          currentTimeInMinutes < bookingEndInMinutes
        )
      }
    })
  }

  const handleCellClick = (e) => {
    if (
      e.target.classList.contains("bg-gray-800") ||
      e.target.classList.contains("bg-green-600") ||
      e.target.tagName === "DIV"
    ) {
      console.log("réservé")
    } else {
      console.log("non réservé")
    }
  }

  return (
    <div className="pt-2 relative ">
      {showLoader && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
          <LoaderComponent />
        </div>
      )}
      <table className="w-full text-xs md:text-sm ">
        <thead>
          <tr>
            <th></th>
            <th className="bg-gray-200 border border-gray-300 text-gray-500 font-medium px-1 py-1 md:px-2 md:py-2 w-1/2">
              Terrain 1
            </th>
            <th className="bg-gray-200 border border-gray-300 text-gray-500 font-medium px-1 py-1 md:px-2 md:py-2 w-1/2">
              Terrain 2
            </th>
          </tr>
        </thead>
        <tbody>
          {hoursData.slice(0, -1).map((item, index) => (
            <tr key={`${index}-${item}`}>
              <td className="font-light px-1 py-1 md:px-2 md:py-2 text-gray-500">
                {item} {hoursData[index + 1]}
              </td>
              {/* Terrain 1 */}
              <td
                onClick={handleCellClick}
                className={`text-xs md:text-sm border border-gray-300 font-light ${
                  isBookedTime(item, "Terrain 1") &&
                  (() => {
                    const field = isBooked.find(
                      (field) => field.field === "Terrain 1"
                    )
                    if (!field) return ""
                    const booking = field.bookings.find((booking) => {
                      const startTime = moment(booking.startTime, "HH:mm")
                      const endTime = moment(booking.endTime, "HH:mm")

                      // If booking goes over midnight
                      if (endTime.isBefore(startTime)) {
                        return (
                          moment(item, "HH:mm").isSameOrAfter(startTime) ||
                          moment(item, "HH:mm").isBefore(endTime)
                        )
                      } else {
                        return (
                          moment(item, "HH:mm").isSameOrAfter(startTime) &&
                          moment(item, "HH:mm").isBefore(endTime)
                        )
                      }
                    })
                    if (!booking) return ""
                    return booking.type === 1
                      ? "bg-gray-800 text-white"
                      : "bg-green-600 text-white"
                  })()
                }`}
              >
                {isBooked
                  .filter((booking) =>
                    booking.bookings.some((b) => b.startTime === item)
                  )
                  .map((booking, bookingIndex) => (
                    <div key={`${booking.field}-${bookingIndex}`}>
                      {booking.field === "Terrain 1" &&
                        booking.bookings
                          .filter((b) => b.startTime === item)
                          .map((b, bIndex) => (
                            <div
                              key={`${b.startTime}-${b.endTime}-${bIndex}`}
                              className="mb-1 pb-1  border-gray-300"
                            >
                              {b.type === 2 && (
                                <div className="justify-start flex items-center">
                                  {b.checking_cake === "Fraise" ? (
                                    <span
                                      role="img"
                                      aria-label="Fraise"
                                      className="mr-1"
                                    >
                                      🍓
                                    </span>
                                  ) : b.checking_cake === "Chocolat" ? (
                                    <span
                                      role="img"
                                      aria-label="Chocolat"
                                      className="mr-1"
                                    >
                                      🍫
                                    </span>
                                  ) : null}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                                    />
                                  </svg>
                                </div>
                              )}

                              <div>
                                {b.customer}{" "}
                                <span className="font-bold"> {b.price}€</span>
                              </div>
                              <div>
                                {b.startTime} - {b.endTime}
                              </div>
                              <div>
                                {b.type == 2
                                  ? `${b.checking_kid_age} ans`
                                  : null}
                              </div>
                              <div>
                                {b.type == 2
                                  ? `${b.checking_kid_number} personnes`
                                  : null}
                              </div>
                            </div>
                          ))}
                    </div>
                  ))}
              </td>
              {/* Terrain 2 */}
              <td
                className={`text-xs md:text-sm border border-gray-300 font-light ${
                  isBookedTime(item, "Terrain 2") &&
                  (() => {
                    const field = isBooked.find(
                      (field) => field.field === "Terrain 2"
                    )
                    if (!field) return ""
                    const booking = field.bookings.find((booking) => {
                      const startTime = moment(booking.startTime, "HH:mm")
                      const endTime = moment(booking.endTime, "HH:mm")

                      // If booking goes over midnight
                      if (endTime.isBefore(startTime)) {
                        return (
                          moment(item, "HH:mm").isSameOrAfter(startTime) ||
                          moment(item, "HH:mm").isBefore(endTime)
                        )
                      } else {
                        return (
                          moment(item, "HH:mm").isSameOrAfter(startTime) &&
                          moment(item, "HH:mm").isBefore(endTime)
                        )
                      }
                    })
                    if (!booking) return ""
                    return booking.type === 1
                      ? "bg-gray-800 text-white"
                      : "bg-green-600 text-white"
                  })()
                }`}
              >
                {isBooked
                  .filter((booking) =>
                    booking.bookings.some((b) => b.startTime === item)
                  )
                  .map((booking, bookingIndex) => (
                    <div key={`${booking.field}-${bookingIndex}`}>
                      {booking.field === "Terrain 2" &&
                        booking.bookings
                          .filter((b) => b.startTime === item)
                          .map((b, bIndex) => (
                            <div
                              key={`${b.startTime}-${b.endTime}-${bIndex}`}
                              className="mb-1 pb-1  border-gray-300"
                            >
                              {b.type === 2 && (
                                <div className="justify-start flex items-center">
                                  {b.checking_cake === "Fraise" ? (
                                    <span
                                      role="img"
                                      aria-label="Fraise"
                                      className="mr-1"
                                    >
                                      🍓
                                    </span>
                                  ) : b.checking_cake === "Chocolat" ? (
                                    <span
                                      role="img"
                                      aria-label="Chocolat"
                                      className="mr-1"
                                    >
                                      🍫
                                    </span>
                                  ) : null}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                                    />
                                  </svg>
                                </div>
                              )}

                              <div>
                                {b.customer}{" "}
                                <span className="font-bold"> {b.price}€</span>
                              </div>
                              <div>
                                {b.startTime} - {b.endTime}
                              </div>
                              <div>
                                {b.type == 2
                                  ? `${b.checking_kid_age} ans`
                                  : null}
                              </div>
                              <div>
                                {b.type == 2
                                  ? `${b.checking_kid_number} personnes`
                                  : null}
                              </div>
                            </div>
                          ))}
                    </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
