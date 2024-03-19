import * as React from "react"
import { useState } from "react"

export default function NativeSelectComponent() {
  const [selectedValue, setSelectedValue] = useState(10)

  const limitInput = [10, 25, 50, 100]

  const handleChange = (e) => {
    setSelectedValue(e.target.value)
  }

  return (
    <select
      className="form-select outline-none border p-2 mt-2 rounded-md text-gray-900 ring-gray-300"
      aria-label="Default select example"
      value={selectedValue}
      onChange={handleChange}
    >
      {limitInput.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}
