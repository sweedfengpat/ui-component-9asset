import { AddHomeOutlined, Apps, HomeOutlined, Person2Outlined } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";

export interface SellerBottomBarProps {
  onMeRequest?: () => void;
}

export const SellerBottomBar = (props: SellerBottomBarProps) => {

  return (
    <Paper
      sx={{ 
        display: { xs: 'block', sm: 'none'}, 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4
      }}
      elevation={6}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" icon={<HomeOutlined />} onClick={() => { window.location.href='/' }} />
        <BottomNavigationAction label="Order" icon={<AddHomeOutlined />} onClick={() => { }} />
        <BottomNavigationAction label="Tools" icon={<Apps />} onClick={() => { }} />
        <BottomNavigationAction label="Chat" icon={<HomeOutlined />} onClick={() => { }} />
        <BottomNavigationAction label="Me" icon={<Person2Outlined />} onClick={() => { props.onMeRequest?.() }} />
      </BottomNavigation>
    </Paper>
  );
}