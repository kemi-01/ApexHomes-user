// booking summary component

import {
  CalendarDays,
  Users,
  MapPin,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/* --------------------------------------------------
   IMAGE URL
-------------------------------------------------- */

const getImageUrl = (image) => {
  if (!image) return "";

  if (typeof image === "object") {
    image =
      image.url ||
      image.path ||
      image.src ||
      "";
  }

  if (!image || typeof image !== "string") {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  const backendOrigin =
    API_BASE_URL.replace(/\/api\/?$/, "");

  if (image.startsWith("/")) {
    return `${backendOrigin}${image}`;
  }

  return `${backendOrigin}/${image}`;
};

/* --------------------------------------------------
   CURRENCY
-------------------------------------------------- */

const formatCurrency = (
  amount,
  currency = "NGN"
) => {
  const value = Number(amount || 0);

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString()}`;
  }
};

/* --------------------------------------------------
   DATE
-------------------------------------------------- */

const formatDate = (date) => {
  if (!date) return "Not selected";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not selected";
  }

  return parsedDate.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
};

/* --------------------------------------------------
   NIGHTS
-------------------------------------------------- */

const calculateNights = (
  checkIn,
  checkOut
) => {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return 0;
  }

  const difference = end - start;

  return Math.max(
    0,
    Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    )
  );
};

/* --------------------------------------------------
   LOCATION
-------------------------------------------------- */

const getDisplayLocation = ({
  location,
  city,
  country,
}) => {
  /*
   * Backend:
   *
   * location: {
   *   address,
   *   city,
   *   state,
   *   country
   * }
   */

  if (
    typeof location === "object" &&
    location !== null
  ) {
    return (
      [
        location.address,
        location.city,
        location.state,
        location.country,
      ]
        .filter(Boolean)
        .join(", ") ||
      "Location unavailable"
    );
  }

  if (
    typeof location === "string" &&
    location.trim()
  ) {
    return location;
  }

  return (
    [city, country]
      .filter(Boolean)
      .join(", ") ||
    "Location unavailable"
  );
};

/* --------------------------------------------------
   GUESTS
-------------------------------------------------- */

const getTotalGuests = (guests) => {
  if (
    typeof guests === "object" &&
    guests !== null
  ) {
    return (
      Number(guests.adults || 0) +
      Number(guests.children || 0)
    );
  }

  return Number(guests) || 0;
};

/* --------------------------------------------------
   COMPONENT
-------------------------------------------------- */

const BookingSummary = ({
  property,
  booking,
}) => {
  if (!property) return null;

  /* --------------------------------------------------
     PROPERTY
  -------------------------------------------------- */

  const {
    title,
    name,
    images = [],
    location,
    city,
    country,
    price = 0,
    pricePerNight,
    currency = "NGN",
  } = property;

  /* --------------------------------------------------
     BOOKING
  -------------------------------------------------- */

  const checkIn =
    booking?.checkIn || null;

  const checkOut =
    booking?.checkOut || null;

  const bookingGuests =
    booking?.guests ?? 0;

  /* --------------------------------------------------
     PRICING
  -------------------------------------------------- */

  const pricing =
    booking?.pricing || {};

  const nights =
    Number(pricing.nights) ||
    Number(booking?.nights) ||
    calculateNights(
      checkIn,
      checkOut
    );

  const nightlyPrice =
    Number(
      pricing.nightlyRate
    ) ||
    Number(pricePerNight) ||
    Number(price) ||
    0;

  const accommodationTotal =
    Number(pricing.subtotal) ||
    nightlyPrice * nights;

  const cleaningFee =
    Number(pricing.cleaningFee) || 0;

  const serviceFee =
    Number(pricing.serviceFee) || 0;

  const taxes =
    Number(pricing.taxes) || 0;

  const calculatedTotal =
    accommodationTotal +
    cleaningFee +
    serviceFee +
    taxes;

  const total =
    Number(pricing.total) ||
    Number(booking?.total) ||
    calculatedTotal;

  const displayCurrency =
    pricing.currency ||
    booking?.currency ||
    currency ||
    "NGN";

  /* --------------------------------------------------
     LOCATION
  -------------------------------------------------- */

  const displayLocation =
    getDisplayLocation({
      location,
      city,
      country,
    });

  /* --------------------------------------------------
     GUESTS
  -------------------------------------------------- */

  const totalGuests =
    getTotalGuests(bookingGuests);

  /* --------------------------------------------------
     IMAGE
  -------------------------------------------------- */

  const propertyImage =
    getImageUrl(images?.[0]) ||
    "/placeholder-property.jpg";

  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* Property */}
      <div className="flex gap-4">

        <img
          src={propertyImage}
          alt={
            title ||
            name ||
            "Property"
          }
          className="h-24 w-28 shrink-0 rounded-2xl object-cover"
        />

        <div className="min-w-0">

          <h2 className="line-clamp-2 text-sm font-semibold text-gray-950">
            {title ||
              name ||
              "ApexHomes property"}
          </h2>

          <div className="mt-2 flex items-start gap-1.5 text-xs text-gray-500">

            <MapPin
              size={13}
              className="mt-0.5 shrink-0"
            />

            <span className="line-clamp-2">
              {displayLocation}
            </span>

          </div>

          <p className="mt-2 text-xs text-gray-500">
            {formatCurrency(
              nightlyPrice,
              displayCurrency
            )}{" "}
            / night
          </p>

        </div>
      </div>

      {/* Stay details */}
      <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">

        {/* Dates */}
        <div className="flex items-start gap-3">

          <CalendarDays
            size={17}
            className="mt-0.5 shrink-0 text-gray-500"
          />

          <div>

            <p className="text-xs font-semibold text-gray-950">
              Dates
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {formatDate(checkIn)}
              {" — "}
              {formatDate(checkOut)}
            </p>

            {nights > 0 && (
              <p className="mt-1 text-xs text-gray-400">
                {nights}{" "}
                {nights === 1
                  ? "night"
                  : "nights"}
              </p>
            )}

          </div>
        </div>

        {/* Guests */}
        <div className="flex items-start gap-3">

          <Users
            size={17}
            className="mt-0.5 shrink-0 text-gray-500"
          />

          <div>

            <p className="text-xs font-semibold text-gray-950">
              Guests
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {totalGuests}{" "}
              {totalGuests === 1
                ? "guest"
                : "guests"}
            </p>

          </div>
        </div>

      </div>

      {/* Price details */}
      <div className="mt-6 border-t border-gray-100 pt-5">

        <h3 className="text-sm font-semibold text-gray-950">
          Price details
        </h3>

        <div className="mt-4 space-y-3 text-sm">

          {/* Accommodation */}
          <div className="flex justify-between gap-4">

            <span className="text-gray-500">
              {formatCurrency(
                nightlyPrice,
                displayCurrency
              )}{" "}
              × {nights}{" "}
              {nights === 1
                ? "night"
                : "nights"}
            </span>

            <span className="shrink-0 font-medium text-gray-900">
              {formatCurrency(
                accommodationTotal,
                displayCurrency
              )}
            </span>

          </div>

          {/* Cleaning */}
          {cleaningFee > 0 && (
            <div className="flex justify-between gap-4">

              <span className="text-gray-500">
                Cleaning fee
              </span>

              <span className="shrink-0">
                {formatCurrency(
                  cleaningFee,
                  displayCurrency
                )}
              </span>

            </div>
          )}

          {/* Service */}
          {serviceFee > 0 && (
            <div className="flex justify-between gap-4">

              <span className="text-gray-500">
                Service fee
              </span>

              <span className="shrink-0">
                {formatCurrency(
                  serviceFee,
                  displayCurrency
                )}
              </span>

            </div>
          )}

          {/* Taxes */}
          {taxes > 0 && (
            <div className="flex justify-between gap-4">

              <span className="text-gray-500">
                Taxes
              </span>

              <span className="shrink-0">
                {formatCurrency(
                  taxes,
                  displayCurrency
                )}
              </span>

            </div>
          )}

          {/* Total */}
          <div className="flex justify-between gap-4 border-t border-gray-100 pt-4 text-base font-bold text-gray-950">

            <span>
              Total
            </span>

            <span className="shrink-0">
              {formatCurrency(
                total,
                displayCurrency
              )}
            </span>

          </div>

        </div>
      </div>

    </section>
  );
};

export default BookingSummary;