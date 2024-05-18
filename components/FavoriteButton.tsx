"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addFavorite, getFavorites, removeFavorite } from "@/lib/local-storage";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const favoriteButtonVariants = cva(
  "flex justify-center items-center rounded-full text-sm bg-white border-none p-[0.3rem] bg-opacity-70 cursor-pointer group",
  {
    variants: {
      position: {
        absolute: "absolute top-2 right-2",
        static: "",
      },
    },
    defaultVariants: {
      position: "absolute",
    },
  }
);

interface FavoriteButtonProps
  extends VariantProps<typeof favoriteButtonVariants> {
  id: string;
  className?: string;
  onRemoveFavorite?: (id: string) => void;
}

export default function FavoriteButton({
  id,
  position,
  className,
  onRemoveFavorite,
}: FavoriteButtonProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (favorites.includes(id)) {
      removeFavorite(id);
      if (onRemoveFavorite) onRemoveFavorite(id);
    } else {
      addFavorite(id);
    }
    setFavorites(getFavorites());
  };

  return (
    <div
      onClick={toggleFavorite}
      className={cn(favoriteButtonVariants({ position, className }))}
    >
      <AnimatePresence initial={false} mode="wait">
        {favorites.includes(id) ? (
          <motion.div
            key={`${id}-filled`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Heart className="size-4 fill-red-500 text-red-500 transition-all group-hover:text-red-500" />
          </motion.div>
        ) : (
          <motion.div
            key={`${id}-outlined`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Heart className="size-4 fill-none text-slate-800 transition-all group-hover:text-red-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
