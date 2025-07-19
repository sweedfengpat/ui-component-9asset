import React from 'react';
import { Box, Typography, Divider, IconButton, Button, Drawer, Avatar, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { DrawerHeader } from '../..';
import { getUserName } from '../../Layouts/Profile';
import { buildImageUrl } from '../../../utils/utils';

interface TabletProfileMenuProps {
  open: boolean;
  user: any | null;
  userInfo?: any | null;
  onClose: () => void;
  onMenuItemClick: (type: string) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogoutClick?: () => void;
}

export const TabletProfileMenu: React.FC<TabletProfileMenuProps> = ({
  open,
  user,
  userInfo,
  onClose,
  onMenuItemClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick
}) => {
  const { t, i18n } = useTranslation('common');

  const menuItems = [
    { 
      label: t('my_requirements'), 
      value: 'requirements'
    },
    { 
      label: t('interested_properties'), 
      value: 'interested'
    },
    { 
      label: t('recently_viewed'), 
      value: 'recently'
    },
    { 
      label: t('appointments'), 
      value: 'appointment'
    },
    { 
      label: t('inquiries'), 
      value: 'inquiry'
    }
  ];

  // Helper function to get user display name based on locale
  const getUserDisplayName = () => {
    const currentLanguage = i18n.language || 'th';
    if (userInfo) {
      if (currentLanguage === 'en') {
        return `${userInfo.nameEn || ''} ${userInfo.lastnameEn || ''}`.trim();
      } else if (currentLanguage === 'cn') {
        return `${userInfo.nameCn || ''} ${userInfo.lastnameCn || ''}`.trim();
      } else {
        return `${userInfo.nameTh || ''} ${userInfo.lastnameTh || ''}`.trim();
      }
    }
    return user?.displayName || '9Asset User';
  };

  // Helper function to get user avatar
  const getUserAvatar = () => {
    // Try to get from userInfo.photoUrl first
    if (userInfo?.photoUrl) {
      return userInfo.photoUrl;
    }
    
    // Try to build from firebase_uid if available
    if (userInfo?.firebase_uid) {
      return buildImageUrl({
        fileName: `${userInfo.firebase_uid}.jpeg`,
        bucketName: 'staging-user-service-bucket',
        galleryPath: 'user-images',
        width: 100,
        height: 100,
      });
    }

    // Return null to show letter avatar
    return null;
  };

  const handleLogoutClick = () => {
    onClose();
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      // Default logout behavior
      window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URL_BASE}/logout`;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        display: { xs: 'block', lg: 'none' },
        '& .MuiDrawer-paper': {
          width: '100vw',
          backgroundColor: '#FFFFFF',
          boxSizing: 'border-box',
        },
      }}
    >
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <DrawerHeader onClose={onClose} />

        {/* User Profile Section - Show if user is logged in */}
        {user && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '24px 27px',
              gap: '16px'
            }}
          >
            {/* User Avatar */}
            <Avatar
              src={getUserAvatar()}
              sx={{
                width: 60,
                height: 60,
                fontSize: '24px',
                fontWeight: 500,
                bgcolor: '#F4762A'
              }}
            >
              {getUserName(user)}
            </Avatar>

            {/* User Info */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'Prompt',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: 1.3,
                  color: '#000000',
                  mb: '4px'
                }}
              >
                {getUserDisplayName()}
              </Typography>
              
              <Typography
                sx={{
                  fontFamily: 'Prompt',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: 1.3,
                  color: '#919192',
                  mb: '4px'
                }}
              >
                {userInfo?.email || user?.email || 'ไม่มีอีเมล'}
              </Typography>

              {/* Coins/Points */}
              <Typography
                sx={{
                  fontFamily: 'Prompt',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: 1.3,
                  color: '#F4762A'
                }}
              >
                150 เหรียญ
              </Typography>
            </Box>
          </Box>
        )}

        {/* Login/Register Section - Only show if user is not logged in */}
        {!user && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '24px',
              padding: '40px 27px'
            }}
          >
            {/* เข้าสู่ระบบ Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#F4762A',
                borderRadius: '40px',
                padding: '12px 22px',
                textTransform: 'none',
                color: '#FFFFFF',
                fontFamily: 'Prompt',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.3,
                '&:hover': {
                  backgroundColor: '#d6631e',
                },
                boxShadow: 'none',
              }}
              onClick={onLoginClick}
            >
              {t('login')}
            </Button>

            {/* หรือ Text */}
            <Typography
              sx={{
                fontFamily: 'Prompt',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: 1.3,
                color: '#919192'
              }}
            >
              {t('or')}
            </Typography>

            {/* ลงทะเบียน Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#E1E1E2',
                borderRadius: '40px',
                padding: '12px 22px',
                textTransform: 'none',
                color: '#000000',
                fontFamily: 'Prompt',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.3,
                '&:hover': {
                  backgroundColor: '#d0d0d0',
                },
                boxShadow: 'none',
              }}
              onClick={onRegisterClick}
            >
              {t('register')}
            </Button>
          </Box>
        )}

        {/* Divider line */}
        {(user || !user) && (
          <Box
            sx={{
              position: 'relative',
              height: '0px',
              margin: '0 27px',
              borderTop: '1px solid #E1E1E2'
            }}
          />
        )}

        {/* Menu Items */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            padding: '40px 27px',
            flex: 1
          }}
        >
          {menuItems.map((item, index) => (
            <Typography
              key={item.value}
              onClick={() => onMenuItemClick(item.value)}
              sx={{
                fontFamily: 'Prompt',
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: 1.3,
                color: '#000000',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#F4762A'
                }
              }}
            >
              {item.label}
            </Typography>
          ))}

          {/* Logout Button - Show only if user is logged in */}
          {user && (
            <Box
              sx={{
                marginTop: 'auto',
                paddingTop: '20px',
                borderTop: '1px solid #E1E1E2',
              }}
            >
              <Button
                onClick={handleLogoutClick}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#F4762A',
                  borderRadius: '40px',
                  padding: '12px 22px',
                  textTransform: 'none',
                  color: '#FFFFFF',
                  fontFamily: 'Prompt',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  '&:hover': {
                    backgroundColor: '#cc3333',
                  },
                  boxShadow: 'none',
                }}
              >
                {t('logout')}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}; 