import React, { MouseEvent, useState } from "react";
import { Box, Button, IconButton, Toolbar } from "@mui/material";
import { Menu, SearchOutlined } from "@mui/icons-material";
import { MainMenu } from "../../Layouts/MainMenu";

export interface ToolbarProps {
  logoPath?: string;

  // title: string;
  // isBackable?: boolean;
  // additionalAction?: React.ReactNode;
  // onBackRequested?: () => void;
  // onClose?: () => void;
}

export const MobileToolbar = (props: ToolbarProps) => {
  const [logoPath, ] = useState<string|undefined>(props.logoPath);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

  const renderMenu = () => {
    return <MainMenu logo={logoPath} open={isMenuOpen} elementRef={elementRef} onMenuClose={handleMenuClosed} />;
  }

  const handleMobileSearchClick = () => {

  }

  const handleMenuClosed = (e: MouseEvent) => {
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
      <img src={logoPath} style={{ height: '40px' }} alt="'9Asset Logo'" />
    </a>

    <Box sx={{ flexGrow: 1, pl: 4, display: { xs: 'flex', md: 'none' } }}>
      <Button color="primary" variant="contained" disableElevation
          sx={{ 
              padding: '5px',
              borderRadius: '20px',
              minWidth: '24px',
              width: '34px !important'
          }}
          onClick={handleMobileSearchClick}
      >
        <SearchOutlined fontSize="medium" />
      </Button>
    </Box>
    
    <div style={{ flexGrow: 1 }}></div>
    <Box component={"div"} sx={{ display: { xs: 'flex', sm: 'none' }}}>
    <IconButton onClick={handleMenuClicked}>
      <Menu fontSize="large"  />
    </IconButton>
    </Box>
  </Toolbar>
  { renderMenu () }
  </>);
}