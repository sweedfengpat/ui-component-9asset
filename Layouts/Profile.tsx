import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { User, UserInfo } from "firebase/auth";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ProfileMenu } from "../components/Menu/ProfileMenu";
import { MainMenuLanguage } from "./AdvanceSearch";
import { MenuItem } from "../components/Toolbar";
import { AccountCircleOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

const getFirstLetter = (userInfo: UserInfo | null) => {
  if (userInfo) {
    if (userInfo.displayName) {
        return userInfo.displayName[0];
    } else if (userInfo.email) {
        return (userInfo.email as string)[0].toUpperCase();
    }
  }
  return '9';
}

export const getUserName = (user: UserInfo | null) => {
  const username = getFirstLetter(user);
  if(username){
    return username;
  }

  return '9';
}

export interface ProfileProps {
    namespace?: string;
    user: User | null;
    userInfo: any | null;
    menuItems?: {
      auth: MenuItem[];
      nonauth: MenuItem[];
    };

    onLanguageChanged?: (ln: MainMenuLanguage) => void;
    onMenuClicked?: (item: 'login' | 'register' | 'logout' | string, link?: string) => void;
}

export const Profile = (props: ProfileProps) => {
  const { t, i18n } = useTranslation(props.namespace || 'common');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const avatarRef = useRef<HTMLButtonElement | null>(null);
  const [isHomePage, setIsHomePage] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบว่าอยู่ที่หน้าหลักหรือไม่
    const path = router.pathname;
    setIsHomePage(path === "/" || path === `/${i18n.language}` || path === `/${i18n.language}/`);
  }, [router.pathname, i18n.language]);

  const handleMenuClicked = (key: string, link?: string) => {
    setIsMenuOpen(false);
    props.onMenuClicked?.(key, link);
  }

  const handleLanguageChanged = (ln: string) => {
    i18n.changeLanguage(ln);
    setIsMenuOpen(false);
    props.onLanguageChanged?.(ln);
  }

  const renderMenu = () => (
    <ProfileMenu
      open={isMenuOpen}
      anchorElement={avatarRef.current}
      onClose={() => { setIsMenuOpen(false); }}
      onMenuClicked={handleMenuClicked}
      onLanguageChanged={handleLanguageChanged}

      user={props.user}
      userInfo={props.userInfo}
      items={props.menuItems || { auth: [], nonauth: [] }}
    
  //   onLoginRequest={handleLoginRequested}
  //   onMenuClicked={
  //     (item) => {
  //       setIsMenuOpen(false);
  //       props.onMenuClicked && props.onMenuClicked(item);
  //     }
  //   }
    />
  );

  const handleAvatarClicked = (event: React.MouseEvent<HTMLElement>) => {
    setIsMenuOpen(true);
  };

    return (<>
    <IconButton
      ref={avatarRef}
      onClick={handleAvatarClicked}
      sx={{ 
        color: isHomePage ? '#fff' : '#000', 
        padding: '8px',
        display: { xs: 'none', sm: 'flex' }
      }}
    >
      <AccountCircleOutlined fontSize="medium" />
    </IconButton>
    { renderMenu() }
    </>);
}