import { Link } from 'react-router-dom'
import { BookOpen, Sparkles, Users, Palette, Music, Video } from 'lucide-react'

export default function HomePage() {
  const ageGroups = [
    {
      title: '0-7 лет',
      description: 'Развивающие сказки для самых маленьких',
      genres: ['Алфавит', 'Цифры', 'Учимся читать', 'Гигиена', 'Животные', 'Прописи', 'Фигуры', 'Цвета'],
      icon: '🧸',
      color: 'from-mint to-peach'
    },
    {
      title: '7-12 лет',
      description: 'Познавательные книги для школьников',
      genres: ['Машины', 'Мода', 'Шахматы', 'Опыты', 'Космос', 'ПДД', 'Рукоделие', 'Бренды'],
      icon: '🎒',
      color: 'from-raspberry to-pistachio'
    },
    {
      title: '12-18 лет',
      description: 'Персональные истории для подростков',
      genres: ['Любовь', 'Дружба', 'Подарки', 'Рецепты', 'Языки', 'IT навыки', 'Знакомство со звездой'],
      icon: '🌟',
      color: 'from-cream to-gold'
    }
  ]

  const features = [
    { icon: <Sparkles className="w-12 h-12" />, title: 'ИИ Генерация', description: 'Уникальные истории с вашим ребенком в главной роли' },
    { icon: <Users className="w-12 h-12" />, title: 'Персонализация', description: 'Добавьте фото семьи, друзей и любимых героев' },
    { icon: <Palette className="w-12 h-12" />, title: '3 Цветовые схемы', description: 'Мятный/Персиковый, Сливочный/Золотой, Малиновый/Фисташковый' },
    { icon: <Music className="w-12 h-12" />, title: 'Музыка', description: 'Добавьте любимую песню в PDF формат' },
    { icon: <Video className="w-12 h-12" />, title: 'ИИ Поздравления', description: 'Анимированные мультики с вашим лицом' },
    { icon: <BookOpen className="w-12 h-12" />, title: '2 Формата', description: 'PDF версия или полноценная печатная книга' }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-16 bg-gradient-to-r from-mint via-peach to-cream rounded-2xl sm:rounded-3xl shadow-xl px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brown mb-4 sm:mb-6 leading-tight">
          Персонализированные книги с ИИ
        </h1>
        <p className="text-base sm:text-xl text-brown mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
          Создайте уникальную развивающую сказку, где ваш ребенок — главный герой! 
          Выберите жанр, добавьте фотографии и получите волшебную книгу за несколько минут.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none mx-auto px-2">
          <Link to="/catalog" className="w-full sm:w-auto bg-brown text-cream px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gold hover:text-brown transition-all transform hover:scale-105 shadow-lg whitespace-nowrap">
            Выбрать книгу
          </Link>
          <Link to="/book-builder" className="w-full sm:w-auto bg-gradient-to-r from-raspberry to-pistachio text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap">
            Создать свою книгу
          </Link>
        </div>
      </section>

      {/* Age Groups */}
      <section>
        <h2 className="text-3xl font-bold text-center text-brown mb-8">Выберите возрастную группу</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ageGroups.map((group, index) => (
            <div key={index} className={`bg-gradient-to-br ${group.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="text-6xl mb-4">{group.icon}</div>
              <h3 className="text-2xl font-bold text-brown mb-2">{group.title}</h3>
              <p className="text-brown mb-4">{group.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {group.genres.slice(0, 4).map((genre, i) => (
                  <span key={i} className="bg-white/70 text-brown px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              <Link to={`/catalog?age=${group.title}`} className="block text-center bg-brown text-cream py-2 rounded-lg hover:bg-gold hover:text-brown transition-colors">
                Смотреть все жанры
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold text-center text-brown mb-8">Почему выбирают нас</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="text-gold flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-brown mb-2">{feature.title}</h3>
              <p className="text-brown">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-gradient-to-r from-brown to-gold rounded-3xl shadow-xl text-cream">
        <h2 className="text-3xl font-bold mb-4">Готовы создать волшебную книгу?</h2>
        <p className="mb-8">Начните прямо сейчас и подарите ребенку незабываемые эмоции!</p>
        <Link to="/register" className="bg-cream text-brown px-8 py-4 rounded-full text-lg font-semibold hover:bg-white transition-all transform hover:scale-105 shadow-lg inline-block">
          Зарегистрироваться бесплатно
        </Link>
      </section>
    </div>
  )
}
