"use client"
import React from 'react'
import {
  FiEdit,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import { UserType } from '@/types/Users';
type UserTableProps={
    users: UserType[]
}
export default function UserTable({users}:UserTableProps) {
  return (
   <>
         <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-blue-50">
            <tr className="text-sm text-blue-700">
              <th className="px-6 py-4 font-semibold">نام</th>
              <th className="px-6 py-4 font-semibold">ایمیل</th>
              <th className="px-6 py-4 font-semibold">نقش</th>
              <th className="px-6 py-4 font-semibold text-center">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`text-sm transition ${
                  index !== users.length - 1
                    ? "border-b border-blue-50"
                    : ""
                } hover:bg-blue-50/50`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.username}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      title="مشاهده جزییات"
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-100 transition"
                    >
                      <FiEye size={18} />
                    </button>

                    <button
                      title="ویرایش"
                      className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-100 transition"
                    >
                      <FiEdit size={18} />
                    </button>

                    <button
                      title="حذف"
                      className="rounded-lg p-2 text-red-600 hover:bg-red-100 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
   </>
  )
}
