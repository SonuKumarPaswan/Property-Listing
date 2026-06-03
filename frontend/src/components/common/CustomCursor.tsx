"use client";

import {useEffect, useState} from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      className="fixed w-8 h-8 rounded-full border-2 border-blue-400
             pointer-events-none z-[99999]
             flex items-center justify-center"
      style={{
        left: position.x - 12,
        top: position.y - 20,
      }}
    >
      <span className="text-blue-400 text-7xl leading-none -mt-12">.</span>
    </div>
  );
}
