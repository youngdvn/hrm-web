"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";

export function useWorkTimer(startTime?: string | null, isActive: boolean = false): string {
  const [elapsed, setElapsed] = useState<string>("");

  useEffect(() => {
    if (!isActive || !startTime) {
      setElapsed("");
      return;
    }

    const calc = () => {
      const start = dayjs(startTime);
      const now = dayjs();
      const diffSec = now.diff(start, "second");

      if (diffSec < 0) {
        setElapsed("0h 00m");
        return;
      }

      const hours = Math.floor(diffSec / 3600);
      const minutes = Math.floor((diffSec % 3600) / 60);
      const seconds = diffSec % 60;

      const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
      setElapsed(`${hours}h ${pad(minutes)}m ${pad(seconds)}s`);
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [startTime, isActive]);

  return elapsed;
}

