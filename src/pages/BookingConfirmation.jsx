import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  CheckCircle2,
  Copy,
  Search,
} from "lucide-react";
import { useState } from "react";

const BookingConfirmation =
  () => {
    const location =
      useLocation();

    const { bookingId } =
      useParams();

    const [copied, setCopied] =
      useState(false);

    const booking =
      location.state?.booking;

    const reference =
      booking?.bookingReference ||
      booking?.reference ||
      bookingId;

    const copyReference = async () => {
      try {
        await navigator.clipboard.writeText(
          reference
        );

        setCopied(true);

        setTimeout(
          () => setCopied(false),
          2000
        );
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-2xl px-6 py-16">
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2
                size={34}
              />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Booking confirmed
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-950">
              You're all set!
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500">
              Your booking has been received. We've
              created a booking reference you can use
              to look up your reservation later.
            </p>

            {/* Reference */}
            <div className="mt-8 rounded-2xl bg-gray-50 p-5">
              <p className="text-xs text-gray-400">
                Booking reference
              </p>

              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="text-lg font-bold tracking-wider text-gray-950">
                  {reference}
                </span>

                <button
                  type="button"
                  onClick={
                    copyReference
                  }
                  className="rounded-lg p-2 text-gray-500 hover:bg-white"
                >
                  <Copy size={16} />
                </button>
              </div>

              {copied && (
                <p className="mt-2 text-xs text-green-600">
                  Copied!
                </p>
              )}
            </div>

            {/* Property */}
            {booking?.property && (
              <div className="mt-8 flex items-center gap-4 text-left">
             {booking.property?.images?.[0] && (
  <img
    src={
      typeof booking.property.images[0] === "string"
        ? booking.property.images[0]
        : booking.property.images[0]?.url
    }
    alt={booking.property.title}
    className="h-20 w-20 rounded-xl object-cover"
  />
)}

                <div>
                  <h2 className="font-semibold">
                    {
                      booking.property
                        .title
                    }
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {booking.checkIn} →{" "}
                    {booking.checkOut}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Link
                to="/"
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-900"
              >
                Back to home
              </Link>

              <Link
                to="/booking-lookup"
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white"
              >
                <Search size={15} />
                Find my booking
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  };

export default BookingConfirmation;