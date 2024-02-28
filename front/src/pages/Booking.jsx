import Button from "../components/Button.jsx"

const people = [
  {
    ref: "#580911",
    name: "Leslie Alexander",
    tel: "0606060606",
    date: "Mercredi 14 Février 2024",
    time: "18h - 20h",
    field: "Terrain 2",
    price: "70€",
  },
  {
    ref: "#580911",
    name: "Leslie Alexander",
    tel: "0606060606",
    date: "Mercredi 14 Février 2024",
    time: "18h - 20h",
    field: "Terrain 2",
    price: "70€",
  },
  {
    ref: "#580911",
    name: "Leslie Alexander",
    tel: "0606060606",
    date: "Mercredi 14 Février 2024",
    time: "18h - 20h",
    field: "Terrain 2",
    price: "70€",
  },
  {
    ref: "#580911",
    name: "Leslie Alexander",
    tel: "0606060606",
    date: "Mercredi 14 Février 2024",
    time: "18h - 20h",
    field: "Terrain 2",
    price: "70€",
  },
  {
    ref: "#580911",
    name: "Leslie Alexander",
    tel: "0606060606",
    date: "Mercredi 14 Février 2024",
    time: "18h - 20h",
    field: "Terrain 2",
    price: "70€",
  },
  {
    ref: "#580911",
    name: "Leslie Alexander",
    tel: "0606060606",
    date: "Mercredi 14 Février 2024",
    time: "18h - 20h",
    field: "Terrain 2",
    price: "70€",
  },
]

export default function Booking() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {people.map((person) => (
        <li
          key={person.tel}
          className="flex flex-col sm:flex-row justify-between gap-x-6 px-4 py-5 border-solid border-b-2 hover:bg-gray-100"
        >
          <div className="flex flex-col sm:flex-row gap-x-4 items-start sm:items-center w-full">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-800">
                {person.ref} - {person.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                <span className="font-bold">Tél : </span>
                {person.tel}
              </p>
              <br />
              {person.date && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <span className="font-bold">Date : </span>
                  {person.date}
                </p>
              )}
              {person.time && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <span className="font-bold">Créneau : </span>
                  {person.time}
                </p>
              )}
              {person.field && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <span className="font-bold">Terrain : </span>
                  {person.field}
                </p>
              )}
              {person.price && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <span className="font-bold">Prix : </span>
                  {person.price}
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
