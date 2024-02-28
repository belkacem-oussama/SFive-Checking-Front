import * as React from "react"
import { Dayjs } from "dayjs"
import "dayjs/locale/fr"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

export default function SmallCalendar() {
  const [value, setValue] = React.useState<Dayjs | null>(null)

  return (
    <div className="p-2 w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            sx={{
              width: 1,
            }}
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  )
}
