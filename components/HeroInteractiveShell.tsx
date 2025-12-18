'use client';

export function HeroInteractiveShell() {
  return (
    <div className="relative w-full max-w-lg">
      {/* Soft glowing background behind the cards */}
      <div
        className="pointer-events-none absolute -inset-x-10 -top-10 h-64 bg-gradient-to-br from-indigo-500/35 via-sky-500/15 to-orange-500/35 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/90 p-5 shadow-2xl backdrop-blur">
        {/* Top row: streak + longest streak */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-border)] bg-black/30 p-4">
            <p className="text-xs text-[var(--color-text-muted)]">Day streak</p>
            <p className="mt-1 text-3xl font-semibold text-[var(--color-primary)]">
              42
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Morning meditation
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-black/30 p-4">
            <p className="text-xs text-[var(--color-text-muted)]">
              Longest streak
            </p>
            <p className="mt-1 text-3xl font-semibold">27 days</p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              &quot;Morning workout&quot;
            </p>
          </div>
        </div>

        {/* Bottom row: active circles */}
        <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">
              Active circles
            </p>
            <p className="mt-1 text-2xl font-semibold text-[var(--color-accent)]">
              4
            </p>
          </div>
          <p className="max-w-[14rem] text-xs text-[var(--color-text-muted)] sm:text-right">
            Motivated together. Accountability makes all the difference.
          </p>
        </div>
      </div>
    </div>
  );
}