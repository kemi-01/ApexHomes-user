import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import {
  createBooking as createBookingRequest,
  lookupBooking as lookupBookingRequest,
} from "../services/bookingService";

const BookingContext = createContext(null);

export const BookingProvider = ({
  children,
}) => {
  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /* -----------------------------------------
     START BOOKING
  ----------------------------------------- */

  const startBooking = useCallback(
    ({
      property,
      checkIn,
      checkOut,
      guests,
      nights = 0,
      total = 0,
      pricing = null,
    }) => {
      const bookingData = {
        property,
        checkIn,
        checkOut,
        guests,
        nights,
        total,
        pricing,
      };

      setBooking(bookingData);
      setError("");

      return bookingData;
    },
    []
  );

  /* -----------------------------------------
     CREATE BOOKING
  ----------------------------------------- */

  const createBooking = useCallback(
    async (bookingData) => {
      try {
        setLoading(true);
        setError("");

        const response =
          await createBookingRequest(
            bookingData
          );

        const result =
          response?.booking ||
          response;

        setBooking((previous) => ({
          ...(previous || {}),
          ...result,
        }));

        return response;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to create booking.";

        setError(message);

        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /* -----------------------------------------
     LOOKUP BOOKING
  ----------------------------------------- */

  const lookupBooking = useCallback(
    async ({
      reference,
      identifier,
    }) => {
      try {
        setLoading(true);
        setError("");

        const response =
          await lookupBookingRequest({
            reference,
            identifier,
          });

        const result =
          response?.booking ||
          response;

        setBooking(result);

        return result;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Booking not found.";

        setError(message);

        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /* -----------------------------------------
     CLEAR
  ----------------------------------------- */

  const clearBooking = useCallback(() => {
    setBooking(null);
    setError("");
  }, []);

  return (
    <BookingContext.Provider
      value={{
        booking,
        loading,
        error,
        startBooking,
        createBooking,
        lookupBooking,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(
    BookingContext
  );

  if (!context) {
    throw new Error(
      "useBooking must be used inside BookingProvider"
    );
  }

  return context;
};

export default BookingContext;