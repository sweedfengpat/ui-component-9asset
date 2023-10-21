import React from "react";
import { Avatar } from "@mui/material";
import { User, UserInfo } from "firebase/auth";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProfileMenu } from "../components/Menu/ProfileMenu";
import { MainMenuLanguage } from "./MainLayoutAppBar";
import { MenuItem } from "../components/Toolbar";

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
  const { user } = props;
  const { t, i18n } = useTranslation(props.namespace || 'common');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const avatarRef = useRef<HTMLDivElement | null>(null);

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
    <Avatar
      alt="9 Asset"
      sx={{ height: '30px', width: '30px', margin: '12px', display: { xs: 'none', sm: 'flex' } }}
      ref={avatarRef}
      onClick={handleAvatarClicked}
    >
      { getUserName(props.user) }
    </Avatar>
    { renderMenu() }
    </>);
}