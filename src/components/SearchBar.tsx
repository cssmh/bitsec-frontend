export default function SearchBar() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
      <input
        type="text"
        placeholder="Search by name or email..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Search
      </button>
    </div>
  );
}
