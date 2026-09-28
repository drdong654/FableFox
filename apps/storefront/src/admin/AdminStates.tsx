import type { ReactNode } from 'react'

type StateProps = {
  title: string
  description: string
  action?: ReactNode
}

export function AdminLoadingState({ title = 'Загружаем данные' }: { title?: string }) {
  return (
    <div className="admin-state admin-state--loading" role="status" aria-live="polite">
      <span className="admin-state__spinner" aria-hidden="true" />
      <strong>{title}</strong>
      <div className="admin-state__skeleton" aria-hidden="true"><i /><i /><i /></div>
    </div>
  )
}

export function AdminErrorState({ title, description, action }: StateProps) {
  return <div className="admin-state" role="alert"><span aria-hidden="true">!</span><strong>{title}</strong><p>{description}</p>{action}</div>
}

export function AdminEmptyState({ title, description, action }: StateProps) {
  return <div className="admin-state"><span aria-hidden="true">✦</span><strong>{title}</strong><p>{description}</p>{action}</div>
}
