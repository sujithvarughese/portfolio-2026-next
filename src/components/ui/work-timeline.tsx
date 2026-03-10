"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Badge, Box, Card, Flex, Text, Title } from "@mantine/core";
import { ExperienceEntry } from "@/data/experience";

export const WorkTimeline = ({ data }: { data: ExperienceEntry[] }) => {
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
      className="w-full bg-gray-50 dark:bg-neutral-950 font-sans"
      ref={containerRef}
      style={{ position: 'relative' }}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl mb-6 text-black dark:text-white font-bold"
        >
          Professional Experience
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl max-w-3xl mb-10"
        >
          My professional journey through various roles in software development, 
          from junior developer to full-stack engineer, showcasing growth and expanding expertise.
        </motion.p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex justify-start pt-10 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 absolute left-3 md:left-3 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <div className="h-6 w-6 rounded-full bg-white dark:bg-black border-2 border-blue-200 dark:border-purple-300" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-neutral-600 dark:text-neutral-400">
                {item.date}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <Card shadow="lg" padding="xl" radius="lg" className="mb-6 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                <Flex direction="column" gap="md">
                  <Box>
                    <Title order={2} className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">
                      {item.position}
                    </Title>
                    <Title order={3} className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-1">
                      {item.company}
                    </Title>
                    <Text size="lg" className="text-neutral-600 dark:text-neutral-400 mb-3">
                      {item.location} • {item.date}
                    </Text>
                  </Box>

                  <Text size="md" className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </Text>

                  <Box>
                    <Title order={4} className="text-lg font-semibold text-black dark:text-white mb-3">
                      Key Achievements:
                    </Title>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.1) + (achievementIndex * 0.05) }}
                          className="flex items-start"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mt-2 mr-3 flex-shrink-0" />
                          <Text size="sm" className="text-neutral-700 dark:text-neutral-300">
                            {achievement}
                          </Text>
                        </motion.li>
                      ))}
                    </ul>
                  </Box>

                  {item.skills && (
                    <Box>
                      <Title order={4} className="text-lg font-semibold text-black dark:text-white mb-3">
                        Technologies Used:
                      </Title>
                      <Flex gap="xs" wrap="wrap">
                        {item.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="gradient"
                            gradient={{ from: 'blue', to: 'purple' }}
                            size="lg"
                            radius="md"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </Flex>
                    </Box>
                  )}
                </Flex>
              </Card>
            </div>
          </motion.div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-blue-200 dark:via-purple-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-blue-500 via-purple-500 to-blue-600 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
