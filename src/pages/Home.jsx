import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import SearchBar from "../components/search/SearchBar";
import PropertyCard from "../components/property/PropertyCard";
import { useProperties } from "../context/PropertyContext";
import MoreFeed from "../components/home/MoreFeed";

const HERO_VIDEO =
 "https://res.cloudinary.com/dcoojr90p/video/upload/v1788008663/hero_gyu810.mp4"
  

const Home = () => {
  const navigate = useNavigate();

  const {
    properties = [],
    loading,
    error,
  } = useProperties();

  /*
   * Featured properties
   */
  const featuredProperties = useMemo(() => {
    return properties
      .filter(
        (property) =>
          property?.isFeatured === true ||
          property?.featured === true
      )
      .slice(0, 8);
  }, [properties]);

  /*
   * If there are no featured properties,
   * show normal published properties.
   */
  const popularProperties = useMemo(() => {
    if (featuredProperties.length > 0) {
      return featuredProperties;
    }

    return properties.slice(0, 8);
  }, [
    properties,
    featuredProperties,
  ]);

  /*
   * Search → Explore
   */
  const handleSearch = (searchData = {}) => {
    const params = new URLSearchParams();

    if (searchData.location) {
      params.set(
        "location",
        searchData.location
      );
    }

    if (searchData.checkIn) {
      params.set(
        "checkIn",
        searchData.checkIn
      );
    }

    if (searchData.checkOut) {
      params.set(
        "checkOut",
        searchData.checkOut
      );
    }

    if (searchData.guests) {
      params.set(
        "guests",
        searchData.guests
      );
    }

    const query = params.toString();

    navigate(
      query
        ? `/explore?${query}`
        : "/explore"
    );
  };

  return (
    <main className="bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[720px] overflow-hidden">

        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Extra cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-24 lg:px-8">

          <div className="w-full max-w-5xl">

            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
              <Sparkles size={14} />

              Find your perfect stay
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Stay somewhere
              <br />

              <span className="text-white/70">
                worth remembering.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Discover beautiful homes, apartments,
              villas and unique stays for your next
              trip.
            </p>

           

            {/* Quick links */}
            <div className="mt-6 flex flex-wrap items-center gap-3">

              <Link
                to="/explore"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
              >
                Explore stays
              </Link>

              <Link
                to="/ai"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <Sparkles size={15} />
                Ask Apex AI
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR STAYS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="mb-10 flex items-end justify-between">

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Explore
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Popular stays
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Places guests are loving right now.
            </p>
          </div>

          <Link
            to="/explore"
            className="hidden items-center gap-2 text-sm font-semibold text-gray-950 transition hover:text-gray-600 sm:flex"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          popularProperties.length === 0 && (
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-12 text-center">

              <MapPin
                size={32}
                className="mx-auto text-gray-400"
              />

              <h3 className="mt-4 font-semibold text-gray-900">
                No properties available yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                New stays will appear here once they
                are published.
              </p>

              <Link
                to="/explore"
                className="mt-6 inline-flex rounded-full bg-gray-950 px-5 py-3 text-sm font-semibold text-white"
              >
                Explore properties
              </Link>
            </div>
          )}

        {/* Properties */}
      
{/* Properties */}
{!loading &&
  !error &&
  popularProperties.length > 0 && (
    <>
      {/* Mobile: show only 2 properties */}
      <div className="grid grid-cols-1 gap-7 sm:hidden">
        {popularProperties
          .slice(0, 2)
          .map((property) => (
            <PropertyCard
              key={
                property._id ||
                property.id
              }
              property={property}
            />
          ))}
      </div>

      {/* Tablet + Desktop: existing layout */}
      <div className="hidden grid-cols-2 gap-7 sm:grid lg:grid-cols-4">
        {popularProperties.map(
          (property) => (
            <PropertyCard
              key={
                property._id ||
                property.id
              }
              property={property}
            />
          )
        )}
      </div>

      {/* Mobile: view more */}
      {popularProperties.length > 2 && (
        <div className="mt-8 sm:hidden">
          <Link
            to="/explore"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-50"
          >
            View more stays
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </>
  )}


      </section>


      <MoreFeed />

      {/* =====================================================
          WHY APEX
      ====================================================== */}

      <section className="border-y border-gray-100 bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="mb-12 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Why ApexHomes
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
              Everything you need for a better stay.
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">

            {/* Location */}
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950 text-white">
                <MapPin size={20} />
              </div>

              <h3 className="font-semibold text-gray-950">
                Great locations
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Find stays in places you actually
                want to visit.
              </p>
            </div>

            {/* Booking */}
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950 text-white">
                <ShieldCheck size={20} />
              </div>

              <h3 className="font-semibold text-gray-950">
                Simple booking
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Search, choose your dates and book
                without unnecessary complexity.
              </p>
            </div>

            {/* AI */}
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950 text-white">
                <Sparkles size={20} />
              </div>

              <h3 className="font-semibold text-gray-950">
                Apex AI
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Tell Apex AI what kind of stay you're
                looking for and get recommendations.
              </p>

              <Link
                to="/ai"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-950"
              >
                Try Apex AI
                <ArrowRight size={15} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-gray-950">

        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">

          <Sparkles
            size={28}
            className="mx-auto text-white"
          />

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your next stay is waiting.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400">
            Browse available properties or let Apex AI
            help you find something that fits.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/explore"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
            >
              Explore properties
            </Link>

            <Link
              to="/ai"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Sparkles size={16} />
              Talk to Apex AI
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;