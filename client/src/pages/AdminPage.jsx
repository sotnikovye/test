import { Users, Package, DollarSign, MessageSquare } from 'lucide-react'

export default function AdminPage() {
  const stats = [
    { icon: <Users className="w-8 h-8" />, label: 'Пользователей', value: '0' },
    { icon: <Package className="w-8 h-8" />, label: 'Заказов', value: '0' },
    { icon: <DollarSign className="w-8 h-8" />, label: 'Выручка', value: '0 ₽' },
    { icon: <MessageSquare className="w-8 h-8" />, label: 'Обращений', value: '0' }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-brown mb-8">Админ-панель</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gradient-to-br from-brown to-gold text-cream rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              {stat.icon}
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-brown mb-4">Последние заказы</h2>
          <p className="text-gray-500 text-center py-8">Нет новых заказов</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-brown mb-4">Обращения в поддержку</h2>
          <p className="text-gray-500 text-center py-8">Нет обращений</p>
        </div>
      </div>
    </div>
  )
}
