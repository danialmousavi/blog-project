import * as Yup from "yup";

export const CategorySchema = Yup.object({
  title: Yup.string().required("عنوان الزامی است"),
  description: Yup.string()
    .required(" توضیحات الزامی است"),
});