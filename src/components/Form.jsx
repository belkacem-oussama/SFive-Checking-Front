import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
import Alert from "./Alert.jsx"

export default function Forms() {
  const [newPassword, setNewPassword] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  const idUser = jwtDecode(Cookies.get("token")).id

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users/${idUser}`,

        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${Cookies.get("token")}`,
          },

          body: JSON.stringify({
            user_password: newPassword,
          }),
        }
      )

      if (response.ok) {
        setTimeout(() => {
          setShowAlert(true)
        }, 200)
        setTimeout(() => {
          setShowAlert(false)
        }, 3000)
        window.scrollTo(0, 0)
      } else {
        console.error("Erreur lors de la requête:", response.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const successMessage = "Mot de passe mis à jour."

  return (
    <>
      {showAlert && <Alert alertMessage={successMessage} />}
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          handleUpdatePassword()
          setNewPassword("")
        }}
      >
        <div className="space-y-12 mt-4">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Accès
            </h2>
            <p className="pt-2 text-sm leading-6 text-gray-600">
              Modifer mon mot de passe.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nouveau mot de passe
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={newPassword}
                      type="password"
                      name="new-pass"
                      id="new-pass"
                      onChange={(e) => {
                        setNewPassword(e.target.value)
                      }}
                      autoComplete="new-pass"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 
                    focus:outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Valider
          </button>
        </div>
      </form>
    </>
  )
}
