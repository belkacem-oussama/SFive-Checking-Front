import * as React from "react"
import { useState } from "react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

export default function PaginationComponent() {
  const [page, setPage] = useState(1)
  const handleChange = (e) => {
    setPage(e.target.value)
  }

  return (
    <div className="flex justify-center py-2">
      <Stack spacing={2}>
        <Pagination
          count={70}
          page={page}
          defaultPage={1}
          onChange={handleChange}
          siblingCount={0}
        />
      </Stack>
    </div>
  )
}
