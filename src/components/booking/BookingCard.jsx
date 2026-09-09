
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Users,
  CreditCard,
} from "lucide-react";

import { useBooking } from "../../context/BookingContext";

const BookingCard = ({ property }) => {
  const navigate = useNavigate();

  const { startBooking } = useBooking();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalGuests, setTotalGuests] = useState(1);

  if (!property) return null;

  /*
   * ---------------------------------------------------------
   * PRICE
   * ---------------------------------------------------------
   */

  const nightlyPrice = Number(
    property.pricePerNight ??
      property.price ??
      0
  );

  /*
   * ---------------------------------------------------------
   * DATE CALCULATION
   * ---------------------------------------------------------
   */

  const calculateNights = () => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference =
      end.getTime() - start.getTime();

    const calculatedNights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return calculatedNights > 0
      ? calculatedNights
      : 0;
  };

  const nights = calculateNights();

  /*
   * ---------------------------------------------------------
   * FEES
   * ---------------------------------------------------------
   */

  const cleaningFee = 0;

  const serviceFee =
    nights > 0
      ? Math.round(
          nightlyPrice *
            nights *
            0.1
        )
      : 0;

  /*
   * ---------------------------------------------------------
   * TOTALS
   * ---------------------------------------------------------
   */

  const accommodationTotal =
    nightlyPrice * nights;

  const total =
    accommodationTotal +
    cleaningFee +
    serviceFee;

  /*
   * ---------------------------------------------------------
   * DATE FORMATTER
   * ---------------------------------------------------------
   */

  const formatDate = (date) => {
    if (!date) {
      return "Select date";
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

  /*
   * ---------------------------------------------------------
   * RESERVE
   * ---------------------------------------------------------
   */

  const handleBooking = () => {
    if (
      !checkIn ||
      !checkOut ||
      totalGuests < 1 ||
      nights < 1
    ) {
      return;
    }

    startBooking({
      property,
      checkIn,
      checkOut,
      guests: totalGuests,
      nights,
      total,
    });

    navigate("/booking");
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
      {/* Price */}
      <div className="flex items-end gap-1">
        <span className="text-2xl font-bold text-gray-950">
          {property.currency === "USD"
            ? "$"
            : property.currency === "EUR"
              ? "€"
              : property.currency === "GBP"
                ? "£"
                : property.currency === "CAD"
                  ? "CA$"
                  : property.currency === "AUD"
                    ? "A$"
                    : property.currency === "ZAR"
                      ? "R"
                      : "₦"}
          {nightlyPrice.toLocaleString()}
        </span>

        <span className="mb-1 text-sm text-gray-500">
          / {property.priceUnit || "night"}
        </span>
      </div>

      {/* Dates */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
        <div className="grid grid-cols-2">
          {/* Check-in */}
          <div className="border-r border-gray-200 p-4">
            <label
              htmlFor="booking-check-in"
              className="text-[10px] font-bold uppercase tracking-wider text-gray-400"
            >
              Check-in
            </label>

            <div className="mt-2 flex items-center gap-2">
              <CalendarDays
                size={16}
                className="text-gray-500"
              />

              <input
                id="booking-check-in"
                type="date"
                value={checkIn}
                onChange={(event) =>
                  setCheckIn(event.target.value)
                }
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="p-4">
            <label
              htmlFor="booking-check-out"
              className="text-[10px] font-bold uppercase tracking-wider text-gray-400"
            >
              Check-out
            </label>

            <div className="mt-2 flex items-center gap-2">
              <CalendarDays
                size={16}
                className="text-gray-500"
              />

              <input
                id="booking-check-out"
                type="date"
                value={checkOut}
                onChange={(event) =>
                  setCheckOut(event.target.value)
                }
                min={
                  checkIn ||
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="border-t border-gray-200 p-4">
          <label
            htmlFor="booking-guests"
            className="text-[10px] font-bold uppercase tracking-wider text-gray-400"
          >
            Guests
          </label>

          <div className="mt-2 flex items-center gap-2">
            <Users
              size={16}
              className="text-gray-500"
            />

            <select
              id="booking-guests"
              value={totalGuests}
              onChange={(event) =>
                setTotalGuests(
                  Number(event.target.value)
                )
              }
              className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none"
            >
              {Array.from(
                {
                  length: Math.max(
                    Number(property.guests) || 1,
                    1
                  ),
                },
                (_, index) => index + 1
              ).map((guestCount) => (
                <option
                  key={guestCount}
                  value={guestCount}
                >
                  {guestCount}{" "}
                  {guestCount === 1
                    ? "guest"
                    : "guests"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      {nights > 0 && (
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {property.currency === "USD"
                ? "$"
                : property.currency === "EUR"
                  ? "€"
                  : property.currency === "GBP"
                    ? "£"
                    : property.currency === "CAD"
                      ? "CA$"
                      : property.currency === "AUD"
                        ? "A$"
                        : property.currency === "ZAR"
                          ? "R"
                          : "₦"}
              {nightlyPrice.toLocaleString()} ×{" "}
              {nights}{" "}
              {nights === 1
                ? "night"
                : "nights"}
            </span>

            <span className="text-gray-900">
              {property.currency === "USD"
                ? "$"
                : property.currency === "EUR"
                  ? "€"
                  : property.currency === "GBP"
                    ? "£"
                    : property.currency === "CAD"
                      ? "CA$"
                      : property.currency === "AUD"
                        ? "A$"
                        : property.currency === "ZAR"
                          ? "R"
                          : "₦"}
              {accommodationTotal.toLocaleString()}
            </span>
          </div>

          {cleaningFee > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Cleaning fee
              </span>

              <span>
                {cleaningFee.toLocaleString()}
              </span>
            </div>
          )}

          {serviceFee > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Service fee
              </span>

              <span>
                {serviceFee.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex justify-between border-t border-gray-100 pt-4 text-base font-bold">
            <span>Total</span>

            <span>
              {property.currency === "USD"
                ? "$"
                : property.currency === "EUR"
                  ? "€"
                  : property.currency === "GBP"
                    ? "£"
                    : property.currency === "CAD"
                      ? "CA$"
                      : property.currency === "AUD"
                        ? "A$"
                        : property.currency === "ZAR"
                          ? "R"
                          : "₦"}
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Booking button */}
      <button
        type="button"
        onClick={handleBooking}
        disabled={
          !checkIn ||
          !checkOut ||
          totalGuests < 1 ||
          nights < 1
        }
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <CreditCard size={17} />

        Reserve this stay
      </button>

      <p className="mt-3 text-center text-xs text-gray-400">
        You won't be charged until you continue.
      </p>
    </div>
  );
};

export default BookingCard;

