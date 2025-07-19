import React from 'react';
import { Box, Typography, Divider, IconButton, Button, Drawer } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { DrawerHeader } from '../..';

interface TabletProfileMenuProps {
  open: boolean;
  user: any | null;
  onClose: () => void;
  onMenuItemClick: (type: string) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const TabletProfileMenu: React.FC<TabletProfileMenuProps> = ({
  open,
  user,
  onClose,
  onMenuItemClick,
  onLoginClick,
  onRegisterClick
}) => {
  const { t } = useTranslation('common');

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

        {/* Divider line - Only show if user is not logged in */}
        {!user && (
          <Box
            sx={{
              position: 'relative',
              height: '0px',
              margin: '0 57px',
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
        </Box>
      </Box>
    </Drawer>
  );
}; 