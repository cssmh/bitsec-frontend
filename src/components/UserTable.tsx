"use client";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/utils/users";
import { useRouter } from "next/navigation";

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const router = useRouter();

  if (users.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p className="text-muted-foreground dark:text-gray-400">
          No users found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-700">
          <TableRow>
            <TableHead className="text-gray-700 dark:text-gray-300">
              NAME
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              EMAIL
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              PHONE
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              COMPANY
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white dark:bg-gray-800">
          {users.map((user, index) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => router.push(`/users/${user.id}`)}
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      @{user.username}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-900 dark:text-white">
                {user.email}
              </TableCell>
              <TableCell className="text-gray-900 dark:text-white">
                {user.phone}
              </TableCell>
              <TableCell className="text-gray-900 dark:text-white">
                {user.company.name}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
