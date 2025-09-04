import { Avatar, Button } from "@/components/ui";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-background border-r flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 p-4">
          <Avatar src="/avatar.png" alt="User" />
          <div>
            <div className="font-semibold">John Doe</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        </div>
        <nav className="mt-6 flex flex-col gap-2 px-4">
          <Button variant="ghost" className="justify-start">Overview</Button>
          <Button variant="ghost" className="justify-start">Analytics</Button>
          <Button variant="ghost" className="justify-start">Reports</Button>
          <Button variant="ghost" className="justify-start">Notifications</Button>
        </nav>
      </div>
      <div className="p-4">
        <Button variant="outline" size="sm">Collapse</Button>
      </div>
    </aside>
  );
}
