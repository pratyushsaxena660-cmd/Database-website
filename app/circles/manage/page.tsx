'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import SpotlightCard from '@/components/SpotlightCard';

type User = {
  id: string;
  email: string | null;
};

export default function CirclesManagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      setUser({
        id: session.user.id,
        email: session.user.email ?? null,
      });
      setLoading(false);
    };

    load();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <section className="mx-auto max-w-4xl px-4 py-16 space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Your circles</h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Signed in as <span className="font-mono">{user?.email}</span>
          </p>
        </div>

        <SpotlightCard className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h2 className="text-base font-semibold mb-2">
            Circle management is coming soon
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-2">
            Soon you&apos;ll be able to create private circles, invite members,
            assign shared habits, and see combined progress.
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            For now, use your personal dashboard to experiment with habits and
            get a feel for daily check-ins.
          </p>
        </SpotlightCard>
      </section>
    </main>
  );
}