"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import DisplayTime from "@/utils/DisplayTime";
import GetWeatherAnimation from "@/utils/GetWeatherAnimation";
import Lottie from "lottie-react";
import { AnimatePresence, motion } from "framer-motion";
import WeatherAnimations from "@/utils/WeatherAnimations";

type Props = {
  hourlyData: any[];
  timezoneOffset: number;
  todayData: { sunrise: number; sunset: number };
  tomorrowData: { sunrise: number; sunset: number };
};

export default function HourlyForecast({
  hourlyData,
  timezoneOffset,
  todayData,
  tomorrowData,
}: Props) {
  /* -------------- helpers -------------- */
  const isDay = (ts: number) =>
    (ts >= todayData.sunrise && ts <= todayData.sunset) ||
    (ts >= tomorrowData.sunrise && ts <= tomorrowData.sunset);

  /* -------------- layout calc -------------- */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1); // for slide animation

  const measure = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const liWidth = 64; // Tailwind w-16
    const gap = 8;      // Tailwind gap-2 => 0.5rem
    const perPage = Math.max(1, Math.floor((c.offsetWidth + gap) / (liWidth + gap)));
    setItemsPerPage(perPage);
    setPage(0); // reset to first page if layout changes
  }, []);

  /* observe size once mounted */
  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  /* -------------- paging logic -------------- */
  const totalPages = Math.ceil(24 / itemsPerPage);
  const sliceStart = page * itemsPerPage;
  const visible = hourlyData.slice(sliceStart, sliceStart + itemsPerPage);

  const handlePrev = () => {
    setDirection(-1);
    setPage((p) => Math.max(0, p - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setPage((p) => Math.min(totalPages - 1, p + 1));
  };

 
  const slideVariants = {
    enter: (dir: 1 | -1) => ({ x: dir * 100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: dir * -100, opacity: 0 }),
  };


  return (
    <div className="flex items-center justify-between h-full w-full">

      {/* left button */}
      <button
        onClick={handlePrev}
        disabled={page === 0}
        className="disabled:text-gray-400 p-1"
      >
        <CircleChevronLeft className="w-6 h-6" />
      </button>

      {/* forecast */}
      <div ref={containerRef} className="flex-1 overflow-hidden">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.ul
            key={page}               
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="flex gap-2"
          >
            {visible.map((hour: any, index: number) => (
              <li
                key={index}
                className="w-16 flex flex-col items-center"
              >
                <p className="text-xs pt-1"> {DisplayTime(hour.dt + timezoneOffset)}</p>
                <div className="w-14 h-14">
                  <Lottie
                    animationData={WeatherAnimations[GetWeatherAnimation(
                      hour.weather[0].id,
                      isDay(hour.dt),
                      hour.wind_speed
                    )]}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <p className="text-sm pb-1 font-medium">{Math.round(hour.temp)}°</p>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      {/* right button */}
      <button
        onClick={handleNext}
        disabled={page === totalPages - 1}
        className="disabled:text-gray-400 p-1"
      >
        <CircleChevronRight className="w-6 h-6" />
      </button>

    </div>
  );
}
