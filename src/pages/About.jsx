import {
  MapPin,
  ShieldCheck,
  Sparkles,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ABOUT_IMAGE_1 =
  "https://res.cloudinary.com/dcoojr90p/image/upload/v1788010723/Interior_Design_Luxury_Mountain_Home_bluqai.jpg";

const ABOUT_IMAGE_2 =
  "https://res.cloudinary.com/dcoojr90p/image/upload/v1788010785/Living_Room_gvz1d2.jpg";

const ABOUT_IMAGE_3 =
  "https://res.cloudinary.com/dcoojr90p/image/upload/v1788010818/download_38_mpkguf.jpg";

const About = () => {
  return (
    <main className="overflow-hidden bg-[#f7f7f5] text-gray-950">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gray-950 text-white">

        <div className="mx-auto grid min-h-[720px] max-w-7xl lg:grid-cols-2">

          {/* LEFT */}

          <div className="relative z-10 flex flex-col justify-center px-6 py-24 lg:px-8 lg:py-32">

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
            >

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                About ApexHomes
              </p>


              <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">

                More than a place
                <span className="block text-white/40">
                  to stay.
                </span>

              </h1>


              <p className="mt-8 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                ApexHomes makes it easier to discover
                beautiful spaces, find the right fit for
                your trip and turn somewhere unfamiliar
                into a place that feels like home.
              </p>


              <div className="mt-9 flex flex-wrap gap-3">

                <Link
                  to="/explore"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
                >
                  Explore stays

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </Link>


                <Link
                  to="/ai"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
                >
                  <Sparkles size={16} />

                  Meet Apex AI

                </Link>

              </div>

            </motion.div>

          </div>


          {/* RIGHT IMAGE */}

          <div className="relative min-h-[520px] overflow-hidden lg:min-h-full">

            <motion.img
              initial={{
                scale: 1.1,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              src={ABOUT_IMAGE_1}
              alt="Beautiful ApexHomes interior"
              className="absolute inset-0 h-full w-full object-cover"
            />


            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-transparent lg:from-gray-950/80 lg:via-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent" />


            {/* Floating label */}

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
                delay: 0.8,
                duration: 0.7,
              }}
              className="absolute bottom-8 left-6 right-6 sm:left-auto sm:w-72 lg:bottom-12 lg:right-10"
            >

              <div className="rounded-2xl border border-white/15 bg-black/25 p-5 text-white backdrop-blur-xl">

                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  The ApexHomes idea
                </p>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  The right space can change the way
                  you experience a destination.
                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STORY
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">

        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">

          {/* Heading */}

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Our idea
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Travel should feel
              <span className="text-gray-400">
                {" "}simple.
              </span>
            </h2>

          </div>


          {/* Copy */}

          <div className="max-w-2xl space-y-6 text-base leading-8 text-gray-600">

            <p className="text-xl leading-8 text-gray-950 sm:text-2xl">
              Finding somewhere to stay shouldn't be
              the stressful part of travelling.
            </p>

            <p>
              ApexHomes was built around a simple idea:
              make discovering a place to stay feel as
              good as the trip itself.
            </p>

            <p>
              Whether you're looking for a city apartment,
              a quiet villa, a comfortable home or
              somewhere completely unexpected, ApexHomes
              brings the discovery experience together in
              one place.
            </p>

            <p>
              And when you aren't sure where to start,
              Apex AI can help you describe what you want
              naturally and narrow down the possibilities.
            </p>

          </div>

        </div>


        {/* =================================================
            IMAGE COLLAGE
        ================================================== */}

        <div className="relative mt-24 min-h-[600px] lg:mt-32">

          {/* Large image */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative h-[420px] overflow-hidden rounded-[2rem] sm:h-[520px] lg:absolute lg:left-0 lg:top-0 lg:h-[560px] lg:w-[68%]"
          >

            <img
              src={ABOUT_IMAGE_2}
              alt="Modern ApexHomes living space"
              className="h-full w-full object-cover transition duration-1000 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          </motion.div>


          {/* Small floating image */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="relative -mt-20 ml-auto h-[300px] w-[75%] overflow-hidden rounded-[2rem] border-8 border-[#f7f7f5] shadow-2xl sm:h-[360px] lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:h-[390px] lg:w-[42%]"
          >

            <img
              src={ABOUT_IMAGE_3}
              alt="Unique ApexHomes stay"
              className="h-full w-full object-cover transition duration-1000 hover:scale-105"
            />


            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />


            <div className="absolute bottom-6 left-6">

              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Find somewhere
              </p>

              <p className="mt-1 text-xl font-semibold text-white">
                Worth remembering.
              </p>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ====================================================== */}

      <section className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-32">

          <div className="max-w-2xl">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Why ApexHomes
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Built around better stays.
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-500">
              Every part of ApexHomes is designed to
              make choosing your next stay easier,
              clearer and more enjoyable.
            </p>

          </div>


          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-200 md:grid-cols-2 lg:grid-cols-4">

            <ValueCard
              icon={<MapPin size={22} />}
              number="01"
              title="Great locations"
              description="Discover properties in destinations worth exploring."
            />

            <ValueCard
              icon={<ShieldCheck size={22} />}
              number="02"
              title="Simple booking"
              description="Book your stay without unnecessary account creation."
            />

            <ValueCard
              icon={<Sparkles size={22} />}
              number="03"
              title="Apex AI"
              description="Get help finding properties that match what you actually need."
            />

            <ValueCard
              icon={<Heart size={22} />}
              number="04"
              title="Made for guests"
              description="A cleaner experience from discovery through your stay."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          AI SECTION
      ====================================================== */}

      <section className="relative overflow-hidden bg-gray-950 text-white">

        <div className="absolute -right-40 -top-40 h-[35rem] w-[35rem] rounded-full bg-white/[0.05] blur-[100px]" />

        <div className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-white/[0.04] blur-[100px]" />


        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            <div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">

                <Sparkles size={23} />

              </div>


              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                A different way to search
              </p>


              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                You don't always
                <span className="block text-white/40">
                  know what you want.
                </span>
              </h2>

            </div>


            <div>

              <p className="text-lg leading-8 text-white/60">
                That's where Apex AI comes in. Tell it
                about your trip, the atmosphere you're
                after or the kind of experience you want.
                It helps turn an idea into a stay.
              </p>


              <Link
                to="/ai"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
              >
                Try Apex AI

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />

              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL STATEMENT
      ====================================================== */}

      <section className="bg-[#f7f7f5]">

        <div className="mx-auto max-w-5xl px-6 py-28 text-center lg:py-36">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            ApexHomes
          </p>


          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            The right place can
            <span className="text-gray-400">
              {" "}become part of the journey.
            </span>
          </h2>


          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-500">
            Discover your next stay and make somewhere
            new feel a little more like yours.
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
   VALUE CARD
============================================================ */

const ValueCard = ({
  icon,
  number,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.3,
      }}
      className="bg-white p-7 sm:p-8"
    >

      <div className="flex items-center justify-between">

        <span className="text-xs font-semibold tracking-[0.2em] text-gray-300">
          {number}
        </span>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950 text-white">
          {icon}
        </div>

      </div>


      <h3 className="mt-8 text-lg font-semibold">
        {title}
      </h3>


      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

    </motion.div>
  );
};


export default About;