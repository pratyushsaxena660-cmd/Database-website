'use client';

import SpotlightCard from './SpotlightCard';
import GradientHeading from './GradientHeading';
import ScrollReveal from './ScrollReveal';

type Feature = {
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    title: 'Daily check-ins',
    description:
      'Log your habits in seconds and keep a visual history of your consistency.',
  },
  {
    title: 'Accountability circles',
    description:
      'Create small private groups where friends or teammates keep each other on track.',
  },
  {
    title: 'Realtime progress',
    description:
      'See your circle’s activity as it happens and celebrate wins together.',
  },
  {
    title: 'Streak insights',
    description:
      'Track streaks, resets, and trends to understand what really sticks.',
  },
];

function FeatureCard({ title, description }: Feature) {
  return (
    <SpotlightCard className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      <h3 className="mb-1 text-base font-semibold">{title}</h3>
      <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
    </SpotlightCard>
  );
}

// Named export (matches: import { FeatureGrid } from "@/components/FeatureGrid";)
export function FeatureGrid() {
  return (
    <ScrollReveal>
      <section
        id="features"
        className="mx-auto max-w-6xl px-4 py-16 space-y-8"
      >
        <div className="space-y-2">
          <GradientHeading className="text-2xl font-semibold">
            Why HabitCircle?
          </GradientHeading>
          <p className="max-w-xl text-sm text-[var(--color-text-muted)]">
            A focused space for you and your circle to build habits, share
            progress, and stay accountable together.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}

// Default export as well (in case you ever use: import FeatureGrid from "...")
export default FeatureGrid;