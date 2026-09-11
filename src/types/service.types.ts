export interface ServiceItem {
  id?: string;
  serviceId?: string;
  _id?: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
  order?: number;
  isActive?: boolean;
}

export interface AdvantageItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
  rating: number;
}
