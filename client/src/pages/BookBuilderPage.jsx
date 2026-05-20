import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Upload, Music, Video, Palette, Users, MapPin, CheckCircle } from 'lucide-react'

export default function BookBuilderPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [bookData, setBookData] = useState({
    // Main hero info
    childName: '',
    childGender: 'boy',
    childPhoto: null,
    childAge: '',
    
    // Book settings
    genre: '',
    ageGroup: '0-7',
    colorScheme: 'mint-peach',
    pageCount: 20,
    format: 'pdf',
    
    // Additional options
    audioBook: false,
    customMusic: null,
    aiGreeting: false,
    aiCartoon: false,
    
    // Characters
    companions: [],
    secondHero: '',
    familyMembers: [],
    
    // Location
    location: 'forest',
    
    // Contact info
    email: '',
    phone: '',
    address: ''
  })

  const genres = {
    '0-7': ['Алфавит', 'Цифры', 'Учимся читать', 'Гигиена', 'Животные', 'Прописи', 'Фигуры', 'Цвета'],
    '7-12': ['Машины', 'Мода', 'Шахматы', 'Опыты', 'Космос', 'ПДД', 'Вязание', 'Оригами'],
    '12-18': ['Любовь', 'Друзья', 'Поздравления', 'Рецепты', 'Языки', 'IT навыки']
  }

  const locations = [
    'Лес', 'Сад', 'Улица', 'Цирк', 'Парк', 'Озеро', 'Река', 'Комната', 
    'Двор', 'Школа', 'Зоопарк', 'Замок', 'Море', 'Космос', 'Город', 'Больница'
  ]

  const companions = ['Динозавры', 'Принцессы', 'Супергерои', 'Единороги', 'Инопланетяне', 'Животные', 'Феи', 'Пираты']

  const colorSchemes = [
    { id: 'mint-peach', name: 'Мятный & Персиковый', colors: 'from-mint to-peach' },
    { id: 'cream-gold', name: 'Сливочный & Золотой', colors: 'from-cream to-gold' },
    { id: 'raspberry-pistachio', name: 'Малиновый & Фисташковый', colors: 'from-raspberry to-pistachio' }
  ]

  const updateBookData = (field, value) => {
    setBookData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field, file) => {
    // In real app, upload to server
    updateBookData(field, file)
  }

  const addToCart = () => {
    // Save to cart and redirect
    navigate('/cart')
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-brown mb-4">📖 Основная информация</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-brown font-semibold mb-2">Имя ребенка *</label>
          <input
            type="text"
            value={bookData.childName}
            onChange={(e) => updateBookData('childName', e.target.value)}
            className="w-full px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
            placeholder="Как зовут главного героя?"
          />
        </div>

        <div>
          <label className="block text-brown font-semibold mb-2">Возраст *</label>
          <input
            type="number"
            value={bookData.childAge}
            onChange={(e) => updateBookData('childAge', e.target.value)}
            className="w-full px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
            placeholder="Лет"
            min="0"
            max="18"
          />
        </div>

        <div>
          <label className="block text-brown font-semibold mb-2">Пол *</label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={bookData.childGender === 'boy'}
                onChange={() => updateBookData('childGender', 'boy')}
                className="text-gold"
              />
              <span className="text-brown">Мальчик</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={bookData.childGender === 'girl'}
                onChange={() => updateBookData('childGender', 'girl')}
                className="text-gold"
              />
              <span className="text-brown">Девочка</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-brown font-semibold mb-2">Фотография ребенка</label>
          <div className="border-2 border-dashed border-mint rounded-lg p-6 text-center hover:border-gold transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-brown">Загрузить фото</p>
            <p className="text-sm text-gray-500">JPG, PNG до 5MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload('childPhoto', e.target.files[0])}
              className="hidden"
              id="child-photo"
            />
            <label htmlFor="child-photo" className="cursor-pointer"></label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-brown mb-4">🎨 Настройки книги</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-brown font-semibold mb-2">Возрастная группа *</label>
          <select
            value={bookData.ageGroup}
            onChange={(e) => updateBookData('ageGroup', e.target.value)}
            className="w-full px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
          >
            <option value="0-7">0-7 лет</option>
            <option value="7-12">7-12 лет</option>
            <option value="12-18">12-18 лет</option>
          </select>
        </div>

        <div>
          <label className="block text-brown font-semibold mb-2">Жанр *</label>
          <select
            value={bookData.genre}
            onChange={(e) => updateBookData('genre', e.target.value)}
            className="w-full px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
          >
            <option value="">Выберите жанр</option>
            {genres[bookData.ageGroup].map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-brown font-semibold mb-2">Цветовая схема *</label>
          <div className="grid grid-cols-3 gap-4">
            {colorSchemes.map(scheme => (
              <div
                key={scheme.id}
                onClick={() => updateBookData('colorScheme', scheme.id)}
                className={`cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
                  bookData.colorScheme === scheme.id ? 'ring-4 ring-gold' : ''
                }`}
              >
                <div className={`h-20 bg-gradient-to-r ${scheme.colors}`}></div>
                <p className="text-center text-brown text-sm py-2">{scheme.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-brown font-semibold mb-2">Количество страниц</label>
          <select
            value={bookData.pageCount}
            onChange={(e) => updateBookData('pageCount', Number(e.target.value))}
            className="w-full px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
          >
            <option value={10}>10 страниц</option>
            <option value={20}>20 страниц</option>
            <option value={30}>30 страниц</option>
            <option value={50}>50 страниц</option>
          </select>
        </div>

        <div>
          <label className="block text-brown font-semibold mb-2">Формат *</label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={bookData.format === 'pdf'}
                onChange={() => updateBookData('format', 'pdf')}
                className="text-gold"
              />
              <span className="text-brown">PDF</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={bookData.format === 'print'}
                onChange={() => updateBookData('format', 'print')}
                className="text-gold"
              />
              <span className="text-brown">Печатная книга</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-brown font-semibold mb-2">Место действия</label>
          <select
            value={bookData.location}
            onChange={(e) => updateBookData('location', e.target.value)}
            className="w-full px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-brown mb-4">✨ Дополнительные опции</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-mint to-peach rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Music className="w-8 h-8 text-brown" />
            <h3 className="text-xl font-bold text-brown">Аудиокнига</h3>
          </div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={bookData.audioBook}
              onChange={(e) => updateBookData('audioBook', e.target.checked)}
              className="w-5 h-5 text-gold"
            />
            <span className="text-brown">Добавить аудиоверсию (+500 ₽)</span>
          </label>
        </div>

        <div className="bg-gradient-to-br from-cream to-gold rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Music className="w-8 h-8 text-brown" />
            <h3 className="text-xl font-bold text-brown">Любимая песня</h3>
          </div>
          <div className="border-2 border-dashed border-brown rounded-lg p-4 text-center hover:border-gold transition-colors cursor-pointer">
            <Upload className="w-6 h-6 mx-auto text-brown mb-2" />
            <p className="text-brown text-sm">Загрузить MP3</p>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileUpload('customMusic', e.target.files[0])}
              className="hidden"
              id="music-file"
            />
            <label htmlFor="music-file" className="cursor-pointer"></label>
          </div>
        </div>

        <div className="bg-gradient-to-br from-raspberry to-pistachio rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Video className="w-8 h-8" />
            <h3 className="text-xl font-bold">ИИ Поздравление</h3>
          </div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={bookData.aiGreeting}
              onChange={(e) => updateBookData('aiGreeting', e.target.checked)}
              className="w-5 h-5"
            />
            <span>Добавить видео-поздравление от ИИ (+1000 ₽)</span>
          </label>
        </div>

        <div className="bg-gradient-to-br from-brown to-gold rounded-xl p-6 text-cream">
          <div className="flex items-center space-x-3 mb-4">
            <Video className="w-8 h-8" />
            <h3 className="text-xl font-bold">ИИ Мультик</h3>
          </div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={bookData.aiCartoon}
              onChange={(e) => updateBookData('aiCartoon', e.target.checked)}
              className="w-5 h-5"
            />
            <span>Создать мультик с лицом ребенка (+1500 ₽)</span>
          </label>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-brown mb-4">Сопутствующие герои</h3>
        <div className="flex flex-wrap gap-3">
          {companions.map(companion => (
            <button
              key={companion}
              onClick={() => {
                const newCompanions = bookData.companions.includes(companion)
                  ? bookData.companions.filter(c => c !== companion)
                  : [...bookData.companions, companion]
                updateBookData('companions', newCompanions)
              }}
              className={`px-4 py-2 rounded-full transition-colors ${
                bookData.companions.includes(companion)
                  ? 'bg-brown text-cream'
                  : 'bg-white text-brown border-2 border-mint hover:border-gold'
              }`}
            >
              {companion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-brown mb-4">📦 Контакты и доставка</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-brown font-semibold mb-2">Email *</label>
          <input
            type="email"
            value={bookData.email}
            onChange={(e) => updateBookData('email', e.target.value)}
            className="w-full px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
            placeholder="example@mail.ru"
          />
        </div>

        <div>
          <label className="block text-brown font-semibold mb-2">Телефон *</label>
          <input
            type="tel"
            value={bookData.phone}
            onChange={(e) => updateBookData('phone', e.target.value)}
            className="w-full px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
            placeholder="+7 (999) 000-00-00"
          />
        </div>

        {bookData.format === 'print' && (
          <div className="md:col-span-2">
            <label className="block text-brown font-semibold mb-2">Адрес доставки *</label>
            <textarea
              value={bookData.address}
              onChange={(e) => updateBookData('address', e.target.value)}
              className="w-full px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
              rows="3"
              placeholder="Город, улица, дом, квартира"
            />
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-cream to-white rounded-2xl p-6 shadow-lg mt-8">
        <h3 className="text-2xl font-bold text-brown mb-4">📋 Итого</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-brown">Книга ({bookData.pageCount} стр.)</span>
            <span className="font-bold text-brown">990 ₽</span>
          </div>
          {bookData.audioBook && (
            <div className="flex justify-between">
              <span className="text-brown">Аудиокнига</span>
              <span className="font-bold text-brown">+500 ₽</span>
            </div>
          )}
          {bookData.aiGreeting && (
            <div className="flex justify-between">
              <span className="text-brown">ИИ Поздравление</span>
              <span className="font-bold text-brown">+1000 ₽</span>
            </div>
          )}
          {bookData.aiCartoon && (
            <div className="flex justify-between">
              <span className="text-brown">ИИ Мультик</span>
              <span className="font-bold text-brown">+1500 ₽</span>
            </div>
          )}
          {bookData.format === 'print' && (
            <div className="flex justify-between">
              <span className="text-brown">Печать и доставка</span>
              <span className="font-bold text-brown">+800 ₽</span>
            </div>
          )}
          <div className="border-t-2 border-brown pt-4 mt-4 flex justify-between text-xl">
            <span className="font-bold text-brown">Итого:</span>
            <span className="font-bold text-gold">
              {(990 + (bookData.audioBook ? 500 : 0) + (bookData.aiGreeting ? 1000 : 0) + 
                (bookData.aiCartoon ? 1500 : 0) + (bookData.format === 'print' ? 800 : 0))} ₽
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-brown text-cream' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <CheckCircle className="w-6 h-6" /> : s}
              </div>
              {s < 4 && (
                <div className={`w-20 h-1 ${step > s ? 'bg-brown' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-brown">
          <span>Информация</span>
          <span>Настройки</span>
          <span>Опции</span>
          <span>Контакты</span>
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-semibold ${
              step === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-mint text-brown hover:bg-peach'
            }`}
          >
            Назад
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(Math.min(4, step + 1))}
              className="bg-brown text-cream px-6 py-3 rounded-lg font-semibold hover:bg-gold hover:text-brown transition-colors"
            >
              Далее
            </button>
          ) : (
            <button
              onClick={addToCart}
              className="bg-gradient-to-r from-raspberry to-pistachio text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
