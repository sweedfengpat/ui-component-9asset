import React, { MouseEvent, useState } from "react";
import { Avatar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { Menu, SearchOutlined } from "@mui/icons-material";
import { MainMenu } from "../Menu/MainMenu";
import { User } from "firebase/auth";
import { MenuItem } from ".";
import { getUserName } from "../../Layouts/Profile";

export interface ToolbarProps {
  logoPath?: string;

  user: User | null;
  userInfo: any | null;

  onMenuItemClicked?: (type: string, link?: string) => void;
  onLanguageChanged?: (ln: string) => void;
  onSearchClicked?: () => void;
}

export const MobileToolbar = (props: ToolbarProps) => {

  const [logoPath, ] = useState<string|undefined>(props.logoPath);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

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
    setElementRef(e.currentTarget as HTMLElement);
    setIsMenuOpen(true);
  }

  return (<>
  <Toolbar sx={{ display: { xs:'flex', sm: 'none'} }}>
    <a href ={ '/' }>
      <img src={logoPath} style={{ height: '40px' }} alt="'9asset Logo'" />
    </a>

    <Box sx={{ flexGrow: 1, pl: 4, display: { xs: 'flex', md: 'none' } }}>
      <Button color="primary" variant="contained" disableElevation
          sx={{ 
              padding: '5px',
              borderRadius: '20px',
              minWidth: '24px',
              width: '34px !important'
          }}
          onClick={() => props.onSearchClicked?.()}
      >
        <SearchOutlined fontSize="medium" />
      </Button>
    </Box>
    
    <div style={{ flexGrow: 1 }}></div>
    <Box component={"div"} sx={{ display: { xs: 'flex', sm: 'none' }, mr: '10px'}}>
      <Avatar sx={{ width: 34, height: 34 }}>
      { getUserName(props.user) }
      </Avatar>
    </Box>
    <Box component={"div"} sx={{ display: { xs: 'flex', sm: 'none' }}}>
      <IconButton onClick={handleMenuClicked}>
        <Menu fontSize="large"  />
      </IconButton>
    </Box>
  </Toolbar>
  { renderMenu () }
  </>);
}