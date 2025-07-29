import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface CloseIconProps {
  size?: number;
  color?: string;
  sx?: SxProps<Theme>;
}

export const CloseIcon: React.FC<CloseIconProps> = ({ 
  size = 17, 
  color = '#919192',
  sx 
}) => (
  <Box
    sx={{
      position: 'relative',
      width: `${size}px`,
      height: `${size}px`,
      ...sx
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${size}px`,
        height: '2px',
        backgroundColor: color,
        transform: 'translate(-50%, -50%) rotate(45deg)'
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${size}px`,
        height: '2px',
        backgroundColor: color,
        transform: 'translate(-50%, -50%) rotate(-45deg)'
      }}
    />
  </Box>
);