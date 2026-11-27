export interface PricingPlan {
  id?: string;
  planId?: string;
  _id?: string;
  name: string;
  tierSubtitle: string;
  price: number;
  formattedPrice: string;
  originalPrice?: number;
  description: string;
  isPopular?: boolean;
  completionDays: string;
  period?: string;
  features: string[];
  order?: number;
  isActive?: boolean;
}
