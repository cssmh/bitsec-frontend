import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/utils/users";

interface UserParams {
  params: { id: string };
}

async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export default async function UserDetails({ params }: UserParams) {
  const user = await getUser(params.id);

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <Link
        href="/"
        className="text-sm text-blue-400 hover:underline inline-block"
      >
        &larr; Back to Users
      </Link>

      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="bg-blue-800">
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-gray-400">@{user.username}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 mt-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-1">
            <h3 className="font-semibold text-lg">Contact</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>
              Website:{" "}
              <a
                href={`https://${user.website}`}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                {user.website}
              </a>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-1">
            <h3 className="font-semibold text-lg">Company</h3>
            <p>Name: {user.company.name}</p>
            <p>Catch Phrase: {user.company.catchPhrase}</p>
            <p>Business: {user.company.bs}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg sm:col-span-2 space-y-1">
            <h3 className="font-semibold text-lg">Address</h3>
            <p>
              {user.address.suite}, {user.address.street}, {user.address.city},{" "}
              {user.address.zipcode}
            </p>
            <p className="text-gray-400 text-sm">
              Geo: {user.address.geo.lat}, {user.address.geo.lng}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
