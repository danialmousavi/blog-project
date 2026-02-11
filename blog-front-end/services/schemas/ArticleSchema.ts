import * as Yup from "yup";

export const CreateArticleSchema = Yup.object({
  title: Yup.string().required("عنوان مقاله الزامی است"),
  content: Yup.string().required("محتوای مقاله الزامی است"),
  categoryId: Yup.string().required("دسته‌بندی را انتخاب کنید"),
  image: Yup.mixed().required("تصویر مقاله الزامی است"),
});

export const EditArticleSchema = Yup.object({
  title: Yup.string()
    .min(3, "عنوان حداقل ۳ کاراکتر باشد")
    .required("عنوان الزامی است"),

  content: Yup.string()
    .min(10, "محتوا خیلی کوتاه است")
    .required("محتوا الزامی است"),

  categoryId: Yup.string().required("دسته‌بندی الزامی است"),

  image: Yup.mixed().nullable(), // ❗ required نیست
});
