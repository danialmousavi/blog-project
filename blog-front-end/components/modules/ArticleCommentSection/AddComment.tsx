"use client";
import AuthContext from "@/context/AuthContext";
import { UserCreateComment } from "@/services/Comments";
import { Formik } from "formik";
import { useContext } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const commentSchema = Yup.object({
  content: Yup.string()
    .required("متن نظر الزامی است")
    .min(3, "نظر باید حداقل ۳ کاراکتر باشد"),
  articleId: Yup.string().required(),
});

export default function AddComment({ id }: { id: string }) {
    const context=useContext(AuthContext);
  return (
    <Formik
      initialValues={{
        content: "",
        articleId: id,
      }}
      validationSchema={commentSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          // TODO: لاجیک ارسال کامنت
            const result=await UserCreateComment(values);
            if(result.success){
                toast.success(result.message);
            }else{
                toast.error(result.message);
            }
            
          // resetForm()
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              name="content"
              placeholder="نظر خود را بنویسید..."
              className={`w-full min-h-[120px] rounded-xl border p-4 transition
            focus:outline-none focus:ring-2
            ${
              errors.content && touched.content
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-500"
            }`}
              value={values.content}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            {errors.content && touched.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>
        {context.isAuthenticated?(
            
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center justify-center gap-2 rounded-xl px-6 py-2 text-white transition
          ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                در حال ارسال...
              </>
            ) : (
              "ارسال نظر"
            )}
          </button>
        ):(
            <button className="bg-gray-400 text-white px-6 py-2 rounded-xl cursor-not-allowed" disabled>
            برای ارسال نظر باید وارد شوید
            </button>
        )}
        </form>
      )}
    </Formik>
  );
}
