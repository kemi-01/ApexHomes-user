// src/services/reviewService.js

import api from "./api";

/**
 * Get reviews for a property
 */
export const getPropertyReviews =
  async (propertyId) => {
    if (!propertyId) {
      throw new Error(
        "Property ID is required."
      );
    }

    const response = await api.get(
      `/reviews/property/${propertyId}`
    );

    return response.data;
  };

/**
 * Create a review
 *
 * Since customers don't have accounts,
 * the backend should verify the reviewer
 * using their booking information.
 */
export const createReview = async ({
  propertyId,
  bookingReference,
  email,
  phone,
  rating,
  comment,
}) => {
  const response = await api.post(
    "/reviews",
    {
      propertyId,
      bookingReference,
      email,
      phone,
      rating,
      comment,
    }
  );

  return response.data;
};

/**
 * Get one review
 */
export const getReviewById =
  async (reviewId) => {
    const response = await api.get(
      `/reviews/${reviewId}`
    );

    return response.data;
  };