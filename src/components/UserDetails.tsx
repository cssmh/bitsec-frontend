import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Building,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/utils/users";

interface UserDetailsProps {
  user: User;
}

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-16 w-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
          <AvatarFallback className="text-xl">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Contact Information
          </h3>

          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-white">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
              <p className="text-gray-900 dark:text-white">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Website
              </p>
              <p className="text-gray-900 dark:text-white">{user.website}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Address & Company
          </h3>

          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Address
              </p>
              <p className="text-gray-900 dark:text-white">
                {user.address.street}, {user.address.suite}
                <br />
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Company
              </p>
              <p className="text-gray-900 dark:text-white">
                {user.company.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.company.catchPhrase}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Additional Information
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Business:</span> {user.company.bs}
        </p>
      </motion.div>
    </motion.div>
  );
}
