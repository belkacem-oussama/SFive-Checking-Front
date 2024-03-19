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
      className="border-2 rounded-md outline-none text-center"
      value={inputValue}
      onClick={onClick}
      onChange={onChange}
    />
  )
}
