import EditArticle from '@/components/AdminPanel/Article/EditArticle';
import { GetArticleById } from '@/services/ArticlesSerivece';
import { GetCategories } from '@/services/CategoriesService';
type EditArticlePageProps={
    params:{
        id:string
    }
}
export default async function EditArticlePage({params}:EditArticlePageProps) {
    const {id}=await params;   
     
    // const article=await GetArticleById(id)
    // console.log("article",article);
    const categories=await GetCategories();
  return (
    <>
    <EditArticle articleId={id} categories={categories} />
    </>
  )
}
