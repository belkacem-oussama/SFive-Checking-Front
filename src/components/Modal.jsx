import React, { useState } from "react"
import Cookies from "js-cookie"

export default function Modal({
  showModal,
  setShowModal,
  listCustomer,
  setListCustomer,
  selectedUser,
  setSelectedUser,
}) {
  const handleShowModal = () => {
    setShowModal(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const newCustomer = {
      customer_surname: inputName.trim(),
      customer_firstname: inputSurname.trim(),
      customer_mail: inputEmail.trim(),
      customer_address: inputAddress.trim(),
      customer_phone: inputPhone.trim(),
    }

    // Vérification des champs d'entrée
    if (!inputName.trim() || !inputSurname.trim() || !inputPhone.trim()) {
      alert("Remplir les champs obligatoires")
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/customers`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${Cookies.get("token")}`,
          },
          body: JSON.stringify(newCustomer),
        }
      )

      if (response.ok) {
        setShowModal(false)

        const addedCustomer = await response.json()
        setListCustomer((prev) => [...prev, addedCustomer])

        setSelectedUser(addedCustomer.id)
        setInputName("")
        setInputSurname("")
        setInputEmail("")
        setInputAddress("")
        setInputPhone("")
      } else if (response.status === 409) {
        console.error("Numéro de téléphone déjà associé.", response.status)
        alert("Numéro de téléphone déjà attribué.")
      } else if (response.status === 400) {
        console.error("Mauvais format:", response.status)
        window.scrollTo(0, 0)
      } else {
        console.error("Erreur lors de la requête:", response.status)
        window.scrollTo(0, 0)
        alert("Erreur lors de la requête.")
      }
    } catch (error) {
      console.error("Erreur inattendue:", error)
      alert("Erreur lors de la requête.")
    }
  }

  const [inputName, setInputName] = useState("")
  const [inputSurname, setInputSurname] = useState("")
  const [inputEmail, setInputEmail] = useState("")
  const [inputAddress, setInputAddress] = useState("")
  const [inputPhone, setInputPhone] = useState("")

  return (
    <div>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md h-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Nouveau Client.
              </h3>
              <button
                type="button"
                onClick={handleShowModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nom*
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Zidane, Benzema, ..."
                    value={inputName}
                    onChange={(e) => {
                      setInputName(e.target.value)
                    }}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Prénom*
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Zinedine, Karim, ..."
                    required=""
                    value={inputSurname}
                    onChange={(e) => {
                      setInputSurname(e.target.value)
                    }}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Téléphone*
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="..."
                    required=""
                    value={inputPhone}
                    onChange={(e) => {
                      setInputPhone(e.target.value)
                    }}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="mail"
                    id="mail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Entre le mail ..."
                    value={inputEmail}
                    onChange={(e) => {
                      setInputEmail(e.target.value)
                    }}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="mail"
                    id="mail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="6 Rue des Frères Pereaux, 60180 Nogent-Sur-Oise ..."
                    value={inputAddress}
                    onChange={(e) => {
                      setInputAddress(e.target.value)
                    }}
                  />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="text-white inline-flex items-center bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Valider
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
