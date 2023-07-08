import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { LoginModal } from "../components/LoginModal";
import { BuyerMenu } from "./BuyerMenu";
import { SellerMenu } from "./SellerMenu";
import { HomeOutlined, FormatListBulleted, Person2Outlined } from "@mui/icons-material";
import React from "react";

interface ButtomMenuBarProps {
    onLoginRequest?: () => void;
    onBuyerRequest?: () => void;
}

export const ButtomMenuBar = ({ onLoginRequest, onBuyerRequest }: ButtomMenuBarProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isLoginModalOpened, setIsLoginModalOpened] = useState<boolean>(false);
    const [isBuyernModalOpened, setIsBuyerModalOpened] = useState<boolean>(false);
    const [isSellerModalOpened, setIsSellerModalOpened] = useState<boolean>(false);

    const handleLoginRequested = () => {
        setIsLoginModalOpened(true);
        setIsBuyerModalOpened(false);
        onLoginRequest?.();
    }

    const handleBuyerRequested = () => {
        setIsBuyerModalOpened(true);
        setIsLoginModalOpened(false);
        onBuyerRequest?.();
    }

    const handleSellerRequested = () => {
        setIsSellerModalOpened(true);
        setIsLoginModalOpened(false);
        onBuyerRequest?.();
    }

    return isMobile ? (<>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 4 }} elevation={6}>
        <BottomNavigation showLabels>
            <BottomNavigationAction label="Home" icon={<HomeOutlined />} onClick={() => { window.location.href='/' }} />
            <BottomNavigationAction label="Requirement" icon={<FormatListBulleted />} onClick={() => { handleSellerRequested(); }} />
            <BottomNavigationAction label="Chat" icon={<HomeOutlined />} onClick={() => { handleBuyerRequested(); }} />
            <BottomNavigationAction label="Me" icon={<Person2Outlined />} onClick={() => {handleLoginRequested();}} />
        </BottomNavigation>
    </Paper>
    <LoginModal open={isLoginModalOpened} onLoginClosed={() => setIsLoginModalOpened(false)} />
    <BuyerMenu open={isBuyernModalOpened} onClose={() => setIsBuyerModalOpened(false) } />
    <SellerMenu open={isSellerModalOpened} onClose={() => setIsSellerModalOpened(false) } />
    </>) : <></>;
}