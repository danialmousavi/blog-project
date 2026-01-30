import Image from 'next/image'
import { formatDate } from '../FormData/FormDate'
import { ArticleType } from '@/types/Article'
import Link from 'next/link'
type SingleArticleAsideProps={
  articles:ArticleType[]
}
export default function SingleArticleAside({articles}:SingleArticleAsideProps) {
  return (
    <>
            <aside className="lg:col-span-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            مقالات پیشنهادی
          </h3>

          {articles
            .reverse()
            .slice(0, 3)
            .map((item) => (
              <Link
                href={`/blogs/${item.id}`}
                key={item.id}
                className="flex gap-4 p-4 bg-white border rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                    alt="suggested"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </Link>
            ))}
        </aside>
    </>
  )
}
