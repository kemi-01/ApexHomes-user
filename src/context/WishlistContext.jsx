import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "apexhomes_wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | LOAD WISHLIST
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setWishlist(parsed);
      }
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | SAVE WISHLIST
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error(
        "Failed to save wishlist:",
        error
      );
    }
  }, [wishlist]);

  /*
  |--------------------------------------------------------------------------
  | NOTIFICATION
  |--------------------------------------------------------------------------
  */

  const showNotification = (
    message,
    type = "success"
  ) => {
    setNotification({
      message,
      type,
    });

    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  /*
  |--------------------------------------------------------------------------
  | ADD TO WISHLIST
  |--------------------------------------------------------------------------
  */

  const addToWishlist = (property) => {
    if (!property) return;

    const propertyId =
      property._id || property.id;

    if (!propertyId) return;

    setWishlist((currentWishlist) => {
      const alreadyExists =
        currentWishlist.some(
          (item) =>
            (item._id || item.id) === propertyId
        );

      if (alreadyExists) {
        return currentWishlist;
      }

      showNotification(
        "Added to your wishlist"
      );

      return [
        ...currentWishlist,
        property,
      ];
    });
  };

  /*
  |--------------------------------------------------------------------------
  | REMOVE FROM WISHLIST
  |--------------------------------------------------------------------------
  */

  const removeFromWishlist = (
    propertyId
  ) => {
    if (!propertyId) return;

    setWishlist((currentWishlist) => {
      const exists =
        currentWishlist.some(
          (item) =>
            (item._id || item.id) ===
            propertyId
        );

      if (!exists) {
        return currentWishlist;
      }

      showNotification(
        "Removed from your wishlist",
        "remove"
      );

      return currentWishlist.filter(
        (item) =>
          (item._id || item.id) !==
          propertyId
      );
    });
  };

  /*
  |--------------------------------------------------------------------------
  | TOGGLE WISHLIST
  |--------------------------------------------------------------------------
  */

  const toggleWishlist = (property) => {
    if (!property) return;

    const propertyId =
      property._id || property.id;

    if (!propertyId) return;

    const exists = wishlist.some(
      (item) =>
        (item._id || item.id) ===
        propertyId
    );

    if (exists) {
      removeFromWishlist(propertyId);
    } else {
      addToWishlist(property);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | CHECK IF WISHLISTED
  |--------------------------------------------------------------------------
  */

  const isWishlisted = (propertyId) => {
    if (!propertyId) return false;

    return wishlist.some(
      (item) =>
        (item._id || item.id) ===
        propertyId
    );
  };

  /*
  |--------------------------------------------------------------------------
  | CLEAR WISHLIST
  |--------------------------------------------------------------------------
  */

  const clearWishlist = () => {
    if (wishlist.length === 0) return;

    setWishlist([]);

    showNotification(
      "Wishlist cleared",
      "remove"
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}

      {/* =====================================================
          WISHLIST NOTIFICATION
      ====================================================== */}

      {notification && (
        <div
          className={`fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-xl transition-all ${
            notification.type === "remove"
              ? "bg-gray-800"
              : "bg-gray-950"
          }`}
        >
          {notification.message}
        </div>
      )}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};

export default WishlistContext;