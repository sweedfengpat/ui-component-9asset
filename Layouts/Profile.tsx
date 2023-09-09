import { Avatar } from "@mui/material";
import { UserInfo } from "firebase/auth";
import { useRef, useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { ProfileMenu, ProfileMenuItem } from "./ProfileMenu";
import { MainMenuLanguage } from "./MainLayoutAppBar";
import i18next from "i18next";

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
    onMenuClicked?: (item: ProfileMenuItem) => void;
    onLoginRequested?: () => void;
}

export const Profile = (props: ProfileProps) => {
  const { user } = props;
  const { t, i18n } = useTranslation(props.namespace || 'common');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const handleLoginRequested = () => {
    setIsMenuOpen(false);
    props.onLoginRequested?.();
  };

  const renderMenu = () => (
  <ProfileMenu
    t={t}
    language={i18n.language}
    anchorElement={avatarRef.current}
    user={props.user}
    isAuth={!!props.user}
    isOpen={isMenuOpen}
    items={[]}
    
    onLoginRequest={handleLoginRequested}
    onLangChanged={(ln: MainMenuLanguage) => { i18n.changeLanguage(ln); }}
    onMenuClose={() => { setIsMenuOpen(false); }}
    onMenuClicked={
      (item) => {
        setIsMenuOpen(false);
        props.onMenuClicked && props.onMenuClicked(item);
      }
    }
  />);

  const handleAvatarClicked = (event: React.MouseEvent<HTMLElement>) => {
      // setIsMenuOpen(!isMenuOpen);
      // setAvatarRef(event.currentTarget);
      handleLoginRequested();
  };

    return (<>
    <Avatar
        alt="9 Asset"
        sx={{ height: '30px', width: '30px', margin: '12px', display: { xs: 'none', sm: 'flex' } }}
        ref={avatarRef}
        onClick={handleAvatarClicked}
    >{ getUserName(props.user) }</Avatar>
    {/* { renderMenu() } */}
    </>);
}