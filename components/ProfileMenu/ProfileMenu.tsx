import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Popover, useMediaQuery, useTheme } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

export interface ProfileMenuProps {
  open: boolean;
  anchorElement: HTMLElement | null;

  onClose?: () => void;
  onLoginRequest?: () => void;
  onRegisterRequest?: () => void;
}

export const ProfileMenu = (props: ProfileMenuProps) => {

  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);
  const [menuType, setMenuType] = useState<'default'|'language'>('default');

  const DisplayLanguage: { [index in 'th' | 'en' | 'cn' | string]: string} = {
    'en': 'English',
    'th': 'ไทย',
    'cn': 'Chinese' 
  }
  const loginBasePath = process.env.REACT_APP_DOMAIN
        || process.env.NEXT_PUBLIC_DOMAIN
        || 'https://my.9asset.com';

  useEffect(() => {
    setElementRef(props.anchorElement);
  }, [props.anchorElement]);

  const handleLogin = () => {
    props.onLoginRequest?.();
  }

  const handleRegister = () => {
    props.onRegisterRequest?.();
  }

  const handleChangeLanguageClicked = () => {
    setMenuType('language');
  }

  const handleChangeLanguageRequested = (lang: string) => {

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

  const renderCommonMenu = () => {
    const currentLanguage = (i18n.language || 'th').toUpperCase();

    return (<>
      <Divider variant="middle" sx={{ mb: '8px' }} />
      <MenuItem onClick={handleChangeLanguageClicked}>
        <ListItemText>{t('Language')}</ListItemText>
        <ListItemIcon sx={{ textAlign: 'right', display: 'block' }}>{currentLanguage}</ListItemIcon>
      </MenuItem>
    </>);
  }

  const renderMenuDetail = () => {
    return menuType === 'default' ? (
    <List
      sx={{
        width: '100%',
        minWidth: 300,
        maxWidth: isMobile ? undefined : 360,
        bgcolor: theme.palette.background.paper
      }}
      subheader={
        <ListSubheader
          sx={{ lineHeight: '30px', marginTop: '10px' }}
        >
          {t('My Account')}
      </ListSubheader>}
    >
      { renderNonAuthMenu() }
      { renderCommonMenu() }
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

  const renderDesktopMenu = () => {
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

  return (<>{ renderDesktopMenu() }</>);
}