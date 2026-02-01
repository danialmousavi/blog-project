type Articlecomment = {
  id: string;
  content: string;
  articleId: string;
  author: string;
  createdAt: string;
};
type CreateComment = {
  content:string,
  articleId:string
}
export type {Articlecomment,CreateComment};