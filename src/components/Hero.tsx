"use client"
import { motion, AnimatePresence } from "motion/react"
import { fullName, bio, heroImages } from '@/data/data'
import React, { useEffect, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Anchor, Box, Button, Flex, Title } from '@mantine/core'
import { HeroForm } from "@/components/chatbot/HeroForm";
import { AuroraBackground } from "@/components/ui/aurora-background";

const emailAddress = "sujith.varug@gmail.com"

type HeroProps = {
  form: any,
  handleSubmit: () => Promise<void>,
  openDrawer: () => void,
}

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex === 0) {
      const initialTimer = setTimeout(() => {
        setCurrentIndex(1);
      }, delay);
      return () => clearTimeout(initialTimer);
    }

    if (currentIndex > 0 && currentIndex <= text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

const Hero: React.FC<HeroProps> = ({ form, handleSubmit, openDrawer }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = heroImages.length;
  const handlePrev = () =>
    setActiveImage((prev) => (prev - 1 + total) % total);
  const handleNext = () => setActiveImage((prev) => (prev + 1) % total);
  const current = heroImages[activeImage];
  const currentSrc =
    isMobile && 'srcMobile' in current && current.srcMobile
      ? current.srcMobile
      : current.src;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        paddingTop: '80px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <AuroraBackground />
      <Box
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          width: '100%',
        }}
        px={{ base: 'sm', md: 'xl' }}
        py={{ base: 'md', md: 'xl' }}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap={{ base: 'xl', md: '3rem' }}
          style={{ minHeight: 'calc(100vh - 80px)', width: '100%' }}
        >
          {/* ===== Overlapping boxes: picture + info card ===== */}
          <Box
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1100px',
            }}
          >
            {/* Picture box — widescreen on md+, vertical on small screens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative aspect-[3/4] md:aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl"
              style={{
                boxShadow:
                  '0 25px 60px -15px rgba(0,0,0,0.55), 0 10px 25px -10px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.08)',
                marginLeft: 'auto',
                marginRight: 0,
                width: '100%',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSrc}
                  src={currentSrc}
                  alt={fullName}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                  }}
                />
              </AnimatePresence>
            </motion.div>

            {/* Info card — overlaps the picture */}
            <div className="hero-info-card">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              >
              <Box
                style={{
                  background:
                    'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '20px',
                  boxShadow:
                    '0 25px 60px -15px rgba(0,0,0,0.6), 0 10px 25px -10px rgba(34,211,238,0.15)',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <Title
                  order={1}
                  className="tracking-tight"
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                    lineHeight: 1.1,
                    marginBottom: '0.5rem',
                  }}
                >
                  <span className="bg-gradient-to-br from-white to-gray-200 bg-clip-text text-transparent">
                    {fullName.split(" ")[0]}{" "}
                  </span>
                  <span className="gradient-text-animated">
                    {fullName.split(" ").slice(1).join(" ")}
                  </span>
                </Title>

                <Title
                  order={3}
                  style={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                    marginBottom: '0.75rem',
                    textAlign: 'center',
                  }}
                >
                  <TypewriterText text={bio} delay={400} />
                </Title>

                <Flex align="center" gap={6} mb={14} justify="center">
                  <IoLocationSharp fontSize={20} color="#22d3ee" />
                  <span style={{ color: 'white', fontSize: '0.95rem' }}>
                    <TypewriterText text="Miami, FL" delay={1100} />
                  </span>
                </Flex>

                <Flex
                  direction={{ base: 'column', lg: 'row' }}
                  gap={{ base: 4, lg: 'xl' }}
                  align="flex-start"
                  mb={12}
                >
                  <Flex direction="column" gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Anchor
                      href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718361/diploma_mv2evg.png"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-200 hover:text-violet-300"
                      style={{ color: '#22d3ee', fontSize: '0.9rem' }}
                    >
                      Bachelor&apos;s Diploma
                    </Anchor>
                    <Anchor
                      href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747725035/CompTIA_A_ce_certificate_tfbzb8.png"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-200 hover:text-violet-300"
                      style={{ color: '#22d3ee', fontSize: '0.9rem' }}
                    >
                      CompTIA A+
                    </Anchor>
                    <Anchor
                      href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747725095/Meta_front_end_certificate-_Coursera_eeuipu.png"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-200 hover:text-violet-300"
                      style={{ color: '#22d3ee', fontSize: '0.9rem' }}
                    >
                      Meta Front End Developer
                    </Anchor>
                    <Anchor
                      href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718364/accounting_certificate_ff7vvg.png"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-200 hover:text-violet-300"
                      style={{ color: '#22d3ee', fontSize: '0.9rem' }}
                    >
                      Accounting Technology
                    </Anchor>
                    <Anchor
                      href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718364/business_management_cert_kmza3i.png"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-200 hover:text-violet-300"
                      style={{ color: '#22d3ee', fontSize: '0.9rem' }}
                    >
                      Business Management
                    </Anchor>
                  </Flex>

                  <Flex direction="column" gap={4} align="flex-start" style={{ flex: 1, minWidth: 0 }}>
                    <Anchor
                      href="/resume"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-200 hover:text-violet-300"
                      style={{ color: '#22d3ee', fontSize: '0.9rem' }}
                    >
                      Resumé
                    </Anchor>
                    <Anchor
                      href="https://www.linkedin.com/in/sujithvarughese/"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-200 hover:text-violet-300"
                      style={{ color: '#22d3ee', fontSize: '0.9rem' }}
                    >
                      LinkedIn
                    </Anchor>
                    <Anchor
                      href="http://github.com/sujithvarughese"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-200 hover:text-violet-300"
                      style={{ color: '#22d3ee', fontSize: '0.9rem' }}
                    >
                      GitHub
                    </Anchor>
                    <Button
                      mt={8}
                      component="a"
                      variant="gradient"
                      gradient={{ from: '#10b981', to: '#22d3ee', deg: 135 }}
                      href={`mailto:${emailAddress}`}
                      className="hover-lift"
                      size="sm"
                      style={{
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.35)',
                        border: 'none',
                      }}
                    >
                      Contact Me
                    </Button>
                  </Flex>
                </Flex>

              </Box>
              </motion.div>
            </div>
          </Box>

          {/* ===== Testimonial quote under the image with side arrows ===== */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              alignItems: 'center',
              columnGap: '1rem',
              width: '100%',
              maxWidth: '820px',
              minHeight: '3.5rem',
            }}
          >
            <button
              type="button"
              aria-label="Previous image"
              onClick={handlePrev}
              style={{
                position: 'relative',
                justifySelf: 'start',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 9999,
                background: 'rgba(15, 23, 42, 0.55)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
            >
              <IconArrowLeft className="h-5 w-5" />
            </button>

            <div style={{ minWidth: 0, textAlign: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.quote}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                    margin: 0,
                    padding: '0 1rem',
                  }}
                >
                  &ldquo;{current.quote}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="Next image"
              onClick={handleNext}
              style={{
                position: 'relative',
                justifySelf: 'end',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 9999,
                background: 'rgba(15, 23, 42, 0.55)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
            >
              <IconArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* ===== Chat input below ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ width: '100%', maxWidth: '640px' }}
          >
            <Box
              style={{
                background: 'rgba(255,255,255,0.96)',
                borderRadius: '18px',
                padding: '1.25rem 1.5rem',
                boxShadow:
                  '0 20px 50px -15px rgba(0,0,0,0.5), 0 8px 20px -10px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              <Title
                order={4}
                ta="center"
                mb={12}
                style={{ color: '#1f2937', fontWeight: 600 }}
              >
                AI Assistant
              </Title>
              <HeroForm form={form} handleSubmit={handleSubmit} openDrawer={openDrawer} />
            </Box>
          </motion.div>
        </Flex>
      </Box>
    </Box>
  )
}

export default Hero
