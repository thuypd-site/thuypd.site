'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { contactFormSchema, ContactFormInput } from '../../schemas/contact.schema';
import { useContactMutation } from '../../hooks/useContactMutation';
import { siteConfig } from '../../config/site.config';
import { useSettings } from '../../hooks/useSettings';
import { ContactSectionContent } from '../../types/landingConfig.types';

interface ContactSectionProps {
  content?: ContactSectionContent;
  displayStyle?: string;
  initialBudgetTier?: string;
  initialWebsiteType?: string;
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  content,
  displayStyle,
  initialBudgetTier,
  initialWebsiteType,
  initialNotes,
}) => {
  const { data: settings } = useSettings();
  const hotline = settings?.hotline || siteConfig.hotline;
  const hotlineRaw = settings?.hotlineRaw || siteConfig.hotlineRaw;
  const zaloPhone = settings?.zaloPhone || siteConfig.zaloPhone;
  const zaloUrl = settings?.zaloUrl || siteConfig.zaloUrl;
  const email = settings?.contactEmail || siteConfig.email;
  const address = settings?.officeAddress || siteConfig.address;
  const badge = content?.badge || 'Tư Vấn Miễn Phí';
  const title = content?.title || 'Đăng Ký Nhận Tư Vấn & Phác Thảo Giao Diện';
  const subtitle = content?.subtitle || 'Điền thông tin bên dưới hoặc liên hệ trực tiếp qua Zalo/Hotline, chúng tôi sẽ phản hồi và tư vấn chu đáo trong 15 phút.';

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

  const { mutate: submitQuote, data: responseData, isPending, isSuccess, isError, error, reset: resetMutation } = useContactMutation();

  const onSubmit = (data: ContactFormInput) => {
    submitQuote(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const isCentered = displayStyle === 'centered';

  const renderFormContent = () => (
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
          <option value="Gói Khởi Nghiệp (4.990.000đ)">Gói Khởi Nghiệp (4.990.000đ) - Cơ bản cho shop & cá nhân</option>
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
              <span>Gửi Yêu Cầu & Nhận Báo Giá Miễn Phí</span>
            </>
          )}
        </span>
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </button>
    </form>
  );

  return (
    <section className="py-16 lg:py-24 bg-[#f6f9fc] border-t border-slate-200/80 relative" id="nhan-bao-gia">
      <div id="contact-lead" className="absolute -top-24 left-0" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {isCentered ? (
          /* ========================================================================= */
          /* CENTERED LAYOUT (Form tập trung ở giữa)                                   */
          /* ========================================================================= */
          <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
            <div className="text-center space-y-3">
              <span className="px-4 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15 inline-block">
                {badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30]">
                {title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#45464d] leading-relaxed max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>

            <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-white shadow-xl sm:shadow-2xl border border-[#dce9ff]/80 space-y-6">
              <div className="space-y-1 text-center sm:text-left pb-1 border-b border-slate-100">
                <h3 className="text-lg sm:text-xl font-bold text-[#0b1c30]">
                  Đăng Ký Tư Vấn & Báo Giá Nhanh
                </h3>
                <p className="text-xs sm:text-sm text-[#45464d]">
                  Điền thông tin bên dưới, chúng tôi sẽ liên hệ tư vấn giải pháp và báo giá cụ thể cho bạn.
                </p>
              </div>

              {renderFormContent()}
            </div>

            {/* Quick Contact Horizontal Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <a
                href={`tel:${hotlineRaw}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-[#45464d] block">Hotline 24/7</span>
                  <span className="text-xs sm:text-sm font-bold text-[#0b1c30] group-hover:text-[#006398]">{hotline}</span>
                </div>
              </a>

              <a
                href={zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-[#45464d] block">Chat Zalo</span>
                  <span className="text-xs sm:text-sm font-bold text-[#0b1c30] group-hover:text-[#006398]">{zaloPhone}</span>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-[#45464d] block">Email chính thức</span>
                  <span className="text-xs sm:text-sm font-bold text-[#0b1c30] group-hover:text-[#006398] truncate block">{email}</span>
                </div>
              </a>
            </div>

            {/* Commitments Banner */}
            {content?.commitments && content.commitments.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
                {content.commitments.map((cmt, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#0b1c30] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{cmt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* STANDARD / FORM_SPLIT LAYOUT (Chia Đôi 2 Cột Kinh Điển)                   */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left info column */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <div className="space-y-3">
                <span className="px-4 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15">
                  {badge}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30]">
                  {title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-[#45464d] leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* Direct Contact Cards */}
              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                <a
                  href={`tel:${hotlineRaw}`}
                  className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all duration-300 group cursor-pointer min-h-[56px] shadow-xs hover:shadow-md"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs text-[#45464d] block">Hotline tư vấn trực tiếp 24/7</span>
                    <div className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                      {hotline}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all duration-300 group cursor-pointer min-h-[56px] shadow-xs hover:shadow-md"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs text-[#45464d] block">Email liên hệ chính thức</span>
                    <div className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                      {email}
                    </div>
                  </div>
                </a>

                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all duration-300 group cursor-pointer min-h-[56px] shadow-xs hover:shadow-md"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs text-[#45464d] block">Kênh hỗ trợ nhanh</span>
                    <div className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                      Chat qua Zalo: {zaloPhone}
                    </div>
                  </div>
                </a>

                {address && (
                  <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 transition-all duration-300 min-h-[56px] shadow-xs">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] sm:text-xs text-[#45464d] block">Trụ sở & Văn phòng đại diện</span>
                      <div className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                        {address}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Guarantees / Commitments list if provided */}
              {content?.commitments && content.commitments.length > 0 && (
                <div className="pt-2 sm:pt-3 space-y-2 border-t border-[#dce9ff]/60">
                  {content.commitments.map((cmt, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#0b1c30] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{cmt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right form column */}
            <div className="lg:col-span-7">
              <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white shadow-xl sm:shadow-2xl border border-[#dce9ff]/80 space-y-5 sm:space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
                    Đăng Ký Tư Vấn & Báo Giá Nhanh
                  </h3>
                  <p className="text-xs sm:text-sm text-[#45464d]">
                    Điền thông tin bên dưới, chúng tôi sẽ liên hệ tư vấn giải pháp và báo giá cụ thể cho bạn.
                  </p>
                </div>

                {renderFormContent()}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
