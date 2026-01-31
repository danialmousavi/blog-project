import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "نام کاربری حداقل ۳ کاراکتر")
    .required("نام کاربری الزامی است"),
  email: Yup.string()
    .email("ایمیل معتبر نیست")
    .required("ایمیل الزامی است"),
  password: Yup.string()
    .min(6, "رمز عبور حداقل ۶ کاراکتر")
    .required("رمز عبور الزامی است"),
});

export const LoginvalidationSchema = Yup.object({
  username: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string()
    .min(6, "رمز عبور حداقل ۶ کاراکتر باشد")
    .required("رمز عبور الزامی است"),
});