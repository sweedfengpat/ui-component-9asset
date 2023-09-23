import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme } from "@mui/material";
import { HomeOutlined, FormatListBulleted, Person2Outlined } from "@mui/icons-material";

interface ButtomMenuBarProps {
    onLoginRequest?: () => void;
    onMeRequest?: () => void;
    onRequirementClick?: (isOpen: boolean) => void;
}

export const ButtomMenuBar = ({ onLoginRequest, onMeRequest, onRequirementClick }: ButtomMenuBarProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // const [isLoginModalOpened, setIsLoginModalOpened] = useState<boolean>(false);
    // const [isBuyernModalOpened, setIsBuyerModalOpened] = useState<boolean>(false);
    // const [isSellerModalOpened, setIsSellerModalOpened] = useState<boolean>(false);

    const handleLoginRequested = () => {
        // setIsLoginModalOpened(true);
        // setIsBuyerModalOpened(false);
        onLoginRequest?.();
    }

    const handleMeRequested = () => {
        // setIsBuyerModalOpened(true);
        // setIsLoginModalOpened(false);
        onRequirementClick && onRequirementClick(false);
        onMeRequest?.();
    }

    const handleSellerRequested = () => {
        // setIsSellerModalOpened(true);
        // setIsLoginModalOpened(false);
        // onBuyerRequest?.();
    }

    return isMobile ? (<>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 4 }} elevation={6}>
        <BottomNavigation showLabels>
            <BottomNavigationAction label="Home" icon={<HomeOutlined />} onClick={() => { window.location.href='/' }} />
            <BottomNavigationAction label="Requirement" icon={<FormatListBulleted />} onClick={() => { onRequirementClick && onRequirementClick(true) }} />
            <BottomNavigationAction label="Chat" icon={<HomeOutlined />} onClick={() => { handleMeRequested(); }} />
            <BottomNavigationAction label="Me" icon={<Person2Outlined />} onClick={() => { handleMeRequested(); }} />
        </BottomNavigation>
    </Paper>
    {/* <LoginModal open={isLoginModalOpened} onLoginClosed={() => setIsLoginModalOpened(false)} />
    <BuyerMenu open={isBuyernModalOpened} onClose={() => setIsBuyerModalOpened(false) } />
    <SellerMenu open={isSellerModalOpened} onClose={() => setIsSellerModalOpened(false) } /> */}
    </>) : <></>;
}