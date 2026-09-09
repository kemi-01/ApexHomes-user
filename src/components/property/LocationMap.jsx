import {
  MapPin,
  Navigation,
  ExternalLink,
} from "lucide-react";

const LocationMap = ({
  latitude,
  longitude,
  location,
  city,
  country,
}) => {
  const displayLocation =
    location ||
    [city, country]
      .filter(Boolean)
      .join(", ") ||
    "Location unavailable";

  const hasCoordinates =
    latitude !== undefined &&
    longitude !== undefined;

  const mapUrl = hasCoordinates
    ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        displayLocation
      )}`;

  return (
    <section className="border-t border-gray-100 py-8">
      <h2 className="text-lg font-semibold text-gray-950">
        Where you'll be
      </h2>

      <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
        {/* Map placeholder / preview */}
        <div className="relative flex h-[320px] items-center justify-center overflow-hidden bg-gray-200">
          {/* Decorative map background */}
          <div className="absolute inset-0 opacity-30">
            <div className="h-full w-full bg-[linear-gradient(45deg,#d1d5db_25%,transparent_25%,transparent_75%,#d1d5db_75%),linear-gradient(45deg,#d1d5db_25%,transparent_25%,transparent_75%,#d1d5db_75%)] bg-[length:40px_40px] bg-[position:0_0,20px_20px]" />
          </div>

          {/* Location marker */}
          <div className="relative flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-950 text-white shadow-xl">
              <MapPin size={25} />
            </div>

            <div className="mt-3 rounded-xl bg-white px-4 py-2 text-center shadow-lg">
              <p className="text-sm font-semibold text-gray-950">
                {displayLocation}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                ApexHomes location
              </p>
            </div>
          </div>

          {/* Open map */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-gray-900 shadow-lg transition hover:bg-gray-50"
          >
            <Navigation size={14} />
            Open in Maps
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Location information */}
        <div className="flex items-start gap-3 bg-white p-5">
          <MapPin
            size={19}
            className="mt-0.5 shrink-0 text-gray-700"
          />

          <div>
            <p className="text-sm font-semibold text-gray-950">
              {displayLocation}
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              The exact address and directions will be
              provided after your booking is confirmed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;