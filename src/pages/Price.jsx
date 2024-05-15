import React, { useState } from "react"
import Input from "../components/Input.jsx"
import { Link } from "react-router-dom"

export default function Price() {
  const [prices, setPrices] = useState({
    oneHour: "80",
    oneAndHalfHour: "120",
    twoHours: "150",
    birthday: "189",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setPrices((prevPrices) => ({
      ...prevPrices,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically make an API call to save the prices
    console.log("Prices saved:", prices)
  }

  return (
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
                  htmlFor="oneHour"
                  className="block text-sm font-medium text-gray-700 w-1/3"
                >
                  1 Heure
                </label>
                <Input
                  name="oneHour"
                  inputValue={prices.oneHour}
                  onChange={handleChange}
                  className="w-2/3"
                />
              </div>
              <div className="flex items-center space-x-4 p-2">
                <label
                  htmlFor="oneAndHalfHour"
                  className="block text-sm font-medium text-gray-700 w-1/3"
                >
                  1 Heure 30
                </label>
                <Input
                  name="oneAndHalfHour"
                  inputValue={prices.oneAndHalfHour}
                  onChange={handleChange}
                  className="w-2/3"
                />
              </div>
              <div className="flex items-center space-x-4 p-2">
                <label
                  htmlFor="twoHours"
                  className="block text-sm font-medium text-gray-700 w-1/3"
                >
                  2 Heures
                </label>
                <Input
                  name="twoHours"
                  inputValue={prices.twoHours}
                  onChange={handleChange}
                  className="w-2/3"
                />
              </div>
              <div className="flex items-center space-x-4 p-2">
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium text-gray-700 w-1/3"
                >
                  Anniversaire
                </label>
                <Input
                  name="birthday"
                  inputValue={prices.birthday}
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
  )
}
