import { useState, type ReactNode } from 'react'
import { BrandMark } from '../components/SiteChrome'
import { adminRoutes, type AdminRoute } from './adminRoutes'

export type AdminNotice = {
  message: string
  tone: 'success' | 'info' | 'error'
}

type AdminLayoutProps = {
  activeRoute?: AdminRoute
  title: string
  eyebrow: string
  headerAction?: ReactNode
  notice: AdminNotice | null
  onDismissNotice: () => void
  children: ReactNode
}

export default function AdminLayout({ activeRoute, title, eyebrow, headerAction, notice, onDismissNotice, children }: AdminLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRoutes = adminRoutes.filter((route) => route.group === 'main')
  const systemRoutes = adminRoutes.filter((route) => route.group === 'system')

  const renderLink = (route: AdminRoute) => (
    <a className={activeRoute?.id === route.id ? 'admin-nav--active' : ''} href={route.path} key={route.id} aria-current={activeRoute?.id === route.id ? 'page' : undefined}>
      <span aria-hidden="true">{route.icon}</span>{route.title}
    </a>
  )

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${menuOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-brand-row">
          <a className="admin-brand" href="/admin" aria-label="Fable Fox, обзор панели управления"><BrandMark /><span><strong>FABLE FOX</strong><small>ПАНЕЛЬ УПРАВЛЕНИЯ</small></span></a>
          <button className="admin-menu-toggle" type="button" aria-label={menuOpen ? 'Закрыть разделы' : 'Открыть разделы'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
        </div>
        <nav aria-label="Разделы админ-панели">{mainRoutes.map(renderLink)}</nav>
        <nav className="admin-sidebar__bottom" aria-label="Системные разделы">
          {systemRoutes.map(renderLink)}
          <a href="/"><span aria-hidden="true">↗</span>Открыть сайт</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header__copy"><p>{eyebrow}</p><h1>{title}</h1></div>
          <div className="admin-header__actions">
            <span className="admin-save-state"><i />Все изменения сохранены</span>
            {headerAction}
            <button className="admin-profile" type="button" aria-label="Профиль владельца">FF</button>
          </div>
        </header>
        {children}
      </main>

      {notice && (
        <div className={`admin-toast admin-toast--${notice.tone}`} role={notice.tone === 'error' ? 'alert' : 'status'} aria-live="polite">
          <span aria-hidden="true">{notice.tone === 'success' ? '✓' : notice.tone === 'error' ? '!' : 'i'}</span>
          <p>{notice.message}</p>
          <button type="button" onClick={onDismissNotice} aria-label="Закрыть уведомление">×</button>
        </div>
      )}
    </div>
  )
}
