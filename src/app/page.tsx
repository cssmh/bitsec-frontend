import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import UserTable from "@/components/UserTable";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Header />
          <SearchBar />
          <UserTable />
        </div>
      </div>
    </div>
  );
}
