'use client';

import type { ReactNode } from 'react';

interface FloatingLinesBackgroundProps {
  children: ReactNode;
}

/**
 * Simple animated lines background for headers / sections.
 * No refs or DOM measurements -> no "clientWidth of null" errors.
 */
export default function FloatingLinesBackground({
  children,
}: FloatingLinesBackgroundProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Animated line/grid layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      >
        <div className="absolute -left-1/4 top-0 h-full w-[200%] bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_55%),_linear-gradient(to_right,_rgba(148,163,184,0.18)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(148,163,184,0.1)_1px,_transparent_1px)] animate-floating-lines" />
      </div>

      {/* Real content */}
      <div className="relative">{children}</div>
    </div>
  );
}