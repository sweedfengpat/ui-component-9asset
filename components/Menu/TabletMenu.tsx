import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import { Language } from '@mui/icons-material';
import { CloseIcon } from '../Icons/CloseIcon';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { useTabletMenu } from './hooks/useTabletMenu';
import { TABLET_MENU_CONSTANTS } from './TabletMenu.constants';
import {
  StyledDrawer,
  DrawerContainer,
  DrawerHeader,
  LogoContainer,
  LogoText,
  CloseButton,
  MenuContainer,
  MenuItem,
  MenuItemText,
  LanguageMenuItem,
  LanguageText
} from './TabletMenu.styles';

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
  const {
    menuItems,
    languageOptions,
    languageDrawerOpen,
    currentLanguage,
    getCurrentLanguageLabel,
    handleLanguageClick,
    handleLanguageSelect,
    handleLanguageDrawerClose,
    handleLanguageDrawerCloseWithMain,
    t
  } = useTabletMenu({ onLanguageChanged, onClose });

  return (
    <>
      {/* Main Menu Drawer */}
      <StyledDrawer
        anchor="right"
        open={open}
        onClose={onClose}
      >
        <DrawerContainer>
          {/* Header */}
          <DrawerHeader>
            {/* Logo Section */}
            <LogoContainer>
              <Image
                src="/assets/_single-logo.png"
                alt="9asset logo"
                width={TABLET_MENU_CONSTANTS.LOGO_SIZE.width}
                height={TABLET_MENU_CONSTANTS.LOGO_SIZE.height}
              />
              <LogoText>9asset</LogoText>
            </LogoContainer>

            {/* Close Button */}
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </DrawerHeader>

          {/* Menu Items */}
          <MenuContainer>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.value}>
                <MenuItem onClick={() => onMenuItemClick(item.value)}>
                  <MenuItemText>{item.label}</MenuItemText>
                </MenuItem>

                {/* Divider - don't show after last item */}
                {index < menuItems.length - 1 && (
                  <Divider
                    sx={{
                      borderColor: TABLET_MENU_CONSTANTS.COLORS.BORDER,
                      width: '100%',
                    }}
                  />
                )}
              </React.Fragment>
            ))}

            {/* Language Selection Item - Show only on mobile */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <Divider
                sx={{
                  borderColor: TABLET_MENU_CONSTANTS.COLORS.BORDER,
                  width: '100%',
                }}
              />
              <LanguageMenuItem onClick={handleLanguageClick}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Language sx={{ 
                    fontSize: '24px', 
                    color: TABLET_MENU_CONSTANTS.COLORS.BLACK 
                  }} />
                  <MenuItemText>{t('Language')}</MenuItemText>
                </Box>
                <LanguageText>{getCurrentLanguageLabel()}</LanguageText>
              </LanguageMenuItem>
            </Box>
          </MenuContainer>
        </DrawerContainer>
      </StyledDrawer>

      {/* Language Selection Drawer */}
      <StyledDrawer
        anchor="right"
        open={languageDrawerOpen}
        onClose={handleLanguageDrawerClose}
      >
        <DrawerContainer>
          {/* Header */}
          <DrawerHeader>
            {/* Back Button and Title */}
            <LogoContainer>
              <CloseButton onClick={handleLanguageDrawerClose}>
                <ArrowLeftIcon />
              </CloseButton>
              <LogoText>{t('Language')}</LogoText>
            </LogoContainer>

            {/* Close Button */}
            <CloseButton onClick={handleLanguageDrawerCloseWithMain}>
              <CloseIcon />
            </CloseButton>
          </DrawerHeader>

          {/* Language Options */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: TABLET_MENU_CONSTANTS.COLORS.WHITE
            }}
          >
            <List sx={{ padding: 0 }}>
              {languageOptions.map((language, index) => (
                <ListItem key={language.code} disablePadding>
                  <ListItemButton
                    onClick={() => handleLanguageSelect(language.code)}
                    sx={{
                      padding: TABLET_MENU_CONSTANTS.LANGUAGE_PADDING,
                      borderBottom: index < languageOptions.length - 1 
                        ? `1px solid ${TABLET_MENU_CONSTANTS.COLORS.BORDER}` 
                        : 'none',
                      '&:hover': {
                        backgroundColor: TABLET_MENU_CONSTANTS.COLORS.LANGUAGE_HOVER,
                      }
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontFamily: 'Prompt',
                            fontWeight: currentLanguage === language.code ? 600 : 400,
                            fontSize: TABLET_MENU_CONSTANTS.TYPOGRAPHY.LANGUAGE_SIZE,
                            lineHeight: 1.3,
                            color: currentLanguage === language.code 
                              ? TABLET_MENU_CONSTANTS.COLORS.PRIMARY 
                              : TABLET_MENU_CONSTANTS.COLORS.BLACK
                          }}
                        >
                          {language.label}
                        </Typography>
                      }
                    />
                    {currentLanguage === language.code && (
                      <Box
                        sx={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: TABLET_MENU_CONSTANTS.COLORS.PRIMARY,
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
        </DrawerContainer>
      </StyledDrawer>
    </>
  );
}; 