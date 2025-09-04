import { User } from "@prisma/client";
import { User2Icon } from "lucide-react";
import Image from "next/image";

const UsersTable = ({ users }: { users: User[] }) => {
  return (
    <main className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white">All Users</h1>

      <div className="overflow-x-auto rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <table className="min-w-[700px] w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-sm text-zinc-500 dark:text-zinc-400 border-b">
              <th className="px-6 py-2">User</th>
              <th className="px-6 py-2">User ID</th>
              <th className="px-6 py-2">Role</th>
              <th className="px-6 py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.role === "USER")
              .map((user) => (
                <tr
                  key={user.id}
                  className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                >
                  {/* USER CELL */}
                  <td className="px-6 py-4 flex items-center gap-4 whitespace-nowrap">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={45}
                        height={45}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-[45px] h-[45px] bg-zinc-600 text-white rounded-full flex items-center justify-center">
                        <User2Icon size={22} />
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-zinc-800 dark:text-white">{user.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
                    </div>
                  </td>

                  {/* ID */}
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                    {user.id.slice(0, 6)}...
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4">
                    <span className="bg-zinc-800 text-white text-xs px-3 py-1 rounded-full">
                      {user.role}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UsersTable;
