import LoaderComponent from "../components/Loader.jsx"
import SFive from "../assets/images/sfive_icone.png"

export default function LoginPage({
  inputLogin,
  inputPassword,
  setInputLogin,
  setInputPassword,
  handleAuth,
  showLoader,
  setShowLoader,
  showMessage,
  setShowMessage,
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={SFive} alt="SFive" />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              console.log(inputLogin + " " + inputPassword)
              e.preventDefault()
              setInputLogin("")
              setInputPassword("")
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Adresse email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={inputLogin}
                  onChange={(e) => {
                    setInputLogin(e.target.value)
                  }}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:shadow-md "
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mot de passe
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value)
                  }}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:shadow-md "
                />
              </div>
            </div>
            <div>
              <button
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleAuth}
              >
                {showLoader ? <LoaderComponent /> : "Se connecter"}
              </button>
              {showMessage && (
                <p className="text-red-500 text-xs mt-2">
                  Erreur de connexion. Veuillez vérifier vos informations.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
