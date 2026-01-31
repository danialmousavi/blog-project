"use server"
import { ArticleType } from "@/types/Article";

export const GetCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    {
      next: {
        revalidate: 60 * 60 * 24, // 24 hours
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  const data: CategoryType[] = await response.json();
  return data;
};
export const GetCategoryArticles= async (catId:string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${catId}/articles`,
    {
      next: {
        revalidate: 60 * 60 * 6, // 6 hours
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch category articles: ${response.statusText}`);
  }
  const data: ArticleType[] = await response.json();
  return data;
}