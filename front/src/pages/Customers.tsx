import { Avatar } from "@mui/material"

const people = [
  {
    firstname: "Leslie",
    surname: "Alexander",
    email: "leslie.alexander@example.com",
    phone: "0606060606",
    lastSeen: "28 Septembre 1997",
  },
  {
    firstname: "Zinedine",
    surname: "Zidane",
    email: "zinedine.zidane@example.com",
    phone: "0606069606",
    lastSeen: "28 Novembre 1997",
  },
  {
    firstname: "Oussama",
    surname: "Belkacem",
    email: "oussama.belkacem@example.com",
    phone: "0602060606",
    lastSeen: "13 Octobre 1997",
  },
]

function stringToColor(string: string) {
  let hash: number = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  const palette: string[] = [
    "#1F2937", // Bleu foncé
    "#BEE427", // Jaune-vert lumineux
    "#FFFFFF", // Blanc
    "#5A67D8", // Bleu violet
    "#EDE9FE", // Lavande clair
    "#FDE68A", // Jaune clair
    "#4ADE80", // Vert clair
    "#7F9CF5", // Bleu ciel
    "#FECACA", // Rose pâle
    "#FCA5A5", // Rouge pâle
    "#A7F3D0", // Vert menthe
    "#60A5FA", // Bleu clair
  ]

  const index = Math.abs(hash % palette.length)
  color = palette[index]

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  }
}

export default function Customers() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {people.map((person) => (
        <li
          key={person.email}
          className="flex justify-between gap-x-6 py-5 hover:bg-gray-100"
        >
          <div className="flex min-w-0 gap-x-4 p-2">
            <Avatar
              {...stringAvatar(`${person.firstname} ${person.surname}`)}
              variant="rounded"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {person.firstname} {person.surname}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                <span className="font-bold">Mail : </span>
                {person.email}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                <span className="font-bold">Tél : </span>
                {person.phone}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                Dernière réservation le {person.lastSeen}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
