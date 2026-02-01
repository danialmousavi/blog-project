"use server"
import { ArticleType } from "@/types/Article"
import { Articlecomment } from "@/types/Comment";

export const GetArticles=async()=>{
    const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`,{
        cache:"no-store"
    });
    if(!response.ok){
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    const data:ArticleType[]=await response.json();
    return data
}
export const GetArticleById=async(id:string)=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`, {
        next: { revalidate: 60*60*6 },// Revalidate every 6 hours
    });
    
    if (!response.ok) {
        return false
        // throw new Error(`Failed to fetch article with id ${id}: ${response.statusText}`);
    }
    const data:ArticleType=await response.json();
    return data;
}
export const GetArticleComments=async(articleId:string)=>{
    const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleId}/comments`,{
        cache:"no-store"
    });
    if(!response.ok){
        throw new Error(`Failed to fetch comments for article ${articleId}: ${response.statusText}`);
    }
    const data:Articlecomment[]=await response.json();
    return data;
}

