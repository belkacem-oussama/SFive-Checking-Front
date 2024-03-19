import { PaperClipIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Input from "../components/Input.jsx"
import customers from "../assets/json/customers.json"

export default function ItemsDetails() {
  // State to manage showing inputs for each field
  const [showInput, setShowInput] = useState({
    firstname: false,
    surname: false,
    address: false,
    city: false,
    mail: false,
    phone: false,
  })

  const { id } = useParams()

  const booking = customers.find(
    (customer) => parseInt(customer.id) === parseInt(id)
  )

  // Function to toggle the input display
  const handleShowInput = (fieldName) => {
    setShowInput({ ...showInput, [fieldName]: !showInput[fieldName] })
  }

  return (
    <div>
      <div className="px-4 sm:px-2 py-2 ">
        <h3 className="text-base font-semibold leading-7 text-gray-800">
          Client #{booking.id}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Informations détaillées.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 sm:ml-2">
          {Object.keys(booking).map((key) => {
            if (key !== "id") {
              // Exclure le champ "id"
              return (
                <div
                  className="px-4 py-6 flex justify-between items-center"
                  key={key}
                >
                  <dt className="text-sm font-medium leading-6 text-gray-800 sm:px-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </dt>
                  {!showInput[key] ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {booking[key]}
                    </dd>
                  ) : (
                    <Input inputValue={booking[key]} />
                  )}
                  {!showInput[key] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 w-4"
                      onClick={() => handleShowInput(key)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4"
                      onClick={() => handleShowInput(key)}
                    >
                      <path
                        stroke-linecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  )}
                </div>
              )
            } else {
              return null // Ne rien rendre pour le champ "id"
            }
          })}
        </dl>
      </div>
      <div className="border-t border-gray-100 px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 sm:ml-2 sm:mr-4">
        <dt className="text-sm font-medium leading-6 text-gray-800 sm:px-2">
          Factures
        </dt>
        <dd className="mt-2 text-sm text-gray-800 sm:col-span-2 sm:mt-0">
          <ul
            role="list"
            className="divide-y divide-gray-100 rounded-md border border-gray-200"
          >
            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">
                    resume_back_end_developer.pdf
                  </span>
                  <span className="flex-shrink-0">2.4mb</span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Download
                </a>
              </div>
            </li>
            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">
                    coverletter_back_end_developer.pdf
                  </span>
                  <span className="flex-shrink-0">4.5mb</span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Download
                </a>
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </div>
  )
}
