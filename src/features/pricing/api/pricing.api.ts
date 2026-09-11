import { httpClient } from '../../../core/http/client';
import { PricingPlan } from '../../../types/pricing.types';
import { mockPricingPlans } from '../../../data/mockPricing';

export const fetchPricingPlansApi = async (): Promise<PricingPlan[]> => {
  try {
    const data = await httpClient<any>('/api/client/pricing');
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data?.plans) ? data.plans : [];
    if (data?.success && list.length > 0) {
      return list.map((p: any) => {
        const priceNum = typeof p.price === 'number' ? p.price : 0;
        const formattedPrice =
          p.formattedPrice ||
          (priceNum > 0 ? `${new Intl.NumberFormat('vi-VN').format(priceNum)}` : 'Liên hệ');

        return {
          ...p,
          id: p.planId || p._id || p.id,
          planId: p.planId || p._id || p.id,
          name: p.name,
          tierSubtitle: p.tierSubtitle || '',
          price: priceNum,
          formattedPrice,
          description: p.description || '',
          isPopular: Boolean(p.isPopular),
          completionDays: p.completionDays || '3 - 5 ngày',
          features: Array.isArray(p.features) ? p.features : [],
          renewal1Year: p.renewal1Year || '1.000.000đ',
          renewal3Years: p.renewal3Years || '2.400.000đ',
          order: p.order,
          isActive: p.isActive ?? true,
        };
      });
    }
  } catch (err) {
    console.warn('[Pricing API] Sử dụng dữ liệu dự phòng:', err);
  }
  return mockPricingPlans;
};
