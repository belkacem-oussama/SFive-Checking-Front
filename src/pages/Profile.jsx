import { useContext } from "react"
import { jwtDecode } from "jwt-decode"

import Forms from "../components/Form.jsx"
import { AuthContext } from "../context/AuthContext.jsx"

export default function Profile() {
  let userDataRole
  let userDataName
  let userDataEmail

  const { tokenCookie } = useContext(AuthContext)

  if (tokenCookie) {
    userDataRole = jwtDecode(tokenCookie).user_roles

    userDataName = jwtDecode(tokenCookie).user_name

    userDataEmail = jwtDecode(tokenCookie).user_email
  } else {
    userDataRole = null
    userDataName = null
    userDataEmail = null
  }
  return (
    <div className="bg-white py-8 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mon profil
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Informations détaillées.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-y border-gray-200 pt-4 pb-4 sm:mt-16 sm:pt-4 sm:pb-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
              <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                {userDataRole}
              </span>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-base font-semibold leading-7 text-gray-900">
                <span className="absolute inset-0" />
                {userDataName}
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                <span className="font-bold">Mail : </span>
                {userDataEmail}
              </p>
            </div>
          </article>
        </div>
        <Forms />
      </div>
    </div>
  )
}
