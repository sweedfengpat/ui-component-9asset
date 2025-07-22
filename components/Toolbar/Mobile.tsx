import React, { MouseEvent, useState } from "react";
import { Avatar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { Menu, SearchOutlined, AccountCircleOutlined } from "@mui/icons-material";
import { User } from "firebase/auth";
import { getUserName } from "../../Layouts/Profile";
import { useTranslation } from "react-i18next";

export interface ToolbarProps {
  logoPath?: string;

  user: User | null;
  userInfo: any | null;

  onMenuItemClicked?: (type: string, link?: string) => void;
  onLanguageChanged?: (ln: string) => void;
  onSearchClicked?: () => void;
  onAvatarClicked?: () => void;
  onHamburgerClicked?: () => void;

  namespace?: string;
}

export const MobileToolbar = (props: ToolbarProps) => {

  const { t, i18n } = useTranslation(props.namespace);
  
  const [logoPath, ] = useState<string|undefined>(props.logoPath);

  const handleAvatarClicked = () => {
    props.onAvatarClicked?.();
  }

  const handleMenuClicked = (e: MouseEvent) => {
    // ใช้ hamburger menu เหมือนกับ tablet
    props.onHamburgerClicked?.();
  }

  return (
  <Toolbar sx={{ display: { xs:'flex', sm: 'none'} }}>
    <a href ={ `/${i18n.language !== 'th' ? i18n.language : ''}` }>
      <img src={logoPath} style={{ height: '40px', width: '34px' }} alt="'9asset Logo'" />
    </a>

    <Box sx={{ flexGrow: 1, pl: 3, display: { xs: 'flex', md: 'none' } }}>
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
      {props.user ? (
        <Avatar
          sx={{ width: 34, height: 34 }}
          onClick={handleAvatarClicked}
        >
        { getUserName(props.user) }
        </Avatar>
      ) : (
        <IconButton
          onClick={handleAvatarClicked}
          sx={{ 
            color: '#000', 
            padding: '8px'
          }}
        >
          <AccountCircleOutlined fontSize="medium" />
        </IconButton>
      )}
    </Box>
    <Box component={"div"} sx={{ display: { xs: 'flex', sm: 'none' }}}>
      <IconButton onClick={handleMenuClicked}>
        <Menu fontSize="large"  />
      </IconButton>
    </Box>
  </Toolbar>
  );
}