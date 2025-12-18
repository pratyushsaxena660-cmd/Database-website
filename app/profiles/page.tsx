'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import GradientHeading from '@/components/GradientHeading';
import SpotlightCard from '@/components/SpotlightCard';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      const user = session.user;
      setUserEmail(user.email ?? null);
      setUserId(user.id);

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, bio')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // ignore "no rows" error; code may differ, so just log
        console.warn('Error loading profile (may be no row yet):', error);
      }

      if (data) {
        setFullName(data.full_name ?? '');
        setBio(data.bio ?? '');
      }

      setLoading(false);
    };

    load();
  }, [router]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!userId) return;

    setSaving(true);

    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      full_name: fullName || null,
      bio: bio || null,
    });

    setSaving(false);

    if (error) {
      console.error('Error saving profile', error);
      setMessage(error.message);
    } else {
      setMessage('Profile saved.');
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <section className="mx-auto max-w-xl px-4 py-16">
        <SpotlightCard className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-5">
          <div className="space-y-2">
            <GradientHeading className="text-2xl font-semibold">
              Your profile
            </GradientHeading>
            <p className="text-xs text-[var(--color-text-muted)]">
              Signed in as <span className="font-mono">{userEmail}</span>
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-[var(--color-text-muted)]">
                Full name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="How your circle sees you"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[var(--color-text-muted)]">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Share a line about your goals or habits."
              />
            </div>

            {message && (
              <p className="text-xs text-[var(--color-success)]">{message}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </SpotlightCard>
      </section>
    </main>
  );
}