import * as React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import { Avatar } from "@mui/material"
import Cookies from "js-cookie"

import SearchBar from "../components/Search.jsx"
import PaginationComponent from "../components/Pagination.jsx"
import Alert from "../components/Alert.jsx"
import LoaderComponent from "../components/Loader.jsx"

function stringToColor(string) {
  let hash = 0
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }
  const palette = [
    "#1F2937",
    "#BEE427",
    "#5A67D8",
    "#EDE9FE",
    "#FDE68A",
    "#4ADE80",
    "#7F9CF5",
    "#FECACA",
    "#FCA5A5",
    "#A7F3D0",
    "#60A5FA",
  ]
  const index = Math.abs(hash % palette.length)
  return palette[index]
}

function stringAvatar(name) {
  const nameParts = name.split(" ")

  const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : ""

  const secondInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : ""

  return {
    sx: { bgcolor: stringToColor(name) },
    children: `${firstInitial}${secondInitial}`,
  }
}

export default function Customers({
  listCustomer,
  setListCustomer,
  page,
  setPage,
  totalPage,
  setTotalPage,
  showAlert,
  setShowAlert,
}) {
  const [inputSearch, setInputSearch] = useState("")
  const [showLoader, setShowLoader] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = Cookies.get("token")
        if (token) {
          const headers = { Authorization: token }
          const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/customers`,
            { headers }
          )

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données")
          }

          const data = await response.json()
          setListCustomer(data)
          setTotalPage(Math.ceil(data.length / 20))
        }
      } catch (error) {
        console.log(error)
      } finally {
        setShowLoader(false)
      }
    }

    fetchCustomers()
  }, [setListCustomer, setTotalPage])

  useEffect(() => {
    setPage(1)
  }, [location, setPage])

  const handleChange = (e) => {
    setInputSearch(e.target.value)
    setPage(1)
    window.scrollTo(0, 0)
  }

  const filteredCustomers = listCustomer
    .filter((customer) =>
      `${customer.customer_firstname} ${customer.customer_surname}`
        .toLowerCase()
        .includes(inputSearch.toLowerCase())
    )
    .slice((page - 1) * 20, page * 20)

  const totalPageCalc = Math.ceil(listCustomer.length / 20)
  const successMessage = "Client ajouté avec succès."

  return (
    <>
      {showAlert && <Alert alertMessage={successMessage} />}
      <div className="flex justify-between items-center px-2 mt-2 ">
        <Link to="/customers/add">
          <button className="rounded-full p-2 text-white bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </Link>
        <SearchBar inputValue={inputSearch} onChange={handleChange} />
      </div>
      {showLoader ? (
        <div className="flex justify-center items-center h-screen ">
          <LoaderComponent />
        </div>
      ) : (
        <>
          {filteredCustomers.length === 0 ? (
            <p className="flex items-center justify-center h-screen text-gray-500">
              Aucun résultats...
            </p>
          ) : (
            <ul
              role="list"
              className="md:grid md:grid-rows-6 divide-y divide-gray-100"
            >
              {filteredCustomers.map((customer) => (
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
                          {customer.customer_firstname}{" "}
                          {customer.customer_surname}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500 flex-grow col-span-1">
                          {customer.mail}
                        </p>
                        <p className="mt-1 md:ml-4 truncate text-xs leading-5 text-gray-500 flex-grow col-span-1">
                          {customer.customer_phone}
                        </p>
                        <p className="mt-1 md:ml-4 truncate text-xs leading-5 text-gray-500 flex-grow col-span-1">
                          {customer.customer_mail}
                        </p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
          {filteredCustomers.length > 0 && (
            <PaginationComponent
              page={page}
              setPage={setPage}
              totalPage={totalPageCalc}
              setTotalPage={setTotalPage}
            />
          )}
        </>
      )}
    </>
  )
}
