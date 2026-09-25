import { ArrowIcon, SiteFooter, SiteHeader } from './components/SiteChrome'

const steps = [
  ['01', 'Идея', 'Ищем характер, настроение и детали, из которых сложится будущий образ.'],
  ['02', 'Форма', 'Готовим модель, собираем композицию и проверяем, как она читается со всех сторон.'],
  ['03', 'Роспись', 'Светом и цветом раскрываем материалы, историю и темперамент персонажа.'],
  ['04', 'Финиш', 'Проверяем каждую деталь, наносим защитное покрытие и готовим работу к отправке.'],
]

const principles = [
  ['Характер важнее тиража', 'Мы выбираем выразительные образы и выпускаем их небольшими сериями.'],
  ['Ручная работа видна', 'Лёгкие различия в оттенках и деталях делают каждую работу индивидуальной.'],
  ['Вещь служит истории', 'Красота миниатюры не мешает ей становиться частью игры и живой коллекции.'],
]

function AboutPage() {
  return (
    <div className="site-shell about-page">
      <SiteHeader active="about" />

      <main>
        <section className="about-hero" aria-labelledby="about-title">
          <img src="/images/workshop.png" alt="Рабочее место мастера Fable Fox" />
          <div className="about-hero__veil" />
          <div className="about-hero__content content-width">
            <p className="eyebrow"><span /> Мастерская Fable Fox</p>
            <h1 id="about-title">Здесь истории<br /><em>обретают форму</em></h1>
            <p>Мы создаём авторские миниатюры и игровые реликвии — предметы, которые делают вымышленные миры чуть более настоящими.</p>
          </div>
          <div className="scroll-cue"><span /> История мастерской</div>
        </section>

        <section className="section about-story content-width" aria-labelledby="story-title">
          <div className="about-story__heading">
            <p className="eyebrow"><span /> С чего всё началось</p>
            <h2 id="story-title">Желание сделать<br />игровой мир <em>осязаемым</em></h2>
          </div>
          <div className="about-story__copy">
            <p className="about-story__lead">Миниатюры всегда были для нас чем-то большим, чем просто фигурки на игровом поле.</p>
            <p>Это герои, противники и свидетели историй, которые игроки создают вместе. Fable Fox появилась из любви к настольным приключениям, ручной работе и вещам с характером.</p>
            <p>Мы создаём предметы, которые приятно рассматривать, держать в руках и однажды поставить в центр важной сцены.</p>
          </div>
        </section>

        <section className="about-quote" aria-label="Подход мастерской">
          <div className="content-width about-quote__inner">
            <span aria-hidden="true">“</span>
            <blockquote>Мне важно, чтобы у миниатюры был характер ещё до того, как игрок придумал ей имя.</blockquote>
            <p>— мастер Fable Fox</p>
          </div>
        </section>

        <section className="section process content-width" aria-labelledby="process-title">
          <div className="section-heading process__heading">
            <div>
              <p className="eyebrow"><span /> Внутри мастерской</p>
              <h2 id="process-title">От первой линии<br />до <em>последнего штриха</em></h2>
            </div>
            <p>Каждая работа проходит четыре этапа. На каждом из них мы проверяем не только качество исполнения, но и цельность образа.</p>
          </div>

          <div className="process__layout">
            <div className="process__image">
              <img src="/images/workshop.png" alt="Ручная роспись миниатюры" loading="lazy" />
              <span>Ручная работа · внимательность · характер</span>
            </div>
            <ol className="process__steps">
              {steps.map(([number, title, text]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="principles" aria-labelledby="principles-title">
          <div className="content-width">
            <p className="eyebrow"><span /> Наш подход</p>
            <h2 id="principles-title">Вещи, в которых<br /><em>живут истории</em></h2>
            <div className="principles__grid">
              {principles.map(([title, text], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section studio-gallery content-width" aria-labelledby="gallery-title">
          <div className="studio-gallery__heading">
            <p className="eyebrow"><span /> Детали процесса</p>
            <h2 id="gallery-title">Мастерская<br /><em>без прикрас</em></h2>
            <p>Кисти, краски, фактуры и готовые герои — всё, из чего складывается повседневная жизнь Fable Fox.</p>
          </div>
          <div className="studio-gallery__grid">
            <img src="/images/dragonborn.png" alt="Детали росписи брони миниатюры" loading="lazy" />
            <img src="/images/forest-witch.png" alt="Авторская миниатюра хранительницы леса" loading="lazy" />
            <img src="/images/mimic.png" alt="Роспись игровой миниатюры мимика" loading="lazy" />
          </div>
        </section>

        <section className="final-cta" aria-labelledby="about-final-title">
          <div className="final-cta__ornament" aria-hidden="true">✦</div>
          <p className="eyebrow"><span /> Продолжение истории</p>
          <h2 id="about-final-title">Возможно, следующий герой<br />уже <em>ждёт вас</em></h2>
          <p>Посмотрите готовые работы или расскажите нам об образе, который хотите воплотить.</p>
          <div className="final-cta__actions">
            <a className="button button--primary" href="/catalog">Смотреть коллекцию <ArrowIcon /></a>
            <button className="text-link" type="button">Обсудить идею <span>→</span></button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default AboutPage
