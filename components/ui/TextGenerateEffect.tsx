"use client";
import { useEffect, useMemo } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = useMemo(() => words.split(" "), [words]);

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration, delay: stagger(0.2) }
    );
  }, [animate, filter, duration]);

  return (
    <div className={cn("font-bold", className)}>
      <motion.div
        ref={scope}
        className="my-4 dark:text-white text-black leading-snug tracking-wide text-center"
      >
        {wordsArray.map((word, idx) => (
          <motion.span
            key={idx}
            className={`${idx > 3 ? "text-purple-500" : ""} opacity-0`}
            style={{ filter: filter ? "blur(10px)" : "none" }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
