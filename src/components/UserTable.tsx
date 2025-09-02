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
  }
];

export default function UserTable() {
  return (
    <div className="w-full mt-6 overflow-hidden border rounded-md">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr className="text-sm text-gray-600 border-b">
            <th className="p-4 text-left font-semibold">NAME</th>
            <th className="p-4 text-left font-semibold">EMAIL</th>
            <th className="p-4 text-left font-semibold">PHONE</th>
            <th className="p-4 text-left font-semibold">COMPANY</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index} className="border-b even:bg-gray-50">
              <td className="p-4">
                <div className="font-medium text-gray-800">{user.name}</div>
                <div className="text-sm text-gray-500">{user.username}</div>
              </td>
              <td className="p-4 text-gray-600">{user.email}</td>
              <td className="p-4 text-gray-600">{user.phone}</td>
              <td className="p-4 text-gray-600">{user.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
