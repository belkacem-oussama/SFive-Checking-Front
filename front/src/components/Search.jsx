export default function SearchBar() {
  return (
    <div className="relative mt-2 flex justify-center sm:justify-end sm:mr-6 w-40 mr-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Search ..."
          className="rounded-md py-1.5 px-4 my-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6 pr-10 w-full"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  )
}
