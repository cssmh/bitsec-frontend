"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface ThreeDCardProps {
  children: React.ReactNode;
  intensity?: number;
}

export function ThreeDCard({ children, intensity = 20 }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -(y - rect.height / 2) / intensity;
      const rotateY = (x - rect.width / 2) / intensity;
      const translateZ = 30;

      // Card transformation
      gsap.to(card, {
        rotateX,
        rotateY,
        translateZ,
        transformPerspective: 1000,
        duration: 0.8,
        ease: "power2.out",
      });

      // Glow effect follows mouse
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;

      gsap.to(glow, {
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(59, 130, 246, 0.4), transparent 70%)`,
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);

      gsap
        .timeline()
        .to(card, {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        })
        .to(
          glow,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          0
        );
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(glow, {
        opacity: 0.6,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);

    // Initial entrance animation
    gsap.fromTo(
      card,
      {
        rotationY: -10,
        rotationX: 5,
        opacity: 0,
        scale: 0.9,
        transformPerspective: 1000,
      },
      {
        rotationY: 0,
        rotationX: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)",
        delay: 0.3,
      }
    );

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [intensity]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full"
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-500 rounded-xl z-0"
      />

      {/* Main card with 3D effect */}
      <div
        ref={cardRef}
        className="relative z-10 transform-gpu transition-all duration-500 will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0)",
        }}
      >
        {children}

        {/* Subtle edge lighting */}
        {isHovered && (
          <>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60" />
          </>
        )}
      </div>
    </motion.div>
  );
}
