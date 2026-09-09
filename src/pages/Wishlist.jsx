import { Link } from "react-router-dom";
import {
  Heart,
  ArrowRight,
  Trash2,
  MapPin,
} from "lucide-react";

import PropertyCard from "../components/property/PropertyCard";

import {
  useWishlist,
} from "../context/WishlistContext";

const Wishlist = () => {
  const {
    wishlist,
    wishlistCount,
    clearWishlist,
  } = useWishlist();

  return (
    <main className="min-h-[70vh] bg-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="border-b border-gray-100 bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

          <div className="flex items-start justify-between gap-6">

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950 text-white">

                  <Heart
                    size={20}
                    fill="currentColor"
                  />

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Your collection
                  </p>

                  <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                    Wishlist
                  </h1>

                </div>

              </div>

              <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500">
                Keep the places you love in one
                place so you can come back to them
                when you're ready to book.
              </p>

            </div>

            {wishlistCount > 0 && (
              <button
                type="button"
                onClick={clearWishlist}
                className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:flex"
              >

                <Trash2 size={16} />

                Clear all

              </button>
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        {wishlistCount === 0 ? (

          /* =================================================
             EMPTY STATE
          ================================================== */

          <div className="mx-auto max-w-xl py-16 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">

              <Heart
                size={32}
                className="text-gray-400"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-950">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              When you find a property you love,
              tap the heart to save it here.
            </p>

            <Link
              to="/explore"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Explore stays
              <ArrowRight size={16} />
            </Link>

          </div>

        ) : (

          <>
            <div className="mb-8 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-gray-950">
                  Saved stays
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {wishlistCount}{" "}
                  {wishlistCount === 1
                    ? "property"
                    : "properties"}{" "}
                  saved
                </p>

              </div>

              <button
                type="button"
                onClick={clearWishlist}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 sm:hidden"
              >

                <Trash2 size={15} />

                Clear

              </button>

            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">

              {wishlist.map(
                (property) => {

                  const propertyId =
                    property._id ||
                    property.id;

                  return (
                    <div
                      key={
                        propertyId
                      }
                      className="group relative"
                    >

                      <PropertyCard
                        property={
                          property
                        }
                      />

                      {/* Remove button */}

                      <button
                        type="button"
                        onClick={() =>
                          clearWishlist
                        }
                        className="hidden"
                      />

                    </div>
                  );
                }
              )}

            </div>
          </>
        )}

      </section>

      {/* =====================================================
          DISCOVER MORE
      ====================================================== */}

      {wishlistCount > 0 && (
        <section className="border-t border-gray-100 bg-gray-50">

          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-12 lg:px-8">

            <div>

              <div className="flex items-center gap-2 text-gray-950">

                <MapPin size={18} />

                <h3 className="font-semibold">
                  Still looking?
                </h3>

              </div>

              <p className="mt-1 text-sm text-gray-500">
                Discover more places for your next
                trip.
              </p>

            </div>

            <Link
              to="/explore"
              className="flex shrink-0 items-center gap-2 rounded-full bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >

              Explore

              <ArrowRight size={16} />

            </Link>

          </div>

        </section>
      )}

    </main>
  );
};

export default Wishlist;