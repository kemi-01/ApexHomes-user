import AppRoutes from "./routes/AppRoutes";

import { PropertyProvider } from "./context/PropertyContext";
import { BookingProvider } from "./context/BookingContext";
import { WishlistProvider } from "./context/WishlistContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <PropertyProvider>
      <BookingProvider>
        <WishlistProvider>
          <ScrollToTop />
          <AppRoutes />
        </WishlistProvider>
      </BookingProvider>
    </PropertyProvider>
  );
}

export default App;