import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, BookOpen, Heart } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <nav className="bg-gradient-to-r from-mint to-peach shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-brown">
            <BookOpen className="w-8 h-8" />
            <span>AI Books</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/catalog" className="text-brown hover:text-gold transition-colors">
              Каталог
            </Link>
            <Link to="/book-builder" className="text-brown hover:text-gold transition-colors">
              Создать книгу
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/orders" className="text-brown hover:text-gold transition-colors">
                  Заказы
                </Link>
                <Link to="/drafts" className="text-brown hover:text-gold transition-colors">
                  Черновики
                </Link>
                <Link to="/support" className="text-brown hover:text-gold transition-colors">
                  Поддержка
                </Link>
              </>
            )}
            <Link to="/cart" className="relative text-brown hover:text-gold transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-raspberry text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-brown hover:text-gold transition-colors">
                  <User className="w-6 h-6" />
                  <span>{user?.name || 'Профиль'}</span>
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-raspberry hover:text-gold transition-colors">
                    Админка
                  </Link>
                )}
                <button onClick={logout} className="text-brown hover:text-raspberry transition-colors">
                  Выход
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-brown hover:text-gold transition-colors">
                  Вход
                </Link>
                <Link to="/register" className="bg-brown text-cream px-4 py-2 rounded-lg hover:bg-gold hover:text-brown transition-colors">
                  Регистрация
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brown">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link to="/catalog" className="block text-brown hover:text-gold transition-colors">
              Каталог
            </Link>
            <Link to="/book-builder" className="block text-brown hover:text-gold transition-colors">
              Создать книгу
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/orders" className="block text-brown hover:text-gold transition-colors">
                  Заказы
                </Link>
                <Link to="/drafts" className="block text-brown hover:text-gold transition-colors">
                  Черновики
                </Link>
                <Link to="/support" className="block text-brown hover:text-gold transition-colors">
                  Поддержка
                </Link>
              </>
            )}
            <Link to="/cart" className="block text-brown hover:text-gold transition-colors">
              Корзина
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block text-brown hover:text-gold transition-colors">
                  Профиль
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="block text-raspberry hover:text-gold transition-colors">
                    Админка
                  </Link>
                )}
                <button onClick={logout} className="block text-brown hover:text-raspberry transition-colors">
                  Выход
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-brown hover:text-gold transition-colors">
                  Вход
                </Link>
                <Link to="/register" className="block bg-brown text-cream px-4 py-2 rounded-lg hover:bg-gold hover:text-brown transition-colors">
                  Регистрация
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
