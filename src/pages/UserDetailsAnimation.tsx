"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UserDetailsAnimationProps {
  children: React.ReactNode;
}

export function UserDetailsAnimation({ children }: UserDetailsAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create a master timeline for coordinated animations
      const masterTL = gsap.timeline();

      // Container entrance animation with 3D perspective
      masterTL.fromTo(
        containerRef.current,
        {
          y: -80,
          opacity: 0,
          rotationX: -15,
          transformPerspective: 1000,
          transformOrigin: "50% 0%",
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "all",
        }
      );

      // Animate child elements with staggered effects
      const childElements = Array.from(containerRef.current.children);
      if (childElements.length > 0) {
        masterTL.to(
          childElements,
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.4)",
            transformOrigin: "50% 50%",
            clearProps: "all",
          },
          "-=0.8"
        ); // Overlap with previous animation
      }

      // Add subtle continuous animations
      if (containerRef.current) {
        // Floating animation for the container
        gsap.to(containerRef.current, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });

        // Subtle scale pulse
        gsap.to(containerRef.current, {
          scale: 1.02,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Add magnetic effect to the back link
  useEffect(() => {
    if (!magneticRef.current) return;

    const magnetic = magneticRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = magnetic.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -(y - rect.height / 2) / 5;
      const rotateY = (x - rect.width / 2) / 5;
      const scale = 1.05;

      gsap.to(magnetic, {
        x: (x - rect.width / 2) * 0.3,
        y: (y - rect.height / 2) * 0.3,
        rotateX,
        rotateY,
        scale,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(magnetic, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      });
    };

    magnetic.addEventListener("mousemove", handleMouseMove);
    magnetic.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      magnetic.removeEventListener("mousemove", handleMouseMove);
      magnetic.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="space-y-6 relative"
      style={{
        opacity: 0,
        transform: "translateY(-80px) rotateX(-15deg)",
        perspective: "1000px",
      }}
    >
      <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
      {children}
    </div>
  );
}
