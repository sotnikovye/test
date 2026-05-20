import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, BookOpen } from 'lucide-react'
import generatedBooks from '../data/generatedBooks.json'

export default function CatalogPage() {
  const [selectedAge, setSelectedAge] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [books, setBooks] = useState([])

  useEffect(() => {
    // Загружаем сгенерированные книги
    setBooks(generatedBooks)
  }, [])

  const companions = ['Динозавры', 'Принцессы', 'Супергерои', 'Единороги', 'Инопланетяне', 'Животные', 'Феи', 'Пираты']

  const filteredBooks = books.filter(book => {
    const matchesAge = selectedAge === 'all' || book.ageGroup === selectedAge
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre
    return matchesAge && matchesSearch && matchesGenre
  })

  const allGenres = [...new Set(books.map(b => b.genre))]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-4 break-words">Каталог книг</h1>
        <p className="text-lg text-brown">Выберите идеальную книгу для вашего ребенка</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
            />
          </div>

          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
          >
            <option value="all">Все возрасты</option>
            <option value="0-7">0-7 лет</option>
            <option value="7-12">7-12 лет</option>
            <option value="12-18">12-18 лет</option>
          </select>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
          >
            <option value="all">Все жанры</option>
            {allGenres.map((g, i) => <option key={i} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-mint to-peach flex items-center justify-center text-6xl">
              <BookOpen className="w-20 h-20 text-white" />
            </div>
            <div className="p-6">
              <span className="inline-block bg-raspberry text-white px-3 py-1 rounded-full text-sm mb-2">
                {book.ageGroup} лет
              </span>
              <h3 className="text-xl font-bold text-brown mb-2 break-words">{book.title}</h3>
              <p className="text-gray-600 mb-2">Жанр: {book.genre}</p>
              <p className="text-gray-600 mb-2 text-sm">Герой: {book.heroType}</p>
              <p className="text-gray-600 mb-4 text-sm">Место: {book.location}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gold">{book.price} ₽</span>
                <Link
                  to={`/book-builder?bookId=${book.id}`}
                  className="bg-brown text-cream px-4 py-2 rounded-lg hover:bg-gold hover:text-brown transition-colors text-sm md:text-base"
                >
                  Создать
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">Книги не найдены</p>
          <p className="text-gray-400">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      {/* Companions Section */}
      <div className="bg-gradient-to-r from-cream to-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-brown mb-6 text-center">Сопутствующие герои</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {companions.map((companion, index) => (
            <span key={index} className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer text-sm md:text-base">
              {companion}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
