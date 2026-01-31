import ArticleCommentSection from "@/components/modules/ArticleCommentSection/ArticleCommentSection";
import { formatDate } from "@/components/modules/FormData/FormDate";
import RelatedArticles from "@/components/modules/RelatedArticles/RelatedArticles";
import SingleArticleAside from "@/components/modules/SingleArticleAside/SingleArticleAside";
import { GetArticleById, GetArticles } from "@/services/ArticlesSerivece";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
type SingleArticlePageProps = {
  params: {
    id: string;
  };
};
export default async function SingleArticlePage({
  params,
}: SingleArticlePageProps) {
  const { id } = await params;
  const article = await GetArticleById(id);
  console.log("article",article);
  
  if(!article){
    return notFound();
  }
  const articles = await GetArticles();
  const relatedArticles = articles.filter(
    (item) => item.categoryId === article.categoryId && item.id !== article.id,
  );
  console.log("relatedArticles", relatedArticles);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* ===== Title ===== */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        {article.title}
      </h1>

      {/* ===== Main Layout ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ===== Article Content ===== */}
        <article className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
          <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${article.image}`}
              alt="article"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-800">
            <p>{article.content}</p>
          </div>
        </article>

        <SingleArticleAside articles={articles}/>
      </div>

        <RelatedArticles relatedArticles={relatedArticles} />
        <ArticleCommentSection id={article.id} />
    </main>
  );
}
