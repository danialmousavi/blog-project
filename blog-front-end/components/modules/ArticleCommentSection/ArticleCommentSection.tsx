import React from 'react'

export default function ArticleCommentSection() {
  return (
    <>
          <section className="mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">نظرات کاربران</h3>

        {/* Add Comment */}
        <div className="bg-white border rounded-2xl p-6 mb-10 shadow-lg hover:shadow-xl transition-all duration-300">
          <textarea
            placeholder="نظر خود را بنویسید..."
            className="w-full min-h-[120px] border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition">
            ارسال نظر
          </button>
        </div>

        {/* Comment List */}
        <div className="space-y-6">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="bg-white border rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">نام کاربر</span>
                <span className="text-sm text-gray-500">۳ روز پیش</span>
              </div>

              <p className="text-gray-700 leading-relaxed">
                این یک متن تستی برای کامنت کاربران است.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
