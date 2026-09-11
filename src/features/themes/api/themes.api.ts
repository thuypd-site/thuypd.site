import { httpClient } from '../../../core/http/client';
import { ThemeItem, ThemeCategory } from '../../../types/theme.types';
import { mockThemes } from '../../../data/mockThemes';

function normalizeTheme(t: any): ThemeItem {
  const priceNum = typeof t.price === 'number' ? t.price : 0;
  const formattedPrice =
    t.formattedPrice ||
    (priceNum > 0 ? `${new Intl.NumberFormat('vi-VN').format(priceNum)}đ` : 'Liên hệ');

  return {
    ...t,
    id: t.id || t._id || t.themeId,
    title: t.title || 'Mẫu Giao Diện THUYPD.SITE',
    category: t.category || 'corporate',
    categoryName: t.categoryName || 'Doanh Nghiệp',
    price: priceNum,
    formattedPrice,
    description: t.description || '',
    imageUrl: t.imageUrl || t.thumbnail || '',
    imageAlt: t.imageAlt || t.title || 'Giao diện mẫu THUYPD.SITE',
    demoUrl: t.demoUrl || t.previewUrl || '',
    features: Array.isArray(t.features) ? t.features : [],
    isPopular: Boolean(t.isPopular),
  };
}

export const fetchThemesApi = async (category: ThemeCategory = 'all'): Promise<ThemeItem[]> => {
  try {
    const query = category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    // Prefer official client endpoint /api/client/themes from docs
    const data = await httpClient<any>(`/api/client/themes${query}`);
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data?.themes) ? data.themes : [];

    if (data?.success && list.length > 0) {
      return list.map(normalizeTheme);
    }
  } catch (err) {
    console.warn('[Themes API] Không thể lấy từ máy chủ, chuyển sang dữ liệu dự phòng:', err);
  }

  if (category === 'all') return mockThemes;
  return mockThemes.filter((theme) => theme.category === category);
};

export const fetchThemeByIdApi = async (id: string): Promise<ThemeItem | null> => {
  try {
    const data = await httpClient<any>(`/api/client/themes/${id}`);
    const t = data?.data || data?.theme;
    if (data?.success && t) {
      return normalizeTheme(t);
    }
  } catch (err) {
    console.warn(`[Themes API] Không thể tải chi tiết theme ${id}:`, err);
  }

  return mockThemes.find((m) => m.id === id || m._id === id || m.themeId === id) || null;
};
