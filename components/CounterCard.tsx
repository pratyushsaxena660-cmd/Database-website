'use client';

import React from 'react';
import CountUpNumber from './CountUpNumber';

interface CounterCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  className?: string;
  valueClassName?: string;
}

const CounterCard: React.FC<CounterCardProps> = ({
  value,
  label,
  suffix = '',
  prefix = '',
  className = '',
  valueClassName = ''
}) => {
  return (
    <div className={className}>
      <p className={`text-lg font-semibold text-[var(--color-text)] ${valueClassName}`}>
        <CountUpNumber
          end={value}
          suffix={suffix}
          prefix={prefix}
          duration={2}
        />
      </p>
      <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
    </div>
  );
};

export default CounterCard;
