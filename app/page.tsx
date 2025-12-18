import Link from 'next/link';
import ShinyText from '@/components/ShinyText';
import { HeroInteractiveShell } from '@/components/HeroInteractiveShell';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.45),_transparent_60%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-52 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.35),_transparent_60%)] blur-3xl"
      />

      {/* HERO */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 pb-16 pt-20 lg:flex-row lg:pt-24">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <ShinyText
                text="Build habits together. Stay accountable."
                speed={5}
                className="inline-block"
              />
            </h1>
            <p className="max-w-xl text-sm text-[var(--color-text-muted)] sm:text-base">
              HabitCircle keeps you and your friends on track with shared
              accountability circles, daily check-ins, and realtime progress.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/login"
              className="rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Get started with Google
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              View dashboard demo
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-4 flex flex-wrap gap-8 text-xs text-[var(--color-text-muted)] sm:text-sm">
            <div>
              <p className="text-lg font-semibold text-[var(--color-text)]">
                12k+
              </p>
              <p>Habits tracked</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-[var(--color-text)]">
                250+
              </p>
              <p>Accountability circles</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-[var(--color-text)]">
                93%
              </p>
              <p>Weekly check-in rate</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <HeroInteractiveShell />
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="mx-auto max-w-6xl px-4 pb-16 space-y-8"
      >
        <div className="space-y-3 text-center lg:text-left">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
            Why HabitCircle?
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-[var(--color-text-muted)]">
            A focused space for you and your circle to build habits, share
            progress, and stay accountable without the noise of a public
            social feed.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
            <h3 className="text-base font-semibold mb-1">Daily check-ins</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Log your habits in seconds and keep a visual history of your
              consistency.
            </p>
          </article>

          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
            <h3 className="text-base font-semibold mb-1">
              Accountability circles
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Create small private groups where friends or teammates keep each
              other on track.
            </p>
          </article>

          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
            <h3 className="text-base font-semibold mb-1">
              Realtime progress
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              See your circle’s activity as it happens and celebrate wins
              together.
            </p>
          </article>

          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
            <h3 className="text-base font-semibold mb-1">Streak insights</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Track streaks, resets, and trends to understand what really
              sticks over time.
            </p>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-4 pb-20 space-y-8"
      >
        <div className="space-y-3 text-center lg:text-left">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-sky-300 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
            How it works
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-[var(--color-text-muted)]">
            Getting started only takes a minute. Invite your circle and start
            building momentum together.
          </p>
        </div>

        <ol className="grid gap-6 text-sm md:grid-cols-3">
          <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5">
            <span className="text-xs font-semibold text-[var(--color-primary)]">
              1. Sign in
            </span>
            <p className="mt-2 text-[var(--color-text)]">
              Use your Google account to create your HabitCircle profile.
            </p>
          </li>
          <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5">
            <span className="text-xs font-semibold text-[var(--color-primary)]">
              2. Create habits
            </span>
            <p className="mt-2 text-[var(--color-text)]">
              Add the habits you want to track and set your daily or weekly
              rhythm.
            </p>
          </li>
          <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5">
            <span className="text-xs font-semibold text-[var(--color-primary)]">
              3. Invite your circle
            </span>
            <p className="mt-2 text-[var(--color-text)]">
              Bring in friends or teammates to keep each other accountable
              with shared check-ins and streaks.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}