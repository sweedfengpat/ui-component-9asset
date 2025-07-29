import { useState, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { MenuItem, LANGUAGE_OPTIONS } from '../TabletMenu.constants';

interface UseTabletMenuProps {
  onLanguageChanged?: (lang: string) => void;
  onClose: () => void;
}

export const useTabletMenu = ({ onLanguageChanged, onClose }: UseTabletMenuProps) => {
  const { t, i18n } = useTranslation('common');
  const [languageDrawerOpen, setLanguageDrawerOpen] = useState(false);

  const menuItems: MenuItem[] = useMemo(() => [
    {
      label: t('sell'),
      value: 'sell',
      link: `/${t('sell')}`
    },
    {
      label: t('rent'),
      value: 'rent',
      link: `/${t('rent')}`
    },
    {
      label: t('lease'),
      value: 'lease',
      link: `/${t('lease')}`
    },
    {
      label: t('link.mortgageOrRedemption'),
      value: 'mortgage',
      link: '/mortgage'
    },
    {
      label: t('project'),
      value: 'project',
      link: `/${t('project')}`
    },
    {
      label: t('article'),
      value: 'article',
      link: '/article'
    }
    
  ], [t]);

  const getCurrentLanguageLabel = (): string => {
    const currentLang = LANGUAGE_OPTIONS.find(lang => lang.code === i18n.language);
    return currentLang ? currentLang.label : 'ไทย';
  };

  const handleLanguageClick = () => {
    setLanguageDrawerOpen(true);
  };

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChanged?.(langCode);
    setLanguageDrawerOpen(false);
    onClose();
  };

  const handleLanguageDrawerClose = () => {
    setLanguageDrawerOpen(false);
  };

  const handleLanguageDrawerCloseWithMain = () => {
    handleLanguageDrawerClose();
    onClose();
  };

  return {
    menuItems,
    languageOptions: LANGUAGE_OPTIONS,
    languageDrawerOpen,
    currentLanguage: i18n.language,
    getCurrentLanguageLabel,
    handleLanguageClick,
    handleLanguageSelect,
    handleLanguageDrawerClose,
    handleLanguageDrawerCloseWithMain,
    t
  };
};