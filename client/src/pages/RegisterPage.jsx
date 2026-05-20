import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    if (!formData.agreeTerms) {
      setError('Необходимо принять условия использования')
      return
    }

    setLoading(true)

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
      navigate('/profile')
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-brown text-center mb-8">Регистрация</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center mb-6">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-brown font-semibold mb-2">Имя *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
                placeholder="Ваше имя"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-brown font-semibold mb-2">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
                placeholder="example@mail.ru"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-brown font-semibold mb-2">Телефон *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
                placeholder="+7 (999) 000-00-00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-brown font-semibold mb-2">Пароль *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
                placeholder="Минимум 6 символов"
                required
                minLength={6}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Минимум 6 символов</p>
          </div>

          <div>
            <label className="block text-brown font-semibold mb-2">Подтвердите пароль *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
                placeholder="Повторите пароль"
                required
              />
            </div>
          </div>

          <div>
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="text-gold mt-1"
              />
              <span className="text-brown text-sm">
                Я согласен с{' '}
                <Link to="/terms" className="text-raspberry hover:text-gold underline">
                  условиями использования
                </Link>{' '}
                и{' '}
                <Link to="/privacy" className="text-raspberry hover:text-gold underline">
                  политикой конфиденциальности
                </Link>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-brown text-cream py-3 rounded-lg font-semibold hover:bg-gold hover:text-brown transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="text-center text-brown mt-6">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-raspberry hover:text-gold font-semibold">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
