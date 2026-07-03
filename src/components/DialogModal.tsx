import type { ReactNode } from 'react';

type DialogModalProps = {
  open: boolean;
  title: string;
  description: ReactNode;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  onClose?: () => void;
};

export default function DialogModal({
  open,
  title,
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  onClose,
}: DialogModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
    >
      <div
        className="bg-snow rounded-2xl border border-border w-full max-w-sm p-8 flex flex-col gap-6"
        style={{ boxShadow: '0px 20px 40px rgba(0,0,0,0.15)' }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-ink text-h3">{title}</h2>
          <div className="text-slate text-p2 text-left">{description}</div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="btn btn-primary px-6 py-3 rounded-lg text-b2"
            onClick={onPrimary}
          >
            <span className="text-snow">{primaryLabel}</span>
          </button>
          {secondaryLabel && onSecondary && (
            <button
              type="button"
              className="btn btn-secondary px-6 py-3 rounded-lg text-b2"
              onClick={onSecondary}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
