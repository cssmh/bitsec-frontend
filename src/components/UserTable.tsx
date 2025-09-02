const userData = [
  {
    name: "Leanne Graham",
    username: "@Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    company: "Romaguera-Crona",
  },
  {
    name: "Leanne Graham",
    username: "@Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    company: "Romaguera-Crona",
  },
  {
    name: "Leanne Graham",
    username: "@Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    company: "Romaguera-Crona",
  },
];

export default function UserTable() {
  return (
    <div className="w-full mt-6 overflow-x-auto rounded-md">
      <table className="w-full table-auto">
        <thead className="bg-gray-50">
          <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-left">Company</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userData.map((user, index) => (
            <tr
              key={index}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
                <div className="text-sm text-gray-500">@{user.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.company}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
