import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate('/profile')
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа. Проверьте данные.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-brown text-center mb-8">Вход</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center mb-6">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-brown font-semibold mb-2">Email</label>
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
            <label className="block text-brown font-semibold mb-2">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border-2 border-mint rounded-lg focus:outline-none focus:border-gold"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="text-gold" />
              <span className="text-brown text-sm">Запомнить меня</span>
            </label>
            <Link to="/forgot-password" className="text-raspberry hover:text-gold text-sm">
              Забыли пароль?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-brown text-cream py-3 rounded-lg font-semibold hover:bg-gold hover:text-brown transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="text-center text-brown mt-6">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-raspberry hover:text-gold font-semibold">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
}
