
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Dashboard static data
export const initialTableData = [
  { id: 1, customer: "John Doe", amount: "$299.00", date: "2025-09-01", status: "Completed" },
  { id: 2, customer: "Jane Smith", amount: "$199.00", date: "2025-09-02", status: "Pending" },
  { id: 3, customer: "Bob Johnson", amount: "$499.00", date: "2025-09-03", status: "Completed" },
  { id: 4, customer: "Alice Brown", amount: "$99.00", date: "2025-09-04", status: "Cancelled" },
  { id: 5, customer: "Eve White", amount: "$150.00", date: "2025-09-05", status: "Completed" },
  { id: 6, customer: "Sam Green", amount: "$220.00", date: "2025-09-06", status: "Pending" },
  { id: 7, customer: "Lily Blue", amount: "$320.00", date: "2025-09-07", status: "Completed" },
  { id: 8, customer: "Mike Red", amount: "$180.00", date: "2025-09-08", status: "Completed" },
];

export const cardData = [
  { title: "Total Revenue", value: "$45,231", icon: "DollarSign", change: "+20.1%" },
  { title: "Users", value: "2,350", icon: "Users", change: "+180" },
  { title: "Sales", value: "1,242", icon: "ShoppingCart", change: "+19" },
  { title: "Active Now", value: "573", icon: "Activity", change: "+201" },
];

export const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Sales',
    data: [65, 59, 80, 81, 56, 55],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};

export const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Users',
    data: [28, 48, 40, 19, 86, 27],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

export const pieData = {
  labels: ['Direct', 'Social', 'Referral'],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  }]
};
