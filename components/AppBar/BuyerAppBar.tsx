import { AppBar, useTheme } from "@mui/material";
import logoPath from '../../assets/images/9asset-logo.png';
import { DesktopToolbar } from "../Toolbar/Desktop";
import { BuyerMobileToolbar as MobileToolbar } from "../Toolbar/BuyerMobile";
import { useEffect, useState } from "react";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { MenuItem } from "../Toolbar";

const loggedMenuItems = [
  {
    key: 'requirements',
    text: 'menu.myRequirement',
    link: '/requirements',
  },
  {
    key: 'interested',
    text: 'menu.interested',
    link: '/interested',
  },
  {
    key: 'recently',
    text: 'menu.recently',
    link: '/recently',
  },
  {
    key: 'appointment',
    text: 'menu.appointment',
    link: '/appointment',
  },
  {
    key: 'inquiry',
    text: 'menu.inquiry',
    link: '/inquiry',
  },
  {
    key: 'seller',
    text: 'menu.sellerCenter',
    link: '/'
  }
] as MenuItem[];

export interface AppBarState {

}

export interface BuyerAppBarProps {
  namespace: string;
  title: string;
  additionalAction?: React.ReactNode;
  isBackable?: boolean;
  auth: Auth;

  onBackRequested?: () => void;
  onClose?: () => void;
}

export const BuyerAppBar = (props: BuyerAppBarProps) => {
  const theme = useTheme();

  const [user, setUser] = useState<User|null>(null);
  const [userInfo, setUserInfo] = useLocalStorage<any>(`9asset.userinfo`);

  useEffect(() => {
    const unsub = getUser();
    return () => { 
      unsub && unsub();
    }
  }, []);

  const getUser = () => {
    if (props.auth) {
      setUser(props.auth.currentUser)
      return onAuthStateChanged(props.auth, () => {
        setUser(props.auth.currentUser)
      });
    }
    return null;
  }

  const handleProfileMenuClicked = (type: string, link?: string) => {
    switch (type) {
      case 'logout':
        window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URL_BASE}/logout`
        break;
      case 'appointment':
      case 'requirements':
      case 'interested':
      case 'recently':
        if (link) {
          window.location.href = `${process.env.NEXT_PUBLIC_BUYER_URL}${link}`
        }
        break;
      default:
        break;
    }
  }

  const onLanguageChanged = () => {

  }

  return (
  <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
    <DesktopToolbar
      namespace={props.namespace}
      logoPath={logoPath}
      
      user={user}
      userInfo={userInfo}
      menuItems={{
        auth: loggedMenuItems,
        nonauth: []
      }}
      onProfileMenuClick={handleProfileMenuClicked}
      onLanguageChanged={onLanguageChanged}
    />
    <MobileToolbar
      title={props.title}
      logoPath={logoPath}
      isBackable={props.isBackable}
      additionalAction={props.additionalAction}
      onBackRequested={props.onBackRequested}
      onClose={props.onClose}
    />
  </AppBar>
  );
}

export default BuyerAppBar;