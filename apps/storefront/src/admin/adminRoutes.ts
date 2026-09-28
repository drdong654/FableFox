export type AdminRoute = {
  id: 'overview' | 'pages' | 'products' | 'categories' | 'media' | 'requests' | 'team' | 'settings'
  path: string
  title: string
  eyebrow: string
  description: string
  icon: string
  group: 'main' | 'system'
}

export const adminRoutes: AdminRoute[] = [
  { id: 'overview', path: '/admin', title: 'Обзор', eyebrow: 'Рабочее пространство владельца', description: 'Главные показатели, быстрые действия и состояние сайта.', icon: '⌂', group: 'main' },
  { id: 'pages', path: '/admin/pages', title: 'Страницы', eyebrow: 'Контент сайта', description: 'Структура страниц, блоки, черновики и публикация.', icon: '▤', group: 'main' },
  { id: 'products', path: '/admin/products', title: 'Товары', eyebrow: 'Управление каталогом', description: 'Карточки товаров, статусы, цены и наличие.', icon: '◇', group: 'main' },
  { id: 'categories', path: '/admin/categories', title: 'Категории', eyebrow: 'Структура каталога', description: 'Группировка товаров и порядок разделов каталога.', icon: '⌑', group: 'main' },
  { id: 'media', path: '/admin/media', title: 'Медиа', eyebrow: 'Библиотека файлов', description: 'Изображения, подписи и повторное использование материалов.', icon: '▧', group: 'main' },
  { id: 'requests', path: '/admin/requests', title: 'Заявки', eyebrow: 'Обращения клиентов', description: 'Новые обращения, статусы и история работы с клиентами.', icon: '↗', group: 'main' },
  { id: 'team', path: '/admin/team', title: 'Команда', eyebrow: 'Доступ и роли', description: 'Пользователи панели и уровни доступа.', icon: '♙', group: 'system' },
  { id: 'settings', path: '/admin/settings', title: 'Настройки', eyebrow: 'Параметры проекта', description: 'Основные данные сайта и системные параметры.', icon: '⚙', group: 'system' },
]

export function findAdminRoute(path: string) {
  return adminRoutes.find((route) => route.path === path)
}
