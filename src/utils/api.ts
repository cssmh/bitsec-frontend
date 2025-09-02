import { User } from "./users";

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
