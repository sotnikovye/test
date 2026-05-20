import { FileText, Edit2, Trash2 } from 'lucide-react'

export default function DraftsPage() {
  const drafts = []

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-brown mb-8">Черновики</h1>

      {drafts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <FileText className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-brown mb-4">Нет сохраненных черновиков</p>
          <a href="/book-builder" className="inline-block bg-brown text-cream px-6 py-3 rounded-lg hover:bg-gold hover:text-brown transition-colors">
            Создать книгу
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {drafts.map(draft => (
            <div key={draft.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-brown">{draft.title}</h3>
                <div className="flex space-x-2">
                  <button className="text-raspberry hover:text-gold"><Edit2 className="w-4 h-4" /></button>
                  <button className="text-raspberry hover:text-gold"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-4">Сохранено: {draft.date}</p>
              <a href={`/book-builder?draft=${draft.id}`} className="block text-center bg-mint text-brown py-2 rounded-lg hover:bg-peach transition-colors">
                Продолжить
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
