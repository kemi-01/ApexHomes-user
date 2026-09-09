import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Star,
} from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";

const PropertyCard = ({
  property,
}) => {
  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  if (!property) return null;

  const {
    _id,
    id,
    title,
    name,
    location,
    city,
    country,
    images = [],
    image,
    price,
    pricePerNight,
    currency = "NGN",
    priceUnit = "night",
    rating = 0,
    reviewsCount,
    reviewCount,
    guests,
    bedrooms,
    propertyType,
  } = property;

  const propertyId = _id || id;

  if (!propertyId) {
    return null;
  }

  /*
   * ---------------------------------------------------------
   * PROPERTY IMAGE
   * ---------------------------------------------------------
   */

  const firstImage = images?.[0];

  const propertyImage =
    typeof firstImage === "string"
      ? firstImage
      : firstImage?.url ||
        image ||
        "/placeholder-property.jpg";

  /*
   * ---------------------------------------------------------
   * LOCATION
   * ---------------------------------------------------------
   */

  const displayLocation =
    typeof location === "object" && location !== null
      ? [
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

  /*
   * ---------------------------------------------------------
   * PRICE
   * ---------------------------------------------------------
   */

  const displayPrice =
    pricePerNight ?? price ?? 0;

  /*
   * ---------------------------------------------------------
   * REVIEWS
   * ---------------------------------------------------------
   */

  const displayReviewCount =
    reviewCount ?? reviewsCount ?? 0;

  /*
   * ---------------------------------------------------------
   * PROPERTY URL
   * ---------------------------------------------------------
   */

  const propertyUrl =
    `/properties/${propertyId}`;

  const displayTitle =
    title ||
    name ||
    "Beautiful stay";

  /*
   * ---------------------------------------------------------
   * CURRENCY SYMBOL
   * ---------------------------------------------------------
   */

  const currencySymbols = {
    NGN: "₦",
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "CA$",
    AUD: "A$",
    ZAR: "R",
  };

  const currencySymbol =
    currencySymbols[currency] ||
    currency;

  /*
   * ---------------------------------------------------------
   * PRICE UNIT
   * ---------------------------------------------------------
   */

  const priceUnitLabel =
    priceUnit === "week"
      ? "week"
      : priceUnit === "month"
        ? "month"
        : "night";

  /*
   * ---------------------------------------------------------
   * WISHLIST STATE
   * ---------------------------------------------------------
   */

  const wishlisted =
    isWishlisted(propertyId);

  /*
   * ---------------------------------------------------------
   * WISHLIST CLICK
   * ---------------------------------------------------------
   */

  const handleWishlistClick = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(property);
  };

  return (
    <article className="group">

      {/* =====================================================
          PROPERTY IMAGE
      ====================================================== */}

      <div className="relative overflow-hidden rounded-[1.35rem] bg-gray-100 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">

        <Link to={propertyUrl}>

          <div className="relative aspect-[4/3] overflow-hidden">

            <img
              src={propertyImage}
              alt={displayTitle}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.src =
                  "/placeholder-property.jpg";
              }}
            />


            {/* =================================================
                IMAGE GRADIENT
            ================================================== */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/65 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />


            {/* =================================================
                TOP LEFT — PROPERTY TYPE
            ================================================== */}

            {propertyType && (
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3.5 py-2 text-[11px] font-semibold capitalize tracking-wide text-white shadow-sm backdrop-blur-md">
                {propertyType}
              </div>
            )}


            {/* =================================================
                TOP RIGHT — WISHLIST
            ================================================== */}

            <button
              type="button"
              onClick={handleWishlistClick}
              aria-label={
                wishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-gray-950"
            >

              <Heart
                size={18}
                fill={
                  wishlisted
                    ? "currentColor"
                    : "none"
                }
                className={
                  wishlisted
                    ? "text-red-500"
                    : ""
                }
              />

            </button>


            {/* =================================================
                BOTTOM IMAGE INFORMATION
            ================================================== */}

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">

              {/* Location */}

              <div className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-white/90">

                <MapPin
                  size={13}
                  className="shrink-0"
                />

                <span className="line-clamp-1">
                  {displayLocation}
                </span>

              </div>


              {/* Rating */}

              {Number(rating) > 0 && (
                <div className="flex shrink-0 items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-gray-950 shadow-sm">

                  <Star
                    size={12}
                    fill="currentColor"
                  />

                  {Number(rating).toFixed(1)}

                </div>
              )}

            </div>

          </div>

        </Link>

      </div>


      {/* =====================================================
          PROPERTY INFORMATION
      ====================================================== */}

      <Link to={propertyUrl}>

        <div className="mt-4">

          {/* =================================================
              TITLE
          ================================================== */}

          <h3 className="line-clamp-1 text-[15px] font-semibold tracking-tight text-gray-950 transition-colors duration-300 group-hover:text-gray-600">
            {displayTitle}
          </h3>


          {/* =================================================
              GUESTS + BEDROOMS
          ================================================== */}

          {(guests || bedrooms) && (
            <div className="mt-1.5 text-sm text-gray-500">

              {guests && (
                <span>
                  {guests}{" "}
                  {Number(guests) === 1
                    ? "guest"
                    : "guests"}
                </span>
              )}

              {guests && bedrooms && (
                <span> · </span>
              )}

              {bedrooms && (
                <span>
                  {bedrooms}{" "}
                  {Number(bedrooms) === 1
                    ? "bedroom"
                    : "bedrooms"}
                </span>
              )}

            </div>
          )}


          {/* =================================================
              PRICE
          ================================================== */}

          <div className="mt-2.5 flex items-baseline gap-1">

            <span className="text-[15px] font-bold text-gray-950">
              {currencySymbol}
              {Number(
                displayPrice
              ).toLocaleString()}
            </span>

            <span className="text-xs text-gray-500">
              / {priceUnitLabel}
            </span>

          </div>


          {/* =================================================
              REVIEWS
          ================================================== */}

          {Number(displayReviewCount) > 0 && (
            <p className="mt-1 text-xs text-gray-400">
              {Number(
                displayReviewCount
              ).toLocaleString()}{" "}
              {Number(displayReviewCount) === 1
                ? "review"
                : "reviews"}
            </p>
          )}

        </div>

      </Link>

    </article>
  );
};

export default PropertyCard;