// components/UserTable.tsx
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
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserTableProps } from "@/lib/api";
import { ModeToggle } from "./ModeToggle";

export default function UserTable({
  users,
  searchTerm,
  setSearchTerm,
  limit,
  setLimit,
}: UserTableProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card p-6 rounded-md mb-6"
      >
        <div className="flex justify-between">
        <h1 className="text-xl md:text-2xl font-bold mb-5">Users</h1>
          <ModeToggle />
        </div>
        {/* Search + Limit */}
        <div className="flex justify-between items-center mb-5">
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 text-sm"
          />
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Show:
            </span>
            <Select
              value={limit.toString()}
              onValueChange={(val) => setLimit(Number(val))}
            >
              <SelectTrigger className="w-20 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#171717] rounded-lg shadow-md">
            <p className="text-muted-foreground dark:text-gray-400">
              No users found.
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
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
              <TableBody className="bg-white dark:bg-[#171717]">
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
        )}
      </motion.div>
    </div>
  );
}
