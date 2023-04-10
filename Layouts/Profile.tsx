import { Avatar } from "@mui/material";
import { UserInfo } from "firebase/auth";
import { useRef, useState } from "react";
import { TFunction } from "react-i18next";
import { ProfileMenu, ProfileMenuItem } from "./ProfileMenu";
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
    user: UserInfo;
    menuItems?: ProfileMenuItem[];
    t: TFunction<string, undefined>;
    language: MainMenuLanguage;

    isAuth: boolean;

    onLangChanged?: (lng: MainMenuLanguage) => void;
    onMenuClicked?: (item: ProfileMenuItem) => void;
}

export const Profile = (props: ProfileProps) => {
    const { t, language, user } = props;
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const avatarRef = useRef<HTMLDivElement | null>(null);

    const renderMenu = () => (<>
    <ProfileMenu
        t={props.t}
        language={props.language}
        anchorElement={avatarRef.current}
        user={props.user}
        isAuth={props.isAuth}
        isOpen={isMenuOpen}
        items={ props.menuItems|| [] }
        
        onLoginRequest={() => { setIsMenuOpen(false); }}
        onLangChanged={(ln: MainMenuLanguage) => { props.onLangChanged && props.onLangChanged(ln); }}
        onMenuClose={() => { setIsMenuOpen(false); }}
        onMenuClicked={
            (item) => {
                setIsMenuOpen(false);
                props.onMenuClicked && props.onMenuClicked(item);
            }
        }
    />
    </>);

    const handleAvatarClicked = (event: React.MouseEvent<HTMLElement>) => {
        setIsMenuOpen(!isMenuOpen);
        // setAvatarRef(event.currentTarget);
    };

    return (<>
    <Avatar
        alt="9 Asset"
        style={{ height: '30px', width: '30px', margin: '12px' }}
        ref={avatarRef}
        onClick={handleAvatarClicked}
    >{ getUserName(props.user) }</Avatar>
    { renderMenu() }
    </>);
}