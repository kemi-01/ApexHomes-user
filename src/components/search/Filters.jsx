import { useState } from "react";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";

const Filters = ({
  filters = {},
  onChange,
  onReset,
}) => {
  const [open, setOpen] = useState(false);

  const defaultFilters = {
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    amenities: [],
    rating: "",
  };

  const currentFilters = {
    ...defaultFilters,
    ...filters,
  };

  const updateFilter = (key, value) => {
    onChange?.({
      ...currentFilters,
      [key]: value,
    });
  };

  const toggleAmenity = (amenity) => {
    const exists =
      currentFilters.amenities.includes(amenity);

    const updated = exists
      ? currentFilters.amenities.filter(
          (item) => item !== amenity
        )
      : [...currentFilters.amenities, amenity];

    updateFilter("amenities", updated);
  };

  const activeFilterCount = [
    currentFilters.propertyType,
    currentFilters.minPrice,
    currentFilters.maxPrice,
    currentFilters.bedrooms,
    currentFilters.bathrooms,
    currentFilters.rating,
  ].filter(Boolean).length +
    currentFilters.amenities.length;

  return (
    <>
      {/* Mobile / Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
      >
        <SlidersHorizontal size={17} />

        Filters

        {activeFilterCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-950 px-1.5 text-[10px] text-white">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Desktop Filters */}
      <div className="hidden items-center gap-3 lg:flex">
        <FilterSelect
          label="Property type"
          value={currentFilters.propertyType}
          options={[
            "Apartment",
            "Villa",
            "House",
            "Hotel",
            "Resort",
          ]}
          onChange={(value) =>
            updateFilter("propertyType", value)
          }
        />

        <FilterSelect
          label="Bedrooms"
          value={currentFilters.bedrooms}
          options={["1+", "2+", "3+", "4+", "5+"]}
          onChange={(value) =>
            updateFilter("bedrooms", value)
          }
        />

        <FilterSelect
          label="Bathrooms"
          value={currentFilters.bathrooms}
          options={["1+", "2+", "3+", "4+"]}
          onChange={(value) =>
            updateFilter("bathrooms", value)
          }
        />

        <FilterSelect
          label="Rating"
          value={currentFilters.rating}
          options={["4+", "4.5+", "4.8+"]}
          onChange={(value) =>
            updateFilter("rating", value)
          }
        />
      </div>

      {/* Full Filter Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/40 p-4 backdrop-blur-sm">
          <div className="mx-auto flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-semibold">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-6 py-6">
              
              {/* Property type */}
              <FilterSection title="Property type">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Apartment",
                    "Villa",
                    "House",
                    "Hotel",
                    "Resort",
                    "Cottage",
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        updateFilter(
                          "propertyType",
                          currentFilters.propertyType ===
                            type
                            ? ""
                            : type
                        )
                      }
                      className={`rounded-xl border px-4 py-3 text-sm transition ${
                        currentFilters.propertyType ===
                        type
                          ? "border-gray-950 bg-gray-950 text-white"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Price */}
              <FilterSection title="Price per night">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="0"
                    placeholder="Minimum"
                    value={currentFilters.minPrice}
                    onChange={(event) =>
                      updateFilter(
                        "minPrice",
                        event.target.value
                      )
                    }
                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-950"
                  />

                  <input
                    type="number"
                    min="0"
                    placeholder="Maximum"
                    value={currentFilters.maxPrice}
                    onChange={(event) =>
                      updateFilter(
                        "maxPrice",
                        event.target.value
                      )
                    }
                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-950"
                  />
                </div>
              </FilterSection>

              {/* Bedrooms */}
              <FilterSection title="Bedrooms">
                <div className="flex flex-wrap gap-2">
                  {[
                    "1+",
                    "2+",
                    "3+",
                    "4+",
                    "5+",
                  ].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        updateFilter(
                          "bedrooms",
                          currentFilters.bedrooms ===
                            value
                            ? ""
                            : value
                        )
                      }
                      className={`rounded-full border px-4 py-2 text-sm ${
                        currentFilters.bedrooms === value
                          ? "border-gray-950 bg-gray-950 text-white"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Amenities */}
              <FilterSection title="Amenities">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Free WiFi",
                    "Swimming Pool",
                    "Parking",
                    "Kitchen",
                    "Air Conditioning",
                    "Gym",
                    "TV",
                    "Washing Machine",
                  ].map((amenity) => {
                    const selected =
                      currentFilters.amenities.includes(
                        amenity
                      );

                    return (
                      <label
                        key={amenity}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() =>
                            toggleAmenity(amenity)
                          }
                          className="h-4 w-4 accent-black"
                        />

                        <span className="text-sm text-gray-700">
                          {amenity}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </FilterSection>

              {/* Rating */}
              <FilterSection title="Guest rating">
                <div className="flex flex-wrap gap-2">
                  {[
                    "4+",
                    "4.5+",
                    "4.8+",
                  ].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() =>
                        updateFilter(
                          "rating",
                          currentFilters.rating ===
                            rating
                            ? ""
                            : rating
                        )
                      }
                      className={`rounded-full border px-4 py-2 text-sm ${
                        currentFilters.rating === rating
                          ? "border-gray-950 bg-gray-950 text-white"
                          : "border-gray-200"
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </FilterSection>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  onReset?.();
                  setOpen(false);
                }}
                className="text-sm font-semibold underline"
              >
                Clear all
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white"
              >
                Show stays
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FilterSection = ({
  title,
  children,
}) => {
  return (
    <div className="border-b border-gray-100 py-6 first:pt-0 last:border-b-0">
      <h3 className="mb-4 text-sm font-semibold text-gray-950">
        {title}
      </h3>

      {children}
    </div>
  );
};

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="appearance-none rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-9 text-sm text-gray-700 outline-none hover:border-gray-300 focus:border-gray-950"
      >
        <option value="">{label}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
    </div>
  );
};

export default Filters;