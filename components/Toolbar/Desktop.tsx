import React from "react";
import {
  Box, Button, Grid, Link, Menu, MenuItem as MItem, Toolbar,
  SvgIcon, Typography, IconButton
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Profile } from "../../Layouts/Profile";
import { AdvanceSearch } from "../../Layouts/AdvanceSearch";
import { User } from "firebase/auth";
import { MenuItem, menubar } from ".";
import { UserInfo } from "../../store/users/reducer";
import { LanguageOutlined, FavoriteBorderOutlined, KeyboardArrowDownOutlined, AccountCircleOutlined, EditOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

export interface DesktopToolbarProps {
  namespace: string;
  logoPath?: string;
  menuItems: {
    auth: MenuItem[];
    nonauth: MenuItem[];
  };

  user: User | null;
  userInfo: UserInfo | null;

  hideSellerCenter?: boolean;

  onProfileMenuClick?: (type: string, link?: string) => void;
  onToolbarMenuClick?: (type: string) => void;
  onLanguageChanged?: (ln: string) => void;
}

export const DesktopToolbar = (props: DesktopToolbarProps) => {
  const { t, i18n } = useTranslation(props.namespace);
  const [logoPath,] = useState<string | undefined>(props.logoPath);
  const router = useRouter();
  const [isHomePage, setIsHomePage] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    // ตรวจสอบว่าอยู่ที่หน้าหลักหรือไม่
    const path = router.pathname;
    setIsHomePage(path === "/" || path === `/${i18n.language}` || path === `/${i18n.language}/`);
  }, [router.pathname, i18n.language]);

  const getUserDisplayName = () => {
    if (!i18n.language) {
      return '';
    }

    const user = props.userInfo;
    const lang = i18n.language.toLowerCase();
    if (lang === 'en') {
      return user && user.nameEn ? user.lastnameEn : '';
    } else if (lang === 'cn') {
      return user && user.nameCn ? user.lastnameCn : '';
    } else if (lang === 'th') {
      return user && user.nameTh ? user.lastnameTh : '';
    } else {
      return user && user.displayName ? user.displayName : '';
    }
  }

  const handleMenuClicked = (type: string, link?: string) => {
    switch (type) {
      case 'login':
      case 'register':
      case 'logout':
        props.onProfileMenuClick?.(type, link);
        break;
      default:
        props.onProfileMenuClick?.(type, link);
        break;
    }
  }

  const getUrl = (type: string, link: string) => {
    if (type === 'article') {
      return `${i18n.language === 'th' ? '' : i18n.language}/${type}`;
    }
    if (type === 'mortgageOrRedemption') {
      const action: { [key: string]: string } = {
        'th': 'จำนองขายฝาก',
        'en': 'Provide%20Property%20Mortgage%20Loan',
        'cn': '提供房地产抵押贷款'
      }
      // @ts-ignore
      return `${i18n.language === 'th' ? '' : i18n.language}/${action[`${i18n.language}`] || action['th']}/${t('estate')}`;
    }
    return i18n.language === 'th' ? `/${t(link).replace('/', '')}/${t('estate')}` : `/${i18n.language}/${t(link).replace('/', '')}/${t('estate')}`;
  }

  const linkComponent = (type: string, link: string) => (
    <Link
      sx={{ fontSize: '1.4rem', pl: 0, pr: 2 }}
      color={isHomePage ? "#fff" : "#000"}
      underline="none"
      href={getUrl(type, link)}
    >
      {t(type)}
    </Link>
  );

  const renderMenuBar = () => {
    const items = menubar(t, i18n.language);
    return items.map((item, index) => (
      <Link
        key={index}
        color="#fff"
        underline="hover"
        href={item.link}
        sx={{ mx: '10px', fontSize: '0.95rem' }}
      >
        {item.text}
      </Link>
    ));
  }

  const getCurrentLanguageText = () => {
    const lang = {
      'en': 'English',
      'th': 'ไทย',
      'cn': '中文'
    };
    return lang[i18n.language as 'en' | 'th' | 'cn'];
  }

  const handleLanguageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChanged = (lang: 'en' | 'cn' | 'th') => {
    props.onLanguageChanged?.(lang);
    setAnchorEl(null);
  }

  // Logo SVG component
  const LogoIcon = () => (
    <SvgIcon>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clipPath="url(#clip0_6451_1350)">
          <path d="M4.37553 2.47127C5.2231 2.43773 6.07517 2.46501 6.923 2.46927C7.58847 2.60745 7.56424 3.59401 6.89052 3.68589C6.30524 3.76574 5.48214 3.66936 4.86089 3.68764C4.1592 3.70842 2.75257 3.74822 2.1478 4.08016C1.268 4.56305 1.35219 6.14565 1.31846 7.0133C1.25551 8.64097 1.2053 10.4604 1.31721 12.0815C1.42088 13.5845 1.50132 14.3866 3.14301 14.6307C4.86639 14.887 7.19878 14.7799 8.96212 14.7113C9.81219 14.6782 11.3944 14.7531 11.8883 13.9177C12.2657 13.2791 12.2972 11.873 12.3192 11.123C12.3362 10.5485 12.2273 9.57521 12.3347 9.06428C12.4668 8.43519 13.4498 8.45847 13.5407 9.12736C13.6209 9.7174 13.567 10.8376 13.5457 11.4687C13.5135 12.4287 13.4408 13.72 12.9469 14.5561C12.193 15.8325 10.6693 15.8773 9.34557 15.9404C7.66466 16.0203 5.93254 16.0195 4.25088 15.9404C1.75087 15.823 0.40594 15.47 0.129161 12.6961C-0.0464491 10.9355 -0.011477 8.67977 0.0507235 6.89465C0.0879438 5.82598 0.170878 4.35152 0.896549 3.51716C1.69891 2.59494 3.23169 2.51633 4.37553 2.47102V2.47127Z" fill="white" />
          <path d="M13.4191 0.0110135C13.6012 -0.0185257 13.7573 0.0105128 13.9084 0.116654L15.8824 2.09478C16.035 2.30806 16.0367 2.58243 15.8994 2.80397L8.36761 10.3517C8.28392 10.4066 8.18125 10.4386 8.08208 10.4496C7.62295 10.5012 6.6752 10.4864 6.20233 10.4511C5.83537 10.4238 5.60356 10.2376 5.57008 9.85559C5.53261 9.43052 5.51987 8.42043 5.57058 8.00939C5.58832 7.8652 5.69623 7.70899 5.74569 7.5703L13.1598 0.134928C13.2275 0.0730959 13.3299 0.0252824 13.4191 0.0107632V0.0110135ZM13.5302 1.50249L12.5887 2.47403L13.5582 3.41754L14.4997 2.446L13.5302 1.50249ZM6.79836 9.22024H7.77583L12.6459 4.34176V4.26566L11.6907 3.34619L6.79836 8.24069V9.22024Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_6451_1350">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );

  return (<>
    <Toolbar sx={{
      display: { xs: 'none', sm: 'flex' },
      maxHeight: '96px',
      backgroundColor: isHomePage ? 'transparent' : '#fff',
      padding: '16px 0px !important',
      width: '100%',
      fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    }}>
      <a href={`/${i18n.language !== 'th' ? i18n.language : ''}`} style={{ marginLeft: '16px' }}>
        <img src={logoPath} style={{ height: '64px', width: '54px' }} alt="'9asset Logo'" />
      </a>

      <Box sx={{ flexGrow: 1, alignItems: 'center', display: { xs: 'none', sm: 'flex' }, pl: '32px' }}>
        {linkComponent('sell', 'link.sell')}
        {linkComponent('rent', 'link.rent')}
        {linkComponent('project', 'link.project')}
        {linkComponent('mortgageOrRedemption', 'link.mortgageOrRedemption')}
        {linkComponent('article', 'link.article')}
        {linkComponent('agent', 'link.lease')}
      </Box>

      <Box component={"div"} sx={{ flexGrow: 1 }} />

      <Box component={"div"} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {/* ทรัพย์ที่สนใจ */}
        <Button
          variant="outlined"
          sx={{
            borderRadius: '40px',
            border: `1px solid ${isHomePage ? '#fff' : '#000'}`,
            padding: '12px 16px',
            textTransform: 'none',
            color: isHomePage ? '#fff' : '#000',
            fontFamily: 'inherit',
            fontSize: '16px',
          }}
          endIcon={<FavoriteBorderOutlined />}
        >
          {t('ทรัพย์ที่สนใจ')}
        </Button>

        {/* ลงประกาศฟรี (แทน ศูนย์ผู้ขาย) */}
        {!props.hideSellerCenter && (
          <Button
            variant="contained"
            sx={{
              borderRadius: '40px',
              padding: '12px 16px',
              textTransform: 'none',
              backgroundColor: '#F4762A',
              color: '#fff',
              fontFamily: 'inherit',
              fontSize: '16px',
              '&:hover': {
                backgroundColor: '#d6631e',
              },
              boxShadow: 'none',
            }}
            endIcon={<LogoIcon />}
            href="/seller"
          >
            {t('ลงประกาศฟรี')}
          </Button>
        )}

        {/* ปุ่มเปลี่ยนภาษา */}
        <Box
          component={"div"}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={handleLanguageClick}
        >
          <Typography
            sx={{
              fontFamily: 'inherit',
              fontSize: '16px',
              color: isHomePage ? '#fff' : '#000',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {getCurrentLanguageText()}
            <KeyboardArrowDownOutlined sx={{ ml: 0.5 }} />
          </Typography>
        </Box>

        {/* Profile Icon */}
        <Box component={"div"} sx={{ display: 'flex' }}>
          <Profile
            user={props.user}
            userInfo={props.userInfo}
            menuItems={props.menuItems}
            onMenuClicked={handleMenuClicked}
            onLanguageChanged={props.onLanguageChanged}
          />
        </Box>
      </Box>

      {/* Language Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleLanguageClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          sx: {
            fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
          }
        }}
      >
        <MItem selected={i18n.language === 'th'} onClick={() => handleLanguageChanged('th')}>ไทย</MItem>
        <MItem selected={i18n.language === 'en'} onClick={() => handleLanguageChanged('en')}>English</MItem>
        <MItem selected={i18n.language === 'cn'} onClick={() => handleLanguageChanged('cn')}>中文</MItem>
      </Menu>
    </Toolbar>
  </>);
}