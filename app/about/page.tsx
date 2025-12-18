export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <section className="mx-auto max-w-4xl px-4 py-16 space-y-10">
        {/* Intro */}
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
            About HabitCircle
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            HabitCircle is built for people who know that consistency is easier when
            you&apos;re not doing it alone. We turn daily habits into shared rituals
            with the people you care about most.
          </p>
        </div>

        {/* Mission + Who it’s for */}
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-6 shadow-sm">
            <h2 className="text-base font-semibold mb-2">Our mission</h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Help small groups build lasting habits together through gentle
              accountability, simple check-ins, and a shared sense of progress.
            </p>
          </article>

          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-6 shadow-sm">
            <h2 className="text-base font-semibold mb-2">Who it&apos;s for</h2>
            <ul className="list-disc pl-5 text-sm text-[var(--color-text-muted)] space-y-1">
              <li>Friends keeping each other accountable</li>
              <li>Small teams focusing on wellbeing</li>
              <li>Study groups and creative circles</li>
              <li>Anyone who wants to stick with good habits</li>
            </ul>
          </article>
        </div>

        {/* Why we care */}
        <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-6 shadow-sm space-y-3">
          <h2 className="text-base font-semibold mb-1">
            Why we care about habits
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Most apps treat habit tracking as a solo grind. HabitCircle is built on
            the idea that the real magic happens when a few people commit together
            and show up for each other.
          </p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            By combining simple check-ins with small, focused circles, we aim to
            make discipline feel less like punishment and more like belonging.
          </p>
        </article>
      </section>
    </div>
  );
}