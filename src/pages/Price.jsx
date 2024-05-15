import React, { useState } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"

import Input from "../components/Input.jsx"
import Alert from "../components/Alert.jsx"

export default function Price({ prices, setPrices }) {
  const [showAlert, setShowAlert] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setPrices((prevPrices) => ({
      ...prevPrices,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/fields`,

        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${Cookies.get("token")}`,
          },

          body: JSON.stringify(prices),
        }
      )

      if (response.ok) {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 3000)
      } else {
        console.error("Erreur lors de la requête:", response.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {showAlert && <Alert alertMessage="Tarifs modifiés." bgColor={false} />}
      <div className="bg-white py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tarifs
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 border-b border-gray-900/10 pb-3">
              Modifier les tarifs de réservation.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="field_price_1"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    1 Heure
                  </label>
                  <Input
                    name="field_price_1"
                    inputValue={prices.field_price_1}
                    onChange={handleChange}
                    className="w-2/3"
                  />
                </div>
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="field_price_2"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    1 Heure 30
                  </label>
                  <Input
                    name="field_price_2"
                    inputValue={prices.field_price_2}
                    onChange={handleChange}
                    className="w-2/3"
                  />
                </div>
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="field_price_3"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    2 Heures
                  </label>
                  <Input
                    name="field_price_3"
                    inputValue={prices.field_price_3}
                    onChange={handleChange}
                    className="w-2/3"
                  />
                </div>
                <div className="flex items-center space-x-4 p-2">
                  <label
                    htmlFor="field_price_4"
                    className="block text-sm font-medium text-gray-700 w-1/3"
                  >
                    Anniversaire
                  </label>
                  <Input
                    name="field_price_4"
                    inputValue={prices.field_price_4}
                    onChange={handleChange}
                    className="w-2/3"
                  />
                </div>
              </div>
              <div className="flex justify-end p-2 space-x-4">
                <Link to="/">
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border-none text-sm font-medium rounded-md text-gray-700  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
