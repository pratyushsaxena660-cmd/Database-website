'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import FloatingLinesBackground from '@/components/FloatingLinesBackground';
import HabitCard from '@/components/HabitCard';

type Habit = {
  id: string;
  title: string;
  description: string | null;
};

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedToday, setCompletedToday] = useState<string[]>([]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [savingHabit, setSavingHabit] = useState(false);
  const [loggingHabitId, setLoggingHabitId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error getting session', sessionError);
      }

      if (!session) {
        router.push('/login');
        return;
      }

      const user = session.user;
      setEmail(user.email ?? null);
      setUserId(user.id);

      // Load habits for this user
      const { data: habitsData, error: habitsError } = await supabase
        .from('habits')
        .select('id, title, description, created_at')
        .order('created_at', { ascending: true });

      if (habitsError) {
        console.error('Error loading habits', habitsError);
      } else if (habitsData) {
        setHabits(habitsData);
      }

      // Load today's logs
      const today = new Date().toISOString().slice(0, 10);
      const { data: logsData, error: logsError } = await supabase
        .from('habit_logs')
        .select('habit_id')
        .eq('logged_date', today);

      if (logsError) {
        console.error('Error loading logs', logsError);
      } else if (logsData) {
        setCompletedToday(logsData.map((log) => log.habit_id));
      }

      setLoading(false);
    };

    load();
  }, [router]);

  const handleAddHabit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!newTitle.trim()) {
      setFormError('Please enter a habit title.');
      return;
    }

    if (!userId) {
      setFormError('You must be signed in to add a habit.');
      return;
    }

    setSavingHabit(true);

    const { data: insertData, error: insertError } = await supabase
      .from('habits')
      .insert({
        user_id: userId, // IMPORTANT: link to current user
        title: newTitle.trim(),
        description: newDescription.trim() || null,
      })
      .select('id, title, description')
      .single();

    setSavingHabit(false);

    if (insertError) {
      console.error('Error inserting habit', insertError);
      setFormError(insertError.message);
      return;
    }

    if (insertData) {
      setHabits((prev) => [...prev, insertData]);
      setNewTitle('');
      setNewDescription('');
    }
  };

  const handleCheckIn = async (habitId: string) => {
    if (!userId) return;

    const today = new Date().toISOString().slice(0, 10);

    // Already done today
    if (completedToday.includes(habitId)) return;

    setLoggingHabitId(habitId);

    const { error } = await supabase.from('habit_logs').insert({
      habit_id: habitId,
      user_id: userId,
      logged_date: today,
    });

    setLoggingHabitId(null);

    if (error) {
      console.error('Error inserting habit log', error);
      return;
    }

    setCompletedToday((prev) => [...prev, habitId]);
  };

  const handleDeleteHabit = async (habitId: string) => {
    const { error } = await supabase.from('habits').delete().eq('id', habitId);

    if (error) {
      console.error('Error deleting habit', error);
      return;
    }

    setHabits((prev) => prev.filter((h) => h.id !== habitId));
    setCompletedToday((prev) => prev.filter((id) => id !== habitId));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const totalHabits = habits.length;
  const doneToday = completedToday.length;
  const completionRate =
    totalHabits === 0 ? 0 : Math.round((doneToday / totalHabits) * 100);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <FloatingLinesBackground>
        <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 px-6 py-4 backdrop-blur">
          <div>
            <h1 className="text-lg font-semibold">HabitCircle Dashboard</h1>
            <p className="text-xs text-[var(--color-text-muted)]">
              Signed in as <span className="font-mono">{email}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full bg-slate-800 px-3 py-1.5 text-xs text-[var(--color-text-muted)] hover:bg-slate-700 hover:text-[var(--color-text)]"
          >
            Log out
          </button>
        </header>
      </FloatingLinesBackground>

      <section className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        {/* Metrics row */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-xs text-[var(--color-text-muted)]">Total habits</p>
            <p className="mt-2 text-2xl font-semibold">{totalHabits}</p>
          </div>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-xs text-[var(--color-text-muted)]">Done today</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--color-success)]">
              {doneToday}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-xs text-[var(--color-text-muted)]">
              Completion rate
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {completionRate}
              <span className="text-sm">%</span>
            </p>
          </div>
        </div>

        {/* Add habit card */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
          <h2 className="mb-3 text-lg font-medium">Add a new habit</h2>
          <form onSubmit={handleAddHabit} className="space-y-3">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Habit title (e.g. Drink water, Morning workout)"
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Short description (optional)"
              rows={3}
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            {formError && (
              <p className="text-sm text-[var(--color-error)]">{formError}</p>
            )}
            <button
              type="submit"
              disabled={savingHabit}
              className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
            >
              {savingHabit ? 'Saving...' : 'Add habit'}
            </button>
          </form>
        </div>

        {/* Habits list */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold">Your Habits</h2>
          {habits.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)]">
              You don&apos;t have any habits yet. Add one to get started.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  isDoneToday={completedToday.includes(habit.id)}
                  onCheckIn={() => handleCheckIn(habit.id)}
                  onDelete={() => handleDeleteHabit(habit.id)}
                  logging={loggingHabitId === habit.id}
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
