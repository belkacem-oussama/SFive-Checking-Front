import Button from "../components/Button.jsx"
import booking from "../assets/json/booking.json"

export default function Booking() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {booking.map((book) => (
        <li
          key={book.phone}
          className="flex flex-col sm:flex-row justify-between gap-x-6 px-4 py-5 border-solid border-b-2 hover:bg-gray-100"
        >
          <div className="flex flex-col sm:flex-row gap-x-4 items-start sm:items-center w-full">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-800">
                #{book.id} - {book.firstname} {book.lastname}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                <span className="font-bold">Tél : </span>
                {book.phone}
              </p>
              <br />
              {book.date && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <span className="font-bold">Date : </span>
                  {book.date}
                </p>
              )}
              {book.startedTime && book.endedTime && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <span className="font-bold">Créneau : </span>
                  {book.startedTime}h - {book.endedTime}h
                </p>
              )}
              {book.field && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <span className="font-bold">Terrain : </span>
                  {book.field}
                </p>
              )}
              {book.price && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <span className="font-bold">Prix : </span>
                  {book.price} €
                </p>
              )}
            </div>
          </div>
          <Button text={"Annuler"} />
        </li>
      ))}
    </ul>
  )
}
