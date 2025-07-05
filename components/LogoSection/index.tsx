import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export interface LogoSectionProps {
  logoWidth?: number;
  logoHeight?: number;
  gap?: string;
  fontSize?: string;
  fontWeight?: number;
  textColor?: string;
  logoSrc?: string;
  logoAlt?: string;
  companyName?: string;
}

export const LogoSection: React.FC<LogoSectionProps> = ({
  logoWidth = 34,
  logoHeight = 40,
  gap = '16px',
  fontSize = '23px',
  fontWeight = 500,
  textColor = '#000000',
  logoSrc = '/assets/single-logo.png',
  logoAlt = '9asset logo',
  companyName = '9asset'
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: gap
      }}
    >
      <Image
        src={logoSrc}
        alt={logoAlt}
        width={logoWidth}
        height={logoHeight}
      />
      <Typography
        sx={{
          fontFamily: 'Prompt',
          fontWeight: fontWeight,
          fontSize: fontSize,
          lineHeight: 1.3,
          color: textColor
        }}
      >
        {companyName}
      </Typography>
    </Box>
  );
}; 