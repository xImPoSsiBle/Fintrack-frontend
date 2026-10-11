import type { CSSProperties } from 'react'

export function getTooltipStyle(): CSSProperties {
  return {
    backgroundColor: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--card-foreground)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
  }
}
