import CommentsTable from "@/components/AdminPanel/Comment/CommentsTable";
import { GetArticles } from "@/services/ArticlesSerivece";
import { GetAllComments } from "@/services/Comments";
import Link from "next/link";
import React from "react";
import { FiPlus, FiUsers } from "react-icons/fi";

export default async function page() {
  const comments = await GetAllComments();
  const articles=await GetArticles();
  console.log(articles);
  
  console.log(comments);
  return (
    <div className="p-6 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-blue-700">
          <FiUsers size={26} />
          <h1 className="text-2xl font-bold">مدیریت کامنت ها</h1>
        </div>
      </div>

      <CommentsTable comments={comments.data} articles={articles} />
    </div>
  );
}
