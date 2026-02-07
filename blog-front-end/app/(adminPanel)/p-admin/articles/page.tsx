import ArticleTable from '@/components/AdminPanel/Article/ArticleTable'
import { GetArticles } from '@/services/ArticlesSerivece'
import { GetCategories } from '@/services/CategoriesService'
import Link from 'next/link'
import React from 'react'
import { FiPlus, FiUsers } from 'react-icons/fi'

export default async function page() {
    const articles=await GetArticles()
      const categories = await GetCategories();
    
  return (
   <>
       <div className="p-6 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-blue-700">
          <FiUsers size={26} />
          <h1 className="text-2xl font-bold">مدیریت مقالات</h1>
        </div>

        <Link
          href="/p-admin/users/create"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
        >
          <FiPlus />
          ایجاد مقاله
        </Link>
      </div>

      {/* {users.success &&users.data.length>0 ? (<UserTable users={users.data}/>):(
        <p className="text-center text-gray-500">کاربری یافت نشد.</p>
      )} */}
      <ArticleTable articles={articles} categories={categories}/>
    </div>
   </>
  )
}
