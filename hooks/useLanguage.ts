import { useTranslation } from 'next-i18next';
import { useState } from 'react';

export type SupportedLanguage = 'th' | 'en' | 'cn';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'th', label: 'ไทย' },
  { code: 'en', label: 'English' },
  { code: 'cn', label: '中文' }
] as const;

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLanguage = i18n.language as SupportedLanguage;
  const isMenuOpen = Boolean(anchorEl);

  const getCurrentLanguageLabel = (): string => {
    const currentLang = LANGUAGE_OPTIONS.find(lang => lang.code === currentLanguage);
    return currentLang ? currentLang.label : 'ไทย';
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode: SupportedLanguage, onLanguageChanged?: (lang: string) => void) => {
    onLanguageChanged?.(langCode);
    setAnchorEl(null);
  };

  const getLanguagePrefix = (lang: SupportedLanguage = currentLanguage): string => {
    return lang === 'th' ? '' : `/${lang}`;
  };

  return {
    currentLanguage,
    languageOptions: LANGUAGE_OPTIONS,
    anchorEl,
    isMenuOpen,
    getCurrentLanguageLabel,
    handleLanguageMenuOpen,
    handleLanguageMenuClose,
    handleLanguageChange,
    getLanguagePrefix
  };
};