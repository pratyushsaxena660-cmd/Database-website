'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CountUpNumberProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({
  end,
  start = 0,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = ''
}) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animate();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  const animate = () => {
    const startTime = performance.now();
    const difference = end - start;

    const updateCount = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + difference * easeOut;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const formatNumber = (num: number): string => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toString();
  };

  const formatWithSuffix = (num: number): string => {
    if (suffix === 'k+') {
      const k = Math.floor(num / 1000);
      return `${k}k+`;
    }
    const formatted = formatNumber(num);
    return `${formatted}${suffix}`;
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {suffix === '+' || suffix === 'k+' || suffix === '%' 
        ? formatWithSuffix(count) 
        : `${formatNumber(count)}${suffix}`}
    </span>
  );
};

export default CountUpNumber;
