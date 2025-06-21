import React from 'react';
import { Box, Typography, Divider, IconButton, Button, Drawer } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

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
      label: 'ความต้องการของฉัน', 
      value: 'requirements'
    },
    { 
      label: 'ทรัพย์ที่สนใจ', 
      value: 'interested'
    },
    { 
      label: 'รายการที่ดูล่าสุด', 
      value: 'recently'
    },
    { 
      label: 'นัดชม', 
      value: 'appointment'
    },
    { 
      label: 'สอบถาม', 
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 57px',
            backgroundColor: '#F5F5F6',
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px'
            }}
          >
            <Image
              src="/assets/single-logo.webp"
              alt="9asset logo"
              width={42}
              height={50}
            />
            <Typography
              sx={{
                fontFamily: 'Prompt',
                fontWeight: 500,
                fontSize: '23px',
                lineHeight: 1.3,
                color: '#000000'
              }}
            >
              9asset
            </Typography>
          </Box>

          {/* Right section with "ลงประกาศฟรี" + Close button */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Prompt',
                fontWeight: 400,
                fontSize: '19px',
                lineHeight: 1.3,
                color: '#000000'
              }}
            >
              ลงประกาศฟรี
            </Typography>

            {/* Close Button (X icon) */}
            <IconButton
              onClick={onClose}
              sx={{
                width: '24px',
                height: '16px',
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '17px',
                  height: '17px'
                }}
              >
                {/* X icon using CSS */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '17px',
                    height: '2px',
                    backgroundColor: '#919192',
                    transform: 'translate(-50%, -50%) rotate(45deg)'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '17px',
                    height: '2px',
                    backgroundColor: '#919192',
                    transform: 'translate(-50%, -50%) rotate(-45deg)'
                  }}
                />
              </Box>
            </IconButton>
          </Box>
        </Box>

        {/* Login/Register Section - Only show if user is not logged in */}
        {!user && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '24px',
              padding: '40px 57px'
            }}
          >
            {/* เข้าสู่ระบบ Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#F4762A',
                borderRadius: '40px',
                padding: '12px 32px',
                textTransform: 'none',
                color: '#FFFFFF',
                fontFamily: 'Prompt',
                fontSize: '23px',
                fontWeight: 400,
                lineHeight: 1.3,
                '&:hover': {
                  backgroundColor: '#d6631e',
                },
                boxShadow: 'none',
              }}
              onClick={onLoginClick}
            >
              เข้าสู่ระบบ
            </Button>

            {/* หรือ Text */}
            <Typography
              sx={{
                fontFamily: 'Prompt',
                fontWeight: 400,
                fontSize: '23px',
                lineHeight: 1.3,
                color: '#919192'
              }}
            >
              หรือ
            </Typography>

            {/* ลงทะเบียน Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#E1E1E2',
                borderRadius: '40px',
                padding: '12px 32px',
                textTransform: 'none',
                color: '#000000',
                fontFamily: 'Prompt',
                fontSize: '23px',
                fontWeight: 400,
                lineHeight: 1.3,
                '&:hover': {
                  backgroundColor: '#d0d0d0',
                },
                boxShadow: 'none',
              }}
              onClick={onRegisterClick}
            >
              ลงทะเบียน
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
            padding: '40px 57px',
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
                fontSize: '28px',
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