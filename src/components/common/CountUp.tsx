'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

export interface CountUpProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 1.8,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // Parse raw value into prefix, target number, suffix, and decimal count
  const rawStr = String(value).trim();
  const match = rawStr.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);

  const prefix = match ? match[1] : '';
  const numStr = match ? match[2].replace(/,/g, '') : '';
  const suffix = match ? match[3] : '';
  const targetNum = parseFloat(numStr);
  const isNumeric = !isNaN(targetNum);

  // Determine decimal places
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;

  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out expo for smooth decelerating landing
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = easeOut * targetNum;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetNum);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, targetNum, duration, isNumeric]);

  if (!isNumeric) {
    return <span ref={ref} className={className}>{rawStr}</span>;
  }

  return (
    <span ref={ref} className={`inline-block tabular-nums tracking-tight ${className}`}>
      {prefix}
      {displayValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};
