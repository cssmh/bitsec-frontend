"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface UserDetailsAnimationProps {
  children: React.ReactNode;
}

export function UserDetailsAnimation({ children }: UserDetailsAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Animate the container
      gsap.fromTo(
        container,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );

      // Animate child elements
      const childElements = Array.from(container.children);
      if (childElements.length > 0) {
        gsap.fromTo(
          childElements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-4">
      {children}
    </div>
  );
}
