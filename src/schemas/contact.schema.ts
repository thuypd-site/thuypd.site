import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Vui lòng nhập họ và tên (tối thiểu 2 ký tự)' })
    .max(100, { message: 'Họ tên không được vượt quá 100 ký tự' }),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, {
      message: 'Số điện thoại không hợp lệ (Ví dụ: 0912345678)',
    }),
  email: z
    .string()
    .trim()
    .email({ message: 'Địa chỉ email không đúng định dạng' })
    .optional()
    .or(z.literal('')),
  websiteType: z
    .string()
    .min(1, { message: 'Vui lòng chọn loại hình website bạn cần' }),
  budgetTier: z
    .string()
    .min(1, { message: 'Vui lòng chọn mức ngân sách dự kiến' }),
  notes: z
    .string()
    .max(1000, { message: 'Ghi chú không quá 1000 ký tự' })
    .optional()
    .or(z.literal('')),
  agreedToTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Bạn cần đồng ý với chính sách bảo mật và tư vấn giải pháp',
    }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const domainSearchSchema = z.object({
  domain: z
    .string()
    .trim()
    .min(2, { message: 'Tên miền tối thiểu 2 ký tự' })
    .max(63, { message: 'Tên miền tối đa 63 ký tự' })
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/, {
      message: 'Tên miền chỉ gồm chữ cái, số và dấu gạch nối (không bắt đầu/kết thúc bằng gạch nối)',
    }),
  tld: z.string().default('.com'),
});

export type DomainSearchInput = z.infer<typeof domainSearchSchema>;
