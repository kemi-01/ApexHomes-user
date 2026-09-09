import {
  CheckCircle2,
  CalendarDays,
  MapPin,
  Users,
  Mail,
  Phone,
  Copy,
  Clock3,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const BookingConfirmation = ({
  booking,
}) => {
  const [copied, setCopied] = useState(false);

  if (!booking) {
    return null;
  }

  const {
    bookingReference,
    reference,
    property,
    guest,
    checkIn,
    checkOut,
    guests = 1,
    pricing,
    bookingStatus = "pending",
  } = booking;

  const bookingCode =
    bookingReference ||
    reference ||
    "APX-000000";

  const propertyName =
    property?.title ||
    property?.name ||
    "ApexHomes property";

  const propertyImage =
    property?.images?.[0] ||
    "/placeholder-property.jpg";

  const displayLocation =
    typeof property?.location === "string"
      ? property.location
      : [
          property?.location?.city,
          property?.location?.country,
          property?.city,
          property?.country,
        ]
          .filter(Boolean)
          .join(", ");

  const totalGuests = Number(guests) || 1;

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(
        bookingCode
      );

      setCopied(true);

      setTimeout(
        () => setCopied(false),
        2000
      );
    } catch {
      // Clipboard unavailable.
    }
  };

  const getStatusInfo = () => {
    switch (bookingStatus) {
      case "confirmed":
        return {
          label: "Confirmed",
          description:
            "Your booking has been confirmed. We look forward to hosting you.",
          icon: CheckCircle2,
          wrapper:
            "bg-green-50 border-green-200",
          iconBg:
            "bg-green-100 text-green-600",
          badge:
            "bg-green-100 text-green-700",
        };

      case "completed":
        return {
          label: "Completed",
          description:
            "This stay has been completed.",
          icon: CheckCircle2,
          wrapper:
            "bg-blue-50 border-blue-200",
          iconBg:
            "bg-blue-100 text-blue-600",
          badge:
            "bg-blue-100 text-blue-700",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          description:
            "This booking has been cancelled.",
          icon: Clock3,
          wrapper:
            "bg-red-50 border-red-200",
          iconBg:
            "bg-red-100 text-red-600",
          badge:
            "bg-red-100 text-red-700",
        };

      default:
        return {
          label: "Under review",
          description:
            "Your booking request has been received and is waiting for confirmation from ApexHomes.",
          icon: Clock3,
          wrapper:
            "bg-amber-50 border-amber-200",
          iconBg:
            "bg-amber-100 text-amber-600",
          badge:
            "bg-amber-100 text-amber-700",
        };
    }
  };

  const statusInfo = getStatusInfo();

  const StatusIcon = statusInfo.icon;

  return (
    <div className="mx-auto w-full max-w-3xl">

      {/* =========================================
          STATUS HEADER
      ========================================== */}
      <div
        className={`rounded-3xl border p-6 text-center sm:p-8 ${statusInfo.wrapper}`}
      >
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${statusInfo.iconBg}`}
        >
          <StatusIcon size={34} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-950 sm:text-3xl">
          {bookingStatus === "confirmed"
            ? "Booking confirmed!"
            : "Booking received!"}
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
          {statusInfo.description}
        </p>
      </div>

      {/* =========================================
          BOOKING REFERENCE
      ========================================== */}
      <div className="mt-6 rounded-3xl bg-gray-950 p-6 text-center text-white sm:p-7">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Booking reference
        </p>

        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="break-all text-xl font-bold tracking-wider sm:text-2xl">
            {bookingCode}
          </span>

          <button
            type="button"
            onClick={copyReference}
            className="shrink-0 rounded-lg p-2 text-gray-300 transition hover:bg-white/10"
            aria-label="Copy booking reference"
          >
            <Copy size={17} />
          </button>
        </div>

        {copied && (
          <p className="mt-2 text-xs text-green-400">
            Booking reference copied!
          </p>
        )}

        <p className="mt-4 text-xs text-gray-400">
          Keep this reference. You'll need it to
          look up your booking later.
        </p>
      </div>

      {/* =========================================
          BOOKING STATUS
      ========================================== */}
      <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${statusInfo.iconBg}`}
          >
            <StatusIcon size={20} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-semibold text-gray-950">
                Booking status
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusInfo.badge}`}
              >
                {statusInfo.label}
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {statusInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
          PROPERTY
      ========================================== */}
      <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex gap-4">
          <img
            src={propertyImage}
            alt={propertyName}
            className="h-24 w-28 shrink-0 rounded-2xl object-cover"
          />

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Your stay
            </p>

            <h2 className="mt-1 font-semibold text-gray-950">
              {propertyName}
            </h2>

            {displayLocation && (
              <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin size={14} />
                <span>{displayLocation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stay details */}
        <div className="mt-6 grid gap-5 border-t border-gray-100 pt-6 sm:grid-cols-3">
          <Info
            icon={CalendarDays}
            label="Check-in"
            value={formatDate(checkIn)}
          />

          <Info
            icon={CalendarDays}
            label="Check-out"
            value={formatDate(checkOut)}
          />

          <Info
            icon={Users}
            label="Guests"
            value={`${totalGuests} guest${
              totalGuests !== 1
                ? "s"
                : ""
            }`}
          />
        </div>
      </div>

      {/* =========================================
          GUEST INFORMATION
      ========================================== */}
      {guest && (
        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-950">
            Guest information
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {(guest.firstName ||
              guest.lastName) && (
              <Info
                label="Guest name"
                value={[
                  guest.firstName,
                  guest.lastName,
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            )}

            {guest.email && (
              <div className="flex items-start gap-3">
                <Mail
                  size={17}
                  className="mt-0.5 text-gray-400"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-950 break-all">
                    {guest.email}
                  </p>
                </div>
              </div>
            )}

            {guest.phone && (
              <div className="flex items-start gap-3">
                <Phone
                  size={17}
                  className="mt-0.5 text-gray-400"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-950">
                    {guest.phone}
                  </p>
                </div>
              </div>
            )}

            {guest.country && (
              <Info
                label="Country"
                value={guest.country}
              />
            )}
          </div>

          {guest.specialRequests && (
            <div className="mt-5 border-t border-gray-100 pt-5">
              <p className="text-xs text-gray-400">
                Special requests
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {guest.specialRequests}
              </p>
            </div>
          )}
        </div>
      )}

      {/* =========================================
          PAYMENT SUMMARY
      ========================================== */}
      {pricing && (
        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-950">
            Payment summary
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            {pricing.nightlyRate !==
              undefined && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Nightly rate
                </span>

                <span className="font-medium text-gray-950">
                  {pricing.currency}{" "}
                  {Number(
                    pricing.nightlyRate
                  ).toLocaleString()}
                </span>
              </div>
            )}

            {pricing.nights !==
              undefined && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Nights
                </span>

                <span className="font-medium text-gray-950">
                  {pricing.nights}
                </span>
              </div>
            )}

            {pricing.subtotal !==
              undefined && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium text-gray-950">
                  {pricing.currency}{" "}
                  {Number(
                    pricing.subtotal
                  ).toLocaleString()}
                </span>
              </div>
            )}

            {Number(pricing.cleaningFee) >
              0 && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Cleaning fee
                </span>

                <span className="font-medium text-gray-950">
                  {pricing.currency}{" "}
                  {Number(
                    pricing.cleaningFee
                  ).toLocaleString()}
                </span>
              </div>
            )}

            {Number(pricing.serviceFee) >
              0 && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Service fee
                </span>

                <span className="font-medium text-gray-950">
                  {pricing.currency}{" "}
                  {Number(
                    pricing.serviceFee
                  ).toLocaleString()}
                </span>
              </div>
            )}

            {Number(pricing.taxes) >
              0 && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Taxes
                </span>

                <span className="font-medium text-gray-950">
                  {pricing.currency}{" "}
                  {Number(
                    pricing.taxes
                  ).toLocaleString()}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="font-semibold text-gray-950">
                Total
              </span>

              <span className="text-xl font-bold text-gray-950">
                {pricing.currency}{" "}
                {Number(
                  pricing.total || 0
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          ACTIONS
      ========================================== */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to={`/booking-lookup?reference=${encodeURIComponent(
            bookingCode
          )}`}
          className="flex flex-1 items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
        >
          View my booking
        </Link>

        <Link
          to="/explore"
          className="flex flex-1 items-center justify-center rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Explore more stays
        </Link>
      </div>

      {/* =========================================
          REMINDER
      ========================================== */}
      <div className="mt-6 rounded-2xl bg-gray-50 p-5 text-center">
        <p className="text-sm font-medium text-gray-700">
          Keep your booking reference safe
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          You can use your reference together with
          your email or phone number to check your
          booking status at any time.
        </p>
      </div>
    </div>
  );
};

const Info = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <Icon
          size={17}
          className="mt-0.5 shrink-0 text-gray-400"
        />
      )}

      <div>
        <p className="text-xs text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-950">
          {value}
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;