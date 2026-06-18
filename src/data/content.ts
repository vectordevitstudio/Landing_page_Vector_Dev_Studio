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
  // Контакты — ЗАГЛУШКИ, заменить на реальные перед публикацией
  telegram: '@vectordevstudio',
  email: 'hello@vectordev.studio',
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
  badge: 'Автоматизация бизнеса с помощью AI',
  lineOne: 'Мы строим',
  rotatingWords: [
    'умных агентов',
    'AI-продукты',
    'будущее вашего бизнеса',
    'автоматизацию',
  ],
  lineThree: 'которые работают 24/7',
  subtitle:
    'Разрабатываем AI-решения, интегрируем искусственный интеллект в ваши процессы и создаём собственные продукты на базе ML. От идеи до production за недели, не месяцы.',
  primaryCta: 'Обсудить проект',
  secondaryCta: 'Посмотреть кейсы',
  floatingCardLeft: {
    eyebrow: 'темп · mvp',
    value: '2–8',
    unit: 'недель',
    caption: 'от идеи до рабочего продукта',
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
  { value: 47, suffix: '+', label: 'Реализованных AI-проектов' },
  { value: 94, suffix: '%', label: 'Клиентов возвращаются снова' },
  { value: 3.2, suffix: 'x', decimals: 1, label: 'Средний рост конверсии после внедрения AI' },
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
}

export const PRODUCTS: Product[] = [
  {
    id: 'knowledgecore',
    tab: 'KnowledgeCore',
    icon: Database,
    name: 'KnowledgeCore',
    badges: ['Enterprise-ready'],
    pitch:
      'Интеллектуальная база знаний, которая разворачивается в вашем закрытом контуре.',
    groups: [
      {
        heading: 'Что принимает на вход',
        items: [
          'Документы (PDF, DOCX, XLSX, PPT)',
          'Видео и аудио (транскрибация)',
          'Изображения (OCR, распознавание)',
          'Веб-страницы и URL',
          'Базы данных и API',
          'Email и переписки',
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
          'Полный контроль данных внутри контура',
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
      'AI-наставник, который персонализирует обучение под каждого сотрудника или ученика.',
    groups: [
      {
        heading: 'Возможности',
        items: [
          'Генерация обучающих курсов из ваших материалов',
          'Умные тесты и квизы с адаптивной сложностью',
          'Объяснение материала разными способами',
          'Анализ пробелов в знаниях',
          'Персональный учебный план',
          'Интеграция в корпоративные LMS',
        ],
      },
      {
        heading: 'Для кого',
        items: [
          'B2B — онбординг сотрудников',
          'EdTech — образовательные платформы',
          'B2C — самообучение и хобби-курсы',
        ],
      },
    ],
    cta: 'Запросить демо',
    accent: 'cyan',
  },
  {
    id: 'meetscribe',
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
          'Транскрипция аудио/видео (99% точность)',
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
          'Оценивает качество звонка по 15 критериям',
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
  {
    id: 'raize',
    tab: 'Raize.ai',
    icon: Rocket,
    name: 'Raize.ai',
    badges: ['Platform', 'B2B/B2C'],
    pitch:
      'Платформа для быстрого тестирования гипотез, валидации идей и глубокой аналитики рынка с помощью AI.',
    groups: [
      {
        heading: 'Возможности',
        items: [
          'A/B тесты гипотез на реальной аудитории',
          'Генерация и анализ customer development',
          'AI-аналитик, который интерпретирует данные',
          'Автоматические отчёты и инсайты',
          'Конкурентный анализ в реальном времени',
          'Прогнозирование product-market fit',
        ],
      },
      {
        heading: 'Для кого',
        items: ['Стартапы', 'Продуктовые команды', 'Маркетологи', 'Инвесторы'],
      },
    ],
    cta: 'Открыть платформу',
    accent: 'violet',
  },
];

/* ------------------------------------------------------------------ */
/* CASES                                                               */
/* ------------------------------------------------------------------ */

export type CaseCategory = 'AI-агенты' | 'Веб/Мобайл';

export interface CaseItem {
  category: CaseCategory;
  badge: string;
  title: string;
  client: string;
  description: string;
  results: string[];
  tags: string[];
  gradient: string;
}

export const CASE_FILTERS: ('Все' | CaseCategory)[] = [
  'Все',
  'AI-агенты',
  'Веб/Мобайл',
];

export const CASES: CaseItem[] = [
  {
    category: 'AI-агенты',
    badge: 'AI-агент',
    client: 'MNKN',
    title: 'Автоматизация обработки лидов',
    description:
      'AI-агент для сети магазинов манекенов: сбор лидов из 5 источников, автозаполнение CRM, авторассылка по незакрытым клиентам.',
    results: ['−80% времени на ручной ввод', '0 потерянных заявок', 'Интеграция за 3 недели'],
    tags: ['n8n', 'Google Sheets', 'WhatsApp API'],
    gradient: 'linear-gradient(135deg, rgba(74,64,201,0.14), rgba(15,165,108,0.06))',
  },
  {
    category: 'Веб/Мобайл',
    badge: 'Платформа',
    client: 'AIMart',
    title: 'Маркетплейс AI-услуг',
    description:
      'Полноценный B2B-маркетплейс для заказа AI-сервисов: эскроу, чат, система заявок, роли.',
    results: ['Django + React', 'Система эскроу-платежей', 'Real-time чат через WebSockets'],
    tags: ['Django', 'React', 'PostgreSQL', 'Stripe'],
    gradient: 'linear-gradient(135deg, rgba(28,126,146,0.14), rgba(203,242,74,0.1))',
  },
  {
    category: 'Веб/Мобайл',
    badge: 'EdTech платформа',
    client: 'Резюме.AI',
    title: 'SaaS для создания резюме',
    description:
      'Русскоязычный аналог Rezi.ai с AI-анализом, адаптацией под вакансии и интеграцией HH.ru.',
    results: ['30+ AI-функций в MVP', 'ATS-аудит по 30 критериям', '4 формата экспорта, mock interview'],
    tags: ['React', 'FastAPI', 'OpenAI', 'Playwright'],
    gradient: 'linear-gradient(135deg, rgba(15,165,108,0.14), rgba(28,126,146,0.06))',
  },
  {
    category: 'Веб/Мобайл',
    badge: 'Корпоративный портал',
    client: 'Папа Дома',
    title: 'Внутренний портал барбершопов',
    description:
      'Система для сети барбершопов: чек-листы, заказы расходников, тикеты, AI-бот знаний.',
    results: ['Роли: Администратор / Менеджер / Директор', 'Авто-напоминания по расписанию', 'RAG-чат на базе знаний'],
    tags: ['Node.js', 'React', 'PostgreSQL', 'Prisma'],
    gradient: 'linear-gradient(135deg, rgba(178,107,42,0.14), rgba(74,64,201,0.06))',
  },
  {
    category: 'AI-агенты',
    badge: 'AI-агент рекрутинга',
    client: 'HR AutoRecruit',
    title: 'Автоматизация найма',
    description:
      'AI-система скрининга кандидатов с HH.ru и Avito, автоматические интервью, передача HR.',
    results: ['Обработка 500+ откликов/день', 'Автоскрининг по 15 критериям', 'Интеграция с ATS'],
    tags: ['Python', 'LangChain', 'Telegram', 'HH API'],
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
    description: 'Нагрузочное тестирование, security-аудит, деплой в prod.',
    duration: '1–2 недели',
  },
  {
    icon: HeartHandshake,
    title: 'Поддержка',
    subtitle: 'и развитие',
    description: 'CI/CD, мониторинг, доработки по фидбеку.',
    duration: 'Онгоинг',
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

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Команда разработала AI-агента для обработки заявок за 3 недели. Мы ожидали 2 месяца. Сейчас агент обрабатывает 100% входящих лидов автоматически — мы только забираем горячих клиентов.',
    name: 'Иван К.',
    role: 'Генеральный директор, MNKN',
    initials: 'ИК',
  },
  {
    quote:
      'Построили нам базу знаний на 50 000 документов. Сотрудники находят нужную информацию за секунды вместо часов. ROI окупился за первый месяц.',
    name: 'Мария С.',
    role: 'CTO, производственная компания',
    initials: 'МС',
  },
  {
    quote:
      'Подключили AI-скрининг кандидатов — время HR-команды на первичную обработку сократилось с 40 часов в неделю до 4. Удивительный результат.',
    name: 'Дмитрий В.',
    role: 'Head of HR, ритейл',
    initials: 'ДВ',
  },
  {
    quote:
      'Разработали мобильное приложение и опубликовали в сторах. Сделали всё от дизайна до ASO-оптимизации. Команда, которой можно доверять.',
    name: 'Анна П.',
    role: 'Основатель EdTech-стартапа',
    initials: 'АП',
  },
];

/* ------------------------------------------------------------------ */
/* FOOTER                                                              */
/* ------------------------------------------------------------------ */

export const FOOTER = {
  about:
    'Разрабатываем AI-решения, автоматизируем бизнес, создаём продукты будущего.',
  columns: [
    {
      title: 'Услуги',
      links: ['AI-агенты', 'ML-разработка', 'Чат-боты', 'Веб / Мобайл'],
    },
    {
      title: 'Продукты',
      links: ['KnowledgeCore', 'LearnBot', 'MeetScribe', 'SalesFlow AI', 'Raize.ai'],
    },
  ],
};
