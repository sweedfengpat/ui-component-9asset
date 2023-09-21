import React from "react";
import { Avatar } from "@mui/material";
import { UserInfo } from "firebase/auth";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProfileMenu } from "../components/ProfileMenu/ProfileMenu";
import { MainMenuLanguage } from "./MainLayoutAppBar";

const getFirstLetter = (userInfo: UserInfo | null) => {
  if (userInfo) {
    if (userInfo.displayName) {
        return userInfo.displayName[0];
    } else if (userInfo.email) {
        return (userInfo.email as string)[0].toUpperCase();
    }
  }
  return undefined;
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
    user: UserInfo;
    // menuItems?: ProfileMenuItem[];
    // t: TFunction<string, undefined>;
    // language: MainMenuLanguage;

    // isAuth: boolean;

    // onLangChanged?: (lng: MainMenuLanguage) => void;
    // onMenuClicked?: (item: ProfileMenuItem) => void;
    onMenuClicked?: (item: 'login' | 'register' | 'logout' | string) => void;
}

export const Profile = (props: ProfileProps) => {
  const { user } = props;
  const { t, i18n } = useTranslation(props.namespace || 'common');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const handleLoginRequested = () => {
    setIsMenuOpen(false);
    props.onMenuClicked?.('login');
  };

  const handleRegisterRequested = () => {
    setIsMenuOpen(false);
    props.onMenuClicked?.('register');
  }

  const renderMenu = () => (
    <ProfileMenu
      open={isMenuOpen}
      anchorElement={avatarRef.current}
      onClose={() => { setIsMenuOpen(false); }}
      onLoginRequest={handleLoginRequested}
      onRegisterRequest={handleRegisterRequested}
  //   user={props.user}
  //   isAuth={!!props.user}
  //   items={[]}
    
  //   onLoginRequest={handleLoginRequested}
  //   onLangChanged={(ln: MainMenuLanguage) => { i18n.changeLanguage(ln); }}
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