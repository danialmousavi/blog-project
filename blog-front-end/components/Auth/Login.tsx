"use client";

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FiUser, FiLock } from "react-icons/fi";
import { LoginvalidationSchema } from "@/services/schemas/authSchema";
import { AuthLogin } from "@/services/AuthService";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

type LoginFormValues = {
  username: string;
  password: string;
};

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

export default function LoginPage() {
  const context=useContext(AuthContext);
  const handleSubmit = async (values: LoginFormValues,{ setSubmitting }: any,) => {
    try {
      console.log(values);
      const result=await AuthLogin(values);
      console.log("Login result",result);
      
      if (result.success) {
        // Login successful
        toast.success(result.message);
        context.login(result.data.user);
      } else {
        // Login failed
        toast.error(result.message);
      }
    } finally {
      setSubmitting(false);
    }
  };
  //context
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur shadow-2xl p-8 border border-gray-100">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          خوش آمدید 👋
        </h1>
        <p className="text-center text-gray-500 mb-8">
          وارد حساب کاربری خود شوید
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginvalidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Username */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  نام کاربری
                </label>
                <div className="relative">
                  <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Field
                    name="username"
                    type="text"
                    placeholder="username"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-12
                      py-3
                      focus:bg-white
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      transition
                    "
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  رمز عبور
                </label>
                <div className="relative">
                  <FiLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Field
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-12
                      py-3
                      focus:bg-white
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      transition
                    "
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  py-3
                  rounded-xl
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-700
                  hover:to-blue-800
                  transition
                  shadow-lg
                  hover:shadow-xl
                  disabled:opacity-60
                "
              >
                {isSubmitting ? "در حال ورود..." : "ورود"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Register Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          حساب کاربری ندارید؟{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </main>
  );
}
