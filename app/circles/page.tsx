import Link from 'next/link';

const circleTypes = [
  {
    title: 'Morning routine circle',
    description: 'Share your wake-up, workout, and reflection habits.',
  },
  {
    title: 'Fitness crew',
    description: 'Gym, runs, or at-home workouts with your accountability crew.',
  },
  {
    title: 'Study / deep work group',
    description: 'Daily focus blocks and learning sprints together.',
  },
  {
    title: 'Team wellbeing',
    description:
      'Work teams building better sleep, movement, and focus habits.',
  },
];

export default function CirclesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <section className="mx-auto max-w-6xl px-4 py-16 space-y-12">
        {/* Hero */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
              Accountability circles that actually stick.
            </h1>
            <p className="max-w-xl text-sm text-[var(--color-text-muted)] leading-relaxed">
              HabitCircle makes it easy to create small private groups where
              everyone commits to a few habits and checks in regularly. Less
              noise, more follow-through.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Start a circle
              </Link>
              <Link
                href="/circles/manage"
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                Manage my circles
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <article className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-6 shadow-xl">
              <p className="text-xs text-[var(--color-text-muted)] mb-1">
                Example circle
              </p>
              <p className="text-lg font-semibold mb-2">
                &quot;7am Morning Crew&quot;
              </p>
              <ul className="text-xs text-[var(--color-text-muted)] space-y-1 mb-3">
                <li>✅ Wake up by 7am</li>
                <li>✅ 10 min movement</li>
                <li>✅ 5 min journaling</li>
              </ul>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Everyone checks in before 9am. If you miss a day, the group can
                see it – gently pushing you back on track.
              </p>
            </article>
          </div>
        </div>

        {/* Circle types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-sky-300 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
            Common circle types
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {circleTypes.map((circle) => (
              <article
                key={circle.title}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              >
                <h3 className="text-base font-semibold mb-1">{circle.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {circle.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* How circles work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
            How circles work with HabitCircle
          </h2>
          <ol className="grid gap-6 text-sm md:grid-cols-3">
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5">
              <span className="text-xs font-semibold text-[var(--color-primary)]">
                1. Create a circle
              </span>
              <p className="mt-2">
                Name your circle and choose which habits you&apos;ll track
                together.
              </p>
            </li>
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5">
              <span className="text-xs font-semibold text-[var(--color-primary)]">
                2. Invite people who care
              </span>
              <p className="mt-2">
                Add friends, teammates, or family – just a few people is
                enough.
              </p>
            </li>
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5">
              <span className="text-xs font-semibold text-[var(--color-primary)]">
                3. Check in and celebrate
              </span>
              <p className="mt-2">
                Everyone logs their habits. Streaks and shared wins keep
                momentum going.
              </p>
            </li>
          </ol>
        </section>
      </section>
    </div>
  );
}