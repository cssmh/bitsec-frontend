"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserTable from "@/components/UserTable";
import { getUsers } from "@/utils/api";
import { User } from "@/utils/users";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(currentPage, usersPerPage, searchTerm);
        setUsers(data.users);
        setTotalUsers(data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(fetchUsers, 300);
    return () => clearTimeout(timer);
  }, [currentPage, searchTerm]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-4"
        >
        </motion.header>
        {/* Users Table */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: usersPerPage }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-md" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <UserTable
              users={users}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              limit={limit}
              setLimit={setLimit}
            />
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
