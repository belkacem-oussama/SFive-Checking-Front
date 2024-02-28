export default function SearchBar() {
  return (
    <div className="relative mt-2 flex justify-center sm:justify-start sm:ml-6">
      <input
        type="text"
        placeholder="Search ..."
        className="rounded-md py-1.5 px-4 my-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-blue-500  placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />
    </div>
  )
}
