import UserTable from "@/components/AdminPanel/User/UserTable";
import { GetUsers } from "@/services/Users";
import Link from "next/link";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus,
  FiUsers,
} from "react-icons/fi";

export default async function UsersPage() {
  const users = await GetUsers();
  return (
    <div className="p-6 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-blue-700">
          <FiUsers size={26} />
          <h1 className="text-2xl font-bold">مدیریت کاربران</h1>
        </div>

        <Link
          href="/p-admin/users/create"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
        >
          <FiPlus />
          ایجاد کاربر
        </Link>
      </div>

      {/* ===== Table Card ===== */}
      {users.success &&users.data.length>0 ? (<UserTable users={users.data}/>):(
        <p className="text-center text-gray-500">کاربری یافت نشد.</p>
      )}
      {/* <UserTable users={users}/> */}
    </div>
  );
}
