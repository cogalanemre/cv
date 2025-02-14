// Ay isimleri için sabitler
const MONTHS = {
  tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'] as const,
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const,
};

// Tip tanımlamaları
export type DateInput = Date | string | undefined | null;
type Locale = keyof typeof MONTHS;

/**
 * Tarih girişini Date nesnesine çevirir
 */
const normalizeDate = (date: DateInput): Date => {
  if (!date) return new Date();
  return date instanceof Date ? date : new Date(date);
};

/**
 * İki tarih arasındaki süreyi hesaplar
 */
const calculateMonthsBetween = (startDate: Date, endDate: Date): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  end.setDate(end.getDate() + 1);
  
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();
  
  if (end.getDate() < start.getDate()) {
    months--;
  }
  
  return months;
};

/**
 * Ay sayısını yıl ve ay olarak formatlar
 */
export const formatDuration = (totalMonths: number, locale: Locale = 'tr'): string => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  const parts = [];
  if (years > 0) parts.push(`${years} ${locale === 'tr' ? 'yıl' : 'year'}${years > 1 && locale === 'en' ? 's' : ''}`);
  if (months > 0) parts.push(`${months} ${locale === 'tr' ? 'ay' : 'month'}${months > 1 && locale === 'en' ? 's' : ''}`);
  
  return parts.join(' ');
};

/**
 * İki tarih arasındaki süreyi hesaplar ve formatlar
 */
export const calculateDuration = (startDate: DateInput, endDate: DateInput, locale: Locale = 'tr'): string => {
  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);
  
  const months = calculateMonthsBetween(start, end);
  return formatDuration(months, locale);
};

/**
 * Tarihi belirtilen dilde formatlar
 */
export const formatDate = (date: DateInput, locale: Locale = 'tr'): string => {
  if (!date) return '';
  const normalizedDate = normalizeDate(date);
  return `${MONTHS[locale][normalizedDate.getMonth()]} ${normalizedDate.getFullYear()}`;
};

/**
 * Toplam deneyim süresini hesaplar
 */
export const calculateTotalExperience = (
  experiences: Array<{ 
    startDate: DateInput; 
    endDate?: DateInput; 
    isCurrentJob?: boolean; 
  }>,
  locale: Locale = 'tr'
): string => {
  const totalMonths = experiences.reduce((total, exp) => {
    const start = normalizeDate(exp.startDate);
    const end = exp.isCurrentJob ? new Date() : normalizeDate(exp.endDate);
    return total + calculateMonthsBetween(start, end);
  }, 0);

  return formatDuration(totalMonths, locale);
};

/**
 * Yeteneklere göre toplam deneyim süresini hesaplar
 */
export const calculateSkillDuration = (
  experiences: Array<{ 
    startDate: DateInput; 
    endDate?: DateInput; 
    isCurrentJob?: boolean;
    skills: string[];
  }>,
): Map<string, number> => {
  const skillDurations = new Map<string, number>();

  experiences.forEach((exp) => {
    const start = normalizeDate(exp.startDate);
    const end = exp.isCurrentJob ? new Date() : normalizeDate(exp.endDate);
    const months = calculateMonthsBetween(start, end);

    exp.skills.forEach((skill) => {
      const currentDuration = skillDurations.get(skill) || 0;
      skillDurations.set(skill, currentDuration + months);
    });
  });

  // Sürelere göre sırala
  return new Map([...skillDurations.entries()].sort((a, b) => b[1] - a[1]));
};

/**
 * Toplam deneyim süresini ay cinsinden hesaplar
 */
export const calculateTotalMonths = (
  experiences: Array<{ 
    startDate: DateInput; 
    endDate?: DateInput; 
    isCurrentJob?: boolean; 
  }>,
): number => {
  return experiences.reduce((total, exp) => {
    const start = normalizeDate(exp.startDate);
    const end = exp.isCurrentJob ? new Date() : normalizeDate(exp.endDate);
    return total + calculateMonthsBetween(start, end);
  }, 0);
}; 