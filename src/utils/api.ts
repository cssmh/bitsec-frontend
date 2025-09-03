export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
}

export interface UserTableProps {
  users: User[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

export async function getUsers(
  page = 1,
  limit = 8,
  search = ""
): Promise<{ users: User[]; total: number }> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const all: User[] = await res.json();

  const q = search.trim().toLowerCase();
  const filtered = q
    ? all.filter((u) => {
        const name = u.name?.toLowerCase() ?? "";
        const email = u.email?.toLowerCase() ?? "";
        return name.includes(q) || email.includes(q);
      })
    : all;

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return { users: paginated, total };
}

export async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`) 
  //   {
  //   cache: "no-store",
  // };
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}
