import { useState } from 'react'

type SiteHeaderProps = {
  active?: 'catalog' | 'about'
}

export function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 54 54" role="img">
        <path d="M10 12 23 18l4 15-12-5-5-16Zm34 0-13 6-4 15 12-5 5-16Z" />
        <path d="m15 28 12 17 12-17-12 5-12-5Z" />
        <path d="m21 35 6 3 6-3-6 10-6-10Z" />
      </svg>
    </div>
  )
}

export function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

export function SiteHeader({ active }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Fable Fox, главная">
        <BrandMark />
        <span>
          <strong>FABLE FOX</strong>
          <small>АРТЕФАКТЫ ДЛЯ ПРИКЛЮЧЕНИЙ</small>
        </span>
      </a>

      <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Основная навигация">
        <a className={active === 'catalog' ? 'nav__link--active' : ''} href="/catalog">Каталог</a>
        <button type="button">Мастерская</button>
        <a className={active === 'about' ? 'nav__link--active' : ''} href="/about">О нас</a>
        <button type="button">Доставка</button>
      </nav>

      <a className="header-cta" href="/catalog">Смотреть работы</a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="content-width footer__top">
        <div className="brand footer__brand">
          <BrandMark />
          <span><strong>FABLE FOX</strong><small>АРТЕФАКТЫ ДЛЯ ПРИКЛЮЧЕНИЙ</small></span>
        </div>
        <p>Авторские миниатюры и игровые реликвии,<br />созданные вручную с вниманием к деталям.</p>
        <div className="footer__socials">
          <button type="button">VK</button>
          <button type="button">TG</button>
        </div>
      </div>
      <div className="content-width footer__bottom">
        <span>© 2026 Fable Fox</span>
        <span>Сделано в мастерской — с огнём и терпением</span>
        <button type="button">Политика конфиденциальности</button>
      </div>
    </footer>
  )
}
