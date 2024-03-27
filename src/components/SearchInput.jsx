import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import SelectedUser from "./SelectedUser.jsx"

export default function SearchInput({
  selectedUser,
  setSelectedUser,
  listCustomer,
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [displayResults, setDisplayResults] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const filtered = listCustomer.filter((customer) =>
          `${customer.customer_surname} ${customer.customer_firstname} ${customer.customer_mail}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        setFilteredData(filtered)
        setDisplayResults(true)
      } else {
        setFilteredData([])
        setDisplayResults(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, listCustomer])

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleDeleteChoice = () => {
    setSelectedUser(0)
  }

  const selectedUserData = listCustomer.find(
    (customer) => parseInt(customer.id) === parseInt(selectedUser)
  )

  return (
    <div className="p-2 relative ">
      {selectedUser !== 0 && selectedUserData ? (
        <SelectedUser
          name={selectedUserData.customer_surname}
          firstname={selectedUserData.customer_firstname}
          phone={selectedUserData.customer_phone}
          onClick={handleDeleteChoice}
        />
      ) : (
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="flex ">
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <Link to="/customers/add">
              <span>
                <button className="right-0 px-3 py-3 bg-white hover:bg-gray-300 text-gray-700 focus:outline-none border border-gray-300 rounded-md ml-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </span>
            </Link>
          </div>
          {displayResults ? (
            filteredData.length > 0 ? (
              <ul className="mt-2">
                {filteredData.map((customer) => (
                  <li
                    key={customer.id}
                    className="py-2 px-4 border-b border-gray-300 hover:bg-gray-900 hover:text-white"
                    onClick={() => {
                      setSelectedUser(customer.id)
                    }}
                  >
                    <div className="grid grid-cols-2">
                      <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {customer.customer_firstname}{" "}
                        {customer.customer_surname}
                      </span>
                      <span className="text-gray-400 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {customer.customer_mail}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 px-4 py-2 rounded-md text-gray-400">
                Aucun utilisateur...
              </p>
            )
          ) : null}
        </form>
      )}
    </div>
  )
}
