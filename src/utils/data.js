// Услуги и цены
export const services = [
  {
    id: 1,
    name: 'Мужская стрижка',
    price: 1800,
    duration: 45,
    category: 'haircut',
    icon: 'scissors',
    description: 'Классическая или модельная стрижка с мытьём головы и укладкой'
  },
  {
    id: 2,
    name: 'Стрижка бороды',
    price: 1200,
    duration: 30,
    category: 'beard',
    icon: 'beard',
    description: 'Моделирование и стрижка бороды, уход маслами'
  },
  {
    id: 3,
    name: 'Комплекс (стрижка + борода)',
    price: 2700,
    duration: 75,
    category: 'complex',
    icon: 'crown',
    description: 'Полный комплекс: стрижка + оформление бороды'
  },
  {
    id: 4,
    name: 'Бритьё опасной бритвой',
    price: 1500,
    duration: 40,
    category: 'shave',
    icon: 'razor',
    description: 'Классическое бритьё с горячим полотенцем'
  },
  {
    id: 5,
    name: 'Детская стрижка',
    price: 1200,
    duration: 30,
    category: 'haircut',
    icon: 'child',
    description: 'Стрижка для юношей до 14 лет'
  },
  {
    id: 6,
    name: 'Королевское бритьё',
    price: 2200,
    duration: 60,
    category: 'shave',
    icon: 'crown',
    description: 'Бритьё с распариванием, маской и массажем лица'
  }
]

// Мастера
export const masters = [
  { id: 1, name: 'Артём', experience: '7 лет', rating: 4.9 },
  { id: 2, name: 'Денис', experience: '5 лет', rating: 4.8 },
  { id: 3, name: 'Виктор', experience: '6 лет', rating: 4.7 }
]

// Временные слоты
export const timeSlots = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
]

// Доп. опции
export const addons = [
  { id: 1, name: 'Мытьё головы', price: 200 },
  { id: 2, name: 'Укладка воском', price: 150 }
]

// Портфолио
export const portfolioItems = [
  {
    id: 1,
    title: 'Фейдер + текстурирование',
    master: 'Артём',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Классическая стрижка',
    master: 'Денис',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Оформление бороды',
    master: 'Виктор',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Кроп-топ',
    master: 'Артём',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Андеркат',
    master: 'Денис',
    image: 'https://images.unsplash.com/photo-1634302086887-13b560267b44?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Королевское бритьё',
    master: 'Виктор',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop'
  }
]

// Отзывы
export const reviews = [
  {
    id: 1,
    name: 'Алексей М.',
    date: '15.03.2025',
    rating: 5,
    comment: 'Отличный барбершоп! Артём сделал идеальную стрижку. Атмосфера на высоте, обязательно вернусь.',
    avatar: 'https://i.pravatar.cc/50?img=1'
  },
  {
    id: 2,
    name: 'Дмитрий К.',
    date: '02.03.2025',
    rating: 5,
    comment: 'Борода теперь выглядит идеально. Мастер Денис знает своё дело. Рекомендую всем!',
    avatar: 'https://i.pravatar.cc/50?img=3'
  },
  {
    id: 3,
    name: 'Игорь С.',
    date: '28.02.2025',
    rating: 5,
    comment: 'Первый раз попробовал бритьё опасной бритвой — впечатления незабываемые. Сервис топ!',
    avatar: 'https://i.pravatar.cc/50?img=5'
  },
  {
    id: 4,
    name: 'Максим В.',
    date: '20.02.2025',
    rating: 5,
    comment: 'Хожу сюда уже полгода. Всегда чистота, стерильность и отличный результат.',
    avatar: 'https://i.pravatar.cc/50?img=7'
  },
  {
    id: 5,
    name: 'Сергей П.',
    date: '15.02.2025',
    rating: 4,
    comment: 'Хороший барбершоп с приятной атмосферой. Стрижка качественная, цена адекватная.',
    avatar: 'https://i.pravatar.cc/50?img=11'
  }
]

// FAQ
export const faqItems = [
  {
    question: 'Стерилизуете ли вы инструменты?',
    answer: 'Да, мы используем автоклав для стерилизации всех инструментов после каждого клиента. Одноразовые насадки выбрасываются сразу после использования. Ваша безопасность — наш приоритет.'
  },
  {
    question: 'Что если я опоздаю?',
    answer: 'Мы ждём клиента до 10 минут без последствий. При опоздании более 10 минут запись может быть перенесена без штрафа. Просто предупредите нас заранее.'
  },
  {
    question: 'Можно ли оплатить картой?',
    answer: 'Да, мы принимаем все виды оплаты: наличные, банковские карты (Visa, Mastercard, МИР), бесконтактную оплату через Apple Pay и Google Pay, а также переводы по СБП.'
  },
  {
    question: 'Как отменить запись?',
    answer: 'Вы можете отменить или перенести запись за 2 часа до визита через WhatsApp или по телефону. Это поможет нам оптимизировать расписание.'
  },
  {
    question: 'Есть ли скидка на первый визит?',
    answer: 'Да! При первом посещении вы получаете скидку 15% на любую стрижку. Просто скажите мастеру, что вы у нас впервые.'
  }
]
