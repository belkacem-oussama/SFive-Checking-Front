import React from "react"

export default function CustomerForm({
  showCustomerForm,
  setShowCustomerForm,
  inputName,
  setInputName,
  inputSurname,
  setInputSurname,
  inputEmail,
  setInputEmail,
  inputAddress,
  setInputAddress,
  inputPhone,
  setInputPhone,
}) {
  const handleSubmit = () => {
    const newCustomer = {
      name: inputName,
      surname: inputSurname,
      email: inputEmail,
      address: inputAddress,
      phone: inputPhone,
    }
    console.log(newCustomer)
    setShowCustomerForm(false)
    setInputName("")
    setInputSurname("")
    setInputEmail("")
    setInputAddress("")
    setInputPhone("")
  }

  return (
    <>
      <div className="mx-2 mt-2 lg:mx-0 border-b border-gray-900/10q pb-3 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:ml-2">
          Clients
        </h2>
        <p className="mt-2 md:ml-4 text-lg leading-8 text-gray-600">
          Nouveau client.
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="first-name"
            className="block text-gray-900 ml-2 font-semibold "
          >
            Nom
          </label>
          <div className="p-2">
            <input
              id="first-name"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value)
              }}
              className="mt-1 block w-full focus:shadow-md p-3 focus:outline-none rounded-md border border-gray-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Zidane, Benzema, ..."
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="last-name"
            className="block text-gray-900 ml-2 font-semibold "
          >
            Prénom
          </label>
          <div className="p-2">
            <input
              id="first-name"
              value={inputSurname}
              onChange={(e) => {
                setInputSurname(e.target.value)
              }}
              className="mt-1 block w-full focus:shadow-md p-3 focus:outline-none rounded-md border border-gray-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Zinedine, Karim, ..."
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-900 ml-2 font-semibold "
          >
            Email
          </label>
          <div className="p-2">
            <input
              id="first-name"
              value={inputEmail}
              onChange={(e) => {
                setInputEmail(e.target.value)
              }}
              className="mt-1 block w-full focus:shadow-md p-3 focus:outline-none rounded-md border border-gray-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Entrez le mail ..."
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-gray-900 ml-2 font-semibold "
          >
            Adresse
          </label>
          <div className="p-2">
            <input
              id="first-name"
              value={inputAddress}
              onChange={(e) => {
                setInputAddress(e.target.value)
              }}
              className="mt-1 block w-full focus:shadow-md p-3 focus:outline-none rounded-md border border-gray-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="6 Rue des Frères Peraux, 60180 Nogent-sur-Oise ..."
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-gray-900 ml-2 font-semibold "
          >
            Phone
          </label>
          <div className="p-2">
            <input
              id="first-name"
              value={inputPhone}
              onChange={(e) => {
                setInputPhone(e.target.value)
              }}
              className="mt-1 block w-full focus:shadow-md p-3 focus:outline-none rounded-md border border-gray-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="..."
            />
          </div>
        </div>
      </div>
      <div className="mt-6 mb-4 flex items-center justify-end gap-x-6 mr-2 sm:col-span-6">
        <button
          onClick={() => {
            setShowCustomerForm(false)
          }}
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Annuler
        </button>
        <button
          onClick={() => {
            handleSubmit()
          }}
          className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Valider
        </button>
      </div>
    </>
  )
}