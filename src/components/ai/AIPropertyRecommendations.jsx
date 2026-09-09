import {
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";

const AIPropertyRecommendations = ({
  properties = [],
  onPropertySelect,
}) => {
  if (!properties.length) {
    return null;
  }

  return (
    <div className="mt-3 space-y-2">
      <p className="px-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
        Recommended for you
      </p>

      <div className="space-y-2">
        {properties.map(
          (property, index) => {
            const id =
              property._id ||
              property.id ||
              index;

            const image =
              property.images?.[0] ||
              property.image ||
              "/placeholder-property.jpg";

            const title =
              property.title ||
              property.name ||
              "ApexHomes Property";

            const location =
              property.location ||
              [
                property.city,
                property.country,
              ]
                .filter(Boolean)
                .join(", ") ||
              "Location unavailable";

            const price = Number(
              property.pricePerNight ||
                property.price ||
                0
            );

            const rating =
              property.rating ||
              property.averageRating;

            return (
              <button
                key={id}
                type="button"
                onClick={() =>
                  onPropertySelect?.(
                    property
                  )
                }
                className="group flex w-full gap-3 rounded-2xl border border-gray-200 bg-white p-2 text-left transition hover:border-gray-400 hover:shadow-sm"
              >
                {/* Image */}
                <img
                  src={image}
                  alt={title}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />

                {/* Info */}
                <div className="min-w-0 flex-1 py-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="line-clamp-1 text-xs font-semibold text-gray-950">
                      {title}
                    </h4>

                    <ArrowRight
                      size={14}
                      className="shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-gray-900"
                    />
                  </div>

                  <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
                    <MapPin size={11} />

                    <span className="truncate">
                      {location}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-950">
                      ₦{price.toLocaleString()}
                      <span className="font-normal text-gray-400">
                        {" "}
                        / night
                      </span>
                    </p>

                    {rating && (
                      <div className="flex items-center gap-1 text-[10px] font-medium text-gray-700">
                        <Star
                          size={11}
                          className="fill-current"
                        />

                        {Number(
                          rating
                        ).toFixed(1)}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default AIPropertyRecommendations;