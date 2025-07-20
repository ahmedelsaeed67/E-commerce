import React, { createContext, useState } from "react";

export const wishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  function addToWishlist(product) {
    setWishlist((prev) => [...prev, product]);
  }

  function removeFromWishlist(productId) {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  }

  function isInWishlist(productId) {
    return wishlist.some((item) => item._id === productId);
  }

  return (
    <wishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
