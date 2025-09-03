"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "@/utils/users";
import { getUsers } from "@/utils/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import UserTable from "@/components/UserTable";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers(currentPage, limit, searchTerm);
        setUsers(data?.users);
        setTotalUsers(data.total);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timer);
  }, [currentPage, limit, searchTerm]);

  const totalPages = Math.ceil(totalUsers / limit);

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }).map((_, i) => (
      <PaginationItem key={i}>
        <PaginationLink
          isActive={currentPage === i + 1}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
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
            loading={loading}
            setLimit={setLimit}
          />
        </motion.div>

        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            />
            <PaginationContent>
              {renderPageNumbers()}
              {totalPages > 5 && <PaginationEllipsis />}
            </PaginationContent>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
            />
          </Pagination>
        )}
      </div>
    </div>
  );
}
