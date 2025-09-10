"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {Anchor, Avatar, Button, Flex, Image, Tooltip} from "@mantine/core";
import { logos } from '../IconPill'
import {LiaGithub, LiaRocketSolid} from "react-icons/lia";
import {FaAppStore} from "react-icons/fa";

interface TimelineEntry {
  date: string;
  title: string;
  description?: string;
  images?: string[];
  appStore?: string;
  link?: string;
  github?: string;
  tech?: string[];
  isMobile?: boolean;
  openMobileAlert?: () => void;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
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
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Projects throughout my journey.
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          A showcase of the web and mobile applications I’ve designed, built, and deployed over the past five years, highlighting growth, creativity, and technical skill.
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
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.date}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              <Flex gap={4} justify={{ base: "center", sm: "flex-start" }}>
                {item?.tech?.map((item, index) => <Tooltip label={item} key={index} ><Avatar size={40} variant="transparent">{logos[item]}</Avatar></Tooltip>)}
              </Flex>
              <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                {item.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {item.images?.map(image =>
                  <Image
                    src={image}
                    alt="hero template"
                    width={500}
                    height={500}
                    className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                  />
                )}
              </div>
              <Flex gap={12} justify="center" wrap="wrap" pt={12}>
                {item.appStore &&
                  <Button
                    component="a"
                    href={item.appStore}
                    variant="light" size="lg"
                    target="_blank"
                    leftSection={<FaAppStore size={24}/>}
                  >App Store
                  </Button>
                }
                {item.link &&
                  <>
                    {item.isMobile ?
                      <Button variant="light" size="lg" onClick={item.openMobileAlert} leftSection={<LiaRocketSolid size={24}/>}>Demo</Button>
                      :
                      <Button component="a" variant="light" size="lg" href={item.link} target="_blank" rel="noreferrer" leftSection={<LiaRocketSolid size={24} /> }>Demo</Button>
                    }
                  </>
                }
                <Button
                  component="a"
                  variant="light"
                  size="lg"
                  href={item.github}
                  target="_blank"
                  rel="noreferrer"
                  leftSection={<LiaGithub size={24} />}
                >Github
                </Button>
              </Flex>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
