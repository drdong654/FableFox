import { useEffect, useState } from 'react'
import { BrandMark } from './components/SiteChrome'

const widgetIds = ['quick', 'catalog', 'pages', 'drafts', 'requests', 'activity'] as const
type WidgetId = typeof widgetIds[number]

const widgetMeta: Record<WidgetId, { title: string; eyebrow: string; icon: string; wide?: boolean }> = {
  quick: { title: 'Быстрые действия', eyebrow: 'Создать', icon: '＋', wide: true },
  catalog: { title: 'Состояние каталога', eyebrow: 'Контент', icon: '◇' },
  pages: { title: 'Страницы сайта', eyebrow: 'Публикация', icon: '▤', wide: true },
  drafts: { title: 'Черновики', eyebrow: 'Требуют внимания', icon: '✎' },
  requests: { title: 'Новые заявки', eyebrow: 'Продажи', icon: '↗' },
  activity: { title: 'Последние изменения', eyebrow: 'История', icon: '◷', wide: true },
}

function loadWidgetIds(key: string, fallback: WidgetId[]) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? 'null')
    if (Array.isArray(saved) && saved.every((id) => widgetIds.includes(id))) return saved as WidgetId[]
  } catch {
    // Повреждённая локальная настройка не должна ломать админ-панель.
  }
  return fallback
}

function WidgetContent({ id }: { id: WidgetId }) {
  if (id === 'quick') {
    return (
      <div className="admin-quick-actions">
        <button type="button"><span>＋</span><strong>Новый товар</strong><small>Добавить карточку в каталог</small></button>
        <button type="button"><span>▤</span><strong>Изменить страницу</strong><small>Открыть редактор блоков</small></button>
        <button type="button"><span>▧</span><strong>Загрузить медиа</strong><small>Фотографии и изображения</small></button>
      </div>
    )
  }

  if (id === 'catalog') {
    return (
      <div className="admin-catalog-state">
        <div><strong>0</strong><span>Опубликовано</span></div>
        <div><strong>0</strong><span>В черновиках</span></div>
        <div className="admin-progress"><span><i /></span><p>Каталог пока не заполнен</p></div>
      </div>
    )
  }

  if (id === 'pages') {
    return (
      <div className="admin-pages-list">
        {['Главная', 'О мастерской', 'Каталог'].map((page) => (
          <button type="button" key={page}>
            <span className="admin-status-dot" />
            <strong>{page}</strong>
            <small>Опубликована</small>
            <b>Редактировать →</b>
          </button>
        ))}
      </div>
    )
  }

  if (id === 'drafts') {
    return <div className="admin-widget-empty"><span>✓</span><strong>Всё опубликовано</strong><p>Незавершённых материалов пока нет.</p></div>
  }

  if (id === 'requests') {
    return <div className="admin-widget-empty"><span>✦</span><strong>Новых заявок нет</strong><p>Когда появятся обращения, они будут собраны здесь.</p></div>
  }

  return <div className="admin-widget-empty"><span>◷</span><strong>История пока пуста</strong><p>Изменения контента и публикации появятся после подключения API.</p></div>
}

function AdminPage() {
  const [layout, setLayout] = useState<WidgetId[]>(() => loadWidgetIds('fable-fox-admin-layout', [...widgetIds]))
  const [hidden, setHidden] = useState<WidgetId[]>(() => loadWidgetIds('fable-fox-admin-hidden', []))
  const [customizing, setCustomizing] = useState(false)
  const [dragged, setDragged] = useState<WidgetId | null>(null)

  useEffect(() => localStorage.setItem('fable-fox-admin-layout', JSON.stringify(layout)), [layout])
  useEffect(() => localStorage.setItem('fable-fox-admin-hidden', JSON.stringify(hidden)), [hidden])

  const visibleWidgets = layout.filter((id) => !hidden.includes(id))

  const moveWidget = (id: WidgetId, direction: -1 | 1) => {
    const currentIndex = layout.indexOf(id)
    const nextIndex = currentIndex + direction
    if (nextIndex < 0 || nextIndex >= layout.length) return
    const nextLayout = [...layout]
    ;[nextLayout[currentIndex], nextLayout[nextIndex]] = [nextLayout[nextIndex], nextLayout[currentIndex]]
    setLayout(nextLayout)
  }

  const dropWidget = (target: WidgetId) => {
    if (!dragged || dragged === target) return
    const nextLayout = layout.filter((id) => id !== dragged)
    nextLayout.splice(nextLayout.indexOf(target), 0, dragged)
    setLayout(nextLayout)
    setDragged(null)
  }

  const toggleWidget = (id: WidgetId) => {
    setHidden((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const resetLayout = () => {
    setLayout([...widgetIds])
    setHidden([])
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><BrandMark /><span><strong>FABLE FOX</strong><small>ПАНЕЛЬ УПРАВЛЕНИЯ</small></span></div>
        <nav aria-label="Разделы админ-панели">
          <button className="admin-nav--active" type="button"><span>⌂</span>Обзор</button>
          <button type="button"><span>▤</span>Страницы</button>
          <button type="button"><span>◇</span>Товары</button>
          <button type="button"><span>⌑</span>Категории</button>
          <button type="button"><span>▧</span>Медиа</button>
          <button type="button"><span>↗</span>Заявки</button>
        </nav>
        <nav className="admin-sidebar__bottom" aria-label="Системные разделы">
          <button type="button"><span>♙</span>Команда</button>
          <button type="button"><span>⚙</span>Настройки</button>
          <a href="/" target="_self"><span>↗</span>Открыть сайт</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p>Рабочее пространство владельца</p>
            <h1>Добрый день</h1>
          </div>
          <div className="admin-header__actions">
            <span className="admin-save-state"><i />Все изменения сохранены</span>
            <button className={customizing ? 'admin-customize admin-customize--active' : 'admin-customize'} type="button" onClick={() => setCustomizing((value) => !value)}>
              {customizing ? 'Готово' : 'Настроить виджеты'}
            </button>
            <button className="admin-profile" type="button" aria-label="Профиль владельца">FF</button>
          </div>
        </header>

        <div className="admin-intro">
          <div><h2>Сайт под вашим контролем</h2><p>Расположите инструменты так, как удобно именно вам. Эта раскладка видна только в панели управления.</p></div>
          <span>Локальный прототип · без подключения API</span>
        </div>

        {customizing && (
          <section className="admin-customizer" aria-labelledby="customizer-title">
            <div><p>Настройка рабочего стола</p><h2 id="customizer-title">Какие виджеты показывать</h2></div>
            <div className="admin-customizer__toggles">
              {widgetIds.map((id) => (
                <label key={id}>
                  <input type="checkbox" checked={!hidden.includes(id)} onChange={() => toggleWidget(id)} />
                  <span>{widgetMeta[id].title}</span>
                </label>
              ))}
            </div>
            <button type="button" onClick={resetLayout}>Сбросить раскладку</button>
          </section>
        )}

        <section className={`admin-widgets ${customizing ? 'admin-widgets--editing' : ''}`} aria-label="Виджеты рабочего стола">
          {visibleWidgets.map((id, index) => {
            const widget = widgetMeta[id]
            return (
              <article
                className={`admin-widget ${widget.wide ? 'admin-widget--wide' : ''} ${dragged === id ? 'admin-widget--dragging' : ''}`}
                draggable={customizing}
                onDragStart={() => setDragged(id)}
                onDragEnd={() => setDragged(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => dropWidget(id)}
                key={id}
              >
                <header className="admin-widget__header">
                  <div><span>{widget.eyebrow}</span><h2>{widget.title}</h2></div>
                  <div className="admin-widget__tools">
                    {customizing && <><button type="button" disabled={index === 0} onClick={() => moveWidget(id, -1)} aria-label="Переместить выше">↑</button><button type="button" disabled={index === visibleWidgets.length - 1} onClick={() => moveWidget(id, 1)} aria-label="Переместить ниже">↓</button><button type="button" onClick={() => toggleWidget(id)} aria-label="Скрыть виджет">×</button></>}
                    <b aria-hidden="true">{customizing ? '⠿' : widget.icon}</b>
                  </div>
                </header>
                <WidgetContent id={id} />
              </article>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default AdminPage
