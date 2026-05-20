const fs = require('fs');
const path = require('path');

// Данные из ТЗ
const ageGroups = {
  '0-7': {
    genres: [
      'Алфавит', 'Цифры', 'Учимся читать', 'Гигиена', 'Правила поведения',
      'Учим животных', 'Прописи', 'Фигуры', 'Русские сказки', 'Цвета',
      'Национальности', 'Подводный мир', 'Спасатель в больнице'
    ],
    heroes: ['Динозавры', 'Принцессы', 'Супергерои', 'Единороги', 'Инопланетяне', 'Выдуманные герои', 'Животные', 'Феи', 'Пираты', 'Доктор'],
    locations: ['Лес', 'Сад', 'Улица', 'Мойка', 'Цирк', 'Парк', 'Озеро', 'Река', 'Набережная', 'Комната', 'Двор', 'Садик', 'Школа', 'Зоопарк', 'Замок', 'Пустыня', 'Море', 'Луг', 'Поле', 'Баня', 'Дворец', 'Космос', 'Город', 'Мегаполис', 'Детский сад', 'Корабль', 'Футбольное поле', 'Океан', 'Больница'],
    companions: ['Родители', 'Брат', 'Сестра', 'Друзья', 'Родственники']
  },
  '7-12': {
    genres: [
      'Виды машин', 'Мода', 'Борьба с буллингом', 'Мир брендов', 'Косметика',
      'Похудение', 'Шахматы', 'Вязание', 'Оригами', 'Бисер', 'Композиции',
      'Рисование', 'Опыты', 'Цитаты', 'ПДД', 'Космос'
    ],
    heroes: ['Супергерои', 'Спортсмены', 'Ученые', 'Художники', 'Блогеры', 'Детективы', 'Путешественники', 'Изобретатели'],
    locations: ['Школа', 'Стадион', 'Лаборатория', 'Студия', 'Город', 'Парк', 'Библиотека', 'Торговый центр', 'Космос', 'Автодром'],
    companions: ['Лучшие друзья', 'Одноклассники', 'Учителя', 'Тренеры', 'Кумиры']
  },
  '12-18': {
    genres: [
      'Любовь', 'Лучший друг', 'Поздравления', 'Родственники', '18 лет',
      'Знакомство со звездой', 'Excel и Word', 'Напитки', 'Рецепты', 'Языки'
    ],
    heroes: ['Влюбленные', 'Друзья', 'Семья', 'Звезды', 'Блогеры', 'Студенты', 'Предприниматели'],
    locations: ['Кафе', 'Университет', 'Концерт', 'Путешествие', 'Дом', 'Офис', 'Город мечты', 'Соцсети'],
    companions: ['Партнер', 'Лучшая подруга', 'Члены семьи', 'Фанаты', 'Коллеги']
  }
};

const colorSchemes = [
  { name: 'Мятный бриз', primary: 'mint', secondary: 'peach' },
  { name: 'Золотая сказка', primary: 'cream', secondary: 'gold' },
  { name: 'Ягодный микс', primary: 'raspberry', secondary: 'pistachio' },
  { name: 'Нежный закат', primary: 'peach', secondary: 'mint' },
  { name: 'Шоколад', primary: 'brown', secondary: 'gold' }
];

const formats = ['PDF', 'Бумажная книга', 'PDF + Аудио', 'Премиум (PDF+Аудио+Музыка)'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTitle(genre, ageGroup) {
  const templates = [
    `Приключения в мире ${genre.toLowerCase()}`,
    `Тайна ${genre.toLowerCase()}: История героя`,
    `Увлекательный путь к знаниям: ${genre}`,
    `${genre} для самых умных`,
    `Волшебство ${genre.toLowerCase()}`,
    `Секреты мастерства: ${genre}`
  ];
  
  // Специфичные названия для подростков
  if (ageGroup === '12-18') {
    const teenTemplates = [
      `Моя история: ${genre}`,
      `Ты и ${genre.toLowerCase()}: Начало пути`,
      `Исповедь о ${genre.toLowerCase()}`,
      `Твой личный гид: ${genre}`
    ];
    return getRandomItem(teenTemplates);
  }
  
  return getRandomItem(templates);
}

function generateDescription(genre, hero, location, companion) {
  return `Погрузитесь в удивительную историю про ${hero.toLowerCase()}, который изучает ${genre.toLowerCase()} в месте, полном чудес — ${location.toLowerCase()}. Вместе с верным спутником (${companion.toLowerCase()}) главный герой преодолевает препятствия и узнает много нового. Эта книга создана специально для вашего ребенка с использованием передовых технологий ИИ.`;
}

const generatedBooks = [];
let idCounter = 1;

Object.keys(ageGroups).forEach(ageGroup => {
  const config = ageGroups[ageGroup];
  
  config.genres.forEach(genre => {
    // Генерируем по 3 книги на каждый жанр
    for (let i = 0; i < 3; i++) {
      const hero = getRandomItem(config.heroes);
      const location = getRandomItem(config.locations);
      const companion = getRandomItem(config.companions);
      const colorScheme = getRandomItem(colorSchemes);
      const format = getRandomItem(formats);
      
      const book = {
        id: idCounter++,
        title: generateTitle(genre, ageGroup),
        genre: genre,
        ageGroup: ageGroup,
        description: generateDescription(genre, hero, location, companion),
        heroType: hero,
        companionType: companion,
        location: location,
        colorScheme: colorScheme.name,
        colors: {
          primary: colorScheme.primary,
          secondary: colorScheme.secondary
        },
        format: format,
        pages: Math.floor(Math.random() * 20) + 10, // 10-30 страниц
        price: Math.floor(Math.random() * 2000) + 990, // Цена от 990 до 2990
        coverImage: `/covers/book-${idCounter}.jpg`, // Заглушка для изображения
        isBestseller: Math.random() > 0.7, // 30% шанс быть бестселлером
        createdAt: new Date().toISOString()
      };
      
      generatedBooks.push(book);
    }
  });
});

// Сортировка: сначала бестселлеры, потом новые
generatedBooks.sort((a, b) => {
  if (a.isBestseller === b.isBestseller) {
    return b.id - a.id;
  }
  return a.isBestseller ? -1 : 1;
});

// Создание директории и сохранение файла
const outputDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'generatedBooks.json');
fs.writeFileSync(outputPath, JSON.stringify(generatedBooks, null, 2));

console.log(`✅ Успешно сгенерировано ${generatedBooks.length} книг!`);
console.log(`📁 Файл сохранен: ${outputPath}`);
console.log(`\n📊 Статистика:`);
console.log(`   - Возрастная группа 0-7 лет: ${generatedBooks.filter(b => b.ageGroup === '0-7').length} книг`);
console.log(`   - Возрастная группа 7-12 лет: ${generatedBooks.filter(b => b.ageGroup === '7-12').length} книг`);
console.log(`   - Возрастная группа 12-18 лет: ${generatedBooks.filter(b => b.ageGroup === '12-18').length} книг`);
console.log(`   - Всего жанров: ${new Set(generatedBooks.map(b => b.genre)).size}`);
