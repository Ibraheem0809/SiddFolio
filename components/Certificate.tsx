"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ExternalLink, User, BookOpen, Sparkles } from "lucide-react";

import { COURSES } from "@/data";
import { cn } from "@/lib/utils";

const Certificates = () => {
  const [active, setActive] = useState(COURSES[0]?.id);

  const course = COURSES.find((c) => c.id === active);

  if (!course) return null;

  return (
    <section id="certificates" className="relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <p className="text-sm text-neutral-300 tracking-wide">
              Continuous Learning
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Courses & <span className="text-purple-500">Certificates</span>
          </h1>

          <p className="mt-5 text-neutral-400 max-w-2xl text-sm md:text-lg leading-relaxed">
            I continuously improve my development skills by learning modern
            technologies, solving real-world problems, and building practical
            projects.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "h-full rounded-3xl border border-white/10",
                  "bg-black-100/60 backdrop-blur-xl",
                  "shadow-[0_0_40px_rgba(168,85,247,0.15)]",
                  "p-8 md:p-10"
                )}
              >
                {/* Badge */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/20">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>

                  <span className="text-sm uppercase tracking-widest text-purple-300">
                    Certified Course
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                  {course.title}
                </h2>

                {/* Instructor */}
                <div className="flex items-center gap-3 mb-6 text-neutral-300">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <User className="w-4 h-4 text-purple-400" />
                  </div>

                  <p className="text-sm md:text-base">
                    Instructor:{" "}
                    <span className="text-white font-medium">
                      {course.instructor}
                    </span>
                  </p>
                </div>

                {/* Description */}
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base mb-10">
                  {course.description}
                </p>

                {/* Skills */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <p className="text-sm uppercase tracking-widest text-neutral-300">
                      Skills Learned
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {course.skills.map((skill) => (
                      <span
                        key={skill}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm",
                          "bg-white/5 border border-white/10",
                          "text-neutral-200",
                          "hover:border-purple-500/40 hover:bg-purple-500/10",
                          "transition-all duration-300"
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Course Selector */}
            <div
              className={cn(
                "rounded-3xl border border-white/10",
                "bg-black-100/60 backdrop-blur-xl",
                "p-6"
              )}
            >
              <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-5">
                Select Course
              </h3>

              <div className="space-y-3">
                {COURSES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActive(c.id)}
                    className={cn(
                      "w-full text-left px-5 py-4 rounded-2xl",
                      "transition-all duration-300",
                      "border",
                      active === c.id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 border-transparent text-white shadow-lg"
                        : "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10 hover:border-purple-500/30"
                    )}
                  >
                    <p className="font-medium">{c.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div
              className={cn(
                "flex-1 rounded-3xl border border-white/10",
                "bg-black-100/60 backdrop-blur-xl",
                "p-6"
              )}
            >
              <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-5">
                Certificates
              </h3>

              <div className="space-y-4">
                {course.certificates.map((cert, index) => (
                  <motion.a
                    key={index}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={cn(
                      "group flex items-center justify-between",
                      "rounded-2xl border border-white/10",
                      "bg-white/5 hover:bg-white/10",
                      "px-5 py-4 transition-all duration-300",
                      "hover:border-purple-500/40"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/20">
                        <Award className="w-4 h-4 text-purple-400" />
                      </div>

                      <span className="text-sm md:text-base text-neutral-200">
                        {cert.label}
                      </span>
                    </div>

                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
