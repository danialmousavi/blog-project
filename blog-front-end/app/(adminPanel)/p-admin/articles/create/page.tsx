import CreateArticleForm from "@/components/AdminPanel/Article/CreateArticleForm";
import { GetCategories } from "@/services/CategoriesService";
import React from "react";

export default async function page() {
  const categories = await GetCategories();

  return (
    <>
      <div className="w-full md:px-20 flex justify-center">
        <CreateArticleForm categories={categories} />
      </div>
    </>
  );
}
