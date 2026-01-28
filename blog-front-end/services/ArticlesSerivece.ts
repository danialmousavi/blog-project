import { ArticleType } from "@/types/Article"

export const GetArticles=async ()=>{
    const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`)
    const data:ArticleType[]=await response.json()
    return data
}