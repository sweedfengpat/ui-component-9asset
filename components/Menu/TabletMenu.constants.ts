export const TABLET_MENU_CONSTANTS = {
  DRAWER_WIDTH: '100vw',
  HEADER_PADDING: '16px 27px',
  CONTENT_PADDING: '34px 27px',
  LANGUAGE_PADDING: '24px 57px',
  LOGO_SIZE: { width: 34, height: 40 },
  COLORS: {
    BACKGROUND: '#F5F5F6',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    BORDER: '#E1E1E2',
    PRIMARY: '#F4762A',
    GRAY: '#919192',
    HOVER: 'rgba(0, 0, 0, 0.04)',
    LANGUAGE_HOVER: 'rgba(244, 118, 42, 0.08)'
  },
  TYPOGRAPHY: {
    LOGO_SIZE: '23px',
    MENU_ITEM_SIZE: '24px',
    LANGUAGE_SIZE: '18px'
  }
} as const;

export interface MenuItem {
  label: string;
  value: string;
  link: string;
}

export interface LanguageOption {
  code: string;
  label: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'th', label: 'ไทย' },
  { code: 'en', label: 'English' },
  { code: 'cn', label: '中文' }
] as const;