import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LogoSection } from '../LogoSection';

export interface DrawerHeaderProps {
  onClose: () => void;
  showPostFree?: boolean;
  backgroundColor?: string;
  padding?: string;
  logoProps?: {
    logoWidth?: number;
    logoHeight?: number;
    gap?: string;
    fontSize?: string;
    fontWeight?: number;
  };
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  onClose,
  showPostFree = true,
  backgroundColor = '#F5F5F6',
  padding = '16px 27px',
  logoProps = {}
}) => {
  const { t } = useTranslation('common');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: padding,
        backgroundColor: backgroundColor,
      }}
    >
      {/* Logo Section */}
      <LogoSection {...logoProps} />

      {/* Right section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {/* Post Free Link */}
        {showPostFree && (
          <Typography
            component="a"
            sx={{
              fontFamily: 'Prompt',
              fontWeight: 400,
              fontSize: '19px',
              lineHeight: 1.3,
              color: '#000000',
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': {
                color: '#F4762A'
              }
            }}
            href="/seller"
          >
            {t('post_free')}
          </Typography>
        )}

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
  );
}; 