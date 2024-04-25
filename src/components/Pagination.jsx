import * as React from "react"
import Pagination from "@mui/material/Pagination"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Stack from "@mui/material/Stack"

const theme = createTheme({
  palette: {
    perso: {
      main: "#1F2937",
      contrastText: "#FFFFFF",
    },
  },
})

export default function PaginationComponent({
  page,
  setPage,
  totalPage,
  setTotalPage,
}) {
  const handleChange = (event, value) => {
    setPage(value)
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex justify-center py-2">
      <ThemeProvider theme={theme}>
        <Stack spacing={2}>
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-4 pb-4 sm:mt-16 sm:pt-4 sm:pb-4 lg:mx-0 lg:max-w-none">
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChange}
              hidePrevButton
              hideNextButton
              color="perso"
            />
          </div>
        </Stack>
      </ThemeProvider>
    </div>
  )
}
