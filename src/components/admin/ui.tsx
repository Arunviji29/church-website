import { type ReactNode, type FormEvent } from 'react';

export function Field({
  label,
  children,
  optional = false,
}: {
  label: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {label}
        {optional && (
          <span className="normal-case text-neutral-400"> (optional)</span>
        )}
      </label>
      {children}
    </div>
  );
}

export const inputClasses =
  'w-full rounded-xl border border-neutral-200 bg-cream px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-gold focus:ring-2 focus:ring-gold/30';

export interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-card-hover sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-xl font-semibold text-navy">{title}</h3>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

export interface ConfirmDeleteProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDelete({ name, onConfirm, onCancel }: ConfirmDeleteProps) {
  return (
    <div>
      <p className="text-sm leading-relaxed text-neutral-600">
        Are you sure you want to delete{' '}
        <span className="font-semibold text-navy">“{name}”</span>? This cannot
        be undone.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-neutral-200 px-5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-10 text-center">
      <p className="text-sm text-neutral-500">{message}</p>
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {message}
    </div>
  );
}

export interface CrudFormShellProps {
  onSubmit: (e: FormEvent) => void;
  submitLabel: string;
  submitting: boolean;
  error: string | null;
  onCancel: () => void;
  children: ReactNode;
}

export function CrudFormShell({
  onSubmit,
  submitLabel,
  submitting,
  error,
  onCancel,
  children,
}: CrudFormShellProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
      {error && <ErrorBanner message={error} />}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-neutral-200 px-5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="btn-navy px-6 py-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
