import CategoryTable from "@/components/AdminPanel/Category/CategoriesTable";
import UserTable from "@/components/AdminPanel/User/UserTable";
import { GetCategories } from "@/services/CategoriesService";
import Link from "next/link";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus,
  FiUsers,
} from "react-icons/fi";
export default async function UsersPage() {
  const categories = await GetCategories();
//   console.log(categories);
  
  return (
    <div className="p-6 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-blue-700">
          <FiUsers size={26} />
          <h1 className="text-2xl font-bold">مدیریت دسته بندی ها</h1>
        </div>

        <Link
          href="/p-admin/categories/create"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
        >
          <FiPlus />
          ایجاد دسته بندی
        </Link>
      </div>

      {/* ===== Table Card ===== */}
      {categories.length>0 ? (<>
        <CategoryTable categories={categories}/>
      </>):(
        <p className="text-center text-gray-500">دسته بندی ای یافت نشد</p>
      )}
      {/* <UserTable users={users}/> */}
    </div>
  );
}
