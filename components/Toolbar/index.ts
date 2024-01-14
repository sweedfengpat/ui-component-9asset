export interface MenuItem {
  key: string;
  text: string;
  link?: string;
  items?: MenuItem[];
}

export const menubar = (t: any, lang: string) => {
  const langUrl = lang === 'th' ? '' : `/${lang}`
  return [
    { text: t('condo'), link: `${langUrl}/${t('all')}/${t('condo')}`},
    { text: t('house'), link: `${langUrl}/${t('all')}/${t('house')}`},
    { text: t('townhouse'), items: [],  link: `${langUrl}/${t('all')}/${t('townhouse')}` },
    { text: t('commercial'), items: [],  link: `${langUrl}/${t('all')}/${t('commercial')}` },
    { text: t('homeoffice'), items: [], link: `${langUrl}/${t('all')}/${t('homeoffice')}` },
    { text: t('twinhome'), items: [],  link: `${langUrl}/${t('all')}/${t('twinhome')}` },
    { text: t('apartment'), items: [], link: `${langUrl}/${t('all')}/${t('apartment')}` },
    { text: t('land'), items: [], link: `/${langUrl}${t('all')}/${t('land')}` }
  ];
}