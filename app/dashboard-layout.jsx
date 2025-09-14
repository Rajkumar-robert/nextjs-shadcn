"use client";
import { useState } from 'react';
import { Bell, Menu, ChevronLeft, Home, FileBarChart2, BarChart2, FileText, BellRing } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ModeToggle } from '@/components/ModeToggle';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function DashboardLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
  <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex md:flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <span className="text-xl font-bold">Side Navbar</span>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="md:hidden">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/" className="flex items-center gap-3 p-2 rounded hover:bg-sidebar-accent/60 transition-colors">
            <Home className="w-5 h-5" />
            Home
          </Link>
          <Link href="/overview" className="flex items-center gap-3 p-2 rounded hover:bg-sidebar-accent/60 transition-colors">
            <FileBarChart2 className="w-5 h-5" />
            Overview
          </Link>
          <Link href="/analytics" className="flex items-center gap-3 p-2 rounded hover:bg-sidebar-accent/60 transition-colors">
            <BarChart2 className="w-5 h-5" />
            Analytics
          </Link>
          <Link href="/reports" className="flex items-center gap-3 p-2 rounded hover:bg-sidebar-accent/60 transition-colors">
            <FileText className="w-5 h-5" />
            Reports
          </Link>
          <Link href="/notifications" className="flex items-center gap-3 p-2 rounded hover:bg-sidebar-accent/60 transition-colors">
            <BellRing className="w-5 h-5" />
            Notifications
          </Link>
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-2">
            <Avatar className="ring-2 ring-sidebar-ring bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 shadow-md">
              <AvatarImage src="/avatar.png" alt="User" className="bg-white/80" />
              <AvatarFallback className="text-white font-bold bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400">JD</AvatarFallback>
            </Avatar>
            <span>John Doe</span>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background text-foreground">
        {/* Top Navbar */}
        <header className="flex items-center justify-between p-4 bg-background text-foreground border-b border-border">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">{title || 'Dashboard'}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search..." className="w-64 bg-background text-foreground border-border" />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background text-foreground">
          {children}
        </main>
      </div>
    </div>
  );
}
