'use client';

import React from 'react';

export interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * BorderBeam component creates an elegant, gentle glowing beam that travels
 * along the borders of a container, highlighting key features without heavy GPU usage.
 */
export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  size = 250,
  duration = 10,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = '#5bb8fe',
  colorTo = '#006398',
  delay = 0,
}) => {
  return (
    <div
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--anchor': `${anchor}%`,
          '--border-width': `${borderWidth}px`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size)*1)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1))] ${className}`}
    />
  );
};
