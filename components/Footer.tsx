function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-[var(--color-text-muted)]">
        <span>© {year} HabitCircle</span>
        <a href="#" className="hover:text-[var(--color-text)] transition-colors">
          Privacy
        </a>
      </div>
    </footer>
  );
}

export default Footer;