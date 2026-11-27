import { httpClient } from '../../../core/http/client';
import { ContactFormInput } from '../../../schemas/contact.schema';

export const submitContactQuoteApi = async (
  payload: ContactFormInput
): Promise<{ success: boolean; message: string; data?: any }> => {
  const requestBody = {
    fullName: payload.fullName.trim(),
    phone: payload.phone.trim(),
    email: payload.email?.trim() || undefined,
    websiteType: payload.websiteType || 'Website Doanh Nghiệp',
    budgetTier: payload.budgetTier || 'Gói Chuyên Nghiệp (7.990.000 ₫)',
    preferredStyle: 'Hiện đại & Chuyên nghiệp',
    notes: payload.notes?.trim() || undefined,
    estimatedTimeline: '1 - 2 tuần',
  };

  const data = await httpClient<any>('/api/client/leads', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });

  if (data?.success) {
    return {
      success: true,
      message:
        data.message ||
        `Đã tiếp nhận yêu cầu! Chúng tôi sẽ liên hệ với ${payload.fullName} trong 15 phút.`,
      data: data.data || data.lead || data.leadId,
    };
  }

  throw new Error(data?.message || 'Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc liên hệ qua Zalo.');
};
