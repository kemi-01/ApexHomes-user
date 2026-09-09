import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  Sparkles,
} from "lucide-react";

const FEATURE_VIDEO =
  "https://res.cloudinary.com/dcoojr90p/video/upload/v1788008663/hero_gyu810.mp4";

const PROPERTY_IMAGES = [
  "https://res.cloudinary.com/dcoojr90p/image/upload/v1788010723/Interior_Design_Luxury_Mountain_Home_bluqai.jpg",
  "https://res.cloudinary.com/dcoojr90p/image/upload/v1788010785/Living_Room_gvz1d2.jpg",
  "https://res.cloudinary.com/dcoojr90p/image/upload/v1788010818/download_38_mpkguf.jpg",
];

const MoreFeed = () => {
  return (
    <section className="overflow-hidden bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">

          {/* =================================================
              VISUAL GALLERY
          ================================================== */}

          <div className="space-y-4">

            {/* =================================================
                MAIN VIDEO
            ================================================== */}

            <div className="group relative overflow-hidden rounded-[2rem] bg-gray-900 shadow-sm">

              <div className="aspect-[4/3] overflow-hidden sm:aspect-[16/10]">

                <video
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  src={FEATURE_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />

              </div>

              {/* Cinematic overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              {/* Top label */}

              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">

                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md">

                  <span className="h-1.5 w-1.5 rounded-full bg-white" />

                  ApexHomes

                </div>

              </div>

              {/* Bottom content */}

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-7 sm:left-7 sm:right-7">

                <div className="flex items-end justify-between gap-6">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                      Your next escape
                    </p>

                    <p className="mt-2 max-w-md text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      Make somewhere feel like home.
                    </p>

                  </div>

                  {/* Arrow */}

                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-gray-950 sm:flex">

                    <ArrowRight size={18} />

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                PROPERTY IMAGE GALLERY
            ================================================== */}

            <div className="grid grid-cols-3 gap-3 sm:gap-4">

              {/* IMAGE 1 */}

              <div className="group relative overflow-hidden rounded-[1.5rem] bg-gray-200">

                <img
                  src={PROPERTY_IMAGES[0]}
                  alt="Luxury mountain home interior"
                  className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />

              </div>


              {/* IMAGE 2 */}

              <div className="group relative mt-6 overflow-hidden rounded-[1.5rem] bg-gray-200 sm:mt-10">

                <img
                  src={PROPERTY_IMAGES[1]}
                  alt="Beautiful living room"
                  className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />

              </div>


              {/* IMAGE 3 */}

              <div className="group relative mt-2 overflow-hidden rounded-[1.5rem] bg-gray-200 sm:mt-4">

                <img
                  src={PROPERTY_IMAGES[2]}
                  alt="ApexHomes property"
                  className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />

              </div>

            </div>

          </div>


          {/* =================================================
              CONTENT
          ================================================== */}

          <div className="max-w-xl">

            {/* Icon */}

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white">

              <Compass
                size={20}
                strokeWidth={1.8}
              />

            </div>


            {/* Eyebrow */}

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Travel your way
            </p>


            {/* Heading */}

            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-gray-950 sm:text-5xl">

              More than a place

              <br />

              to stay.

            </h2>


            {/* Description */}

            <p className="mt-6 text-base leading-7 text-gray-500">

              The right stay can change the way you
              experience a place. Find somewhere
              comfortable, beautiful and suited to
              the way you want to travel.

            </p>


            <p className="mt-4 text-base leading-7 text-gray-500">

              From quick weekend escapes to longer
              stays, discover spaces that make every
              trip feel a little more like your own.

            </p>


            {/* =================================================
                FEATURE POINTS
            ================================================== */}

            <div className="mt-8 space-y-4">

              {/* Feature 1 */}

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100">

                  <span className="h-1.5 w-1.5 rounded-full bg-gray-950" />

                </div>

                <span className="text-sm font-medium text-gray-700">
                  Spaces worth coming home to
                </span>

              </div>


              {/* Feature 2 */}

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100">

                  <span className="h-1.5 w-1.5 rounded-full bg-gray-950" />

                </div>

                <span className="text-sm font-medium text-gray-700">
                  Stays for every kind of trip
                </span>

              </div>


              {/* Feature 3 */}

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100">

                  <span className="h-1.5 w-1.5 rounded-full bg-gray-950" />

                </div>

                <span className="text-sm font-medium text-gray-700">
                  Find your match with Apex AI
                </span>

              </div>

            </div>


            {/* =================================================
                BUTTONS
            ================================================== */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/explore"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >

                Explore stays

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>


              <Link
                to="/ai"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
              >

                <Sparkles size={16} />

                Find with Apex AI

              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default MoreFeed;