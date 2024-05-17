import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import moment from "moment"
import Input from "../components/Input.jsx"
import Alert from "../components/Alert.jsx"

export default function UpdateChecking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [checkingData, setCheckingData] = useState({
    checking_type: 1,
    checking_notes: "",
    checking_kid_number: 0,
    checking_price: 0,
    customer_firstname: "",
    customer_surname: "",
    field_name: "",
    checking_start: "",
    checking_end: "",
  })

  useEffect(() => {
    const getCheckingById = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/checkings/${id}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (response.ok) {
          const checking = await response.json()
          setCheckingData({
            checking_type: checking.checking_type,
            checking_notes: checking.checking_notes || "",
            checking_kid_number: checking.checking_kid_number || 0,
            checking_price: checking.checking_price,
            customer_firstname: checking.customer.customer_firstname,
            customer_surname: checking.customer.customer_surname,
            field_name: checking.field.field_name,
            checking_start: checking.checking_start,
            checking_end: checking.checking_end,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    getCheckingById()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCheckingData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/checkings/${id}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            checking_notes: checkingData.checking_notes,
            checking_kid_number: checkingData.checking_kid_number,
          }),
        }
      )

      if (response.ok) {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 3000)
        navigate("/")
      } else {
        console.error("Erreur lors de la requête:", response.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleMarkAsCompleted = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/checkings/${id}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${Cookies.get("token")}`,
          },
          body: JSON.stringify({ checking_status: 0 }),
        }
      )

      if (response.ok) {
        navigate("/")
      } else {
        console.error("Erreur lors de la requête:", response.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/checkings/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${Cookies.get("token")}`,
          },
        }
      )

      if (response.ok) {
        navigate("/")
      } else {
        console.error("Erreur lors de la requête:", response.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {showAlert && (
        <Alert alertMessage="Réservation modifiée." bgColor={false} />
      )}
      <div className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="text-left">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Résa #{id}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleMarkAsCompleted}
                  className="mr-2 text-sm font-medium text-green-600 hover:text-green-700"
                >
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
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleDelete}
                  className="text-sm font-medium text-gray-800 hover:text-gray-900"
                >
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <p className="mt-4 text-lg leading-8 text-gray-600 border-b border-gray-900/10 pb-3">
              Modifier les informations de la réservation.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="customer_firstname"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    Prénom
                  </label>
                  <span className="w-32 text-center ">
                    {checkingData.customer_firstname}
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="customer_surname"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    Nom
                  </label>
                  <span className="w-32 text-center ">
                    {checkingData.customer_surname}
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="field_name"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    Terrain
                  </label>
                  <span className="w-32 text-center ">
                    {checkingData.field_name}
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="checking_price"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    Prix
                  </label>
                  <span className="w-32 text-center ">
                    {checkingData.checking_price} €
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="checking_start"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    Date
                  </label>
                  <span className="w-32 text-center ">
                    {moment.utc(checkingData.checking_start).format("LL")}
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="checking_start"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    Début
                  </label>
                  <span className="w-32 text-center ">
                    {moment.utc(checkingData.checking_start).format("LT")}
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="checking_end"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    Fin
                  </label>
                  <span className="w-32 text-center ">
                    {moment.utc(checkingData.checking_end).format("LT")}
                  </span>
                </div>
                {checkingData.checking_type === 2 && (
                  <div className="flex items-center space-x-4 p-2">
                    <label
                      htmlFor="checking_kid_number"
                      className="block text-sm font-medium text-gray-700 w-1/3"
                    >
                      Nombre d'enfants
                    </label>
                    <Input
                      name="checking_kid_number"
                      inputValue={checkingData.checking_kid_number}
                      onChange={handleChange}
                      className="w-2/3"
                    />
                  </div>
                )}
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="checking_notes"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    Notes
                  </label>

                  <textarea
                    name="checking_notes"
                    value={checkingData.checking_notes}
                    onChange={handleChange}
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-700 rounded-lg border border-gray-200 outline-none "
                    placeholder="Ajouter une note ..."
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end p-2 space-x-4">
                <Link
                  to="/"
                  onClick={() => {
                    window.scrollTo(0, 0)
                  }}
                >
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border-none text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Annuler
                  </button>
                </Link>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
