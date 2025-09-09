import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholder = null,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`relative ${className}`} {...props}>
      {!isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 rounded">
          <LoadingSpinner size="sm" text="" />
        </div>
      )}

      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 rounded">
          <LoadingSpinner size="sm" text="" />
        </div>
      )}

      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full h-full object-cover ${
            isLoaded ? "block" : "hidden"
          }`}
          loading="lazy"
        />
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-400 text-sm">
          {placeholder || "Image not available"}
        </div>
      )}
    </div>
  );
};

export default LazyImage;
