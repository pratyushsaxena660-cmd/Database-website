'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

function BrandMark() {
  return (
    <span className="text-lg font-semibold tracking-tight">
      Habit<span className="text-[var(--color-primary)]">Circle</span>
    </span>
  );
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/circles', label: 'Circles' },
  { href: '/dashboard', label: 'Dashboard' },
];

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoadingUser(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const email = user?.email ?? '';
  const initial = email ? email.charAt(0).toUpperCase() : '';
  const avatarUrl =
    (user?.user_metadata as any)?.avatar_url ??
    (user?.user_metadata as any)?.picture ??
    null;

  const handleLogout = async () => {
    setMenuOpen(false);
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <BrandMark />
        </Link>

        <nav className="hidden gap-6 text-sm text-[var(--color-text-muted)] md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? 'text-[var(--color-text)]'
                    : 'hover:text-[var(--color-text)]'
                }
              >
                {link.label}
              </Link>
            );
          })}
          <a href="/#features" className="hover:text-[var(--color-text)]">
            Features
          </a>
          <a href="/#how-it-works" className="hover:text-[var(--color-text)]">
            How it works
          </a>
        </nav>

        <div className="relative flex items-center gap-3">
          {loadingUser ? (
            <div className="h-8 w-8 rounded-full bg-slate-800/70 animate-pulse" />
          ) : user ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full bg-slate-900/70 px-2 py-1 hover:bg-slate-800 transition-colors"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full border border-[var(--color-border)] object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">
                    {initial || '?'}
                  </div>
                )}
                <span className="hidden text-xs text-[var(--color-text-muted)] sm:inline">
                  {email}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-1 text-sm shadow-lg">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-[var(--color-text-muted)] hover:bg-slate-800 hover:text-[var(--color-text)]"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Sign in with Google
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;