import { FiUsers, FiFileText, FiHeart } from 'react-icons/fi'

type Stat = {
  id: number
  label: string
  value: string
  icon: React.ReactNode
}

const stats: Stat[] = [
  {
    id: 1,
    label: 'کاربران',
    value: '12,540+',
    icon: <FiUsers />,
  },
  {
    id: 2,
    label: 'مقالات',
    value: '320+',
    icon: <FiFileText />,
  },
  {
    id: 3,
    label: 'لایک‌ها',
    value: '48,900+',
    icon: <FiHeart />,
  },
]

export default function StatsBar() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-10 relative z-10">
      <div
        className="
          grid grid-cols-1 sm:grid-cols-3
          rounded-2xl
          bg-white
          border border-gray-200
          shadow-sm
          overflow-hidden
        "
      >
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="
              flex items-center gap-4
              px-6 py-6
              justify-center
              sm:justify-start
            "
          >
            <span className="text-2xl text-blue-600">
              {stat.icon}
            </span>

            <div>
              <div className="text-xl md:text-2xl font-bold text-gray-800">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
