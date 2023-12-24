import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme } from "@mui/material";
import { HomeOutlined, Person2Outlined, ChatOutlined, CachedOutlined, KeyOutlined } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface ButtomMenuBarProps {
    onHomeRequest?: () => void;
    onMeRequest?: () => void;
    onRequirementClick?: () => void;
    onChatClick?: () => void;
}

export const ButtomMenuBar = ({ onMeRequest, onRequirementClick, onChatClick }: ButtomMenuBarProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t, i18n } = useTranslation();
    const router = useRouter();

    const onLinkMenuClicked = (type: string) => {
        if (type === 'default') {
            router.push('/');
            return;
        }

        const url = i18n.language === 'th' ? `/${t(type)}/${t('estate')}` : `/${i18n.language}/${t(type)}/${t('estate')}`;
        router.push(url);
    }
    return isMobile ? (<>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 4 }} elevation={6}>
        <BottomNavigation showLabels>
            <BottomNavigationAction label="Home" icon={<HomeOutlined />}  sx={{ pl: 3.5 }} onClick={() => { onLinkMenuClicked('default'); }} />
            <BottomNavigationAction label="Require" icon={<ChatOutlined />} onClick={() => { onRequirementClick?.() }} />
            <BottomNavigationAction label="Sell" icon={<CachedOutlined />} onClick={() => { onLinkMenuClicked('sell'); }} />
            <BottomNavigationAction label="Rent" icon={<KeyOutlined />}  onClick={() => { onLinkMenuClicked('rent'); }}/>
            {/* <BottomNavigationAction label="Chat" icon={<FontAwesomeIcon icon={faComment} size="lg" />} onClick={() => { onChatClick?.(); }} /> */}
            <BottomNavigationAction label="Me" icon={<Person2Outlined />} sx={{ pr: 3.5 }} onClick={() => { onMeRequest?.(); }} />
        </BottomNavigation>
    </Paper>
    </>) : <></>;
}