import * as React from "react"

import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

export default function PaginationComponent({
  page,
  setPage,
  totalPage,
  setTotalPage,
}) {
  const handleChange = (e) => {
    setPage(parseInt(e.target.textContent))
  }

  return (
    <div className="flex justify-center py-2">
      <Stack spacing={2}>
        <Pagination
          count={totalPage}
          page={page}
          defaultPage={1}
          onChange={handleChange}
          siblingCount={0}
        />
      </Stack>
    </div>
  )
}
