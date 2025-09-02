import Link from "next/link";

async function getUser(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export default async function UserDetails({ params }) {
  const user = await getUser(params.id);

  return (
    <main className="p-6 max-w-9/12 mx-auto">
      <Link
        href="/users"
        className="text-sm text-blue-400 hover:underline mb-4 inline-block"
      >
        &larr; Back to Users
      </Link>

      <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
      <p className="text-gray-300 mb-4">@{user.username}</p>

      <div className="grid gap-4 sm:grid-cols-2 ">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Contact</h2>
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

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Company</h2>
          <p>Name: {user.company.name}</p>
          <p>Catch Phrase: {user.company.catchPhrase}</p>
          <p>Business: {user.company.bs}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg sm:col-span-2">
          <h2 className="font-semibold mb-2">Address</h2>
          <p>
            {user.address.suite}, {user.address.street}, {user.address.city},{" "}
            {user.address.zipcode}
          </p>
          <p className="text-gray-400 text-sm">
            Geo: {user.address.geo.lat}, {user.address.geo.lng}
          </p>
        </div>
      </div>
    </main>
  );
}
