export interface PricingPlan {
  id?: string;
  planId?: string;
  _id?: string;
  name: string;
  tierSubtitle: string;
  price: number;
  formattedPrice: string;
  description: string;
  isPopular?: boolean;
  completionDays: string;
  features: string[];
  renewal1Year: string;
  renewal3Years: string;
  order?: number;
  isActive?: boolean;
}
