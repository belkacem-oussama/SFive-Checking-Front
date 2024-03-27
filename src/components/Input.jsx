import React from "react"

export default function Input({
  inputValue,
  onChange,
  onClick,
  name,
  placeholder,
}) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      type="text"
      className=" mt-1 text-sm leading-6 text-gray-700 border rounded-md outline-none text-center"
      value={inputValue}
      onClick={onClick}
      onChange={onChange}
    />
  )
}
