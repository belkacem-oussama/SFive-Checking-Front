import { useState } from "react"

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

export default function FieldCalendar() {
  const [isBooked, setIsBooked] = useState([
    {
      field: "Terrain 1",
      bookings: [
        {
          startTime: "09:00",
          endTime: "10:30",
        },
        {
          startTime: "19:00",
          endTime: "20:30",
        },
        {
          startTime: "00:00",
          endTime: "02:00",
        },
      ],
    },
    {
      field: "Terrain 2",
      bookings: [
        {
          startTime: "17:00",
          endTime: "18:30",
        },
        {
          startTime: "15:00",
          endTime: "16:30",
        },
        {
          startTime: "11:30",
          endTime: "12:30",
        },
      ],
    },
  ])

  const isBookedTime = (time, field) => {
    const fieldBookings = isBooked.find((booking) => booking.field === field)
    if (!fieldBookings) return false

    return fieldBookings.bookings.some((booking) => {
      const bookingStart = new Date(`2024-01-01T${booking.startTime}`)
      const bookingEnd = new Date(`2024-01-01T${booking.endTime}`)
      const currentTime = new Date(`2024-01-01T${time}`)
      return currentTime >= bookingStart && currentTime < bookingEnd
    })
  }

  const bookingDetails = {
    "09:00": {
      "Terrain 1": {
        name: "Zinedine Zidane",
        duration: "1h30",
        price: "120€",
      },
    },
    "17:00": {
      "Terrain 2": {
        name: "Cristiano Ronaldo",
        duration: "1h30",
        price: "150€",
      },
    },
    "19:00": {
      "Terrain 1": {
        name: "Lionel Messi",
        duration: "1h30",
        price: "130€",
      },
    },
    "15:00": {
      "Terrain 2": {
        name: "Neymar Jr",
        duration: "1h30",
        price: "140€",
      },
    },
    "11:30": {
      "Terrain 2": {
        name: "Kylian Mbappé",
        duration: "1h",
        price: "110€",
      },
    },
    "00:00": {
      "Terrain 1": {
        name: "Andres Iniesta",
        duration: "2h",
        price: "200€",
      },
    },
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
                {isBookedTime(item, "Terrain 1") &&
                  bookingDetails[item] &&
                  bookingDetails[item]["Terrain 1"] && (
                    <>
                      {bookingDetails[item]["Terrain 1"].name}{" "}
                      {bookingDetails[item]["Terrain 1"].duration}{" "}
                      {bookingDetails[item]["Terrain 1"].price}
                    </>
                  )}
              </td>
              <td
                className={`text-sm border border-gray-300 font-light ${
                  isBookedTime(item, "Terrain 2") &&
                  "bg-gray-800 text-white border-none"
                }`}
              >
                {isBookedTime(item, "Terrain 2") &&
                  bookingDetails[item] &&
                  bookingDetails[item]["Terrain 2"] && (
                    <>
                      {bookingDetails[item]["Terrain 2"].name}{" "}
                      {bookingDetails[item]["Terrain 2"].duration}{" "}
                      {bookingDetails[item]["Terrain 2"].price}
                    </>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
