"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

interface ThreeDCardProps {
  children: React.ReactNode;
  intensity?: number;
}

export function ThreeDCard({ children, intensity = 25 }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -(y - rect.height / 2) / intensity;
      const rotateY = (x - rect.width / 2) / intensity;

      gsap.to(card, {
        rotateX,
        rotateY,
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
      gsap
        .timeline()
        .to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 1,
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
      gsap.to(glow, {
        opacity: 0.6,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [intensity]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
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
        className="relative z-10 transform-gpu will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
