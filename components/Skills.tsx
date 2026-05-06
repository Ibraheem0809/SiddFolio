"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles, Code2 } from "lucide-react";

import { SKILLS } from "@/data";
import { cn } from "@/lib/utils";

const Skills = () => {
  return (
    <section id="skills" className="relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-5">
            <Sparkles className="w-4 h-4 text-purple-400" />

            <p className="text-sm text-neutral-300 tracking-wide">
              Technologies I Use
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Skills & <span className="text-purple-500">Tech Stack</span>
          </h1>

          <p className="mt-5 text-neutral-400 max-w-3xl text-sm md:text-lg leading-relaxed">
            I work with modern technologies to create responsive, scalable, and
            user-friendly web applications while constantly improving my
            development skills.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              className={cn(
                "relative overflow-hidden rounded-3xl",
                "border border-white/10",
                "bg-black-100/60 backdrop-blur-xl",
                "p-7 md:p-8",
                "hover:border-purple-500/30",
                "transition-all duration-300",
                "shadow-[0_0_30px_rgba(168,85,247,0.12)]",
                skill.className
              )}
            >
              {/* Card Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full" />

              {/* Top */}
              <div className="relative z-10 flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/20">
                      <Code2 className="w-4 h-4 text-purple-400" />
                    </div>

                    <p className="text-xs uppercase tracking-widest text-purple-300">
                      Skill Category
                    </p>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {skill.title}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="relative z-10 text-neutral-400 text-sm md:text-base leading-relaxed mb-8">
                {skill.desc}
              </p>

              {/* Icons */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {skill.img.map((image, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{
                      y: -6,
                      scale: 1.03,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center",
                      "rounded-2xl border border-white/10",
                      "bg-white/5 backdrop-blur-md",
                      "p-4",
                      "hover:border-purple-500/30 hover:bg-white/10",
                      "transition-all duration-300"
                    )}
                  >
                    <div className="relative w-14 h-14 mb-3">
                      <Image
                        src={image}
                        alt={skill.imgName[idx]}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <p className="text-sm text-neutral-200 text-center">
                      {skill.imgName[idx]}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
