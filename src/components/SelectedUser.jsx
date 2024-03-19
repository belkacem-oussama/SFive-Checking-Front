import React from "react"

export default function SelectedUser({ name, firstname, phone, onClick }) {
  return (
    <div className="bg-gray-800 text-white rounded-md p-4 shadow-md">
      <div className="flex justify-between items-center">
        <p className="font-bold">
          {firstname} {name}
        </p>
        <p className="text-gray-400">{phone}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    </div>
  )
}
