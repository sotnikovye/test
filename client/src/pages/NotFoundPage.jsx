import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold text-gold mb-4">404</h1>
      <p className="text-2xl text-brown mb-8">Страница не найдена</p>
      <Link to="/" className="flex items-center bg-brown text-cream px-6 py-3 rounded-lg hover:bg-gold hover:text-brown transition-colors">
        <Home className="w-5 h-5 mr-2" />
        На главную
      </Link>
    </div>
  )
}
