export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] py-6 text-center text-xs text-[var(--muted-foreground)]">
      FinTrack — личный финансовый трекер · {new Date().getFullYear()}
    </footer>
  )
}
