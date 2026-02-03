"use client";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { UserType } from "@/types/Users";
import { changeUserRole, DeleteUser } from "@/services/Users";
import { toast } from "react-toastify";

type UserTableProps = {
  users: UserType[];
};

type LoadingState = {
  userId: string;
  action: "delete" | "role";
} | null;

export default function UserTable({ users }: UserTableProps) {
  const [loading, setLoading] = useState<LoadingState>(null);

  const handleDeleteUser = async (userId: string) => {
    setLoading({ userId, action: "delete" });

    const result = await DeleteUser(userId);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setLoading(null);
  };

  const handleChangeUserRole = async (userId: string, role: string) => {
    setLoading({ userId, action: "role" });

    const result = await changeUserRole({ userId, role });

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setLoading(null);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
      <table className="w-full text-right">
        <thead className="bg-blue-50">
          <tr className="text-sm text-blue-700">
            <th className="px-6 py-4 font-semibold">نام</th>
            <th className="px-6 py-4 font-semibold">ایمیل</th>
            <th className="px-6 py-4 font-semibold">نقش</th>
            <th className="px-6 py-4 font-semibold text-center">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => {
            const isRowLoading = loading?.userId === user.id;

            return (
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
                    {/* Change Role */}
                    <button
                      disabled={isRowLoading}
                      onClick={() =>
                        handleChangeUserRole(user.id, user.role)
                      }
                      className="rounded-lg p-2 transition
                      disabled:opacity-50 disabled:cursor-not-allowed
                      text-emerald-600 hover:bg-emerald-100"
                    >
                      {loading?.userId === user.id &&
                      loading.action === "role" ? (
                        <span className="block h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                      ) : (
                        <FiEdit size={18} />
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      disabled={isRowLoading}
                      onClick={() => handleDeleteUser(user.id)}
                      className="rounded-lg p-2 transition
                      disabled:opacity-50 disabled:cursor-not-allowed
                      text-red-600 hover:bg-red-100"
                    >
                      {loading?.userId === user.id &&
                      loading.action === "delete" ? (
                        <span className="block h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                      ) : (
                        <FiTrash2 size={18} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
