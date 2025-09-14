"use client"

import { useState } from 'react';
import { DollarSign, Users, ShoppingCart, Activity, Calendar, CheckCircle, ChevronUp, ChevronDown, User as UserIcon, DollarSign as DollarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar.jsx";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import DashboardLayout from "./dashboard-layout";
import { initialTableData, cardData, barData, lineData, pieData } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

export default function Home() {
  const [dropdownSort, setDropdownSort] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);
  const [tableData, setTableData] = useState(initialTableData);
  const handleDropdownSort = (type) => {
    setDropdownSort(type);
    if (type === "amount-high") {
      setSortConfig({ key: "amount", direction: "desc" });
    } else if (type === "amount-low") {
      setSortConfig({ key: "amount", direction: "asc" });
    } else if (type === "status-completed") {
      setSortConfig({ key: "status", direction: "desc" });
    } else if (type === "status-pending") {
      setSortConfig({ key: "status", direction: "asc" });
    } else if (type === "status-cancelled") {
      setSortConfig({ key: "status", direction: "asc" });
    }
    setCurrentPage(1);
  };
  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  const handleRefresh = () => {
    setTableLoading(true);
    setTimeout(() => {
      setDateFilter(null);
      setSortConfig({ key: "id", direction: "asc" });
      setDropdownSort("");
      setCurrentPage(1);
      setTableData(initialTableData);
      setTableLoading(false);
    }, 1000);
  };
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const sortedTableData = [...tableData].sort((a, b) => {
    const { key, direction } = sortConfig;
    let aValue = a[key];
    let bValue = b[key];
    if (key === 'amount') {
      aValue = parseFloat(aValue.replace(/[$,]/g, ''));
      bValue = parseFloat(bValue.replace(/[$,]/g, ''));
    }
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
  const totalRows = sortedTableData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = sortedTableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
    setCurrentPage(1);
  };
  return (
    <DashboardLayout title="Dashboard">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
          <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cardData.map((card, index) => {
              const Icon = {
                DollarSign,
                Users,
                ShoppingCart,
                Activity
              }[card.icon];
              return (
                <Card key={index} className="bg-card text-card-foreground border-border">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">{card.change} from last month</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card text-card-foreground border-border">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={barData} options={{ maintainAspectRatio: false }} height={200} />
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground border-border">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <Line data={lineData} options={{ maintainAspectRatio: false }} height={200} />
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground border-border">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <Pie data={pieData} options={{ maintainAspectRatio: false }} height={200} />
              </CardContent>
            </Card>
          </div>
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <div className="flex flex-wrap gap-2 items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={dateFilter ? "outline" : "secondary"}
                        className="w-36 justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {dateFilter ? format(dateFilter, "yyyy-MM-dd") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <ShadcnCalendar
                        mode="single"
                        selected={dateFilter}
                        onSelect={setDateFilter}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" size="sm" onClick={handleRefresh}>
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    Download
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">Sort</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDropdownSort('amount-high')}>Amount: High to Low</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDropdownSort('amount-low')}>Amount: Low to High</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {showToast && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
                  Download started!
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('id')}>
                      <span className="inline-flex items-center gap-1">
                        ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />) : ''}
                      </span>
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('customer')}>
                      <span className="inline-flex items-center gap-1">
                        <UserIcon className="w-4 h-4 text-muted-foreground" />
                        Customer {sortConfig.key === 'customer' ? (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />) : ''}
                      </span>
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('amount')}>
                      <span className="inline-flex items-center gap-1">
                        <DollarIcon className="w-4 h-4 text-muted-foreground" />
                        Amount {sortConfig.key === 'amount' ? (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />) : ''}
                      </span>
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('date')}>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />) : ''}
                      </span>
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('status')}>
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-muted-foreground" />
                        Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />) : ''}
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    paginatedData
                      .filter(row => !dateFilter || row.date === format(dateFilter, "yyyy-MM-dd"))
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.customer}</TableCell>
                          <TableCell>{row.amount}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.status}</TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
              <div className="flex justify-end items-center gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Analytics content goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}