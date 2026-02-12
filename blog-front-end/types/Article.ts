export type ArticleType = {
  id: string;
  title: string;
  content: string;
  image: string;
  categoryId: string;
  author: string;
  createdAt: string;
};
export type UpdateArticleType = {
  title: string;
  content: string;
  image: string;
  categoryId: string;
  author: string;
};
