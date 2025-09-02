import DarkModeProvider from "./DarkModeProvider";

export default function Header() {
  return (
    <div className="flex justify-between">
      <h1 className="text-xl md:text-2xl font-bold">User Management</h1>
      <DarkModeProvider />
    </div>
  );
}