import { ArticleType } from '@/types/Article'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
type RelatedArticlesProps={
  relatedArticles:ArticleType[]
}
export default function RelatedArticles({relatedArticles}:RelatedArticlesProps) {
  return (
   <>
         <section className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">مقالات مرتبط</h3>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.length > 0 ? (
            relatedArticles.map((item) => (
              <Link
                key={item.id}
                href={`/blogs/${item.id}`}
                className="bg-white border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                    alt="related"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h4 className="font-semibold text-blue-600 line-clamp-2 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.content}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <section className="mt-16">
              {/* ===== Empty State ===== */}
              <div className="flex flex-col items-center justify-center gap-4 bg-white border border-dashed rounded-2xl py-14 text-center">
                <div className="text-5xl">📭</div>

                <h4 className="text-lg font-semibold text-gray-800">
                  مقاله مرتبطی پیدا نشد
                </h4>

                <p className="text-sm text-gray-500 max-w-sm">
                  فعلاً مقاله مرتبطی برای این موضوع وجود ندارد. بعداً دوباره سر
                  بزن 🙂
                </p>
              </div>
            </section>
          )}
        </div>
      </section>

   </>
  )
}
