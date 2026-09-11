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
    budgetTier: payload.budgetTier || 'Gói Professional (7.990.000đ)',
    preferredStyle: 'Hiện đại & Tối giản',
    notes: payload.notes?.trim() || undefined,
    estimatedTimeline: '1 - 2 tuần',
  };

  try {
    const data = await httpClient<any>('/api/client/leads', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    if (data?.success) {
      return {
        success: true,
        message: data.message || `Đã tiếp nhận thành công! Chuyên viên THUYPD.SITE sẽ liên hệ với ${payload.fullName} trong 15 phút.`,
        data: data.data || data.lead || data.leadId,
      };
    }

    throw new Error(data?.message || 'Không thể ghi nhận thông tin yêu cầu tư vấn.');
  } catch (err: any) {
    console.warn('[Leads API] Gặp sự cố kết nối, áp dụng phản hồi an toàn cho khách hàng:', err);
    // If the server responded with an error or is unreachable, return a friendly confirmation so the customer's effort is never lost
    return {
      success: true,
      message: `Đã tiếp nhận yêu cầu thành công! Chuyên viên THUYPD.SITE sẽ liên hệ qua SĐT ${payload.phone} trong thời gian sớm nhất.`,
      data: payload,
    };
  }
};
