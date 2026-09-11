import { httpClient } from '../../../core/http/client';
import { ServiceItem } from '../../../types/service.types';
import { mockServices } from '../../../data/mockServices';

export const fetchServicesApi = async (): Promise<ServiceItem[]> => {
  try {
    const data = await httpClient<any>('/api/client/services');
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data?.services) ? data.services : [];
    if (data?.success && list.length > 0) {
      return list.map((s: any) => ({
        ...s,
        id: s.serviceId || s._id || s.id,
        serviceId: s.serviceId || s._id || s.id,
        icon: s.icon || 'design_services',
        title: s.title,
        description: s.description,
        tag: s.tag,
        order: s.order,
        isActive: s.isActive ?? true,
      }));
    }
  } catch (err) {
    console.warn('[Services API] Sử dụng dữ liệu dự phòng:', err);
  }
  return mockServices;
};
