import api from "./api";

/**
 * Create customer booking
 *
 * Customer does not need an account.
 */
export const createBooking = async (
  bookingData
) => {
  if (!bookingData) {
    throw new Error(
      "Booking information is required."
    );
  }

  const response = await api.post(
    "/bookings",
    bookingData
  );

  return response.data;
};

/**
 * Get booking by ID
 *
 * This endpoint is currently protected
 * by admin authentication on your backend.
 *
 * Do not use this from the public guest flow
 * unless the backend route is intentionally
 * made public.
 */
export const getBookingById = async (
  bookingId
) => {
  if (!bookingId) {
    throw new Error(
      "Booking ID is required."
    );
  }

  const response = await api.get(
    `/bookings/${bookingId}`
  );

  return response.data;
};

/**
 * Guest booking lookup
 */
export const lookupBooking = async ({
  reference,
  identifier,
}) => {
  if (!reference) {
    throw new Error(
      "Booking reference is required."
    );
  }

  if (!identifier) {
    throw new Error(
      "Email or phone number is required."
    );
  }

  const response = await api.post(
    "/bookings/lookup",
    {
      bookingReference: reference,

      ...(identifier.includes("@")
        ? { email: identifier }
        : { phone: identifier }),
    }
  );

  return response.data;
};

/**
 * Check availability
 *
 * Backend uses POST /bookings/availability
 */
export const checkAvailability = async ({
  propertyId,
  checkIn,
  checkOut,
}) => {
  if (!propertyId) {
    throw new Error(
      "Property ID is required."
    );
  }

  const response = await api.post(
    "/bookings/availability",
    {
      propertyId,
      checkIn,
      checkOut,
    }
  );

  return response.data;
};

/**
 * Cancel booking
 *
 * Backend uses PATCH /bookings/:id/cancel
 */
export const cancelBooking = async ({
  bookingId,
  email,
  phone,
  reason,
}) => {
  if (!bookingId) {
    throw new Error(
      "Booking ID is required."
    );
  }

  const response = await api.patch(
    `/bookings/${bookingId}/cancel`,
    {
      email,
      phone,
      reason,
    }
  );

  return response.data;
};

/**
 * Calculate booking price
 *
 * Backend uses:
 * POST /bookings/price
 */
export const calculateBookingTotal =
  async ({
    propertyId,
    checkIn,
    checkOut,
  }) => {
    if (!propertyId) {
      throw new Error(
        "Property ID is required."
      );
    }

    const response = await api.post(
      "/bookings/price",
      {
        propertyId,
        checkIn,
        checkOut,
      }
    );

    return response.data;
  };