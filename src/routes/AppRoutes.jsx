import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Stays from "../pages/Stays";
import PropertyDetails from "../pages/PropertyDetails";
import Booking from "../pages/Booking";
import BookingConfirmation from "../pages/BookingConfirmation";
import BookingLookup from "../pages/BookingLookup";
import About from "../pages/About";
import AIChat from "../pages/AI";
import Wishlist from "../pages/Wishlist";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* =========================
            HOME
        ========================== */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* =========================
            EXPLORE
        ========================== */}
        <Route
          path="/explore"
          element={<Explore />}
        />

        {/* =========================
            STAYS
        ========================== */}
        <Route
          path="/stays"
          element={<Stays />}
        />

        {/* =========================
            PROPERTY DETAILS
        ========================== */}
        <Route
          path="/properties/:id"
          element={<PropertyDetails />}
        />

        {/* =========================
            BOOKING
        ========================== */}
        <Route
          path="/booking"
          element={<Booking />}
        />

        {/* =========================
            BOOKING CONFIRMATION
        ========================== */}
        <Route
          path="/booking-confirmation/:bookingId"
          element={<BookingConfirmation />}
        />

        {/* =========================
            BOOKING LOOKUP
        ========================== */}
        <Route
          path="/booking-lookup"
          element={<BookingLookup />}
        />

        {/* =========================
            ABOUT
        ========================== */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* =========================
            APEX AI
        ========================== */}
        <Route
          path="/ai"
          element={<AIChat />}
        />

        {/* =========================
            WISHLIST
        ========================== */}
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* =========================
            404
        ========================== */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          ApexHomes
        </p>

        <h1 className="mt-3 text-5xl font-bold text-gray-950">
          404
        </h1>

        <p className="mt-3 text-gray-600">
          The page you're looking for doesn't exist.
        </p>

        <a
          href="/"
          className="mt-6 inline-flex rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Back to home
        </a>

      </div>
    </div>
  );
}

export default AppRoutes;