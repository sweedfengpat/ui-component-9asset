import React, { useState } from 'react';
import { Box, Typography, Divider, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Language } from '@mui/icons-material';

interface TabletMenuProps {
  open: boolean;
  onClose: () => void;
  onMenuItemClick: (type: string) => void;
  onLanguageChanged?: (lang: string) => void;
}

export const TabletMenu: React.FC<TabletMenuProps> = ({
  open,
  onClose,
  onMenuItemClick,
  onLanguageChanged
}) => {
  const { t, i18n } = useTranslation('common');
  const [languageDrawerOpen, setLanguageDrawerOpen] = useState(false);

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

  const languageOptions = [
    { code: 'th', label: 'ไทย' },
    { code: 'en', label: 'English' },
    { code: 'cn', label: '中文' }
  ];

  const getCurrentLanguageLabel = () => {
    const currentLang = languageOptions.find(lang => lang.code === i18n.language);
    return currentLang ? currentLang.label : 'ไทย';
  };

  const handleLanguageClick = () => {
    setLanguageDrawerOpen(true);
  };

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChanged?.(langCode);
    setLanguageDrawerOpen(false);
    onClose(); // ปิด main drawer ด้วย
  };

  const handleLanguageDrawerClose = () => {
    setLanguageDrawerOpen(false);
  };

  return (
    <>
      {/* Main Menu Drawer */}
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
              gap: '16px',
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
                    }}
                  />
                )}
              </React.Fragment>
            ))}

            {/* Language Selection Item */}
            <Divider
              sx={{
                borderColor: '#E1E1E2',
                width: '100%',
              }}
            />
            <Box
              onClick={handleLanguageClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Language sx={{ fontSize: '28px', color: '#000000' }} />
                <Typography
                  sx={{
                    fontFamily: 'Prompt',
                    fontWeight: 500,
                    fontSize: '28px',
                    lineHeight: 1.3,
                    color: '#000000'
                  }}
                >
                  {t('Language')}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Prompt',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: 1.3,
                  color: '#919192'
                }}
              >
                {getCurrentLanguageLabel()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Language Selection Drawer */}
      <Drawer
        anchor="right"
        open={languageDrawerOpen}
        onClose={handleLanguageDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100vw',
            backgroundColor: '#F5F5F6',
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
              borderBottom: '1px solid #E1E1E2'
            }}
          >
            {/* Back Button and Title */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <IconButton
                onClick={handleLanguageDrawerClose}
                sx={{
                  padding: 0,
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                }}
              >
                <Box
                  sx={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Left Arrow */}
                  <Box
                    sx={{
                      width: '12px',
                      height: '12px',
                      borderLeft: '2px solid #000000',
                      borderBottom: '2px solid #000000',
                      transform: 'rotate(45deg)'
                    }}
                  />
                </Box>
              </IconButton>
              
              <Typography
                sx={{
                  fontFamily: 'Prompt',
                  fontWeight: 500,
                  fontSize: '23px',
                  lineHeight: 1.3,
                  color: '#000000'
                }}
              >
                {t('Language')}
              </Typography>
            </Box>

            {/* Close Button (X icon) */}
            <IconButton
              onClick={() => {
                handleLanguageDrawerClose();
                onClose(); // ปิด main drawer ด้วย
              }}
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

          {/* Language Options */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#FFFFFF'
            }}
          >
            <List sx={{ padding: 0 }}>
              {languageOptions.map((language, index) => (
                <ListItem key={language.code} disablePadding>
                  <ListItemButton
                    onClick={() => handleLanguageSelect(language.code)}
                    sx={{
                      padding: '24px 57px',
                      borderBottom: index < languageOptions.length - 1 ? '1px solid #E1E1E2' : 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 118, 42, 0.08)',
                      }
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontFamily: 'Prompt',
                            fontWeight: i18n.language === language.code ? 600 : 400,
                            fontSize: '18px',
                            lineHeight: 1.3,
                            color: i18n.language === language.code ? '#F4762A' : '#000000'
                          }}
                        >
                          {language.label}
                        </Typography>
                      }
                    />
                    {i18n.language === language.code && (
                      <Box
                        sx={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#F4762A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box
                          sx={{
                            width: '6px',
                            height: '10px',
                            borderRight: '2px solid white',
                            borderBottom: '2px solid white',
                            transform: 'rotate(45deg)',
                            marginBottom: '2px'
                          }}
                        />
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}; 