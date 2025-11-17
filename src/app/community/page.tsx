import { Users, MessageCircle, TrendingUp, Star, Award, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'

// Dados mockados para demonstração
const featuredUsers = [
  { id: 1, name: 'GamerPro2024', avatar: '🎮', level: 50, cosmetics: 234 },
  { id: 2, name: 'FortniteMaster', avatar: '👑', level: 45, cosmetics: 189 },
  { id: 3, name: 'SkinCollector', avatar: '💎', level: 42, cosmetics: 156 },
]

const recentPosts = [
  {
    id: 1,
    author: 'GamerPro2024',
    avatar: '🎮',
    title: 'Melhor combo de skins desta temporada!',
    content: 'Acabei de descobrir a melhor combinação de skins...',
    likes: 124,
    comments: 23,
    time: '2h atrás',
  },
  {
    id: 2,
    author: 'FortniteMaster',
    avatar: '👑',
    title: 'Dicas para conseguir cosméticos raros',
    content: 'Compartilhando algumas estratégias que funcionaram para mim...',
    likes: 89,
    comments: 15,
    time: '5h atrás',
  },
  {
    id: 3,
    author: 'SkinCollector',
    avatar: '💎',
    title: 'Minha coleção completa de cosméticos épicos',
    content: 'Finalmente completei minha coleção! Vejam só...',
    likes: 256,
    comments: 42,
    time: '1d atrás',
  },
]

const trendingTopics = [
  { name: 'Novos Cosméticos', count: 342, icon: '✨' },
  { name: 'Dicas de Compra', count: 189, icon: '💡' },
  { name: 'Trocas', count: 156, icon: '🔄' },
  { name: 'Reviews', count: 98, icon: '⭐' },
]

export default function CommunityPage() {
  return (
    <div className="max-w-7xl px-4 py-12 mx-auto">
      {/* Header da Comunidade */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 mb-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full">
          <Users className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="mb-4 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Comunidade
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Conecte-se com outros colecionadores, compartilhe suas conquistas e descubra os melhores cosméticos
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Coluna Principal - Posts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Criar Post */}
          <div className="p-6 bg-gray-900/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 text-2xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                👤
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="O que você está pensando?"
                  className="w-full px-4 py-3 text-gray-100 placeholder-gray-500 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 transition-colors rounded-lg hover:bg-gray-800/50 hover:text-gray-200">
                  <MessageCircle className="w-4 h-4" />
                  Discussão
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 transition-colors rounded-lg hover:bg-gray-800/50 hover:text-gray-200">
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>
              </div>
              <button className="px-6 py-2 text-sm font-semibold text-white transition-all bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl">
                Publicar
              </button>
            </div>
          </div>

          {/* Posts Recentes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-200">Posts Recentes</h2>
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 bg-gray-900/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 text-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-200">{post.author}</h3>
                      <span className="text-xs text-gray-500">• {post.time}</span>
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {post.title}
                    </h4>
                    <p className="text-gray-400">{post.content}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-4 border-t border-gray-700/50">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 transition-colors rounded-lg hover:bg-gray-800/50 hover:text-red-400">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 transition-colors rounded-lg hover:bg-gray-800/50 hover:text-blue-400">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 transition-colors rounded-lg hover:bg-gray-800/50 hover:text-purple-400">
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Usuários */}
          <div className="p-6 bg-gray-900/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className="text-xl font-bold text-gray-200">Top Colecionadores</h3>
            </div>
            <div className="space-y-4">
              {featuredUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 transition-colors rounded-lg hover:bg-gray-800/50"
                >
                  <div className="flex items-center justify-center w-10 h-10 text-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-200">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      Nível {user.level} • {user.cosmetics} cosméticos
                    </p>
                  </div>
                  {index === 0 && (
                    <div className="px-2 py-1 text-xs font-bold text-yellow-400 bg-yellow-400/20 rounded">
                      #1
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tópicos em Alta */}
          <div className="p-6 bg-gray-900/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-bold text-gray-200">Tópicos em Alta</h3>
            </div>
            <div className="space-y-3">
              {trendingTopics.map((topic) => (
                <Link
                  key={topic.name}
                  href="#"
                  className="flex items-center justify-between p-3 transition-colors rounded-lg hover:bg-gray-800/50 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <span className="font-medium text-gray-300 group-hover:text-gray-200">
                      {topic.name}
                    </span>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold text-blue-400 bg-blue-400/20 rounded">
                    {topic.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Estatísticas */}
          <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl backdrop-blur-sm">
            <h3 className="mb-4 text-xl font-bold text-gray-200">Estatísticas da Comunidade</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Membros Ativos</span>
                <span className="text-xl font-bold text-blue-400">12.5K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Posts Hoje</span>
                <span className="text-xl font-bold text-purple-400">342</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Cosméticos Compartilhados</span>
                <span className="text-xl font-bold text-pink-400">8.9K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

