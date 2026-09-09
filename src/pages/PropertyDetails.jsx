import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
} from "lucide-react";

import PropertyGallery from "../components/property/PropertyGallery";
import PropertyInfo from "../components/property/PropertyInfo";
import AmenityList from "../components/property/AmenityList";

import LocationMap from "../components/property/LocationMap";
import BookingCard from "../components/booking/BookingCard";

import {
  useProperties,
} from "../context/PropertyContext";

const PropertyDetails = () => {
  const { id } = useParams();

  const {
    getPropertyById,
  } = useProperties();

  const [property, setProperty] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    const loadProperty =
      async () => {
        try {
          setLoading(true);

          const result =
            await getPropertyById(id);

          if (mounted) {
            setProperty(result);
          }
        } catch (err) {
          console.error(err);

          if (mounted) {
            setError(
              "Unable to load this property."
            );
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    loadProperty();

    return () => {
      mounted = false;
    };
  }, [id, getPropertyById]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2
          size={30}
          className="animate-spin"
        />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">
          Property not found
        </h1>

        <p className="mt-2 text-gray-500">
          {error ||
            "This property may have been removed."}
        </p>

        <Link
          to="/explore"
          className="mt-6 inline-flex rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Back */}
        <Link
          to="/explore"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-950"
        >
          <ArrowLeft size={16} />
          Back to Explore
        </Link>

        {/* Gallery */}
        <PropertyGallery
          property={property}
          images={property.images}
        />

        {/* Main content */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <PropertyInfo
              property={property}
            />

            <div className="my-10 border-t border-gray-100" />

            {/* Amenities */}
            <section>
              <h2 className="text-xl font-bold">
                What this place offers
              </h2>

              <div className="mt-6">
                <AmenityList
                  amenities={
                    property.amenities ||
                    []
                  }
                />
              </div>
            </section>

            {/* Description */}
        
            

            {/* Location */}
            <div className="my-10 border-t border-gray-100" />

            <section>
             

              <div className="mt-5">
                <LocationMap
                  property={property}
                />
              </div>
            </section>
          </div>

          {/* Booking */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <BookingCard
              property={property}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;