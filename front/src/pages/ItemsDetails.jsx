import { PaperClipIcon } from "@heroicons/react/20/solid"
import { useParams } from "react-router-dom"

const booking = [
  {
    id: "005",
    firstname: "Zinedine",
    surname: "Zidane",
    adress: "7 Rue Jean Jaurès",
    city: "Creil",
    mail: "zinedine@gmail.com",
    phone: "0606060606",
    lastBook: "02/10/2006",
  },
]

export default function ItemsDetails() {
  const params = useParams()
  console.log(params)

  return (
    <div>
      <div className="px-4 sm:px-2 py-2 ">
        <h3 className="text-base font-semibold leading-7 text-gray-800">
          Client #{params.id}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Informations détaillées.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 sm:ml-2">
          <div className="px-4 py-6 flex justify-between items-center">
            <dt className="text-sm font-medium leading-6 text-gray-800 sm:px-2">
              Identité
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {booking[0].firstname} {booking[0].surname}
            </dd>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <div className="px-4 py-6 flex justify-between items-center">
            <dt className="text-sm font-medium leading-6 text-gray-800 sm:px-2">
              Adresse
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {booking[0].adress}
            </dd>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <div className="px-4 py-6 flex justify-between items-center">
            <dt className="text-sm font-medium leading-6 text-gray-800 sm:px-2">
              Ville
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {booking[0].city}
            </dd>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <div className="px-4 py-6 flex justify-between items-center">
            <dt className="text-sm font-medium leading-6 text-gray-800 sm:px-2">
              Mail
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {booking[0].mail}
            </dd>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <div className="px-4 py-6 flex justify-between items-center">
            <dt className="text-sm font-medium leading-6 text-gray-800 sm:px-2">
              Tél
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {booking[0].phone}
            </dd>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <div className="px-4 py-6 flex justify-between items-center">
            <dt className="text-sm font-medium leading-6 text-gray-800 sm:px-2">
              Dernière réservation le :
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {booking[0].lastBook}
            </dd>
          </div>
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
