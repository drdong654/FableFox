import { useState } from 'react'
import { SiteFooter, SiteHeader } from './components/SiteChrome'

const categories = ['Все работы', 'Герои', 'Существа', 'Игровые реликвии']

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <fieldset className="catalog-filter">
      <legend>{title}</legend>
      {options.map((option) => (
        <label key={option}>
          <input type="checkbox" />
          <span>{option}</span>
        </label>
      ))}
    </fieldset>
  )
}

function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="site-shell catalog-page">
      <SiteHeader active="catalog" />

      <main>
        <section className="catalog-hero" aria-labelledby="catalog-title">
          <div className="catalog-hero__ornament" aria-hidden="true">FF</div>
          <div className="content-width catalog-hero__content">
            <p className="eyebrow"><span /> Коллекция Fable Fox</p>
            <h1 id="catalog-title">Найдите героя<br />для своей <em>истории</em></h1>
            <p>Авторские миниатюры, игровые существа и реликвии для стола — собранные в одном месте.</p>
          </div>
        </section>

        <section className="catalog content-width" aria-label="Каталог товаров">
          <div className="catalog__categories" aria-label="Категории">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? 'catalog__category catalog__category--active' : 'catalog__category'}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="catalog__toolbar">
            <p><strong>0</strong> работ</p>
            <div>
              <button
                className="catalog__filter-toggle"
                type="button"
                aria-expanded={filtersOpen}
                onClick={() => setFiltersOpen((open) => !open)}
              >
                Фильтры <span aria-hidden="true">⌘</span>
              </button>
              <label className="catalog__sort">
                <span>Сортировка</span>
                <select defaultValue="featured">
                  <option value="featured">Сначала избранное</option>
                  <option value="new">Сначала новые</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                </select>
              </label>
            </div>
          </div>

          <div className="catalog__layout">
            <form className={`catalog__filters ${filtersOpen ? 'catalog__filters--open' : ''}`} aria-label="Фильтры каталога">
              <div className="catalog__filters-heading">
                <h2>Фильтры</h2>
                <button type="reset">Сбросить</button>
              </div>
              <FilterGroup title="Тип работы" options={['Игровая миниатюра', 'Коллекционная работа', 'Аксессуар']} />
              <FilterGroup title="Исполнение" options={['Без росписи', 'Ручная роспись', 'Под заказ']} />
              <FilterGroup title="Наличие" options={['В наличии', 'Предзаказ']} />
            </form>

            <div className="catalog__results">
              <div className="catalog-empty">
                <span className="catalog-empty__mark" aria-hidden="true">✦</span>
                <p className="eyebrow"><span /> Скоро здесь появятся герои</p>
                <h2>Коллекция готовится<br /><em>к публикации</em></h2>
                <p>Мы не стали заполнять каталог случайными примерами. Здесь появятся реальные работы — с фотографиями, характеристиками и актуальной информацией о наличии.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default CatalogPage
