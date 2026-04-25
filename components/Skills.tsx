import React from "react";
import { skills } from "@/data";
import { Button } from "./ui/MovingBorders";

interface Skill {
  id: number;
  title: string;
  desc: string;
  className: string;
  img: string[];
  imgName: string[];
}

const Skills: React.FC = () => {
  return (
    <section className="py-20">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-40">
        My Tech <span className="text-purple-500">Skill Overview</span>
      </h1>

      {/* Skills Grid */}
      <div className="w-full mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-40">
        {skills.map((skill: Skill) => (
          <Button
            key={skill.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: "1.68rem",
            }}
            className="flex-1 mb-10 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div
              className="
                flex flex-col h-full p-6 lg:p-8 gap-5
                bg-black-100
                rounded-[inherit]
                overflow-hidden
              "
            >
              {/* Title */}
              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {skill.title}
              </h1>

              {/* Description */}
              <p className="text-sm lg:text-xl font-light lg:font-normal">
                {skill.desc}
              </p>

              {/* Icons + Names */}
              <div className="grid grid-cols-2 gap-4">
                {skill.img.map((icon, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center gap-2"
                  >
                    <img
                      src={icon}
                      alt={skill.imgName[index]}
                      className="w-10 h-10 md:w-12 md:h-12"
                    />
                    <span className="text-xs md:text-sm font-medium text-white/80">
                      {skill.imgName[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Skills;
