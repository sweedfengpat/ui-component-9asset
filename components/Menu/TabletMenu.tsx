import React from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

interface TabletMenuProps {
  open: boolean;
  onClose: () => void;
  onMenuItemClick: (type: string) => void;
}

export const TabletMenu: React.FC<TabletMenuProps> = ({
  open,
  onClose,
  onMenuItemClick
}) => {
  const { t } = useTranslation('common');

  const menuItems = [
    { 
      label: t('sell'), 
      value: 'sell',
      link: `/${t('sell')}`
    },
    { 
      label: t('rent'), 
      value: 'rent',
      link: `/${t('rent')}`
    },
    { 
      label: t('project'), 
      value: 'project',
      link: `/${t('project')}`
    },
    { 
      label: 'จำนองขายฝาก', 
      value: 'mortgage',
      link: '/mortgage'
    },
    { 
      label: t('article'), 
      value: 'article',
      link: '/article'
    },
    { 
      label: 'ตัวแทน', 
      value: 'agent',
      link: '/agent'
    }
  ];

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#F5F5F6',
        zIndex: 1300,
        width: '100vw',
        height: '100vh',
        display: { xs: 'none', sm: 'flex', lg: 'none' },
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
          borderBottom: '1px solid #E1E1E2'
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

      {/* Menu Items */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          padding: '64px 57px',
          flex: 1
        }}
      >
        {menuItems.map((item, index) => (
          <React.Fragment key={item.value}>
            <Box
              onClick={() => onMenuItemClick(item.value)}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '10px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderRadius: '8px'
                }
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Prompt',
                  fontWeight: 500,
                  fontSize: '28px',
                  lineHeight: 1.3,
                  color: '#000000',
                  textAlign: 'center'
                }}
              >
                {item.label}
              </Typography>
            </Box>
            
            {/* Divider - don't show after last item */}
            {index < menuItems.length - 1 && (
              <Divider
                sx={{
                  borderColor: '#E1E1E2',
                  width: '100%',
                  margin: 0
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}; 