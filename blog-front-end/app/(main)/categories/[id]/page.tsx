import BlogsClient from '@/components/modules/BlogsClient/BlogsClient';
import { GetCategoryArticles } from '@/services/CategoriesService';
import { ArticleType } from '@/types/Article';
import React from 'react'
type Props = {
  params:{
    id:string
  }
}
export default async function page({params}:Props) {
    const {id}=await params;
  let posts:ArticleType[] = [];

  try {
    posts = await GetCategoryArticles(id);
  } catch (e) {
    console.error(e);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          مقالات دسته بندی {id}
        </h1>
        <p className="mt-4 text-gray-500">
            همه مقالات مربوط به این دسته بندی
        </p>
      </div>

      <BlogsClient posts={posts} />
    </section>
  );
}
