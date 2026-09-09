// import { useState } from "react";
// import {
//   Search,
//   Loader2,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// import {
//   useBooking,
// } from "../context/BookingContext";

// const BookingLookup = () => {
//   const {
//     lookupBooking,
//     loading,
//     error,
//   } = useBooking();

//   const [reference, setReference] =
//     useState("");

//   const [identifier, setIdentifier] =
//     useState("");

//   const [result, setResult] =
//     useState(null);

//   const [formError, setFormError] =
//     useState("");

//   const handleSubmit = async (
//     event
//   ) => {
//     event.preventDefault();

//     setFormError("");
//     setResult(null);

//     if (!reference.trim()) {
//       setFormError(
//         "Enter your booking reference."
//       );
//       return;
//     }

//     if (!identifier.trim()) {
//       setFormError(
//         "Enter the email address or phone number used for the booking."
//       );
//       return;
//     }

//     try {
//       const booking =
//         await lookupBooking({
//           reference:
//             reference.trim(),
//           identifier:
//             identifier.trim(),
//         });

//       setResult(booking);
//     } catch (err) {
//       console.error(err);

//       setFormError(
//         err?.message ||
//           "We couldn't find a booking with those details."
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="mx-auto max-w-2xl px-6 py-16">
//         <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-10">
//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950 text-white">
//             <Search size={20} />
//           </div>

//           <h1 className="mt-6 text-3xl font-bold">
//             Find your booking
//           </h1>

//           <p className="mt-2 text-sm leading-6 text-gray-500">
//             Enter your booking reference and the email
//             address or phone number you used when
//             booking.
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             className="mt-8 space-y-5"
//           >
//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Booking reference
//               </label>

//               <input
//                 type="text"
//                 value={reference}
//                 onChange={(event) =>
//                   setReference(
//                     event.target.value
//                   )
//                 }
//                 placeholder="e.g. APEX-8F3K92"
//                 className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Email or phone number
//               </label>

//               <input
//                 type="text"
//                 value={identifier}
//                 onChange={(event) =>
//                   setIdentifier(
//                     event.target.value
//                   )
//                 }
//                 placeholder="you@example.com or +234..."
//                 className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
//               />
//             </div>

//             {(formError ||
//               error) && (
//               <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
//                 {formError || error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-semibold text-white disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <Loader2
//                     size={16}
//                     className="animate-spin"
//                   />
//                   Searching...
//                 </>
//               ) : (
//                 <>
//                   <Search size={16} />
//                   Find booking
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Result */}
//           {result && (
//             <div className="mt-8 border-t border-gray-100 pt-8">
//               <div className="rounded-2xl bg-gray-50 p-5">
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <p className="text-xs text-gray-400">
//                       Booking
//                     </p>

//                     <h2 className="mt-1 font-bold">
//                       {result.bookingReference ||
//                         result.reference}
//                     </h2>
//                   </div>

//                   <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-700">
//                     {result.status ||
//                       "confirmed"}
//                   </span>
//                 </div>

//                 {result.property && (
//                   <div className="mt-5">
//                     <h3 className="font-semibold">
//                       {
//                         result.property
//                           .title
//                       }
//                     </h3>

//                     <p className="mt-1 text-sm text-gray-500">
//                       {result.checkIn} →{" "}
//                       {result.checkOut}
//                     </p>

//                     <p className="mt-1 text-sm text-gray-500">
//                       Guests:{" "}
//                       {result.guests}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className="mt-8 text-center">
//             <Link
//               to="/explore"
//               className="text-sm font-medium text-gray-600 hover:text-gray-950"
//             >
//               Continue exploring properties
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BookingLookup;




















import { useState } from "react";
import {
  Search,
  Loader2,
  CheckCircle2,
  Clock3,
  XCircle,
  CalendarDays,
  Users,
  MapPin,
  CreditCard,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useBooking } from "../context/BookingContext";

const BookingLookup = () => {
  const {
    lookupBooking,
    loading,
    error,
  } = useBooking();

  const [reference, setReference] = useState("");
  const [identifier, setIdentifier] = useState("");

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  /* =========================================
     FORMAT DATE
  ========================================== */

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
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

  /* =========================================
     FORMAT CURRENCY
  ========================================== */

  const formatCurrency = (
    amount,
    currency = "USD"
  ) => {
    if (
      amount === undefined ||
      amount === null
    ) {
      return "—";
    }

    try {
      return new Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency,
          maximumFractionDigits: 2,
        }
      ).format(Number(amount));
    } catch {
      return `${currency} ${Number(
        amount
      ).toLocaleString()}`;
    }
  };

  /* =========================================
     STATUS CONFIG
  ========================================== */

  const getStatusConfig = (status) => {
    switch (status) {
      case "confirmed":
        return {
          label: "Confirmed",
          title:
            "Your booking is confirmed",
          description:
            "Your reservation has been approved. You're all set for your stay.",
          icon: CheckCircle2,
          container:
            "border-green-200 bg-green-50",
          iconBox:
            "bg-green-100 text-green-700",
          text:
            "text-green-900",
          badge:
            "bg-green-100 text-green-700",
        };

      case "completed":
        return {
          label: "Completed",
          title:
            "Your stay is complete",
          description:
            "This reservation has been completed.",
          icon: CheckCircle2,
          container:
            "border-blue-200 bg-blue-50",
          iconBox:
            "bg-blue-100 text-blue-700",
          text:
            "text-blue-900",
          badge:
            "bg-blue-100 text-blue-700",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          title:
            "This booking was cancelled",
          description:
            "This reservation is no longer active.",
          icon: XCircle,
          container:
            "border-red-200 bg-red-50",
          iconBox:
            "bg-red-100 text-red-700",
          text:
            "text-red-900",
          badge:
            "bg-red-100 text-red-700",
        };

      case "pending":
      default:
        return {
          label: "Under review",
          title:
            "Your booking is under review",
          description:
            "We've received your reservation request. Your booking is waiting for confirmation.",
          icon: Clock3,
          container:
            "border-amber-200 bg-amber-50",
          iconBox:
            "bg-amber-100 text-amber-700",
          text:
            "text-amber-900",
          badge:
            "bg-amber-100 text-amber-700",
        };
    }
  };

  /* =========================================
     PAYMENT
  ========================================== */

  const getPaymentLabel = (status) => {
    switch (
      (status || "pending").toLowerCase()
    ) {
      case "paid":
        return "Paid";

      case "processing":
        return "Processing";

      case "failed":
        return "Failed";

      case "refunded":
        return "Refunded";

      default:
        return "Pending";
    }
  };

  /* =========================================
     FIND BOOKING
  ========================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");
    setResult(null);

    if (!reference.trim()) {
      setFormError(
        "Enter your booking reference."
      );
      return;
    }

    if (!identifier.trim()) {
      setFormError(
        "Enter the email address or phone number used for the booking."
      );
      return;
    }

    try {
      const booking =
        await lookupBooking({
          reference: reference.trim(),
          identifier: identifier.trim(),
        });

      setResult(booking);
    } catch (err) {
      console.error(
        "Booking lookup error:",
        err
      );

      setFormError(
        err?.message ||
          "We couldn't find a booking with those details."
      );
    }
  };

  /* =========================================
     NEW SEARCH
  ========================================== */

  const handleNewSearch = () => {
    setResult(null);
    setFormError("");
  };

  /* =========================================
     RESULT VALUES
  ========================================== */

  const bookingStatus = (
    result?.bookingStatus ||
    "pending"
  ).toLowerCase();

  const statusConfig =
    getStatusConfig(bookingStatus);

  const StatusIcon =
    statusConfig.icon;

  const property = result?.property;
  const guest = result?.guest;
  const pricing = result?.pricing;

  const total =
    pricing?.total ??
    result?.total ??
    0;

  const currency =
    pricing?.currency ||
    result?.currency ||
    "USD";

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">

        {/* =====================================
            HEADER
        ====================================== */}

        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white">
            <Search size={21} />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Find your booking
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Enter your booking reference and
            the email address or phone number
            you used when booking.
          </p>
        </div>

        {/* =====================================
            SEARCH FORM
        ====================================== */}

        {!result && (
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Reference */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Booking reference
                </label>

                <input
                  type="text"
                  value={reference}
                  onChange={(event) =>
                    setReference(
                      event.target.value
                    )
                  }
                  placeholder="APX-MTABNHSX-DAFE5B"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-4 focus:ring-gray-100"
                />
              </div>

              {/* Email / Phone */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Email or phone number
                </label>

                <input
                  type="text"
                  value={identifier}
                  onChange={(event) =>
                    setIdentifier(
                      event.target.value
                    )
                  }
                  placeholder="you@example.com or +234..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-4 focus:ring-gray-100"
                />
              </div>

              {/* Error */}

              {(formError || error) && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                  {formError || error}
                </div>
              )}

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Finding booking...
                  </>
                ) : (
                  <>
                    <Search size={17} />
                    Find booking
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-gray-50 p-4">
              <p className="text-xs leading-5 text-gray-500">
                Use the booking reference from
                your confirmation and the same
                email address or phone number
                you provided when making the
                reservation.
              </p>
            </div>
          </div>
        )}

        {/* =====================================
            BOOKING RESULT
        ====================================== */}

        {result && (
          <div className="mx-auto mt-10 max-w-4xl">

            {/* =================================
                STATUS
            ================================== */}

            <div
              className={`rounded-3xl border p-6 sm:p-8 ${statusConfig.container}`}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-start gap-4">

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${statusConfig.iconBox}`}
                  >
                    <StatusIcon
                      size={25}
                    />
                  </div>

                  <div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${statusConfig.text}`}
                    >
                      Booking status
                    </p>

                    <h2
                      className={`mt-1 text-2xl font-bold ${statusConfig.text}`}
                    >
                      {statusConfig.title}
                    </h2>

                    <p
                      className={`mt-2 max-w-xl text-sm leading-6 ${statusConfig.text}`}
                    >
                      {
                        statusConfig.description
                      }
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex w-fit rounded-full px-4 py-2 text-xs font-bold ${statusConfig.badge}`}
                >
                  {statusConfig.label}
                </span>
              </div>
            </div>

            {/* =================================
                MAIN BOOKING CARD
            ================================== */}

            <div className="mt-6 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

              {/* PROPERTY */}

              <div className="p-5 sm:p-7">

                <div className="flex flex-col gap-5 sm:flex-row">

                  {property?.images?.[0] ? (
                    <img
                     src={
  typeof property.images[0] === "string"
    ? property.images[0]
    : property.images[0]?.url
}
                      alt={
                        property.title ||
                        "Property"
                      }
                      className="h-52 w-full rounded-2xl object-cover sm:h-36 sm:w-52"
                    />
                  ) : (
                    <div className="flex h-52 w-full items-center justify-center rounded-2xl bg-gray-100 text-gray-400 sm:h-36 sm:w-52">
                      <MapPin
                        size={28}
                      />
                    </div>
                  )}

                  <div className="flex-1">

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Your stay
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-gray-950">
                      {property?.title ||
                        property?.name ||
                        "ApexHomes property"}
                    </h3>

                    {property?.location && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin
                          size={16}
                        />

                        <span>
                          {typeof property.location ===
                          "string"
                            ? property.location
                            : [
                                property
                                  .location
                                  ?.city,
                                property
                                  .location
                                  ?.country,
                              ]
                                .filter(
                                  Boolean
                                )
                                .join(
                                  ", "
                                )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* REFERENCE */}

              <div className="border-t border-gray-100 p-5 sm:p-7">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Booking reference
                    </p>

                    <p className="mt-1 text-lg font-bold tracking-wider text-gray-950">
                      {result.bookingReference}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Reservation
                    </p>

                    <p className="mt-1 text-sm font-semibold capitalize text-gray-900">
                      {statusConfig.label}
                    </p>
                  </div>
                </div>
              </div>

              {/* DATES */}

              <div className="grid border-t border-gray-100 sm:grid-cols-2">

                <div className="border-b border-gray-100 p-5 sm:border-b-0 sm:border-r sm:p-7">

                  <div className="flex items-center gap-2 text-gray-400">
                    <CalendarDays
                      size={17}
                    />

                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Check-in
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-bold text-gray-950">
                    {formatDate(
                      result.checkIn
                    )}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Arrival date
                  </p>
                </div>

                <div className="p-5 sm:p-7">

                  <div className="flex items-center gap-2 text-gray-400">
                    <CalendarDays
                      size={17}
                    />

                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Check-out
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-bold text-gray-950">
                    {formatDate(
                      result.checkOut
                    )}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Departure date
                  </p>
                </div>
              </div>

              {/* BOOKING SUMMARY */}

              <div className="grid border-t border-gray-100 sm:grid-cols-3">

                {/* Guests */}

                <div className="border-b border-gray-100 p-5 sm:border-b-0 sm:border-r sm:p-7">

                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={17} />

                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Guests
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-bold text-gray-950">
                    {result.guests || 1}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {Number(
                      result.guests || 1
                    ) === 1
                      ? "Guest"
                      : "Guests"}
                  </p>
                </div>

                {/* Payment */}

                <div className="border-b border-gray-100 p-5 sm:border-b-0 sm:border-r sm:p-7">

                  <div className="flex items-center gap-2 text-gray-400">
                    <CreditCard
                      size={17}
                    />

                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Payment
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-bold text-gray-950">
                    {getPaymentLabel(
                      result.payment
                        ?.status
                    )}
                  </p>

                  <p className="mt-1 text-xs capitalize text-gray-500">
                    {result.payment
                      ?.method ||
                      "Payment method"}
                  </p>
                </div>

                {/* Total */}

                <div className="p-5 sm:p-7">

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Total
                  </p>

                  <p className="mt-2 text-lg font-bold text-gray-950">
                    {formatCurrency(
                      total,
                      currency
                    )}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Booking total
                  </p>
                </div>
              </div>

              {/* GUEST INFORMATION */}

              {guest && (
                <div className="border-t border-gray-100 p-5 sm:p-7">

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Guest information
                  </p>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">

                    <div>
                      <p className="text-xs text-gray-400">
                        Name
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {guest.firstName}{" "}
                        {guest.lastName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Email
                      </p>

                      <p className="mt-1 break-all text-sm font-semibold text-gray-900">
                        {guest.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Phone
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {guest.phone}
                      </p>
                    </div>

                    {guest.country && (
                      <div>
                        <p className="text-xs text-gray-400">
                          Country
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {guest.country}
                        </p>
                      </div>
                    )}
                  </div>

                  {guest.specialRequests && (
                    <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                      <p className="text-xs font-semibold text-gray-500">
                        Special requests
                      </p>

                      <p className="mt-1 text-sm leading-6 text-gray-700">
                        {
                          guest.specialRequests
                        }
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* =================================
                  UNDER REVIEW
              ================================== */}

              {bookingStatus ===
                "pending" && (
                <div className="border-t border-gray-100 p-5 sm:p-7">

                  <div className="rounded-2xl bg-amber-50 p-5">

                    <div className="flex gap-3">

                      <Clock3
                        size={21}
                        className="mt-0.5 shrink-0 text-amber-600"
                      />

                      <div>

                        <h4 className="font-semibold text-amber-900">
                          What happens next?
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-amber-800">
                          Your reservation has
                          been received and is
                          currently under review.
                          Once an admin confirms
                          your booking, this page
                          will automatically show
                          your reservation as
                          confirmed.
                        </p>

                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================
                  CONFIRMED
              ================================== */}

              {bookingStatus ===
                "confirmed" && (
                <div className="border-t border-gray-100 p-5 sm:p-7">

                  <div className="rounded-2xl bg-green-50 p-5">

                    <div className="flex gap-3">

                      <CheckCircle2
                        size={21}
                        className="mt-0.5 shrink-0 text-green-600"
                      />

                      <div>

                        <h4 className="font-semibold text-green-900">
                          You're all set
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-green-800">
                          Your booking has been
                          confirmed. Keep your
                          booking reference
                          somewhere safe in case
                          you need to access this
                          reservation again.
                        </p>

                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================
                  CANCELLED
              ================================== */}

              {bookingStatus ===
                "cancelled" && (
                <div className="border-t border-gray-100 p-5 sm:p-7">

                  <div className="rounded-2xl bg-red-50 p-5">

                    <div className="flex gap-3">

                      <XCircle
                        size={21}
                        className="mt-0.5 shrink-0 text-red-600"
                      />

                      <div>

                        <h4 className="font-semibold text-red-900">
                          Booking cancelled
                        </h4>

                        {result.cancellationReason ? (
                          <p className="mt-1 text-sm leading-6 text-red-800">
                            {
                              result.cancellationReason
                            }
                          </p>
                        ) : (
                          <p className="mt-1 text-sm leading-6 text-red-800">
                            This reservation has
                            been cancelled.
                          </p>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* =================================
                ACTION BUTTONS
            ================================== */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={
                  handleNewSearch
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                <RefreshCw
                  size={16}
                />

                Find another booking
              </button>

              <Link
                to="/explore"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Explore properties

                <ArrowRight
                  size={16}
                />
              </Link>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default BookingLookup;