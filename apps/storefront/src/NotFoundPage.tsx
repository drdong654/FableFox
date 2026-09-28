import { SiteFooter, SiteHeader } from './components/SiteChrome'

export default function NotFoundPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="not-found">
        <span aria-hidden="true">404</span>
        <p className="eyebrow"><i /> След потерялся</p>
        <h1>Этой страницы<br /><em>не существует</em></h1>
        <p>Возможно, ссылка устарела или адрес был введён с ошибкой.</p>
        <a className="button button--primary" href="/">Вернуться на главную <b aria-hidden="true">↗</b></a>
      </main>
      <SiteFooter />
    </div>
  )
}
