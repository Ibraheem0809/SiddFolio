"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, BookOpen, Code2, FileText, Sparkles } from "lucide-react";

import { FaGithub, FaYoutube } from "react-icons/fa";

import { BLOG_POSTS, DSA_PATTERNS } from "@/data";
import { cn } from "@/lib/utils";

const Blogs = () => {
  const { totalSolved, totalCount } = useMemo(() => {
    return {
      totalSolved: DSA_PATTERNS.reduce(
        (acc, pattern) => acc + pattern.solved,
        0
      ),
      totalCount: DSA_PATTERNS.reduce((acc, pattern) => acc + pattern.total, 0),
    };
  }, []);

  return (
    <section id="blogs" className="relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-blue-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-5">
            <Sparkles className="w-4 h-4 text-purple-400" />

            <p className="text-sm text-neutral-300 tracking-wide">
              Learning in Public
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Blogs, Videos & <span className="text-purple-500">DSA Tracker</span>
          </h1>

          <p className="mt-5 text-neutral-400 max-w-3xl text-sm md:text-lg leading-relaxed">
            I document my development journey through coding notes, Java
            learning, DSA patterns, and project building to track consistent
            progress.
          </p>
        </div>

        {/* BLOG CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {BLOG_POSTS.map((blog, index) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              className={cn(
                "overflow-hidden rounded-3xl",
                "border border-white/10",
                "bg-black-100/60 backdrop-blur-xl",
                "hover:border-purple-500/30",
                "transition-all duration-300",
                "shadow-[0_0_30px_rgba(168,85,247,0.12)]"
              )}
            >
              {/* Video */}
              <div className="aspect-video overflow-hidden border-b border-white/10">
                <iframe
                  src={blog.youtube}
                  title={blog.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/20">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                  </div>

                  <p className="text-xs uppercase tracking-widest text-purple-300">
                    Learning Log
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                  {blog.title}
                </h3>

                <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
                  {blog.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={blog.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-2",
                      "px-5 py-3 rounded-xl",
                      "bg-white/5 border border-white/10",
                      "hover:bg-white/10 hover:border-purple-500/30",
                      "transition-all duration-300"
                    )}
                  >
                    <FaGithub className="w-4 h-4 text-purple-400" />

                    <span className="text-sm text-neutral-200">GitHub</span>
                  </a>

                  <a
                    href={blog.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-2",
                      "px-5 py-3 rounded-xl",
                      "bg-purple-500/15 border border-purple-500/20",
                      "hover:bg-purple-500/25",
                      "transition-all duration-300"
                    )}
                  >
                    <FaYoutube className="w-4 h-4 text-purple-400" />

                    <span className="text-sm text-neutral-200">
                      Watch Video
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DSA TRACKER */}
        <div
          className={cn(
            "rounded-3xl border border-white/10",
            "bg-black-100/60 backdrop-blur-xl",
            "p-6 md:p-10",
            "shadow-[0_0_40px_rgba(59,130,246,0.12)]"
          )}
        >
          {/* Heading */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/20">
                <Code2 className="w-5 h-5 text-blue-400" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-blue-300">
                  DSA Progress
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Pattern-wise Tracker
                </h2>
              </div>
            </div>

            <p className="text-neutral-400 text-sm md:text-base">
              Solved{" "}
              <span className="text-white font-semibold">{totalSolved}</span>{" "}
              out of{" "}
              <span className="text-white font-semibold">{totalCount}</span>{" "}
              problems across{" "}
              <span className="text-purple-400 font-semibold">
                {DSA_PATTERNS.length}
              </span>{" "}
              DSA patterns.
            </p>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {DSA_PATTERNS.map((pattern, index) => (
              <DSAItem key={pattern.name} pattern={pattern} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;

/* -------------------------------------------------------------------------- */
/*                                  DSA ITEM                                  */
/* -------------------------------------------------------------------------- */

type Pattern = {
  name: string;
  solved: number;
  total: number;
  link: string;
};

function DSAItem({ pattern, index }: { pattern: Pattern; index: number }) {
  const [open, setOpen] = useState(false);

  const percentage =
    pattern.total > 0
      ? Math.min(100, Math.round((pattern.solved / pattern.total) * 100))
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.03,
      }}
      className={cn(
        "overflow-hidden rounded-2xl",
        "border border-white/10",
        "bg-white/5 backdrop-blur-md"
      )}
    >
      {/* HEADER */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center gap-4",
          "px-5 py-5 text-left",
          "hover:bg-white/5 transition-all duration-300"
        )}
      >
        {/* Number */}
        <div
          className={cn(
            "min-w-[52px] h-[52px]",
            "flex items-center justify-center",
            "rounded-xl",
            "bg-gradient-to-r from-purple-600 to-blue-600",
            "text-white font-semibold"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="text-white font-medium text-sm md:text-base">
              {pattern.name}
            </h3>

            <span className="text-xs md:text-sm text-neutral-400 font-mono">
              {pattern.solved}/{pattern.total}
            </span>
          </div>

          {/* Progress */}
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: index * 0.03,
              }}
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            />
          </div>
        </div>

        {/* Icon */}
        <ChevronDown
          className={cn(
            "w-5 h-5 text-neutral-400 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {/* EXPANDED */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-white/10">
              <p className="text-sm text-neutral-400 mb-5 leading-relaxed">
                You have completed{" "}
                <span className="text-white font-semibold">{percentage}%</span>{" "}
                of this pattern. Keep practicing consistently to master
                problem-solving techniques and improve coding speed.
              </p>

              <a
                href={pattern.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2",
                  "px-5 py-3 rounded-xl",
                  "bg-gradient-to-r from-purple-600 to-blue-600",
                  "text-white text-sm font-medium",
                  "hover:opacity-90 transition-all duration-300"
                )}
              >
                <FileText className="w-4 h-4" />
                Open Notes PDF
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
