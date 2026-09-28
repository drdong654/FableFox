import { useEffect, useState } from 'react'

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
        <a href="/admin/products"><span>＋</span><strong>Новый товар</strong><small>Добавить карточку в каталог</small></a>
        <a href="/admin/pages"><span>▤</span><strong>Изменить страницу</strong><small>Открыть редактор блоков</small></a>
        <a href="/admin/media"><span>▧</span><strong>Загрузить медиа</strong><small>Фотографии и изображения</small></a>
      </div>
    )
  }

  if (id === 'catalog') {
    return (
      <div className="admin-catalog-state">
        <a href="/admin/products"><strong>0</strong><span>Опубликовано</span></a>
        <a href="/admin/products"><strong>0</strong><span>В черновиках</span></a>
        <div className="admin-progress"><span><i /></span><p>Каталог пока не заполнен</p></div>
      </div>
    )
  }

  if (id === 'pages') {
    return (
      <div className="admin-pages-list">
        {['Главная', 'О мастерской', 'Каталог'].map((page) => (
          <a href="/admin/pages" key={page}>
            <span className="admin-status-dot" />
            <strong>{page}</strong>
            <small>Опубликована</small>
            <b>Редактировать →</b>
          </a>
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

type AdminOverviewProps = {
  customizing: boolean
  onNotify: (message: string) => void
}

export default function AdminOverview({ customizing, onNotify }: AdminOverviewProps) {
  const [layout, setLayout] = useState<WidgetId[]>(() => loadWidgetIds('fable-fox-admin-layout', [...widgetIds]))
  const [hidden, setHidden] = useState<WidgetId[]>(() => loadWidgetIds('fable-fox-admin-hidden', []))
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
    onNotify('Стандартная раскладка восстановлена')
  }

  return (
    <>
      <div className="admin-intro">
        <div><h2>Сайт под вашим контролем</h2><p>Расположите инструменты так, как удобно именно вам. Эта раскладка видна только в панели управления.</p></div>
        <span>Фундамент админки · данные будут подключены через API</span>
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
    </>
  )
}
