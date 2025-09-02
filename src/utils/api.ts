import { User, UsersResponse } from "./users";


const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUsers(
  page: number = 1,
  limit: number = 5,
  search: string = ""
): Promise<UsersResponse> {
  const response = await fetch(`${API_BASE_URL}/users`);
  let users: User[] = await response.json();

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    users = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = users.slice(startIndex, endIndex);

  return {
    users: paginatedUsers,
    total: users.length,
    skip: startIndex,
    limit,
  };
}

export async function getUser(id: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}
