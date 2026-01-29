import { ArticleType } from "@/types/Article"

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