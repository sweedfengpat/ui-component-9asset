import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Collapse, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Popover, Stack, Typography, styled, useMediaQuery, useTheme, Button, Card, CardContent } from "@mui/material";
import { ChevronLeft, ExpandLess, ExpandMore, PersonOutlined, LoginOutlined, AppRegistrationOutlined, Close, FavoriteBorderOutlined, HistoryOutlined, CalendarTodayOutlined, HelpOutlineOutlined, AssignmentOutlined } from "@mui/icons-material";
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

// Modern styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  border: 'none',
  overflow: 'visible',
  width: '300px',
  fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  textTransform: 'none',
  fontWeight: 500,
  padding: '8px 16px',
  fontSize: '14px',
  transition: 'all 0.2s ease',
  height: '36px',
  fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  '&:hover': {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  }
}));

const ProfileMenuHeader = styled(Box)(({ theme }) => ({
  padding: '12px 20px',
  borderBottom: '1px solid #f0f0f0',
  background: '#F5F5F6',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
}));

const MenuItemStyled = styled(ListItemButton)(({ theme }) => ({
  padding: '8px 20px',
  minHeight: '40px',
  '&:hover': {
    backgroundColor: 'rgba(244, 118, 42, 0.04)',
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
    const allowDevLogin = process.env.NEXT_PUBLIC_ALLOW_DEV_LOGIN === 'true';
    return  props.user !== null || (allowDevLogin && (process.env.NODE_ENV || 'development') === 'development');
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

  // Header ตาม Figma design
  const renderFigmaHeader = () => (
    <ProfileMenuHeader>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Logo และชื่อ */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            component="img"
            src="/assets/9asset-logo.png"
            alt="9asset logo"
            loading="lazy"
            sx={{ 
              width: 24, 
              height: 24, 
              borderRadius: '20px',
              objectFit: 'contain'
            }}
          />
          <Typography 
            sx={{ 
              fontSize: '16px', 
              fontWeight: 500, 
              color: '#1a1a1a',
              fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
            }}
          >
            9asset
          </Typography>
        </Box>

        {/* ลงประกาศฟรี และปุ่มปิด */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
          <Typography 
            sx={{ 
              fontSize: '12px', 
              color: '#666',
              fontWeight: 400,
              fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
            }}
          >
            ลงประกาศฟรี
          </Typography>
          <Box 
            onClick={props.onClose}
            sx={{ 
              width: 20, 
              height: 20, 
              borderRadius: '50%',
              bgcolor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: '#e0e0e0'
              }
            }}
          >
            <Close sx={{ fontSize: 14, color: '#666' }} />
          </Box>
        </Box>
      </Stack>
    </ProfileMenuHeader>
  );

  // ปุ่มเข้าสู่ระบบและลงทะเบียนตาม Figma
  const renderAuthButtons = () => (
    <Box sx={{ padding: '16px 20px' }}>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr auto 1fr', 
        alignItems: 'center', 
        gap: 1 
      }}>
        {/* ปุ่มเข้าสู่ระบบ */}
        <StyledButton
          variant="contained"
          onClick={handleLogin}
          sx={{
            bgcolor: '#f4762a',
            color: 'white',
            '&:hover': {
              bgcolor: '#e8651f',
            }
          }}
        >
          เข้าสู่ระบบ
        </StyledButton>

        {/* ข้อความ "หรือ" */}
        <Typography 
          sx={{ 
            color: '#999',
            fontSize: '12px',
            fontWeight: 400,
            textAlign: 'center',
            px: 1,
            fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          }}
        >
          หรือ
        </Typography>

        {/* ปุ่มลงทะเบียน */}
        <StyledButton
          variant="outlined"
          onClick={handleRegister}
          sx={{
            borderColor: '#d0d0d0',
            color: '#666',
            bgcolor: '#f8f8f8',
            '&:hover': {
              borderColor: '#f4762a',
              bgcolor: 'rgba(244, 118, 42, 0.04)',
              color: '#f4762a',
            }
          }}
        >
          ลงทะเบียน
        </StyledButton>
      </Box>
    </Box>
  );

  // เมนูรายการตาม Figma design
  const renderMenuList = () => {
    const menuItems = [
      {
        key: 'requirements',
        text: 'ความต้องการของฉัน'
      },
      {
        key: 'interested',
        text: 'ทรัพย์ที่สนใจ'
      },
      {
        key: 'recently',
        text: 'รายการที่ดูล่าสุด'
      },
      {
        key: 'appointment',
        text: 'นัดชม'
      },
      {
        key: 'inquiry',
        text: 'สอบถาม'
      }
    ];

    return (
      <Box>
        {menuItems.map((item, index) => (
          <MenuItemStyled 
            key={item.key}
            onClick={() => props.onMenuClicked?.(item.key)}
          >
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#333',
                fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
              }}
            />
          </MenuItemStyled>
        ))}
      </Box>
    );
  };

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
    <StyledCard>
      {/* Header ตาม Figma */}
      {renderFigmaHeader()}
      
      {/* Content */}
      {isAuth ? (
        // Logged in content
        <List sx={{ py: 1 }}>
          {renderLoggedInMenu()}
          {logoutMenu}
        </List>
      ) : (
        // Non-auth content ตาม Figma
        <Box>
          {renderAuthButtons()}
          <Divider sx={{ mx: 2, my: 1 }} />
          <Box sx={{ py: 1 }}>
            {renderMenuList()}
          </Box>
        </Box>
      )}
    </StyledCard>
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
      PaperProps={{
        sx: {
          mt: 1,
          overflow: 'visible',
          borderRadius: '20px',
        },
      }}
    >
      { renderMenuDetail() }
    </Popover>);
  }

  return (<>{ renderMenu() }</>);
}