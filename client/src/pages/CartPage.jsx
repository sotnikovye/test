import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react'

export default function CartPage() {
  const [cartItems] = useState([
    { id: 1, title: 'Приключения в волшебном лесу', childName: 'Александр', format: 'pdf', pageCount: 20, audioBook: true, aiGreeting: false, price: 1490, quantity: 1 }
  ])

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-brown mb-8">Корзина</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-xl text-brown mb-4">Ваша корзина пуста</p>
          <Link to="/catalog" className="inline-block bg-brown text-cream px-6 py-3 rounded-lg hover:bg-gold hover:text-brown transition-colors">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-brown">{item.title}</h3>
                    <p className="text-gray-600">Для: {item.childName}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-mint text-brown px-3 py-1 rounded-full text-sm">{item.format.toUpperCase()}</span>
                      <span className="bg-peach text-brown px-3 py-1 rounded-full text-sm">{item.pageCount} стр.</span>
                      {item.audioBook && <span className="bg-raspberry text-white px-3 py-1 rounded-full text-sm">Аудио</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gold">{item.price} ₽</p>
                    <button className="text-raspberry hover:text-gold mt-2 flex items-center">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="bg-gradient-to-r from-cream to-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-brown mb-4">Итого</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-brown">
                  <span>Товары ({cartItems.length})</span>
                  <span>{total} ₽</span>
                </div>
                <div className="flex justify-between text-brown">
                  <span>Доставка</span>
                  <span className="text-green-600">Бесплатно</span>
                </div>
                <div className="border-t-2 border-brown pt-4 mt-4 flex justify-between text-xl font-bold">
                  <span className="text-brown">К оплате:</span>
                  <span className="text-gold">{total} ₽</span>
                </div>
              </div>

              <button className="w-full bg-brown text-cream py-3 rounded-lg font-semibold hover:bg-gold hover:text-brown transition-colors flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5 mr-2" />
                Оформить заказ
              </button>

              <Link to="/catalog" className="block text-center text-brown hover:text-raspberry">
                Продолжить покупки
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
