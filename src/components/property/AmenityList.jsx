import {
  Wifi,
  Waves,
  Car,
  Utensils,
  Tv,
  Snowflake,
  WashingMachine,
  Dumbbell,
  ShieldCheck,
  Coffee,
  Wind,
  Home,
  Check,
} from "lucide-react";

const amenityIcons = {
  wifi: Wifi,
  "free wifi": Wifi,
  pool: Waves,
  swimming: Waves,
  parking: Car,
  kitchen: Utensils,
  tv: Tv,
  "air conditioning": Snowflake,
  "air conditioner": Snowflake,
  "washing machine": WashingMachine,
  gym: Dumbbell,
  security: ShieldCheck,
  breakfast: Coffee,
  balcony: Wind,
};

const getAmenityIcon = (amenity) => {
  const key = amenity.toLowerCase().trim();

  return (
    amenityIcons[key] ||
    Home
  );
};

const AmenityList = ({
  amenities = [],
  limit = 0,
}) => {
  if (!amenities.length) {
    return null;
  }

  const visibleAmenities =
    limit > 0
      ? amenities.slice(0, limit)
      : amenities;

  const hiddenCount =
    amenities.length - visibleAmenities.length;

  return (
    <section className="border-t border-gray-100 py-8">
      <h2 className="text-lg font-semibold text-gray-950">
        What this place offers
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {visibleAmenities.map((amenity, index) => {
          const Icon = getAmenityIcon(amenity);

          return (
            <div
              key={`${amenity}-${index}`}
              className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3"
            >
              <Icon
                size={19}
                className="shrink-0 text-gray-700"
              />

              <span className="text-sm text-gray-700">
                {amenity}
              </span>

              <Check
                size={15}
                className="ml-auto text-gray-400"
              />
            </div>
          );
        })}
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          className="mt-5 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
        >
          Show all {amenities.length} amenities
        </button>
      )}
    </section>
  );
};

export default AmenityList;