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

// FIX: Add CampaignStatus enum to resolve import error in CampaignsTable.tsx
export enum CampaignStatus {
  Completed = 'تکمیل شده',
  InProgress = 'در حال انجام',
  Paused = 'متوقف شده',
}

// FIX: Add Campaign interface to resolve import error in CampaignsTable.tsx
export interface Campaign {
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
