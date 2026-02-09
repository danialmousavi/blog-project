import * as Yup from "yup";

export const CreateArticleSchema = Yup.object({
  title: Yup.string().required("عنوان مقاله الزامی است"),
  content: Yup.string().required("محتوای مقاله الزامی است"),
  categoryId: Yup.string().required("دسته‌بندی را انتخاب کنید"),
  image: Yup.mixed().required("تصویر مقاله الزامی است"),
});