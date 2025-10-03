"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: string; // ISO date string
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({
  targetDate,
  className = "",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) {
    return (
      <div className={`flex justify-center space-x-4 ${className}`}>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px]">
          <div className="text-2xl font-bold text-yellow-300">--</div>
          <div className="text-sm text-gray-300">Days</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px]">
          <div className="text-2xl font-bold text-yellow-300">--</div>
          <div className="text-sm text-gray-300">Hours</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px]">
          <div className="text-2xl font-bold text-yellow-300">--</div>
          <div className="text-sm text-gray-300">Minutes</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px]">
          <div className="text-2xl font-bold text-yellow-300">--</div>
          <div className="text-sm text-gray-300">Seconds</div>
        </div>
      </div>
    );
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className={`flex justify-center space-x-4 ${className}`}>
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px] border border-white/20"
        >
          <motion.div
            key={unit.value} // This will trigger animation when value changes
            initial={{ scale: 1.2, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-yellow-300"
          >
            {String(unit.value).padStart(2, "0")}
          </motion.div>
          <div className="text-xs md:text-sm text-gray-300 font-medium">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
