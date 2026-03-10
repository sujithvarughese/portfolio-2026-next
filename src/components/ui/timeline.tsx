"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Badge, Box, Card, Flex, Image, Text, Title, Button, Avatar, Tooltip } from "@mantine/core";
import { logos } from '@/lib/icons'
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
      className="w-full bg-gray-50 dark:bg-neutral-950 font-sans"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl mb-6 text-black dark:text-white font-bold"
        >
          Featured Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl max-w-3xl mb-10"
        >
          A showcase of the web and mobile applications I’ve designed, built, and deployed over the past five years, highlighting growth, creativity, and technical skill.
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
                      {item.title}
                    </Title>
                    <Text size="lg" className="text-neutral-600 dark:text-neutral-400 mb-3">
                      {item.date}
                    </Text>
                  </Box>

                  <Text size="md" className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </Text>

                  {item.images && item.images.length > 0 && (
                    <Box>
                      <Title order={4} className="text-lg font-semibold text-black dark:text-white mb-3">
                        Screenshots:
                      </Title>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {item.images.map((image, imageIndex) => (
                          <motion.div
                            key={imageIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: (index * 0.1) + (imageIndex * 0.1) }}
                          >
                            <Image
                              src={image}
                              alt={`${item.title} screenshot`}
                              radius="md"
                              className="h-32 md:h-48 w-full object-cover border border-neutral-200 dark:border-neutral-700"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </Box>
                  )}

                  {item.tech && (
                    <Box>
                      <Title order={4} className="text-lg font-semibold text-black dark:text-white mb-3">
                        Technologies Used:
                      </Title>
                      <Flex gap="xs" wrap="wrap">
                        {item.tech.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: (index * 0.1) + (techIndex * 0.05) }}
                          >
                            <Badge
                              variant="gradient"
                              gradient={{ from: 'blue', to: 'purple' }}
                              size="lg"
                              radius="md"
                              leftSection={logos[tech]}
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </Flex>
                    </Box>
                  )}

                  <Box>
                    <Title order={4} className="text-lg font-semibold text-black dark:text-white mb-3">
                      Project Links:
                    </Title>
                    <Flex gap="xs" wrap="wrap">
                      {item.appStore && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.1) + 0.1 }}
                        >
                          <Button
                            component="a"
                            href={item.appStore}
                            variant="gradient"
                            gradient={{ from: '#007AFF', to: '#0051D5', deg: 135 }}
                            size="md"
                            target="_blank"
                            leftSection={<FaAppStore size={18}/>}
                          >
                            App Store
                          </Button>
                        </motion.div>
                      )}
                      {item.link && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.1) + 0.15 }}
                        >
                          {item.isMobile ? (
                            <Button 
                              variant="gradient" 
                              gradient={{ from: 'green', to: 'teal' }}
                              size="md" 
                              onClick={item.openMobileAlert} 
                              leftSection={<LiaRocketSolid size={18}/>}
                            >
                              Demo
                            </Button>
                          ) : (
                            <Button 
                              component="a" 
                              variant="gradient" 
                              gradient={{ from: 'green', to: 'teal' }}
                              size="md" 
                              href={item.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              leftSection={<LiaRocketSolid size={18} />}
                            >
                              Demo
                            </Button>
                          )}
                        </motion.div>
                      )}
                      {item.github && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.1) + 0.2 }}
                        >
                          <Button
                            component="a"
                            variant="gradient"
                            gradient={{ from: 'gray', to: 'dark' }}
                            size="md"
                            href={item.github}
                            target="_blank"
                            rel="noreferrer"
                            leftSection={<LiaGithub size={18} />}
                          >
                            GitHub
                          </Button>
                        </motion.div>
                      )}
                    </Flex>
                  </Box>
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
