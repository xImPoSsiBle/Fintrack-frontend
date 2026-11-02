export function Footer() {
  return (
    <footer className="mt-12 border-t border-border pt-6 pb-20 sm:pb-6 text-center text-xs text-muted-foreground">
      FinTrack — личный финансовый трекер · {new Date().getFullYear()}
    </footer>
  )
}
