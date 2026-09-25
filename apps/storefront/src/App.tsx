import { useEffect } from 'react'
import AdminPage from './AdminPage'
import AboutPage from './AboutPage'
import CatalogPage from './CatalogPage'
import { ArrowIcon, SiteFooter, SiteHeader } from './components/SiteChrome'

const products = [
  {
    name: 'Страж багровой клятвы',
    meta: 'Коллекционная миниатюра · 75 мм',
    price: 'от 8 900 ₽',
    image: '/images/dragonborn.png',
    tag: 'Выбор мастера',
  },
  {
    name: 'Хранительница чащи',
    meta: 'Коллекционная миниатюра · 90 мм',
    price: 'от 11 500 ₽',
    image: '/images/forest-witch.png',
    tag: 'Новая работа',
  },
  {
    name: 'Сундук, который смотрит',
    meta: 'Игровая миниатюра · 50 мм',
    price: 'от 4 200 ₽',
    image: '/images/mimic.png',
    tag: 'В наличии',
  },
]

const categories = [
  { number: '01', title: 'Герои', text: 'Персонажи для кампаний и коллекций' },
  { number: '02', title: 'Существа', text: 'Монстры, фамильяры и боссы' },
  { number: '03', title: 'Игровые реликвии', text: 'Кубики, башни и детали стола' },
]

const qualities = [
  ['✦', 'Тонкая детализация', 'Выразительные фактуры и силуэты, которые хочется рассматривать вблизи.'],
  ['◈', 'Ручная работа', 'Каждая модель проходит через руки мастера — от подготовки до финального лака.'],
  ['⌁', 'Авторский характер', 'Небольшие тиражи и образы, созданные специально для вашего мира.'],
]

function PageTransition() {
  return (
    <div className="page-transition" aria-hidden="true">
      <div className="page-transition__die">
        <svg viewBox="0 0 120 120">
          <path d="M60 8 104 34 96 88 60 112 24 88 16 34 60 8Z" />
          <path d="m60 8-16 35h32L60 8ZM16 34l28 9-20 45m80-54-28 9 20 45M44 43l16 39 16-39M24 88l36-6v30m36-24-36-6" />
          <text x="60" y="65" textAnchor="middle">20</text>
        </svg>
      </div>
      <span>FABLE FOX</span>
    </div>
  )
}

function HomePage() {
  return (
    <div className="site-shell">
      <SiteHeader active="catalog" />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero__image" src="/images/hero-fox.png" alt="Авторская миниатюра лиса-следопыта" />
          <div className="hero__veil" />
          <div className="hero__content content-width">
            <p className="eyebrow"><span /> Создано для ваших историй</p>
            <h1 id="hero-title">Миры начинаются<br />с <em>деталей</em></h1>
            <p className="hero__lead">
              Авторские миниатюры и игровые реликвии, созданные вручную —
              для тех, кто превращает каждую партию в легенду.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="/catalog">Открыть каталог <ArrowIcon /></a>
              <button className="text-link" type="button">Узнать о мастерской <span>→</span></button>
            </div>
          </div>
          <div className="hero__note">
            <span>01</span>
            <p>Ручная роспись<br />Небольшие тиражи</p>
          </div>
          <div className="scroll-cue"><span /> Листайте, чтобы исследовать</div>
        </section>


                      {/* Секция «Избранное» с отображением продуктов */}
                      {/* Позже данные будут приходить из API. */}

        <section className="section featured content-width" aria-labelledby="featured-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> Избранное</p>
              <h2 id="featured-title">Герои вашей<br /><em>следующей истории</em></h2>
            </div>
            <p>Особенные работы, в которых характер раскрывается в каждой линии, фактуре и оттенке.</p>
          </div>

          <div className="product-grid">
            {products.map((product, index) => (
              <article className={`product-card product-card--${index + 1}`} key={product.name}>
                <div className="product-card__media">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="product-card__tag">{product.tag}</span>
                  <button className="circle-button" type="button" aria-label={`Посмотреть ${product.name}`}><ArrowIcon /></button>
                </div>
                <div className="product-card__body">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.meta}</p>
                  </div>
                  <strong>{product.price}</strong>
                </div>
              </article>
            ))}
          </div>

          <button className="text-link featured__link" type="button">Все работы <span>→</span></button>
        </section>

        <section className="categories" aria-labelledby="categories-title">
          <div className="content-width">
            <p className="eyebrow"><span /> Выберите свой путь</p>
            <h2 id="categories-title">Для игры. Для коллекции.<br /><em>Для вдохновения.</em></h2>
            <div className="category-list">
              {categories.map((category) => (
                <button className="category" type="button" key={category.number}>
                  <span className="category__number">{category.number}</span>
                  <strong>{category.title}</strong>
                  <span>{category.text}</span>
                  <b aria-hidden="true">↗</b>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section craft content-width" aria-labelledby="craft-title">
          <div className="craft__image-wrap">
            <img src="/images/workshop.png" alt="Мастер расписывает миниатюру тонкой кистью" loading="lazy" />
            <div className="craft__stamp">СОЗДАНО<br /><strong>РУКАМИ</strong><br />В МАСТЕРСКОЙ</div>
          </div>
          <div className="craft__copy">
            <p className="eyebrow"><span /> Мастерская Fable Fox</p>
            <h2 id="craft-title">От идеи<br />до <em>артефакта</em></h2>
            <p>Мы создаём не просто игровые предметы. Мы собираем характер из формы, света и цвета — чтобы миниатюра стала частью истории ещё до первого броска кубика.</p>
            <p>Каждая работа проходит подготовку, ручную роспись и бережную финишную обработку.</p>
            <button className="text-link" type="button">Заглянуть в мастерскую <span>→</span></button>
          </div>
        </section>

        <section className="qualities" aria-label="Наши преимущества">
          <div className="content-width qualities__grid">
            {qualities.map(([icon, title, text]) => (
              <article key={title}>
                <span className="qualities__icon">{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div className="final-cta__ornament" aria-hidden="true">✦</div>
          <p className="eyebrow"><span /> Ваша история ждёт</p>
          <h2 id="final-title">Найдите героя,<br />с которого всё <em>начнётся</em></h2>
          <p>Откройте коллекцию авторских работ Fable Fox.</p>
          <a className="button button--primary" href="/catalog">Перейти в каталог <ArrowIcon /></a>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function App() {
  useEffect(() => {
    const handleInternalNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return

      const link = event.target.closest<HTMLAnchorElement>('a[href]')
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return

      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin) return

      event.preventDefault()
      if (destination.href === window.location.href || document.documentElement.classList.contains('is-page-leaving')) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.location.assign(destination.href)
        return
      }

      document.documentElement.classList.add('is-page-leaving')
      window.setTimeout(() => window.location.assign(destination.href), 430)
    }

    document.addEventListener('click', handleInternalNavigation)
    return () => document.removeEventListener('click', handleInternalNavigation)
  }, [])

  const path = window.location.pathname.replace(/\/+$/, '')
  let page

  if (path === '/admin') {
    document.title = 'Панель управления — Fable Fox'
    page = <AdminPage />
  } else if (path === '/about') {
    document.title = 'О мастерской — Fable Fox'
    page = <AboutPage />
  } else if (path === '/catalog') {
    document.title = 'Каталог — Fable Fox'
    page = <CatalogPage />
  } else {
    document.title = 'Fable Fox — миниатюры с характером'
    page = <HomePage />
  }

  return (
    <>
      <PageTransition />
      {page}
    </>
  )
}

export default App
