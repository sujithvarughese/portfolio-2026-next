"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import { Image } from "@mantine/core";

type Testimonial = {
  quote: string;
  src: string;
};

export const SimpleTestimonials = ({
  testimonials,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
          <div className="mx-auto px-2 py-20 font-sans antialiased w-full max-w-sm md:max-w-lg md:px-8 lg:px-12">
      <div className="relative">
        <div className="relative h-60 w-60 md:h-80 md:w-80 m-auto">
          {testimonials.map((testimonial, index) => {
            const offset = (index - active + testimonials.length) % testimonials.length;
            const isActive = index === active;

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 cursor-pointer`}
                style={{
                  transform: `
                    translateX(${offset * 8}px) 
                    translateY(${offset * 8}px) 
                    scale(${1 - offset * 0.05})
                    rotateZ(${offset * 2}deg)
                  `,
                  zIndex: testimonials.length - offset,
                  opacity: offset > 2 ? 0 : 1 - offset * 0.2,
                }}
                onClick={() => setActive(index)}
              >
                <Image
                  src={testimonial.src}
                  alt={testimonial.quote}
                  draggable={false}
                  className="h-full w-full rounded-2xl object-cover object-center shadow-lg"
                  style={{ borderRadius: '16px' }}
                />
              </div>
            );
          })}
        </div>
                  <div className="flex flex-col justify-between py-4">
          <p className="mt-8 text-sm md:text-lg text-gray-500 dark:text-neutral-300 text-center px-2 break-words">
            {testimonials[active]?.quote}
          </p>
          <div className="flex gap-4 md:gap-12 pt-8 md:pt-12 justify-center">
            <button
              onClick={handlePrev}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
