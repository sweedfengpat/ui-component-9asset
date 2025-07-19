import React from 'react';
import { Box, Typography, IconButton, Drawer } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { LeaveYourRequirement } from '../../../components/LeaveYourRequirement';

interface LeaveYourRequirementDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const LeaveYourRequirementDrawer: React.FC<LeaveYourRequirementDrawerProps> = ({
  open,
  onClose
}) => {
  const { t } = useTranslation('common');

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        display: { xs: 'block', lg: 'none' },
        '& .MuiDrawer-paper': {
          width: '100vw',
          backgroundColor: '#F5F5F6',
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          backgroundColor: '#F5F5F6',
          gap: '32px',
          borderBottom: '1px solid #E1E1E2'
        }}
      >
        {/* Logo and Title */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '54px',
              height: '64px'
            }}
          >
            <Image
              src="/assets/9asset-logo.png"
              alt="9asset logo"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: 'Prompt',
              fontWeight: 500,
              fontSize: '23px',
              lineHeight: '30px',
              color: '#000000'
            }}
          >
            {t('help_me_find')}
          </Typography>
        </Box>

        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            width: '24px',
            height: '16px',
            padding: 0
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

      {/* Content - Use existing LeaveYourRequirement component */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          '& .ant-card': {
            width: '100%',
            border: 'none',
            boxShadow: 'none'
          },
          '& .ant-card-body': {
            padding: '16px 24px'
          },
          // Hide the orange title bar
          '& .leaveyourrequirement_title__MEHei': {
            display: 'none'
          },
          // Remove max-width restriction to allow full drawer width
          '& *': {
            maxWidth: 'none !important'
          },
          // Hide any title/header elements with orange background
          '& [style*="background"]:has([style*="#F4762A"]), & [style*="#F4762A"]': {
            display: 'none !important'
          },
          // Adjust form styling to fit drawer
          '& .ant-form-item': {
            marginBottom: '16px'
          },
          '& .ant-form-item-label': {
            fontFamily: 'Prompt',
            fontSize: '16px'
          },
          '& .ant-input, & .ant-select-selector': {
            borderRadius: '5px',
            borderColor: '#E1E1E2',
            fontFamily: 'Prompt',
            fontSize: '16px'
          },
          // Material-UI TextField outlined variant styling to match Figma
          '& .MuiTextField-root': {
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#FFFFFF',
              borderRadius: '5px',
              '& fieldset': {
                borderColor: '#E1E1E2 !important',
                borderWidth: '1px !important',
                borderStyle: 'solid !important'
              },
              '&:hover fieldset': {
                borderColor: '#E1E1E2 !important',
                borderWidth: '1px !important'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#F4762A !important',
                borderWidth: '1px !important'
              }
            },
            '& .MuiInputLabel-root': {
              fontFamily: 'Prompt',
              fontSize: '16px',
              fontWeight: 400,
              color: '#919192',
              backgroundColor: '#FFFFFF',
              padding: '0 4px',
              '&.Mui-focused': {
                color: '#F4762A'
              },
              '&.MuiInputLabel-shrink': {
                backgroundColor: '#FFFFFF',
                padding: '0 4px'
              }
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Prompt',
              fontSize: '16px',
              fontWeight: 400,
              padding: '16px',
              color: '#000000'
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#919192'
            }
          },
          // Material-UI Select outlined variant styling to match Figma
          '& .MuiFormControl-root .MuiOutlinedInput-root': {
            backgroundColor: '#FFFFFF',
            borderRadius: '5px',
            '& fieldset': {
              borderColor: '#E1E1E2 !important',
              borderWidth: '1px !important',
              borderStyle: 'solid !important'
            },
            '&:hover fieldset': {
              borderColor: '#E1E1E2 !important',
              borderWidth: '1px !important'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#F4762A !important',
              borderWidth: '1px !important'
            }
          },
          '& .MuiFormControl-root .MuiInputLabel-root': {
            fontFamily: 'Prompt',
            fontSize: '16px',
            fontWeight: 400,
            color: '#919192',
            backgroundColor: '#FFFFFF',
            padding: '0 4px',
            '&.Mui-focused': {
              color: '#F4762A'
            },
            '&.MuiInputLabel-shrink': {
              backgroundColor: '#FFFFFF',
              padding: '0 4px'
            }
          },
          '& .ant-btn': {
            borderRadius: '40px',
            fontFamily: 'Prompt',
            fontSize: '16px',
            height: 'auto',
            padding: '8px 24px'
          },
          '& .ant-btn-primary': {
            backgroundColor: '#F4762A',
            borderColor: '#F4762A'
          }
        }}
      >
        <LeaveYourRequirement t={t} variant="outlined" />
      </Box>
    </Drawer>
  );
}; 