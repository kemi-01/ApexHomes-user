
import {
  BedDouble,
  Bath,
  Users,
  MapPin,
  Star,
} from "lucide-react";

const PropertyInfo = ({ property }) => {
  if (!property) return null;

  const {
    title,
    name,
    description,
    location,
    city,
    country,
    rating,
    reviewsCount = 0,
    reviewCount,
    guests,
    bedrooms,
    bathrooms,
    propertyType,
  } = property;

  /*
   * LOCATION
   *
   * Backend returns:
   *
   * location: {
   *   address,
   *   city,
   *   state,
   *   country
   * }
   *
   * We must convert this object into a string
   * before rendering it in React.
   */
  const displayLocation =
    typeof location === "object" && location !== null
      ? [
          location.address,
          location.city,
          location.state,
          location.country,
        ]
          .filter(Boolean)
          .join(", ") || "Location unavailable"
      : location ||
        [city, country]
          .filter(Boolean)
          .join(", ") ||
        "Location unavailable";

  const displayReviewCount =
    reviewCount ?? reviewsCount ?? 0;

  const stats = [
    {
      icon: Users,
      value: guests,
      label: "Guests",
    },
    {
      icon: BedDouble,
      value: bedrooms,
      label: "Bedrooms",
    },
    {
      icon: Bath,
      value: bathrooms,
      label: "Bathrooms",
    },
  ].filter(
    (item) =>
      item.value !== undefined &&
      item.value !== null
  );

  return (
    <section className="py-8">
      {/* Heading */}
      <div className="border-b border-gray-100 pb-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {propertyType && (
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {propertyType}
              </span>
            )}

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              {title ||
                name ||
                "Beautiful ApexHomes stay"}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={15} />

                {displayLocation}
              </span>

              {Number(rating) > 0 && (
                <span className="flex items-center gap-1.5 text-gray-900">
                  <Star
                    size={15}
                    fill="currentColor"
                  />

                  <strong>
                    {Number(rating).toFixed(1)}
                  </strong>

                  {Number(displayReviewCount) > 0 && (
                    <span className="text-gray-500">
                      ({displayReviewCount} reviews)
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="flex flex-wrap gap-3 border-b border-gray-100 py-6">
          {stats.map(
            ({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3"
              >
                <Icon
                  size={18}
                  className="text-gray-600"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-950">
                    {value}
                  </p>

                  <p className="text-xs text-gray-500">
                    {label}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="pt-7">
          <h2 className="text-lg font-semibold text-gray-950">
            About this place
          </h2>

          <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-gray-600">
            {description}
          </p>
        </div>
      )}
    </section>
  );
};

export default PropertyInfo;

