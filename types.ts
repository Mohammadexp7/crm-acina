export enum ProductStatus {
  Active = 'فعال',
  Pending = 'در انتظار',
}

export interface Product {
  id: number;
  name: string;
  image: string;
  type: string;
  brand: string;
  price: number;
  rate: number;
  status: ProductStatus;
}

export interface KpiData {
    title: string;
    value: string;
    trend: string;
    positiveTrend: boolean;
    icon: React.ComponentType<{ className?: string }>;
    iconBgColor: string;
}

export interface SalesAnalyticData {
  name: string;
  revenue: number;
  order: number;
}

export interface NewUserData {
    name: string;
    value: number;
    color: string;
}

export interface CustomerSatisfactionData {
    name: string;
    lastMonth: number;
    thisMonth: number;
}

export interface TrafficSourceData {
    name: string;
    value: number;
    color: string;
}

export interface TopPageData {
    id: number;
    path: string;
    views: number;
    uniqueVisitors: number;
    bounceRate: string;
}


// FIX: Add CampaignStatus enum to resolve import error in CampaignsTable.tsx
export enum CampaignStatus {
  Completed = 'تکمیل شده',
  InProgress = 'در حال انجام',
  Paused = 'متوقف شده',
}

// FIX: Add Campaign interface to resolve import error in CampaignsTable.tsx
export interface Campaign {
  id: number;
  name: string;
  startDate: string;
  status: CampaignStatus;
  roi: string;
}

// FIX: Add Activity interface to resolve import error in ActivityFeed.tsx
export interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  avatar: string;
}

export interface Notification {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

export interface Message {
  id: number;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

export interface RoadmapStep {
  stepTitle: string;
  stepDescription: string;
}

export enum OrderStatus {
  Processing = 'در حال پردازش',
  Shipped = 'ارسال شده',
  Delivered = 'تحویل داده شده',
  Cancelled = 'لغو شده',
}

export interface Order {
  id: string;
  customerName: string;
  avatar: string;
  date: string;
  total: number;
  status: OrderStatus;
}

export enum ProductStockStatus {
    InStock = "موجود",
    OutOfStock = "ناموجود"
}

export interface FullProduct {
    id: number;
    name: string;
    image: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    status: ProductStockStatus;
}

export interface Customer {
    id: number;
    name: string;
    avatar: string;
    email: string;
    phone: string;
    totalSpent: number;
    joinDate: string;
}

export interface Team {
  id: number;
  name: string;
  memberIds: number[];
}

export enum TaskStatus {
  ToDo = 'برای انجام',
  InProgress = 'در حال انجام',
  Done = 'تکمیل شده',
}

export enum TaskPriority {
  High = 'بالا',
  Medium = 'متوسط',
  Low = 'پایین',
}

export interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  role: string;
  email: string;
}

export interface Task {
  id: number;
  teamId: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignedTo: TeamMember[];
}