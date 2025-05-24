
import { useContext, useEffect, useRef, useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { context } from "../../context/ChatbotContext"

export default function DataTable() {
  // Sample data for the table
  const initialData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "Editor", status: "Active" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "User", status: "Active" },
    { id: 5, name: "Michael Wilson", email: "michael@example.com", role: "Admin", status: "Inactive" },
    { id: 6, name: "Sarah Brown", email: "sarah@example.com", role: "Editor", status: "Active" },
    { id: 7, name: "David Miller", email: "david@example.com", role: "User", status: "Active" },
    { id: 8, name: "Lisa Anderson", email: "lisa@example.com", role: "User", status: "Inactive" },
   
  ]

  const [data, setData] = useState(initialData)
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const searchbarRef = useRef(null);
  const { setIsTableActive } = useContext(context);
  // Handle sorting
  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)

    const sortedData = [...data].sort((a, b) => {
      if (a[field] < b[field]) return newDirection === "asc" ? -1 : 1
      if (a[field] > b[field]) return newDirection === "asc" ? 1 : -1
      return 0
    })

    setData(sortedData)
  }

  // Handle search/filter
  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.trim() === "") {
      setData(initialData)
    } else {
      const filteredData = initialData.filter((item) =>
        Object.values(item).some((value) => value.toString().toLowerCase().includes(term.toLowerCase())),
      )
      setData(filteredData)
    }
  }

  // Render sort indicator
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? (
      <ArrowUpIcon className="inline h-4 w-4 ml-1" />
    ) : (
      <ArrowDownIcon className="inline h-4 w-4 ml-1" />
    )
  }

  // Handle Table visibility
  const hideEntireComponent = () => {
    setIsTableActive(false);
  }
  useEffect(() => {
    // focus on searchbar when component loaded
    searchbarRef.current?.focus();
  }, [])
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* searchbar */}
      <div className="flex items-center justify-between mb-2 sticky top-3 z-10">
        <div className="mb-4 flex items-center w-full sm:w-1/2">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={searchbarRef}
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div onClick={hideEntireComponent} className="sm:cursor-pointer bg-white p-2 rounded-full">
          <XCircleIcon className="w-10 h-10"/>
        </div>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("id")}>
                ID {renderSortIndicator("id")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("name")}>
                Name {renderSortIndicator("name")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("email")}>
                Email {renderSortIndicator("email")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("role")}>
                Role {renderSortIndicator("role")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("status")}>
                Status {renderSortIndicator("status")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.id+item.name}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b hover:bg-gray-100`}
                >
                  <td className="py-4 px-6">{item.id}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{item.name}</td>
                  <td className="py-4 px-6">{item.email}</td>
                  <td className="py-4 px-6">{item.role}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${item.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td colSpan={5} className="py-4 px-6 text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Showing {data.length} of {initialData.length} entries
      </div>
    </div>
  )
}
