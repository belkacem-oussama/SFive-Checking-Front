import Forms from "../components/Form.tsx"

const users = [
  {
    id: 1,
    name: "Samir Noui",
    phone: "0606060608",
    mail: "samir@gmail.com",
    datetime: "27 Octobre 2023",
    role: "Admin",
    centre: "SFive",
    centre_adress: "7 Avenue des Frères Peraux",
    centre_city: "Nogent-Sur-Oise",
    centre_zip_code: "60180",
    centre_email: "sfive@gmail.com",
    centre_tel: "0344093303",
    centre_created: "20 Septembre 2019",
  },
]

export default function Profile() {
  return (
    <div className="bg-white py-8 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mon profil.
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Informations détaillées.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-y border-gray-200 pt-4 pb-4 sm:mt-16 sm:pt-4 sm:pb-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {users.map((user) => (
            <article
              key={user.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                  {user.role}
                </span>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-base font-semibold leading-7 text-gray-900">
                  <span className="absolute inset-0" />
                  {user.name}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  <span className="font-bold">Mail : </span>
                  {user.mail}
                </p>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  <span className="font-bold">Tel : </span>
                  {user.phone}
                </p>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  <span className="font-bold">Crée le : </span>
                  {user.datetime}
                </p>
              </div>
            </article>
          ))}
        </div>
        <Forms />
      </div>
    </div>
  )
}
