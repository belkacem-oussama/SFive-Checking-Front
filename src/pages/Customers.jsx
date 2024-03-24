import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import SearchBar from "../components/Search.jsx"
import PaginationComponent from "../components/Pagination.jsx"
import { useState } from "react"

function stringToColor(string) {
  let hash = 0

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  const palette = [
    "#1F2937", // Bleu foncé
    "#BEE427", // Jaune-vert lumineux
    "#FFFFFF", // Blanc
    "#5A67D8", // Bleu violet
    "#EDE9FE", // Lavande clair
    "#FDE68A", // Jaune clair
    "#4ADE80", // Vert clair
    "#7F9CF5", // Bleu ciel
    "#FECACA", // Rose pâle
    "#FCA5A5", // Rouge pâle
    "#A7F3D0", // Vert menthe
    "#60A5FA", // Bleu clair
  ]

  const index = Math.abs(hash % palette.length)
  color = palette[index]

  return color
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  }
}

export default function Customers({ listCustomer, setListCustomer }) {
  const [inputSearch, setInputSearch] = useState("")

  const handleChange = (e) => {
    setInputSearch(e.target.value)
  }

  return (
    <>
      <SearchBar inputValue={inputSearch} onChange={handleChange} />
      <ul
        role="list"
        className="md:grid md:grid-rows-6 divide-y divide-gray-100"
      >
        {listCustomer.map((customer) => (
          <Link key={customer.id} to={`/customers/${customer.id}`}>
            <li
              key={customer.customer_mail}
              className="flex flex-col md:flex-row py-2 hover:bg-gray-100"
            >
              <div className="flex items-center gap-x-6 p-2 flex-grow">
                <Avatar
                  {...stringAvatar(
                    `${customer.customer_firstname} ${customer.customer_surname}`
                  )}
                  variant="rounded"
                />
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-4 w-full">
                  <p className="text-sm truncate font-semibold leading-6 text-gray-900 col-span-1">
                    {customer.customer_firstname} {customer.customer_surname}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500 flex-grow col-span-1">
                    {customer.mail}
                  </p>
                  <p className="mt-1 md:ml-4 truncate text-xs leading-5 text-gray-500 flex-grow col-span-1">
                    {customer.customer_phone}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500 flex-grow col-span-1">
                    Dernière réservation le {customer.lastBook}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <PaginationComponent />
    </>
  )
}
