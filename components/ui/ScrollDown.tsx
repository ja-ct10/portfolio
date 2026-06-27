"use client";
import { useEffect, useState } from "react";

export default function ScrollDown() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.6, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`scroll-down-wrap${visible ? " visible" : ""}`}
      onClick={handleClick}
    >
      <span className="scroll-down-label"> SCROLL DOWN </span>
      <div className="scroll-down-track">
        <div className="scroll-down-drop" />
      </div>
      <div className="scroll-down-dot" />
    </div>
  );
}