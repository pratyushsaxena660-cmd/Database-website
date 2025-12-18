'use client';

import CountUp from '@/components/CountUp';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  color?: string;
  className?: string;
}

export function StatCounter({ 
  value, 
  label, 
  suffix = '', 
  color = 'var(--color-primary)',
  className = '' 
}: StatCounterProps) {
  // Handle "k" suffix for thousands (e.g., "k+" means show value/1000 + "k+")
  const hasK = suffix.includes('k');
  const displayValue = hasK && value >= 1000 ? Math.round(value / 1000) : value;
  const displaySuffix = suffix;

  return (
    <div className={`text-center ${className}`}>
      <div className="mb-2 text-4xl font-bold" style={{ color }}>
        <CountUp to={displayValue} duration={2} separator="" />
        {displaySuffix}
      </div>
      <div className="text-sm text-[var(--color-text-muted)]">{label}</div>
    </div>
  );
}

