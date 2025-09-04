import { Input, Button } from "@/components/ui";
import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 left-64 right-0 h-16 bg-background border-b flex items-center justify-between px-6 z-10">
      <h1 className="font-bold text-lg">Dashboard</h1>
      <div className="flex items-center gap-4">
        <Input placeholder="Search..." className="w-48" />
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <img src="/avatar.png" alt="User" className="w-8 h-8 rounded-full" />
        </Button>
      </div>
    </header>
  );
}
