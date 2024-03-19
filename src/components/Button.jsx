import React from "react"

export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-gray-800 w-22 h-8 ml-auto hover:bg-gray-900 text-white font-semibold px-4 mt-auto rounded-md sm:w-auto"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
