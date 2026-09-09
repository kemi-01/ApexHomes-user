import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProperties,
  getPropertyById as fetchPropertyById,
} from "../services/propertyService";

const PropertyContext =
  createContext(null);

export const PropertyProvider = ({
  children,
}) => {
  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProperties = useCallback(
    async (params = {}) => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getProperties(params);

        const propertyList =
          Array.isArray(response)
            ? response
            : response?.properties || [];

        setProperties(
          Array.isArray(propertyList)
            ? propertyList
            : []
        );
      } catch (err) {
        console.error(
          "Property loading error:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load properties."
        );

        setProperties([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getPropertyById = useCallback(
    async (id) => {
      if (!id) {
        throw new Error(
          "Property ID is required."
        );
      }

      const existing =
        properties.find(
          (property) =>
            String(
              property._id ||
                property.id
            ) === String(id)
        );

      if (existing) {
        return existing;
      }

      const response =
        await fetchPropertyById(id);

      return (
        response?.property ||
        response?.data?.property ||
        response?.data ||
        response
      );
    },
    [properties]
  );

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const value = {
    properties,
    loading,
    error,
    loadProperties,
    getPropertyById,
    setProperties,
  };

  return (
    <PropertyContext.Provider
      value={value}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context =
    useContext(PropertyContext);

  if (!context) {
    throw new Error(
      "useProperties must be used inside PropertyProvider"
    );
  }

  return context;
};

export default PropertyContext;