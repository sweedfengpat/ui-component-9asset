import React from "react";
import { Box, Button, Grid, IconButton, Link, Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AppsRounded } from "@mui/icons-material";
import { Profile } from "../../Layouts/Profile";
import { AdvanceSearch } from "../../Layouts/MainLayoutAppBar";
import { User } from "firebase/auth";
import { MenuItem, menubar } from ".";

export interface DesktopToolbarProps {
  namespace: string;
  logoPath?: string;
  menuItems: {
    auth: MenuItem[];
    nonauth: MenuItem[];
  };

  user: User | null;
  userInfo: any | null;

  onProfileMenuClick?: (type: string, link?: string) => void;
  onToolbarMenuClick?: (type: string) => void;
  onLanguageChanged?: (ln: string) => void;
}

export const DesktopToolbar = (props: DesktopToolbarProps) => {
  const { t, i18n } = useTranslation(props.namespace);
  const [logoPath, ] = useState<string|undefined>(props.logoPath);

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

  const onMenuClick = (type: 'project' | 'sell' | 'rent') => {
    props.onToolbarMenuClick && props.onToolbarMenuClick(type);
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
        color="#fff"
        underline="hover"
        href={item.link}
        sx={{ mx:'10px', fontSize: '0.95rem' }}
      >
        {item.text}
      </Link>
    ));
  }

  return (<>
  <Toolbar sx={{ display: { xs: 'none', sm: 'flex' } }}>
    <a href ={ '/' }>
        <img src={logoPath} style={{ height: '40px' }} alt="'9asset Logo'" />
    </a>

    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, pl: 2 }}>
      { linkComponent('sell') }
      { linkComponent('rent') }
      { linkComponent('project') }
      <Box component={"div"} sx={{ marginTop: '-10px', position: 'absolute', left: '275px', width: '450px' }}>
        <AdvanceSearch />
      </Box>
    </Box>

    <Box component={"div"} sx={{ flexGrow: 1 }} />

    <Box component={"div"}>
      <Button variant="text" sx={{ textTransform: 'none' }} onClick={() => handleMenuClicked('seller')}>Seller Center</Button>
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