import { useState } from 'react'
import { MessageSquare, Send, HelpCircle } from 'lucide-react'

export default function SupportPage() {
  const [message, setMessage] = useState('')

  const faqs = [
    { q: 'Как заказать книгу?', a: 'Выберите книгу в каталоге, заполните форму конструктора и оформите заказ.' },
    { q: 'Сколько времени занимает создание?', a: 'PDF версия генерируется за 5-10 минут. Печатная книга доставляется за 3-7 дней.' },
    { q: 'Какие форматы доступны?', a: 'PDF для скачивания и печатная версия с доставкой.' },
    { q: 'Можно ли изменить заказ?', a: 'Да, в течение 1 часа после оформления через поддержку.' }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-brown mb-8">Поддержка</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-brown mb-4 flex items-center">
              <HelpCircle className="w-6 h-6 mr-2" />
              Частые вопросы
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b pb-4">
                  <p className="font-semibold text-brown mb-2">{faq.q}</p>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-r from-mint to-peach rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-brown mb-4 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2" />
              Написать в поддержку
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-brown font-semibold mb-2">Тема</label>
                <input type="text" className="w-full px-4 py-3 border-2 border-brown rounded-lg focus:outline-none focus:border-gold" placeholder="Опишите проблему" />
              </div>
              <div>
                <label className="block text-brown font-semibold mb-2">Сообщение</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 border-2 border-brown rounded-lg focus:outline-none focus:border-gold" rows="5" placeholder="Ваш вопрос..." />
              </div>
              <button type="submit" className="w-full bg-brown text-cream py-3 rounded-lg font-semibold hover:bg-gold hover:text-brown transition-colors flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" />
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
