'use client';

import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  PhoneCall,
  MessageCircle,
  Mail,
} from 'lucide-react';
import { contactFormSchema, ContactFormInput } from '../../schemas/contact.schema';
import { useContactMutation } from '../../features/quote/hooks/useContactMutation';
import { useSettings } from '../../features/settings/hooks/useSettings';
import { useLandingConfig } from '../../features/landing/context/LandingConfigContext';
import { ContactSectionContent } from '../../types/landingConfig.types';
import { formatPriceWithVND } from '../../core/utils/formatters';

export interface ContactSectionProps {
  content: ContactSectionContent;
  initialBudgetTier?: string;
  initialWebsiteType?: string;
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  content,
  initialBudgetTier,
  initialWebsiteType,
  initialNotes,
}) => {
  const { settings } = useSettings();
  const { sections } = useLandingConfig();

  const planOptions = useMemo(() => {
    const pricingSec = sections.find((s) => s.id === 'pricing');
    const plans = pricingSec?.id === 'pricing' ? pricingSec.content.plans || [] : [];
    const options = plans.map((p) => {
      const priceLabel = formatPriceWithVND(p.formattedPrice || p.price);
      return `${p.name} (${priceLabel})`;
    });
    options.push('Tư vấn giải pháp theo yêu cầu riêng');
    return options;
  }, [sections]);

  const defaultBudget =
    initialBudgetTier && planOptions.includes(initialBudgetTier)
      ? initialBudgetTier
      : planOptions[1] || planOptions[0] || 'Tư vấn giải pháp theo yêu cầu riêng';

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
      websiteType: initialWebsiteType || 'Website Giới Thiệu Doanh Nghiệp',
      budgetTier: defaultBudget,
      notes: initialNotes || '',
      agreedToTerms: true,
    },
  });

  useEffect(() => {
    if (initialBudgetTier) setValue('budgetTier', initialBudgetTier);
  }, [initialBudgetTier, setValue]);

  useEffect(() => {
    if (initialWebsiteType) setValue('websiteType', initialWebsiteType);
  }, [initialWebsiteType, setValue]);

  useEffect(() => {
    if (initialNotes) setValue('notes', initialNotes);
  }, [initialNotes, setValue]);

  useEffect(() => {
    const handleDomainSelect = (e: CustomEvent<{ domain?: string; price?: string }>) => {
      if (e.detail?.domain) {
        const domainText = e.detail.price
          ? `Tôi muốn tư vấn làm website kèm tên miền: ${e.detail.domain} (${e.detail.price})`
          : `Tôi muốn tư vấn làm website kèm tên miền: ${e.detail.domain}`;
        setValue('notes', domainText);
      }
    };

    window.addEventListener('select-domain', handleDomainSelect as EventListener);
    return () => window.removeEventListener('select-domain', handleDomainSelect as EventListener);
  }, [setValue]);

  const { mutate: submitQuote, isPending, isSuccess, isError, error } = useContactMutation();

  const onSubmit = (data: ContactFormInput) => {
    submitQuote(data, {
      onSuccess: () => {
        reset({
          fullName: '',
          phone: '',
          email: '',
          websiteType: data.websiteType,
          budgetTier: data.budgetTier,
          notes: '',
          agreedToTerms: true,
        });
      },
    });
  };

  const commitments =
    content.commitments && content.commitments.length > 0
      ? content.commitments
      : [
          'Tư vấn đúng nhu cầu thực tế, không phát sinh chi phí ẩn',
          'Báo giá rõ ràng từng hạng mục & tiến độ bàn giao',
          'Bảo mật tuyệt đối thông tin liên hệ của bạn',
        ];

  return (
    <section id="nhan-bao-gia" className="bg-[#f6f9fc] py-16 sm:py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels & Commitments */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {content.badge && (
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#533afd] mb-2">
                  {content.badge}
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0d253d] tracking-tight">
                {content.title || 'Nhận Tư Vấn & Báo Giá Chi Tiết Trong 15 Phút'}
              </h2>
              {content.subtitle && (
                <p className="text-sm text-[#64748d] mt-3 leading-relaxed">{content.subtitle}</p>
              )}
            </div>

            <div className="space-y-3">
              {settings.hotline && (
                <a
                  href={`tel:${settings.hotlineRaw || settings.hotline.replace(/\D/g, '')}`}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-[#e3e8ee] hover:border-[#533afd]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#eef2ff] text-[#533afd] flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#64748d]">Hotline tư vấn trực tiếp</div>
                    <div className="text-sm font-bold text-[#0d253d] tabular-nums">
                      {settings.hotline}
                    </div>
                  </div>
                </a>
              )}

              {settings.zaloUrl && (
                <a
                  href={settings.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-[#e3e8ee] hover:border-[#533afd]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#eef2ff] text-[#533afd] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#64748d]">Nhắn tin Zalo phản hồi nhanh</div>
                    <div className="text-sm font-bold text-[#0d253d]">
                      {settings.zaloPhone || settings.hotline}
                    </div>
                  </div>
                </a>
              )}

              {settings.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-[#e3e8ee] hover:border-[#533afd]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#eef2ff] text-[#533afd] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[#64748d]">Email tiếp nhận hồ sơ</div>
                    <div className="text-sm font-bold text-[#0d253d] truncate">
                      {settings.contactEmail}
                    </div>
                  </div>
                </a>
              )}
            </div>

            <ul className="space-y-2.5 pt-2">
              {commitments.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#273951]">
                  <CheckCircle2 className="w-4 h-4 text-[#533afd] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Clean Quote Form */}
          <div className="lg:col-span-7">
            <div className="stripe-card rounded-2xl p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0d253d]">
                      Họ và tên <span className="text-[#ea2261]">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className={`w-full h-11 px-3.5 rounded-lg bg-white text-[#0d253d] text-sm border focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-[#ea2261]'
                          : 'border-[#a8c3de] focus:border-[#533afd]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-[#ea2261]">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0d253d]">
                      Số điện thoại / Zalo <span className="text-[#ea2261]">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="Ví dụ: 0912345678"
                      className={`w-full h-11 px-3.5 rounded-lg bg-white text-[#0d253d] text-sm border focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-[#ea2261]'
                          : 'border-[#a8c3de] focus:border-[#533afd]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-[#ea2261]">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0d253d]">Email (tùy chọn)</label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="email@example.com"
                      className={`w-full h-11 px-3.5 rounded-lg bg-white text-[#0d253d] text-sm border focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-[#ea2261]'
                          : 'border-[#a8c3de] focus:border-[#533afd]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-[#ea2261]">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0d253d]">
                      Loại hình website
                    </label>
                    <select
                      {...register('websiteType')}
                      className="w-full h-11 px-3.5 rounded-lg bg-white text-[#0d253d] text-sm border border-[#a8c3de] focus:border-[#533afd] focus:outline-none"
                    >
                      <option value="Website Giới Thiệu Doanh Nghiệp">
                        Website Giới Thiệu Doanh Nghiệp
                      </option>
                      <option value="Website Bán Hàng & Thương Mại Điện Tử">
                        Website Bán Hàng &amp; TMĐT
                      </option>
                      <option value="Website Bất Động Sản">Website Bất Động Sản</option>
                      <option value="Website Dịch Vụ / Spa / Thẩm Mỹ">
                        Website Dịch Vụ / Spa / Thẩm Mỹ
                      </option>
                      <option value="Website Nội Thất & Kiến Trúc">
                        Website Nội Thất &amp; Kiến Trúc
                      </option>
                      <option value="Website Portfolio / Studio">Website Portfolio / Studio</option>
                      <option value="Website Thiết Kế Theo Yêu Cầu Riêng">
                        Website Thiết Kế Theo Yêu Cầu Riêng
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#0d253d]">
                    Gói giải pháp dự kiến
                  </label>
                  <select
                    {...register('budgetTier')}
                    className="w-full h-11 px-3.5 rounded-lg bg-white text-[#0d253d] text-sm border border-[#a8c3de] focus:border-[#533afd] focus:outline-none font-medium"
                  >
                    {planOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#0d253d]">
                    Mô tả ngắn gọn nhu cầu
                  </label>
                  <textarea
                    rows={3}
                    {...register('notes')}
                    placeholder="Ngành nghề kinh doanh, tính năng mong muốn hoặc mẫu bạn ưng ý..."
                    className="w-full p-3.5 rounded-lg bg-white text-[#0d253d] text-sm border border-[#a8c3de] focus:border-[#533afd] focus:outline-none resize-none"
                  />
                </div>

                {isSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold">Đã tiếp nhận yêu cầu!</strong> Chúng tôi sẽ
                      liên hệ tư vấn qua Zalo / Điện thoại trong vòng 15 phút.
                    </div>
                  </div>
                )}

                {isError && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold">Chưa thể gửi yêu cầu:</strong>{' '}
                      {(error as Error)?.message ||
                        'Vui lòng kiểm tra kết nối hoặc liên hệ trực tiếp qua Hotline/Zalo.'}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending || isSubmitting}
                  className="w-full h-11 rounded-full bg-[#533afd] hover:bg-[#4434d4] active:bg-[#2e2b8c] text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-70"
                >
                  {isPending || isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang gửi yêu cầu...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Gửi Yêu Cầu &amp; Nhận Báo Giá Miễn Phí</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
