import React from "react";
import { Box, Button, Grid, Link, Menu, MenuItem as MItem, Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Profile } from "../../Layouts/Profile";
import { AdvanceSearch } from "../../Layouts/AdvanceSearch";
import { User } from "firebase/auth";
import { MenuItem, menubar } from ".";
import { UserInfo } from "../../store/users/reducer";
import { LanguageOutlined } from "@mui/icons-material";

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
  const [logoPath, ] = useState<string|undefined>(props.logoPath);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isAuth = () => {
    return !!props.user;
  }

  const getUserDisplayName = () => {
    if (!i18n.language) {
      return '';
    }

    const user = props.userInfo;
    const lang = i18n.language.toLowerCase();
    if(lang === 'en') {
        return user && user.nameEn ? user.lastnameEn : '' ;
    } else if(lang === 'cn') {
        return user && user.nameCn ? user.lastnameCn : '' ;
    } else if(lang === 'th') {
        return user && user.nameTh ? user.lastnameTh : '' ;
    } else {
        return user && user.displayName ? user.displayName : '' ;
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

  const getUrl = (type: string) => {
    if (type === 'article') {
      return `${i18n.language === 'th' ? '' : i18n.language}/article`;
    }
    return i18n.language === 'th' ? `/${t(type)}/${t('estate')}` : `/${i18n.language}/${t(type)}/${t('estate')}`;
  }

  const linkComponent = (type: string) => (
    <Link
      sx={{ fontSize: '1rem', pl: 0, pr: 3 }}
      color={"#5e5e5e"}
      underline="none"
      href={getUrl(type)}
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
        sx={{ mx:'10px', fontSize: '0.95rem' }}
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

  const handleLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChanged = (lang: 'en' | 'cn' | 'th') => {
    props.onLanguageChanged?.(lang);
    setAnchorEl(null);
  }

  return (<>
  <Toolbar sx={{ display: { xs: 'none', sm: 'flex' } }}>
    <a href ={ `/${i18n.language !== 'th' ? i18n.language : ''}` }>
        <img src={logoPath} style={{ height: '40px' , width: '34px' }} alt="'9asset Logo'" />
    </a>

    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, pl: 2 }}>
      { linkComponent('sell') }
      { linkComponent('rent') }
      { linkComponent('project') }
      { linkComponent('article') }
      <Box component={"div"} sx={{ marginTop: '-10px', position: 'absolute', left: '320px', width: '450px' }}>
        <AdvanceSearch />
      </Box>
    </Box>

    <Box component={"div"} sx={{ flexGrow: 1 }} />

    <Box component={"div"}>
      { !props.hideSellerCenter && <Button
        variant="text"
        sx={{ textTransform: 'none' }}
        href="/seller">{t('menu.sellerCenter')}</Button> }
    </Box>
    <Box component={"div"} sx={{ p: '2px' }}>
      <Button
        variant="outlined"
        size="small"
        sx={{ textTransform: 'none' }}
        startIcon={<LanguageOutlined />}
        onClick={handleLanguageClick}
      >
        { getCurrentLanguageText() }
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleLanguageClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MItem selected={i18n.language === 'th'} onClick={() => handleLanguageChanged('th')}>ไทย</MItem>
        <MItem selected={i18n.language === 'en'} onClick={() => handleLanguageChanged('en')}>English</MItem>
        <MItem selected={i18n.language === 'cn'} onClick={() => handleLanguageChanged('cn')}>中文</MItem>
      </Menu>
    </Box>
    <Box component={"div"} sx={{ marginRight: '10px' }}>
    { isAuth() && getUserDisplayName() }
    </Box>
    {/* <Box component={"div"} sx={{ display: 'flex' }}>
      <IconButton>
        <AppsRounded fontSize="large"  />
      </IconButton>
    </Box> */}
    <Box component={"div"} sx={{ display: 'flex' }}>
      <Profile
        user={props.user}
        userInfo={props.userInfo}
        menuItems={props.menuItems}
        onMenuClicked={handleMenuClicked}
        onLanguageChanged={props.onLanguageChanged}
      />
    </Box>
  </Toolbar>
  <Grid
    container
    direction={'row'} 
    sx={{ 
        background: '#f4762a',
        height: '42px',
        color: '#fffff',
        display: { xs: 'none', sm: 'none', md: 'flex' } 
    }} 
    justifyContent='center'
    alignItems='center'   
  >
    { renderMenuBar() }
  </Grid>
  </>);
}