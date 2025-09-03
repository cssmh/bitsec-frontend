import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/api";
import ThreeBackground from "@/components/ThreeBackground";
import { ThreeDCard } from "@/components/ThreeDCard";
import Link from "next/link";

interface UserParams {
  params: { id: string };
}

export default async function UserDetails({ params }: UserParams) {
  const user = await getUser(params?.id);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <ThreeBackground />

      {/* Centered container with max width */}
      <div className="w-full max-w-5xl mx-auto">
        <Link
          href="/"
          className="text-sm mb-3 text-blue-400 hover:underline inline-block"
        >
          Back to Users
        </Link>
        <ThreeDCard>
          <Card className="shadow-xl border-0 relative overflow-hidden">
            {/* Gradient background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10 -z-10" />

            <CardHeader className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="bg-gradient-to-r from-blue-600 to-purple-600 w-14 h-14 sm:w-16 sm:h-16">
                    <AvatarFallback className="text-white font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                      {user.name}
                    </CardTitle>
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                      @{user.username}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 grid gap-6 sm:grid-cols-2 mt-4">
              {/* Contact Information */}
              <div className="p-6 rounded-xl space-y-3 border border-blue-100 dark:border-blue-800/30">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="text-xl">📧</span>
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> {user.phone}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Website:</span>{" "}
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      className="text-blue-500 hover:underline transition-colors"
                    >
                      {user.website}
                    </a>
                  </p>
                </div>
              </div>

              {/* Company Information */}
              <div className="p-6 rounded-xl space-y-3 border border-green-100 dark:border-green-800/30">
                <h3 className="font-semibold text-lg items-center gap-2">
                  <span className="text-xl">🏢</span>
                  Company
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span>{" "}
                    {user.company.name}
                  </p>
                  <p className="text-sm italic">
                    <span className="font-medium">Catch Phrase:</span>{" "}
                    {user.company.catchPhrase}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Business:</span>{" "}
                    {user.company.bs}
                  </p>
                </div>
              </div>

              {/* Address Information */}
              <div className="p-6 rounded-xl sm:col-span-2 space-y-3 border border-green-100 dark:border-green-800/30">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="text-xl">📍</span>
                  Address
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    {user.address.suite}, {user.address.street},{" "}
                    {user.address.city}, {user.address.zipcode}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Geo Coordinates:</span>{" "}
                    {user.address.geo.lat}, {user.address.geo.lng}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ThreeDCard>
      </div>
    </div>
  );
}
