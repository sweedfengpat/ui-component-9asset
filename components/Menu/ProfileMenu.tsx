import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Collapse, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Popover, Stack, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import { ChevronLeft, ExpandLess, ExpandMore } from "@mui/icons-material";
import { User } from "firebase/auth";
import { getUserName } from "../../Layouts/Profile";
import { MenuItem as IMenuItem } from "../Toolbar";

const MenuSubItem = styled(MenuItem)(({ theme }) => ({
  '.MuiListItemText-primary': {
    fontSize: '1em',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1em',
    }
  }
}));

export interface ProfileMenuProps {
  open: boolean;
  anchorElement: HTMLElement | null;
  user: User | null;
  userInfo: any | null;
  items: {
    auth: IMenuItem[],
    nonauth: IMenuItem [],
  };

  onClose?: () => void;
  onMenuClicked?: (key: string, link?: string) => void;
  onLanguageChanged?: (lang: string) => void;
}

export const ProfileMenu = (props: ProfileMenuProps) => {

  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);
  const [menuType, setMenuType] = useState<'default'|'language'>('default');
  const [opened, setOpened] = useState<string|null>(null);

  const DisplayLanguage: { [index in 'th' | 'en' | 'cn' | string]: string} = {
    'en': 'English',
    'th': 'ไทย',
    'cn': '中文' 
  }

  const loginBasePath = process.env.REACT_APP_DOMAIN
        || process.env.NEXT_PUBLIC_DOMAIN
        || 'https://my.9asset.com';

  useEffect(() => {
    setElementRef(props.anchorElement);
  }, [props.anchorElement]);

  useEffect(() => {
    if (isMobile) {
      props.onClose?.();
    }
  }, [isMobile]);

  const getIsAuth = () => {
    return  props.user !== null || (process.env.NODE_ENV || 'development') === 'development';
  }

  const getName = () => {
    const currentLanguage = i18n.language || 'th';
    console.log(currentLanguage);
    console.log(props.userInfo)
    if (props.userInfo) {
      if(currentLanguage === 'en') {
        return `${props.userInfo.nameEn || '' } ${props.userInfo.lastnameEn || '' }`.trim();
      } else if(currentLanguage === 'cn') {
        return `${props.userInfo.nameCn || '' } ${props.userInfo.lastnameCn || '' }`.trim();
      } else {
        return `${props.userInfo.nameTh || '' } ${props.userInfo.lastnameTh || '' }`.trim();
      }
    }
    else {
      return props.user?.displayName || '9asset';
    }
  }

  const handleLogin = () => {
    props.onMenuClicked?.('login');
  }

  const handleRegister = () => {
    props.onMenuClicked?.('register');
  }

  const handleChangeLanguageClicked = () => {
    setMenuType('language');
  }

  const handleChangeLanguageRequested = (lang: string) => {
    i18n.changeLanguage(lang);
    props.onLanguageChanged?.(lang);
    setMenuType('default');
  }

  const logoutMenu = (<>
    <Divider variant="middle" sx={{ mb: '8px' }} />
    <MenuItem onClick={() => props.onMenuClicked?.('logout')}>
      <ListItemText>{t('Logout')}</ListItemText>
    </MenuItem>
  </>);

  const renderSubMenuItems = (key: string, items?: IMenuItem[]) => {
    if (!items) {
      return null;
    }

    const open = key === opened;

    return (<Collapse in={open} timeout="auto" unmountOnExit>
    {
      items.map((s) => (
        <MenuSubItem key={s.key} onClick={() => props.onMenuClicked?.(s.key, s.link)}>
          <ListItemText inset sx={{ fontSize: '.95rem' }}>{ t(s.text) }</ListItemText>
        </MenuSubItem>
      ))
    }
    </Collapse>);
  }

  const handleMenuItemClicked = (item: IMenuItem) => {
    if (item.items) {
      setOpened(item.key === opened ? null : item.key);
    } else {
      props.onMenuClicked?.(item.key, item.link)
    }
  }

  const renderMenuItems = (items: IMenuItem[]) => {
    return (<>{
      items.map((item, index) => {
        const open = item.key === opened;
        return (
        <React.Fragment key={item.key || index}>
          <MenuItem
            onClick={() => handleMenuItemClicked(item)}
            sx={{
              '&.Mui-disabled': {
                opacity: 1,
              }
            }}
          >
            <ListItemText>{ t(item.text) }</ListItemText>
            { item.items && item.items.length > 0 ? (open ? <ExpandLess /> : <ExpandMore />) : <></> }
          </MenuItem>
          { renderSubMenuItems(item.key, item.items) }
        </React.Fragment>);})
    }</>);
  }

  const renderLoggedInMenu = () => {
    return (<>{renderMenuItems(props.items.auth)}</>);
  }

  const renderNonLoggedInMenu = () => {
    return (<>{renderMenuItems(props.items.nonauth)}</>);;
  }

  const renderNonAuthMenu = () => (
    <ListItem component="div" disablePadding>
      <ListItemButton component="a"
        sx={{ textAlign: 'center', marginRight: '10px' }}
        onClick={handleLogin}
      >
        <ListItemText
          primary={t('Sign in')}
          primaryTypographyProps={{
            color: '#f4762a',
            fontWeight: 'medium',
            variant: 'body1',
          }}
        />
      </ListItemButton>
        { t('or') }
      <ListItemButton component="a" 
        sx={{ textAlign: 'center', marginLeft: '10px' }}
        onClick={handleRegister}
      >
        <ListItemText
          primary={t('Sign up')}
          primaryTypographyProps={{
            color: '#f4762a',
            fontWeight: 'medium',
            variant: 'body1',
          }}
        />
      </ListItemButton>
    </ListItem>
  );

  const renderAuthMenu = () => {
    return (
    <ListItem alignItems="center" sx={{ py: 0 }}>
      <ListItemAvatar sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar>{ getUserName(props.user) }</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={getName()}
        // secondary={props.user && props.user.email ? props.user.email : ''}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
        <Stack direction="column" sx={{ p:0 }}>
          <Box sx={{ display: 'inline-flex' }}>
            <Typography component="span" sx={{ fontSize: '12px', fontStyle: props.userInfo?.email ? 'normal' : 'italic' }}>{props.userInfo && props.userInfo.email ? props.userInfo.email : 'no email'}</Typography>
            { props.userInfo?.emailVerified  && <Typography component="span" sx={{ fontSize: '12px', pl: 1 }} color="green">{'Verified'}</Typography> }
          </Box>
          <Typography component="span" sx={{ fontSize: '10px' }} color="primary">150 Coins</Typography>
        </Stack>
        }
      />
    </ListItem>
    );
  }

  const renderCommonMenu = () => {
    const currentLanguage = DisplayLanguage[i18n.language || 'th'];

    return (<>
      <Divider variant="middle" sx={{ mb: '8px' }} />
      <MenuItem onClick={handleChangeLanguageClicked}>
        <ListItemText>{t('Language')}</ListItemText>
        <ListItemIcon sx={{ textAlign: 'right', display: 'block' }}>{currentLanguage}</ListItemIcon>
      </MenuItem>
    </>);
  }

  const renderMenuDetail = () => {
    const isAuth = getIsAuth();
    return menuType === 'default' ? (
    <List
      sx={{
        width: '100%',
        minWidth: 300,
        maxWidth: isMobile ? undefined : 360,
        bgcolor: theme.palette.background.paper
      }}
      subheader={
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ marginTop: '5px', px: 1 }}>
          <ListSubheader sx={{ lineHeight: '30px', px: 0 }}>
            {t('My Account')}
          </ListSubheader>
        </Stack>
      }
    >
      { isAuth ? renderAuthMenu() : renderNonAuthMenu() }
      { isAuth ? renderLoggedInMenu() : renderNonLoggedInMenu() }
      {/* { renderCommonMenu() } */}
      { isAuth && logoutMenu }
    </List>
    ) : (
    <List
      sx={{
        width: '100%',
        minWidth: 300,
        maxWidth: isMobile ? undefined : 360,
        bgcolor: theme.palette.background.paper
      }}
      subheader={
        <ListItem component="div" disablePadding onClick={(e: any) => setMenuType('default')}>
          <ListItemButton>
            <ListItemIcon><ChevronLeft /></ListItemIcon>
            <ListItemText primaryTypographyProps={{
                color: 'default',
                variant: 'subtitle2',
                fontSize: '1.1em'
            }}>{t('Language')}</ListItemText>
          </ListItemButton>
        </ListItem>
      }
    >
      <ListItem component="div" dense sx={{ py: 0 }}>
            <ListItemButton onClick={() => handleChangeLanguageRequested('en')} >
              <ListItemText primaryTypographyProps={{ fontSize: '1em' }}>{DisplayLanguage['en']}</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem component="div" dense sx={{ py: 0 }}>
            <ListItemButton onClick={() => handleChangeLanguageRequested('cn')} >
              <ListItemText primaryTypographyProps={{ fontSize: '1em' }}>{DisplayLanguage['cn']}</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem component="div" dense sx={{ py: 0 }}>
            <ListItemButton onClick={() => handleChangeLanguageRequested('th')} >
              <ListItemText primaryTypographyProps={{ fontSize: '1em' }}>{DisplayLanguage['th']}</ListItemText>
            </ListItemButton>
          </ListItem>
    </List>);
  }

  const handlePopoverClose = () => {
    props.onClose && props.onClose();
  }

  const renderMenu = () => {
    return (
    <Popover
      open={elementRef !== null && props.open}
      anchorEl={elementRef}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      onClose={handlePopoverClose}
    >
      { renderMenuDetail() }
    </Popover>);
  }

  return (<>{ renderMenu() }</>);
}