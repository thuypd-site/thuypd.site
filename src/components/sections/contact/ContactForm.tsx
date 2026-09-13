'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { contactFormSchema, ContactFormInput } from '../../../schemas/contact.schema';
import { useContactMutation } from '../../../hooks/useContactMutation';

export interface ContactFormProps {
  initialBudgetTier?: string;
  initialWebsiteType?: string;
  initialNotes?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialBudgetTier,
  initialWebsiteType,
  initialNotes,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      websiteType: initialWebsiteType || 'Website Bán Hàng / Cửa Hàng Trực Tuyến',
      budgetTier: initialBudgetTier || 'Gói Chuyên Nghiệp (7.990.000đ)',
      notes: initialNotes || '',
      agreedToTerms: true,
    },
  });

  useEffect(() => {
    if (initialBudgetTier) {
      setValue('budgetTier', initialBudgetTier);
    }
  }, [initialBudgetTier, setValue]);

  useEffect(() => {
    if (initialWebsiteType) {
      setValue('websiteType', initialWebsiteType);
    }
  }, [initialWebsiteType, setValue]);

  useEffect(() => {
    if (initialNotes) {
      setValue('notes', initialNotes);
    }
  }, [initialNotes, setValue]);

  useEffect(() => {
    const handleDomainSelect = (e: any) => {
      if (e.detail?.domain) {
        const domainText = e.detail.price
          ? `Tôi muốn tư vấn thiết kế website và đăng ký giữ tên miền: ${e.detail.domain} (${e.detail.price})`
          : `Tôi muốn tư vấn thiết kế website và đăng ký giữ tên miền: ${e.detail.domain}`;
        setValue('notes', domainText);
      }
    };

    window.addEventListener('select-domain', handleDomainSelect);
    return () => window.removeEventListener('select-domain', handleDomainSelect);
  }, [setValue]);

  const { mutate: submitQuote, isPending, isSuccess, isError, error } = useContactMutation();

  const onSubmit = (data: ContactFormInput) => {
    submitQuote(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#0b1c30]">
            Họ và tên của bạn *
          </label>
          <input
            type="text"
            {...register('fullName')}
            placeholder="Ví dụ: Nguyễn Văn A"
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 text-[#0b1c30] text-sm border focus:bg-white focus:ring-4 transition-all outline-none ${
              errors.fullName
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-200/90 focus:border-[#006398] focus:ring-[#006398]/20'
            }`}
          />
          {errors.fullName && (
            <span className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.fullName.message}
            </span>
          )}
        </div>

        {/* Phone / Zalo */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#0b1c30]">
            Số điện thoại / Zalo *
          </label>
          <input
            type="tel"
            {...register('phone')}
            placeholder="Ví dụ: 0912 345 678"
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 text-[#0b1c30] text-sm border focus:bg-white focus:ring-4 transition-all outline-none ${
              errors.phone
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-200/90 focus:border-[#006398] focus:ring-[#006398]/20'
            }`}
          />
          {errors.phone && (
            <span className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phone.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#0b1c30]">
            Địa chỉ Email (Nhận báo giá)
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="email@example.com"
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 text-[#0b1c30] text-sm border focus:bg-white focus:ring-4 transition-all outline-none ${
              errors.email
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-200/90 focus:border-[#006398] focus:ring-[#006398]/20'
            }`}
          />
          {errors.email && (
            <span className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Website Type */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#0b1c30]">
            Loại hình website quan tâm
          </label>
          <select
            {...register('websiteType')}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 text-[#0b1c30] text-sm border border-slate-200/90 focus:bg-white focus:border-[#006398] focus:ring-4 focus:ring-[#006398]/20 transition-all outline-none"
          >
            <option value="Website Giới Thiệu Doanh Nghiệp">Website Giới Thiệu Doanh Nghiệp</option>
            <option value="Website Bán Hàng / Cửa Hàng Trực Tuyến">Website Bán Hàng / Cửa Hàng Trực Tuyến</option>
            <option value="Website Bất Động Sản">Website Bất Động Sản</option>
            <option value="Website Dịch Vụ / Spa / Thẩm Mỹ">Website Dịch Vụ / Spa / Thẩm Mỹ</option>
            <option value="Website Thiết Kế Theo Yêu Cầu Riêng">Website Thiết Kế Theo Yêu Cầu Riêng</option>
          </select>
        </div>
      </div>

      {/* Budget Tier */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[#0b1c30]">
          Ngân sách dự kiến / Gói giải pháp
        </label>
        <select
          {...register('budgetTier')}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 text-[#0b1c30] text-sm border border-slate-200/90 focus:bg-white focus:border-[#006398] focus:ring-4 focus:ring-[#006398]/20 transition-all outline-none font-medium"
        >
          <option value="Gói Khởi Nghiệp (4.990.000đ)">Gói Khởi Nghiệp (4.990.000đ) - Cơ bản cho shop &amp; cá nhân</option>
          <option value="Gói Chuyên Nghiệp (7.990.000đ)">Gói Chuyên Nghiệp (7.990.000đ) - Khuyên dùng cho công ty</option>
          <option value="Gói Phát Triển Theo Yêu Cầu (12.990.000đ)">Gói Phát Triển Theo Yêu Cầu (12.990.000đ) - Tính năng nâng cao</option>
          <option value="Tư vấn giải pháp phù hợp nhất">Chưa xác định - Cần tư vấn giải pháp phù hợp nhất</option>
        </select>
      </div>

      {/* Notes / Special Requirements */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[#0b1c30]">
          Mô tả thêm yêu cầu hoặc gửi link website mẫu bạn thích
        </label>
        <textarea
          rows={3}
          {...register('notes')}
          placeholder="Ví dụ: Tôi muốn làm web bán nội thất giống phong cách hiện đại, có tính năng tính giá tự động..."
          className="w-full px-4 py-3 rounded-xl bg-slate-50 text-[#0b1c30] text-sm border border-slate-200/90 focus:bg-white focus:border-[#006398] focus:ring-4 focus:ring-[#006398]/20 transition-all outline-none resize-none"
        />
      </div>

      {/* Success Notification */}
      {isSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Gửi yêu cầu thành công!</strong>
            <span>Cảm ơn bạn! Đội ngũ tư vấn sẽ liên hệ lại qua Zalo/Điện thoại trong vòng 15 phút.</span>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {isError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Chưa thể gửi yêu cầu</strong>
            <span>{(error as any)?.message || 'Vui lòng kiểm tra lại kết nối mạng hoặc liên hệ trực tiếp qua Hotline!'}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending || isSubmitting}
        className="relative overflow-hidden group w-full py-3.5 bg-[#006398] text-white text-sm rounded-xl font-bold hover:bg-[#00476e] hover:shadow-xl hover:shadow-[#006398]/30 active:scale-95 transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
      >
        <span className="relative z-10 flex items-center gap-2">
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang xử lý tiếp nhận...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span>Gửi Yêu Cầu &amp; Nhận Báo Giá Miễn Phí</span>
            </>
          )}
        </span>
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </button>
    </form>
  );
};
