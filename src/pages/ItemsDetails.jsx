import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Cookies from "js-cookie"
import Alert from "../components/Alert.jsx"

import { PaperClipIcon } from "@heroicons/react/20/solid"

import Input from "../components/Input.jsx"

export default function ItemsDetails({ listCustomer, setListCustomer }) {
  // State to manage showing inputs for each field
  const [showInput, setShowInput] = useState({
    firstname: false,
    surname: false,
    address: false,
    city: false,
    mail: false,
    phone: false,
  })
  const [inputValues, setInputValues] = useState({
    customer_surname: "",
    customer_firstname: "",
    customer_address: "",
    customer_city: "",
    customer_mail: "",
    customer_phone: "",
  })

  const [showAlert, setShowAlert] = useState(false)

  const { id } = useParams()

  const customerId = listCustomer.find(
    (customer) => parseInt(customer.id) === parseInt(id)
  )

  // Function to toggle the input display
  const handleShowInput = (fieldName) => {
    setShowInput({ ...showInput, [fieldName]: !showInput[fieldName] })
    handleUpdateDetails()
  }

  useEffect(() => {
    const customer = listCustomer.find(
      (customer) => parseInt(customer.id) === parseInt(id)
    )
    setInputValues({
      customer_surname: customer.customer_surname,
      customer_firstname: customer.customer_firstname,
      customer_address: customer.customer_address,
      customer_city: customer.customer_city,
      customer_mail: customer.customer_mail,
      customer_phone: customer.customer_phone,
    })
  }, [id, listCustomer])

  const handleInputChange = (fieldName, value) => {
    setInputValues({
      ...inputValues,
      [fieldName]: value,
    })
  }

  const handleUpdateDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/customers/${customerId.id}`,

        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${Cookies.get("token")}`,
          },

          body: JSON.stringify(inputValues),
        }
      )

      if (response.ok) {
        const updatedListCustomer = listCustomer.map((customer) => {
          if (parseInt(customer.id) === parseInt(customerId.id)) {
            return { ...customer, ...inputValues }
          } else {
            return customer
          }
        })
        setListCustomer(updatedListCustomer)

        setTimeout(() => {
          setShowAlert(true)
        }, 200)
        setTimeout(() => {
          setShowAlert(false)
        }, 1000)
        window.scrollTo(0, 0)
      } else {
        console.error("Erreur lors de la requête:", response.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const successMessage = "Champs modifié."

  return (
    <div>
      {showAlert && <Alert alertMessage={successMessage} />}
      <div className="p-2 flex justify-between items-center ">
        <Link to="/customers">
          <button className="px-2 py-2 mt-2  hover:bg-gray-300 text-gray-700 focus:outline-none rounded-md ml-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </button>
        </Link>
      </div>
      <div className="px-4 sm:px-2 py-2 ">
        <h3 className="text-base font-semibold leading-7 text-gray-800">
          Client #{customerId.id}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Informations détaillées.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 sm:ml-2">
          {Object.keys(customerId).map((key) => {
            if (key !== "id" && key !== "created_at") {
              return (
                <div
                  className="px-4 py-6 flex justify-between items-center"
                  key={key}
                >
                  <dt className="text-sm font-medium leading-6 text-gray-800 sm:px-2">
                    {(() => {
                      switch (key) {
                        case "customer_surname":
                          return "Prénom"
                        case "customer_firstname":
                          return "Nom"
                        case "customer_phone":
                          return "Téléphone"
                        case "customer_mail":
                          return "Email"
                        case "customer_address":
                          return "Adresse"
                        default:
                          return key.charAt(0).toUpperCase() + key.slice(1)
                      }
                    })()}
                  </dt>

                  {!showInput[key] ? (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {customerId[key]}
                    </dd>
                  ) : (
                    <Input
                      value={inputValues[key]}
                      placeholder={customerId[key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
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
                        strokeLinecap="round"
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
