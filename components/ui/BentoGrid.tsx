"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import GridGlobe from "./GridGlobe";
import { IoCopyOutline } from "react-icons/io5";
import MagicButton from "./MagicButton";
import animationData from "@/data/confetti.json";

// ✅ Disable SSR for heavy/animation components
const BackgroundGradientAnimation = dynamic(
  () => import("./GradientBg").then((mod) => mod.BackgroundGradientAnimation),
  { ssr: false }
);

const Lottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  spareImg,
  imgClassName,
  titleClassName,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id?: number;
  img?: string;
  spareImg?: string;
  imgClassName?: string;
  titleClassName?: string;
}) => {
  const leftLists = ["ReactJS", "Express", "Typescript", "AceternityUI"];
  const rightLists = ["TailwindCSS", "NextJS", "MongoDB", "Git"];

  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ Prevent hydration / SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "ibraheemsiddiqui0809@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        {/* Main Image */}
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt="grid-img"
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>

        {/* Spare Image */}
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          }`}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt="spare-img"
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>

        {/* ✅ FIXED: Gradient Background (no SSR crash) */}
        {id === 6 && mounted && <BackgroundGradientAnimation />}

        {/* Content */}
        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          {/* Description */}
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>

          {/* Title */}
          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
            {title}
          </div>

          {/* Globe */}
          {id === 2 && <GridGlobe />}

          {/* Tech Stack */}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg bg-[#10132E]" />
              </div>

              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg bg-[#10132E]" />
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Copy Email Section */}
          {id === 6 && (
            <div className="mt-5 relative">
              {/* ✅ Lottie safe render */}
              {mounted && (
                <div className="absolute -bottom-5 right-0">
                  <Lottie options={defaultOptions} height={200} width={400} />
                </div>
              )}

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
