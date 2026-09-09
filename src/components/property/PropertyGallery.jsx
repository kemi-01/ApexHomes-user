import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const getImageUrl = (image) => {
  if (!image) return "";

  // If backend returns:
  // { url: "/uploads/image.jpg" }
  if (typeof image === "object") {
    image =
      image.url ||
      image.path ||
      image.src ||
      "";
  }

  if (!image || typeof image !== "string") {
    return "";
  }

  // Already a complete URL
  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  // Backend API URL:
  // http://localhost:5000/api
  //
  // We need:
  // http://localhost:5000/uploads/image.jpg
  const backendOrigin = API_BASE_URL.replace(
    /\/api\/?$/,
    ""
  );

  // Backend returned:
  // /uploads/image.jpg
  if (image.startsWith("/")) {
    return `${backendOrigin}${image}`;
  }

  // Backend returned:
  // uploads/image.jpg
  return `${backendOrigin}/${image}`;
};

const PropertyGallery = ({
  images = [],
  title = "Property",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const normalizedImages = useMemo(() => {
    if (!Array.isArray(images)) {
      return [];
    }

    return images
      .map(getImageUrl)
      .filter(Boolean);
  }, [images]);

  useEffect(() => {
    setActiveIndex(0);
  }, [normalizedImages.length]);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === 0
            ? normalizedImages.length - 1
            : current - 1
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === normalizedImages.length - 1
            ? 0
            : current + 1
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isFullscreen, normalizedImages.length]);

  if (!normalizedImages.length) {
    return (
      <div className="flex aspect-[16/8] items-center justify-center rounded-3xl bg-gray-100 text-sm text-gray-400">
        No property images available
      </div>
    );
  }

  const currentImage =
    normalizedImages[activeIndex];

  const nextImage = () => {
    setActiveIndex((current) =>
      current === normalizedImages.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    setActiveIndex((current) =>
      current === 0
        ? normalizedImages.length - 1
        : current - 1
    );
  };

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div className="group relative overflow-hidden rounded-3xl bg-gray-100">
          <img
            src={currentImage}
            alt={`${title} - image ${
              activeIndex + 1
            }`}
            className="aspect-[16/8] w-full object-cover"
            loading="eager"
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
          />

          {/* Previous */}
          {normalizedImages.length > 1 && (
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 opacity-0 shadow transition group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next */}
          {normalizedImages.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 opacity-0 shadow transition group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* View all */}
          <button
            type="button"
            onClick={() =>
              setIsFullscreen(true)
            }
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-xs font-semibold text-gray-900 shadow backdrop-blur transition hover:bg-white"
          >
            <Maximize2 size={15} />
            View all photos
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white">
            {activeIndex + 1} /{" "}
            {normalizedImages.length}
          </div>
        </div>

        {/* Thumbnails */}
        {normalizedImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {normalizedImages.map(
              (image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl transition ${
                    activeIndex === index
                      ? "ring-2 ring-gray-950 ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${title} thumbnail ${
                      index + 1
                    }`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Fullscreen gallery */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4">
          {/* Close */}
          <button
            type="button"
            onClick={() =>
              setIsFullscreen(false)
            }
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>

          {/* Image counter */}
          <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
            {activeIndex + 1} /{" "}
            {normalizedImages.length}
          </div>

          {/* Previous */}
          {normalizedImages.length > 1 && (
            <button
              type="button"
              onClick={previousImage}
              className="absolute left-5 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft size={25} />
            </button>
          )}

          {/* Fullscreen image */}
          <img
            src={currentImage}
            alt={`${title} fullscreen`}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
          />

          {/* Next */}
          {normalizedImages.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-5 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight size={25} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyGallery;