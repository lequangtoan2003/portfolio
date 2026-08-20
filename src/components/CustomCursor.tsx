"use client";

import { useEffect, useRef } from "react";

type CursorPoint = {
  x: number;
  y: number;
};

const cursorRingSize = 40;
const dotCenterOffset = 17;
const ringFollowSpeed = 0.075;
const reducedMotionFollowSpeed = 0.65;
const pointerVelocityDecay = 0.86;
const velocitySmoothing = 0.14;
const maxDotOffset = 13;
const dotFollowSpeed = 0.16;
const dotVelocityStrength = 0.72;

function clamp(value: number, minValue: number, maxValue: number) {
  return Math.min(Math.max(value, minValue), maxValue);
}

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ring = ringRef.current;
    const dot = dotRef.current;

    if (!ring || !dot) {
      return;
    }

    let animationFrame = 0;
    let isActive = false;
    let hasPointerPosition = false;
    let target: CursorPoint = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    let current: CursorPoint = { ...target };
    let previousTarget: CursorPoint = { ...target };
    let dotOffset: CursorPoint = { x: 0, y: 0 };
    let pointerVelocity: CursorPoint = { x: 0, y: 0 };
    let smoothedVelocity: CursorPoint = { x: 0, y: 0 };

    document.documentElement.dataset.customCursor = "true";

    const handlePointerMove = (event: PointerEvent) => {
      isActive = true;
      document.documentElement.dataset.customCursorState = "active";

      const nextTarget = {
        x: event.clientX,
        y: event.clientY,
      };

      if (!hasPointerPosition) {
        hasPointerPosition = true;
        target = nextTarget;
        current = nextTarget;
        previousTarget = nextTarget;
        return;
      }

      pointerVelocity = {
        x: nextTarget.x - previousTarget.x,
        y: nextTarget.y - previousTarget.y,
      };
      target = nextTarget;
      previousTarget = nextTarget;
    };

    const handlePointerLeave = () => {
      isActive = false;
      pointerVelocity = { x: 0, y: 0 };
      smoothedVelocity = { x: 0, y: 0 };
      document.documentElement.removeAttribute("data-custom-cursor-state");
    };

    const render = () => {
      const followSpeed = reduceMotion.matches
        ? reducedMotionFollowSpeed
        : ringFollowSpeed;

      current = {
        x: current.x + (target.x - current.x) * followSpeed,
        y: current.y + (target.y - current.y) * followSpeed,
      };

      smoothedVelocity = {
        x:
          smoothedVelocity.x +
          (pointerVelocity.x - smoothedVelocity.x) * velocitySmoothing,
        y:
          smoothedVelocity.y +
          (pointerVelocity.y - smoothedVelocity.y) * velocitySmoothing,
      };

      const pointerSpeed = Math.hypot(smoothedVelocity.x, smoothedVelocity.y);
      const targetDotOffset =
        pointerSpeed > 0.01
          ? {
              x: clamp(
                smoothedVelocity.x * dotVelocityStrength,
                -maxDotOffset,
                maxDotOffset,
              ),
              y: clamp(
                smoothedVelocity.y * dotVelocityStrength,
                -maxDotOffset,
                maxDotOffset,
              ),
            }
          : { x: 0, y: 0 };

      pointerVelocity = {
        x: pointerVelocity.x * pointerVelocityDecay,
        y: pointerVelocity.y * pointerVelocityDecay,
      };
      dotOffset = {
        x: dotOffset.x + (targetDotOffset.x - dotOffset.x) * dotFollowSpeed,
        y: dotOffset.y + (targetDotOffset.y - dotOffset.y) * dotFollowSpeed,
      };

      ring.style.transform = `translate3d(${current.x - cursorRingSize / 2}px, ${
        current.y - cursorRingSize / 2
      }px, 0)`;
      dot.style.transform = `translate3d(${dotCenterOffset + dotOffset.x}px, ${
        dotCenterOffset + dotOffset.y
      }px, 0)`;

      if (!isActive) {
        ring.style.transform = `translate3d(${target.x - cursorRingSize / 2}px, ${
          target.y - cursorRingSize / 2
        }px, 0)`;
        dot.style.transform = `translate3d(${dotCenterOffset}px, ${dotCenterOffset}px, 0)`;
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      document.documentElement.removeAttribute("data-custom-cursor");
      document.documentElement.removeAttribute("data-custom-cursor-state");
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true">
      <span ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
