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

  return (
    <div className="pt-2 relative ">
      {showLoader && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
          <LoaderComponent />
        </div>
      )}
      <table cellPadding="6" className="w-full">
        <thead>
          <tr>
            <th></th>
            <th className="bg-gray-200 border border-gray-300 text-gray-500 font-medium text-sm px-2 py-2 w-1/2">
              Terrain 1
            </th>
            <th className="bg-gray-200 border border-gray-300 text-gray-500 font-medium text-sm px-2 py-2 w-1/2">
              Terrain 2
            </th>
          </tr>
        </thead>
        <tbody>
          {hoursData.slice(0, -1).map((item, index) => (
            <tr key={`${index}-${item}`}>
              <td className="font-light px-2 text-sm text-gray-500">
                {item} {hoursData[index + 1]}
              </td>
              <td
                className={`text-sm border border-gray-300 font-light ${
                  isBookedTime(item, "Terrain 1") &&
                  "bg-gray-800 text-white border-none"
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
                            <div key={`${b.startTime}-${b.endTime}-${bIndex}`}>
                              <div>
                                {b.customer}{" "}
                                <span className="font-bold"> {b.price}€</span>
                              </div>
                              <div>
                                {b.startTime} - {b.endTime}
                              </div>
                            </div>
                          ))}
                    </div>
                  ))}
              </td>
              <td
                className={`text-sm border border-gray-300 font-light ${
                  isBookedTime(item, "Terrain 2") &&
                  "bg-gray-800 text-white border-none"
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
                            <div key={`${b.startTime}-${b.endTime}-${bIndex}`}>
                              <div>
                                {b.customer}{" "}
                                <span className="font-bold"> {b.price}€</span>
                              </div>
                              <div>
                                {b.startTime} - {b.endTime}
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
