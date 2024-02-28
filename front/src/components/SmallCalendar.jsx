import { useState } from "react"
import "dayjs/locale/fr"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

export default function SmallCalendar() {
  const [dateValue, setDateValue] = useState(null)

  return (
    <div className="p-2 w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            sx={{
              width: 1,
            }}
            value={dateValue}
            onChange={(newValue) => setDateValue(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  )
}
