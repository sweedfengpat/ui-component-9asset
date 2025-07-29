import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface ArrowLeftIconProps {
  size?: number;
  color?: string;
  sx?: SxProps<Theme>;
}

export const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ 
  size = 12, 
  color = '#000000',
  sx 
}) => (
  <Box
    sx={{
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...sx
    }}
  >
    <Box
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        borderLeft: `2px solid ${color}`,
        borderBottom: `2px solid ${color}`,
        transform: 'rotate(45deg)'
      }}
    />
  </Box>
);