"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 2000,
  className,
  ...props
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden",
        containerClassName
      )}
      style={{ borderRadius }}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-[1.75rem]"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorders duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-80 bg-[radial-gradient(#CBACF9_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorders>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/60 border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorders = ({
  children,
  duration = 2000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useAnimationFrame((time) => {
    if (!mounted || !pathRef.current) return;

    const length = pathRef.current.getTotalLength?.();
    if (!length) return;

    const speed = length / duration;
    progress.set((time * speed) % length);
  });

  const x = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    return pathRef.current.getPointAtLength(val)?.x ?? 0;
  });

  const y = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    return pathRef.current.getPointAtLength(val)?.y ?? 0;
  });

  const transform = useMotionTemplate`
    translateX(${x}px)
    translateY(${y}px)
    translate(-50%, -50%)
  `;

  if (!mounted) return null;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute w-full h-full"
        width="100%"
        height="100%"
      >
        <rect
          ref={pathRef}
          width="100%"
          height="100%"
          fill="none"
          rx={rx}
          ry={ry}
        />
      </svg>

      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
