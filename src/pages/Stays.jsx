import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Home,
  Building2,
  Castle,
  WandSparkles,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

const STAYS_VIDEO =
 "https://res.cloudinary.com/dcoojr90p/video/upload/v1788008485/home_q5zmhx.mp4"
  

const Stays = () => {
  return (
    <main className="overflow-hidden bg-[#f7f7f5] text-gray-950">

      {/* =====================================================
          CINEMATIC HERO
      ====================================================== */}

      <section className="relative min-h-[780px] overflow-hidden bg-black">

        {/* Video */}

        <motion.video
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 h-full w-full object-cover"
          src={STAYS_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Cinematic overlays */}

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/10 to-black/80" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />


        {/* Decorative glow */}

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-white/[0.08] blur-[120px]"
        />


        {/* Hero content */}

        <div className="relative z-10 mx-auto flex min-h-[780px] max-w-7xl flex-col justify-between px-6 py-10 lg:px-8 lg:py-14">

          {/* Top */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl">

              <span className="h-1.5 w-1.5 rounded-full bg-white" />

              ApexHomes stays

            </div>


            <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs text-white/70 backdrop-blur-xl sm:flex">

              <MapPin size={13} />

              Find somewhere unforgettable

            </div>

          </div>


          {/* Main */}

          <div className="pb-16 pt-24">

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.2,
              }}
              className="max-w-5xl"
            >

              


              

             


             

            </motion.div>

          </div>


          {/* Bottom */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
            className="flex items-center justify-between"
          >

            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Homes · Apartments · Villas · Unique stays
            </p>


            <div className="flex items-center gap-2 text-xs text-white/50">

              Scroll to explore

              <ChevronDown
                size={15}
                className="animate-bounce"
              />

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          FLOATING INTRO PANEL
      ====================================================== */}

      <section className="relative z-20 -mt-10 px-6 lg:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-6xl rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-8 lg:p-10"
        >

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Your stay starts here
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Where do you want to wake up?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                Explore places designed for slow mornings,
                weekend adventures, work trips and everything
                in between.
              </p>

            </div>


            <Link
              to="/explore"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Start exploring

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

          </div>

        </motion.div>

      </section>


      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Explore by stay
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Something for every trip.
            </h2>

          </div>


          <Link
            to="/explore"
            className="group inline-flex items-center gap-2 text-sm font-semibold"
          >
            View all stays

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>


       <div className="mt-12 grid gap-5 md:grid-cols-3">

  {/* HOME */}

  <CategoryCard
    title="Homes"
    description="Space to settle in, slow down and stay awhile."
    icon={<Home size={24} />}
    number="01"
    image="https://res.cloudinary.com/dcoojr90p/image/upload/v1788010723/Interior_Design_Luxury_Mountain_Home_bluqai.jpg"
    className="md:translate-y-8"
  />


  {/* APARTMENTS */}

  <CategoryCard
    title="Apartments"
    description="Modern spaces in the heart of where you want to be."
    icon={<Building2 size={24} />}
    number="02"
    image="https://res.cloudinary.com/dcoojr90p/image/upload/v1788010785/Living_Room_gvz1d2.jpg"
  />


  {/* UNIQUE STAYS */}

  <CategoryCard
    title="Unique stays"
    description="Something different for the trip you'll remember."
    icon={<Castle size={24} />}
    number="03"
    image="https://res.cloudinary.com/dcoojr90p/image/upload/v1788010818/download_38_mpkguf.jpg"
    className="md:translate-y-16"
  />

</div>

      </section>


      {/* =====================================================
          EDITORIAL STATEMENT
      ====================================================== */}

      <section className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                The ApexHomes approach
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                A good stay is more than four walls.
              </h2>

            </div>


            <div className="flex items-end">

              <p className="max-w-xl text-lg leading-8 text-gray-500">
                It's the morning light through the windows.
                The neighborhood you can actually explore.
                The space you want to come back to after a
                long day.
                <br />
                <br />
                ApexHomes helps you find the place that makes
                the trip feel complete.
              </p>

            </div>

          </div>


          {/* Large statement */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mt-20 border-t border-gray-200 pt-10"
          >

            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">

              <p className="max-w-3xl text-3xl font-medium leading-tight tracking-tight text-gray-950 sm:text-4xl">
                "The right place can become part of the
                story you came to make."
              </p>


              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                ApexHomes
              </span>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          APEX AI
      ====================================================== */}

      <section className="relative overflow-hidden bg-gray-950">

        {/* Ambient 3D orb */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-40 -top-40 h-[35rem] w-[35rem] rounded-full bg-white/[0.06] blur-[80px]"
        />


        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-20 h-[28rem] w-[28rem] rounded-full bg-white/[0.04] blur-[90px]"
        />


        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

          <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">

            {/* Left */}

            <div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-xl">

                <Sparkles size={23} />

              </div>


              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                Meet Apex AI
              </p>


              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                Your stay,
                <br />
                intelligently found.
              </h2>

            </div>


            {/* Right */}

            <div>

              <p className="max-w-2xl text-lg leading-8 text-white/60">
                Don't know exactly what you're looking for?
                Describe your trip naturally and let Apex AI
                help you find properties that fit.
              </p>


              {/* AI prompt visual */}

              <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-2 shadow-2xl backdrop-blur-xl">

                <div className="rounded-[1.35rem] bg-white p-6">

                  <div className="flex items-start gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white">

                      <Sparkles size={17} />

                    </div>


                    <div>

                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                        Try asking
                      </p>

                      <p className="mt-2 text-lg font-medium leading-7 text-gray-950">
                        "I want a quiet weekend stay with
                        beautiful views and enough space to
                        relax."
                      </p>

                    </div>

                  </div>


                  <Link
                    to="/ai"
                    className="group mt-6 flex items-center justify-between rounded-xl bg-gray-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >

                    <span>
                      Find my perfect stay
                    </span>

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-[#f7f7f5]">

        <div className="mx-auto max-w-5xl px-6 py-28 text-center lg:py-36">

          <WandSparkles
            size={30}
            className="mx-auto text-gray-950"
          />

          <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Your next stay
            <span className="text-gray-400">
              {" "}starts here.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-500">
            Browse beautiful places, discover somewhere
            unexpected and find a stay that makes your trip
            worth remembering.
          </p>


          <Link
            to="/explore"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gray-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Explore ApexHomes

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>

      </section>

    </main>
  );
};


/* ============================================================
   CATEGORY CARD
============================================================ */

const CategoryCard = ({
  title,
  description,
  icon,
  number,
  image,
  className = "",
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -10,
        rotateX: 2,
        rotateY: -2,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
      }}
      style={{
        transformPerspective: 1000,
      }}
      className={`group relative min-h-[430px] overflow-hidden rounded-[2rem] bg-gray-950 text-white shadow-[0_25px_60px_rgba(0,0,0,0.15)] ${className}`}
    >

      {/* =====================================================
          IMAGE
      ====================================================== */}

      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />


      {/* =====================================================
          IMAGE OVERLAY
      ====================================================== */}

      <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-black/85" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />


      {/* =====================================================
          TOP CONTENT
      ====================================================== */}

      <div className="relative z-10 flex items-center justify-between p-7">

        <span className="text-xs font-semibold tracking-[0.2em] text-white/70">
          {number}
        </span>


        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-12 group-hover:bg-white group-hover:text-gray-950">

          {icon}

        </div>

      </div>


      {/* =====================================================
          BOTTOM CONTENT
      ====================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-10 p-7">

        <h3 className="text-3xl font-semibold tracking-tight text-white">
          {title}
        </h3>


        <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">
          {description}
        </p>


        <Link
          to="/explore"
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
        >

          Explore

          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />

        </Link>

      </div>


      {/* =====================================================
          HOVER BORDER
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/0 transition-colors duration-500 group-hover:border-white/30" />

    </motion.div>
  );
};

export default Stays;