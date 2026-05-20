import { Package, Clock, CheckCircle, Truck } from 'lucide-react'

export default function OrdersPage() {
  const orders = []

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-brown mb-8">Мои заказы</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-brown mb-4">У вас пока нет заказов</p>
          <a href="/catalog" className="inline-block bg-brown text-cream px-6 py-3 rounded-lg hover:bg-gold hover:text-brown transition-colors">
            Перейти в каталог
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">Заказ #{order.id}</p>
                  <p className="text-brown font-semibold">{order.date}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  order.status === 'completed' ? 'bg-green-100 text-green-700' :
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {order.status === 'completed' ? 'Выполнен' : 
                   order.status === 'processing' ? 'В обработке' : 'Новый'}
                </span>
              </div>
              <div className="border-t pt-4">
                <p className="text-brown">{order.items} товаров</p>
                <p className="text-gold font-bold text-xl">{order.total} ₽</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
