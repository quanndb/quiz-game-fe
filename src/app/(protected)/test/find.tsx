// components/ImageFlyer.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = {
  images: string[];
  duration?: number;
  repeatCount?: number | "infinite";
};

export default function ImageFlyer({
  images,
  duration = 5,
  repeatCount = "infinite",
}: Props) {
  const [availableImages, setAvailableImages] = useState<string[]>(images);
  const [cartImages, setCartImages] = useState<string[]>([]);

  const handleAddToCart = (img: string) => {
    setAvailableImages((prev) => prev.filter((i) => i !== img));
    setCartImages((prev) => {
      if (prev.includes(img)) return prev;
      return [...prev, img];
    });
  };

  const handleRemoveFromCart = (img: string) => {
    setCartImages((prev) => prev.filter((i) => i !== img));
    setAvailableImages((prev) => {
      if (prev.includes(img)) return prev;
      return [...prev, img];
    });
  };

  return (
    <div className="w-[500px]  flex flex-col items-center justify-start">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">
        Danh sách hình ảnh đang chạy
      </h2>

      {/* Thanh chạy ngang */}
      <div className="overflow-hidden w-full h-32 relative border rounded-md bg-gray-50 mb-8">
        <motion.div
          className="flex gap-4 absolute"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration,
            repeat: repeatCount === "infinite" ? Infinity : repeatCount,
            ease: "linear",
          }}
        >
          {availableImages.map((img) => (
            <motion.img
              key={img}
              src={img}
              onClick={() => handleAddToCart(img)}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-24 h-24 rounded-md pointer border shadow"
            />
          ))}
        </motion.div>
      </div>

      {/* Cart */}
      <h2 className="text-xl font-semibold mb-2">Khay hình ảnh</h2>
      <div className="flex gap-4 flex-wrap min-h-32 w-full border rounded-md bg-gray-100 p-4 justify-start">
        <AnimatePresence>
          {cartImages.map((img) => (
            <motion.img
              key={img}
              src={img}
              onClick={() => handleRemoveFromCart(img)}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 pointer rounded-md border"
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
