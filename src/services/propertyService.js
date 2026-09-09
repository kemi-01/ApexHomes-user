// src/services/propertyService.js

import api from "./api";

/**
 * Get all properties
 */
export const getProperties = async (
  params = {}
) => {
  const response = await api.get(
    "/properties",
    {
      params,
    }
  );

  return response.data;
};

/**
 * Get one property
 */
export const getPropertyById = async (
  propertyId
) => {
  if (!propertyId) {
    throw new Error(
      "Property ID is required."
    );
  }

  const response = await api.get(
    `/properties/${propertyId}`
  );

  return response.data;
};

/**
 * Search properties
 */
export const searchProperties = async (
  searchParams = {}
) => {
  const response = await api.get(
    "/properties/search",
    {
      params: searchParams,
    }
  );

  return response.data;
};

/**
 * Get featured properties
 */
export const getFeaturedProperties =
  async () => {
    const response = await api.get(
      "/properties/featured"
    );

    return response.data;
  };

/**
 * Get properties by location
 */
export const getPropertiesByLocation =
  async (location) => {
    const response = await api.get(
      "/properties",
      {
        params: {
          location,
        },
      }
    );

    return response.data;
  };

/**
 * Get available properties
 */
export const getAvailableProperties =
  async ({
    checkIn,
    checkOut,
    guests,
    location,
  } = {}) => {
    const response = await api.get(
      "/properties/available",
      {
        params: {
          checkIn,
          checkOut,
          guests,
          location,
        },
      }
    );

    return response.data;
  };