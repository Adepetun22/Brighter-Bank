import React from 'react';

type Size = 'sm' | 'md' | 'lg';

type Props = {
  size?: Size;
  message?: string;
  overlay?: boolean;
};

const sizeMap: Record<Size, string> = {
  sm: 'w-6 h-6 border-2',
  md: 'w-8 h-8 border-4',
  lg: 'w-12 h-12 border-4',
};

export default function LoadingSpinner({ size = 'md', message, overlay = false }: Props) {
  const sizeClass = sizeMap[size];

  const spinner = (
    <div className="flex items-center gap-3">
      <div
        aria-hidden
        className={`${sizeClass} animate-spin rounded-full border-t-primary border-slate-200 border-solid`}
      />
      {message ? <div className="text-slate text-p3">{message}</div> : null}
    </div>
  );

  if (overlay) {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30">
        <div className="bg-snow rounded-lg p-4 shadow-md">{spinner}</div>
      </div>
    );
  }

  return spinner;
}
