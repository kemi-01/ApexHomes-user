import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import PropertyCard from "../components/property/PropertyCard";
import SearchBar from "../components/search/SearchBar";

import {
  useProperties,
} from "../context/PropertyContext";

const Explore = () => {
  const [searchParams] =
    useSearchParams();

  const {
    properties,
    loading,
    error,
  } = useProperties();

  const [location, setLocation] =
    useState(
      searchParams.get("location") || ""
    );

    const [searchMessage, setSearchMessage] =
  useState("");
  /*
   * ---------------------------------------------------------
   * PROPERTY TYPE
   * ---------------------------------------------------------
   */

  const [selectedType, setSelectedType] =
    useState("");

  /*
   * ---------------------------------------------------------
   * KEEP SEARCH PARAMETER IN SYNC
   * ---------------------------------------------------------
   */

  useEffect(() => {
    setLocation(
      searchParams.get("location") || ""
    );
  }, [searchParams]);

  /*
   * ---------------------------------------------------------
   * FILTER PROPERTIES
   * ---------------------------------------------------------
   */

  const filteredProperties = useMemo(() => {
    const searchLocation =
      location.trim().toLowerCase();

    return properties.filter((property) => {

      /*
       * -------------------------------------------------------
       * LOCATION FILTER
       * -------------------------------------------------------
       */

      const locationText = [
        property.city,
        property.state,
        property.country,

        property.location?.city,
        property.location?.state,
        property.location?.country,

        property.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (
        searchLocation &&
        !locationText.includes(searchLocation)
      ) {
        return false;
      }

      /*
       * -------------------------------------------------------
       * PROPERTY TYPE FILTER
       * -------------------------------------------------------
       */

      if (
        selectedType &&
        String(
          property.propertyType || ""
        ).toLowerCase() !==
          String(
            selectedType
          ).toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [
    properties,
    location,
    selectedType,
  ]);

  /*
   * ---------------------------------------------------------
   * SEARCH
   * ---------------------------------------------------------
   */

  const handleSearch = (data) => {
  const searchedLocation =
    data?.location?.trim() || "";

  const searchedType =
    data?.propertyType || "";

  setLocation(searchedLocation);
  setSelectedType(searchedType);

  if (searchedLocation && searchedType) {
    setSearchMessage(
      `Showing ${searchedType} stays in ${searchedLocation}`
    );
  } else if (searchedLocation) {
    setSearchMessage(
      `Showing stays in ${searchedLocation}`
    );
  } else if (searchedType) {
    setSearchMessage(
      `Showing ${searchedType} stays`
    );
  } else {
    setSearchMessage("Showing all available stays");
  }

  setTimeout(() => {
    setSearchMessage("");
  }, 3000);
};

  /*
   * ---------------------------------------------------------
   * HEADER 3D MOTION
   * ---------------------------------------------------------
   */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(
      mouseY,
      [-0.5, 0.5],
      [3, -3]
    ),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(
      mouseX,
      [-0.5, 0.5],
      [-3, 3]
    ),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };


  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          PREMIUM HEADER
      ====================================================== */}

      {/* =====================================================
          PREMIUM HEADER
      ====================================================== */}

      <section
        className="relative isolate overflow-hidden border-b border-gray-100 bg-gray-950"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

        {/* =================================================
            BACKGROUND IMAGE
        ================================================== */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dcoojr90p/image/upload/v1788010723/Interior_Design_Luxury_Mountain_Home_bluqai.jpg')",
          }}
        />

        {/* Dark cinematic overlay */}

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/75" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />


        {/* =================================================
            ORIGINAL AMBIENT BACKGROUND
        ================================================== */}

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/[0.06] blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-white/[0.04] blur-3xl"
        />


        {/* =================================================
            GRID TEXTURE
        ================================================== */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize:
              "70px 70px",
          }}
        />


        {/* =================================================
            HEADER CONTENT
        ================================================== */}

        <motion.div
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }}
          className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20"
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            {/* Eyebrow */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl">

              <span className="relative flex h-2 w-2">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />

              </span>

              Explore ApexHomes

            </div>


            {/* Heading */}

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">

              Find a place worth

              <span className="block text-white/55">
                staying for.
              </span>

            </h1>


            <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              Browse beautiful homes, apartments,
              villas and unique spaces made for
              your next trip.
            </p>


            {/* Search */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="relative z-20 mt-9 max-w-4xl"
            >

              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl">

                <SearchBar
                  initialValues={{
                    location,
                    propertyType:
                      selectedType,
                  }}
                  onSearch={handleSearch}
                />
{searchMessage && (
  <motion.div
    initial={{
      opacity: 0,
      y: -8,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: -8,
    }}
    className="mt-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-xl"
  >
    ✓ {searchMessage}
  </motion.div>
)}
              </div>

            </motion.div>

          </motion.div>

        </motion.div>

      </section>




      {/* =====================================================
          RESULTS
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-8">


        {/* Results heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Available stays
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Explore properties
            </h2>

          </div>


          <div className="rounded-full border border-gray-100 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500">

            {loading
              ? "Finding properties..."
              : `${filteredProperties.length} ${
                  filteredProperties.length ===
                  1
                    ? "property"
                    : "properties"
                } found`}

          </div>

        </motion.div>


        {/* ===================================================
            LOADING
        ==================================================== */}

        {loading ? (

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {Array.from({
              length: 8,
            }).map((_, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.06,
                }}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
              >

                <div className="relative h-72 overflow-hidden bg-gray-100">

                  <motion.div
                    animate={{
                      x: [
                        "-100%",
                        "200%",
                      ],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  />

                </div>

                <div className="space-y-3 p-5">

                  <div className="h-4 w-3/4 rounded-full bg-gray-100" />

                  <div className="h-3 w-1/2 rounded-full bg-gray-100" />

                  <div className="h-3 w-2/3 rounded-full bg-gray-100" />

                </div>

              </motion.div>

            ))}

          </div>

        ) : error ? (

          /* =================================================
             ERROR
          ================================================== */

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center"
          >

            <h2 className="font-semibold text-red-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

          </motion.div>

        ) : filteredProperties.length === 0 ? (

          /* =================================================
             NO RESULTS
          ================================================== */

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-50 px-6 py-24 text-center"
          >

            {/* Decorative circles */}

            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-white blur-2xl" />

            <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-white blur-2xl" />


            <div className="relative">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">

                <span className="text-2xl">
                  ✦
                </span>

              </div>


              <h2 className="mt-6 text-xl font-bold text-gray-950">
                No properties found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find a stay matching
                your search. Try another location
                or property type.
              </p>

            </div>

          </motion.div>

        ) : (

          /* =================================================
             PROPERTY GRID
          ================================================== */

          <motion.div
            layout
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4"
          >

            {filteredProperties.map(
              (property, index) => (

                <motion.div
                  key={
                    property._id ||
                    property.id
                  }
                  layout
                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.45,
                    delay:
                      Math.min(
                        index * 0.06,
                        0.5
                      ),
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="relative"
                >

                  {/* Soft shadow behind card */}

                  <div className="pointer-events-none absolute -inset-1 rounded-[2rem] bg-gray-950/[0.03] opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

                  <PropertyCard
                    property={property}
                  />

                </motion.div>

              )
            )}

          </motion.div>

        )}

      </main>

    </div>
  );
};

export default Explore;