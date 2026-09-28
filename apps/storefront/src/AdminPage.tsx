import { useEffect, useState } from 'react'
import AdminLayout, { type AdminNotice } from './admin/AdminLayout'
import AdminOverview from './admin/AdminOverview'
import { AdminEmptyState } from './admin/AdminStates'
import { findAdminRoute } from './admin/adminRoutes'

type AdminPageProps = {
  path: string
}

export default function AdminPage({ path }: AdminPageProps) {
  const route = findAdminRoute(path)
  const [customizing, setCustomizing] = useState(false)
  const [notice, setNotice] = useState<AdminNotice | null>(null)

  const isOverview = route?.id === 'overview'
  const title = isOverview ? 'Добрый день' : route?.title ?? 'Страница не найдена'
  const eyebrow = route?.eyebrow ?? 'Неизвестный раздел'

  useEffect(() => {
    document.title = `${title} — Fable Fox`
  }, [title])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(null), 3200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const notify = (message: string, tone: AdminNotice['tone'] = 'success') => {
    setNotice({ message, tone })
  }

  const toggleCustomizing = () => {
    setCustomizing((current) => {
      if (current) notify('Раскладка виджетов сохранена')
      return !current
    })
  }

  const headerAction = isOverview ? (
    <button className={customizing ? 'admin-customize admin-customize--active' : 'admin-customize'} type="button" onClick={toggleCustomizing}>
      {customizing ? 'Готово' : 'Настроить виджеты'}
    </button>
  ) : undefined

  return (
    <AdminLayout activeRoute={route} title={title} eyebrow={eyebrow} headerAction={headerAction} notice={notice} onDismissNotice={() => setNotice(null)}>
      {isOverview && <AdminOverview customizing={customizing} onNotify={notify} />}

      {route && !isOverview && (
        <section className="admin-section-page" aria-labelledby="admin-section-title">
          <div className="admin-section-intro">
            <p>Следующий этап</p>
            <h2 id="admin-section-title">{route.title}</h2>
            <span>{route.description}</span>
          </div>
          <AdminEmptyState
            title="Раздел подключён к навигации"
            description="Общий каркас уже готов. Здесь появятся рабочие инструменты этого раздела на следующем этапе."
            action={<a href="/admin">Вернуться к обзору</a>}
          />
        </section>
      )}

      {!route && (
        <section className="admin-section-page" aria-label="Страница не найдена">
          <AdminEmptyState
            title="Такого раздела нет"
            description="Проверьте адрес или вернитесь на главный экран панели управления."
            action={<a href="/admin">Перейти к обзору</a>}
          />
        </section>
      )}
    </AdminLayout>
  )
}
