import {
  Brain,
  TrendingUp,
  MessageSquare,
  Globe,
  Zap,
  Search,
  Blocks,
  Code2,
  Rocket,
  HeartHandshake,
  Database,
  GraduationCap,
  FileText,
  FileCheck,
  Briefcase,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* БРЕНД                                                               */
/* ------------------------------------------------------------------ */

export const BRAND = {
  name: 'Vector Dev Studio',
  logoFirst: 'Vector',
  logoAccent: 'Dev Studio',
  // Боевые контакты — единственный канал связи на сайте (секция CTA и футер)
  telegram: '@vectordevagents',
  email: 'info@vectordev.ru',
  // Заглушка: телефон не опубликован, поэтому в футере скрыт
  phone: '+7 XXX XXX XX XX',
};

/* ------------------------------------------------------------------ */
/* НАВИГАЦИЯ                                                           */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: 'Услуги', href: '#services' },
  { label: 'Продукты', href: '#products' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Процесс', href: '#process' },
];

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

export const HERO = {
  lineOne: 'Мы строим',
  // Только формы множественного числа — согласуются с «которые работают 24/7»
  rotatingWords: [
    'умных агентов',
    'AI-продукты',
    'чат-боты',
    'системы автоматизации',
  ],
  lineThree: 'которые работают 24/7',
  subtitle:
    'Разрабатываем AI-решения, встраиваем искусственный интеллект в бизнес-процессы и создаём собственные продукты на базе ML.',
  primaryCta: 'Обсудить проект',
  secondaryCta: 'Посмотреть кейсы',
  floatingCardLeft: {
    eyebrow: 'темп · mvp',
    value: 'от 4',
    unit: 'недель',
    caption: 'от идеи до запуска MVP',
  },
  floatingCardRight: {
    eyebrow: 'формат · демо',
    value: '1–2',
    unit: 'недели',
    caption: 'прогресс на каждом спринте',
  },
};

/* ------------------------------------------------------------------ */
/* STATS                                                               */
/* ------------------------------------------------------------------ */

export interface Stat {
  prefix?: string;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
}

export const STATS: Stat[] = [
  { value: 2, suffix: '+ лет', label: 'Работаем на рынке' },
  { value: 20, suffix: '+', label: 'Реализованных AI-проектов' },
  { value: 3, suffix: '', label: 'Собственных продуктов в работе' },
  { value: 24, suffix: ' часа', label: 'На оценку вашего проекта' },
];

export const MARQUEE_TECH = [
  'OpenAI GPT-4',
  'LangChain',
  'n8n',
  'LangGraph',
  'Claude API',
  'Stable Diffusion',
  'Whisper',
  'ComfyUI',
  'RAG',
  'Vector DB',
  'Pinecone',
  'Chroma',
  'PostgreSQL',
  'Python',
  'FastAPI',
  'Node.js',
];

/* ------------------------------------------------------------------ */
/* SERVICES                                                            */
/* ------------------------------------------------------------------ */

export interface Service {
  icon: LucideIcon;
  color: 'violet' | 'cyan' | 'green' | 'amber';
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    icon: Brain,
    color: 'violet',
    title: 'AI-агенты и автоматизация',
    description:
      'Создаём агентов, которые самостоятельно выполняют задачи: обрабатывают заявки, квалифицируют лидов, заполняют CRM, ведут переписку и принимают решения.',
  },
  {
    icon: TrendingUp,
    color: 'cyan',
    title: 'Машинное обучение',
    description:
      'Разрабатываем ML-модели для прогнозирования, классификации, поиска аномалий и рекомендаций. Computer Vision, NLP, временные ряды.',
  },
  {
    icon: MessageSquare,
    color: 'green',
    title: 'Умные чат-боты',
    description:
      'Telegram, WhatsApp, Viber — боты с памятью, персонализацией, интеграцией в CRM и способностью вести сложные диалоги.',
  },
  {
    icon: Globe,
    color: 'amber',
    title: 'Веб и мобильные приложения',
    description:
      'Разрабатываем SaaS, маркетплейсы, лендинги, iOS/Android приложения. React, Next.js, React Native, Flutter.',
  },
  {
    icon: Zap,
    color: 'cyan',
    title: 'Интеграция AI в ваш бизнес',
    description:
      'Встраиваем AI-функционал в существующие продукты и процессы. API-интеграции, fine-tuning моделей, построение AI-пайплайнов.',
  },
];

/* ------------------------------------------------------------------ */
/* PRODUCTS                                                            */
/* ------------------------------------------------------------------ */

export interface Product {
  id: string;
  tab: string;
  icon: LucideIcon;
  name: string;
  badges: string[];
  pitch: string;
  groups: { heading: string; items: string[] }[];
  cta: string;
  accent: 'violet' | 'cyan' | 'green' | 'amber';
  /** Временно скрыт с лендинга — данные сохраняем, чтобы вернуть одним флагом */
  hidden?: boolean;
}

const ALL_PRODUCTS: Product[] = [
  {
    id: 'knowledgecore',
    tab: 'База знаний',
    icon: Database,
    name: 'База знаний',
    badges: ['Enterprise-ready'],
    pitch:
      'Интеллектуальная база знаний, которая разворачивается в корпоративном закрытом контуре.',
    groups: [
      {
        heading: 'Что принимает на вход',
        items: [
          'Документы (PDF, DOCX, XLSX, PPT)',
          'Видео и аудио (транскрибация)',
          'Изображения (OCR, распознавание)',
          'Базы данных (SQL, NoSQL)',
          'Внешние API и интеграции',
        ],
      },
      {
        heading: 'Что умеет',
        items: [
          'Семантический поиск по всему контенту',
          'Ответы на вопросы с указанием источника',
          'Автосуммаризация документов',
          'Выявление связей между документами',
          'Доступ через API или чат-интерфейс',
        ],
      },
    ],
    cta: 'Узнать подробнее',
    accent: 'violet',
  },
  {
    id: 'learnbot',
    tab: 'LearnBot',
    icon: GraduationCap,
    name: 'LearnBot',
    badges: ['EdTech'],
    pitch:
      'AI-агент для обучения и онбординга: собирает курсы из ваших методических материалов и ведёт каждого сотрудника по программе.',
    groups: [
      {
        heading: 'Возможности',
        items: [
          'Генерация курсов из методических материалов',
          'Тесты и квизы с разным уровнем сложности',
          'Анализ успеваемости сотрудников на обучении',
          'Выявление пробелов в знаниях',
          'Персональный учебный план и сопровождение',
          'Интеграция в корпоративные LMS',
        ],
      },
      {
        heading: 'Для кого',
        items: [
          'Онбординг новых сотрудников',
          'Внутреннее обучение и аттестация в компании',
          'Образовательные платформы',
        ],
      },
    ],
    cta: 'Запросить демо',
    accent: 'cyan',
  },
  {
    id: 'coverwise',
    tab: 'CoverWise',
    icon: FileCheck,
    name: 'CoverWise',
    badges: ['HR-tech', 'B2C'],
    pitch:
      'Конструктор резюме с ИИ: проверяет резюме по ATS-фильтрам, сопоставляет его с вакансией и адаптирует под конкретную позицию.',
    groups: [
      {
        heading: 'Возможности',
        items: [
          'ATS-анализ резюме по 40+ параметрам',
          'Сопоставление с вакансией и поиск недостающих ключевых слов',
          'Адаптация summary и приоритетов навыков под позицию',
          'Персонализированное сопроводительное письмо',
          'Подготовка к интервью: вероятные вопросы и разбор ответов',
          'ATS-совместимые шаблоны и экспорт в PDF, DOCX, JSON',
        ],
      },
      {
        heading: 'Как это работает',
        items: [
          'Загрузка резюме из PDF/DOCX или создание с нуля',
          'AI-парсер извлекает опыт, навыки и образование',
          'Анализ вакансии, скоринг и список правок за один проход',
        ],
      },
    ],
    cta: 'Попробовать бесплатно',
    accent: 'green',
  },
  {
    id: 'meetscribe',
    hidden: true,
    tab: 'MeetScribe',
    icon: FileText,
    name: 'MeetScribe',
    badges: ['Productivity'],
    pitch:
      'Превращает ваши звонки и встречи в структурированный рабочий контент.',
    groups: [
      {
        heading: 'Что происходит после встречи',
        items: [
          'Транскрипция аудио и видео на русском и английском',
          'Краткое саммари за 30 секунд',
          'Список принятых решений',
          'Автоматические задачи с исполнителями',
          'Пункты повестки следующей встречи',
          'Интеграция в Jira / Notion / Trello / CRM',
        ],
      },
      {
        heading: 'Поддерживает',
        items: [
          'Zoom, Teams, Google Meet',
          'Telegram, WhatsApp',
          'Загрузка файлов MP3 / MP4 / WAV',
        ],
      },
    ],
    cta: 'Попробовать бесплатно',
    accent: 'green',
  },
  {
    id: 'salesflow',
    hidden: true,
    tab: 'SalesFlow AI',
    icon: Briefcase,
    name: 'SalesFlow AI',
    badges: ['Sales Automation', 'NEW'],
    pitch:
      'Интеллектуальный ассистент, который работает на ваших продавцов в режиме реального времени.',
    groups: [
      {
        heading: 'Во время звонка',
        items: [
          'Анализирует речь и настроение клиента',
          'Подсказывает ответы на возражения',
          'Сигнализирует о ключевых моментах',
        ],
      },
      {
        heading: 'После звонка',
        items: [
          'Заполняет CRM автоматически',
          'Генерирует персонализированные follow-up',
          'Разбирает каждый звонок по чек-листу отдела продаж',
          'Строит аналитику конверсии',
        ],
      },
      {
        heading: 'Результат',
        items: ['+35% конверсия', '−70% рутины для продавцов'],
      },
    ],
    cta: 'Обсудить внедрение',
    accent: 'amber',
  },
];

// На лендинг выводим только продукты без флага hidden
export const PRODUCTS: Product[] = ALL_PRODUCTS.filter((p) => !p.hidden);

/* ------------------------------------------------------------------ */
/* CASES                                                               */
/* ------------------------------------------------------------------ */

export type CaseCategory = 'AI-агенты' | 'Платформы';

export interface CaseItem {
  category: CaseCategory;
  badge: string;
  title: string;
  client: string;
  description: string;
  results: string[];
  tags: string[];
  accent: 'violet' | 'cyan' | 'green' | 'amber';
  gradient: string;
}

export const CASE_FILTERS: ('Все' | CaseCategory)[] = [
  'Все',
  'AI-агенты',
  'Платформы',
];

export const CASES: CaseItem[] = [
  {
    category: 'AI-агенты',
    badge: 'AI-агент',
    client: 'Mannex',
    title: 'Автоматизация обработки лидов',
    description:
      'AI-агент для сети магазинов манекенов: собирает заявки из 5 каналов, квалифицирует и приоритизирует их через GPT-4o, заполняет CRM и сам дожимает «холодные» лиды рассылкой в WhatsApp.',
    results: ['−80% времени на ручной ввод', '0 потерянных заявок', 'Интеграция за 3 недели'],
    tags: ['OpenAI GPT-4o', 'n8n', 'WhatsApp API', 'Google Sheets'],
    accent: 'violet',
    gradient: 'linear-gradient(135deg, rgba(74,64,201,0.14), rgba(15,165,108,0.06))',
  },
  {
    category: 'Платформы',
    badge: 'Платформа',
    client: 'AIMart',
    title: 'Маркетплейс AI-услуг',
    description:
      'B2B-маркетплейс AI-услуг: каталог исполнителей, безопасные сделки через эскроу, ролевой доступ и встроенный мессенджер между заказчиком и исполнителем.',
    results: ['Безопасные сделки через эскроу', 'Чат и статусы сделок в реальном времени', 'Ролевая модель и система заявок'],
    tags: ['Django', 'DRF', 'React', 'PostgreSQL', 'WebSockets'],
    accent: 'cyan',
    gradient: 'linear-gradient(135deg, rgba(28,126,146,0.14), rgba(203,242,74,0.1))',
  },
  {
    category: 'Платформы',
    badge: 'Платформа',
    client: 'Джентльмен',
    title: 'Внутренний портал барбершопов',
    description:
      'Система для сети барбершопов: чек-листы, заказы расходников, тикеты, AI-бот знаний.',
    results: ['Роли: Администратор / Менеджер / Директор', 'Авто-напоминания по расписанию', 'RAG-бот по внутренней базе знаний'],
    tags: ['Node.js', 'React', 'PostgreSQL', 'Prisma', 'Qdrant', 'OpenAI GPT-4o/5 mini'],
    accent: 'amber',
    gradient: 'linear-gradient(135deg, rgba(178,107,42,0.14), rgba(74,64,201,0.06))',
  },
  {
    category: 'AI-агенты',
    badge: 'AI-агент рекрутинга',
    client: 'HR AutoRecruit',
    title: 'Автоматизация найма',
    description:
      'AI-система скрининга кандидатов с HH.ru и Avito, автоматические интервью, передача HR.',
    results: ['Обработка 500+ откликов/день', 'Автоскрининг по требованиям вакансии', 'Интеграция с ATS'],
    tags: ['Python', 'LangChain', 'OpenAI GPT-4o/5 mini', 'HH API', 'Avito API', 'Telegram'],
    accent: 'cyan',
    gradient: 'linear-gradient(135deg, rgba(28,126,146,0.14), rgba(74,64,201,0.06))',
  },
];

/* ------------------------------------------------------------------ */
/* PROCESS                                                             */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
}

export const PROCESS: ProcessStep[] = [
  {
    icon: Search,
    title: 'Discovery',
    subtitle: 'и анализ',
    description: 'Глубоко изучаем вашу задачу, бизнес-процессы и KPI успеха.',
    duration: '1–3 дня',
  },
  {
    icon: Blocks,
    title: 'Архитектура',
    subtitle: 'и планирование',
    description: 'Проектируем технический стек, пишем ТЗ, оцениваем сроки.',
    duration: '2–5 дней',
  },
  {
    icon: Code2,
    title: 'Разработка',
    subtitle: 'MVP',
    description: 'Итерации по 1–2 недели. Демо после каждого спринта.',
    duration: '2–8 недель',
  },
  {
    icon: Rocket,
    title: 'Тестирование',
    subtitle: 'и запуск',
    description: 'Нагрузочное тестирование, аудит безопасности, запуск.',
    duration: '1–2 недели',
  },
  {
    icon: HeartHandshake,
    title: 'Поддержка',
    subtitle: 'и развитие',
    description: 'CI/CD, мониторинг, доработки по обратной связи.',
    duration: 'Постоянно',
  },
];

/* ------------------------------------------------------------------ */
/* TECH STACK                                                          */
/* ------------------------------------------------------------------ */

export interface TechGroup {
  label: string;
  color: 'violet' | 'cyan' | 'green' | 'amber';
  items: string[];
}

export const TECH_STACK: TechGroup[] = [
  {
    label: 'AI',
    color: 'violet',
    items: [
      'OpenAI',
      'Anthropic Claude',
      'LangChain',
      'LangGraph',
      'LangFlow',
      'n8n',
      'Flowise',
      'LlamaIndex',
      'CrewAI',
      'Ollama',
      'vLLM',
    ],
  },
  {
    label: 'ML',
    color: 'amber',
    items: [
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'Hugging Face',
      'Stable Diffusion',
      'Whisper',
      'YOLO',
      'OpenCV',
    ],
  },
  {
    label: 'Backend',
    color: 'cyan',
    items: [
      'Python',
      'FastAPI',
      'Django',
      'DRF',
      'Celery',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'Qdrant',
      'Supabase',
    ],
  },
  {
    label: 'Frontend',
    color: 'green',
    items: ['React', 'Next.js', 'TypeScript', 'React Native', 'Flutter', 'Tailwind'],
  },
  {
    label: 'Infrastructure',
    color: 'violet',
    items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'GitHub Actions', 'Nginx'],
  },
];

/* ------------------------------------------------------------------ */
/* TESTIMONIALS                                                        */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

// Точку в конце цитаты не ставим — по русской типографике она идёт
// после закрывающей «ёлочки» и добавляется в разметке.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Честно говоря, я не верил, что бот справится с заявками лучше менеджеров. Через три недели после запуска ребята перестали разгребать входящие вручную: агент сам раскладывает всё по CRM, а нам остаются только тёплые клиенты',
    name: 'Иван К.',
    role: 'Генеральный директор, Mannex',
    initials: 'ИК',
  },
  {
    quote:
      'У нас больше 1000 нормативных документов, и раньше поиск нужной информации мог занять полдня. Теперь сотрудники просто задают вопрос базе знаний и получают ответ со ссылкой на источник',
    name: 'Мария С.',
    role: 'CTO, производственная компания',
    initials: 'МС',
  },
  {
    quote:
      'Скрининг откликов съедал у HR-команды почти всю рабочую неделю. Сейчас на него уходит несколько часов, а освободившееся время тратим на собеседования, а не на разбор анкет',
    name: 'Дмитрий В.',
    role: 'Head of HR, ритейл',
    initials: 'ДВ',
  },
];

/* ------------------------------------------------------------------ */
/* FOOTER                                                              */
/* ------------------------------------------------------------------ */

export const FOOTER = {
  about:
    'Разрабатываем AI-решения и автоматизируем бизнес-процессы.',
  columns: [
    {
      title: 'Услуги',
      links: ['AI-агенты', 'ML-разработка', 'Чат-боты', 'Веб / Мобайл'],
    },
    {
      title: 'Продукты',
      links: ['База знаний', 'LearnBot', 'CoverWise'],
    },
  ],
};
