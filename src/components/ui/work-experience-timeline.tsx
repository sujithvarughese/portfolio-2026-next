"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {Avatar, Button, Flex, Tooltip} from "@mantine/core";
import { logos } from '../IconPill';
import { MdWork, MdLocationOn } from "react-icons/md";

interface WorkExperienceEntry {
  date: string;
  title: string;
  company: string;
  description: string;
  keyPoints: string[];
  tech?: string[];
  location?: string;
}

export const WorkExperienceTimeline = ({ data }: { data: WorkExperienceEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-md sm:w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Professional Experience
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          My journey through the software development industry, showcasing growth from fundamentals to full-stack engineering expertise.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-500 border border-blue-600 p-2 flex items-center justify-center">
                  <MdWork className="h-2 w-2 text-white" />
                </div>
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
                {item.date}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <div className="mb-4">
                <h3 className="block text-2xl mb-2 text-left font-bold text-neutral-500 dark:text-neutral-500">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {item.company}
                  </h4>
                  {item.location && (
                    <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                      <MdLocationOn className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {item.tech && (
                <Flex gap={4} justify={{ base: "center", sm: "flex-start" }} mb={4}>
                  {item.tech.map((tech, techIndex) => (
                    <Tooltip label={tech} key={techIndex}>
                      <Avatar size={40} variant="transparent">
                        {logos[tech]}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Flex>
              )}

              <p className="mb-4 text-sm font-normal text-neutral-800 dark:text-neutral-200">
                {item.description}
              </p>

              <div className="mb-6">
                <h5 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Key Achievements:
                </h5>
                <ul className="space-y-1">
                  {item.keyPoints.map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-blue-500 via-purple-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
