"use client";

import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

interface HrmScrollToTopProps {
  isVi?: boolean;
  threshold?: number;
}

export function HrmScrollToTop({ isVi = true, threshold = 300 }: HrmScrollToTopProps) {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (currentScrollY > threshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (scrollHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, (currentScrollY / scrollHeight) * 100));
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Tooltip
            title={isVi ? "Cuộn lên đầu trang" : "Scroll to top"}
            placement="left"
            arrow={{ pointAtCenter: true }}
          >
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              aria-label={isVi ? "Cuộn lên đầu trang" : "Scroll to top"}
              className="relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-xl shadow-blue-500/35 border border-white/30 backdrop-blur-xs cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              {/* Circular scroll progress indicator ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 48 48"
              >
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-white/20"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-white transition-all duration-100 ease-out"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>

              {/* Up arrow icon */}
              <ArrowUpOutlined className="text-base group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.button>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

