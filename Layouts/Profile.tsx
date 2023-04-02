import { Avatar } from "@mui/material";
import { UserInfo } from "firebase/auth";
import { useRef, useState } from "react";
import { TFunction } from "react-i18next";
import { HeaderMenu, ProfileMenuItem } from "./HeaderMenu";
import { MainMenuLanguage } from "./MainLayoutAppBar";

const MenuList = new Map<string, ProfileMenuItem[]>([
    ['seller', [
        { text: 'menu.buyerRequirement', disabled: true },
        { text: 'menu.listing', appName: 'seller:listing' },
        { text: 'menu.project', disabled: true },
        {
            text: 'menu.prospectActivity',
            disabled: true,
            items: [
                { text: 'menu.prospectInterest', appName: 'seller:', disabled: true },
                { text: 'menu.prospectInquiry', appName: 'prospect:inquiry', disabled: true },
                { text: 'menu.prospectAppointment', appName: 'prospect:appointment', disabled: true }
            ]
        },
        { text: 'menu.package', disabled: true },
        { text: 'menu.buyerCenter', disabled: true },
        {
            text: 'menu.myAccount',
            items: [
                { text: 'menu.profile', appName: 'seller:myprofile' },
                { text: 'menu.companyProfile', appName: 'seller:company-profile' },
                { text: 'menu.affiliateAgent', appName: 'seller:affiliate-agent' }
            ]
        }
    ]]
]);

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
    user: UserInfo
    t: TFunction<string, undefined>;
    language: MainMenuLanguage;

    isAuth: boolean;

    onLangChanged?: (lng: MainMenuLanguage) => void;
    onMenuClicked?: (menuKey: string) => void;
}

export const Profile = (props: ProfileProps) => {
    const { t, language, user } = props;
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const avatarRef = useRef<HTMLDivElement | null>(null);

    const renderMenu = () => (<>
    <HeaderMenu
        t={props.t}
        language={props.language}
        anchorElement={avatarRef.current}
        user={props.user}
        isAuth={props.isAuth}
        isOpen={isMenuOpen}
        items={ MenuList.get('seller') || [] }
        
        onLoginRequest={() => { setIsMenuOpen(false); }}
        onLangChanged={(ln: MainMenuLanguage) => { props.onLangChanged && props.onLangChanged(ln); }}
        onMenuClose={() => { setIsMenuOpen(false); }}
        onMenuClicked={
            (appName) => {
                setIsMenuOpen(false);
                props.onMenuClicked && props.onMenuClicked(appName);
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