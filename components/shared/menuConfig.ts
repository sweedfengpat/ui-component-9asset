import { TFunction } from 'next-i18next';

export interface MenuItemConfig {
  key: string;
  labelKey: string;
  linkKey: string;
  enabled: boolean;
  platforms: ('desktop' | 'tablet' | 'mobile')[];
}

export const MENU_ITEMS_CONFIG: MenuItemConfig[] = [
  {
    key: 'sell',
    labelKey: 'sell',
    linkKey: 'link.sell',
    enabled: true,
    platforms: ['desktop', 'tablet', 'mobile']
  },
  {
    key: 'rent',
    labelKey: 'rent',
    linkKey: 'link.rent',
    enabled: true,
    platforms: ['desktop', 'tablet', 'mobile']
  },
  {
    key: 'lease',
    labelKey: 'lease',
    linkKey: 'link.lease',
    enabled: false, // Disabled based on recent change
    platforms: ['tablet', 'mobile'] // Only show on tablet/mobile if enabled
  },
  {
    key: 'mortgageOrRedemption',
    labelKey: 'link.mortgageOrRedemption',
    linkKey: 'link.mortgageOrRedemption',
    enabled: true,
    platforms: ['desktop', 'tablet', 'mobile']
  },
  {
    key: 'project',
    labelKey: 'project',
    linkKey: 'link.project',
    enabled: true,
    platforms: ['desktop', 'tablet', 'mobile']
  },
  {
    key: 'article',
    labelKey: 'article',
    linkKey: 'link.article',
    enabled: true,
    platforms: ['desktop', 'tablet', 'mobile']
  }
];

export const getMenuItemsForPlatform = (
  platform: 'desktop' | 'tablet' | 'mobile',
  t: TFunction
) => {
  return MENU_ITEMS_CONFIG
    .filter(item => item.enabled && item.platforms.includes(platform))
    .map(item => ({
      label: t(item.labelKey),
      value: item.key,
      link: `/${t(item.linkKey)}`
    }));
};