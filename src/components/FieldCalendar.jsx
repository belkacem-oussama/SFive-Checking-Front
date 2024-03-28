import { useEffect, useState } from "react"

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

export default function FieldCalendar({ todaysBooking, setTodaysBooking }) {
  const [isBooked, setIsBooked] = useState([])

  useEffect(() => {
    if (todaysBooking && Array.isArray(todaysBooking)) {
      const bookingsByField = todaysBooking.reduce((acc, booking) => {
        const fieldId = booking.field.id
        const fieldName = booking.field.field_name
        const startDateTime = new Date(booking.checking_start)
        const endDateTime = new Date(booking.checking_end)

        const startTime = `${String(startDateTime.getHours()).padStart(
          2,
          "0"
        )}:${String(startDateTime.getMinutes()).padStart(2, "0")}`
        const endTime = `${String(endDateTime.getHours()).padStart(
          2,
          "0"
        )}:${String(endDateTime.getMinutes()).padStart(2, "0")}`

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

      const bookingStart = new Date(2024, 0, 1, bookingHour, bookingMinute)
      const bookingEnd = new Date(2024, 0, 1, bookingEndHour, bookingEndMinute)
      const currentTime = new Date(
        2024,
        0,
        1,
        currentTimeHour,
        currentTimeMinute
      )

      return currentTime >= bookingStart && currentTime < bookingEnd
    })
  }

  return (
    <div className="pt-2">
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
                              <div>{b.customer}</div>
                              <div>
                                {b.startTime} - {b.endTime}
                              </div>
                              <div>{b.price}€</div>
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
                              <div>{b.customer}</div>
                              <div>
                                {b.startTime} - {b.endTime}
                              </div>
                              <div>{b.price}€</div>
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
