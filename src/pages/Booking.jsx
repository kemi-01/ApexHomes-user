import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import BookingSummary from "../components/booking/BookingSummary";
import GuestForm from "../components/booking/GuestForm";
import PaymentForm from "../components/booking/PaymentForm";

import { useBooking } from "../context/BookingContext";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    booking,
    createBooking,
    loading,
    error,
  } = useBooking();

  const property =
    booking?.property ||
    location.state?.property;

  const [guest, setGuest] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
  });

  const [payment, setPayment] = useState({
    method: "card",
  });

  const [formError, setFormError] = useState("");

  if (!property) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">
          No booking selected
        </h1>

        <p className="mt-2 text-gray-500">
          Choose a property before starting a
          booking.
        </p>

        <Link
          to="/explore"
          className="mt-6 inline-flex rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white"
        >
          Explore properties
        </Link>
      </div>
    );
  }

  const handleSubmit = async () => {
    setFormError("");

    /* -----------------------------------------
       VALIDATE GUEST
    ----------------------------------------- */

    if (!guest.firstName.trim()) {
      setFormError("Please enter your first name.");
      return;
    }

    if (!guest.lastName.trim()) {
      setFormError("Please enter your last name.");
      return;
    }

    if (!guest.email.trim()) {
      setFormError("Please enter your email address.");
      return;
    }

    if (!guest.phone.trim()) {
      setFormError("Please enter your phone number.");
      return;
    }

    if (!booking?.checkIn || !booking?.checkOut) {
      setFormError(
        "Please select your check-in and check-out dates."
      );
      return;
    }

    if (!booking?.guests) {
      setFormError(
        "Please select the number of guests."
      );
      return;
    }

    try {
      /*
       * Payment is currently a DEMO payment UI.
       *
       * We send only the payment method.
       * Never send card number or CVV to our backend
       * for this fake payment implementation.
       */

      const result = await createBooking({
        propertyId:
          property._id || property.id,

        guest: {
          firstName: guest.firstName.trim(),
          lastName: guest.lastName.trim(),
          email: guest.email.trim(),
          phone: guest.phone.trim(),
          country: guest.country?.trim() || "",
          specialRequests:
            guest.specialRequests?.trim() || "",
        },

        payment: {
          method: payment.method || "card",
        },

        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
      });

      const bookingId =
        result?.booking?._id ||
        result?.booking?.id ||
        result?.bookingId ||
        result?._id ||
        result?.id;

      if (!bookingId) {
        throw new Error(
          "Booking was created, but no booking ID was returned."
        );
      }

      navigate(
        `/booking-confirmation/${bookingId}`,
        {
          state: {
            booking:
              result?.booking || result,
          },
        }
      );
    } catch (err) {
      console.error(
        "Booking submission error:",
        err
      );

      setFormError(
        err?.message ||
          "Unable to complete your booking."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">

        {/* Back */}
        <Link
          to={`/properties/${
            property._id || property.id
          }`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-950"
        >
          <ArrowLeft size={16} />
          Back to property
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-950">
          Confirm and book
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          No account required. We'll use your email
          and phone number to identify your booking.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* LEFT */}
          <div className="space-y-8">

            {/* Guest */}
            <GuestForm
              guest={guest}
              onChange={setGuest}
            />

            {/* Payment */}
            <PaymentForm
              payment={payment}
              onChange={setPayment}
              total={
                booking?.pricing?.total ||
                booking?.total ||
                0
              }
            />

            {/* Errors */}
            {formError && (
              <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
                {formError}
              </div>
            )}

            {error && !formError && (
              <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Confirm */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-2xl bg-gray-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : "Confirm booking"}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck size={14} />

              Your booking information is securely
              processed.
            </div>
          </div>

          {/* RIGHT */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <BookingSummary
              property={property}
              booking={booking}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Booking;