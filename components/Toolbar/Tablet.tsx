import React, { MouseEvent, useState } from "react";
import { 
  Avatar, 
  Box, 
  Button, 
  IconButton, 
  Toolbar, 
  Menu, 
  MenuItem,
  Typography 
} from "@mui/material";
import { Menu as MenuIcon, SearchOutlined, KeyboardArrowDownOutlined, FavoriteBorderOutlined, ManageSearchOutlined } from "@mui/icons-material";
import { MainMenu } from "../Menu/MainMenu";
import { User } from "firebase/auth";
import { getUserName } from "../../Layouts/Profile";
import { useTranslation } from "react-i18next";

// Custom Search Icon Component
const CustomSearchIcon = ({ color = "#FFFFFF" }) => (
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.855 15.7605H14.4913L14.0658 15.5042L10.3771 11.6711C10.3185 11.6563 9.97298 11.9077 9.88384 11.9564C5.1812 14.5325 -0.372377 10.6016 0.614926 5.32529C1.53938 0.386865 7.76373 -1.50128 11.2783 2.13255C13.4902 4.41912 13.6502 8.0937 11.5861 10.5315L15.295 14.3961C15.7075 14.9073 15.4648 15.5766 14.855 15.7609V15.7605ZM6.45114 1.88458C2.8794 2.14588 0.913555 6.22612 2.99443 9.17356C4.95914 11.9561 9.18069 11.7241 10.8281 8.74771C12.6001 5.54583 10.0892 1.61871 6.45114 1.88496V1.88458Z" fill={color}/>
</svg>

);

export interface TabletToolbarProps {
  logoPath?: string;
  user: User | null;
  userInfo: any | null;
  scrolled?: boolean;
  onMenuItemClicked?: (type: string, link?: string) => void;
  onLanguageChanged?: (ln: string) => void;
  onSearchClicked?: () => void;
  onAvatarClicked?: () => void;
  onRequirementClicked?: () => void;
  onHamburgerClicked?: () => void;
  namespace?: string;
}

export const TabletToolbar = (props: TabletToolbarProps) => {
  const { t, i18n } = useTranslation(props.namespace);
  
  const [logoPath, ] = useState<string|undefined>(props.logoPath);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const renderMenu = () => {
    return <MainMenu
      logo={logoPath}
      open={isMenuOpen}
      elementRef={elementRef}
      loggedInItems={[]}
      user={props.user}
      userInfo={props.userInfo}
      onMenuClose={handleMenuClosed}
      onMenuClicked={handleMainMenuItemClicked}
      onLanguageChanged={handleLanguageChanged}
    />;
  }

  const handleLanguageChanged = (ln: string) => {
    props.onLanguageChanged?.(ln);
    handleMenuClosed();
    setAnchorEl(null);
  }

  const handleMainMenuItemClicked = (type: string, link?: string) => {
    if (type === 'login' || type === 'register') {
      handleMenuClosed();
      setTimeout(() => { props.onMenuItemClicked?.(type); }, 400);
    } else {
      props.onMenuItemClicked?.(type, link);
      handleMenuClosed();
    }
  }

  const handleMenuClosed = () => {
    setElementRef(null);
    setIsMenuOpen(false);
  }

  const handleMenuClicked = (e: MouseEvent) => {
    // ใช้ tablet menu แทน main menu
    props.onHamburgerClicked?.();
  }

  const handleAvatarClicked = () => {
    props.onAvatarClicked?.();
  }

  const getCurrentLanguageText = () => {
    const lang = {
      'en': 'EN',
      'th': 'TH',
      'cn': 'CN'
    };
    return lang[i18n.language as 'en' | 'th' | 'cn'];
  }

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (lang: 'en' | 'cn' | 'th') => {
    handleLanguageChanged(lang);
  }

  return (<>
    <Toolbar 
      sx={{ 
        display: { xs: 'none', sm: 'flex', lg: 'none' },
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 57px !important',
        minHeight: '82px !important'
      }}
    >
      {/* Left Section - Logo + Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <a href={`/${i18n.language !== 'th' ? i18n.language : ''}`}>
          <img src={logoPath} style={{ height: '50px', width: '42px' }} alt="'9asset Logo'" />
        </a>
        
        <Button 
          variant="contained"
          sx={{
            backgroundColor: '#F4762A',
            borderRadius: '40px',
            minWidth: '40px',
            width: '40px',
            height: '40px',
            padding: '12px 12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: '#d6631e',
            },
            boxShadow: 'none',
          }}
          onClick={() => props.onSearchClicked?.()}
        >
          <CustomSearchIcon color="white" />
        </Button>
      </Box>

      {/* Right Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* ฝากเราช่วยหา Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '40px',
              border: props.scrolled ? '0.5px solid #BFBFBF' : '0.5px solid rgba(255, 255, 255, 0.5)',
              padding: '10px 16px',
              textTransform: 'none',
              color: props.scrolled ? '#000000' : '#FFFFFF',
              fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              gap: '8px',
              backgroundColor: 'transparent',
              '&:hover': {
                borderColor: props.scrolled ? '#BFBFBF' : 'rgba(255, 255, 255, 0.7)',
                backgroundColor: props.scrolled ? 'rgba(191, 191, 191, 0.1)' : 'rgba(255, 255, 255, 0.1)',
              },
            }}
            endIcon={<CustomSearchIcon color={props.scrolled ? '#F4762A' : '#FFFFFF'} />}
            onClick={() => props.onRequirementClicked?.()}
          >
            ฝากเราช่วยหา
          </Button>
        </Box>

        {/* Language Selector + Profile + Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Language Selector */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: props.scrolled ? '#000000' : '#FFFFFF',
              fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              gap: '4px'
            }}
            onClick={handleLanguageClick}
          >
            <Typography sx={{ 
              fontFamily: 'inherit',
              fontSize: '16px',
              color: props.scrolled ? '#000000' : '#FFFFFF',
              lineHeight: 1.6
            }}>
              {getCurrentLanguageText()}
            </Typography>
            <KeyboardArrowDownOutlined sx={{ fontSize: '18px', color: props.scrolled ? '#000000' : '#FFFFFF' }} />
          </Box>

          {/* Profile Avatar */}
          <Avatar
            sx={{ 
              width: 30, 
              height: 30,
              border: '1px solid #FFFFFF',
              fontSize: '14px'
            }}
            onClick={handleAvatarClicked}
          >
            {getUserName(props.user)}
          </Avatar>

          {/* Hamburger Menu */}
          <IconButton 
            onClick={handleMenuClicked}
            sx={{ 
              padding: 0,
              width: '24px',
              height: '16px'
            }}
          >
            <Box sx={{ 
              position: 'relative',
              width: '17px', 
              height: '17px'
            }}>
              {/* Line 1 */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: '0px',
                  left: '4px',
                  width: '17px', 
                  height: '2px', 
                  backgroundColor: '#919192'
                }} 
              />
              {/* Line 2 */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: '7px',
                  left: '4px',
                  width: '17px', 
                  height: '2px', 
                  backgroundColor: '#919192'
                }} 
              />
              {/* Line 3 */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: '14px',
                  left: '4px',
                  width: '17px', 
                  height: '2px', 
                  backgroundColor: '#919192'
                }} 
              />
            </Box>
          </IconButton>
        </Box>
      </Box>

      {/* Language Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleLanguageClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        PaperProps={{
          sx: {
            fontFamily: 'Prompt, Inter, Noto Serif SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            borderRadius: '10px',
            padding: '24px',
            minWidth: '130px'
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem 
          selected={i18n.language === 'th'} 
          onClick={() => handleLanguageSelect('th')}
          sx={{ 
            fontFamily: 'Prompt',
            fontWeight: 500,
            fontSize: '16px',
            padding: '0px',
            marginBottom: '24px',
            '&:last-child': { marginBottom: 0 }
          }}
        >
          ไทย
        </MenuItem>
        <MenuItem 
          selected={i18n.language === 'en'} 
          onClick={() => handleLanguageSelect('en')}
          sx={{ 
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '16px',
            padding: '0px',
            marginBottom: '24px',
            '&:last-child': { marginBottom: 0 }
          }}
        >
          English
        </MenuItem>
        <MenuItem 
          selected={i18n.language === 'cn'} 
          onClick={() => handleLanguageSelect('cn')}
          sx={{ 
            fontFamily: 'Noto Serif SC',
            fontWeight: 500,
            fontSize: '16px',
            padding: '0px',
            '&:last-child': { marginBottom: 0 }
          }}
        >
          中文
        </MenuItem>
      </Menu>
    </Toolbar>
    
    {renderMenu()}
  </>);
}; 