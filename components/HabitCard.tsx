// TODO: Convert this HabitCard into a ReactBits "Fluid Glass" style card later.
'use client';

type Habit = {
  id: string;
  title: string;
  description: string | null;
  created_at?: string;
};

type HabitCardProps = {
  habit: Habit;
  isDoneToday: boolean;
  onCheckIn: () => void;
  onDelete?: () => void;
  logging?: boolean;
};

export default function HabitCard({
  habit,
  isDoneToday,
  onCheckIn,
  onDelete,
  logging = false,
}: HabitCardProps) {
  return (
    <div className="group flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-[var(--color-text)]">
            {habit.title}
          </h3>
          {habit.description && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {habit.description}
            </p>
          )}
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="ml-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100"
            title="Delete habit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* TODO: Wrap this per-habit action with ReactBits "Glare Hover" if needed. */}
      <button
        onClick={onCheckIn}
        disabled={isDoneToday || logging}
        className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          isDoneToday
            ? 'bg-[var(--color-success)] text-white cursor-not-allowed'
            : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]'
        } ${logging ? 'opacity-60 cursor-wait' : ''}`}
      >
        {logging ? 'Logging...' : isDoneToday ? 'Done today ✓' : 'Mark done today'}
      </button>
    </div>
  );
}

