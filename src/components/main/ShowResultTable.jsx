
import { useContext, useEffect, useRef, useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { context } from "../../context/ChatbotContext"

export default function DataTable() {
 
  // Sample data for the table
  // const initialData = [
  //   { id: 1, title: "John Doe", location: "john@example.com", price: "Admin", available: "true",bedrooms:1,bathrooms:1,amenities:['lift','pool'],area_sqft:499},
  // ]

  const { setIsTableActive,modelAnswers } = useContext(context);
  
  const initialData = modelAnswers[modelAnswers.length-1]?.results;
  const [data, setData] = useState(initialData)
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const searchbarRef = useRef(null);
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
    <div className="w-full max-w-6xl mx-auto p-4 z-50">
      {/* searchbar */}
      <div className="flex items-center justify-between mb-2 sticky top-3 z-20">
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
{/*  { id: 1, title: "John Doe", location: "john@example.com", price: "Admin", status: "Available",bedrooms:1,bathrooms:1,amenties:['lift','pool'],area_sqft:499},
    */}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg z-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("id")}>
                ID {renderSortIndicator("id")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("name")}>
                Title {renderSortIndicator("name")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("email")}>
                location {renderSortIndicator("email")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("role")}>
                price {renderSortIndicator("role")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("status")}>
                Status {renderSortIndicator("status")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("bedrooms")}>
                bedrooms {renderSortIndicator("bedrooms")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("bathrooms")}>
                bathrooms {renderSortIndicator("bathrooms")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("amenties")}>
                amenties {renderSortIndicator("amenties")}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("area_sqft")}>
                area_sqft {renderSortIndicator("area_sqft")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.id+item.title}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b hover:bg-gray-100`}
                >
                  <td className="py-4 px-6">{item.id}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{item.title}</td>
                  <td className="py-4 px-6">{item.location}</td>
                  <td className="py-4 px-6">{item.price}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${item.available === true ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                    >
                      {item.available && "Available*" || "Unavailable"}
                    </span>
                  </td>
                   <td className="py-4 px-6">{item.bedrooms}</td>
                   <td className="py-4 px-6">{item.bathrooms}</td>
                   <td className="py-4 px-6">{item.amenities.map((i,index)=>(i.length-3>index)?i+", ":i)}</td>
                   <td className="py-4 px-6">{item.area_sqft+" sqft"}</td>
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
