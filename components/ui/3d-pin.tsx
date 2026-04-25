"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PinContainerProps = {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
};

export function PinContainer({
  children,
  title,
  href = "/",
  className,
  containerClassName,
}: PinContainerProps) {
  return (
    <a
      href={href}
      className={cn(
        "relative group/pin block cursor-pointer focus:outline-none",
        containerClassName
      )}
    >
      {/* Card */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          initial={{ rotateX: 0, scale: 1 }}
          whileHover={{ rotateX: 40, scale: 0.85 }}
          whileFocus={{ rotateX: 40, scale: 0.85 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl border border-white/10 bg-black/40 shadow-xl"
        >
          <div className={cn("relative z-10", className)}>{children}</div>
        </motion.div>
      </div>

      <PinPerspective title={title} />
    </a>
  );
}

function PinPerspective({ title }: { title?: string }) {
  return (
    <motion.div className="w-full h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 transition duration-500">
      <div className="relative w-full h-full -mt-7">
        {/* Title */}
        {title && (
          <div className="absolute top-0 inset-x-0 flex justify-center">
            <div className="rounded-full bg-zinc-950 px-4 py-1 text-xs font-bold text-white ring-1 ring-white/10">
              {title}
            </div>
          </div>
        )}

        {/* Pulse rings */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ perspective: "1000px" }}
        >
          {[0, 2, 4].map((delay) => (
            <motion.div
              key={delay}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.5, 0], scale: 1 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay,
              }}
              className="absolute h-[11.25rem] w-[11.25rem] rounded-full bg-sky-500/10"
            />
          ))}
        </div>

        {/* Beam */}
        <div className="absolute right-1/2 bottom-1/2 translate-y-[14px]">
          <motion.div className="w-px h-20 bg-gradient-to-b from-transparent to-cyan-500 group-hover/pin:h-40 transition-all blur-sm" />
          <motion.div className="w-px h-20 bg-gradient-to-b from-transparent to-cyan-500 group-hover/pin:h-40 transition-all" />
          <div className="w-1 h-1 bg-cyan-400 rounded-full blur-sm translate-x-[1px]" />
          <div className="w-0.5 h-0.5 bg-cyan-200 rounded-full translate-x-[1px]" />
        </div>
      </div>
    </motion.div>
  );
}
