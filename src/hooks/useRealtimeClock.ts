"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";

export function useRealtimeClock(locale: string = "vi") {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = dayjs().locale(locale);
      setTime(now.format("HH:mm:ss"));
      const rawDate = now.format("dddd, DD/MM/YYYY");
      setDate(rawDate.charAt(0).toUpperCase() + rawDate.slice(1));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [locale]);

  return { time, date };
}

