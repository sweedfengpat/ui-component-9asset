import { styled } from '@mui/material/styles';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { TABLET_MENU_CONSTANTS } from './TabletMenu.constants';

const { COLORS, TYPOGRAPHY } = TABLET_MENU_CONSTANTS;

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('lg')]: {
    display: 'none'
  },
  '& .MuiDrawer-paper': {
    width: TABLET_MENU_CONSTANTS.DRAWER_WIDTH,
    backgroundColor: COLORS.BACKGROUND,
    boxSizing: 'border-box',
  },
}));

export const DrawerContainer = styled(Box)({
  width: TABLET_MENU_CONSTANTS.DRAWER_WIDTH,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
});

export const DrawerHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: TABLET_MENU_CONSTANTS.HEADER_PADDING,
  backgroundColor: COLORS.BACKGROUND,
  borderBottom: `1px solid ${COLORS.BORDER}`
});

export const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
});

export const LogoText = styled(Typography)({
  fontFamily: 'Prompt',
  fontWeight: 500,
  fontSize: TYPOGRAPHY.LOGO_SIZE,
  lineHeight: 1.3,
  color: COLORS.BLACK
});

export const CloseButton = styled(IconButton)({
  width: '24px',
  height: '16px',
  padding: 0,
  '&:hover': {
    backgroundColor: 'transparent'
  }
});

export const MenuContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: TABLET_MENU_CONSTANTS.CONTENT_PADDING,
  flex: 1
});

export const MenuItem = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '10px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: COLORS.HOVER,
    borderRadius: '8px'
  }
});

export const MenuItemText = styled(Typography)({
  fontFamily: 'Prompt',
  fontWeight: 500,
  fontSize: TYPOGRAPHY.MENU_ITEM_SIZE,
  lineHeight: 1.3,
  color: COLORS.BLACK,
  textAlign: 'center'
});

export const LanguageMenuItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '20px 10px 10px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: COLORS.HOVER,
    borderRadius: '8px'
  }
});

export const LanguageText = styled(Typography)({
  fontFamily: 'Prompt',
  fontWeight: 400,
  fontSize: TYPOGRAPHY.LANGUAGE_SIZE,
  lineHeight: 1.3,
  color: COLORS.PRIMARY
});