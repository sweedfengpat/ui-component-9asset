import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme } from "@mui/material";
import { HomeOutlined, FormatListBulleted, Person2Outlined } from "@mui/icons-material";

interface ButtomMenuBarProps {
    onLoginRequest?: () => void;
    onMeRequest?: () => void;
    onRequirementClick?: () => void;
    onChatClick?: () => void;
}

export const ButtomMenuBar = ({ onLoginRequest, onMeRequest, onRequirementClick, onChatClick }: ButtomMenuBarProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return isMobile ? (<>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 4 }} elevation={6}>
        <BottomNavigation showLabels>
            <BottomNavigationAction label="Home" icon={<HomeOutlined />} onClick={() => { window.location.href='/' }} />
            <BottomNavigationAction label="Requirement" icon={<FormatListBulleted />} onClick={() => { onRequirementClick?.() }} />
            <BottomNavigationAction label="Chat" icon={<HomeOutlined />} onClick={() => { onChatClick?.(); }} />
            <BottomNavigationAction label="Me" icon={<Person2Outlined />} onClick={() => { onMeRequest?.(); }} />
        </BottomNavigation>
    </Paper>
    {/* <LoginModal open={isLoginModalOpened} onLoginClosed={() => setIsLoginModalOpened(false)} />
    <BuyerMenu open={isBuyernModalOpened} onClose={() => setIsBuyerModalOpened(false) } />
    <SellerMenu open={isSellerModalOpened} onClose={() => setIsSellerModalOpened(false) } /> */}
    </>) : <></>;
}