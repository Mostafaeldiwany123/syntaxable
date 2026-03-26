import { useEffect, useRef, useState } from "react";

type CursorType = "default" | "pointer" | "text";

/**
 * ShowcaseCursor — Premium showcase cursor.
 * Uses the user-provided SVG path for the main pointer.
 * Features:
 * - Directional motion blur based on velocity.
 * - Dynamic scaling on click.
 * - Distinct states for pointer (hand) and text selection.
 */
export function ShowcaseCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>("default");

  const pos = useRef({ x: -100, y: -100 });
  const lastPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Detect cursor type
      const target = e.target as HTMLElement;
      if (target) {
        const computed = window.getComputedStyle(target).cursor;
        if (computed === "pointer") setCursorType("pointer");
        else if (computed === "text") setCursorType("text");
        else setCursorType("default");
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const tick = () => {
      if (!wrapperRef.current) return;

      // Calculate velocity for motion blur
      const dx = pos.current.x - lastPos.current.x;
      const dy = pos.current.y - lastPos.current.y;
      
      // Lerp velocity for smoothness
      velocity.current.x = velocity.current.x * 0.7 + dx * 0.3;
      velocity.current.y = velocity.current.y * 0.7 + dy * 0.3;
      
      lastPos.current = { ...pos.current };

      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      
      // Motion blur logic
      // We use a combination of blur and scale/skew to simulate movement blur
      const blur = Math.min(speed * 0.5, 4);
      const scaleX = 1 + Math.min(speed * 0.015, 0.4);
      const angle = Math.atan2(velocity.current.y, velocity.current.x);
      
      wrapperRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      
      const inner = wrapperRef.current.querySelector<HTMLDivElement>(".cursor-inner");
      if (inner) {
        if (speed > 1) {
          inner.style.filter = `blur(${blur}px)`;
          // Rotate the container to align with velocity, then apply directional stretch
          inner.style.transform = `rotate(${angle}rad) scaleX(${scaleX}) rotate(${-angle}rad)`;
        } else {
          inner.style.filter = "none";
          inner.style.transform = "none";
        }
      }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
      
      <div
        ref={wrapperRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <div 
          className="cursor-inner"
          style={{
            transition: "transform 0.1s ease, filter 0.1s ease",
            willChange: "transform, filter",
          }}
        >
          {/* Default Arrow - User Provided SVG */}
          {cursorType === "default" && (
            <svg 
              width="42" 
              height="42" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: `scale(${clicking ? 0.9 : 1})`,
                transition: "transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                // The hotspot should be at the tip (top left-ish of the path)
                // We shift it so the point (approx 8, 3.8) is under the mouse
                margin: "-4px 0 0 -4px"
              }}
            >
              {/* Using a drop shadow for visibility instead of the "weird" one */}
              <path 
                d="M17.2607 12.4008C19.3774 11.2626 20.4357 10.6935 20.7035 10.0084C20.9359 9.41393 20.8705 8.74423 20.5276 8.20587C20.1324 7.58551 18.984 7.23176 16.6872 6.52425L8.00612 3.85014C6.06819 3.25318 5.09923 2.95471 4.45846 3.19669C3.90068 3.40733 3.46597 3.85584 3.27285 4.41993C3.051 5.06794 3.3796 6.02711 4.03681 7.94545L6.94793 16.4429C7.75632 18.8025 8.16052 19.9824 8.80519 20.3574C9.36428 20.6826 10.0461 20.7174 10.6354 20.4507C11.3149 20.1432 11.837 19.0106 12.8813 16.7454L13.6528 15.0719C13.819 14.7113 13.9021 14.531 14.0159 14.3736C14.1168 14.2338 14.2354 14.1078 14.3686 13.9984C14.5188 13.8752 14.6936 13.7812 15.0433 13.5932L17.2607 12.4008Z" 
                fill="#000000"
                stroke="#FFFFFF" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}

          {/* Pointer / Hand State */}
          {cursorType === "pointer" && (
            <div style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#000",
              border: "2px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${clicking ? 0.8 : 1.2})`,
              transition: "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              margin: "-16px 0 0 -16px"
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#fff" }} />
            </div>
          )}

          {/* Text State */}
          {cursorType === "text" && (
            <div style={{
              width: 2,
              height: 24,
              backgroundColor: "#000",
              borderLeft: "2px solid #fff",
              borderRight: "2px solid #fff",
              transform: `scale(${clicking ? 0.9 : 1})`,
              margin: "-12px 0 0 -1px"
            }} />
          )}
        </div>

        {/* Click Feedback */}
        {clicking && (
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.2)",
              transform: "translate(-20px, -20px)",
              animation: "ripple 0.4s ease-out forwards"
            }}
          />
        )}
      </div>
    </>
  );
}
