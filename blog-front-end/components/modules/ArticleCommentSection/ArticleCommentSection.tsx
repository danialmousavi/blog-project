import { GetArticleComments } from '@/services/ArticlesSerivece'
import { Articlecomment } from '@/types/Comment'
import React from 'react'

type ArticleCommentSectionProps = {
  id: string
}

export default async function ArticleCommentSection({
  id,
}: ArticleCommentSectionProps) {
  let comments: Articlecomment[] = []

  try {
    const res = await GetArticleComments(id)
    if (Array.isArray(res)) {
      comments = res
    }
  } catch (error) {
    console.error('Error loading comments:', error)
  }

  return (
    <section className="mt-20">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        نظرات کاربران
      </h3>

      {/* ===== Add Comment (UI Only) ===== */}
      <div className="bg-white border rounded-2xl p-6 mb-10 shadow-lg transition hover:shadow-xl">
        <textarea
          placeholder="نظر خود را بنویسید..."
          className="w-full min-h-[120px] border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition">
          ارسال نظر
        </button>
      </div>

      {/* ===== Comment List ===== */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((item) => (
            <div
              key={item?.id ?? Math.random()}
              className="bg-white border rounded-2xl p-5 shadow-lg transition hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">
                  {item?.author || 'کاربر ناشناس'}
                </span>
                <span className="text-sm text-gray-500">
                  {/* تاریخ رو بعداً خودت وصل کن */}
                  چند لحظه پیش
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {item?.content || 'متنی برای نمایش وجود ندارد.'}
              </p>
            </div>
          ))
        ) : (
          /* ===== Empty State ===== */
          <div className="flex flex-col items-center justify-center gap-3 bg-white border border-dashed rounded-2xl py-10 text-center">
            <div className="text-4xl">💬</div>
            <p className="text-gray-600 font-medium">
              هنوز نظری ثبت نشده است
            </p>
            <span className="text-sm text-gray-500">
              اولین نفری باشید که نظر می‌دهد
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
