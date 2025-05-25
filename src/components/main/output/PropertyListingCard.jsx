import { BuildingOffice2Icon, MapPinIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
export default function PropertyListingCard({ apartment }) {
  const {
    title,
    location,
    price,
    area_sqft,
    bedrooms,
    bathrooms,
    amenities,
    available
  } = apartment;

  // generate a random image for getting propertyListingCard
  function generateRandomImage(size = 4) {
    let url = '';
    let random = Math.floor(Math.random() * size + 1);
    const path = window.location;

      // remove src in url when you perform npm run build 
      url = `src/assets/dummyImg/img${random}.jpg`;
      // console.log(url)
      return url
  }


  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Property Image */}
      <div className="relative">
        <img
          src={generateRandomImage() || 'https://kzmqk2xjvesnk7ie3i45.lite.vusercontent.net/placeholder.svg?height=200&width=400'}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
          {available ? "Available" : "Unavailable"}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center gap-2 mb-2">
          <MapPinIcon className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">{location}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>

        {/* Price & Area */}
        <p className="text-lg font-bold text-gray-800 mb-1">₹{price.toLocaleString()} / month</p>
        <p className="text-sm text-gray-600 mb-3">
          {area_sqft} sqft · {bedrooms} Bed · {bathrooms} Bath
        </p>

        {/* Amenities */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Amenities:</h3>
          <ul className="flex flex-wrap gap-2 text-sm text-gray-600">
            {amenities.map((amenity) => (
              <li key={amenity} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <BuildingOffice2Icon className="w-5 h-5 text-pink-500" />
          <span>Listed Property</span>
        </div>
      </div>
    </div>
  );
}
