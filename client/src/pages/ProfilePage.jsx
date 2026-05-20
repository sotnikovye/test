import { useAuth } from '../context/AuthContext'
import { User, Mail, Phone, MapPin, Edit2 } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-brown mb-8">Личный кабинет</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-mint to-peach rounded-full mx-auto flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-brown" />
              </div>
              <h2 className="text-xl font-bold text-brown">{user?.name || 'Пользователь'}</h2>
              <p className="text-gray-500 text-sm">{user?.role === 'admin' ? 'Администратор' : 'Клиент'}</p>
            </div>

            <nav className="space-y-2">
              <a href="#profile" className="block px-4 py-2 rounded-lg bg-mint text-brown font-semibold">Профиль</a>
              <a href="/orders" className="block px-4 py-2 rounded-lg hover:bg-mint text-brown">Заказы</a>
              <a href="/drafts" className="block px-4 py-2 rounded-lg hover:bg-mint text-brown">Черновики</a>
              <a href="/support" className="block px-4 py-2 rounded-lg hover:bg-mint text-brown">Поддержка</a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-brown">Личные данные</h3>
              <button className="flex items-center text-raspberry hover:text-gold">
                <Edit2 className="w-4 h-4 mr-2" />
                Редактировать
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Имя</p>
                  <p className="text-brown font-semibold">{user?.name || 'Не указано'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-brown font-semibold">{user?.email || 'Не указано'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Телефон</p>
                  <p className="text-brown font-semibold">{user?.phone || '+7 (___) ___-__-__'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Адрес</p>
                  <p className="text-brown font-semibold">Не указан</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cream to-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-brown mb-4">Статистика</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gold">0</p>
                <p className="text-brown text-sm">Заказов</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gold">0</p>
                <p className="text-brown text-sm">Черновиков</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gold">0</p>
                <p className="text-brown text-sm">Сертификатов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
