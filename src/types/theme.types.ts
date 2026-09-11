export type ThemeCategory = 'all' | 'ecommerce' | 'corporate' | 'realestate' | 'spa' | 'furniture';

export interface ThemeItem {
  id?: string;
  themeId?: string;
  _id?: string;
  title: string;
  category: ThemeCategory | string;
  categoryName: string;
  price: number;
  formattedPrice: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  demoUrl?: string;
  features: string[];
  order?: number;
  isActive?: boolean;
}
