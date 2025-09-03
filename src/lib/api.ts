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
  loading: boolean;
  limit: number;
  setLimit: (limit: number) => void;
}

export async function getUsers(
  page: number = 1,
  limit: number = 5,
  searchTerm: string = ""
): Promise<UsersResponse> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    let allUsers: User[] = await response.json();

    // Filter users by name or email
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      allUsers = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = allUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      total: allUsers.length,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}
