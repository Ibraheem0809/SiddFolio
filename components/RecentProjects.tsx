"use client";

import { motion } from "motion/react";
import { ExternalLink, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { PROJECTS } from "@/data/index";

export function Projects() {
  return (
    <section id="projects" className="relative py-32">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-purple-500/10 blur-3xl rounded-full" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-5">
            <Sparkles className="w-4 h-4 text-purple-400" />

            <p className="text-sm text-neutral-300 tracking-wide">
              Featured Work
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Projects I&apos;m <span className="text-purple-500">proud of</span>
          </h1>

          <p className="mt-5 text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">
            A handful of projects I’ve built recently — blending modern UI,
            full-stack development, and AI-powered experiences.
          </p>
        </div>

        {/* Projects */}
        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-50px",
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black-100/60 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.08)] hover:border-purple-500/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(400px circle at 50% 30%, rgba(168,85,247,0.15), transparent 70%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-all">
                  {p.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                  {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  {/* GitHub */}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm hover:bg-white/10 transition"
                  >
                    <FaGithub size={14} className="text-purple-400" />

                    <span className="text-neutral-200">Code</span>
                  </a>

                  {/* Live */}
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-medium text-white hover:opacity-90 transition"
                  >
                    <ExternalLink size={14} />

                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
