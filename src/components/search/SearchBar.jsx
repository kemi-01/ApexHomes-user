
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

const PROPERTY_TYPES = [
  "All",
  "Apartment",
  "House",
  "Condo",
  "Villa",
  "Hotel",
  "Resort",
  "Cabin",
];

const SearchBar = ({
  onSearch,
  initialValues = {},
}) => {
  const [destination, setDestination] = useState(
    initialValues.location ||
      initialValues.destination ||
      ""
  );

  const [selectedType, setSelectedType] = useState(
    initialValues.propertyType || ""
  );

  const handleSearch = () => {
    onSearch?.({
      location: destination.trim(),
      propertyType: selectedType,
    });
  };

  const handleTypeClick = (type) => {
    const value = type === "All" ? "" : type;

    setSelectedType(value);

    onSearch?.({
      location: destination.trim(),
      propertyType: value,
    });
  };

  return (
    <div className="w-full">
      {/* Search */}
      <div className="flex w-full flex-col gap-2 rounded-3xl border border-gray-200 bg-white p-2 shadow-lg sm:flex-row sm:items-center sm:rounded-full">

        <div className="flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 sm:rounded-full">
          <MapPin
            size={19}
            className="shrink-0 text-gray-500"
          />

          <input
            type="text"
            value={destination}
            onChange={(event) =>
              setDestination(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search by city or destination"
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gray-950 px-6 text-sm font-semibold text-white transition hover:bg-gray-800 sm:rounded-full"
        >
          <Search size={18} />
          <span>Search</span>
        </button>
      </div>

      {/* Property types */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {PROPERTY_TYPES.map((type) => {
          const active =
            type === "All"
              ? selectedType === ""
              : selectedType === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() =>
                handleTypeClick(type)
              }
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-gray-950 bg-gray-950 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-950"
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;

