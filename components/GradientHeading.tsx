'use client';

import React from 'react';

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

const GradientHeading: React.FC<GradientHeadingProps> = ({
  children,
  className = '',
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)'
}) => {
  return (
    <h2
      className={`animated-gradient-text ${className}`}
      style={{
        background: gradient,
        backgroundSize: '300% 100%',
      }}
    >
      <span className="text-content" style={{ background: gradient }}>
        {children}
      </span>
    </h2>
  );
};

export default GradientHeading;
